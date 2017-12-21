<template>
  <div id="addImage">
    <ul>
      <li v-if="fileMetadataList.length < maxFileCount">
        <div class="add-image-box">
          <p class="add-image-guide">jpg 나 png 이미지를 선택하세요.</p>
          <button class="add-image-button" v-on:click="onPickFile">이미지 선택하기</button>
          <input type="file" style="display: none" ref="fileInput" accept="image/*" v-on:change="onFilePicked"/>
        </div>
      </li>
      <li v-for="(item, index) in fileMetadataList">
        <div v-bind:style="{ width:'240px', height:'185px', backgroundImage: 'url(' + item.url + ')', backgroundSize: 'cover', backgroundPosition: 'center' }">
          <img src="../assets/delete_image.png" class="delete-image-button" @click="removeImage(index)"/>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { saveFile, removeFile } from '../utils/firebase';


export default {
  name: 'addImage',
  props: {
    maxFileCount: {
      type: Number,
      required: true,
    },
    currentImageList: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      fileMetadataList: this.currentImageList ? this.currentImageList : [],
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;

      saveFile(files[0]).then((snapshot) => {
        this.fileMetadataList.push({
          url: snapshot.downloadURL,
          name: snapshot.metadata.name,
        });
        this.handleUpdate();
      });
    },
    removeImage(index) {
      removeFile(this.fileMetadataList[index].name).then(() => {
        this.fileMetadataList.splice(index, 1);
        this.handleUpdate();
      });
    },
    handleUpdate() {
      this.$emit('update-file-data', this.fileMetadataList);
    },
  },
};
</script>
<style scoped>
  .delete-image-button {
    top: 0;
    right: 0;
    position: absolute;
    display: inherit;
  }

  .add-image-box {
    width: 220px;
    height: 180px;
    object-fit: contain;
    border-radius: 2px;
    background-color: #f9f9f9;
    border: solid 1px #d8d8d8;
  }

  .add-image-guide {
    margin-top: 40px;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    line-height: 1.43;
    text-align: center;
    color: #979797;
  }

  .add-image-button {
    width: 116px;
    height: 34px;
    margin-top: 46px;
    border-radius: 8px;
    background-color: #4285f4;
    font-family: NotoSansCJKkr;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
    color: #ffffff;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    display: block;
    position: relative;
  }
</style>
