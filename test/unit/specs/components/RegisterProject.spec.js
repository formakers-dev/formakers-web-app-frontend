import sinon from 'sinon';
import axios from 'axios';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
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

  it('registerProject 호출 시, 등록 상태로 변경하고 프로젝트 등록API를 호출한다.', () => {
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('/project').reply(200, {});
    const spyHttpOnPost = sandbox.spy(HTTP, 'post');

    const vm = getVmInstance(RegisterProject);

    vm.registerProject();

    expect(vm.project.status).to.be.eql('registered');
    sinon.assert.calledWithExactly(spyHttpOnPost, '/project', vm.project);
  });

  it('프로젝트 임시저장 버튼이 클릭되었을 때, tempRegisterProject 메소드가 호출된다.', () => {
    const spyOnTemp = sandbox.spy(RegisterProject.methods, 'tempRegisterProject');
    const vm = getVmInstance(RegisterProject);
    const button = vm.$el.querySelector('.temporary-save-button');

    button.click();

    sinon.assert.calledOnce(spyOnTemp);
  });

  it('tempRegisterProject 호출 시, 임시저장 상태로 변경하고 프로젝트 등록 API가 호출된다', () => {
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('/project').reply(200, {});
    const spyHttpOnPost = sandbox.spy(HTTP, 'post');

    const vm = getVmInstance(RegisterProject);

    vm.tempRegisterProject();

    expect(vm.project.status).to.be.eql('temporary');
    sinon.assert.calledWithExactly(spyHttpOnPost, '/project', vm.project);
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
