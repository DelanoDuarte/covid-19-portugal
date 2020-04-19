
import pandas as pd
import numpy as np
import json
import os
from sklearn.linear_model import LinearRegression as lm
from sklearn.model_selection import train_test_split

covid_json = open("results/result.json", 'r')

readed_data = pd.read_json(covid_json, encoding='utf-8')
readed_data.set_index('date', inplace=True)

print(readed_data.index)

y = readed_data.cases
x = readed_data.drop(['deaths'], axis=1)

x_train, x_test, y_train, y_test = train_test_split(x, y, train_size=0.5, test_size=0.5)

print(x_train)
print(y_train)
print(x_test)

model=lm().fit(x_train, y_train)

predictions = model.predict(x_test)

print("------------------------------")

print(predictions)

