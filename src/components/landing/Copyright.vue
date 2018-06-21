<template>
  <div id="copyright" class="ui vertical segment">
    <div class="ui container">
      <p class="copyright-contents">Copyright 2017. All rights Reserved</p>
    </div>
  </div>
</template>

<script>
  // import Mail from '@/js/Mail'
  export default {
    name: 'contact',
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #copyright {
    padding-top: 17px;
    padding-bottom: 15px;
    background-color: #d4d4d4;
    border: 0;
  }

  .copyright-contents {
    font-family: NotoSansCJKkr-medium;
    font-size: 12px;
    font-weight: 500;
    color: #808080;
  }

</style>
