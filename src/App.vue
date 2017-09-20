<template>
  <div id="app">
    <search v-bind:search="searchByAppName"></search>
    <p>검색한 조건의 사용자수는 {{count}}명입니다.</p>
  </div>
</template>

<script>
import Search from './components/Search';
import List from './components/List';

export default {
  name: 'app',
  components: {
    Search,
    List,
  },
  data() {
    return {
      count: 0,
    };
  },
  created() {
    const baseURL = 'http://localhost:8080';
    this.$http.get(`${baseURL}/user/count`).then((result) => {
      this.count = result.data.count;
    });
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
