import sinon from 'sinon';
import { expect } from 'chai';
import RegisterProject from '../../../../src/components/RegisterProject';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('RegisterProject Component', () => {
  const sandbox = sinon.sandbox.create();

  it('프로젝트 등록 버튼이 클릭되었을 때, registerProject 메소드가 호출된다', () => {
    const spyOnRegisterProject = sandbox.spy(RegisterProject.methods, 'registerProject');
    const vm = getVmInstance(RegisterProject);
    const button = vm.$el.querySelector('.save-button');

    button.click();

    sinon.assert.calledOnce(spyOnRegisterProject);
  });

  it('registerProject 호출 시, 등록 상태로 변경하고 프로젝트 등록API를 호출한다.', (done) => {
    const stubHttpOnPost = sandbox.stub(HTTP, 'post');
    stubHttpOnPost.withArgs('/project').returns(Promise.resolve());

    const vm = getVmInstance(RegisterProject);

    vm.registerProject();

    vm.$nextTick(() => {
      expect(vm.project.status).to.be.eql('registered');
      sinon.assert.calledWithExactly(stubHttpOnPost, '/project', vm.project);
      done();
    });
  });

  describe('프로젝트 임시저장 버튼이 클릭되었을 때', () => {
    it('tempRegisterProject 메소드가 호출된다.', () => {
      const spyOnTemp = sandbox.spy(RegisterProject.methods, 'tempRegisterProject');
      const vm = getVmInstance(RegisterProject);
      const button = vm.$el.querySelector('.temporary-save-button');

      button.click();

      sinon.assert.calledOnce(spyOnTemp);
    });

    it('임시저장 상태로 변경하고 프로젝트 등록 API가 호출된다', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'post');
      stubHttpOnPost.withArgs('/project').returns(Promise.resolve());

      const vm = getVmInstance(RegisterProject);

      vm.tempRegisterProject();

      vm.$nextTick(() => {
        expect(vm.project.status).to.be.eql('temporary');
        sinon.assert.calledWithExactly(stubHttpOnPost, '/project', vm.project);
        done();
      });
    });

    it('프로젝트 등록 API가 성공 시, 프로젝트 리스트 화면으로 이동한다', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'post');
      stubHttpOnPost.withArgs('/project').returns(Promise.resolve());

      const vm = getVmInstance(RegisterProject);
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.tempRegisterProject();

      vm.$nextTick(() => {
        sinon.assert.calledWithExactly(spyRouterOnPush, 'my_page');
        done();
      });
    });
  });

  it('onUpdateFileData 호출 시, 프로젝트 정보의 이미지목록을 업데이트 한다', () => {
    const vm = getVmInstance(RegisterProject);
    const mockFileMetadataList = [{
      url: 'test-url',
      name: 'test-name',
    }];

    vm.onUpdateFileData(mockFileMetadataList);

    expect(vm.project.images).to.be.eql(mockFileMetadataList);
  });

  afterEach(() => {
    sandbox.restore();
  });
});
