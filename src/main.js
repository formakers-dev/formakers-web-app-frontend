// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import moment from 'moment';
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import VueFire from 'vuefire';
import 'buefy/lib/buefy.css';
import 'mdi/css/materialdesignicons.min.css';
import VueYouTubeEmbed from '../lib/vue-youtube-embed.umd';
import App from './App';
import router from './routers';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Buefy, {
  defaultDateFormatter(date) {
    return moment(date).format('YYYY-MM-DD');
  },
  defaultIconPack: 'mdi',
});
Vue.use(VueFire);
Vue.use(VueYouTubeEmbed, { global: true });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
