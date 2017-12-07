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

  it('페이지 로딩 시, 프로젝트 정보를 조회하여 프로젝트 정보를 데이터에 세팅한다.', (done) => {
    const stubHttpOnGet = sandbox.stub(HTTP, 'get');
    stubHttpOnGet.withArgs(`/projects/${testProps.projectId}`).returns(Promise.resolve(testResponseData));

    const vm = getVmInstance(UpdateProject, {
      data: {},
      propsData: testProps,
    });

    sinon.assert.calledWithExactly(stubHttpOnGet, `/projects/${testProps.projectId}`);

    vm.$nextTick(() => {
      vm.project.name.should.be.eql('old-test-project');
      vm.project.introduce.should.be.eql('간단소개');
      vm.project.image.name.should.be.eql('image1');
      vm.project.image.url.should.be.eql('/image1');
      vm.project.description.should.be.eql('프로젝트 상세 설명');
      vm.project.descriptionImages.length.should.be.eql(2);
      vm.project.descriptionImages[0].name.should.be.eql('descImage1');
      vm.project.descriptionImages[0].url.should.be.eql('/desc/image1');
      vm.project.descriptionImages[1].name.should.be.eql('descImage2');
      vm.project.descriptionImages[1].url.should.be.eql('/desc/image2');
      vm.project.owner.name.should.be.eql('인터뷰어');
      vm.project.owner.image.name.should.be.eql('ownerImage');
      vm.project.owner.image.url.should.be.eql('owner.image.url');
      vm.project.owner.introduce.should.be.eql('인터뷰어소개입니다');
      vm.project.videoUrl.should.be.eql('www.video.com');

      done();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
