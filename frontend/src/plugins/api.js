
import Axios from 'axios'

const Api = {
  install: function(Vue) {

    const ApiDatasource = {
      execute: function(path, callback, callbackException, options = {}) {
        const {
          VUE_APP_API_SCHEMA,
          VUE_APP_API_HOST,
          VUE_APP_API_PORT
        } = process.env;

        let url = `${VUE_APP_API_SCHEMA}://${VUE_APP_API_HOST}`;
        if (VUE_APP_API_PORT) {
          url += `:${VUE_APP_API_PORT}`;
        }
        url += `/${path}`;

        Axios
        .get(url, {
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
      getCases: (countries, limit, callback, callbackException) => {
        ApiDatasource.execute('cases', callback, callbackException, {
          query: {country: countries, limit }
        });
      }
    };
  }
};

export default Api;