import sinon from 'sinon';
import { expect } from 'chai';
import RegisterProject from '../../../../src/components/RegisterProject';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('RegisterProject Component', () => {
  const sandbox = sinon.sandbox.create();
  const clock = sandbox.useFakeTimers();

  const testData = {
    project: {
      name: 'old-test-project',
      introduce: '간단소개',
      images: ['/image1', '/image2'],
      apps: ['com.kakao.talk'],
      description: '프로젝트 상세 설명',
      description_images: ['/desc/image1', '/desc/image2'],
      interviewer: {
        name: '인터뷰어',
        url: 'interviewr image',
        introduce: '인터뷰어소개입니다',
      },
      status: 'temporary',
    },
  };

  const searchResult = {
    data: [{ _id: '5988097cb495479821f2d188',
      developer: 'Kakao Corporation',
      star: 4.3,
      description: '카카오톡은 전세계 어디서나 안드로이드폰과 아이폰 사용자간 무료로 메시지를 ...',
      contentsRating: '만 3세 이상',
      categoryId1: '/store/apps/category/COMMUNICATION',
      categoryName1: '커뮤니케이션',
      categoryId2: '',
      categoryName2: '',
      inappPriceMin: 1000,
      reviewCount: 2434177,
      packageName: 'com.kakao.talk',
      appName: '카카오톡 KakaoTalk',
      inappPriceMax: 90909,
      installsMin: 100000000,
      updatedDate: '20170720',
      similarApps:
      ['com.tencent.mm',
        'jp.naver.line.android',
        'com.facebook.orca',
        'com.whatsapp',
        'com.imo.android.imoim',
        'com.viber.voip',
        'com.skype.raider',
        'com.facebook.mlite',
        'org.telegram.messenger',
        'com.bbm',
        'com.azarlive.android',
        'ru.mail',
        'kik.android',
        'com.google.android.talk',
        'com.imo.android.imoimbeta',
        'com.icq.mobile.client',
        'com.wWhatsUpMessenger_4083770'],
      appPrice: 0,
      installsMax: 500000000 }],
  };

  const testResponse = {
    data: {
      projectId: 'testProjectId',
    },
  };

  describe('유사앱 검색 버튼이 클릭되었을 때', () => {
    it('getSimilarApp 메소드가 호출된다', () => {
      const spyOnGetSimilarApp = sandbox.spy(RegisterProject.methods, 'getSimilarApp');
      const vm = getVmInstance(RegisterProject);
      const button = vm.$el.querySelector('.search-button');

      button.click();

      sinon.assert.calledOnce(spyOnGetSimilarApp);
    });

    it('getSimilarApp 호출 시, 유사 앱이 조회된다', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'get');
      stubHttpOnPost.withArgs('/apps?keyword=kakao').returns(Promise.resolve(searchResult));
      const option = {
        data: {
          similarAppname: 'kakao',
          apps: [],
        },
      };
      const vm = getVmInstance(RegisterProject, option);

      vm.getSimilarApp();

      vm.$nextTick(() => {
        expect(vm.apps.length).to.be.eql(1);
        expect(vm.apps[0].developer).to.be.eql('Kakao Corporation');
        expect(vm.apps[0].appName).to.be.eql('카카오톡 KakaoTalk');
        done();
      });
    });

    it('검색된 리스트가 클릭되면, project.apps필드에 packageName이 추가된다.', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'get');
      stubHttpOnPost.withArgs('/apps?keyword=kakao').returns(Promise.resolve(searchResult));
      const option = {
        data: {
          similarAppname: 'kakao',
          apps: [],
        },
      };
      const vm = getVmInstance(RegisterProject, option);
      vm.getSimilarApp();
      vm.$forceUpdate();
      vm.$nextTick(() => {
        const firstChild = vm.$el.querySelector('.search-result-list li:nth-child(1)');
        expect(firstChild.textContent.trim()).to.be.eql('카카오톡 KakaoTalk');

        firstChild.click();

        expect(vm.project.apps[0]).to.be.eql('com.kakao.talk');
        done();
      });
    });
  });

  it('유사앱 이름이 입력된 후 300ms가 지나면 getSimilarApp가 호출된다', (done) => {
    const spyOnGetSimilarApp = sandbox.spy(RegisterProject.methods, 'getSimilarApp');
    const option = {
      data: {
        similarAppname: '',
        apps: [],
      },
    };
    const vm = getVmInstance(RegisterProject, option);

    vm.similarAppname = 'kakao';

    vm.$nextTick(() => {
      clock.tick(300);
      sinon.assert.calledOnce(spyOnGetSimilarApp);
      done();
    });
  });

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
        expect(vm.project.description_images.length).to.be.eql(2);
        expect(vm.project.description_images[0]).to.be.eql('/desc/image1');
        expect(vm.project.description_images[1]).to.be.eql('/desc/image2');
        expect(vm.project.interviewer.name).to.be.eql('인터뷰어');
        expect(vm.project.interviewer.url).to.be.eql('interviewr image');
        expect(vm.project.interviewer.introduce).to.be.eql('인터뷰어소개입니다');
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

  it('onUpdateInterviewerImage 호출 시, 프로젝트 인터뷰어의 이미지 url을 업데이트 한다', () => {
    const vm = getVmInstance(RegisterProject);
    const mockFileMetadata = [{
      url: 'test-url',
      name: 'test',
    }];

    vm.onUpdateInterviewerImage(mockFileMetadata);

    expect(vm.project.interviewer.url).to.be.eql(mockFileMetadata[0].url);
  });

  afterEach(() => {
    sandbox.restore();
  });
});
