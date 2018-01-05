<template>
  <div id="interview-item" v-bind:class="isOpenInterview ? enabledClass : disabledClass">

    <div class="interview-item-content seq-area">
      <p class="seq">
        <span class="strike">{{interview.seq}}</span> 번째<br/>인터뷰
      </p>
    </div>

    <div class="interview-item-divider vertical-center"></div>

    <div class="interview-item-content recruit-area">
      <p class="title">유저 모집
        <span v-if="isOpenInterview">중 (<span class="strike">{{registerCount}}/{{interview.totalCount}}</span>명)</span>
        <span v-else> 종료</span>
      </p>
      <div class="description">
        <div class="recruit-status">
          <percentage-bar v-if="isOpenInterview" v-bind:percentage="percentage"></percentage-bar>
          <p v-else>모집 결과 ({{registerCount}}/{{interview.totalCount}}명)</p>
        </div>
        <p>모집기간 : {{openDate}} ~ {{closeDate}} </p>
        <p><span class="strike">{{interview.apps[0].appName}}</span> 앱 사용자 모집 <span v-if="isOpenInterview">예정</span></p>
      </div>
    </div>

    <div class="interview-item-divider vertical-center"></div>

    <div class="interview-item-content detail-area">
      <p class="title">인터뷰
        <span v-if="isOpenInterview"><span class="strike"> D-{{this.dDay}}</span>일</span>
        <span v-else> 종료</span>
      </p>
      <div class="description">
        <p>인터뷰 날짜 : {{interviewDate}}</p>
        <p>리워드 : 커피쿠폰 3만원</p>
        <p>인터뷰 장소 : {{interview.location}}</p>
      </div>
    </div>

    <div class="interview-item-divider vertical-center"></div>

    <div class="interview-item-content update-button-area vertical-center" v-on:click="moveToUpdateInterview">
      <div v-if="isOpenInterview" class="edit-button-area">
        <img src="../assets/edit_button.png" class="edit-button"/>
        <span>인터뷰 수정</span>
      </div>
      <span v-else class="description">종료된 인터뷰입니다</span>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import PercentageBar from './PercentageBar';

  export default {
    components: {
      PercentageBar,
    },
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
        registeredCount: 0,
        percentage: 0,
        enabledClass: 'enabled',
        disabledClass: 'disabled',
      };
    },
    created() {
      this.interviewDate = moment(this.interview.interviewDate).format('YY-MM-DD');
      this.openDate = moment(this.interview.openDate).format('YY-MM-DD');
      this.closeDate = moment(this.interview.closeDate).format('YY-MM-DD');
      this.dDay = this.getDday();
      if (this.interview.timeSlot) {
        this.registerCount = Object.keys(this.interview.timeSlot).filter(key => this.interview.timeSlot[key] !== '').length;
      }
      this.percentage = this.registerCount / this.interview.totalCount;
    },
    computed: {
      isOpenInterview() {
        return new Date(this.interview.interviewDate).getTime() >= new Date().getTime();
      },
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
  /* TODO : 디자인리뷰 후 margin-top 수정 필요 */

  #interview-item {
    width: 870px;
    height: 159px;
    margin: 0 auto 30px auto;
    border: solid 0.5px #d8d8d8;
  }

  .interview-item-content {
    margin: 0;
    padding: 0;
    vertical-align: top;
  }

  .enabled {
    background-color: #ffffff;
    color: #4a4a4a;
  }

  .disabled {
    background-color: #eeeeee !important;
    color: #9b9b9b !important;
  }

  .enabled .strike {
    color: #4285f4;
  }

  .title {
    font-family: NotoSansCJKkr-Medium;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    margin: 0;
    color: inherit;
  }

  .description {
    margin: 0;
    font-size: 12px;
  }

  .interview-item-content.seq-area {
    margin: 0;
    width: 150px;
    padding-top: 45px;
    display: inline-block;
  }

  .interview-item-content.seq-area .seq {
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
  }

  .interview-item-content.recruit-area {
    margin: 0;
    width: 272px;
    padding-top: 25px;
    padding-left: 40px;
    padding-right: 10px;
    display: inline-block;
    text-align: left;
  }

  .interview-item-content.recruit-area p {
    margin: 0;
  }

  .interview-item-content.recruit-area .description {
    margin-top: 15px;
  }

  .interview-item-content.recruit-area .description p {
    margin-top: 5px;
  }

  .interview-item-content.recruit-area .description .recruit-status {
    margin-bottom: 15px;
  }

  .interview-item-content.detail-area {
    margin: 0;
    width: 262px;
    padding-top: 25px;
    padding-left: 40px;
    padding-right: 30px;
    display: inline-block;
    text-align: left;
  }

  .interview-item-content.detail-area p {
    margin: 0;
  }

  .interview-item-content.detail-area .description {
    margin-top: 30px;
  }

  .interview-item-content.detail-area .description p {
    margin-top: 5px;
  }

  .interview-item-content.update-button-area {
    margin: 0;
    width: 150px;
    display: inline-block;
  }

  .interview-item-divider {
    height: 127px;
    width: 0;
    border: solid 0.5px #d8d8d8;
    display: inline-block;
  }

  .edit-button-area span {
    font-size: 16px;
    line-height: 1.25;
    text-align: center;
    vertical-align: middle;
  }

  .edit-button {
    width: 26px;
    height: 28px;
    vertical-align: top;
    margin-right: 5px;
  }

</style>
