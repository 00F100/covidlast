<template>
  <div class="row">
    <div class="col">
      <div id="chart-deaths-population-new-per-million"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartDeathsPopulationNewPerMillion',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.populationDeathsNewPerMillion": function() {
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
        'chart-deaths-population-new-per-million',
        this.countriesSelected.populationDeathsNewPerMillion,
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