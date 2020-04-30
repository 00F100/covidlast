<template>
  <div id="app">
    <ChartsFilter></ChartsFilter>
    <ChartCasesPopulation></ChartCasesPopulation>
    <ChartCasesPopulationPorcentage></ChartCasesPopulationPorcentage>
  </div>
</template>

<script>
import ChartsFilter from './components/ChartsFilter.vue'
import ChartCasesPopulation from './components/ChartCasesPopulation.vue'
import ChartCasesPopulationPorcentage from './components/ChartCasesPopulationPorcentage.vue'

export default {
  name: 'App',
  components: {
    ChartsFilter,
    ChartCasesPopulation,
    ChartCasesPopulationPorcentage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
