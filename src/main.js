import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/router';
import { Vuelidate } from 'vuelidate';
import VueToastification from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import './assets/style/index.css';

Vue.use(Vuelidate);
Vue.use(VueToastification)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
