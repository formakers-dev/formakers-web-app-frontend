<template>
  <div class="main">
    <input v-model="message" placeholder="앱 이름을 입력하세요"/>
    <button v-on:click="searchApps">Search</button>
    <p> {{message}}가 입력됨 </p>
    <p> 전체 사용자 수 {{count}}</p>
    <ul>
      <li v-for="app in apps" v-on:click="">
        {{ app.appName }}
      </li>
    </ul>
  </div>
</template>

<script>
import Search from './Search';
import List from './List';

export default {
  name: 'main',
  components: {
    Search,
    List,
  },
  data() {
    return {
      message: '',
      count: 0,
      apps: [],
      selectedList: [],
    };
  },
  created() {
    const baseURL = 'http://localhost:8080';
    this.$http.get(`${baseURL}/user/count`).then((result) => {
      this.count = result.data.count;
    });
  },
  methods: {
    searchApps() {
      const baseURL = 'http://localhost:8080';
      const url = `${baseURL}/app?keyword=${this.message}`;
      this.$http.get(url).then((result) => {
        this.apps = result.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }


  a {
    color: #42b983;
  }
</style>
