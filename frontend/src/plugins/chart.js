import Highcharts from 'highcharts';

const Chart = {
  install: function(Vue) {
    Vue.prototype.$chart = {
      generate: (id, series, title) => {
        Highcharts.chart(id, {
          series,
          title: {
              text: title
          },
          yAxis: {
              title: {
                text: null
              },
              grid: {
                enabled: true
              }
          },
          xAxis: {
            max: this.getXAxisMax(series, Vue.prototype.$device.isMobile() ? 30 : 10),
            grid: {
              enabled: true
            }
            // type: 'datetime'
          },
          credits: {
            text: 'covidlast.com',
            href: 'http://covidlast.com'
          },
          chart: {
            height: window.innerHeight - 120,
            width: window.innerWidth - (Vue.prototype.$device.isMobile() ? 30 : 50),
            type: 'line',
            polar: false,
          },
          tooltip: {
            animation: false,
          },
          plotOptions: {
            line: {
              animation: false
            },
            series: {
              lineWidth: 2,
              animation: false,
              dataLabels: {
                enabled: true,
                align: 'left',
                useHTML: true,
                formatter: function() {
                  if ((this.series.data.length) === this.x) {
                    // const currentDate = moment().format(Vue.prototype.$translate.text('MM/DD/YYYY'))
                    const value = (new Intl.NumberFormat()).format(this.point.options.y)
                    return `<div class="country-label" style="background-color: ${this.series.color};">${this.series.name}<br><b>${value}</b></div>`
                  }
                  return null
                  
                }
              }
            }
          },
          legend: {
            enabled: false
          }
      });
      }
    };
  },

  getXAxisMax(series, size) {
    if (series[0] && series[0].data) {
      const total = series[0].data.length
      return (total + ((size * total) / 100)).toFixed(0)
    }
    return undefined
  }
};

export default Chart;