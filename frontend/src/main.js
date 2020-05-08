import Vue from 'vue'
import App from './App.vue'
import { config as dotenv } from 'dotenv'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/custom.css';

dotenv({
  debug: process.env.NODE_ENV === 'development' ? true : false
});

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToast)

// const alertUp = (message) => {
//   Vue.$toast.open({
//     message: message,
//     position: 'top-right',
//     duration: 4500,
//     type: 'error'
//   });
// }

new Vue({
  render: h => h(App),
}).$mount('#app')
