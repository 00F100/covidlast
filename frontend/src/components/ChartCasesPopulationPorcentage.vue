<template>
  <div class="row">
    <div class="col">
      <div id="chart-population-porcentage"></div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  name: 'ChartCasesPopulationPorcentage',
  props: {
    countriesSelected: Object
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationPorcentageCases": function() {
      this.update();
    },
  },
  methods: {
    update: function() {
      Highcharts.chart('chart-population-porcentage', {
          title: {
              text: 'Cases by Population Porcentage'
          },
          yAxis: {
              title: {
                  text: 'Number of cases'
              }
          },
          series: this.countriesSelected.populationPorcentageCases
      });
    }
  }
}
</script>