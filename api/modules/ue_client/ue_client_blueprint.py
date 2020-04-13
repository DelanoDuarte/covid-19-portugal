from flask import Blueprint
import datetime
import operator
import requests

ue_client_blueprint = Blueprint("ue_client", __name__)

@ue_client_blueprint.route("/")
def index():
    return {"data": "ue_data module"}

@ue_client_blueprint.route("/full_data/count")
def data_count():
    data = get_data_and_filtered()
    count_cases = sum(map(lambda d: int(d["cases"]), data))
    count_deaths = sum(map(lambda d: int(d["deaths"]), data))
    result = {
        "cases": count_cases,
        "deaths": count_deaths
    }
    return {"data" : result}

@ue_client_blueprint.route("/full_data")
def full_data():
    json_filted_data = get_data_and_filtered()
    # map_date = map(lambda d: datetime.date(d["dateRep"]).strftime('%d/%m/%Y'), json_filted_data)
    # sorted_data = sorted(map_date, key=operator.itemgetter("dateRep"))
    return {"data": json_filted_data}

@ue_client_blueprint.route("/last_week_data")
def last_week_data():
    pass

@ue_client_blueprint.route("/last_week_data/count")
def last_week_data_count():
    pass

def get_data_and_filtered():
    data_covid = requests.get("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/")
    content = data_covid.json()
    filtered_data = [d for d in content["records"] if d['countriesAndTerritories'] == 'Portugal'] 
    return filtered_data