<template>
  <div class="my-page" className="container">
    <h1>마이페이지</h1>
    <button v-on:click="onRegisterProject">프로젝트 등록</button>
    <button v-on:click="onLogout">로그아웃</button>
    <div>
      {{logoutErrorMsg}}
    </div>
  </div>
</template>

<script>
import HTTP from '../api/http-common';

export default {
  name: 'my-page',
  data() {
    return {
      logoutErrorMsg: '',
    };
  },
  methods: {
    onRegisterProject() {
      location.href = '/register_project';
    },
    onLogout() {
      HTTP.get('/auth/logout')
        .then(() => {
          location.href = '/';
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
