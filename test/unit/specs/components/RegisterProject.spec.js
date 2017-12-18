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
      image: {
        name: 'image1',
        url: '/image1',
      },
      description: '프로젝트 상세 설명',
      descriptionImages: [{
        name: 'descImage1',
        url: '/desc/image1',
      }, {
        name: 'descImage2',
        url: '/desc/image2',
      }],
      owner: {
        name: '인터뷰어',
        image: {
          name: 'ownerImage',
          url: 'owner.image.url',
        },
        introduce: '인터뷰어소개입니다',
      },
      videoUrl: 'www.video.com',
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
        expect(vm.project.image.name).to.be.eql('image1');
        expect(vm.project.image.url).to.be.eql('/image1');
        expect(vm.project.description).to.be.eql('프로젝트 상세 설명');
        expect(vm.project.descriptionImages.length).to.be.eql(2);
        expect(vm.project.descriptionImages[0].name).to.be.eql('descImage1');
        expect(vm.project.descriptionImages[0].url).to.be.eql('/desc/image1');
        expect(vm.project.descriptionImages[1].name).to.be.eql('descImage2');
        expect(vm.project.descriptionImages[1].url).to.be.eql('/desc/image2');
        expect(vm.project.owner.name).to.be.eql('인터뷰어');
        expect(vm.project.owner.image.name).to.be.eql('ownerImage');
        expect(vm.project.owner.image.url).to.be.eql('owner.image.url');
        expect(vm.project.owner.introduce).to.be.eql('인터뷰어소개입니다');
        expect(vm.project.videoUrl).to.be.eql('www.video.com');
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

  it('onUpdateImage 호출 시, 프로젝트 정보의 이미지목록을 업데이트 한다', () => {
    const vm = getVmInstance(RegisterProject);
    const mockFileMetadataList = [{
      url: 'test-url',
      name: 'test-name',
    }];

    vm.onUpdateImage(mockFileMetadataList);

    expect(vm.project.image).to.be.eql(mockFileMetadataList[0]);
  });

  it('onUpdateOwnerImage 호출 시, 프로젝트 인터뷰어의 이미지 url을 업데이트 한다', () => {
    const vm = getVmInstance(RegisterProject);
    const mockFileMetadataList = [{
      url: 'test-url',
      name: 'test',
    }];

    vm.onUpdateOwnerImage(mockFileMetadataList);

    expect(vm.project.owner.image).to.be.eql(mockFileMetadataList[0]);
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
