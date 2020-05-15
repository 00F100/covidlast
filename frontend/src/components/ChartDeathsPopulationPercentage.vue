<template>
  <div class="row">
    <div class="col">
      <div id="chart-deaths-population-percentage"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  name: 'ChartDeathsPopulationPercentage',
  props: {
    countriesSelected: Object
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationPercentageDeaths": function() {
      this.update();
    },
  },
  methods: {
    update: function() {
      Highcharts.chart('chart-deaths-population-percentage', {
          title: {
              text: this.$translate.text('Total deaths by percentage population')
          },
          yAxis: {
              title: {
                  text: this.$translate.text('Percentage of population')
              }
          },
          series: this.countriesSelected.populationPercentageDeaths,
          credits: {
            text: 'covidlast.com',
            href: 'http://covidlast.com'
          }
      });
    }
  },
  locales: {
    en: {
      'Total deaths by percentage population': 'Total deaths by percentage population',
      'Percentage of population': 'Percentage of population'
    },
    pt: {
      'Total deaths by percentage population': 'Total de mortes por porcentagem da população',
      'Percentage of population': 'Porcentagem da população'
    },
    es: {
      'Total deaths by percentage population': 'Total de muertes por porcentaje de población',
      'Percentage of deaths': 'Porcentaje de poblacion'
    }
  }
}
</script>