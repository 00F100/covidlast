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
          <ChartCasesPopulation></ChartCasesPopulation>
        </div>
        <div class="col-12 col-sm-12 col-md-6">
          <ChartCasesPopulationPorcentage></ChartCasesPopulationPorcentage>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import ChartsFilter from './components/ChartsFilter.vue';
import ChartCasesPopulation from './components/ChartCasesPopulation.vue';
import ChartCasesPopulationPorcentage from './components/ChartCasesPopulationPorcentage.vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import Axios from 'axios';
import Vue from 'vue'

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
        this.countriesList = response.data.data;
        this.isLoading = false;
        Vue.$toast.open({
          message: 'Get data success',
          position: 'top-right',
          duration: 4500,
          type: 'success'
        });
      })
      .catch(err => {
        Vue.$toast.open({
          message: err.message,
          position: 'top-right',
          duration: 4500,
          type: 'error'
        });
        console.log(err.message);
      });
  },
  data: function() {
    return {
      isLoading: true,
      fullPage: true,
      countriesSelected: [],
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
