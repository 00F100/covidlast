<template>
  <div class="row">
    <div class="col">
      <div id="chart-top-mi-deaths"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartDeathsTopMi',
  props: {
    countriesSelected: Object,
    forceUpdate: Boolean
  },
  mounted: function() {
    this.update();
  },
  watch: {
    "countriesSelected.topMiDeaths": function() {
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
        'chart-top-mi-deaths',
        this.countriesSelected.topMiDeaths,
        this.$translate.text('Total deaths by million peoples'),
        this.$translate.text('Number of deaths')
      );
    }
  },
  locales: {
    en: {
      'Total deaths by million peoples': 'Total deaths by million peoples',
      'Number of deaths': 'Number of deaths'
    },
    pt: {
      'Total deaths by million peoples': 'Total de mortes por milhão de pessoas',
      'Number of deaths': 'Número de mortes'
    },
    es: {
      'Total deaths by million peoples': 'Total de muertes por millones de personas',
      'Number of deaths': 'Numero de muertes'
    },
    ru: {
      'Total deaths by million peoples': 'Всего погибших на миллион человек',
      'Number of deaths': 'Количество смертей'
    }
  }
}
</script>