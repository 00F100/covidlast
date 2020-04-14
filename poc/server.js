const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('infra/data/database.sqlite');

const totals = [];
const series = [];

db.all(`SELECT
    d.id, d.cases, d.deaths, d.timestamp,
    c.name
FROM data AS d
INNER JOIN countries AS c ON d.idCountry = c.id
ORDER BY d.timestamp ASC, c.name ASC`, function(err, rows) {
    if (!err) {
        for (const i in rows) {
            if (!series.find(x => x.name == rows[i].name)) {
                series.push({
                    name: rows[i].name,
                    data: []
                });
                totals.push({
                    name: rows[i].name,
                    value: 0
                });
            }
            const serie = series.find(x => x.name == rows[i].name);
            const total = totals.find(x => x.name == rows[i].name);
            let _total = rows[i].cases;
            // if (rows[i].name === 'United States') {
            //     _total = (_total * 100) / 331002651;
            // }
            // if (rows[i].name === 'Brazil') {
            //     _total = (_total * 100) / 212559417;
            // }
            total.value = _total;
            serie.data.push(total.value);
        }
        
        db.close();

        app.get('/', (req, res) => {
        let html = `<html>
        <head>
            <title>COVID-19 - chart</title>
        </head>
        <body>
        <div id="container"></div>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.2.7/highcharts.js"></script>
            <script type="text/javascript">
            Highcharts.chart('container', {

                title: {
                    text: 'COVID-19'
                },
            
                subtitle: {
                    text: 'Source: worldometers.info/coronavirus'
                },
            
                yAxis: {
                    title: {
                        text: 'Number of cases'
                    }
                },
            
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },
            
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 0
                    }
                },
            
                series: ${JSON.stringify(series)},
            
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            
            });
            </script>
        </body>
        </html>`;
            res.send(html);
        });

        app.listen(3000, () => console.log('Gator app listening on port 3000!'));
    }
});