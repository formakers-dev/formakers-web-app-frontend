import sinon from 'sinon';
import { expect } from 'chai';
import MyPage from '../../../../src/components/MyPage';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

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

  describe('created 시', () => {
    describe('projectList 조회 시', () => {
      it('정상적으로 조회한다.', () => {
        sandbox.stub(HTTP, 'get').withArgs('/projects').returns(Promise.resolve(data));

        const vm = getVmInstance(MyPage);

        vm.$nextTick(() => {
          expect(vm.projectList).to.be.eql(data);
        });
      });

      it('검증되지 않은 사용자인 경우(403), 미검증유저를 뜻하는 이벤트를 보낸다', (done) => {
        sandbox.stub(HTTP, 'get').withArgs('/projects').returns(Promise.reject({
          response: {
            status: 403,
          },
        }));

        const vm = getVmInstance(MyPage);
        const spyEmit = sandbox.spy(vm, '$emit');

        vm.$nextTick(() => {
          sinon.assert.calledWithExactly(spyEmit, 'unverified-user');

          done();
        });
      });
    });
  });

  it('프로젝트 등록 클릭시 RegisterProject 페이지로 이동한다', (done) => {
    const vm = getVmInstance(MyPage);
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$el.querySelector('.register-project-button-area').click();

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('RegisterProject');
      done();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
