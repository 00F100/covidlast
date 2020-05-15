<template>
  <div class="row">
    <div class="col">
      <div id="chart-population"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartCasesPopulation',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationCases": function() {
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
        'chart-population',
        this.countriesSelected.populationCases,
        this.$translate.text('Total cases by day'),
        this.$translate.text('Number of cases')
      );
    }
  },
  locales: {
    en: {
      'Total cases by day': 'Total cases by day',
      'Number of cases': 'Number of cases'
    },
    pt: {
      'Total cases by day': 'Total de casos por dia',
      'Number of cases': 'Número de casos'
    },
    es: {
      'Total cases by day': 'Total de casos por día',
      'Number of cases': 'Numero de casos'
    }
  }
}
</script>