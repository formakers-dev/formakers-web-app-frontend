<template>
  <div id="my-page" class="container">
    <div class="title-bar">
      <img class="appbee-logo" src="/static/image/appbee_logo.png"/>
      <button v-on:click="onLogout" class="logout-button">로그아웃</button>
    </div>

    <section class="title-section">
      <h1 class="title">내 프로젝트</h1>
      <hr class="title-underline" />
    </section>

    <section class="content-section">
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
    </section>

    <footer class="footer-area">
      <span class="footer-text">Copyright © 2017 | Privacy | All right reserved AppBee</span>
    </footer>
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
  .logout-button {
    float: right;
  }
  .title {
    height: 36px;
    margin-top: 29px;
    margin-bottom: 27px;
    font-family: BMJUAOTF;
    font-size: 36px;
    color: #4a4a4a;
    font-weight: normal;
  }

  .title-section {
  }

  .content-section {
    min-height: 1000px;
    padding-top: 60px;
    background-color: #f5f5f5;
  }
  .title-underline {
    width: 205px;
    height: 2.5px;
    border: solid 2.5px #4a4a4a;
    margin: 0 auto;

  }
  .register-project-button-area {
    width: 870px;
    height: 234px;
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    border: dashed 1px #979797;
    border-radius: 2px;
  }
  .register-project-button-icon {
    font-size: 144px;
    line-height: 144px;
    color: #4a4a4a;
  }
  .register-project-button-text {
    margin-top: 38px;
    font-size: 20px;
  }

  .footer-area {
    height: 40px;
    background-color: #808080;
  }
  .footer-text {
    opacity: 0.8;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
  }

</style>
