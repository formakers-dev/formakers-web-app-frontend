import sinon from 'sinon';
import { saveStorage } from '../../../src/utils/firebase';

describe('Auth Utils', () => {
  it('firebase', (done) => {
    saveStorage();
    done();
  });
});
