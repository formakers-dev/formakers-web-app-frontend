import Vue from 'vue';
import sinon from 'sinon';
import Promise from 'es6-promise';

import AddImage from '../../../../src/components/AddImage';

describe('AddImage Component', () => {
  const sandbox = sinon.sandbox.create();

  before(() => {
    Promise.polyfill();
  });

  it('추가버튼이 클릭되었을 때 onPickFile메소드를 호출한다', () => {
    const spy = sandbox.spy(AddImage.methods, 'onPickFile');
    const Constructor = Vue.extend(AddImage);
    const AddImageComponent = new Constructor().$mount();
    const addButton = AddImageComponent.$el.querySelector('.add-image-button');

    addButton.dispatchEvent(new window.Event('click'));

    sinon.assert.calledOnce(spy);
  });

  afterEach(() => {
    sandbox.restore();
  });
});
