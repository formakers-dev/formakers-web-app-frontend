import sinon from 'sinon';
import { expect } from 'chai';
import RegisterInterview from '../../../../src/components/RegisterInterview';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('RegisterInterView Component', () => {
  const sandbox = sinon.sandbox.create();

  describe('화면이 로딩 되었을때', () => {
    it('인터뷰 입력 초기값이 셋팅 된다', () => {
      const vm = getVmInstance(RegisterInterview);
      vm.interview.type.should.be.eql('오프라인 인터뷰');
      vm.interview.apps.length.should.be.eql(0);
      vm.interview.location.should.be.eql('');
      vm.interview.locationDescription.should.be.eql('');
      vm.interview.openDate.should.be.an('Date');
      vm.interview.closeDate.should.be.an('Date');
      vm.interview.interviewDate.should.be.an('Date');
      vm.interview.timeSlotTimes.length.should.be.eql(0);
      vm.interview.emergencyPhone.should.be.eql('');
      vm.datePicker.openDate.should.be.an('Date');
      vm.datePicker.closeDate.should.be.an('Date');
      vm.datePicker.interviewDate.should.be.an('Date');
      vm.searchAppName.should.be.eql('');
      vm.searchedApps.length.should.be.eql(0);
      vm.searchStatus.should.be.eql('');
    });
  });

  describe('인터뷰 등록버튼이 클릭되었을 때', () => {
    const testProps = {
      projectId: 123456,
    };

    const testData = {
      interview: {
        type: '오프라인 테스트',
        apps: [{
          packageName: 'com.kakao.talk',
          appName: '카카오톡',
        }],
        introduce: '인터뷰 소개입니다',
        location: '향군타워 5층',
        locationDescription: '여기서봐요...',
        openDate: '2017-11-03',
        closeDate: '2017-11-03',
        interviewDate: '2017-11-03',
        timeSlotTimes: [8, 10, 14],
        emergencyPhone: '010-1234-5678',
      },
      datePicker: {
        openDate: new Date('2017-10-11'),
        closeDate: new Date('2017-10-16'),
      },
    };

    it('프로젝트 등록 API를 호출하고 성공시, My Page 화면으로 이동한다', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'post');
      stubHttpOnPost.withArgs(`/projects/${testProps.projectId}/interviews`).returns(Promise.resolve());

      const vm = getVmInstance(RegisterInterview, {
        data: testData,
        propsData: testProps,
      });

      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');
      vm.$el.querySelector('.save-button').click();

      sinon.assert.calledWithExactly(stubHttpOnPost, `/projects/${testProps.projectId}/interviews`, vm.interview);

      vm.$nextTick(() => {
        sinon.assert.calledOnce(spyRouterOnPush);
        spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
        done();
      });
    });
  });

  describe('유사앱 검색 버튼이 클릭되었을 때', () => {
    const searchResult = {
      data: [{
        _id: '5988097cb495479821f2d188',
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
      }],
    };

    it('searchApp 메소드가 호출된다', () => {
      const spyOnSearchApp = sandbox.spy(RegisterInterview.methods, 'searchApp');
      const vm = getVmInstance(RegisterInterview);
      const button = vm.$el.querySelector('.search-button');

      button.click();

      sinon.assert.calledOnce(spyOnSearchApp);
    });

    it('searchApp 호출 시, 유사 앱이 조회된다', (done) => {
      const stubHttpOnPost = sandbox.stub(HTTP, 'get');
      stubHttpOnPost.withArgs('/apps?keyword=kakao').returns(Promise.resolve(searchResult));
      const option = {
        data: {
          searchAppName: 'kakao',
          apps: [],
        },
      };
      const vm = getVmInstance(RegisterInterview, option);

      vm.searchApp();

      vm.$nextTick(() => {
        expect(vm.searchedApps.length).to.be.eql(1);
        expect(vm.searchedApps[0].developer).to.be.eql('Kakao Corporation');
        expect(vm.searchedApps[0].appName).to.be.eql('카카오톡 KakaoTalk');
        done();
      });
    });
  });

  describe('벤치마킹 앱검색 이름 변경 시', () => {
    let clock;

    beforeEach(() => {
      clock = sandbox.useFakeTimers();
    });

    it('벤치마킹 앱검색 이름 변경되고 300ms가 지나면 searchApp를 호출된다', (done) => {
      const spyOnSearchApp = sandbox.spy(RegisterInterview.methods, 'searchApp');
      const option = {
        data: {
          searchAppName: '',
          apps: [],
        },
      };
      const vm = getVmInstance(RegisterInterview, option);

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
      const vm = getVmInstance(RegisterInterview);

      vm.addInterviewTargetApp({
        packageName: 'com.kakao.talk',
        appName: '카카오톡',
      });

      vm.interview.apps[0].packageName.should.be.eql('com.kakao.talk');
      vm.interview.apps[0].appName.should.be.eql('카카오톡');
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
