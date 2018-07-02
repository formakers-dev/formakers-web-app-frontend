import sinon from 'sinon';
import { expect } from 'chai';
import moment from 'moment-timezone';
import RegisterInterview from '../../../../src/components/RegisterInterview';
import Preview from '../../../../src/components/Preview';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('RegisterInterView Component', () => {
  const sandbox = sinon.sandbox.create();

  before(() => {
    moment.tz.setDefault('Asia/Seoul');
  });

  describe('화면이 로딩 되었을때', () => {
    it('인터뷰 입력 초기값이 셋팅 된다', () => {
      const vm = getVmInstance(RegisterInterview);
      vm.currentDate.should.be.an('Date');
      vm.interview.type.should.be.eql('오프라인 인터뷰');
      vm.interview.apps.length.should.be.eql(0);
      vm.interview.location.should.be.eql('');
      vm.interview.locationDescription.should.be.eql('');
      vm.interview.openDate.should.be.an('String');
      vm.interview.closeDate.should.be.an('String');
      vm.interview.interviewDate.should.be.an('String');
      vm.interview.timeSlotTimes.length.should.be.eql(0);
      vm.interview.emergencyPhone.should.be.eql('');
      vm.datePicker.openDate.should.be.eql('');
      vm.datePicker.closeDate.should.be.eql('');
      vm.datePicker.interviewDate.should.be.eql('');
      vm.datePicker.closableDate.should.be.eql('');
      vm.searchAppName.should.be.eql('');
      vm.searchedApps.length.should.be.eql(0);
      vm.searchStatus.should.be.eql('');
    });

    it('props에 interviewDate정보가 있는 경우, 초기값으로 세팅된다', () => {
      const option = {
        propsData: {
          projectId: 123456,
          interviewData: {
            type: '오프라인 테스트',
            apps: [{
              packageName: 'com.kakao.talk',
              appName: '카카오톡',
            }],
            introduce: '인터뷰 소개입니다',
            location: '향군타워 5층',
            locationDescription: '여기서봐요...',
            openDate: 1509375600000,
            closeDate: 1509494400000,
            interviewDate: 1509580800000,
            timeSlotTimes: [8, 10, 14],
            emergencyPhone: '010-1234-5678',
          },
        },
      };
      const vm = getVmInstance(RegisterInterview, option);
      vm.interview.type.should.be.eql('오프라인 테스트');
      vm.interview.apps.length.should.be.eql(1);
      vm.interview.apps[0].packageName.should.be.eql('com.kakao.talk');
      vm.interview.apps[0].appName.should.be.eql('카카오톡');
      vm.interview.location.should.be.eql('향군타워 5층');
      vm.interview.locationDescription.should.be.eql('여기서봐요...');
      vm.interview.timeSlotTimes.length.should.be.eql(3);
      vm.interview.timeSlotTimes[0].should.be.eql(8);
      vm.interview.timeSlotTimes[1].should.be.eql(10);
      vm.interview.timeSlotTimes[2].should.be.eql(14);
      vm.interview.emergencyPhone.should.be.eql('010-1234-5678');
      vm.interview.openDate.should.be.eql(1509375600000);
      vm.interview.closeDate.should.be.eql(1509494400000);
      vm.interview.interviewDate.should.be.eql(1509580800000);
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
        openDate: new Date('2017-10-31'),
        closeDate: new Date('2017-11-01'),
        interviewDate: new Date('2017-11-02'),
      },
    };

    it('인터뷰 등록시 등록된 interview정보를 가지고, Preview화면으로 이동한다', (done) => {
      const vm = getVmInstance(RegisterInterview, {
        data: testData,
        propsData: testProps,
      });

      const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

      vm.$el.querySelector('.save-button').click();

      vm.interview.openDate.should.be.eql(1509375600000);
      vm.interview.closeDate.should.be.eql(1509548399999);
      vm.interview.interviewDate.should.be.eql(1509634799999);

      vm.$nextTick(() => {
        spyRouterOnPush.args[0][0].name.should.be.eql('Preview');
        spyRouterOnPush.args[0][0].params.projectId.should.be.eql(123456);

        done();
      });
    });
  });

  describe('searchApp 호출 시', () => {
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
        iconUrl: 'https://kakao.com/icon/url',
      }],
    };

    it('유사 앱이 조회된다', (done) => {
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
        iconUrl: 'image',
        developer: 'KaKao',
      });

      vm.interview.apps[0].packageName.should.be.eql('com.kakao.talk');
      vm.interview.apps[0].appName.should.be.eql('카카오톡');
      vm.interview.apps[0].iconUrl.should.be.eql('image');
      vm.interview.apps[0].developer.should.be.eql('KaKao');
    });

    it('이미 선택된 앱을 다시 추가할 경우 interview.apps에 중복하여 저장되지 않는다', () => {
      const option = {
        data: {
          interview: {
            apps: [
              {
                packageName: 'com.kakao.talk',
                appName: '카카오톡',
                iconUrl: 'image',
                developer: 'KaKao',
              },
            ],
          },
        },
      };

      const vm = getVmInstance(RegisterInterview, option);

      vm.addInterviewTargetApp({
        packageName: 'com.kakao.talk',
        appName: '카카오톡',
        iconUrl: 'image',
        developer: 'KaKao',
      });

      vm.interview.apps.length.should.be.eql(1);
    });
  });

  describe('벤치마킹 앱 삭제 버튼 선택 시', () => {
    it('선택된 앱을 interview.apps에서 삭제한다', () => {
      const vm = getVmInstance(RegisterInterview);

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
