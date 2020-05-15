<template>
  <div class="row">
    <div class="col">
      <div id="chart-population-percentage"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  name: 'ChartCasesPopulationPercentage',
  props: {
    countriesSelected: Object
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationPercentageCases": function() {
      this.update();
    },
  },
  methods: {
    update: function() {
      Highcharts.chart('chart-population-percentage', {
          title: {
              text: this.$translate.text('Total cases by percentage population')
          },
          yAxis: {
              title: {
                  text: this.$translate.text('Percentage of population')
              }
          },
          series: this.countriesSelected.populationPercentageCases,
          credits: {
            text: 'covidlast.com',
            href: 'http://covidlast.com'
          }
      });
    }
  },
  locales: {
    en: {
      'Total cases by percentage population': 'Total cases by percentage population',
      'Percentage of population': 'Percentage of population'
    },
    pt: {
      'Total cases by percentage population': 'Total de casos por porcentagem da população',
      'Percentage of population': 'Percentagem da população'
    },
    es: {
      'Total cases by percentage population': 'Total de casos por porcentaje de población',
      'Percentage of population': 'Porcentaje de poblacion'
    }
  }
}
</script>