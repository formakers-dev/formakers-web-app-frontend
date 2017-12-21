import sinon from 'sinon';
import { expect } from 'chai';
import InterviewItem from '../../../../src/components/InterviewItem';
import { getVmInstance } from '../../testUtil';

describe('InterviewItem Component', () => {
  const sandbox = sinon.sandbox.create();

  const propsOption = {
    propsData: {
      projectId: 123456,
      interview: {
        seq: 1,
        type: '오프라인 테스트',
        apps: [{
          packageName: 'com.kakao.talk',
          appName: '카카오톡',
        }],
        introduce: '인터뷰 소개입니다',
        location: '향군타워 5층',
        locationDescription: '여기서봐요...',
        openDate: '2017-11-03',
        closeDate: '2017-11-03',
        interviewDate: '2017-11-03',
        timeSlotTimes: [8, 10, 14],
        emergencyPhone: '010-1234-5678',
      },
      datePicker: {
        openDate: new Date('2017-10-31'),
        closeDate: new Date('2017-11-01'),
        interviewDate: new Date('2017-11-02'),
      },
    },
  };

  it('인터뷰 수정 버튼 클릭 시, 인터뷰 수정 화면으로 이동한다', (done) => {
    const vm = getVmInstance(InterviewItem, propsOption);
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$el.querySelector('.update-button-area').click();

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('UpdateInterview');
      spyRouterOnPush.args[0][0].params.projectId.should.be.eql(123456);
      spyRouterOnPush.args[0][0].params.interviewSeq.should.be.eql(1);

      done();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
