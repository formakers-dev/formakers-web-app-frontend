<template>
  <div id="addButton">
    <ul style="display: flex; flex-wrap: wrap">
      <li v-if="fileMetadataList.length < 5">
        <div style="width:240px; height:185px;">
          <img style="width:240px; height:185px;" src="../assets/add_image.png" v-on:click="onPickFile"/>
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
import { saveStorage, removeStorage } from '../utils/firebase';


export default {
  name: 'addImage',
  data() {
    return {
      fileMetadataList: [],
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      const filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        console.log('Please add a valid file!');
      }
      const callback = (fileMetadata) => {
        this.fileMetadataList.push(fileMetadata);
        this.$emit('update', this.fileMetadataList);
      };
      saveStorage(files[0], callback);
    },
    removeImage(index) {
      const callback = (deletedFileIndex) => {
        this.fileMetadataList.splice(deletedFileIndex, 1);
      };
      removeStorage(index, this.fileMetadataList[index].name, callback);
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
  li {
    display: block;
    position: relative;
  }
</style>
