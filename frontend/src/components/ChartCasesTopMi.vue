<template>
  <div class="row">
    <div class="col">
      <div id="chart-top-mi-cases"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartCasesTopMi',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.topMiCases": function() {
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
        'chart-top-mi-cases',
        this.countriesSelected.topMiCases,
        this.$translate.text('Total cases by million peoples'),
        this.$translate.text('Number of cases')
      );
    }
  },
  locales: {
    en: {
      'Total cases by million peoples': 'Total cases by million peoples',
      'Number of cases': 'Number of cases'
    },
    pt: {
      'Total cases by million peoples': 'Total de casos por milhão de pessoas',
      'Number of cases': 'Número de casos'
    },
    es: {
      'Total cases by million peoples': 'Total de casos por millones de personas',
      'Number of cases': 'Numero de casos'
    },
    ru: {
      'Total cases by million peoples': 'Всего случаев по миллионам людей',
      'Number of cases': 'Количество дел'
    }
  }
}
</script>