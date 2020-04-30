import Vue from 'vue'
import App from './App.vue'
import { config as dotenv } from 'dotenv'

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
