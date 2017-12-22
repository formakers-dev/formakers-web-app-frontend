<template>
  <nav id="navBar" class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <img class="appbee-logo" src="/static/image/appbee_logo.png"/>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <button class="logout-button" v-on:click="onLogout">로그아웃</button>
      </div>
    </div>
  </nav>
</template>

<script>
  import HTTP from '../apis/http-common';
  import { setLogin } from '../utils/auth';

  export default {
    name: 'navBar',
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
    },
  };
</script>

<style scoped>
  .navbar-brand {
    padding-left: 16px;
  }
  .appbee-logo {
    width: 63px;
    height: 25px;
  }
</style>
