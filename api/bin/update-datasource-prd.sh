#!/bin/sh
rm -Rf /var/jenkins/extractor 
git clone https://github.com/00F100/covid-chart.git /var/jenkins/extractor
cp /var/jenkins/extractor/api/.env-prd-extractor /var/jenkins/extractor/api/.env
cd /var/jenkins/extractor/api && npm install && npm run build && sh bin/updateall.sh 25
cp /var/jenkins/extractor/api/infra/data/database.sqlite /var/www/database.sqlite
docker stop covidlast-api || true
docker run -d --rm --name covidlast-api -p 3000:3000 -v /var/www:/var/www -w /var/www/api -v /var/log:/var/log node:10-alpine node dist/bootstrap/web.js