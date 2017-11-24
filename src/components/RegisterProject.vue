<template>
  <div id="registerProject" class="container">
    <h1>프로젝트 등록</h1>

    <p>프로젝트 이름</p>
    <input v-model="project.name" placeholder=""/>
    <p>한줄 소개</p>
    <input v-model="project.introduce" placeholder=""/>
    <p>대표이미지</p>
    <br/>
    <add-image v-on:update-file-data="onUpdateFileData" v-bind:maxFileCount="1"></add-image>
    <br/>
    <p>동영상 URL</p>
    <input v-model="project.videoUrl" placeholder=""/>

    <p>프로젝트 소개</p>
    <input v-model="project.description" placeholder=""/>
    <p>프로젝트 이미지</p>
    <add-image v-on:update-file-data="onUpdateDescriptionImages" v-bind:maxFileCount="5"></add-image>
    <br/>
    <br/>
    <p>인터뷰 진행자 이름</p>
    <input v-model="project.owner.name" placeholder=""/>
    <p>인터뷰 진행자 사진</p>
    <add-image v-on:update-file-data="onUpdateOwnerImage" v-bind:maxFileCount="1"></add-image>
    <p>인터뷰 진행자 소개</p>
    <input v-model="project.owner.introduce" placeholder=""/>
    <br/>
    <button class="save-button" v-on:click="registerProject">프로젝트 등록</button>
    <br/>
    <br/>
    <br/>
  </div>
</template>
<script>

  import HTTP from '../apis/http-common';
  import AddImage from './AddImage';

  export default {
    name: 'registerProject',
    components: {
      addImage: AddImage,
    },
    data() {
      return {
        project: {
          name: '',
          introduce: '',
          images: [],
          description: '',
          descriptionImages: [],
          interviews: [],
          status: '',
          owner: {
            name: '',
            url: '',
            introduce: '',
          },
          videoUrl: '',
        },
      };
    },
    methods: {
      registerProject() {
        this.project.status = 'registered';

        HTTP.post('/projects', this.project).then((result) => {
          console.log('registerProject');
          console.log(result);
          this.$router.push({
            name: 'RegisterInterview',
            params: { projectId: result.data.projectId },
          });
        });
      },
      onUpdateFileData(fileMetadataList) {
        this.project.images = fileMetadataList;
      },
      onUpdateOwnerImage(fileMetadata) {
        this.project.owner.url = fileMetadata[0].url;
      },
      onUpdateDescriptionImages(fileMetadataList) {
        this.project.descriptionImages = fileMetadataList;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }
</style>
