<template>
  <div id="updateProject" class="container is-fullhd">
    <section class="section">
      <div class="container contents-area">
        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">프로젝트 제목</div>
            <div class="column label-description">프로젝트를 지칭하는 멋진 제목을 10자 내에 적어주세요.</div>
          </div>
          <input class="input-text" v-model="project.name" placeholder=""/>
        </div>

        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">한줄 소개</div>
            <div class="column label-description">프로젝트를 소개하는데 가장 중요한 간단 홍보문구를 적어주세요.  서비스의 종류도 꼭 적어주세요.</div>
          </div>
          <input class="input-text" v-model="project.introduce" placeholder=""/>
        </div>

        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">대표 이미지</div>
            <div class="column label-description">프로젝트를 표현하는 대표 이미지를 한장 골라주세요.</div>
          </div>
          <add-image v-on:update-file-data="onUpdateImage" v-bind:maxFileCount="1" v-bind:currentImageList="current.projectImageList"></add-image>
        </div>

        <div class="seperator"></div>

        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">동영상 URL</div>
            <div class="column label-description">프로젝트에 대한 영상이 있으시다면 유튜브 주소를 올려주세요. 선택사항입니다.</div>
          </div>
          <input class="input-text" v-model="project.videoUrl" placeholder=""/>
          <p class="label-guide">* 유튜브 동영상을 ‘미공개’ 상태로 업로드하고 주소를 올려주시면 대중에게는 영상 공개가 되지 않습니다.</p>
        </div>

        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">프로젝트 이미지</div>
            <div class="column label-description">프로젝트 이미지를 5장 올려주세요.</div>
          </div>
          <add-image v-on:update-file-data="onUpdateDescriptionImages" v-bind:maxFileCount="5" v-bind:currentImageList="current.descriptionImageList"></add-image>
        </div>

        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">프로젝트 소개</div>
            <div class="column label-description">프로젝트의 매력을 홍보해 보세요. 이해하기 쉽고 간단하게 적어주시면 좋습니다.</div>
          </div>
          <textarea class="input-textarea" v-model="project.description" placeholder=""></textarea>
        </div>

        <div class="seperator"></div>

        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">창작자 이름</div>
            <div class="column label-description">프로젝트를 만든 팀이나 개인 이름을 입력해주세요.</div>
          </div>
          <input class="input-text" v-model="project.owner.name" placeholder=""/>
        </div>

        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">창작자 소개</div>
            <div class="column label-description">프로젝트를 만든 팀이나 개인을 소개해 주세요. 약력을 적어도 되고, 개성을 어필하셔도 좋습니다.</div>
          </div>
          <textarea class="input-textarea" v-model="project.owner.introduce" placeholder=""></textarea>
        </div>

        <div>
          <div class="columns is-centered label-area">
            <div class="column is-narrow label-title">창작자 이미지</div>
            <div class="column label-description">프로젝트를 만든 팀이나 개인을 소개하는 사진을 한장 넣어주세요.</div>
          </div>
          <add-image v-on:update-file-data="onUpdateOwnerImage" v-bind:maxFileCount="1" v-bind:currentImageList="current.ownerImageList"></add-image>
        </div>

        <div class="columns is-centered button-area">
          <div class="column is-narrow">
            <button class="cancel-button" v-on:click="cancelUpdate">취소</button>
          </div>
          <div class="column is-narrow">
            <button class="save-button" v-on:click="updateProject">프로젝트 수정</button>
          </div>
        </div>
      </div>
    </section>
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
