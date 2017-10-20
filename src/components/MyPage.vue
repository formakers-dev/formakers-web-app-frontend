<template>
  <div class="my-page" className="container">
    <h1>마이페이지</h1>
    <button v-on:click="onRegisterProject">프로젝트 등록</button>
  </div>
</template>

<script>
export default {
  name: 'my-page',
  data() {
    return {};
  },
  methods: {
    onRegisterProject() {
      location.href = '/register_project';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
