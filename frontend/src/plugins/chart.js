import Highcharts from 'highcharts';

const Chart = {
  install: function(Vue) {
    Vue.prototype.$chart = {
      generate: (id, series, title, yTitle) => {
        Highcharts.chart(id, {
          series,
          title: {
              text: title
          },
          yAxis: {
              title: {
                text: yTitle
              },
              offset: -0
          },
          // xAxis: {
          //   offset: 200
          // },
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
                align: 'right',
                formatter: function() {
                  console.log(this)
                  if ((this.series.data.length - 1) === this.x) {
                    return `${this.series.name} - ${this.point.options.y}`
                  }
                  return null
                  // console.log(this)
                  
                }
              }
            }
          },
          legend: {
            enabled: true
          }
      });
      }
    };
  }
};

export default Chart;