<template>
  <div class="register-project" className="container">
    <h1>프로젝트 등록</h1>
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

const BASE_URL = process.env.BASE_URL;

export default {
  name: 'register-project',
  data() {
    return {
      message: '',
      count: 0,
      apps: [],
      selectedList: [],
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
    onSignOut() {
      location.href = `${BASE_URL}/logout`;
    },
    sendMessage() {
      HTTP.post('/notification').then((result) => {
        console.log(result);
      });
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
