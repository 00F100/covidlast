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
              }
          },
          credits: {
            text: 'covidlast.com',
            href: 'http://covidlast.com'
          }
      });
      }
    };
  }
};

export default Chart;