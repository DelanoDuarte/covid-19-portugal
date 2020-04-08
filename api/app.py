from flask import Flask
from api.modules.extractor import extractor_blueprint

app = Flask(__name__)

app.register_blueprint(extractor_blueprint.extractor, url_prefix='/extractor')
