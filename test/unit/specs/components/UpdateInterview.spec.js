import sinon from 'sinon';
import { expect } from 'chai';
import UpdateInterview from '../../../../src/components/UpdateInterview';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('UpdateInterview Component', () => {
  const sandbox = sinon.sandbox.create();

  const testInterviewData = {
    data: {
      projectId: 1234,
      customerId: 5678,
      name: '인터뷰-조회용-project',
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
      status: 'registered',
      owner: {
        name: '혜리',
        image: {
          name: 'toonImage',
          url: 'https://toonStoryUrl',
        },
        introduce: '툰스토리 디자이너',
      },
      videoUrl: 'www.video.com',
      interviews: {
        timeSlot: {
          time6: '',
          time7: '',
          time8: 'google110897406327517511196',
          time9: 'google112909653374339401399',
          time10: '',
        },
        totalCount: 5,
        emergencyPhone: '010-119-119',
        openDate: 1509462000000,         // 2017-11-01 00:00:00.000 KST
        closeDate: 1509634799999,        // 2017-11-02 23:59:59.999 KST
        interviewDate: 1509721199999,    // 2017-11-03 23:59:59.999 KST
        locationDescription: '수원사업장으로 오세요',
        location: '수원 사업장',
        type: '오프라인 인터뷰',
        introduce: '인터뷰 소개',
        seq: 1,
        notifiedUserIds: [
          'google112909653374339401399',
          '112909653374339401399',
          '116136954630190256240',
          'google116136954630190256240',
          'google110997368786962641889',
          'google110897406327517511196',
          '110897406327517511196',
          '109974316241227718963',
        ],
        apps: [
          {
            packageName: 'com.google.android.gm',
            appName: 'Gmail',
          },
        ],
      },
    },
  };

  const testProps = {
    projectId: 1234,
    interviewSeq: 1,
  };

  const createVmInstance = () => getVmInstance(UpdateInterview, {
    propsData: testProps,
  });

  let stubHttpOnGetInterview;

  beforeEach(() => {
    stubHttpOnGetInterview = sandbox.stub(HTTP, 'get');
    stubHttpOnGetInterview.withArgs(`/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`).returns(Promise.resolve(testInterviewData));
  });

  it('페이지 로딩 시, 인터뷰 정보를 조회하여 data를 세팅한다.', (done) => {
    const vm = createVmInstance();

    sinon.assert.calledWithExactly(stubHttpOnGetInterview, `/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`);

    vm.$nextTick(() => {
      vm.interview.type.should.be.eql('오프라인 인터뷰');
      vm.interview.apps[0].packageName.should.be.eql('com.google.android.gm');
      vm.interview.apps[0].appName.should.be.eql('Gmail');
      vm.interview.introduce.should.be.eql('인터뷰 소개');
      vm.interview.location.should.be.eql('수원 사업장');
      vm.interview.locationDescription.should.be.eql('수원사업장으로 오세요');
      vm.interview.openDate.should.be.eql(1509462000000);
      vm.interview.closeDate.should.be.eql(1509634799999);
      vm.interview.interviewDate.should.be.eql(1509721199999);
      vm.interview.timeSlotTimes.should.be.eql([6, 7, 8, 9, 10]);
      vm.interview.emergencyPhone.should.be.eql('010-119-119');

      vm.datePicker.openDate.should.be.eql(new Date(1509462000000));
      vm.datePicker.closeDate.should.be.eql(new Date(1509634799999));
      vm.datePicker.interviewDate.should.be.eql(new Date(1509721199999));
      done();
    });
  });

  it('인터뷰 정보 조회 실패시, 마이페이지로 이동한다.', (done) => {
    stubHttpOnGetInterview.withArgs(`/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`).returns(Promise.reject());

    const vm = createVmInstance();
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    sinon.assert.calledWithExactly(stubHttpOnGetInterview, `/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`);

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
      done();
    });
  });

  it('취소 버튼 클릭시, 마이페이지로 이동한다', (done) => {
    const vm = createVmInstance();
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    vm.$el.querySelector('.cancel-button').click();

    vm.$nextTick(() => {
      sinon.assert.calledOnce(spyRouterOnPush);
      spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
      done();
    });
  });

  describe('수정 버튼 클릭시', () => {
    // TODO: time locale error
    // it('인터뷰 수정 API를 호출한다', (done) => {
    //   const vm = createVmInstance();
    //   const spyHttpOnPut = sandbox.spy(HTTP, 'put');
    //
    //   vm.datePicker.openDate = new Date(1509462001111);
    //   vm.datePicker.closeDate = new Date(1509634790000);
    //   vm.datePicker.interviewDate = new Date(1509721190000);
    //
    //   vm.$el.querySelector('.save-button').click();
    //
    //   vm.interview.openDate.should.be.eql(1509462000000);
    //   vm.interview.closeDate.should.be.eql(1509634799999);
    //   vm.interview.interviewDate.should.be.eql(1509721199999);
    //   sinon.assert.calledWithExactly(spyHttpOnPut, `/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`, vm.interview);
    //   done();
    // });

    describe('인터뷰 수정 API가 호출된 상황에서', () => {
      it('정상 완료 시, 마이페이지로 이동한다', (done) => {
        const stubOnHttpPut = sandbox.stub(HTTP, 'put');
        stubOnHttpPut.withArgs(`/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`).returns(Promise.resolve());

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
        stubOnHttpPut.withArgs(`/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`).returns(Promise.reject());

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
