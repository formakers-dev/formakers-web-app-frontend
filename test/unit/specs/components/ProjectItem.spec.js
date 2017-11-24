import sinon from 'sinon';
import { expect } from 'chai';
import ProjectItem from '../../../../src/components/ProjectItem';
import { getVmInstance } from '../../testUtil';

describe('ProjectItem Component', () => {
  const sandbox = sinon.sandbox.create();
  const propsOption = {
    propsData: {
      project: {
        projectId: 123456,
        images: [{
          url: 'imageUrl',
        }],
      },
    },
  };

  it('인터뷰 추가 버튼 클릭 시, 인터뷰 등록화면으로 이동한다', (done) => {
    const vm = getVmInstance(ProjectItem, propsOption);
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$el.querySelector('.add-interview-button').click();

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('RegisterInterview');
      spyRouterOnPush.args[0][0].params.projectId.should.be.eql(123456);
      done();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
