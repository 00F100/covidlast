<template>
  <div class="row">
    <div class="col">
      <div id="chart-deaths-population"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartDeathsPopulation',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationDeaths": function() {
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
        'chart-deaths-population',
        this.countriesSelected.populationDeaths,
        this.$translate.text('Total deaths by day'),
        this.$translate.text('Number of deaths')
      );
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