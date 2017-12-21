import PercentageBar from '../../../../src/components/PercentageBar';
import Vue from 'vue';

describe('PercentageBar Component', () => {
  const propsData = {
    percentage: 0.4,
  };

  it('PercentageBar 생성시 전달된 비율의 width를 계산한다', (done) => {
    const Constructor = Vue.extend(PercentageBar);
    const vm = new Constructor({ propsData }).$mount();

    vm.$nextTick(() => {
      vm.styleObject.width.should.be.eql(`${172 * 0.4}px`);
      done();
    });
  });
});
