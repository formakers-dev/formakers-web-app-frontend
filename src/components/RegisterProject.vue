<template>
  <div id="registerProject" class="container is-fullhd">
    <div class="navbar title-bar">
      <img class="appbee-logo" src="static/image/appbee_logo.png"/>
    </div>

    <section class="section">
      <div class="container container-wrapper">
        <nav class="level">
          <p class="level-item has-text-centered">
            <span class="navigation-circle active">1</span>
            <span class="navigation-text">프로젝트 등록</span>
          </p>
          <p class="level-item has-text-centered navigation-line"/>
          <p class="level-item has-text-centered">
            <span class="navigation-circle">2</span>
            <span class="navigation-text">인터뷰 모집</span>
          </p>
          <p class="level-item has-text-centered navigation-line"/>
          <p class="level-item has-text-centered">
            <span class="navigation-circle">3</span>
            <span class="navigation-text">등록완료</span>
          </p>
        </nav>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">프로젝트 제목</div>
            <div class="column title-description">프로젝트를 지칭하는 멋진 제목을 10자 내에 적어주세요.</div>
          </div>
          <input class="input-text" v-model="project.name" placeholder=""/>
        </div>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">한줄 소개</div>
            <div class="column title-description">프로젝트를 소개하는데 가장 중요한 간단 홍보문구를 적어주세요.  서비스의 종류도 꼭 적어주세요.</div>
          </div>
          <input class="input-text" v-model="project.introduce" placeholder=""/>
        </div>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">대표 이미지</div>
            <div class="column title-description">프로젝트를 표현하는 대표 이미지를 한장 골라주세요.</div>
          </div>
          <add-image v-on:update-file-data="onUpdateImage" v-bind:maxFileCount="1"></add-image>
        </div>

        <div class="seperator"></div>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">동영상 URL</div>
            <div class="column title-description">프로젝트에 대한 영상이 있으시다면 유튜브 주소를 올려주세요. 선택사항입니다.</div>
          </div>
          <input class="input-text" v-model="project.videoUrl" placeholder=""/>
          <p class="guide">* 유튜브 동영상을 ‘미공개’ 상태로 업로드하고 주소를 올려주시면 대중에게는 영상 공개가 되지 않습니다.</p>
        </div>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">프로젝트 이미지</div>
            <div class="column title-description">프로젝트 이미지를 5장 올려주세요.</div>
          </div>
          <add-image v-on:update-file-data="onUpdateDescriptionImages" v-bind:maxFileCount="5"></add-image>
        </div>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">프로젝트 소개</div>
            <div class="column title-description">프로젝트의 매력을 홍보해 보세요. 이해하기 쉽고 간단하게 적어주시면 좋습니다.</div>
          </div>
          <textarea class="input-textarea" v-model="project.description" placeholder=""></textarea>
        </div>

        <div class="seperator"></div>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">창작자 이름</div>
            <div class="column title-description">프로젝트를 만든 팀이나 개인 이름을 입력해주세요.</div>
          </div>
          <input class="input-text" v-model="project.owner.name" placeholder=""/>
        </div>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">창작자 소개</div>
            <div class="column title-description">프로젝트를 만든 팀이나 개인을 소개해 주세요. 약력을 적어도 되고, 개성을 어필하셔도 좋습니다.</div>
          </div>
          <textarea class="input-textarea" v-model="project.owner.introduce" placeholder=""></textarea>
        </div>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">창작자 이미지</div>
            <div class="column title-description">프로젝트를 만든 팀이나 개인을 소개하는 사진을 한장 넣어주세요.</div>
          </div>
          <add-image v-on:update-file-data="onUpdateOwnerImage" v-bind:maxFileCount="1"></add-image>
        </div>

        <button class="save-button" v-on:click="registerProject">프로젝트 등록</button>
      </div>
    </section>


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
          image: {},
          description: '',
          descriptionImages: [],
          interviews: [],
          owner: {
            name: '',
            image: {},
            introduce: '',
          },
          videoUrl: '',
        },
      };
    },
    methods: {
      registerProject() {
        HTTP.post('/projects', this.project).then((result) => {
          this.$router.push({
            name: 'RegisterInterview',
            params: { projectId: result.data.projectId },
          });
        });
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
  .container-wrapper {
    max-width: 750px;
    margin-bottom: 100px;
  }

  .title-bar {
    height: 48px;
    background-color: #ffcd00;
  }

  .appbee-logo {
    width: 63px;
    height: 25px;
    float: left;
    margin-top: 16px;
    margin-left: 25px;
  }

  nav {
    margin-top: 50px;
    padding-bottom: 50px;
  }

  .navigation-circle {
    width: 29px;
    height: 29px;
    object-fit: contain;
    background-color: #9e9e9e;
    border-radius: 50%;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    vertical-align: middle;
  }

  .navigation-circle.active {
    background-color: #4285f4;
  }

  .navigation-text {
    display: inline-block;
    margin-left: 13px;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.0;
    text-align: left;
    color: #4a4a4a;
    white-space: nowrap;
  }
  .navigation-line {
    width: 100px;
    height: 2px;
    margin-left: 27px;
    margin-right: 27px;
    border: solid 0.5px #d4d4d4;
  }

  .title-div {
    margin-top: 50px;
    vertical-align: middle;
  }

  .title-name {
    padding-top: 0;
    padding-bottom: 3px;
    margin-right: 26px;
    white-space: nowrap;
    font-family: NotoSansCJKkr;
    line-height: 1.17;
    font-size: 18px;
    text-align: left;
    color: #4a4a4a;
  }

  .title-description {
    padding-top: 0;
    padding-bottom: 0;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    text-align: left;
    color: #979797;
  }

  .input-text {
    width: 100%;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 2px;
    background-color: #ffffff;
    border: solid 1px #4285f4;
    font-family: NotoSansCJKkr;
    font-size: 12px;
    line-height: 1.42;
    text-align: left;
    color: #4a4a4a;
  }

  .input-textarea {
    width: 100%;
    height: 400px;
    padding: 16px;
    border-radius: 2px;
    background-color: #ffffff;
    border: solid 1px #4285f4;
    font-family: NotoSansCJKkr;
    font-size: 12px;
    line-height: 1.42;
    text-align: left;
    color: #4a4a4a;
  }

  .seperator {
    width: 750px;
    height: 1px;
    background-color: #9b9b9b;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .guide {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    text-align: right;
    color: #979797;
    margin-top: 10px;
  }

  .save-button {
    width: 340px;
    height: 80px;
    margin-top: 100px;
    object-fit: contain;
    background-color: #ffcd00;
    font-family: AppleSDGothicNeo;
    font-size: 18px;
    text-align: center;
    color: #4a4a4a;
  }
  /*h1, h2 {*/
    /*font-weight: normal;*/
  /*}*/

  /*a {*/
    /*color: #42b983;*/
  /*}*/
</style>
