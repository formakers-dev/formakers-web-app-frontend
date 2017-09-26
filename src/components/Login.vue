<template>
  <div class="login">
    <div id="google-signin-btn" v-show="!isLogin"></div>
    <div id="user-info" v-if="isLogin">로그인 중인 유저 : {{userName}}</div>
    <div id="google-signout-btn" v-show="isLogin" v-on:click="onSignOut">로그아웃</div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'login',
  data() {
    return {
      isLogin: false,
      userName: ''
    }
  },
  methods: {
    onSignIn: function(googleUser) {
      const auth2 = gapi.auth2.init();

      if(auth2.isSignedIn.get()) {
        const profile = googleUser.getBasicProfile();
        this.isLogin = true;
        //TODO: server로 idtoken 보내기
        //TODO: 메인화면으로 이동 - user
        this.userName = profile.getName();
      } else {
        this.isLogin = false;
      }
    },
    onSignOut: function() {
      var auth2 = gapi.auth2.getAuthInstance();

      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      //TODO : signOut 콜백 안에 넣기
      this.isLogin = false;
    },
  },
  mounted() {
    gapi.signin2.render('google-signin-btn', {
      longtitle: true,
      onsuccess: this.onSignIn
    });
  }
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
