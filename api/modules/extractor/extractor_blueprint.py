from flask import Blueprint
import json

extractor = Blueprint('extractor', __name__)

@extractor.route("/")
def index():
    return {"module":"extractor"}

@extractor.route("/daily")
def daily_data():
    with open("results/result.json", 'r') as json_file:
        data = json.load(json_file)
        return {"data": data}
    
    