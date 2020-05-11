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
              text: 'Deaths by Population Percentage'
          },
          yAxis: {
              title: {
                  text: 'Percentage of deaths'
              }
          },
          series: this.countriesSelected.populationPercentageDeaths
      });
    }
  }
}
</script>