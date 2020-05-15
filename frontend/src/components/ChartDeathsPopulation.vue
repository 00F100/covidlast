<template>
  <div class="row">
    <div class="col">
      <div id="chart-deaths-population"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  name: 'ChartDeathsPopulation',
  props: {
    countriesSelected: Object
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationDeaths": function() {
      this.update();
    },
  },
  methods: {
    update: function() {
      Highcharts.chart('chart-deaths-population', {
          title: {
              text: this.$translate.text('Total deaths by day')
          },
          yAxis: {
              title: {
                  text: this.$translate.text('Number of deaths')
              }
          },
          series: this.countriesSelected.populationDeaths,
          credits: {
            text: 'covidlast.com',
            href: 'http://covidlast.com'
          }
      });
    }
  },
  locales: {
    en: {
      'Total deaths by day': 'Total deaths by day',
      'Number of deaths': 'Number of deaths'
    },
    pt: {
      'Total deaths by day': 'Total de mortes por dia',
      'Number of deaths': 'Número de mortes'
    },
    es: {
      'Total deaths by day': 'Total de muertes por día',
      'Number of deaths': 'Número de muertes'
    }
  }
}
</script>