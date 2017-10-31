import sinon from 'sinon';
import { removeFile, saveFile } from '../../../../src/utils/firebase';


describe('Firebase Util', () => {
  const firebase = require('firebase');
  const firebaseInitStub = sinon.stub(firebase, 'initializeApp');
  const storageStub = sinon.stub(firebase, 'storage');
  const refStub = sinon.stub();
  const childStub = sinon.stub();
  const deleteStub = sinon.stub();
  const putStub = sinon.stub();

  before(() => {
    storageStub.returns({ ref: refStub });
    refStub.returns({ child: childStub });
  });

  it('removeStorage호출 시 firebase storage에 삭제요청을 보낸다', (done) => {
    childStub.withArgs('images/test.file').returns({ delete: deleteStub });
    deleteStub.returns(Promise.resolve());

    removeFile('test.file');

    sinon.assert.calledOnce(deleteStub);

    done();
  });

  it('saveFile호출 시 firebase storage에 저장요청을 보낸다', (done) => {
    childStub.returns({ put: putStub });
    putStub.returns(Promise.resolve());

    const file = {
      name: 'test.file',
    };
    saveFile(file);

    sinon.assert.calledWithExactly(putStub, file);

    done();
  });

  afterEach(() => {
    putStub.reset();
    deleteStub.reset();
    childStub.reset();
  });

  after(() => {
    refStub.reset();
    firebaseInitStub.restore();
    storageStub.restore();
  });
});
