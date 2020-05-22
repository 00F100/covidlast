<template>
  <div class="row">
    <div class="col">
      <div id="chart-population-percentage"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartCasesPopulationPercentage',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationPercentageCases": function() {
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
        'chart-population-percentage',
        this.countriesSelected.populationPercentageCases,
        this.$translate.text('Total cases by percentage population'),
        this.$translate.text('Percentage of population')
      );
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
    },
    ru: {
      'Total cases by percentage population': 'Всего случаев по процентам населения',
      'Percentage of population': 'Процент населения'
    }
  }
}
</script>