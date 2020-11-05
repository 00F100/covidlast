<template>
  <div class="row">
    <div class="col">
      <div id="chart-deaths-population-new"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartDeathsPopulationNew',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationDeathsNew": function() {
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
        'chart-deaths-population-new',
        this.countriesSelected.populationDeathsNew,
        this.$translate.text('New deaths by day'),
        this.$translate.text('Number of deaths')
      );
    }
  },
  locales: {
    en: {
      'New deaths by day': 'New deaths by day',
      'Number of deaths': 'Number of deaths'
    },
    pt: {
      'New deaths by day': 'Novas mortes por dia',
      'Number of deaths': 'Número de mortes'
    },
    es: {
      'New deaths by day': 'Nuevas muertes por día',
      'Number of deaths': 'Número de muertes'
    },
    ru: {
      'New deaths by day': 'новый смертей за день',
      'Number of deaths': 'Количество смертей'
    }
  }
}
</script>