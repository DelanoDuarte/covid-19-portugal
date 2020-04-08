
import scrapy
import requests
import os
from PyPDF2 import PdfFileReader
import re
import datetime
from dateutil.parser import *
import plotly.express as px
import plotly.graph_objects as go
import unidecode

class DGSSpider(scrapy.Spider):

    name = 'dgsspider'
    start_urls = ['https://covid19.min-saude.pt/relatorio-de-situacao/']

    def parse(self, response):

        final_data = []
        size_data = response.selector.xpath('//*[@id="content_easy"]/div[3]/ul[1]/li').getall()
        print(len(size_data))

        for i in range(1 , 8):
            path = '//*[@id="content_easy"]/div[3]/ul[1]/li[{i}]/a/@href'.format(i = i)
            li_text = response.selector.xpath('//*[@id="content_easy"]/div[3]/ul[1]/li[{i}]/a/text()'.format(i = i)).get()
            
            date_text = datetime.datetime.strptime(li_text.split("|")[1].strip(), "%d/%m/%Y")

            last_report_link = response.selector.xpath(path).get()

            self.get_all_dgs_data(last_report_link, final_data, date_text)
            
        self.show_graph(final_data)
        for data in final_data:
            print("Deaths: {deaths} - Cases: {cases}; Date: {date}".format(deaths=data.deaths, cases=data.cases, date=data.date) )


    def get_all_dgs_data(self, last_report_link, data_list: list, data):
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

            #deaths = content.split()[101]

            data_list.append(DGSData(deaths, confirmed_cases_number, data))

    def show_graph(self, data_list:list):
        fig = go.Figure()

        dates = []
        cases = []
        deaths = []

        for d in data_list:
            dates.append(d.date)
            cases.append(d.cases)
            deaths.append(d.deaths)

        # Add traces
        fig.add_trace(go.Scatter(
                            x=dates, 
                            y=cases,
                            mode='lines+markers',
                            name='Nº of Confirmed cases'))

        fig.add_trace(go.Scatter(
                            x=dates, 
                            y=deaths,
                            mode='lines+markers',
                            name='Nº of Confirmed deaths'))

        fig.show()

class DGSData:

   def __init__(self, deaths, cases, date):
       self.deaths = deaths
       self.cases = cases
       self.date = date

    