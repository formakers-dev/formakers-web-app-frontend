<template>
  <div id="app">
    <nav-bar v-on:unverified-user="moveToUnverifiedUser"></nav-bar>

    <router-view v-on:unverified-user="moveToUnverifiedUser"></router-view>

    <footer class="footer-area">
      <span class="footer-text">Copyright © 2017 | Privacy | All right reserved ForMakers</span>
    </footer>
  </div>
</template>

<script>
  import NavBar from './components/NavBar';

  export default {
    name: 'app',
    components: {
      NavBar,
    },
    methods: {
      moveToUnverifiedUser() {
        this.$router.push({ name: 'UnverifiedUser' });
      },
    },
  };
</script>


<style src="./assets/styles/common.css"></style>
<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  @font-face {
    font-family: "BMJUAOTF";
    src: url('../static/fonts/BMJUA.otf'), local(SansSerif);
  }

  @font-face {
    font-family: "NotoSansCJKkr";
    src: url('../static/fonts/NotoSansKR-Regular.otf'), local(SansSerif);
  }

  @font-face {
    font-family: "NotoSansCJKkr-light";
    src: url('../static/fonts/NotoSansKR-Light.otf'), local(SansSerif);
  }

  @font-face {
    font-family: "NotoSansCJKkr-medium";
    src: url('../static/fonts/NotoSansKR-Medium.otf'), local(SansSerif);
  }

  @font-face {
    font-family: "NotoSans";
    src: url('../static/fonts/NotoSans-Regular.ttf'), local(SansSerif);
  }

  @font-face {
    font-family: "Pacifico";
    src: url('../static/fonts/Pacifico-Regular.ttf'), local(SansSerif);
  }

  .content-section {
    min-height: 1000px;
    background-color: #f5f5f5;
  }

  .contents-area {
    max-width: 750px;
    margin-bottom: 100px;
  }

  .navbar {
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

  .progress-nav {
    margin-top: 50px;
    padding-bottom: 50px;
  }

  .navigation-circle {
    width: 29px;
    height: 29px;
    object-fit: contain;
    background-color: #9e9e9e;
    border-radius: 50%;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    vertical-align: middle;
  }

  .navigation-circle.active {
    background-color: #4285f4;
  }

  .navigation-text {
    display: inline-block;
    margin-left: 13px;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.0;
    text-align: left;
    color: #4a4a4a;
    white-space: nowrap;
  }

  .navigation-line {
    width: 100px;
    height: 2px;
    margin-left: 27px;
    margin-right: 27px;
    border: solid 0.5px #d4d4d4;
  }

  .label-area {
    margin-top: 50px;
    vertical-align: middle;
  }

  .label-title {
    padding-top: 0;
    padding-bottom: 3px;
    margin-right: 26px;
    white-space: nowrap;
    font-family: NotoSansCJKkr;
    line-height: 1.17;
    font-size: 18px;
    text-align: left;
    color: #4a4a4a;
  }

  .label-description {
    padding-top: 0;
    padding-bottom: 0;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    text-align: left;
    color: #979797;
  }

  .label-guide {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    text-align: right;
    color: #979797;
    margin-top: 10px;
  }

  .input-text {
    width: 100%;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 2px;
    background-color: #f9f9f9;
    outline: none;
    border: solid 1px #d8d8d8;
    font-family: NotoSansCJKkr;
    font-size: 12px;
    line-height: 1.42;
    text-align: left;
    color: #4a4a4a;
  }

  .input-textarea {
    width: 100%;
    height: 400px;
    padding: 16px;
    border-radius: 2px;
    background-color: #f9f9f9;
    border: solid 1px #d8d8d8;
    font-family: NotoSansCJKkr;
    font-size: 12px;
    line-height: 1.42;
    text-align: left;
    color: #4a4a4a;
  }

  .input-text:focus, .input-textarea:focus {
    background-color: #ffffff;
    border: solid 1px #4285f4;
  }


  .seperator {
    width: 750px;
    height: 1px;
    background-color: #9b9b9b;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .button-area {
    margin-top: 100px;
    vertical-align: middle;
  }

  .save-button {
    width: 340px;
    height: 80px;
    object-fit: contain;
    background-color: #ffcd00;
    border: 0;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    text-align: center;
    color: #4a4a4a;
  }

  .cancel-button {
    width: 340px;
    height: 80px;
    object-fit: contain;
    background-color: #eeeeee;
    border: 0;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    text-align: center;
    color: #4a4a4a;
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
