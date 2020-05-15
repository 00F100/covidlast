<template>
  <div class="row">
    <div class="col">
      <div id="chart-population"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  name: 'ChartCasesPopulation',
  props: {
    countriesSelected: Object
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationCases": function() {
      this.update();
    },
  },
  methods: {
    update: function() {
      Highcharts.chart('chart-population', {
          title: {
              text: this.$translate.text('Total cases by day')
          },
          yAxis: {
              title: {
                text: this.$translate.text('Number of cases')
              }
          },
          series: this.countriesSelected.populationCases,
          credits: {
            text: 'covidlast.com',
            href: 'http://covidlast.com'
          }
      });
    }
  },
  locales: {
    en: {
      'Total cases by day': 'Total cases by day',
      'Number of cases': 'Number of cases'
    },
    pt: {
      'Total cases by day': 'Total de casos por dia',
      'Number of cases': 'Número de casos'
    },
    es: {
      'Total cases by day': 'Total de casos por día',
      'Number of cases': 'Numero de casos'
    }
  }
}
</script>