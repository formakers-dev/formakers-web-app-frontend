import sinon from 'sinon';
import { expect } from 'chai';
import moment from 'moment-timezone';
import UpdateInterview from '../../../../src/components/UpdateInterview';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('UpdateInterview Component', () => {
  const sandbox = sinon.sandbox.create();

  before(() => {
    moment.tz.setDefault('Asia/Seoul');
  });

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

  let stubHttpOnGet;

  beforeEach(() => {
    stubHttpOnGet = sandbox.stub(HTTP, 'get');
    stubHttpOnGet.withArgs(`/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`).returns(Promise.resolve(testInterviewData));
  });

  it('페이지 로딩 시, 인터뷰 정보를 조회하여 data를 세팅한다.', (done) => {
    const vm = createVmInstance();

    sinon.assert.calledWithExactly(stubHttpOnGet, `/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`);

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
    stubHttpOnGet.withArgs(`/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`).returns(Promise.reject());

    const vm = createVmInstance();
    const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

    sinon.assert.calledWithExactly(stubHttpOnGet, `/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`);

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
    it('인터뷰 수정 API를 호출한다', (done) => {
      const vm = createVmInstance();
      const spyHttpOnPut = sandbox.spy(HTTP, 'put');

      vm.datePicker.openDate = new Date(1509462001111);
      vm.datePicker.closeDate = new Date(1509634790000);
      vm.datePicker.interviewDate = new Date(1509721190000);

      vm.$el.querySelector('.save-button').click();

      vm.interview.openDate.should.be.eql(1509462000000);
      vm.interview.closeDate.should.be.eql(1509634799999);
      vm.interview.interviewDate.should.be.eql(1509721199999);
      sinon.assert.calledWithExactly(spyHttpOnPut, `/projects/${testProps.projectId}/interviews/${testProps.interviewSeq}`, vm.interview);
      done();
    });

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


  describe('searchApp 호출 시', () => {
    const searchResult = {
      data: [{
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
          'com.wWhatsUpMessenger_4083770'],
        appPrice: 0,
        installsMax: 500000000,
        iconUrl: 'https://kakao.com/icon/url',
      }],
    };

    it('유사 앱이 조회된다', (done) => {
      stubHttpOnGet.withArgs('/apps?keyword=').returns(Promise.resolve(searchResult));
      const vm = createVmInstance();

      vm.searchApp();

      vm.$nextTick(() => {
        expect(vm.searchedApps.length).to.be.eql(1);
        expect(vm.searchedApps[0].packageName).to.be.eql('com.kakao.talk');
        expect(vm.searchedApps[0].iconUrl).to.be.eql('https://kakao.com/icon/url');
        expect(vm.searchedApps[0].appName).to.be.eql('카카오톡 KakaoTalk');
        expect(vm.searchedApps[0].developer).to.be.eql('Kakao Corporation');


        vm.$nextTick(() => {
          expect(vm.$el.querySelector('.searched-app-icon').getAttribute('src')).to.be.eql('https://kakao.com/icon/url');
          expect(vm.$el.querySelector('.searched-app-title').innerText).to.be.eql('카카오톡 KakaoTalk');
          expect(vm.$el.querySelector('.searched-app-developer').innerText).to.be.eql('Kakao Corporation');

          done();
        });
      });
    });
  });

  describe('벤치마킹 앱검색 이름 변경 시', () => {
    let clock;

    beforeEach(() => {
      clock = sandbox.useFakeTimers();
    });

    it('벤치마킹 앱검색 이름 변경되고 300ms가 지나면 searchApp를 호출된다', (done) => {
      stubHttpOnGet.withArgs('/apps?keyword=kakao').returns(Promise.resolve());
      const spyOnSearchApp = sandbox.spy(UpdateInterview.methods, 'searchApp');
      const vm = createVmInstance();

      vm.searchAppName = 'kakao';

      vm.$nextTick(() => {
        clock.tick(300);
        sinon.assert.calledOnce(spyOnSearchApp);
        done();
      });
    });

    afterEach(() => {
      clock.restore();
    });
  });

  describe('벤치마킹 앱 선택 시', () => {
    it('선택된 앱을 interview.apps에 저장한다', () => {
      const vm = createVmInstance();

      vm.addInterviewTargetApp({
        packageName: 'com.kakao.talk',
        appName: '카카오톡',
        iconUrl: 'image',
        developer: 'KaKao',
      });

      vm.interview.apps[0].packageName.should.be.eql('com.kakao.talk');
      vm.interview.apps[0].appName.should.be.eql('카카오톡');
      vm.interview.apps[0].iconUrl.should.be.eql('image');
      vm.interview.apps[0].developer.should.be.eql('KaKao');
    });
  });

  describe('벤치마킹 앱 삭제 버튼 선택 시', () => {
    it('선택된 앱을 interview.apps에서 삭제한다', () => {
      const vm = createVmInstance();

      vm.removeInterviewTargetApp({
        packageName: 'com.kakao.talk',
        appName: '카카오톡',
        iconUrl: 'image',
        developer: 'KaKao',
      });

      const apps = vm.interview.apps.map(item => item.packageName);

      apps.should.not.be.include('com.kakao.talk');
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
