<template>
  <div id="app" class="container-fluid">

    <vue-headful
            :title="t('COVID-19 PANDEMIC')"
            :description="t('View and compare covid-19 cases and deaths in the world in an easy and practical way')"
            keywords="covid 19 covid-19 coronavirus last updates últimas noticias ultimas cases deaths day casos mortes dia casos muertes diurnas"
            :lang="lang"
            url="covidlast.com"/>

    <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"
        :opacity="0.7"
        :z-index="9"
        loader="bars"></loading>
    
    <modal-language v-if="showModalLang" @close="showModalLang = false" :lang.sync="lang" :modal.sync="showModalLang"></modal-language>

    <header v-show="!showModalLang">
      <h1 class="title-page-text">{{ t('COVID-19 PANDEMIC') }}</h1>
      <div class="d-sm-block d-md-none">
        <button class="btn btn-light choose-lang-mobile"  @click="showModalLang = true"><b-icon-arrow-up-down></b-icon-arrow-up-down><span></span></button>
      </div>
    </header>
    <section v-show="!showModalLang">
      <div class="row">
        <div class="col" v-if="meta">
          <ChartsFilter
            :countriesList="countriesList"
            :options="countriesList"
            :countriesSelected.sync="countriesSelected"
            :date="meta.date"
            :forceUpdate="!showModalLang"
            :lang="lang"
            :modal.sync="showModalLang"
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
    <footer>
      <div class="row">
        <div class="col-md-6 left">
          <p>{{ t('This is a open source project') }}</p>
          <p>{{ t('Data source') }}: <a href="https://www.worldometers.info/coronavirus/?from=covidlast.com" target="_blank">worldometers.info/coronavirus</a></p>
          <p>{{ t('Source code') }}: <a href="https://github.com/00F100/covid-chart" target="_blank">github.com/00F100/covid-chart</a></p>
        </div>
        <div class="col-md-6 right">
          <p>covidlast.com<br>{{ currentYear }}</p>
        </div>
      </div>
    </footer>
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
      this.$translate.setLang(this.lang)
      this.$cookie.set('lang', this.lang)
      this.updateDataCountry()
    }
  },
  updated: function() {
    this.processLanguage();
  },
  methods: {
    processLanguage: function() {
      this.haveCookie = true;
      this.lang = this.$cookie.get('lang')
      if (!this.lang) {
        this.haveCookie = false;
        this.lang = 'en';
        this.$cookie.set('lang', this.lang)
      }
      if (!this.haveCookie) {
        this.showModalLang = true;
      }
      this.$translate.setLang(this.lang);
    },
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
          cases: data.data[data.data.length-1].cases,
          name: this.$translate.text(data.countryName),
          color: data.countryColor,
          font: '#FFF'
        });
      });
      this.isLoading = false
      this.updateCases();
      this.setDefaultValues();
    },
    setDefaultValues: function() {
      let casesTop5 = [];
      this.countriesList.map(country => {
        casesTop5.push(country)
      });
      casesTop5.sort((a, b) => (a.cases < b.cases) ? 1 : -1);
      casesTop5.splice(5, casesTop5.length);
      this.countriesSelected = casesTop5;
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
      currentYear: moment().format('YYYY'),
      meta: null,
      isLoading: true,
      fullPage: true,
      showModalLang: null,
      lang: null,
      haveCookie: null,
      waitUpdate: false,
      countriesSelected: [],
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
      'This is a open source project': 'This is a open source project',
      'Data source': 'Data source',
      'Source code': 'Source code',
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
      'United States': 'United States',
      'Peru': 'Peru',
      'India': 'India',
      'Chile': 'Chile',
      'Mexico': 'Mexico',
      'Saudi Arabia': 'Saudi Arabia',
      'Turkey': 'Turkey',
      'Pakistan': 'Pakistan',
      'Bangladesh': 'Bangladesh',
      'Qatar': 'Qatar'
    },
    pt: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIA',
      'day': 'dia',
      'MM/DD/YYYY': 'DD/MM/YYYY',
      'This is a open source project': 'Este é um projeto de código aberto',
      'Data source': 'Fonte de dados',
      'Source code': 'Código fonte',
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
      'United States': 'Estados Unidos',
      'Peru': 'Peru',
      'India': 'Índia',
      'Chile': 'Chile',
      'Mexico': 'México',
      'Saudi Arabia': 'Arábia Saudita',
      'Turkey': 'Turquia',
      'Pakistan': 'Paquistão',
      'Bangladesh': 'Bangladesh',
      'Qatar': 'Catar'
    },
    es: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIA',
      'day': 'día',
      'MM/DD/YYYY': 'DD/MM/YYYY',
      'This is a open source project': 'Este es un proyecto de código abierto',
      'Data source': 'Fuente de datos',
      'Source code': 'Código fuente',
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
      'United States': 'Estados Unidos',
      'Peru': 'Perú',
      'India': 'India',
      'Chile': 'Chile',
      'Mexico': 'Mexico',
      'Saudi Arabia': 'Arabia Saudita',
      'Turkey': 'Turkey',
      'Pakistan': 'Pakistán',
      'Bangladesh': 'Bangladesh',
      'Qatar': 'Katar'
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

.choose-lang-mobile {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #fff !important;
  border-color: #FFF !important;
}
footer {
  padding: 20px 0 20px 20px;
  background-color: #e2e2e2;
}
.left > p, .right > p {
  margin: 0px;
  font-size: 10px;
}
.right > p {
  text-align: right;
  margin: 0px 20px 0px 0px;
}
</style>