
import scrapy
import requests
import os
from PyPDF2 import PdfFileReader
import re
import datetime
from dateutil.parser import *
import unidecode
import json

class DGSSpider(scrapy.Spider):

    name = 'dgsspider'
    start_urls = ['https://covid19.min-saude.pt/relatorio-de-situacao/']

    def parse(self, response):

        final_data = []
        size_data = response.selector.xpath('//*[@id="content_easy"]/div[3]/ul[1]/li').getall()

        for i in range(1 , 8):
            path = '//*[@id="content_easy"]/div[3]/ul[1]/li[{i}]/a/@href'.format(i = i)
            li_text = response.selector.xpath('//*[@id="content_easy"]/div[3]/ul[1]/li[{i}]/a/text()'.format(i = i)).get()
            
            date_text = datetime.datetime.strptime(li_text.split("|")[1].strip(), "%d/%m/%Y")

            last_report_link = response.selector.xpath(path).get()

            self.extract_daily_count(last_report_link, final_data, date_text)
            self.extract_cases_by_zone(last_report_link)

        self.generate_results(final_data)             

    def extract_daily_count(self, last_report_link, data_list: list, data):
        response = requests.get(last_report_link)
        
        with open('/tmp/' + os.path.basename(os.path.normpath(last_report_link)) , 'wb') as f:
            f.write(response.content)
            pdf = PdfFileReader('/tmp/' + os.path.basename(os.path.normpath(last_report_link)))
            page1 = pdf.getPage(0)

            confirmed_cases_number = 0
            deaths = 0

            content =  page1.extractText()
            content_words = content.split()
            print(content_words)
            
            for i in range(0, len(content_words)):
                if content_words[i].strip() == 'confirmados':
                    if content_words[i - 1].strip() == 'asos' or content_words[i - 1].strip() == 'casos':
                        confirmed_cases_number = content_words[i + 1].strip()
                elif unidecode.unidecode(content_words[i].strip()) == unidecode.unidecode('Obitos'):
                    deaths = content_words[i + 1].strip()            

            data_list.append(DGSData(deaths, confirmed_cases_number, data))

    def generate_results(self, data):
        if not os.path.exists('results'):
            os.makedirs('results')
        with open("results/result.json", 'w') as file:
            maped_data = map(lambda d: d.to_json(), data)
            json.dump(list(maped_data), file)

    def extract_cases_by_zone(self, last_report_link):

        response = requests.get(last_report_link)
        
        with open('/tmp/' + os.path.basename(os.path.normpath(last_report_link)) , 'wb') as f:
            f.write(response.content)
            pdf = PdfFileReader('/tmp/' + os.path.basename(os.path.normpath(last_report_link)))
            page2 = pdf.getPage(2)
            content =  page2.extractText()
            print(content)

class DGSData:

    def __init__(self, deaths, cases, date):
       self.deaths = deaths
       self.cases = cases
       self.date = date

    def to_json(self):
        return {
            "deaths": self.deaths,
            "cases": self.cases,
            "date": self.date.__str__()
        }