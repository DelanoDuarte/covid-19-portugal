import os
from flask import Flask, render_template
from api.modules.extractor.extractor_blueprint import extractor
from flask_cors import CORS

template_dir = os.path.abspath('view/public')
app = Flask(__name__, template_folder=template_dir, static_folder=os.path.abspath("view/public"))
app.config.from_object('config.config.DevelopmentConfig')

CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

app.register_blueprint(extractor, url_prefix='/extractor')


if __name__ == "__main__":
    app.run()