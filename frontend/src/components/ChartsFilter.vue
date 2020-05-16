<template>
  <div class="row">
    <div class="col-md-12">
      <div class="select-to-compare-text">
        <label>{{ t('Select the countries to compare') }}</label>
      </div>
      <multiselect
        v-model="selected"
        :options="countriesList"
        label="name"
        track-by="id"
        :multiple="true"
        :searchable="true"
        placeholder="">
        <template slot="selection" slot-scope="props">

          <div class="multiselect__tags-wrap" v-show="props.values.length > 0">
            <template v-for="(option, index) of props.values" @mousedown.prevent>
              <slot name="tag" :option="option" :search="props.search" :remove="props.remove">
                <span class="multiselect__tag" :key="index">
                  <span v-text="option.name" class="multiselect__tag_custom" v-bind:style="'background-color:' + torgb(option.color, '0.25') + '; color: ' + option.font"></span>
                  <i aria-hidden="true" tabindex="1" @keypress.enter.prevent="props.remove(option)"  @mousedown.prevent="props.remove(option)" class="multiselect__tag-icon"></i>
                </span>
              </slot>
            </template>
          </div>
        </template>
      </multiselect>
    </div>
    <div class="col-md-12">
      <small class="last-update-text">{{ t('Last update') }}, {{ currentDateTimezoneLabel }}, {{ currentDate }}</small>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import hexToRgba from 'hex-to-rgba'

export default {
  name: 'ChartsFilter',
  props: {
    countriesList: Array,
    countriesSelected: Array,
    forceUpdate: Boolean,
    date: Number
  },
  mounted: function() {
    this.selected = this.countriesSelected;
    this.lastUpdated = moment(this.date * 1000).utc().format(this.$translate.text('MM/DD/YYYY HH:mm:ss Z'));
    this.currentDate = this.getDateClient(this.date * 1000);
    this.currentDateTimezoneLabel = this.getLabelTimezone();
  },
  methods: {
    torgb: function(color, opacity) {
      return hexToRgba(color, opacity)
    },
    getLabelTimezone: function() {
      const timezone = this.getTimezone().match(/(\(.*\))/g);
      return timezone[0].replace(/\(|\)/g,'');
    },
    getDateClient: function(timestamp) {
      const timezone = this.getTimezone().match(/([+|-][0-9]{4})/g);
      return moment(timestamp).utcOffset(timezone[0]).format('MM/DD/YYYY HH:mm:ss Z');
    },
    getTimezone: function() {
      return new Date().toString().match(/([A-Z]+[\\+-][0-9]+.*)/)[1];
    }
  },
  watch: {
    selected: function() {
      const countries = [];
      this.selected.map(function(country) {
        countries.push({
          id: country.id,
          name: country.name
        });
      });
      this.$emit('update:countriesSelected', countries);
    },
    forceUpdate: function() {
      if (this.forceUpdate) {
        const selected = [];
        if (this.selected.length > 0) {
          this.selected.map(country => {
            selected.push(this.countriesList.find(x => x.id === country.id));
          });
        }
        this.selected = selected;
      }
    }
  },
  data: function() {
    return {
      selected: [],
      lastUpdated: null,
      currentDate: null,
      currentDateTimezoneLabel: null
    };
  },
  components: {
    Multiselect
  },
  locales: {
    en: {
      'Select the countries to compare': 'Select the countries to compare',
      'Last update': 'Last update'
    },
    pt: {
      'Select the countries to compare': 'Selecione os países para comparar',
      'Last update': 'Última atualização'
    },
    es: {
      'Select the countries to compare': 'Seleccione los países para comparar',
      'Last update': 'Última actualización'
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .multiselect__input, .multiselect__placeholder {
    font-size: 25px !important;
  }
  .multiselect__tag {
    background-color: rgb(207, 207, 207);
    color: #000;
    padding: 10px 0px;
    font-size: 20px;
    font-weight: bold;
  }
  @media only screen and (max-width: 600px) {
    .multiselect__tag {
      padding: 5px 0px;
    font-size: 15px;
    }
  }
  .multiselect__tag-icon:focus,
  .multiselect__tag-icon:hover {
    background: transparent;
  }
  .last-update-text {
    float: right;
  }
  .select-to-compare-text {
    width: 100% !important;
    text-align: center !important;
  }
  .multiselect__tag_custom {
    width: 100%;
    padding: 20px 20px 20px 15px;
  }
  
  @media only screen and (max-width: 600px) {
    .multiselect__tag_custom {
      padding: 20px 18px 20px 5px;
    }
    .last-update-text {
      font-size: 10px;
    }
  }
</style>