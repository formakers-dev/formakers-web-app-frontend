import Vue from 'vue';
import sinon from 'sinon';
import { expect } from 'chai';
// import firebaseUtil from '../../../../src/utils/firebase';
import AddImage from '../../../../src/components/AddImage';

describe('AddImage Component', () => {
  const sandbox = sinon.sandbox.create();
  const preloadedImage = {
    url: '123',
    name: '123파일',
  };

  // let removeFileStub,
  //   saveFileStub;

  beforeEach(() => {
    // removeFileStub = sandbox.mock(firebaseUtil, 'removeFileStub');
    // removeFileStub.returns(Promise.resolve());
    // saveFileStub = sandbox.mock(firebaseUtil, 'saveFile');
    // saveFileStub.returns(Promise.resolve());
  });

  it('추가버튼이 클릭되었을 때 onPickFile메소드를 호출한다', () => {
    const spyOnPickFile = sandbox.spy(AddImage.methods, 'onPickFile');
    const Constructor = Vue.extend(AddImage);
    const AddImageComponent = new Constructor().$mount();
    const addButton = AddImageComponent.$el.querySelector('.add-image-button');

    addButton.click();

    sinon.assert.calledOnce(spyOnPickFile);
  });

  it('fileMetadataList에 데이터 추가 시 추가된 데이터들이 화면에 표시된다.', (done) => {
    const Constructor = Vue.extend(AddImage);
    const AddImageComponent = new Constructor().$mount();

    AddImageComponent.$data.fileMetadataList.push(preloadedImage);

    Vue.nextTick(() => {
      const displayedList = AddImageComponent.$el.querySelectorAll('li');
      expect(displayedList.length).to.eql(2);

      done();
    });
  });

  // describe('목록에 표시되는 이미지가 있는 상태에서', () => {
  //   const Constructor = Vue.extend(AddImage);
  //   const AddImageComponent = new Constructor({
  //     data: {
  //       fileMetadataList: [preloadedImage],
  //     },
  //   }).$mount();
  //
  //   before(() => {
  //     // AddImageComponent.$data.fileMetadataList.push(preloadedImage);
  //   });
  //
  //   it('삭제버튼을 클릭하면 해당 이미지를 삭제한다', () => {
  //     const deleteButton = AddImageComponent.$el.querySelector('.delete-image-button');
  //     // deleteButton.click();
  //     //
  //     // sinon.assert.calledOnce(removeFileStub);
  //   });
  // });

  afterEach(() => {
    sandbox.restore();
  });
});
