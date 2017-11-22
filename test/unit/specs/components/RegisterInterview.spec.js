import sinon from 'sinon';
import { expect } from 'chai';
import RegisterInterview from '../../../../src/components/RegisterInterview';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('RegisterInterView Component', () => {
  const sandbox = sinon.sandbox.create();
  const clock = sandbox.useFakeTimers();

  describe('methods', () => {
    describe('debounceGetSimilarApp()', () => {
      it('when it calls', (done) => {
        const spyOnGetSimilarApp = sandbox.spy(RegisterInterview.methods, 'getSimilarApp');
        const vm = getVmInstance(RegisterInterview);

        vm.debounceGetSimilarApp();

        vm.$nextTick(() => {
          clock.tick(300);
          sinon.assert.calledOnce(spyOnGetSimilarApp);
          done();
        });
      });
    });

    describe('getSimilarApp', () => {
      it('when it calls', () => {
        const stubHttpOnPost = sandbox.stub(HTTP, 'get');
        stubHttpOnPost.withArgs('/apps?keyword=kakao').returns(Promise.resolve());
        const vm = getVmInstance(RegisterInterview);

        vm.searchAppName = 'kakao';
        vm.getSimilarApp();

        sinon.assert.calledOnce(stubHttpOnPost);
      });
    });

    describe('registerInterview', () => {
      it('when it calls', () => {
        const stubHttpOnPost = sandbox.stub(HTTP, 'post');

        stubHttpOnPost.withArgs(`/projects/${testProps.projectId}/interviews`).returns(Promise.resolve());

        const option = {
          data: testData,
          propsData: testProps,
        };

        const vm = getVmInstance(RegisterInterview, option);

        vm.registerInterview();

        sinon.assert.calledWithExactly(stubHttpOnPost, `/projects/${testProps.projectId}/interviews`, vm.interview);
      });
    });

    describe('addInterviewSchedule', () => {
      it('when it calls', () => {
        const vm = getVmInstance(RegisterInterview);
        vm.addInterviewSchedule();

        expect(vm.interview.plans.length).to.be.eql(2);
        expect(vm.interview.plans[1].minute).to.be.eql(0);
        expect(vm.interview.plans[1].plan).to.be.eql('');
      });
    });

    describe('moveToMyPage', () => {
      it('when it calls', () => {
        const vm = getVmInstance(RegisterInterview);
        const spyRouterOnPush = sandbox.spy(vm.$router, 'push');

        vm.moveToMyPage();

        sinon.assert.calledOnce(spyRouterOnPush);
        spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
      });
    });

    describe('addSimilarApps', () => {
      it('when it calls', () => {
        const vm = getVmInstance(RegisterInterview);
        const app = {
          packageName: 'com.kakao.talk',
        };

        vm.addSimilarApps(app);

        expect(vm.interview.apps.length).to.be.eql(1);
        expect(vm.interview.apps[0]).to.be.eql('com.kakao.talk');
      });
    });
  });

  describe('watch', () => {
    describe('searchAppName', () => {
      it('searchAppName.length > 1', (done) => {
        const vm = getVmInstance(RegisterInterview);
        const spyOnDebounceGetSimilarApp = sandbox.spy(vm, 'debounceGetSimilarApp');

        vm.searchAppName = 'kakao';

        vm.$nextTick(() => {
          expect(vm.searchStatus).to.be.eql('입력중');
          sinon.assert.calledOnce(spyOnDebounceGetSimilarApp);
          done();
        });
      });

      it('searchAppName.length <= 1', (done) => {
        const vm = getVmInstance(RegisterInterview);

        vm.searchAppName = '';

        vm.$nextTick(() => {
          expect(vm.searchedApps.length).to.be.eql(0);
          done();
        });
      });
    });
  });

  describe('data', () => {
    it('초기 데이터 테스트', () => {
      const vm = getVmInstance(RegisterInterview);
      vm.interview.type.should.be.eql('오프라인 인터뷰');
      vm.interview.apps.length.should.be.eql(0);
      vm.interview.location.should.be.eql('');
      vm.interview.openDate.should.be.an('Date');
      vm.interview.closeDate.should.be.an('Date');
      vm.interview.interviewDate.should.be.an('Date');
      vm.interview.plans[0].minute.should.be.eql(0);
      vm.interview.plans[0].plan.should.be.eql('');
      vm.interview.timeSlotTimes.length.should.be.eql(0);
      vm.datePicker.openDate.should.be.an('Date');
      vm.datePicker.closeDate.should.be.an('Date');
      vm.datePicker.interviewDate.should.be.an('Date');
      vm.searchAppName.should.be.eql('');
      vm.searchedApps.length.should.be.eql(0);
      vm.searchStatus.should.be.eql('');
    });
  });

  const testProps = {
    projectId: 'testProjectId',
  };

  const testData = {
    interview: {
      type: '오프라인 테스트',
      location: '향군타워 5층',
      openDate: '2017-11-03',
      closeDate: '2017-11-03',
      interviewDate: '2017-11-03',
      plans: [{
        minute: 10,
        plan: '제품소개',
      }, {
        minute: 30,
        plan: '인터뷰',
      }],
      timeSlotTimes: [8, 10, 14],
    },
    datePicker: {
      openDate: new Date('2017-10-11'),
      closeDate: new Date('2017-10-16'),
      interviewDate: new Date('2017-11-01'),
    },
  };

  // describe('다음에 하겠습니다 버튼이 클릭되었을 때', () => {
  //   it('프로젝트 등록 API가 성공 시, My Page 화면으로 이동한다', () => {
  //     const vm = getVmInstance(RegisterInterview);
  //     const spyRouterOnPush = sandbox.spy(vm.$router, 'push');
  //
  //     const button = vm.$el.querySelector('.skip-button');
  //
  //     button.click();
  //
  //     sinon.assert.calledOnce(spyRouterOnPush);
  //     spyRouterOnPush.args[0][0].name.should.be.eql('MyPage');
  //   });
  // });
  //
  // describe('화면이 로딩 되었을때', () => {
  //   it('인터뷰 입력 초기값이 셋팅 된다', () => {
  //     const vm = getVmInstance(RegisterInterview);
  //     expect(vm.$data.interview.type).to.be.eql('오프라인 인터뷰');
  //   });
  // });
  //
  // describe('미리 보기 버튼이 클릭되었을 때', () => {
  //   it('registerInterview 메소드가 호출된다', () => {
  //     const spyOnRegisterInterview = sandbox.spy(RegisterInterview.methods, 'registerInterview');
  //     const vm = getVmInstance(RegisterInterview);
  //     const button = vm.$el.querySelector('.save-button');
  //
  //     button.click();
  //
  //     sinon.assert.calledOnce(spyOnRegisterInterview);
  //   });
  //
  //   it('registerInterview 호출 시, 인터뷰 정보를 등록한다', (done) => {
  //     const stubHttpOnPost = sandbox.stub(HTTP, 'post');
  //
  //     stubHttpOnPost.withArgs(`/projects/${testProps.projectId}/interviews`).returns(Promise.resolve());
  //
  //     const option = {
  //       data: testData,
  //       propsData: testProps,
  //     };
  //
  //     const vm = getVmInstance(RegisterInterview, option);
  //
  //     vm.registerInterview();
  //
  //     vm.$nextTick(() => {
  //       expect(vm.interview.type).to.be.eql('오프라인 테스트');
  //       expect(vm.interview.location).to.be.eql('향군타워 5층');
  //       expect(vm.interview.openDate).to.be.eql('2017-10-11');
  //       expect(vm.interview.closeDate).to.be.eql('2017-10-16');
  //       expect(vm.interview.interviewDate).to.be.eql('2017-11-01');
  //       expect(vm.interview.plans.length).to.be.eql(2);
  //       expect(vm.interview.plans[0].minute).to.be.eql(10);
  //       expect(vm.interview.plans[0].plan).to.be.eql('제품소개');
  //       expect(vm.interview.plans[1].minute).to.be.eql(30);
  //       expect(vm.interview.plans[1].plan).to.be.eql('인터뷰');
  //       sinon.assert.calledWithExactly(stubHttpOnPost, `/projects/${testProps.projectId}/interviews`, vm.interview);
  //       done();
  //     });
  //   });
  // });
  //
  // describe('인터뷰 임시저장 버튼이 클릭되었을 때', () => {
  //   it('tempRegisterInterview 메소드가 호출된다.', () => {
  //     const spyOnTemp = sandbox.spy(RegisterInterview.methods, 'tempRegisterInterview');
  //     const vm = getVmInstance(RegisterInterview);
  //     const button = vm.$el.querySelector('.temporary-save-button');
  //
  //     button.click();
  //
  //     sinon.assert.calledOnce(spyOnTemp);
  //   });
  // });
  //
  // describe('유사앱 검색 버튼이 클릭되었을 때', () => {
  //   const searchResult = {
  //     data: [{ _id: '5988097cb495479821f2d188',
  //       developer: 'Kakao Corporation',
  //       star: 4.3,
  //       description: '카카오톡은 전세계 어디서나 안드로이드폰과 아이폰 사용자간 무료로 메시지를 ...',
  //       contentsRating: '만 3세 이상',
  //       categoryId1: '/store/apps/category/COMMUNICATION',
  //       categoryName1: '커뮤니케이션',
  //       categoryId2: '',
  //       categoryName2: '',
  //       inappPriceMin: 1000,
  //       reviewCount: 2434177,
  //       packageName: 'com.kakao.talk',
  //       appName: '카카오톡 KakaoTalk',
  //       inappPriceMax: 90909,
  //       installsMin: 100000000,
  //       updatedDate: '20170720',
  //       similarApps:
  //       ['com.tencent.mm',
  //         'jp.naver.line.android',
  //         'com.facebook.orca',
  //         'com.whatsapp',
  //         'com.imo.android.imoim',
  //         'com.viber.voip',
  //         'com.skype.raider',
  //         'com.facebook.mlite',
  //         'org.telegram.messenger',
  //         'com.bbm',
  //         'com.azarlive.android',
  //         'ru.mail',
  //         'kik.android',
  //         'com.google.android.talk',
  //         'com.imo.android.imoimbeta',
  //         'com.icq.mobile.client',
  //         'com.wWhatsUpMessenger_4083770'],
  //       appPrice: 0,
  //       installsMax: 500000000 }],
  //   };
  //
  //
  //   it('getSimilarApp 메소드가 호출된다', () => {
  //     const spyOnGetSimilarApp = sandbox.spy(RegisterInterview.methods, 'getSimilarApp');
  //     const vm = getVmInstance(RegisterInterview);
  //     const button = vm.$el.querySelector('.search-button');
  //
  //     button.click();
  //
  //     sinon.assert.calledOnce(spyOnGetSimilarApp);
  //   });
  //
  //   it('getSimilarApp 호출 시, 유사 앱이 조회된다', (done) => {
  //     const stubHttpOnPost = sandbox.stub(HTTP, 'get');
  //     stubHttpOnPost.withArgs('/apps?keyword=kakao').returns(Promise.resolve(searchResult));
  //     const option = {
  //       data: {
  //         similarAppname: 'kakao',
  //         apps: [],
  //       },
  //     };
  //     const vm = getVmInstance(RegisterInterview, option);
  //
  //     vm.getSimilarApp();
  //
  //     vm.$nextTick(() => {
  //       expect(vm.apps.length).to.be.eql(1);
  //       expect(vm.apps[0].developer).to.be.eql('Kakao Corporation');
  //       expect(vm.apps[0].appName).to.be.eql('카카오톡 KakaoTalk');
  //       done();
  //     });
  //   });
  // });
  //
  // it('유사앱 이름이 입력된 후 300ms가 지나면 getSimilarApp가 호출된다', (done) => {
  //   const spyOnGetSimilarApp = sandbox.spy(RegisterInterview.methods, 'getSimilarApp');
  //   const option = {
  //     data: {
  //       similarAppname: '',
  //       apps: [],
  //     },
  //   };
  //   const vm = getVmInstance(RegisterInterview, option);
  //
  //   vm.similarAppname = 'kakao';
  //
  //   vm.$nextTick(() => {
  //     clock.tick(300);
  //     sinon.assert.calledOnce(spyOnGetSimilarApp);
  //     done();
  //   });
  // });

  afterEach(() => {
    clock.restore();
    sandbox.restore();
  });
});
