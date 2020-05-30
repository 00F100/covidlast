
import Axios from 'axios'

const Api = {
  install: function(Vue) {

    const ApiDatasource = {
      execute: function(path, callback, callbackException, options = {}) {
        const {
          VUE_APP_API_SCHEMA,
          VUE_APP_API_HOST
        } = process.env;

        Axios
        .get(`${VUE_APP_API_SCHEMA}://${VUE_APP_API_HOST}/${path}`, {
          params: options.query || null
        })
        .then(response => {
          callback(response);
        })
        .catch(err => {
          callbackException(err);
        });
      }
    };

    Vue.prototype.$api = {
      getCountries: (callback, callbackException) => {
        ApiDatasource.execute('countries', callback, callbackException);
      },
      getCountriesTop5: (callback, callbackException) => {
        ApiDatasource.execute('countries/top5', callback, callbackException);
      },
      getCases: (countries, callback, callbackException) => {
        ApiDatasource.execute('cases', callback, callbackException, {
          query: {country: countries}
        });
      }
    };
  }
};

export default Api;