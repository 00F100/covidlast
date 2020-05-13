import Vue from 'vue'
import App from './App.vue'
import { config as dotenv } from 'dotenv'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/custom.css';
import Popup from './plugins/popup'
import VueCookie from 'vue-cookie'
import VueTranslate from 'vue-translate-plugin';

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(VueTranslate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Popup)

new Vue({
  render: h => h(App),
}).$mount('#app')
