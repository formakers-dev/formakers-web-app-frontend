<template>
  <div id="login">
    <div class="contents">
      <appSummary></appSummary>
      <appName></appName>
      <appDetail></appDetail>
      <joinus></joinus>
      <qna></qna>
      <contact></contact>
    </div>
    <footer>
      <copyright></copyright>
    </footer>
  </div>
</template>

<script>
  import AppSummary from './landing/AppSummary';
  import AppName from './landing/AppName';
  import AppDetail from './landing/AppDetail';
  import Joinus from './landing/Joinus';
  import Qna from './landing/Qna';
  import Contact from './landing/Contact';
  import Copyright from './landing/Copyright';

  export default {
    name: 'login',
    data() {
      return {};
    },
    components: {
      appSummary: AppSummary,
      appName: AppName,
      appDetail: AppDetail,
      joinus: Joinus,
      qna: Qna,
      contact: Contact,
      copyright: Copyright,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
