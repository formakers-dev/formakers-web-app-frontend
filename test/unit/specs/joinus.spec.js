import Vue from 'vue';
import sinon from 'sinon';

import sinonTestFactory from 'sinon-test';

const sinonTest = sinonTestFactory(sinon);
import JoinUs from '../../../src/components/landing/JoinusDiv';

describe('JoinUs Div', () => {
  it('이메일 주소가 입력되었을 때 앱비 뉴스레터 받기 버튼을 클릭하면 addEmail함수가 실행된다', sinonTest(function () {
    const Constructor = Vue.extend(JoinUs);
    const JoinUsComponent = new Constructor().$mount();
    const spy = this.spy(JoinUsComponent, 'addEmail');
    const button = JoinUsComponent.$el.querySelector('button.submit');

    // event binding
    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);
    JoinUsComponent._watcher.run();
    button.click();

    expect(JoinUsComponent.addEmail).to.be.a('function');
    sinon.assert.calledOnce(spy);
  }));

  it('JoinUs Div가 렌더링 되었을 때 초기 데이터 확인', () => {
    const defaultData = JoinUs.data();

    expect(defaultData.newEmail.email).to.equal('');
    expect(defaultData.isWarn).to.equal(false);
    expect(defaultData.isActive).to.equal(true);
  });
});
