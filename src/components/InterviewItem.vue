<template>
  <div id="interview-item">
    <div class="interview-item-content title">
      <h2><span class="strike">{{interview.seq}}</span>번째 인터뷰</h2>
      <p>등록일:{{interview.interviewDate}}</p>
    </div>
    <div class="interview-item-divider"/>
    <div class="interview-item-content status">
      <h2>유저 모집 시작 <span class="strike">{{dDay(interview.interviewDate)}}</span></h2>
      <p>모집기간 : {{interview.openDate}} ~ {{interview.closeDate}} </p>
      <p><span class="strike">{{interview.apps[0].appName}}</span> 앱 사용자 모집 예정</p>
    </div>
    <div class="interview-item-divider"/>
    <div class="interview-item-content detail">
      <h2>인터뷰 <span class="strike">{{dDay(interview.interviewDate)}}</span></h2>
      <p>인터뷰 날짜 : {{interview.interviewDate}}</p>
      <p>리워드 : 커피쿠폰 3만원</p>
      <p>인터뷰 장소 : {{interview.location}}</p>
    </div>
    <div class="interview-item-divider"/>
    <div class="interview-item-content update-interview-button" v-on:click="moveToUpdateInterview">인터뷰 수정</div>
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
    methods: {
      dDay(date) {
        moment.updateLocale('en', {
          relativeTime: {
            future: '%s',
            dd: 'D-%d',
          },
        });
        return moment(date).endOf('day').fromNow();
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
    width:800px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }

  .interview-item-content {
    display: inline-block;

    vertical-align: middle;
  }

  .interview-item-content h2 {
    font-size: 15px;
  }

  .interview-item-content p {
    font-size: 10px;
  }

  .interview-item-content.title {
    width:150px;

  }
  .interview-item-content.status {
    width:200px;
  }
  .interview-item-content.detail {
    width:200px;
  }
  .interview-item-content.update-interview-button {
    width:200px;
    height:80px;
  }

  .interview-item-divider {
    display: inline-block;
    background-color: lightgray;
    width: 1px;
    height: 100px;
    vertical-align: middle;
  }

  .strike {
    color: deepskyblue;
  }

</style>
