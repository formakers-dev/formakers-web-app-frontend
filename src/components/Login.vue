<template>
  <div id="login">
    <div class="contents">
      <summaryDiv></summaryDiv>
      <appNameDiv></appNameDiv>
      <appDetailDiv></appDetailDiv>
      <joinusDiv></joinusDiv>
      <qnaDiv></qnaDiv>
      <contactDiv></contactDiv>
    </div>
    <footer>
      <copyrightDiv></copyrightDiv>
    </footer>
  </div>
</template>

<script>
  import SummaryDiv from '../components/landing/SummaryDiv';
  import AppNameDiv from '../components/landing/AppNameDiv';
  import AppDetailDiv from '../components/landing/AppDetailDiv';
  import JoinusDiv from '../components/landing/JoinusDiv';
  import QnaDiv from '../components/landing/QnaDiv';
  import ContactDiv from '../components/landing/ContactDiv';
  import CopyrightDiv from '../components/landing/CopyrightDiv';

  export default {
    name: 'login',
    data() {
      return {};
    },
    components: {
      summaryDiv: SummaryDiv,
      appNameDiv: AppNameDiv,
      appDetailDiv: AppDetailDiv,
      joinusDiv: JoinusDiv,
      qnaDiv: QnaDiv,
      contactDiv: ContactDiv,
      copyrightDiv: CopyrightDiv,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
