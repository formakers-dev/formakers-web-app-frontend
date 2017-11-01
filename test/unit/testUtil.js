import Vue from 'vue';
import router from '../../src/routers';

export function getVmInstance(component, options) {
  component.router = router;
  const Constructor = Vue.extend(component);
  return new Constructor(options).$mount();
}
