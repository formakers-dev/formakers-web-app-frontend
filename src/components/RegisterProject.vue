<template>
  <div id="registerProject" class="container">
    <h1>프로젝트 등록</h1>

    <p>프로젝트 이름</p>
    <input v-model="project.name" placeholder=""/>
    <p>한줄 소개</p>
    <input v-model="project.introduce" placeholder=""/>
    <p>대표이미지</p>
    <br/>
    <add-image v-on:update-file-data="onUpdateFileData"></add-image>
    <br/>
    <p>인터뷰 진행자 이름</p>
    <input v-model="project.interviewer.name" placeholder=""/>
    <p>인터뷰 진행자 사진</p>
    <add-image v-on:update-file-data="onUpdateInterviewerImage"></add-image>
    <p>인터뷰 진행자 소개</p>
    <input v-model="project.interviewer.introduce" placeholder=""/>
    <p>프로젝트 소개</p>
    <input v-model="project.description" placeholder=""/>
    <br/>
    <p>벤치마킹 앱 검색</p>

    <b-field label="벤치마킹 앱">
      <ul v-for="item in project.apps">
        <li>
          {{ item }}
        </li>
      </ul>
    </b-field>

    <input v-model="similarAppname" placeholder="유사앱 이름을 입력하세요"/>
    <button class='search-button' v-on:click="getSimilarApp">Search</button>
    <ul class='search-result-list' v-for="app in apps">
      <li @click="addSimilarApps(app)">
        {{ app.appName }}
      </li>
    </ul>
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
import debounce from 'lodash.debounce';
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
        apps: [],
        description: '',
        interview: {},
        status: '',
        interviewer: {
          name: '',
          url: '',
          introduce: '',
        },
      },
      similarAppname: '',
      apps: [],
      searchStatus: '',
    };
  },
  watch: {
    similarAppname(value) {
      this.searchStatus = '입력중';
      if (value.length > 1) {
        this.debounceGetSimilarApp();
      } else {
        this.apps = [];
      }
    },
  },
  methods: {
    debounceGetSimilarApp: debounce(function () {
      this.searchStatus = '검색중';
      this.getSimilarApp();
    }, 300),
    getSimilarApp() {
      HTTP.get(`/apps?keyword=${this.similarAppname}`).then((result) => {
        this.searchStatus = '조회완료';
        this.apps = result.data;
      }).catch((err) => {
        this.searchStatus = err;
      });
    },
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
    addSimilarApps(app) {
      this.project.apps.push(app.packageName);
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
