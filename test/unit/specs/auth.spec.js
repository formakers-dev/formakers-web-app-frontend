import sinon from 'sinon';
import { setLogin, isLoggedIn, requireAuth } from '../../../src/utils/auth';

describe('Auth Utils', () => {
  it('setLogin(true) 호출 시 SessionStorage에 KEY_IS_LOGIN Item을 생성한다', (done) => {
    const spySetItem = sinon.spy(sessionStorage, 'setItem');

    setLogin(true);

    sinon.assert.calledWithExactly(spySetItem, 'KEY_IS_LOGIN', true);
    spySetItem.reset();

    done();
  });

  it('setLogin(false) 호출 시 SessionStorage의 KEY_IS_LOGIN Item을 삭제한다', (done) => {
    const spyRemoveItem = sinon.spy(sessionStorage, 'removeItem');

    setLogin(false);

    sinon.assert.calledWithExactly(spyRemoveItem, 'KEY_IS_LOGIN');
    spyRemoveItem.reset();

    done();
  });

  it('isLoggedIn 호출 시 SessionStorage의 KEY_IS_LOGIN 값을 반환한다', (done) => {
    const mockSessionStorage = sinon.mock(sessionStorage);
    mockSessionStorage.expects('getItem').once().withExactArgs('KEY_IS_LOGIN').returns(true);

    sinon.assert.match(isLoggedIn(), true);

    mockSessionStorage.restore();
    done();
  });

  describe('requireAuth 호출 시', () => {
    const mockSessionStorage = sinon.mock(sessionStorage);
    const spyNext = sinon.spy();

    it('로그인이 안된 상태이면 홈 화면으로 이동한다', (done) => {
      mockSessionStorage.expects('getItem').once().withExactArgs('KEY_IS_LOGIN').returns(false);

      requireAuth(null, null, spyNext);

      sinon.assert.calledWithExactly(spyNext, { path: '/' });
      done();
    });

    it('로그인이 된 상태이면 다음 로직으로 이동한다', (done) => {
      mockSessionStorage.expects('getItem').once().withExactArgs('KEY_IS_LOGIN').returns(true);

      requireAuth(null, null, spyNext);

      sinon.assert.calledOnce(spyNext);
      done();
    });

    afterEach(() => {
      mockSessionStorage.restore();
      spyNext.reset();
    });
  });
});
