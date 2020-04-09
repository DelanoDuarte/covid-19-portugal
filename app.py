import os
from flask import Flask, render_template
from api.modules.extractor.extractor_blueprint import extractor

template_dir = os.path.abspath('view/public')
app = Flask(__name__, template_folder=template_dir, static_folder=os.path.abspath("view/public"))

@app.route("/")
def index():
    return render_template("index.html")

app.register_blueprint(extractor, url_prefix='/extractor')


if __name__ == "__main__":
    app.run()