<template>
  <div class="row">
    <div class="col">
      <div id="chart-population-new-per-million"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartCasesPopulationNewPerMillion',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationCasesNewPerMillion": function() {
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
        'chart-population-new-per-million',
        this.countriesSelected.populationCasesNewPerMillion,
        null,
        this.$translate.text('Number of cases')
      );
    }
  },
  locales: {
    en: {
      'New cases by day': 'New cases by day',
      'Number of cases': 'Number of cases'
    },
    pt: {
      'New cases by day': 'Novos casos por dia',
      'Number of cases': 'Número de casos'
    },
    es: {
      'New cases by day': 'Nuevos de casos por día',
      'Number of cases': 'Numero de casos'
    },
    ru: {
      'New cases by day': 'новый случаев за день',
      'Number of cases': 'Количество дел'
    }
  }
}
</script>