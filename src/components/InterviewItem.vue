<template>
  <div id="interview-item">
    <div class="interview-item-content title-area">
      <p class="seq"><span class="strike">{{interview.seq}}</span> 번째
인터뷰</p>
      <p class="registered-date">등록일 : {{interviewDate}}</p>
    </div>
    <div class="interview-item-divider"/>
    <div class="interview-item-content status-area">
      <h3 class="title">유저 모집 (<span class="strike">?/{{interview.totalCount}}</span>명)</h3>
      <div class="content">
        <p>모집기간 : {{openDate}} ~ {{closeDate}} </p>
        <p><span class="strike">{{interview.apps[0].appName}}</span> 앱 사용자 모집 예정</p>
      </div>
    </div>
    <div class="interview-item-divider"/>
    <div class="interview-item-content detail-area">
      <h3 class="title">인터뷰 <span class="strike">D-{{this.dDay}}</span>일</h3>
      <div class="content">
        <p>인터뷰 날짜 : {{interviewDate}}</p>
        <p>리워드 : 커피쿠폰 3만원</p>
        <p>인터뷰 장소 : {{interview.location}}</p>
      </div>
    </div>
    <div class="interview-item-divider"/>
    <div class="interview-item-content update-button-area" v-on:click="moveToUpdateInterview">
      <img src="static/image/edit_button.png" class="edit-button"/>
      <span>인터뷰 수정</span>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'interview-item',
    props: {
      projectId: {
        type: Number,
        required: true,
      },
      interview: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        interviewDate: '',
        openDate: '',
        closeDate: '',
        dDay: '',
      };
    },
    created() {
      this.interviewDate = moment(this.interview.interviewDate).format('YY-MM-DD');
      this.openDate = moment(this.interview.openDate).format('YY-MM-DD');
      this.closeDate = moment(this.interview.closeDate).format('YY-MM-DD');
      this.dDay = this.getDday();
    },
    methods: {
      getDday() {
        return Math.ceil(
          (new Date(this.interview.interviewDate)
                          - new Date()) / 24 / 60 / 60 / 1000);
      },
      moveToUpdateInterview() {
        this.$router.push({
          name: 'UpdateInterview',
          params: { projectId: this.projectId, interviewSeq: this.interview.seq },
        });
      },
    },
  };
</script>

<style scoped>
  #interview-item {
    width: 870px;
    margin: 0 auto 30px auto;
    background-color: #ffffff;
    border: solid 0.5px #d8d8d8;
  }

  .interview-item-content {
    margin: 0;
    padding: 0;
    vertical-align: top;
  }

  .interview-item-content .seq {
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: #4a4a4a;
    white-space: pre;
  }

  .interview-item-content .strike {
    color: #4285f4;
  }

  .interview-item-content .registered-date {
    font-size: 12px;
    line-height: 2.92;
    color: #4a4a4a;
    text-align: center;
  }

  .interview-item-content.title-area {
    margin: 0;
    width:150px;
    padding-top: 35px;
    display: inline-block;

  }
  .interview-item-content.status-area {
    margin: 0;
    width:272px;
    padding-top: 25px;
    padding-left: 40px;
    padding-right: 30px;
    display: inline-block;
  }

  .interview-item-content.status-area .title {
    font-family: NotoSansCJKkr-Medium;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    color: #4a4a4a;
    margin: 0;
  }

  .interview-item-content.status-area .content {
    margin-top: 30px;
  }

  .interview-item-content.status-area p {
    font-size: 12px;
    margin: 0;
    text-align: left;
    color: #4a4a4a;
  }

  .interview-item-content.detail-area {
    margin: 0;
    width:262px;
    padding-top: 25px;
    padding-left: 40px;
    padding-right: 30px;
    display: inline-block;
  }

  .interview-item-content.detail-area .title{
    font-family: NotoSansCJKkr-Medium;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    margin: 0;
  }

  .interview-item-content.detail-area .content {
    margin-top: 30px;
  }

  .interview-item-content.detail-area p{
    margin: 0;
    font-size: 12px;
    text-align: left;
    color: #4a4a4a;
  }

  .interview-item-content.update-button-area {
    margin: 0;
    width:150px;
    display: inline-block;
    padding-top: 58px;
  }

  .interview-item-content.update-button-area span {
    font-size: 16px;
    line-height: 1.25;
    text-align: center;
    color: #4a4a4a;
  }

  .interview-item-divider {
    display: inline-block;
    margin-top: 10px;
    height: 127px;
    width: 0;
    border: solid 0.5px #d8d8d8;
    font-size: 0;
  }

  .edit-button {
    width: 26px;
    height: 28px;
    vertical-align: top;
    margin-right: 15px;
  }
</style>
