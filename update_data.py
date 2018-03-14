# updates candidate data
import pandas as pd
import csv
import re
import os

def clean_column(name):
    name = re.sub(' ?\(.*\)', '', name.lower())
    return '_'.join(re.split('[ /]+', re.sub('[^a-z0-9 /]+', '', name)))
    

url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlVnojITGF4aA2ylj4-cjJYmXpTa6IcfOn8rygfAwRCN3aNrOjlthUtWGr6HGMPnHY1BDpnHJG1RFa/pub?output=csv"
data = pd.read_csv(url)
data.columns = list(map(clean_column, data.iloc[1]))
data = data.reindex(data.index.drop(1))

executives = []
directors = []

for row in data.itertuples():
    if not pd.isna(row.position):
        if row.position == "President" or row.position.startswith("VP"):
            executives.append(row._asdict())
        else:
            directors.append(row._asdict())


# write
for filename, arr in [("executives.csv", executives), ("directors.csv", directors)]:
    with open(os.path.join("_data", filename), "w") as f:
        csv_writer = csv.DictWriter(f, fieldnames=data.columns, extrasaction='ignore')
        csv_writer.writeheader()
        for dat in arr:
            csv_writer.writerow(dat)
