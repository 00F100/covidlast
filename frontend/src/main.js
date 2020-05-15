import Vue from 'vue'
import App from './App.vue'
import { config as dotenv } from 'dotenv'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/custom.css';
import Popup from './plugins/popup'
import Chart from './plugins/chart'
import VueCookie from 'vue-cookie'
import VueTranslate from 'vue-translate-plugin';
import VueAnalytics from 'vue-analytics';

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

const {
  VUE_GOOGLE_ANALYTICS_TAG
} = process.env;

Vue.config.productionTip = false

if (VUE_GOOGLE_ANALYTICS_TAG) {
  Vue.use(VueAnalytics, {
    id: VUE_GOOGLE_ANALYTICS_TAG
  })
}

Vue.use(VueCookie)
Vue.use(VueTranslate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Popup)
Vue.use(Chart)

new Vue({
  render: h => h(App),
}).$mount('#app')
