from flask import Blueprint

extractor = Blueprint('extractor', __name__)

@extractor.route("/")
def index():
    return {"module":"extractor"}