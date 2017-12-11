<template>
  <div id="updateProject" class="container">
    <h1>프로젝트 수정</h1>

    <p>프로젝트 이름</p>
    <input v-model="project.name" placeholder=""/>
    <p>한줄 소개</p>
    <input v-model="project.introduce" placeholder=""/>
    <p>대표이미지</p>
    <br/>
    <add-image v-on:update-file-data="onUpdateImage" v-bind:maxFileCount="1" v-bind:currentImageList="current.projectImageList"></add-image>
    <br/>
    <p>동영상 URL</p>
    <input v-model="project.videoUrl" placeholder=""/>

    <p>프로젝트 소개</p>
    <textarea v-model="project.description" placeholder=""></textarea>
    <p>프로젝트 이미지</p>
    <add-image v-on:update-file-data="onUpdateDescriptionImages" v-bind:maxFileCount="5" v-bind:currentImageList="current.descriptionImageList"></add-image>
    <br/>
    <br/>
    <p>인터뷰 진행자 이름</p>
    <input v-model="project.owner.name" placeholder=""/>
    <p>인터뷰 진행자 사진</p>
    <add-image v-on:update-file-data="onUpdateOwnerImage" v-bind:maxFileCount="1" v-bind:currentImageList="current.ownerImageList"></add-image>
    <p>인터뷰 진행자 소개</p>
    <textarea v-model="project.owner.introduce" placeholder=""></textarea>
    <br/>
    <button class="cancel-button" v-on:click="cancelUpdate">취소</button>
    <button class="save-button" v-on:click="updateProject">프로젝트 수정</button>
    <br/>
    <br/>
    <br/>
  </div>
</template>
<script>

  import HTTP from '../apis/http-common';
  import AddImage from './AddImage';

  export default {
    name: 'updateProject',
    components: {
      addImage: AddImage,
    },
    props: {
      projectId: {
        type: Number,
        required: true,
      },
    },
    created() {
      HTTP.get(`/projects/${this.projectId}`).then((result) => {
        const project = result.data;
        this.project.name = project.name;
        this.project.introduce = project.introduce;
        if (project.image && project.image.name) {
          this.current.projectImageList.push(project.image);
        }
        this.project.description = project.description;
        project.descriptionImages.forEach((image) => {
          this.current.descriptionImageList.push(image);
        });
        this.project.owner.name = project.owner.name;
        this.project.owner.introduce = project.owner.introduce;
        if (project.owner.image && project.owner.image.name) {
          this.current.ownerImageList.push(project.owner.image);
        }
        this.project.videoUrl = project.videoUrl;
      }).catch(() => this.moveToMyPage());
    },
    data() {
      return {
        project: {
          name: '',
          introduce: '',
          image: {},
          description: '',
          descriptionImages: [],
          owner: {
            name: '',
            image: {},
            introduce: '',
          },
          videoUrl: '',
        },
        current: {
          projectImageList: [],
          descriptionImageList: [],
          ownerImageList: [],
        },
      };
    },
    methods: {
      updateProject() {
        this.setImageInfo();

        HTTP.put(`/projects/${this.projectId}`, this.project).then(() => {
          this.moveToMyPage();
        }).catch(() => {
          alert('API Error');
        });
      },
      setImageInfo() {
        if (this.current.projectImageList.length > 0) {
          this.project.image = this.current.projectImageList[0];
        }

        this.project.descriptionImages = this.current.descriptionImageList;

        if (this.current.ownerImageList.length > 0) {
          this.project.owner.image = this.current.ownerImageList[0];
        }
      },
      cancelUpdate() {
        this.moveToMyPage();
      },
      moveToMyPage() {
        this.$router.push({ name: 'MyPage' });
      },
      onUpdateImage(fileMetadataList) {
        this.project.image = fileMetadataList[0];
      },
      onUpdateOwnerImage(fileMetadata) {
        this.project.owner.image = fileMetadata[0];
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
