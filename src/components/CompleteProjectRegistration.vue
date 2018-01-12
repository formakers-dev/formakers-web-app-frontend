<template>
  <div id="completeProjectRegistration" class="container is-fullhd">
    <section class="section">
      <div class="container contents-area">
        <nav class="level progress-nav">
          <p class="level-item has-text-centered">
            <span class="navigation-circle active">1</span>
            <span class="navigation-text">프로젝트 등록</span>
          </p>
          <p class="level-item has-text-centered navigation-line"></p>
          <p class="level-item has-text-centered">
            <span class="navigation-circle">2</span>
            <span class="navigation-text">인터뷰 모집</span>
          </p>
          <p class="level-item has-text-centered navigation-line"></p>
          <p class="level-item has-text-centered">
            <span class="navigation-circle">3</span>
            <span class="navigation-text">등록완료</span>
          </p>
        </nav>
        <div>
          <img class="margin-bottom-50" src="../assets/check_image.png"/>
          <div class="complete-message margin-bottom-50">
            <p>프로젝트 등록이 완료되었습니다.</p>
            <p>지금 사용자 인터뷰 대상 모집을 시작하세요.</p>
          </div>
          <div class="complete-message-description margin-bottom-100">
            <p>정확한 유저를 모집해서 사용자의 생생한 체험기를 들어보세요.</p>
            <p>앱비가 1월까지 사용자 매칭을 지원해 드려서 모료로 사용 가능하십니다.</p>
          </div>
        </div>
        <div>
          <button class="cancel-button margin-right-50" v-on:click="moveToMyPage">다음에 하겠습니다.</button>
          <button class="save-button" v-on:click="moveToRegisterInterview">무료 모집 시작</button>
        </div>

      </div>
    </section>
  </div>
</template>
<script>

  export default {
    name: 'completeProjectRegistration',
    props: {
      projectId: {
        type: Number,
        required: true,
      },
    },
    methods: {
      moveToMyPage() {
        this.$router.push({ name: 'MyPage' });
      },
      moveToRegisterInterview() {
        this.$router.push({
          name: 'RegisterInterview',
          params: { projectId: this.projectId },
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .margin-right-50 {
    margin-right: 50px;
  }

  .margin-bottom-50 {
    margin-bottom: 50px;
  }

  .margin-bottom-100 {
    margin-bottom: 100px;
  }

  .complete-message {
    font-family: BMJUAOTF;
    font-size: 36px;
    line-height: 1.39;
    text-align: center;
    color: #4a4a4a;
  }

  .complete-message-description {
    font-family: NotoSansCJKkr;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: #4a4a4a;
  }
</style>
