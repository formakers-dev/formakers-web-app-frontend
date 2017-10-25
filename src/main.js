// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import VueFire from 'vuefire';
import 'buefy/lib/buefy.css';
import App from './App';
import router from './routers';
/* eslint-disable */
import 'expose-loader?$!expose-loader?jQuery!jquery';
import '../semantic/dist/semantic.css';
import '../semantic/dist/semantic';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Buefy);
Vue.use(VueFire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
