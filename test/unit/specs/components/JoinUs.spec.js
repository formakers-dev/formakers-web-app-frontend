import sinon from 'sinon';
import Promise from 'es6-promise';
import { getVmInstance } from '../../testUtil';
import JoinUs from '../../../../src/components/landing/Joinus';
import HTTP from '../../../../src/apis/http-common';

describe('JoinUs', () => {
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

  it('JoinUs 가 렌더링 되었을 때 초기 데이터 확인', () => {
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

  it('addEmail호출되었을 때 이메일이 유효하면 isWarn을 false로 변경하고 서버로 전송한 후 isActive를 true로 변경한다.', (done) => {
    const stub = sandbox.stub(HTTP, 'post');
    stub.withArgs('/email').returns(Promise.resolve());

    const vm = getVmInstance(JoinUs, {
      data: {
        newEmail: {
          email: 'new@test.com',
        },
      },
    });

    vm.addEmail();

    vm.$nextTick(() => {
      expect(vm.isWarn).to.equal(false);
      expect(vm.isActive).to.equal(false);
      expect(vm.newEmail.email).to.equal('');
      done();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
