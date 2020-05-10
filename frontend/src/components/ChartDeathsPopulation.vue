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
              text: 'Deaths Unique Count'
          },
          yAxis: {
              title: {
                  text: 'Number of deaths'
              }
          },
          series: this.countriesSelected.populationDeaths
      });
    }
  }
}
</script>