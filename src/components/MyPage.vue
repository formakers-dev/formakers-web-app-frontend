<template>
  <div id="my-page" class="container">
    <h1>마이페이지</h1>
    <button v-on:click="onRegisterProject">프로젝트 등록</button>
    <button v-on:click="onLogout">로그아웃</button>
    <div>
      {{logoutErrorMsg}}
    </div>
    <div v-for="item in projectList">
      <project-item v-bind:project=item></project-item>
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
    onRegisterProject() {
      this.$router.push({ name: 'RegisterProject' });
    },
    onLogout() {
      HTTP.get('/auth/logout')
        .then(() => {
          setLogin(false);
          this.$router.push({ name: 'Login' });
        })
        .catch((err) => {
          this.logoutErrorMsg = `${err} 로그아웃 실패`;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
