<template>
  <div id="app" class="container-fluid">
    <header>
      <h1>Covid-19 cases, active cases and deaths</h1>
      <h3>here you can compare the spread of <var>covid-19</var> around the world</h3>
    </header>
    <section>
      <div class="row">
        <div class="col">
          <ChartsFilter
            :countriesList="countriesList"
            :countriesSelected.sync="countriesSelected"
          ></ChartsFilter>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ChartCasesPopulation></ChartCasesPopulation>
        </div>
        <div class="col">
          <ChartCasesPopulationPorcentage></ChartCasesPopulationPorcentage>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ChartsFilter from './components/ChartsFilter.vue'
import ChartCasesPopulation from './components/ChartCasesPopulation.vue'
import ChartCasesPopulationPorcentage from './components/ChartCasesPopulationPorcentage.vue'

export default {
  name: 'App',
  watch: {
    countriesSelected: function() {
      console.log(this.countriesSelected);
    }
  },
  beforeMount: function() {
    this.countriesSelected.push(123);
  },
  data: function() {
    return {
      countriesSelected: [],
      countriesList: [
        {
          countryId: 123,
          countryName: 'pais 1 a'
        },
        {
          countryId: 435,
          countryName: 'pais 2 a'
        }
      ]
    };
  },
  components: {
    ChartsFilter,
    ChartCasesPopulation,
    ChartCasesPopulationPorcentage
  }
}
</script>
