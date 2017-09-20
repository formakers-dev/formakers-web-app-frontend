// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import App from './App';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Buefy);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
