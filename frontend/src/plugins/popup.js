/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const Popup = {
  vue: null,
  install: (Vue) => {
    Vue.use(VueToast)
    Popup.vue = Vue;
    Vue.prototype.$popup = {
      clear: () => {
        Popup.clear()
      },
      success: (message) => {
        Popup.show(message, 'success')
      },
      error: (message) => {
        Popup.show(message, 'error')
      },
      info: (message) => {
        Popup.show(message, 'info')
      },
      warning: (message) => {
        Popup.show(message, 'warning')
      }
    };
  },

  show: (message, type) => {
    Popup.vue.$toast.open({
      message: message,
      position: 'top-right',
      duration: 4500,
      type: type
    });
  },

  clear: () => {
    Popup.vue.$toast.clear();
  }
};

export default Popup;