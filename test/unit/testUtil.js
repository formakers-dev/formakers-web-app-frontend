import Vue from 'vue';

export function getVmInstance(component, options) {
  const Constructor = Vue.extend(component);
  return new Constructor(options).$mount();
}

export function performClick(targetObject, vm) {
  targetObject.dispatchEvent(new window.Event('click'));
  vm._watcher.run();
  targetObject.click();
}
