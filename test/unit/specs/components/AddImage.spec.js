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

  describe('이미지 파일을 추가하는 상황에서', () => {
    let saveFileStub;
    const fileInputChangeEvent = {
      target: {
        files: [
          { name: 'test' },
        ],
      },
    };

    beforeEach(() => {
      saveFileStub = sandbox.stub(firebaseUtil, 'saveFile');
      saveFileStub.returns(Promise.resolve());
    });

    it('추가할 파일 선택 시 onFilePicked를 호출한다', (done) => {
      const spyOnFilePicked = sandbox.spy();
      const vm = getVmInstance(AddImage, {
        methods: {
          onFilePicked: spyOnFilePicked,
        },
      });
      const fileInput = vm.$refs.fileInput;

      fileInput.dispatchEvent(new Event('change'));

      vm.$nextTick(() => {
        sinon.assert.called(spyOnFilePicked);
        done();
      });
    });

    it('onFilePicked 호출 시 saveFile API를 호출한다', () => {
      const vm = getVmInstance(AddImage);

      vm.onFilePicked(fileInputChangeEvent);

      sinon.assert.called(saveFileStub);
    });

    describe('onFilePicked 호출 시 Firebase저장에 성공하면', () => {
      beforeEach(() => {
        saveFileStub.returns(Promise.resolve({
          downloadURL: 'fakeUrl',
          metadata: {
            name: 'test.file',
          },
        }));
      });

      it('fileMetadataList에 해당 파일정보를 추가한다', (done) => {
        const vm = getVmInstance(AddImage);

        vm.onFilePicked(fileInputChangeEvent);

        vm.$nextTick(() => {
          expect(vm.fileMetadataList.length).to.be.eql(1);
          expect(vm.fileMetadataList[0].url).to.be.eql('fakeUrl');
          expect(vm.fileMetadataList[0].name).to.be.eql('test.file');
          done();
        });
      });

      it('update-file-data 이벤트를 호출한다', (done) => {
        const vm = getVmInstance(AddImage);
        const spyUpdate = sandbox.spy();
        vm.$on('update-file-data', spyUpdate);

        vm.onFilePicked(fileInputChangeEvent);

        vm.$nextTick(() => {
          sinon.assert.calledWithExactly(spyUpdate, vm.fileMetadataList);
          done();
        });
      });
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

    it('삭제버튼을 클릭하면 update-file-data 이벤트를 호출한다', (done) => {
      const spyUpdate = sandbox.spy();
      vm.$on('update-file-data', spyUpdate);

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
        expect(vm.$el.querySelectorAll('.add-image-button').length).to.be.eql(0);
        expect(vm.$el.querySelectorAll('li').length).to.be.eql(5);
        done();
      });
    });

    it('등록이미지가 5개에서 1개 삭제되면 추가버튼을 다시 표시한다', (done) => {
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);
      vm.$data.fileMetadataList.push(preloadedImage);

      const deleteButton = vm.$el.querySelector('.delete-image-button');
      deleteButton.click();

      vm.$nextTick(() => {
        expect(vm.$el.querySelectorAll('.add-image-button').length).to.be.eql(1);
        expect(vm.$el.querySelectorAll('.add-image-button')[0].style.display).to.be.eql('');
        expect(vm.$el.querySelectorAll('li').length).to.be.eql(5);
        done();
      });
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
