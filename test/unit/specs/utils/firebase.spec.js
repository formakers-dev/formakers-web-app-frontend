import sinon from 'sinon';
import firebase from 'firebase';
import { removeFile, saveFile } from '../../../../src/utils/firebase';


describe('Firebase Util', () => {
  const sandbox = sinon.sandbox.create();
  const refStub = sandbox.stub();
  const childStub = sandbox.stub();
  const deleteStub = sandbox.stub();
  const putStub = sandbox.stub();

  beforeEach(() => {
    sandbox.stub(firebase, 'initializeApp');

    const storageStub = sandbox.stub(firebase, 'storage');
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
    sandbox.restore();
  });
});
