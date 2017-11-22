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
    <p>인터뷰 진행자 이름</p>
    <input v-model="project.interviewer.name" placeholder=""/>
    <p>인터뷰 진행자 사진</p>
    <add-image v-on:update-file-data="onUpdateInterviewerImage" v-bind:maxFileCount="1"></add-image>
    <p>인터뷰 진행자 소개</p>
    <input v-model="project.interviewer.introduce" placeholder=""/>
    <p>프로젝트 소개</p>
    <input v-model="project.description" placeholder=""/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <button class="temporary-save-button" v-on:click="tempRegisterProject">임시저장</button>
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
          interviews: [],
          status: '',
          interviewer: {
            name: '',
            url: '',
            introduce: '',
          },
        },
      };
    },
    methods: {
      tempRegisterProject() {
        this.project.status = 'temporary';
        HTTP.post('/projects', this.project).then(() => {
          this.$router.push({ name: 'MyPage' });
        });
      },
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
      onUpdateInterviewerImage(fileMetadata) {
        this.project.interviewer.url = fileMetadata[0].url;
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
