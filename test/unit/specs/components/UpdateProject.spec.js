import sinon from 'sinon';
import { expect } from 'chai';
import UpdateProject from '../../../../src/components/UpdateProject';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('UpdateProject Component', () => {
  const sandbox = sinon.sandbox.create();

  const testResponseData = {
    data: {
      projectId: 12345,
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
      status: 'temporary',
      videoUrl: 'www.video.com',
    },
  };

  const testProps = {
    projectId: 12345,
  };

  const createVmInstance = () => getVmInstance(UpdateProject, {
    propsData: testProps,
  });

  it('페이지 로딩 시, 프로젝트 정보를 조회하여 프로젝트 정보를 데이터에 세팅한다.', (done) => {
    const stubHttpOnGet = sandbox.stub(HTTP, 'get');
    stubHttpOnGet.withArgs(`/projects/${testProps.projectId}`).returns(Promise.resolve(testResponseData));

    const vm = createVmInstance();

    sinon.assert.calledWithExactly(stubHttpOnGet, `/projects/${testProps.projectId}`);

    vm.$nextTick(() => {
      vm.project.name.should.be.eql('old-test-project');
      vm.project.introduce.should.be.eql('간단소개');
      vm.project.description.should.be.eql('프로젝트 상세 설명');
      vm.project.owner.name.should.be.eql('인터뷰어');
      vm.project.owner.introduce.should.be.eql('인터뷰어소개입니다');
      vm.project.videoUrl.should.be.eql('www.video.com');

      vm.current.projectImageList[0].name.should.be.eql('image1');
      vm.current.projectImageList[0].url.should.be.eql('/image1');
      vm.current.descriptionImageList.length.should.be.eql(2);
      vm.current.descriptionImageList[0].name.should.be.eql('descImage1');
      vm.current.descriptionImageList[0].url.should.be.eql('/desc/image1');
      vm.current.descriptionImageList[1].name.should.be.eql('descImage2');
      vm.current.descriptionImageList[1].url.should.be.eql('/desc/image2');
      vm.current.ownerImageList[0].name.should.be.eql('ownerImage');
      vm.current.ownerImageList[0].url.should.be.eql('owner.image.url');
      done();
    });
  });

  it('프로젝트 정보조회 API에서 오류가 발생한 경우, 마이페이지로 이동한다', (done) => {
    const stubHttpOnGet = sandbox.stub(HTTP, 'get');
    stubHttpOnGet.withArgs(`/projects/${testProps.projectId}`).returns(Promise.reject('error'));

    const vm = createVmInstance();
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
      done();
    });
  });

  it('프로젝트수정 취소 버튼 클릭시, 마이페이지로 이동한다', (done) => {
    const vm = createVmInstance();
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$el.querySelector('.cancel-button').click();

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
      done();
    });
  });

  describe('프로젝트 수정 버튼 클릭시', () => {
    it('이미지 정보를 현행화한다', (done) => {
      const stubHttpOnGet = sandbox.stub(HTTP, 'get');
      stubHttpOnGet.withArgs(`/projects/${testProps.projectId}`).returns(Promise.resolve(testResponseData));

      const vm = createVmInstance();

      vm.$nextTick(() => {
        vm.$el.querySelector('.save-button').click();

        vm.project.image.name.should.be.eql('image1');
        vm.project.image.url.should.be.eql('/image1');
        vm.project.descriptionImages.length.should.be.eql(2);
        vm.project.descriptionImages[0].name.should.be.eql('descImage1');
        vm.project.descriptionImages[0].url.should.be.eql('/desc/image1');
        vm.project.descriptionImages[1].name.should.be.eql('descImage2');
        vm.project.descriptionImages[1].url.should.be.eql('/desc/image2');
        vm.project.owner.image.name.should.be.eql('ownerImage');
        vm.project.owner.image.url.should.be.eql('owner.image.url');

        done();
      });
    });

    it('프로젝트수정 API를 호출한다', () => {
      const vm = createVmInstance();
      const spyHttpOnPut = sandbox.spy(HTTP, 'put');

      vm.$el.querySelector('.save-button').click();

      sinon.assert.calledWithExactly(spyHttpOnPut, `/projects/${testProps.projectId}`, vm.project);
    });

    describe('프로젝트수정 API가 호출된 상황에서', () => {
      it('정상 완료 시, 마이페이지로 이동한다', (done) => {
        const stubOnHttpPut = sandbox.stub(HTTP, 'put');
        stubOnHttpPut.withArgs(`/projects/${testProps.projectId}`).returns(Promise.resolve());

        const vm = createVmInstance();
        const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

        vm.$el.querySelector('.save-button').click();

        vm.$nextTick(() => {
          sinon.assert.calledOnce(spyRouterOnPush);
          spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
          done();
        });
      });

      it('실패 시, 에러메시지를 출력한다', (done) => {
        const stubOnHttpPut = sandbox.stub(HTTP, 'put');
        stubOnHttpPut.withArgs(`/projects/${testProps.projectId}`).returns(Promise.reject());

        const vm = createVmInstance();
        const spyAlert = sandbox.spy(window, 'alert');

        vm.$el.querySelector('.save-button').click();

        vm.$nextTick(() => {
          sinon.assert.calledWithExactly(spyAlert, 'API Error');

          done();
        });
      });
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
