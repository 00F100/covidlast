import Vue from 'vue'
import App from './App.vue'
import { config as dotenv } from 'dotenv'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
