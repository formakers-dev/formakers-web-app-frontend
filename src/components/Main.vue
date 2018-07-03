<template>
  <div id="main">
    <div class="contents">
      <appSummary></appSummary>
      <appName></appName>
      <appDetail></appDetail>
      <joinus></joinus>
      <qna></qna>
      <notice></notice>
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
  import Notice from '../components/landing/Notice';
  import Contact from './landing/Contact';
  import Copyright from './landing/Copyright';

  export default {
    name: 'main',
    data() {
      return {};
    },
    components: {
      appSummary: AppSummary,
      appName: AppName,
      appDetail: AppDetail,
      joinus: Joinus,
      qna: Qna,
      notice: Notice,
      contact: Contact,
      copyright: Copyright,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
