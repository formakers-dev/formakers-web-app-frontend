<template>
  <div id="my-page" class="container">
    <section>
      <h1 class="title">내 프로젝트</h1>
      <hr class="title-underline" />
    </section>

    <section class="content-section padding-top-50 padding-bottom-50">
      <div>
        {{logoutErrorMsg}}
      </div>
      <div v-for="item in projectList">
        <project-item v-bind:project=item></project-item>
      </div>

      <div id="register-project-button" class="register-project-button-area" v-on:click="onRegisterProject" v-bind:class="isEmptyList() ? ButtonWithOutListClass : ButtonWithListClass">
        <div class="register-project-button-icon">+</div>
        <div class="register-project-button-text">프로젝트를 추가하세요</div>
      </div>
    </section>
</div>
</template>

<script>
import HTTP from '../apis/http-common';
import ProjectItem from './ProjectItem';

export default {
  components: { ProjectItem },
  name: 'my-page',
  data() {
    return {
      logoutErrorMsg: '',
      projectList: '',
      ButtonWithOutListClass: 'register-project-button-without-list',
      ButtonWithListClass: 'register-project-button-with-list',
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
    isEmptyList() {
      return !this.projectList || this.projectList.length <= 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    height: 36px;
    margin-top: 29px;
    margin-bottom: 27px;
    font-family: BMJUAOTF;
    font-size: 36px;
    color: #4a4a4a;
    font-weight: normal;
  }

  .content-section {
    min-height: 1000px;


    background-color: #f5f5f5;
  }

  .title-underline {
    width: 205px;
    height: 2.5px;
    border: solid 2.5px #4a4a4a;
    margin: 0 auto;

  }
  .register-project-button-area {
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    border: dashed 1px #979797;
    border-radius: 2px;
  }

  .register-project-button-without-list {
    width: 870px;
    height: 234px;
  }

  .register-project-button-with-list {
    width: 252px;
    height: 200px;
  }

  .register-project-button-icon {
    font-size: 144px;
    line-height: 144px;
    color: #4a4a4a;
  }
  .register-project-button-text {
    font-size: 20px;
  }

</style>
