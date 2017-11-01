import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Promise from 'es6-promise';
import { getVmInstance } from '../../testUtil';
import JoinUs from '../../../../src/components/landing/JoinusDiv';

describe('JoinUs Div', () => {
  const sandbox = sinon.sandbox.create();

  before((done) => {
    Promise.polyfill();
    done();
  });

  it('이메일 주소가 입력되었을 때 앱비 뉴스레터 받기 버튼을 클릭하면 addEmail함수가 실행된다', () => {
    const spy = sandbox.spy(JoinUs.methods, 'addEmail');
    const vm = getVmInstance(JoinUs);
    const button = vm.$el.querySelector('button.submit');

    button.click();

    expect(vm.addEmail).to.be.a('function');
    sinon.assert.calledOnce(spy);
  });

  it('JoinUs Div가 렌더링 되었을 때 초기 데이터 확인', () => {
    const vm = getVmInstance(JoinUs);
    const defaultData = vm.$data;

    expect(defaultData.newEmail.email).to.equal('');
    expect(defaultData.isWarn).to.equal(false);
    expect(defaultData.isActive).to.equal(true);
  });

  it('addEmail호출되었을 때 이메일이 유효하지 않으면 isWarn을 true로 변경한다', () => {
    const vm = getVmInstance(JoinUs);

    vm.newEmail.email = '유효하지 않은 이메일';
    vm.addEmail();

    expect(vm.isWarn).to.equal(true);
  });

  it('addEmail호출되었을 때 이메일이 유효하면 isWarn을 false로 변경하고 서버로 전송한 후 isActive를 true로 변경한다.', () => {
    const mock = new MockAdapter(axios);
    const email = 'validEmail@test.com';
    mock.onPost('/email', {
      email,
      isActive: true,
    }).reply(200, {});

    const vm = getVmInstance(JoinUs);

    vm.newEmail.email = email;
    vm.addEmail();

    expect(vm.isWarn).to.equal(false);
    expect(vm.isActive).to.equal(true);
  });

  afterEach(() => {
    sandbox.restore();
  });
});
