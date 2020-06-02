<template>
  <div id="app" class="container-fluid">

    <vue-headful
            :title="t('COVID-19 PANDEMIC')"
            :description="t('View and compare covid-19 cases and deaths in the world in an easy and practical way')"
            keywords="covid 19 covid-19 coronavirus last updates últimas noticias ultimas cases deaths day casos mortes dia casos muertes diurnas"
            :lang="lang"
            url="covidlast.com"/>

    <loading
        :active.sync="activeLoading" 
        :can-cancel="true" 
        :is-full-page="true"
        :opacity="0.7"
        :z-index="9"
        loader="bars"></loading>
    
    <modal-language
        v-if="showModalLang"
      @close="showModalLang = false"
      :lang.sync="lang"
      :modal.sync="showModalLang"
      :update.sync="update"
      :onSelect="this.fixCountriesName"></modal-language>

    <header>
      <h1 class="title-page-text">{{ t('COVID-19 PANDEMIC') }}</h1>
      <div class="d-sm-block d-md-none">
        <button class="btn btn-light choose-lang-mobile"  @click="showModalLang = true"><b-icon-arrow-up-down></b-icon-arrow-up-down><span></span></button>
      </div>
    </header>
    <section v-if="!showModalLang">
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
        <div class="col-12 col-sm-12 col-md-4">
          <ChartCasesPopulation :countriesSelected="casesSeries" :forceUpdate="!showModalLang"></ChartCasesPopulation>
        </div>
        <hr class="d-block d-sm-none">
        <div class="col-12 col-sm-12 col-md-4">
          <ChartCasesTopMi :countriesSelected="casesSeries" :forceUpdate="!showModalLang"></ChartCasesTopMi>
        </div>
        <hr class="d-block d-sm-none">
        <div class="col-12 col-sm-12 col-md-4">
          <ChartCasesPopulationPercentage :countriesSelected="casesSeries" :forceUpdate="!showModalLang"></ChartCasesPopulationPercentage>
        </div>
        <hr>
        <div class="col-12 col-sm-12 col-md-4">
          <ChartDeathsPopulation :countriesSelected="casesSeries" :forceUpdate="!showModalLang"></ChartDeathsPopulation>
        </div>
        <hr class="d-block d-sm-none">
        <div class="col-12 col-sm-12 col-md-4">
          <ChartDeathsTopMi :countriesSelected="casesSeries" :forceUpdate="!showModalLang"></ChartDeathsTopMi>
        </div>
        <hr class="d-block d-sm-none">
        <div class="col-12 col-sm-12 col-md-4">
          <ChartDeathsPopulationPercentage :countriesSelected="casesSeries" :forceUpdate="!showModalLang"></ChartDeathsPopulationPercentage>
        </div>
      </div>
    </section>
    
    <footer>
      <div class="row">
        <div class="col-6 col-sm-6 left">
          <p>{{ t('This is a open source project') }}</p>
          <p>{{ t('Data source') }}: <a href="https://www.worldometers.info/coronavirus/?from=covidlast.com" target="_blank">worldometers.info/coronavirus</a></p>
          <p>{{ t('Source code') }}: <a href="https://github.com/00F100/covid-chart" target="_blank">github.com/00F100/covid-chart</a></p>
        </div>
        <div class="col-6 col-sm-6 right">
          <p>covidlast.com<br>{{ t('Version') }} {{ version }}<br>{{ currentYear }}</p>
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
import ChartCasesTopMi from './components/ChartCasesTopMi.vue'
import ChartDeathsPopulationPercentage from './components/ChartDeathsPopulationPercentage.vue'
import ChartCasesPopulationPercentage from './components/ChartCasesPopulationPercentage.vue'
import ChartDeathsTopMi from './components/ChartDeathsTopMi.vue'
import 'vue-loading-overlay/dist/vue-loading.css'
import moment from 'moment'
import ModalLanguage from './components/ModalLanguage.vue'
import randomColor from 'random-color'

