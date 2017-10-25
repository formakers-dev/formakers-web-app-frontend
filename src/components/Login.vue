<template>
  <div id="login">
    <div class="login" className="container">
      <button v-on:click="onSignIn">로그인</button>
    </div>
    <header>
      <titleBarDiv></titleBarDiv>
    </header>
    <div class="contents">
      <summaryDiv></summaryDiv>
      <appNameDiv></appNameDiv>
      <appDetailDiv></appDetailDiv>
      <joinusDiv></joinusDiv>
      <qnaDiv></qnaDiv>
      <contactDiv></contactDiv>
    </div>
    <footer>
      <copyrightDiv></copyrightDiv>
    </footer>
  </div>
</template>

<script>
import HTTP from '../apis/http-common';
import { setLogin } from '../utils/auth';
import TitleBarDiv from '../components/landing/TitleBarDiv';
import SummaryDiv from '../components/landing/SummaryDiv';
import AppNameDiv from '../components/landing/AppNameDiv';
import AppDetailDiv from '../components/landing/AppDetailDiv';
import JoinusDiv from '../components/landing/JoinusDiv';
import QnaDiv from '../components/landing/QnaDiv';
import ContactDiv from '../components/landing/ContactDiv';
import CopyrightDiv from '../components/landing/CopyrightDiv';

const BASE_URL = process.env.BASE_URL;

export default {
  name: 'login',
  data() {
    return {
    };
  },
  created() {
    HTTP.get('/auth/check_login').then(() => {
      setLogin(true);
      this.$router.push('my_page');
    }).catch(() => {
      setLogin(false);
    });
  },
  methods: {
    onSignIn() {
      location.href = `${BASE_URL}/auth/google`;
    },
  },
  components: {
    titleBarDiv: TitleBarDiv,
    summaryDiv: SummaryDiv,
    appNameDiv: AppNameDiv,
    appDetailDiv: AppDetailDiv,
    joinusDiv: JoinusDiv,
    qnaDiv: QnaDiv,
    contactDiv: ContactDiv,
    copyrightDiv: CopyrightDiv,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
