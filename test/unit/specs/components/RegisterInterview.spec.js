import sinon from 'sinon';
import { expect } from 'chai';
import RegisterInterview from '../../../../src/components/RegisterInterview';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('RegisterInterView Component', () => {
  const sandbox = sinon.sandbox.create();

  const testProps = {
    projectId: 'testProjectId',
  };

  const testData = {
    interview: {
      type: '오프라인 테스트',
      location: '향군타워 5층',
      openDate: '2017-11-03',
      closeDate: '2017-11-03',
      startDate: '2017-11-03',
      endDate: '2017-11-03',
      plans: [{
        minute: 10,
        plan: '제품소개',
      }, {
        minute: 30,
        plan: '인터뷰',
      }],
    },
    datePicker: {
      openDate: new Date('2017-10-11'),
      closeDate: new Date('2017-10-16'),
      startDate: new Date('2017-11-01'),
      endDate: new Date('2017-11-30'),
    },
  };

  describe('다음에 하겠습니다 버튼이 클릭되었을 때', () => {
    it('프로젝트 등록 API가 성공 시, My Page 화면으로 이동한다', () => {
      const vm = getVmInstance(RegisterInterview);
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      const button = vm.$el.querySelector('.skip-button');

      button.click();

      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
    });
  });

  describe('화면이 로딩 되었을때', () => {
    it('인터뷰 입력 초기값이 셋팅 된다', () => {
      const vm = getVmInstance(RegisterInterview);
      expect(vm.$data.interview.type).to.be.eql('오프라인 인터뷰');
    });
  });

  describe('미리 보기 버튼이 클릭되었을 때', () => {
    it('registerInterview 메소드가 호출된다', () => {
      const spyOnRegisterInterview = sandbox.spy(RegisterInterview.methods, 'registerInterview');
      const vm = getVmInstance(RegisterInterview);
      const button = vm.$el.querySelector('.save-button');

      button.click();

      sinon.assert.calledOnce(spyOnRegisterInterview);
    });

    it('registerInterview 호출 시, 인터뷰 정보를 등록한다', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'post');

      stubHttpOnPost.withArgs(`/projects/${testProps.projectId}/interviews`).returns(Promise.resolve());

      const option = {
        data: testData,
        propsData: testProps,
      };

      const vm = getVmInstance(RegisterInterview, option);

      vm.registerInterview();

      vm.$nextTick(() => {
        expect(vm.interview.type).to.be.eql('오프라인 테스트');
        expect(vm.interview.location).to.be.eql('향군타워 5층');
        expect(vm.interview.openDate).to.be.eql('2017-10-11');
        expect(vm.interview.closeDate).to.be.eql('2017-10-16');
        expect(vm.interview.startDate).to.be.eql('2017-11-01');
        expect(vm.interview.endDate).to.be.eql('2017-11-30');
        expect(vm.interview.plans.length).to.be.eql(2);
        expect(vm.interview.plans[0].minute).to.be.eql(10);
        expect(vm.interview.plans[0].plan).to.be.eql('제품소개');
        expect(vm.interview.plans[1].minute).to.be.eql(30);
        expect(vm.interview.plans[1].plan).to.be.eql('인터뷰');
        sinon.assert.calledWithExactly(stubHttpOnPost, `/projects/${testProps.projectId}/interviews`, vm.interview);
        done();
      });
    });
  });

  describe('인터뷰 임시저장 버튼이 클릭되었을 때', () => {
    it('tempRegisterInterview 메소드가 호출된다.', () => {
      const spyOnTemp = sandbox.spy(RegisterInterview.methods, 'tempRegisterInterview');
      const vm = getVmInstance(RegisterInterview);
      const button = vm.$el.querySelector('.temporary-save-button');

      button.click();

      sinon.assert.calledOnce(spyOnTemp);
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
