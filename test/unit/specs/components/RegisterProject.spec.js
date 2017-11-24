import sinon from 'sinon';
import { expect } from 'chai';
import RegisterProject from '../../../../src/components/RegisterProject';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('RegisterProject Component', () => {
  const sandbox = sinon.sandbox.create();

  const testData = {
    project: {
      name: 'old-test-project',
      introduce: '간단소개',
      images: ['/image1', '/image2'],
      apps: ['com.kakao.talk'],
      description: '프로젝트 상세 설명',
      descriptionImages: ['/desc/image1', '/desc/image2'],
      owner: {
        name: '인터뷰어',
        url: 'interviewr image',
        introduce: '인터뷰어소개입니다',
      },
      status: 'temporary',
    },
  };

  const testResponse = {
    data: {
      projectId: 'testProjectId',
    },
  };

  describe('프로젝트 등록 버튼이 클릭되었을 때', () => {
    it('registerProject 메소드가 호출된다', () => {
      const spyOnRegisterProject = sandbox.spy(RegisterProject.methods, 'registerProject');
      const vm = getVmInstance(RegisterProject);
      const button = vm.$el.querySelector('.save-button');

      button.click();

      sinon.assert.calledOnce(spyOnRegisterProject);
    });

    it('registerProject 호출 시, 등록 상태로 변경하고 프로젝트 등록API를 호출한다.', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'post');
      stubHttpOnPost.withArgs('/projects').returns(Promise.resolve(testResponse));
      const option = {
        data: testData,
      };
      const vm = getVmInstance(RegisterProject, option);

      vm.registerProject();

      vm.$nextTick(() => {
        expect(vm.project.name).to.be.eql('old-test-project');
        expect(vm.project.introduce).to.be.eql('간단소개');
        expect(vm.project.images.length).to.be.eql(2);
        expect(vm.project.images[0]).to.be.eql('/image1');
        expect(vm.project.images[1]).to.be.eql('/image2');
        expect(vm.project.apps.length).to.be.eql(1);
        expect(vm.project.apps[0]).to.be.eql('com.kakao.talk');
        expect(vm.project.description).to.be.eql('프로젝트 상세 설명');
        expect(vm.project.descriptionImages.length).to.be.eql(2);
        expect(vm.project.descriptionImages[0]).to.be.eql('/desc/image1');
        expect(vm.project.descriptionImages[1]).to.be.eql('/desc/image2');
        expect(vm.project.owner.name).to.be.eql('인터뷰어');
        expect(vm.project.owner.url).to.be.eql('interviewr image');
        expect(vm.project.owner.introduce).to.be.eql('인터뷰어소개입니다');
        expect(vm.project.status).to.be.eql('registered');
        sinon.assert.calledWithExactly(stubHttpOnPost, '/projects', vm.project);
        done();
      });
    });

    it('프로젝트 등록 성공시 projectId를 전달하고 인터뷰등록 페이지로 이동', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'post');
      stubHttpOnPost.withArgs('/projects').returns(Promise.resolve(testResponse));
      const vm = getVmInstance(RegisterProject);
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.registerProject();

      vm.$nextTick(() => {
        sinon.assert.calledOnce(spyRouterOnPush);
        spyRouterOnPush.args[0][0].name.should.be.eql('RegisterInterview');
        spyRouterOnPush.args[0][0].params.projectId.should.be.eql(testResponse.data.projectId);
        done();
      });
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
      stubHttpOnPost.withArgs('/projects').returns(Promise.resolve(testResponse));
      const vm = getVmInstance(RegisterProject);

      vm.tempRegisterProject();

      vm.$nextTick(() => {
        expect(vm.project.status).to.be.eql('temporary');
        sinon.assert.calledWithExactly(stubHttpOnPost, '/projects', vm.project);
        done();
      });
    });

    it('프로젝트 등록 API가 성공 시, 프로젝트 리스트 화면으로 이동한다', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'post');
      stubHttpOnPost.withArgs('/projects').returns(Promise.resolve(testResponse));
      const vm = getVmInstance(RegisterProject);
      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.tempRegisterProject();

      vm.$nextTick(() => {
        sinon.assert.calledOnce(spyRouterOnPush);
        spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
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

  it('onUpdateOwnerImage 호출 시, 프로젝트 인터뷰어의 이미지 url을 업데이트 한다', () => {
    const vm = getVmInstance(RegisterProject);
    const mockFileMetadata = [{
      url: 'test-url',
      name: 'test',
    }];

    vm.onUpdateOwnerImage(mockFileMetadata);

    expect(vm.project.owner.url).to.be.eql(mockFileMetadata[0].url);
  });

  it('onUpdateDescriptionImages 호출 시, 프로젝트 인터뷰의 descriptionImage에 url을 업데이트 한다.', () => {
    const vm = getVmInstance(RegisterProject);
    const mockFileMetadata = [{
      url: 'www.descriptionUrl1.com',
      name: 'description1',
    }, {
      url: 'www.descriptionUrl2.com',
      name: 'description2',
    }];

    vm.onUpdateDescriptionImages(mockFileMetadata);
    expect(vm.project.descriptionImages.length).to.be.eql(2);
    expect(vm.project.descriptionImages[0].url).to.be.eql('www.descriptionUrl1.com');
    expect(vm.project.descriptionImages[0].name).to.be.eql('description1');
    expect(vm.project.descriptionImages[1].url).to.be.eql('www.descriptionUrl2.com');
    expect(vm.project.descriptionImages[1].name).to.be.eql('description2');
  });

  afterEach(() => {
    sandbox.restore();
  });
});
