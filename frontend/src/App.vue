<template>
  <div id="app" class="container-fluid">

    <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"
        :opacity="0.7"
        :z-index="9"
        loader="bars"></loading>
    
    <modal-language v-if="showModalLang" @close="showModalLang = false" :lang.sync="lang" :modal.sync="showModalLang"></modal-language>

    <header>
      <h1 class="title-page-text">{{ t('COVID-19 PANDEMIC') }}</h1>
    </header>
    <section>
      <div class="row">
        <div class="col" v-if="meta">
          <ChartsFilter
            :countriesList="countriesList"
            :options="countriesList"
            :countriesSelected.sync="countriesSelected"
            :date="meta.date"
            :forceUpdate="!showModalLang"
          ></ChartsFilter>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-6">
          <ChartCasesPopulation :countriesSelected="countriesDataChart" :forceUpdate="!showModalLang"></ChartCasesPopulation>
        </div>
        <div class="col-12 col-sm-12 col-md-6">
          <ChartCasesPopulationPercentage :countriesSelected="countriesDataChart" :forceUpdate="!showModalLang"></ChartCasesPopulationPercentage>
        </div>
        <div class="col-12 col-sm-12 col-md-6">
          <ChartDeathsPopulation :countriesSelected="countriesDataChart" :forceUpdate="!showModalLang"></ChartDeathsPopulation>
        </div>
        <div class="col-12 col-sm-12 col-md-6">
          <ChartDeathsPopulationPercentage :countriesSelected="countriesDataChart" :forceUpdate="!showModalLang"></ChartDeathsPopulationPercentage>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import ChartsFilter from './components/ChartsFilter.vue'
import ChartCasesPopulation from './components/ChartCasesPopulation.vue'
import ChartDeathsPopulation from './components/ChartDeathsPopulation.vue'
import ChartDeathsPopulationPercentage from './components/ChartDeathsPopulationPercentage.vue'
import ChartCasesPopulationPercentage from './components/ChartCasesPopulationPercentage.vue'
import 'vue-loading-overlay/dist/vue-loading.css'
import Axios from 'axios'
import moment from 'moment'
import ModalLanguage from './components/ModalLanguage.vue'

const {
  VUE_APP_API_SCHEMA,
  VUE_APP_API_HOST,
  VUE_APP_API_PORT
} = process.env;

