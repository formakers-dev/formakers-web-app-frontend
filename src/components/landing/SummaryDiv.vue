<template>
  <div id="summaryDiv" class="ui vertical">
    <div class="ui container">
      <p class="summary-title">앱 안에 너 있다</p>
      <p class="summary-description">당신이 사용하는 앱을 보면 당신의 진짜 모습을 알 수 있죠!</p>
      <img src="static/image/summary.png"/>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#summaryDiv {
  padding-top: 61px;
  padding-bottom: 0;
  background-color: #ebe4da;
  border: 0;
}

#summaryDiv p {
  margin-bottom: 0;
}

#summaryDiv img {
  width: 556px;
  margin: 55px auto 0;
  display: block;
}

.summary-title {
  font-family: BMJUAOTF;
  font-size: 68px;
  color: #4a4a4a;
  line-height: 68px;
}

.summary-description {
  margin-top: 6px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  color: #9b9b9b;
}
</style>
