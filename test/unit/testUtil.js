import Vue from 'vue';

export function getVmInstance(component, options) {
  const Constructor = Vue.extend(component);
  return new Constructor(options).$mount();
}