export default {
  name: 'App',
  watch: {
    countriesSelected: function() {
      this.updateCases();
    },
    lang: function() {
      this.$translate.setLang(this.lang);
      this.updateDataCountry();
    }
  },
  beforeCreate: function() {
    // this.lang = 'pt';
    // let lang = this.$cookie.get('lang')
    // if (!lang) {
    //   lang = 'en'
    //   this.$cookie.set('lang', lang)
    // }
    this.$translate.setLang(this.lang);
  },
  methods: {
    updateCases: function() {
      this.mountData('populationCases');
      this.mountData('populationDeaths');
      this.mountData('populationActive');
      this.mountData('populationPercentageCases');
      this.mountData('populationPercentageDeaths');
      this.mountData('populationPercentageActive');
    },
    mountData: function(metric) {
      const series = [];
      this.countriesData.map(country => {
        this.countriesSelected.map(selected => {
          if (country.countryId === selected.id) {
            const serie = this.getSerie(series, selected.name, country.countryColor);
            country.data.map((record, i) => {
              serie.data.push([`${moment(record.timestamp * 1000).utc().format(this.$translate.text('MM/DD/YYYY'))}<br>${this.$translate.text('day')} ${i+1}`, this.getData(metric, record, country.countryPopulation)]);
            });
          }
        });
      });
      this.updateData(metric, series);
    },
    getSerie: function(series, name, color) {
      if(!series.find(x => x.name == name)) {
          series.push({
            name,
            color,
            data: []
          });
        }
        return series.find(x => x.name == name);
    },
    getData: function(metric, record, population) {
      if (metric === 'populationCases') return record.cases;
      if (metric === 'populationDeaths') return record.deaths;
      if (metric === 'populationActive') return record.active;
      if (metric === 'populationPercentageCases') return +((record.cases * 100) / population).toFixed(5);
      if (metric === 'populationPercentageDeaths') return +((record.deaths * 100) / population).toFixed(5);
      if (metric === 'populationPercentageActive') return +((record.active * 100) / population).toFixed(5);
    },
    updateData: function(metric, series) {
      if (metric === 'populationCases') this.countriesDataChart.populationCases = series;
      if (metric === 'populationDeaths') this.countriesDataChart.populationDeaths = series;
      if (metric === 'populationActive') this.countriesDataChart.populationActive = series;
      if (metric === 'populationPercentageCases') this.countriesDataChart.populationPercentageCases = series;
      if (metric === 'populationPercentageDeaths') this.countriesDataChart.populationPercentageDeaths = series;
      if (metric === 'populationPercentageActive') this.countriesDataChart.populationPercentageActive = series;
    },
    updateDataCountry: function() {
      this.countriesList = [];
      this.countriesData.map(data => {
        this.countriesList.push({
          id: data.countryId,
          name: this.$translate.text(data.countryName),
          color: data.countryColor,
          font: '#FFF'
        });
      });
      this.isLoading = false
      this.updateCases();
    }
  },
  beforeMount: function() {
    Axios.get(`${VUE_APP_API_SCHEMA}://${VUE_APP_API_HOST}:${VUE_APP_API_PORT}/cases`)
      .then(response => {
        if (response.data.data && response.data.data) {
          this.countriesData = response.data.data;
          this.meta = response.data.meta;
          this.updateDataCountry();
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
      meta: null,
      isLoading: true,
      fullPage: true,
      showModalLang: true,
      lang: 'en',
      countriesSelected: [
        {
          "id": 1,
          "name": this.$translate.text('Brazil'),
          "color": "#090",
          "font": "#FFF"
        },
        {
          "id": 6,
          "name": this.$translate.text('France'),
          "color": "#002291",
          "font": "#FFF"
        },
        {
          "id": 15,
          "name": this.$translate.text('Portugal'),
          "color": "#006300",
          "font": "#FFF"
        }
      ],
      countriesList: [],
      countriesData: [],
      countriesDataChart: {
        populationCases: [],
        populationDeaths: [],
        populationActive: [],
        populationPercentageCases: [],
        populationPercentageDeaths: [],
        populationPercentageActive: []
      }
    };
  },
  components: {
    Loading,
    ChartsFilter,
    ChartCasesPopulation,
    ChartCasesPopulationPercentage,
    ChartDeathsPopulation,
    ChartDeathsPopulationPercentage,
    ModalLanguage
  },
  locales: {
    en: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIC',
      'day': 'day',
      'MM/DD/YYYY': 'MM/DD/YYYY',
      'Belgium': 'Belgium',
      'Brazil': 'Brazil',
      'Canada': 'Canada',
      'China': 'China',
      'France': 'France',
      'Germany': 'Germany',
      'Iran': 'Iran',
      'Italy': 'Italy',
      'Netherlands': 'Netherlands',
      'Portugal': 'Portugal',
      'Russia': 'Russia',
      'Spain': 'Spain',
      'Switzerland': 'Switzerland',
      'United Kingdom': 'United Kingdom',
      'United States': 'United States'
    },
    pt: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIA',
      'day': 'dia',
      'MM/DD/YYYY': 'DD/MM/YYYY',
      'Belgium': 'Bélgica',
      'Brazil': 'Brasil',
      'Canada': 'Canadá',
      'China': 'China',
      'France': 'França',
      'Germany': 'Alemanha',
      'Iran': 'Irã',
      'Italy': 'Itália',
      'Netherlands': 'Holanda',
      'Portugal': 'Portugal',
      'Russia': 'Rússia',
      'Spain': 'Espanha',
      'Switzerland': 'Suíça',
      'United Kingdom': 'Reino Unido',
      'United States': 'Estados Unidos'
    },
    es: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIA',
      'day': 'día',
      'MM/DD/YYYY': 'DD/MM/YYYY',
      'Belgium': 'Bélgica',
      'Brazil': 'Brasil',
      'Canada': 'Canadá',
      'China': 'China',
      'France': 'Francia',
      'Germany': 'Alemania',
      'Iran': 'Irán',
      'Italy': 'Italia',
      'Netherlands': 'Holanda',
      'Portugal': 'Portugal',
      'Russia': 'Rusia',
      'Spain': 'España',
      'Switzerland': 'Suiza',
      'United Kingdom': 'Reino Unido',
      'United States': 'Estados Unidos'
    }
  }
}
</script>

<style>
.title-page-text {
  text-align: center;
  margin: 10px 0px 0px 0px;
  font-size: 35px;
}

@media only screen and (max-width: 600px) {
  .title-page-text {
    font-size: 20px;
  }
}
</style>