<template>
  <div class="row">
    <div class="col">
      <div id="chart-deaths-population-porcentage"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  name: 'ChartDeathsPopulationPorcentage',
  props: {
    countriesSelected: Object
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationPorcentageDeaths": function() {
      this.update();
    },
  },
  methods: {
    update: function() {
      Highcharts.chart('chart-deaths-population-porcentage', {
          title: {
              text: 'Deaths by Population Porcentage'
          },
          yAxis: {
              title: {
                  text: 'Number of deaths'
              }
          },
          series: this.countriesSelected.populationPorcentageDeaths
      });
    }
  }
}
</script>