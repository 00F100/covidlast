const https = require('https');
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

let idCountry = 1;
let country = 'brazil';

if (process.argv[2] && process.argv[3]) {
  country = process.argv[2];
  idCountry = +process.argv[3];
}
 
const options = {
  hostname: 'www.worldometers.info',
  port: 443,
  path: `/coronavirus/country/${country}`,
  method: 'GET'
}

const data = [];
var months = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08',
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12'
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', d => {
    data.push(d);
  }).on('end', _ => {
    const buffer = Buffer.concat(data);
    const content = buffer.toString().match(/coronavirus-cases-linear[\'\",\s{a-zA-Z0-9\(\)\[\]:#}]+;/g);
    let json = content[0].replace('coronavirus-cases-linear\', ', '').slice(0, -2);
    json = json.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
    json = json.replace(/'/g, '"');
    const obj = JSON.parse(json);
    const days = obj.xAxis.categories
    const items = obj.series[0].data;
    let prevValue = 0;

    for (const i in days) {
      const day = days[i].split(' ');
      const dateMoment = moment(`${moment().format('YYYY')}-${months[day[0]]}-${day[1]}`, 'YYYY-MM-DD');
      const timestamp = dateMoment.format('X');
      const item = +items[i];

      if (item > 0 || prevValue > 0) {
        db.all(`SELECT COUNT(id) AS total FROM data WHERE idCountry = ${idCountry} AND timestamp = ${timestamp}`, function(err, rows) {
          if (!err && rows[0].total === 0) {
            const stmt = db.prepare('INSERT INTO data (idCountry, cases, deaths, timestamp) VALUES (?, ?, ?, ?)');
            stmt.run(idCountry, item, 0, timestamp);
            stmt.finalize();
          }
        });
      }
      prevValue = item;
    }

    db.close();
  })
})

req.on('error', error => {
  console.error(error)
})

req.end();