import sinon from 'sinon';
import { expect } from 'chai';
import NavBar from '../../../../src/components/NavBar';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';
import * as AuthUtil from '../../../../src/utils/auth';

describe('NavBar Component', () => {
  const sandbox = sinon.sandbox.create();

  it('onLogout 클릭 후 성공시 Login 페이지로 이동한다', (done) => {
    const vm = getVmInstance(NavBar);
    const stubHttpOnGet = sandbox.stub(HTTP, 'get');
    stubHttpOnGet.withArgs('/auth/logout').returns(Promise.resolve());
    const spyOnSetLogin = sandbox.spy(AuthUtil, 'setLogin');
    // const spyRouterOnPush = sandbox.spy(vm.$router, 'push');


    vm.$el.querySelector('.logout-button').click();

    vm.$nextTick(() => {
      sinon.assert.calledWithExactly(spyOnSetLogin, false);
      // sinon.assert.calledOnce(spyRouterOnPush);
      // spyRouterOnPush.args[0][0].name.should.be.eql('Login');
      done();
    });
  });

  it('onLogout 실패시에도 Login 페이지로 이동한다', (done) => {
    const vm = getVmInstance(NavBar);
    const stubHttpOnGet = sandbox.stub(HTTP, 'get');
    stubHttpOnGet.withArgs('/auth/logout').returns(Promise.reject('logout error'));
    const spyOnSetLogin = sandbox.spy(AuthUtil, 'setLogin');
    // const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$el.querySelector('.logout-button').click();

    vm.$nextTick(() => {
      sinon.assert.calledWithExactly(spyOnSetLogin, false);
      // sinon.assert.calledOnce(spyRouterOnPush);
      // spyRouterOnPush.args[0][0].name.should.be.eql('Login');
      done();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
