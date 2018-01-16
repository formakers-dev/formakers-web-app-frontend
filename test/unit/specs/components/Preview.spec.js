import sinon from 'sinon';
import { expect } from 'chai';
import moment from 'moment-timezone';
import Preview from '../../../../src/components/Preview';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('Preview Component', () => {
  const sandbox = sinon.sandbox.create();

  const testProps = {
    projectId: 123456,
    interview: {
      type: '오프라인 테스트',
      apps: [{
        packageName: 'com.kakao.talk',
        appName: '카카오톡',
      }],
      introduce: '인터뷰 소개입니다',
      location: '향군타워 5층',
      locationDescription: '여기서봐요...',
      openDate: 1509375600000,
      closeDate: 1509494400000,
      interviewDate: 1509580800000,
      timeSlotTimes: [8, 10, 14],
      emergencyPhone: '010-1234-5678',
    },
  };

  const projectInfo = {
    projectId: '123456',
    name: 'old-test-project',
    introduce: '간단소개',
    image: {
      url: '/image',
    },
    images: [{
      url: '/image1',
    }, {
      url: '/image2',
    }],
    owner: {
      image: {
        url: '/owner/image',
        name: 'owner',
      },
    },
    interviewer_introduce: '인터뷰 진행자 소개!!!',
    description: '프로젝트 상세 설명',
    description_images: ['/desc/image1', '/desc/image2'],
    interviews: [],
    status: 'temporary',
  };

  describe('수정버튼이 클릭되었을 때', () => {
    it('RegisterInterview 화면으로 이동한다', (done) => {
      const vm = getVmInstance(Preview, {
        data: { project: projectInfo },
        propsData: testProps,
      });
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.$el.querySelector('.cancel-button').click();

      vm.$nextTick(() => {
        sinon.assert.calledOnce(spyRouterOnPush);
        spyRouterOnPush.args[0][0].name.should.be.eql('RegisterInterview');
        spyRouterOnPush.args[0][0].params.projectId.should.be.eql(vm.projectId);
        spyRouterOnPush.args[0][0].params.interviewData.should.be.eql(vm.interview);

        done();
      });
    });
  });

  describe('등록하기 버튼이 클릭되었을 때', () => {
    it('프로젝트 등록 API를 호출하고 성공시, My Page 화면으로 이동한다', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'post');
      stubHttpOnPost.withArgs(`/projects/${testProps.projectId}/interviews`).returns(Promise.resolve());

      const stubHttpOnGet = sandbox.stub(HTTP, 'get');
      stubHttpOnGet.withArgs(`/projects/${testProps.projectId}`).returns(Promise.resolve({ data: projectInfo }));


      const vm = getVmInstance(Preview, {
        data: { project: projectInfo },
        propsData: testProps,
      });
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.$el.querySelector('.save-button').click();

      sinon.assert.calledWithExactly(stubHttpOnPost, `/projects/${testProps.projectId}/interviews`, vm.interview);

      vm.$nextTick(() => {
        sinon.assert.calledOnce(spyRouterOnPush);
        spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
        done();
      });
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
