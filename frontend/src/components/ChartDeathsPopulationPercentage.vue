<template>
  <div class="row">
    <div class="col">
      <div id="chart-deaths-population-percentage"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartDeathsPopulationPercentage',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationPercentageDeaths": function() {
      this.update();
    },
    forceUpdate: function() {
      if (this.forceUpdate) {
        this.update();
      }
    }
  },
  methods: {
    update: function() {
      this.$chart.generate(
        'chart-deaths-population-percentage',
        this.countriesSelected.populationPercentageDeaths,
        this.$translate.text('Total deaths by percentage population'),
        this.$translate.text('Percentage of population')
      );
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