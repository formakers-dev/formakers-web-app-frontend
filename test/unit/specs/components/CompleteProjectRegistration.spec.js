import sinon from 'sinon';
import { expect } from 'chai';
import CompleteProjectRegistration from '../../../../src/components/CompleteProjectRegistration.vue';
import { getVmInstance } from '../../testUtil';

describe('CompleteProjectRegistration Component', () => {
  const sandbox = sinon.sandbox.create();
  const propsOption = {
    propsData: {
      projectId: 123456,
    },
  };

  it('무료모집 시작버튼 클릭시, 인터뷰 등록화면으로 이동한다', (done) => {
    const vm = getVmInstance(CompleteProjectRegistration, propsOption);
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$el.querySelector('.save-button').click();

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('RegisterInterview');
      spyRouterOnPush.args[0][0].params.projectId.should.be.eql(123456);

      done();
    });
  });

  it('다음에 하겠습니다, 마이페이지로 이동한다', (done) => {
    const vm = getVmInstance(CompleteProjectRegistration, propsOption);
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$el.querySelector('.cancel-button').click();

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');

      done();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
