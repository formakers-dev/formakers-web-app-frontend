<template>
  <ul class="list">
    <item v-for="item in items" v-bind:item="item"></item>
  </ul>
</template>

<script>
import Item from './Item';

export default {
  name: 'list',
  components: {
    Item,
  },
  data() {
    return {
      message: '',
      items: [
        {
          name: 'test',
          phone: '000-111-2222',
        },
        {
          name: 'test2',
          phone: '000-111-2222',
        },
      ],
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
