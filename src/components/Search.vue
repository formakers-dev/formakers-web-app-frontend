<template>
  <div class="search">
    <input v-model="message" placeholder="앱 이름을 입력하세요"/>
    <button>Search</button>
    <p> {{message}} </p>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        message: '',
      };
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
