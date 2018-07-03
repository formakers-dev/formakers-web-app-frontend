import sinon from 'sinon';
import { expect } from 'chai';
import Notice from '../../../../../src/components/landing/Notice';
import { getVmInstance } from '../../../testUtil';
import HTTP from '../../../../../src/apis/http-common';

describe('Notice Component', () => {
  const sandbox = sinon.sandbox.create();

  const noticesData = {
    data: [{
      seq: 1,
      title: '타이틀1',
      contents: '내용1',
      date: 1529487029,
    }, {
      seq: 2,
      title: '타이틀2',
      contents: '내용2',
      date: 1529487029,
    }, {
      seq: 3,
      title: '타이틀3',
      contents: '내용3',
      date: 1529487029,
    }, {
      seq: 4,
      title: '타이틀4',
      contents: '내용4',
      date: 1529487029,
    }],
  };

  it('created 시에 공지사항을 조회한다.', (done) => {
    const stubHttpOnGet = sandbox.stub(HTTP, 'get');
    stubHttpOnGet.withArgs('/notices').returns(Promise.resolve(noticesData));
    const vm = getVmInstance(Notice);

    vm.$nextTick(() => {
      vm.notices.length.should.be.eql(4);
      vm.notices[0].seq.should.be.eql(1);
      vm.notices[0].title.should.be.eql('타이틀1');
      vm.notices[0].contents.should.be.eql('내용1');
      vm.notices[0].date.should.be.eql(1529487029);
      vm.notices[1].seq.should.be.eql(2);
      vm.notices[1].title.should.be.eql('타이틀2');
      vm.notices[1].contents.should.be.eql('내용2');
      vm.notices[1].date.should.be.eql(1529487029);
      vm.notices[2].seq.should.be.eql(3);
      vm.notices[2].title.should.be.eql('타이틀3');
      vm.notices[2].contents.should.be.eql('내용3');
      vm.notices[2].date.should.be.eql(1529487029);
      vm.notices[3].seq.should.be.eql(4);
      vm.notices[3].title.should.be.eql('타이틀4');
      vm.notices[3].contents.should.be.eql('내용4');
      vm.notices[3].date.should.be.eql(1529487029);
      done();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
