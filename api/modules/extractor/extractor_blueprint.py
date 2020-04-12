from flask import Blueprint
import json
from scrapy.crawler import CrawlerProcess
from spiders.dgs_spider import DGSSpider

import threading
import operator
import requests

extractor = Blueprint('extractor', __name__)

processor = CrawlerProcess()

@extractor.route("/")
def index():
    return {"module":"extractor"}

@extractor.route("/daily")
def daily_data():
    with open("results/result.json", 'r') as json_file:
        data = json.load(json_file)
        return {"data": sorted(data, key=operator.itemgetter("date"))}

@extractor.route("/full_data/count")
def data_count():
    data = get_data_and_filtered()
    count_cases = sum(map(lambda d: int(d["cases"]), data))
    count_deaths = sum(map(lambda d: int(d["deaths"]), data))
    result = {
        "cases": count_cases,
        "deaths": count_deaths
    }
    return {"data" : result}

@extractor.route("/full_data")
def full_data():
    json_filted_data = json.dumps(get_data_and_filtered()) 
    return {"data": json_filted_data}

@extractor.route("/last_week_data")
def last_week_data():
    pass

@extractor.route("/last_week_data/count")
def last_week_data_count():
    pass

def get_data_and_filtered():
    data_covid = requests.get("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/")
    content = data_covid.json()
    filtered_data = [d for d in content["records"] if d['countriesAndTerritories'] == 'Portugal'] 
    return filtered_data