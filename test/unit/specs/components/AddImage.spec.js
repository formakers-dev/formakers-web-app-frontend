import Vue from 'vue';
import sinon from 'sinon';
import { expect } from 'chai';
import * as firebaseUtil from '../../../../src/utils/firebase';
import AddImage from '../../../../src/components/AddImage';

describe('AddImage Component', () => {
  const sandbox = sinon.sandbox.create();
  const preloadedImage = {
    url: '123',
    name: '123파일',
  };

  let removeFileStub;
  let saveFileStub;

  beforeEach(() => {
    removeFileStub = sandbox.stub(firebaseUtil, 'removeFile');
    saveFileStub = sandbox.stub(firebaseUtil, 'saveFile');
    removeFileStub.returns(Promise.resolve());
  });

  it('추가버튼이 클릭되었을 때 onPickFile메소드를 호출한다', () => {
    const spyOnPickFile = sandbox.spy(AddImage.methods, 'onPickFile');
    const Constructor = Vue.extend(AddImage);
    const vm = new Constructor().$mount();
    const addButton = vm.$el.querySelector('.add-image-button');

    addButton.click();

    sinon.assert.calledOnce(spyOnPickFile);
  });

  it('fileMetadataList에 데이터 추가 시 추가된 데이터들이 화면에 표시된다.', (done) => {
    const Constructor = Vue.extend(AddImage);
    const vm = new Constructor().$mount();

    vm.$data.fileMetadataList.push(preloadedImage);

    vm.$nextTick(() => {
      const displayedList = vm.$el.querySelectorAll('li');
      expect(displayedList.length).to.eql(2);

      done();
    });
  });

  describe('목록에 표시되는 이미지가 있는 상태에서', () => {
    let vm;

    beforeEach(() => {
      const Constructor = Vue.extend(AddImage);
      vm = new Constructor({
        data: {
          fileMetadataList: [preloadedImage],
        },
      }).$mount();
    });

    it('삭제버튼을 클릭하면 해당 이미지를 삭제한다', (done) => {
      const deleteButton = vm.$el.querySelector('.delete-image-button');
      deleteButton.click();

      sinon.assert.calledOnce(removeFileStub);

      vm.$nextTick(() => {
        expect(vm.$data.fileMetadataList.length).to.eql(0);
        done();
      });
    });

    it('삭제버튼을 클릭하면 update 이벤트를 호출한다', (done) => {
      const spyUpdate = sandbox.spy();
      vm.$on('update', spyUpdate);

      const deleteButton = vm.$el.querySelector('.delete-image-button');
      deleteButton.click();

      vm.$nextTick(() => {
        sinon.assert.calledWithExactly(spyUpdate, vm.$data.fileMetadataList);
        done();
      });
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
