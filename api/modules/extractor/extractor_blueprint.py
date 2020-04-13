from flask import Blueprint
from scrapy.crawler import CrawlerProcess
from spiders.dgs_spider import DGSSpider
import json
import threading
import operator

extractor = Blueprint('extractor', __name__)

processor = CrawlerProcess()

@extractor.route("/")
def index():
    return {"module":"extractor"}

@extractor.route("/daily")
def daily_data():
    with open("results/result.json", 'r') as json_file:
        data = json.load(json_file)
        return {"data" : sorted(data, key=operator.itemgetter("date"))}

@extractor.route("/crawl_data")
def update_date():
    t = threading.Thread(target=start_spider)
    t.start()
    return {"data" : "Crawling in Progress"}

def start_spider():
    processor.crawl(DGSSpider)
    processor.start()