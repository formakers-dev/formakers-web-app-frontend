import sinon from 'sinon';
import { expect } from 'chai';
import MyPage from '../../../../src/components/MyPage';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';
import * as AuthUtil from '../../../../src/utils/auth';

describe('MyPage Component', () => {
  const sandbox = sinon.sandbox.create();

  const data = {
    projectId: 'testProjectId',
    name: 'old-test-project',
    introduce: '간단소개',
    images: ['/image1', '/image2'],
    interviewer_introduce: '인터뷰 진행자 소개!!!',
    description: '프로젝트 상세 설명',
    description_images: ['/desc/image1', '/desc/image2'],
    interviews: [{
      seq: 1,
      type: 1,
      apps: ['com.kakao.talk'],
      locationNegotiable: false,
      location: '향군타워 5층',
      openDate: '20171011',
      closeDate: '20171016',
      dateNegotiable: false,
      startDate: '20171101',
      endDate: '20171131',
      plans: [{ minute: 10, plan: '제품 소개' }, { minute: 30, plan: '테스트진행' }, {
        minute: 20,
        plan: '피드백',
      }],
    }],
    status: 'temporary',
  };

  it('created시에 projectList를 조회한다.', () => {
    const stubHttpOnPost = sandbox.stub(HTTP, 'get');
    stubHttpOnPost.withArgs('/projects').returns(Promise.resolve(data));
    const vm = getVmInstance(MyPage);

    vm.$nextTick(() => {
      expect(vm.projectList).to.be.eql(data);
    });
  });

  describe('methods test', () => {
    it('onRegisterProject 호출시 RegisterProject 페이지로 이동한다', () => {
      const vm = getVmInstance(MyPage);
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.onRegisterProject();

      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('RegisterProject');
    });

    it('onLogout 성공시 Login 페이지로 이동한다', (done) => {
      const vm = getVmInstance(MyPage);
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');
      const stubHttpOnGet = sandbox.stub(HTTP, 'get');
      stubHttpOnGet.withArgs('/auth/logout').returns(Promise.resolve());
      const spyOnSetLogin = sandbox.spy(AuthUtil, 'setLogin');

      vm.onLogout();

      vm.$nextTick(() => {
        sinon.assert.calledWithExactly(spyOnSetLogin, false);
        sinon.assert.calledOnce(spyRouterOnPush);
        spyRouterOnPush.args[0][0].name.should.be.eql('Login');
        done();
      });
    });

    it('onLogout 실패시 실패메세지를 표시한다', (done) => {
      const vm = getVmInstance(MyPage);
      const stubHttpOnGet = sandbox.stub(HTTP, 'get');
      stubHttpOnGet.withArgs('/auth/logout').returns(Promise.reject('logout error'));

      vm.onLogout();

      vm.$nextTick(() => {
        vm.logoutErrorMsg.should.be.eql('logout error 로그아웃 실패');
        done();
      });
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});