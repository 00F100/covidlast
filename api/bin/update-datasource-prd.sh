#!/bin/sh
rm -Rf /var/jenkins/extractor 
git clone https://github.com/00F100/covid-chart.git /var/jenkins/extractor
cp /var/jenkins/extractor/api/.env-prd-extractor /var/jenkins/extractor/api/.env
cd /var/jenkins/extractor/api && npm install && npm run build && sh bin/updateall.sh 50 && node dist/bootstrap/handler.js test-datasource
if [ $? = 0 ]; then
  cp /var/jenkins/extractor/api/infra/data/database.sqlite /var/www/database.sqlite
  sudo kill `ps -ef | grep node | grep -v grep | awk '{print $2}'` || true
  cd /var/www/api && sudo nohup node dist/bootstrap/web.js > /var/log/covidlast-api-nohup.log &
  echo "success validate and update datasource"
else
  echo "error on validate datasource"
fi