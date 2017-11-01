<template>
  <div id="addButton">
    <ul>
      <li v-if="fileMetadataList.length < 5">
        <div class="add-image-button" v-on:click="onPickFile">
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

      saveFile(files[0]).then((snapshot) => {
        this.fileMetadataList.push({
          url: snapshot.downloadURL,
          name: snapshot.metadata.name,
        });

        this.$emit('update', this.fileMetadataList);
      });
    },
    removeImage(index) {
      removeFile(this.fileMetadataList[index].name).then(() => {
        this.fileMetadataList.splice(index, 1);
        this.$emit('update', this.fileMetadataList);
      });
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
  .add-image-button {
    width: 240px;
    height: 185px;
    background-image: url("../assets/add_image.png");
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
