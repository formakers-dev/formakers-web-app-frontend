<template>
  <div id="not-verified-user">
    <div class="content-section text-container">
      등록되지 않은 사용자입니다.<br>
      원활한 사용을 위해 권한 등록이 필요합니다.<br>
      <a href="mailto:contact@formakers.net"><span class="emphasis">contact@formakers.net</span></a> 에 메일을 보내주세요.
    </div>
  </div>
</template>

<script>
  export default {
    name: 'not-verified-user',
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-container {
    padding-top: 243px;
    font-size: 20px;
  }
</style>
