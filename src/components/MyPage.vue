<template>
  <div id="my-page" class="container">
    <myProjectTitle />

    <section class="content-section padding-top-50 padding-bottom-50">
      <div>
        {{logoutErrorMsg}}
      </div>
      <div v-for="item in projectList">
        <project-item v-bind:project=item></project-item>
      </div>

      <div id="register-project-button" class="register-project-button-area" v-on:click="onRegisterProject"
           v-bind:class="isEmptyList() ? ButtonWithOutListClass : ButtonWithListClass">
        <div class="register-project-button-icon">+</div>
        <div class="register-project-button-text">프로젝트를 추가하세요</div>
      </div>
    </section>
  </div>
</template>

<script>
  import HTTP from '../apis/http-common';
  import ProjectItem from './ProjectItem';
  import MyProjectTitle from './MyProjectTitle';

  export default {
    components: { ProjectItem, MyProjectTitle },
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

  .content-section {
    min-height: 1000px;
    background-color: #f5f5f5;
  }

  .register-project-button-area {
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    border: dashed 1px #979797;
    border-radius: 2px;
    cursor: pointer;
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
