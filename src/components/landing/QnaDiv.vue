<template>
  <div id="qnaDiv" class="ui vertical">
    <div class="ui container">
      <p class="qna-title">FAQ</p>
      <div class="qna-contents">
        <p class="qna-question first">이메일 정보를 왜 수집하고, 어떻게 사용하시나요?</p>
        <p class="qna-answer">메일 정보는 오직 메일을 보내는 데에만 사용돼요. <br/>
          앱비의 사람과 앱, App Behaviour 대한 <br/>
          재미난 정보를 무료로 보내드리는 데에만 사용됩니다.</p>
        <p class="qna-question">내가 사용하는 앱 정보를 줘야 하나요? 개인정보가 걱정되요</p>
        <p class="qna-answer">앱비는 개인정보 보호와 안전이 가장 중요하다고 생각했어요.<br/>
          모든 개인정보는 암호화되어서 앱비는 당신이<br/>
          누구인지 알 수 없고, 개인정보에 접근 권한도 없어요.<br/>
          서비스가 시작되면 앱 사용에 대한 권한을 요청드릴 생각이에요. </p>

        <p class="qna-question">앱비는 어떤 서비스를 제공할 예정인가요?</p>
        <p class="qna-answer">앱비는 App Behaviour를 분석해서<br>
          앱을 사용하는 많은 사람에 대한 다양한 정보를 드릴 예정이에요.<br>
          사람들이 사는 삶의 패턴과 앱의 연관관계, 당신 앱의 진짜 유저 등등!<br>
          더 궁금한 것, 혹은 제안할게 있다면 앱비에게 메일 주세요.</p>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #qnaDiv {
    background-color: #2894b1;
    padding-top: 60px;
    padding-bottom: 125px;
    border: 0;
  }

  #qnaDiv p {
    margin-bottom: 0;
  }

  .qna-title {
    font-family: BMJUAOTF;
    font-size: 30px;
    line-height: 1.57;
    text-align: center;
    color: #f8c81c;
  }

  .qna-contents {
    margin-top: 54px;
  }

  .qna-question {
    margin-top: 113px;
    font-family: BMJUAOTF;
    font-size: 22px;
    text-align: center;
    color: #ffffff;
  }

  .qna-question.first {
    margin-top: 0;
  }

  .qna-answer {
    margin-top: 20px;
    font-family: NotoSansCJKkr-light;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
  }

</style>
