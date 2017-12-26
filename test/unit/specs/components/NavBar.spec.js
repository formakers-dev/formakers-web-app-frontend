import sinon from 'sinon';
import { expect } from 'chai';
import NavBar from '../../../../src/components/NavBar';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';
import * as AuthUtil from '../../../../src/utils/auth';

describe('NavBar Component', () => {
  let sandbox;
  before(() => {
    sandbox = sinon.sandbox.create();
  });

  // TODO : Login Test Code
  describe('LogIn 버튼 클릭 시', () => {

  });

  describe('Logout 버튼 클릭 시', () => {
    let stubHttpOnGet;

    beforeEach(() => {
      stubHttpOnGet = sandbox.stub(HTTP, 'get');
      stubHttpOnGet.withArgs('/auth/check_login').returns(Promise.resolve({
        data: {
          username: '혜리',
        },
      }));
      sandbox.stub(AuthUtil, 'isLoggedIn').returns(true);
    });

    it('성공시 Login 페이지로 이동한다', (done) => {
      const vm = getVmInstance(NavBar, {
        data: {
          isLogin: true,
        },
      });
      stubHttpOnGet.withArgs('/auth/logout').returns(Promise.resolve());
      const spyOnSetLogin = sandbox.spy(AuthUtil, 'setLogin');
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.$el.querySelector('#logout-button').click();

      vm.$nextTick(() => {
        sinon.assert.calledWithExactly(spyOnSetLogin, false);
        sinon.assert.called(spyRouterOnPush);

        const nameList = spyRouterOnPush.args.map(objectList => objectList[0].name);
        nameList.should.be.include('Login');
        done();
      });
    });

    it('실패시 Login 페이지로 이동한다', (done) => {
      const vm = getVmInstance(NavBar, {
        data: {
          isLogin: true,
        },
      });

      stubHttpOnGet.withArgs('/auth/logout').returns(Promise.reject('logout error'));
      const spyOnSetLogin = sandbox.spy(AuthUtil, 'setLogin');
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.$el.querySelector('#logout-button').click();

      vm.$nextTick(() => {
        sinon.assert.calledWithExactly(spyOnSetLogin, false);
        sinon.assert.called(spyRouterOnPush);

        const nameList = spyRouterOnPush.args.map(objectList => objectList[0].name);
        nameList.should.be.include('Login');
        done();
      });
    });

    afterEach(() => {
      sandbox.restore();
    });
  });
});
