<template>
  <div id="contactDiv" class="ui vertical segment">
    <div class="ui container">
      <p class="contact-title">CONTACT US</p>
      <p class="contact-item-title first">Address</p>
      <p class="contact-item-contents">서울시 관악구 봉천동 서울대학교 관악캠퍼스 삼성전자 서울대 연구소 B동 10층 Looky</p>
      <p class="contact-item-title">Email</p>
      <p class="contact-item-contents"><a href="mailto:admin@appbee.info">admin@appbee.info</a></p>
    </div>
  </div>
</template>

<script>
// import Mail from '@/js/Mail'
export default {
  name: 'contactDiv',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contactDiv {
  padding-top: 56px;
  padding-bottom: 80px;
  border: 0;
}

#contactDiv p {
  margin-bottom: 0px;
}

.contact-title {
  font-family: BMJUAOTF;
  font-size: 27px;
  line-height: 1.74;
  text-align: center;
  color: #2894b1;
}

.contact-item-title {
  margin-top: 23px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #808080;
}

.contact-item-title.first {
  margin-top: 48px;
}

.contact-item-contents, .contact-item-contents a {
  margin-top: 4px;
  font-family: NotoSansCJKkr-light;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  color: rgba(128, 128, 128, 0.7);
  text-decoration: none;
}

.contact-item-contents a:hover {
  text-decoration: underline;
}

</style>
