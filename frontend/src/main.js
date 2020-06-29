import { config as dotenv } from 'dotenv'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueCookie from 'vue-cookie'
import VueTranslate from 'vue-translate-plugin'
import App from './App.vue'
import Api from './plugins/api'
import Chart from './plugins/chart'
import 'bootstrap/dist/css/bootstrap.min.css'

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_FRONTEND_GOOGLE_ANALYTICS_TAG
})

Vue.use(VueCookie)
Vue.use(VueTranslate)
Vue.use(Chart)
Vue.use(Api)

new Vue({
  render: h => h(App),
}).$mount('#app')
