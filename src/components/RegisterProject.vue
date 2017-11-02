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
    <p>벤치 마킹 앱</p>
    <input v-model="project.apps" placeholder=""/>
    <input v-model="project.apps" placeholder=""/>
    <p>인터뷰 진행자 소개</p>
    <input v-model="project.interviewer_introduce" placeholder=""/>
    <p>프로젝트 소개</p>
    <input v-model="project.description" placeholder=""/>
    <p>인터뷰 타입 선택</p>
    <input v-model="project.interview.type" placeholder=""/>
    <p>인터뷰 장소 선택</p>
    <input v-model="project.interview.location" placeholder=""/>
    <p>인터뷰 모집기간</p>
    <input v-model="project.interview.open_date" placeholder=""/>
    <input v-model="project.interview.close_date" placeholder=""/>
    <p>인터뷰 진행기간</p>
    <input v-model="project.interview.start_date" placeholder=""/>
    <input v-model="project.interview.end_date" placeholder=""/>
    <p>인터뷰 세부일정 입력</p>
    <br/>
    <button class="temporary-save-button" v-on:click="tempRegisterProject">임시저장</button>
    <button class="save-button" v-on:click="registerProject">프로젝트 등록</button>
    <br/>
    <br/>
    <br/>
    <input v-model="message" placeholder="앱 이름을 입력하세요"/>
    <button v-on:click="searchApps">Search</button>
    <p> {{message}}가 입력됨 </p>
    <p> 전체 사용자 수 {{count}}</p>
    <button v-on:click="sendMessage">Push Push Baby~</button>
    <ul>
      <li v-for="app in apps" v-on:click="">
        {{ app.appName }}
      </li>
    </ul>
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
        customerId: '',
        name: '',
        introduce: '',
        images: [],
        apps: [],
        interviewer_introduce: '',
        description: '',
        interview: {
          type: '',
          location: '',
          open_date: '',
          close_date: '',
          start_date: '',
          end_date: '',
          plans: [],
        },
        status: '',
      },
      message: '',
      count: 0,
      apps: [],
    };
  },
  created() {
    HTTP.get('/user/count').then((result) => {
      this.count = result.data.count;
    });
  },
  methods: {
    searchApps() {
      HTTP.get(`/app?keyword=${this.message}`).then((result) => {
        this.apps = result.data;
      });
    },
    sendMessage() {
      HTTP.post('/notification').then((result) => {
        console.log(result);
      });
    },
    tempRegisterProject() {
      this.project.status = 'temporary';
      HTTP.post('/project', this.project).then(() => {
        this.$router.push('my_page');
      });
    },
    registerProject() {
      this.project.status = 'registered';
      HTTP.post('/project', this.project).then(() => {
        this.$router.push('my_page');
      });
    },
    onUpdateFileData(fileMetadataList) {
      this.project.images = fileMetadataList;
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
