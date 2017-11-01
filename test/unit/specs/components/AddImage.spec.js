import sinon from 'sinon';
import { expect } from 'chai';
import * as firebaseUtil from '../../../../src/utils/firebase';
import AddImage from '../../../../src/components/AddImage';
import { getVmInstance } from '../../testUtil';

describe('AddImage Component', () => {
  const sandbox = sinon.sandbox.create();

  const preloadedImage = {
    url: '123',
    name: '123파일',
  };

  it('추가버튼이 클릭되었을 때 onPickFile메소드를 호출한다', () => {
    const spyOnPickFile = sandbox.spy(AddImage.methods, 'onPickFile');
    const vm = getVmInstance(AddImage);
    const addButton = vm.$el.querySelector('.add-image-button');

    addButton.click();

    sinon.assert.calledOnce(spyOnPickFile);
  });

  it('fileMetadataList에 데이터 추가 시 추가된 데이터들이 화면에 표시된다.', (done) => {
    const vm = getVmInstance(AddImage);

    vm.$data.fileMetadataList.push(preloadedImage);

    vm.$nextTick(() => {
      const displayedList = vm.$el.querySelectorAll('li');
      expect(displayedList.length).to.eql(2);

      done();
    });
  });

  describe('목록에 표시되는 이미지가 있는 상태에서', () => {
    let vm;
    let removeFileStub;

    beforeEach(() => {
      vm = getVmInstance(AddImage, {
        data: {
          fileMetadataList: [preloadedImage],
        },
      });

      removeFileStub = sandbox.stub(firebaseUtil, 'removeFile');
      removeFileStub.returns(Promise.resolve());
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

    it('등록이미지가 5개 이상이면 추가버튼을 표시하지 않는다', (done) => {
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);

      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.add-image-button')).to.be.null;
        expect(vm.$el.querySelectorAll('li').length).to.be.eql(5);
        done();
      });
    });

    it('등록이미지가 5개에서 1개 삭제되면 추가버튼을 다시 표시하지 않는다', (done) => {
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);

      const deleteButton = vm.$el.querySelector('.delete-image-button');
      deleteButton.click();

      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.add-image-button')).to.be.not.null;
        expect(vm.$el.querySelectorAll('li').length).to.be.eql(5);
        done();
      });
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
