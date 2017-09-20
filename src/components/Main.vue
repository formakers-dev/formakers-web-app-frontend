<template>
  <div class="main">
    <input v-model="message" placeholder="앱 이름을 입력하세요"/>
    <button>Search</button>
    <p> {{message}}가 입력됨 </p>
    <p> 전체 사용자 수 {{count}}</p>
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
