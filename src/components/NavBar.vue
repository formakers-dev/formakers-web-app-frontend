<template>
  <nav id="navBar" class="navbar" role="navigation" aria-label="main navigation">
    <div v-if="isLogin" class="nav-width">
      <div class="navbar-brand login-header">
        <p class="title font-white font-left">AppBee</p>
      </div>
      <div id="logout-button" class="nav-button" v-on:click="onLogout">{{username}}</div>
    </div>

    <div v-else class="logout-area nav-width">
      <div class="navbar-brand login-header">
        <p class="title font-yellow">AppBee</p>
      </div>
      <div class="nav-button font-yellow" v-on:click="onSignIn">로그인</div>
    </div>

  </nav>
</template>

<script>
  import HTTP from '../apis/http-common';
  import { setLogin, isLoggedIn } from '../utils/auth';

  const BASE_URL = process.env.BASE_URL;

  export default {
    name: 'navBar',
    data() {
      return {
        isLogin: false,
        username: '',
      };
    },
    created() {
      HTTP.get('/auth/check_login').then((result) => {
        this.username = result.data.username;
        setLogin(true);
        this.isLogin = isLoggedIn();
        this.$router.push({ name: 'MyPage' });
      }).catch(() => {
        setLogin(false);
        this.isLogin = false;
      });
    },
    methods: {
      onLogout() {
        HTTP.get('/auth/logout')
          .then(() => {
            this.isLogin = false;
            this.moveToLogin();
          })
          .catch(() => {
            this.isLogin = false;
            this.moveToLogin();
          });
      },
      moveToLogin() {
        setLogin(false);
        this.$router.push({ name: 'Login' });
      },
      onSignIn() {
        location.href = `${BASE_URL}/auth/google`;
      },
    },
  };
</script>

<style scoped>
  .nav-button {
    font-family: NotoSansCJKkr;
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    position: absolute;
    right: 24px;
    display: inline-block;
    line-height: 52px;
  }

  .nav-width {
    width: 100%;
  }
  .login-header {
    display: inline-block;

  }
  .logout-area {
    height: 53px;
    vertical-align: middle;
    background-color: #ffffff;
    border: 0;
  }
  .title {
    font-family: Pacifico;
    font-weight: normal;
    font-size: 20px;
    line-height: 52px;
  }
  .font-yellow {
    color: #f8e81c;
  }
  .font-white {
    color: #ffffff;
  }

  .font-left {
    position: absolute;
    left: 24px;
  }

</style>
