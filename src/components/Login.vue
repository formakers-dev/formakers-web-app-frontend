<template>
  <div class="login" className="container">
    <button v-on:click="onSignIn">로그인</button>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
    };
  },
  methods: {
    onSignIn() {
      location.href = 'http://localhost:8080/auth/google';
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
