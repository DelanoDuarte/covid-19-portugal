# COVID-19 Portugal Data
Basic spider to extract data about the COVID-19 situation in Portugal.

## How it works
The extraction works reading the html of the the official website and
getting the data from the pdfs that are update every day.
Link: https://covid19.min-saude.pt/relatorio-de-situacao/

## App Usage
First, create your own virtual enviroment with venv, install
all the libraries with:

`pip install -r requiments.txt`

To run the app, enter with the following command:
`scrapy runspider dgs_spider.py`

## Sample Result:
Last 7(seven) days
![alt](images/resultApp.png)

