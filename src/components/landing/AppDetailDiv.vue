<template>
  <div id="appDetailDiv" class="ui vertical segment">
    <div class="ui container">
      <div class="detail-container first">
        <img class="left" src="static/image/explorer.png">
        <div class="right text">
          <p class="detail-title">맛집 앱이 많은 사람은?<br/>맛집 찾는 미식탐험가!</p>
          <p class="detail-description">심리검사로도 사주로도 알기 어려운 나의 진짜 모습!<br/>
            앱비랑 앱리스트를 분석하면 당신의 진짜 관심사와<br>현재 모습을 알 수 있어요.</p>
        </div>
        <hr/>
      </div>
      <div class="detail-container">
        <div class="left text">
          <p class="detail-title">운동앱이 열개라도<br>운동앱을 써야 몸짱이 되죠</p>
          <p class="detail-description">어떤 앱을 얼마나 사용하는지 알면,<br>
            당신의 삶을 더 깊이 이해할 수 있죠.<br>스스로를 이해하면 목표도 더 빨리 이룰거에요.</p>
        </div>
        <img class="right" src="static/image/health_boy.png">
        <hr/>
      </div>
      <div class="detail-container">
        <img class="left" src="static/image/selfie_boy.png">
        <div class="right text">
          <p class="detail-title">앱을 쓰는 우리들의 심리<br>App Behaviour 속에 있어요!</p>
          <p class="detail-description">앱 사용자들에게는 사용패턴을 분석하여 당신의 생활에 대한<br>
            정보를 드리고, 앱을 만드는 사람에게는 사용자의 모바일 앱<br>
            사용패턴을 안전하게 전달하여 인사이트를 드리려고 해요.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Mail from '@/js/Mail'
export default {
  name: 'appNameDiv',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#appDetailDiv {
  padding: 124px 154px 0;
  background-color: #f8c81c;
  border: 0;
}

#appNameDiv p {
  margin-bottom: 0;
}

#appDetailDiv img {
  width: 212px;

}

.detail-container {
  text-align: left;
  max-width: 716px;
  margin-top: 122px;
  margin-left: auto;
  margin-right: auto;
}

.detail-container.first {
  margin-top: 0;
}

.detail-container .left {
  vertical-align: top;
  display: inline-block;
  margin-left: 21px;
}

.detail-container .right {
  vertical-align: top;
  display: inline-block;
  position: relative;
  left: 94px;
}

.detail-container .text {
  margin-top: 9px;
  line-height: 25px;
}

.detail-container p {
  display: block;
  text-align: left;
}

.detail-container hr {
  width: 716px;
  height: 1px;
  border: 0;
  color: #9b9b9b;
  background-color: #9b9b9b;
  margin-top: 0;
  margin-bottom: 0;
}

.detail-title {
  margin-top: 9px;
  font-family: BMJUAOTF;
  font-size: 36px;
  color: #ffffff;
  line-height: 36px;
}

.detail-description {
  margin-top: 30px;
  font-family: NotoSansCJKkr;
  font-size: 17px;
  color: rgba(74, 74, 74, 0.7);
}
</style>
