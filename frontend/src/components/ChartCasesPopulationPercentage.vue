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
              text: 'Cases by Population Percentage'
          },
          yAxis: {
              title: {
                  text: 'Percentage of cases'
              }
          },
          series: this.countriesSelected.populationPercentageCases
      });
    }
  }
}
</script>