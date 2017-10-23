<template>
  <div class="login" className="container">
    <button v-on:click="onSignIn">로그인</button>
  </div>
</template>

<script>
import HTTP from '../apis/http-common';
import { setLogin } from '../utils/auth';

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
      location.href = '/my_page';
    }).catch(() => {
      setLogin(false);
    });
  },
  methods: {
    onSignIn() {
      location.href = `${BASE_URL}/auth/google`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
