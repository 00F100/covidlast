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
          },
          xAxis: {
            max: series[0] && series[0].data ? series[0].data.length + 30 : undefined
          },
          credits: {
            text: 'covidlast.com',
            href: 'http://covidlast.com'
          },
          chart: {
            height: window.innerHeight - 300,
            type: 'spline',
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
                  if ((this.series.data.length - 1) === this.x) {
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
  }
};

export default Chart;