<template>
  <div id="app" class="container-fluid">

    <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"
        :opacity="0.7"
        :z-index="9"
        loader="bars"></loading>

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
        <div class="col-12 col-sm-12 col-md-6">
          <ChartCasesPopulation :countriesSelected="countriesSelected"></ChartCasesPopulation>
        </div>
        <div class="col-12 col-sm-12 col-md-6">
          <ChartCasesPopulationPorcentage :countriesSelected="countriesSelected"></ChartCasesPopulationPorcentage>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import ChartsFilter from './components/ChartsFilter.vue'
import ChartCasesPopulation from './components/ChartCasesPopulation.vue'
import ChartCasesPopulationPorcentage from './components/ChartCasesPopulationPorcentage.vue'
import 'vue-loading-overlay/dist/vue-loading.css'
import Axios from 'axios'

const {
  VUE_APP_API_SCHEMA,
  VUE_APP_API_HOST,
  VUE_APP_API_PORT
} = process.env;

export default {
  name: 'App',
  watch: {
    countriesSelected: function() {
    }
  },
  beforeMount: function() {
    Axios.get(`${VUE_APP_API_SCHEMA}://${VUE_APP_API_HOST}:${VUE_APP_API_PORT}/cases`)
      .then(response => {
        if (response.data.data && response.data.data) {
          response.data.data.map(data => {
            this.countriesList.push({
              id: data.countryId,
              name: data.countryName
            });
          });
          this.isLoading = false
        } else {
          this.$popup.error('Response has empty')
        }
      })
      .catch(err => {
        this.$popup.error(err.message)
      });
  },
  data: function() {
    return {
      isLoading: true,
      fullPage: true,
      countriesSelected: [
        {
          "id": 1,
          "name": "Brazil"
        }
      ],
      countriesList: []
    };
  },
  components: {
    Loading,
    ChartsFilter,
    ChartCasesPopulation,
    ChartCasesPopulationPorcentage
  }
}
</script>
