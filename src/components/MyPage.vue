<template>
  <div id="my-page" class="container">

    <button v-on:click="onLogout" class="logout-button">로그아웃</button>

    <h1 class="title">내 프로젝트</h1>
    <div class="project-list-area">
      <hr class="title-underline" />
      <div>
        {{logoutErrorMsg}}
      </div>
      <div v-for="item in projectList">
        <project-item v-bind:project=item></project-item>
      </div>

      <div id="register-project-button" class="register-project-button-area" v-on:click="onRegisterProject">
        <p class="register-project-button-icon">+</p>
        <p class="register-project-button-text">프로젝트를 추가하세요</p>
      </div>

    </div>
  </div>
</template>

<script>
import HTTP from '../apis/http-common';
import { setLogin } from '../utils/auth';
import ProjectItem from './ProjectItem';

export default {
  components: { ProjectItem },
  name: 'my-page',
  data() {
    return {
      logoutErrorMsg: '',
      projectList: '',
    };
  },
  created() {
    HTTP.get('/projects').then((res) => {
      this.projectList = res.data;
    });
  },
  methods: {
    onLogout() {
      HTTP.get('/auth/logout')
        .then(() => {
          this.moveToLogin();
        })
        .catch(() => {
          this.moveToLogin();
        });
    },
    moveToLogin() {
      setLogin(false);
      this.$router.push({ name: 'Login' });
    },
    onRegisterProject() {
      this.$router.push({ name: 'RegisterProject' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logout-button {}
  .title {
    font-family: BMJUAOTF;
    font-size: 30px;
    font-weight: normal;
  }
  .project-list-area {
    background-color: lightgray;
    padding-bottom: 20px;
  }
  .title-underline {
    height: 3px;
    width: 200px;
    background-color: black;
    margin-left: auto;
    margin-right: auto;
  }
  .register-project-button-area {
    width: 800px;
    margin: 30px auto;
    background-color: white;
    padding-top: 30px;
    padding-bottom: 30px;
    border: 3px dashed gray;
  }
  .register-project-button-icon {
    font-size: 100px;
  }
  .register-project-button-text {
    font-size: 20px;
  }
</style>
