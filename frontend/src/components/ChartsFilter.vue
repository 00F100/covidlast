<template>
  <div class="row">
    <div class="col-md-12">
      <multiselect
        v-model="selected"
        :options="countriesList"
        label="name"
        track-by="id"
        :multiple="true"
        :searchable="true"
        placeholder=""></multiselect>
    </div>
    <div class="col-md-12">
      <small>Last update: {{ lastUpdated }}</small>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import moment from 'moment'

export default {
  name: 'ChartsFilter',
  props: {
    countriesList: Array,
    countriesSelected: Array,
    date: String
  },
  mounted: function() {
    this.selected = this.countriesSelected;
    this.lastUpdated = moment(+this.date * 1000).utc().format('MM/DD/YYYY HH:mm:ssZ');
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
    }
  },
  data: function() {
    return {
      selected: [],
      lastUpdated: null
    };
  },
  components: {
    Multiselect
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .multiselect__input, .multiselect__placeholder {
    font-size: 25px !important;
  }
</style>