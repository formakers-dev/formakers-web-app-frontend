import sinon from 'sinon';
import { expect } from 'chai';
import MyPage from '../../../../src/components/MyPage';
import { getVmInstance } from '../../testUtil';
import HTTP from '../../../../src/apis/http-common';

describe('MyPage Component', () => {
  const sandbox = sinon.sandbox.create();

  const data = {
    projectId: 'testProjectId',
    name: 'old-test-project',
    introduce: '간단소개',
    images: ['/image1', '/image2'],
    apps: ['com.kakao.talk'],
    interviewer_introduce: '인터뷰 진행자 소개!!!',
    description: '프로젝트 상세 설명',
    description_images: ['/desc/image1', '/desc/image2'],
    interview: {
      type: 1,
      location_negotiable: false,
      location: '향군타워 5층',
      open_date: '20171011',
      close_date: '20171016',
      date_negotiable: false,
      start_date: '20171101',
      end_date: '20171131',
      plans: [{ minute: 10, plan: '제품 소개' }, { minute: 30, plan: '테스트진행' }, {
        minute: 20,
        plan: '피드백',
      }],
    },
    status: 'temporary',
  };

  it('created시에 projectList를 조회한다.', () => {
    const stubHttpOnPost = sandbox.stub(HTTP, 'get');
    stubHttpOnPost.withArgs('/projects').returns(Promise.resolve(data));
    const vm = getVmInstance(MyPage);

    vm.$nextTick(() => {
      expect(vm.projectList).to.be.eql(data);
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