export default {
  name: 'App',
  created: function() {
    this.language()
  },
  computed: {
    activeLoading: function() {
      return this.isLoading > 0
    }
  },
  watch: {
    countriesCases: function() {
      this.populateChartData()
    },
    countriesSelected: function() {
      if (this.timeoutLoadCasesApi) {
        clearTimeout(this.timeoutLoadCasesApi)
      }
      this.timeoutLoadCasesApi = setTimeout(() => {
        this.loadCases()
        this.$ga.event('selectedCountries', 'change', 'countries', this.countriesSelected)
      }, 100)
    },
    lang: function() {
      this.$translate.setLang(this.lang)
      this.$cookie.set('lang', this.lang)
      this.$ga.event('language', 'change', 'lang', this.lang)
      this.fixCountriesName()
      this.populateChartData()
    }
  },
  methods: {
    populateChartData: function() {
      this.casesSeries = {
        populationCases: [],
        populationPercentageCases: [],
        topMiCases: [],
        populationDeaths: [],
        populationPercentageDeaths: [],
        topMiDeaths: []
      }
      this.countriesCases.map(country => {
        const casesTotal = [];
        const casesPercentage = [];
        const casesTopMi = [];
        const deathsTotal = [];
        const deathsPercentage = [];
        const deathsTopMi = [];
        country.data.map((data, day) => {
          const label = `${moment(data[0] * 1000).utc().format(this.$translate.text('MM/DD/YYYY'))}<br>${this.$translate.text('day')}: ${day}`
          casesTotal.push([label, data[1][0]])
          casesPercentage.push([label, data[2][0]])
          casesTopMi.push([label, data[3][0]])
          deathsTotal.push([label, data[1][1]])
          deathsPercentage.push([label, data[2][1]])
          deathsTopMi.push([label, data[3][1]])
        })
        const sCountry = this.originalCountriesList.find(x => x.countryId === country.countryId)
        const countryLabel = this.countriesSelected.find(x => x.countryId === country.countryId);
        this.casesSeries.populationCases.push({
          color: countryLabel.countryColor,
          name: this.$translate.text(sCountry.countryName),
          data: casesTotal
        });
        this.casesSeries.populationPercentageCases.push({
          color: countryLabel.countryColor,
          name: this.$translate.text(sCountry.countryName),
          data: casesPercentage
        });
        this.casesSeries.topMiCases.push({
          color: countryLabel.countryColor,
          name: this.$translate.text(sCountry.countryName),
          data: casesTopMi
        });
        this.casesSeries.populationDeaths.push({
          color: countryLabel.countryColor,
          name: this.$translate.text(sCountry.countryName),
          data: deathsTotal
        });
        this.casesSeries.populationPercentageDeaths.push({
          color: countryLabel.countryColor,
          name: this.$translate.text(sCountry.countryName),
          data: deathsPercentage
        });
        this.casesSeries.topMiDeaths.push({
          color: countryLabel.countryColor,
          name: this.$translate.text(sCountry.countryName),
          data: deathsTopMi
        });
      });
    },
    loadCountries: function() {
      this.isLoading++;
      this.$api.getCountries(
        (response) => {
          if (response.data.data) {
            this.originalCountriesList = response.data.data;
            this.meta = response.data.meta;
            this.fixCountriesName()
            this.loadCases()
            this.isLoading--
          }
        },
        (err) => {
          console.log(err);
          this.isLoading--
        }
      )
      this.isLoading++;
      this.$api.getCountriesTop5(
        (response) => {
          if (response.data.data) {
            this.countriesSelected = response.data.data;
            this.fixCountriesName()
            this.isLoading--
          }
        },
        (err) => {
          console.log(err);
          this.isLoading--
        }
      );
    },
    loadCases: function() {
      if (this.countriesSelected.length > 0) {
        this.isLoading++;
        const countries = [];
        this.countriesSelected.map(country => {
          country.countryColor = randomColor().hexString();
          countries.push(country.countryId)
        })
        this.$api.getCases(countries,
          (response) => {
            this.countriesCases = response.data.data
            this.isLoading--
          },
          (err) => {
            console.log(err)
            this.isLoading--
          }
        );
      }
    },
    fixCountriesName: function() {
      this.isLoading++
      this.countriesList = [];
      this.countriesList = JSON.parse(JSON.stringify(this.originalCountriesList));
      this.countriesList.map(country => {
        country.countryName = this.$translate.text(country.countryName)
      });
      this.countriesList.sort(function(a, b) {
        if (a.countryName < b.countryName) {
          return -1;
        }
        if (a.countryName > b.countryName) {
          return 1;
        }
        return 0;
      })
      this.countriesSelected.map(country => {
        const data = this.countriesList.find(x => x.countryId === country.countryId);
        if (data) {
          country.countryName = data.countryName;
        }
      });
      this.isLoading--
    },
    language: function() {
      this.isLoading++
      this.haveCookie = true;
      this.lang = this.$cookie.get('lang')
      if (!this.lang) {
        this.haveCookie = false
        this.lang = 'en'
        this.$cookie.set('lang', this.lang)
      }
      if (!this.haveCookie) {
        this.showModalLang = true
      }
      this.$translate.setLang(this.lang);
      this.loadCountries()
      this.isLoading--
    },
  },
  data: function() {
    return {
      version: '1.1.0',
      originalCountriesList: [],
      countriesList: [],
      currentYear: moment().format('YYYY'),
      meta: null,
      isLoading: 0,
      showModalLang: false,
      lang: null,
      timeoutLoadCasesApi: null,
      countriesCases: [],
      casesSeries: {
        populationCases: [],
        populationPercentageCases: [],
        populationDeaths: [],
        populationPercentageDeaths: []
      },
      update: false,
      countriesSelected: [],
    };
  },
  components: {
    Loading,
    ChartsFilter,
    ChartCasesPopulation,
    ChartCasesPopulationPercentage,
    ChartCasesTopMi,
    ChartDeathsPopulation,
    ChartDeathsPopulationPercentage,
    ChartDeathsTopMi,
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
      'Version': 'Version',
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
      'Qatar': 'Qatar',
      'Belarus': 'Belarus',
      'Ecuador': 'Ecuador',
      'Sweden': 'Sweden',
      'Singapore': 'Singapore',
      'United Arab Emirates': 'United Arab Emirates',
      'South Africa': 'South Africa',
      'Colombia': 'Colombia',
      'Kuwait': 'Kuwait',
      'Indonesia': 'Indonesia',
      'Ireland': 'Ireland',
      'Poland': 'Poland',
      'Ukraine': 'Ukraine',
      'Egypt': 'Egypt',
      'Romania': 'Romania',
      'Philippines': 'Philippines',
      'Israel': 'Israel',
      'Dominican Republic': 'Dominican Republic',
      'Japan': 'Japan',
      'Austria': 'Austria',
      'Argentina': 'Argentina',
      'Afghanistan': 'Afghanistan',
      'Panama': 'Panama',
      'Bolivia': 'Bolivia',
      'Honduras': 'Honduras',
      'Haiti': 'Haiti'
    },
    pt: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIA',
      'day': 'dia',
      'MM/DD/YYYY': 'DD/MM/YYYY',
      'This is a open source project': 'Este é um projeto de código aberto',
      'Data source': 'Fonte de dados',
      'Source code': 'Código fonte',
      'Version': 'Versão',
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
      'India': 'India',
      'Chile': 'Chile',
      'Mexico': 'México',
      'Saudi Arabia': 'Arábia Saudita',
      'Turkey': 'Turquia',
      'Pakistan': 'Paquistão',
      'Bangladesh': 'Bangladesh',
      'Qatar': 'Catar',
      'Belarus': 'Bielorrússia',
      'Ecuador': 'Equador',
      'Sweden': 'Suécia',
      'Singapore': 'Cingapura',
      'United Arab Emirates': 'Emirados Árabes Unidos',
      'South Africa': 'África do Sul',
      'Colombia': 'Colômbia',
      'Kuwait': 'Kuwait',
      'Indonesia': 'Indonésia',
      'Ireland': 'Irlanda',
      'Poland': 'Polônia',
      'Ukraine': 'Ucrânia',
      'Egypt': 'Egito',
      'Romania': 'Romênia',
      'Philippines': 'Filipinas',
      'Israel': 'Israel',
      'Dominican Republic': 'República Dominicana',
      'Japan': 'Japão',
      'Austria': 'Áustria',
      'Argentina': 'Argentina',
      'Afghanistan': 'Afeganistão',
      'Panama': 'Panamá',
      'Bolivia': 'Bolívia',
      'Honduras': 'Honduras',
      'Haiti': 'Haiti'
    },
    es: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIA',
      'day': 'día',
      'MM/DD/YYYY': 'DD/MM/YYYY',
      'This is a open source project': 'Este es un proyecto de código abierto',
      'Data source': 'Fuente de datos',
      'Source code': 'Código fuente',
      'Version': 'Versión',
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
      'Qatar': 'Katar',
      'Belarus': 'Bielorrusia',
      'Ecuador': 'Ecuador',
      'Sweden': 'Suecia',
      'Singapore': 'Singapur',
      'United Arab Emirates': 'Emiratos Árabes Unidos',
      'South Africa': 'Sudáfrica',
      'Colombia': 'Colombia',
      'Kuwait': 'Kuwait',
      'Indonesia': 'Indonesia',
      'Ireland': 'Irlanda',
      'Poland': 'Polonia',
      'Ukraine': 'Ucrania',
      'Egypt': 'Egipto',
      'Romania': 'Rumania',
      'Philippines': 'Filipinas',
      'Israel': 'Israel',
      'Dominican Republic': 'República Dominicana',
      'Japan': 'Japón',
      'Austria': 'Austria',
      'Argentina': 'Argentina',
      'Afghanistan': 'Afganistán',
      'Panama': 'Panamá',
      'Bolivia': 'Bolivia',
      'Honduras': 'Honduras',
      'Haiti': 'Haití'
    },
    ru: {
      'COVID-19 PANDEMIC': 'COVID-19 ПАНДЕМИЯ',
      'day': 'день',
      'MM/DD/YYYY': 'DD/MM/YYYY',
      'This is a open source project': 'Это проект с открытым исходным кодом',
      'Data source': 'Источник данных',
      'Source code': 'Исходный код',
      'Version': 'Версия',
      'Belgium': 'Бельгия',
      'Brazil': 'Бразилия',
      'Canada': 'Канада',
      'China': 'Китай',
      'France': 'Франция',
      'Germany': 'Германия',
      'Iran': 'Иран',
      'Italy': 'Италия',
      'Netherlands': 'Нидерланды',
      'Portugal': 'Португалия',
      'Russia': 'Россия',
      'Spain': 'Испания',
      'Switzerland': 'Швейцария',
      'United Kingdom': 'объединенное Королевство',
      'United States': 'Соединенные Штаты',
      'Peru': 'Перу',
      'India': 'Индия',
      'Chile': 'Чили',
      'Mexico': 'Мексика',
      'Saudi Arabia': 'Саудовская Аравия',
      'Turkey': 'индейка',
      'Pakistan': 'Пакистан',
      'Bangladesh': 'Бангладеш',
      'Qatar': 'Катар',
      'Belarus': 'Беларусь',
      'Ecuador': 'Эквадор',
      'Sweden': 'Швеция',
      'Singapore': 'Сингапур',
      'United Arab Emirates': 'Объединенные Арабские Эмираты',
      'South Africa': 'Южная Африка',
      'Colombia': 'Колумбия',
      'Kuwait': 'Кувейт',
      'Indonesia': 'Индонезия',
      'Ireland': 'Ирландия',
      'Poland': 'Польша',
      'Ukraine': 'Украина',
      'Egypt': 'Египет',
      'Romania': 'Румыния',
      'Philippines': 'Филиппины',
      'Israel': 'Израиль',
      'Dominican Republic': 'Доминиканская Республика',
      'Japan': 'Япония',
      'Austria': 'Австрия',
      'Argentina': 'Аргентина',
      'Afghanistan': 'Афганистан',
      'Panama': 'Панама',
      'Bolivia': 'Боливия',
      'Honduras': 'Honduras',
      'Haiti': 'Гаити'
    }
  }
}
</script>

<style>

hr {
  background: rgb(51, 51, 51, 0.5);
  width: 90%;
}

.title-page-text {
  text-align: center;
  margin: 10px 0px 0px 0px;
  font-size: 35px;
}

@media only screen and (max-width: 600px) {
  .title-page-text {
    font-size: 20px;
  }
  footer p {
    font-size: 10px !important;
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