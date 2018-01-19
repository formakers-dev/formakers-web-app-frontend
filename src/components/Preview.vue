<template>
  <div id="preview">
    <my-project-title />
    <div class="r-charcoal-20 preview-description">Appbee 앱에서는 다음과 같은 화면이 보여집니다.</div>
    <div>
      <div class="mobile-container text-align-center">
        <img class="project-image margin-bottom-30" v-bind:src="project.image.url" />
        <div class="margin-left-30 margin-right-30 margin-bottom-38">
          <div class="r-blue-13"><span v-for="app in interview.apps">'{{app.appName}}' </span>앱 유저에게 추천</div>
          <p class="bm-charcoal-24">{{project.name}}</p>
          <p class="project-introduce r-warm-17">{{project.introduce}}</p>
        </div>
        <hr class="divider"/>

        <div>
          <div>
            <div class="interview-summary-box border-right">
              <p class="r-warm-12">인터뷰 종류</p>
              <p class="m-charcoal-13">{{interview.type}}</p>
            </div>
            <div class="interview-summary-box border-right">
              <p class="r-warm-12">인터뷰 장소</p>
              <p class="m-charcoal">{{interview.location}}</p>
            </div>
            <div class="interview-summary-box">
              <p class="r-warm-12">감사 선물</p>
              <p class="m-charcoal">스벅 쿠폰 3만원</p>
            </div>
          </div>
          <hr class="project-summary-divider" />
          <div>
            <div class="interview-summary-box border-right">
              <p class="r-warm-12">인터뷰 날짜</p>
              <p class="m-charcoal">{{interviewDate}}</p>
            </div>
            <div class="interview-summary-box border-right">
              <p class="r-warm-12">인터뷰 시간</p>
              <p class="m-charcoal">약 40분</p>
            </div>
            <div class="interview-summary-box">
              <p class="r-warm-12">신청 마감 날짜</p>
              <p class="m-charcoal">{{dDay}}</p>
            </div>
          </div>
        </div>
        <hr class="divider"/>

        <div class="margin-top-45 margin-bottom-41"><span class="project-title m-charcoal-14">&nbsp;&nbsp;&nbsp;저희 프로젝트를 소개합니다&nbsp;&nbsp;&nbsp;</span></div>

        <youtube v-bind:video-id="videoId" player-width="100%" player-height="240px"></youtube>
        <div class="margin-top-54 margin-bottom-54 description-image-container">
          <img class="description-image" v-for="descriptionImage in project.descriptionImages" v-bind:src="descriptionImage.url"/>
        </div>

        <div class="r-warm-12 margin-bottom-46 white-space-pre-wrap text-align-center mobile-subcontainer">{{project.description}}</div>
        <hr class="divider"/>

        <div class="mobile-subcontainer margin-top-42 margin-bottom-45 text-align-left">
          <p class="m-charcoal-14">인터뷰 안내</p>
          <div class="margin-top-14 r-warm-12 white-space-pre-wrap">{{interview.introduce}}</div>
        </div>

        <hr class="divider"/>

        <div class="mobile-subcontainer margin-top-37 margin-bottom-40 text-align-left">
          <div class="margin-bottom-18">
            <img class="owner-img" v-bind:src="project.owner.image.url" />
            <p class="r-warm-12">창작자</p>
            <p class="m-charcoal-16">{{project.owner.name}}</p>
          </div>
          <p class="r-warm-12 white-space-pre-wrap" style="clear:both;">{{project.owner.introduce}}</p>
        </div>

        <hr class="divider"/>

        <div class="margin-top-36 margin-bottom-26"><span class="project-title m-charcoal-14">유저인터뷰 신청 전 읽어주세요</span></div>
        <div class="mobile-subcontainer interview-stage" style="position: relative;">

          <div class="interview-stage-item">
            <p class="r-blue-11">신청</p>
            <p class="m-warm-10">신청 버튼 클릭</p>
          </div>
          <div class="interview-stage-item">
            <p class="r-blue-11">확정</p>
            <p class="m-warm-10">신청 마감/확정</p>
          </div>
          <div class="interview-stage-item">
            <p class="r-blue-11">완료</p>
            <p class="m-warm-10">인터뷰 진행완료</p>
          </div>
          <div class="interview-stage-divider right-100"></div>
          <div class="interview-stage-divider left-100"></div>
        </div>
        <div class="mobile-subcontainer">
          <div class="interview-prepare">
            <img class="check-image" src="../assets/check_image.png" />
            <div class="text-align-left width-100-percentage">
              <p class="m-charcoal-13">인터뷰 신청 후 ‘확정’을 기다려주세요.</p>
              <p class="r-warm-11">확정된 인터뷰만 실제로 진행됩니 조금만 기다려주세요.</p>
              <p class="r-warm-11">신청 마감일 이후 앱비에서 확인 후 확정 푸시를 보내드립니다.</p>
            </div>
          </div>
          <div class="interview-prepare">
            <img class="check-image" src="../assets/check_image.png" />
            <div class="text-align-left width-100-percentage">
              <p class="m-charcoal-13">확정 후 취소/ 노쇼 / 지각은 패널티가 있을 수 있습니다.</p>
              <p class="r-warm-11">인터뷰는 약속입니다. 준비하신 분들께 예의를 지켜주세요.</p>
              <p class="r-warm-11">( 확정 후 취소 / 노쇼 / 지각 패널티 : 3개월간 신청 불가)</p>
            </div>
          </div>
          <div class="interview-prepare">
            <img class="check-image" src="../assets/check_image.png" />
            <div class="text-align-left width-100-percentage">
              <p class="m-charcoal-13">확정 후 변동 시 인터뷰 담당자에게 꼭 연락주세요.</p>
              <p class="r-warm-11">피치못할 사정이 생겼을 때 대응할 수 있도록 협조해주세요.</p>
              <p class="r-warm-11">( 담당자 번호는 인터뷰 신청 후 확정되면 안내됩니다.)</p>
            </div>
          </div>
        </div>
        <button class="mobile-button bm-charcoal-26">유저 인터뷰 신청하기</button>
      </div>
    </div>


    <div class="button-area">
      <button class="cancel-button" v-on:click="moveToInterview">수정</button>
      <button class="save-button" v-on:click="registerInterview">등록하기</button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { getIdFromURL } from 'vue-youtube-embed';
  import HTTP from '../apis/http-common';
  import MyProjectTitle from './MyProjectTitle';

  export default {
    name: 'preview',
    components: { MyProjectTitle },
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
        project: {},
      };
    },
    created() {
      HTTP.get(`/projects/${this.projectId}`).then((result) => {
        this.project = result.data;
      }).catch(err => console.error(err));
    },
    computed: {
      interviewDate() {
        const day = moment(this.interview.interviewDate).day();
        let result = moment(this.interview.interviewDate).format('MM/DD(');
        switch (day) {
          case 1:
            result += '월)';
            break;
          case 2:
            result += '화)';
            break;
          case 3:
            result += '수)';
            break;
          case 4:
            result += '목)';
            break;
          case 5:
            result += '금)';
            break;
          case 6:
            result += '토)';
            break;
          default:
            result += '일)';
        }
        return result;
      },
      dDay() {
        moment.updateLocale('en', {
          relativeTime: {
            future: '%s',
            dd: 'D-%d',
          },
        });
        return moment(this.interview.closeDate).endOf('day').fromNow();
      },
      videoId() {
        return getIdFromURL(this.project.videoUrl);
      },
    },
    methods: {
      moveToInterview() {
        this.$router.push({
          name: 'RegisterInterview',
          params: {
            projectId: this.projectId,
            interviewData: this.interview,
          },
        });
      },
      registerInterview() {
        HTTP.post(`/projects/${this.projectId}/interviews`, this.interview)
          .then(() => {
            this.$router.push({ name: 'MyPage' });
          });
      },
    },
  };
</script>

<style scoped>
  .preview-description {
    text-align: center;
    margin-top: 88px;
    margin-bottom: 88px;
  }
  .button-area {
    margin-top: 155px;
    margin-bottom: 155px;
  }

  .mobile-container {
    overflow:auto;
    width: 464px;
    height: 900px;
    border: solid 1px #eee;
    margin: auto;
  }
  hr {
    margin: 15px 0;
  }
  .divider {
    background-color: #ffcd00;
  }
  .project-summary-divider {
    background-color: #f0f0f1;
  }

  /* mobile preview */
  .project-image {
    height: 220px;
  }
  .project-title {
    border-bottom: 1px solid #4a4a4a;
    padding-bottom: 3px;
  }
  .interview-summary-box {
    display: inline-block;
    width: 30%
  }
  .mobile-subcontainer {
    margin-left: 20px;
    margin-right: 20px;
  }

  .interview-stage {
    background: url('../assets/bg_line.png') no-repeat center;
    background-size: 100% 62px;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .interview-stage-divider {
    width: 80px;
    border-bottom:1px solid #00c8ff;
    position: absolute;
    top: 22px;
    right:100px;
  }

  .interview-stage-item {
    display: inline-block;
    width: 30%;
  }

  .left-100 {
    left: 100px;
  }
  .right-100 {
    right: 100px;
  }

  .width-100-percentage {
    width: 100%;
  }

  .text-align-center {
    text-align: center;
  }

  .text-align-left {
    text-align: left;
  }

  .border-right {
    border-right: solid 1px #f0f0f1;
  }

  .owner-img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    float: left;
    margin-right: 12px;
  }

  .mobile-button {
    height: 70px;
    width: 100%;
    background-color: #ffcd00;
    border: none;
    margin-top: 50px;
  }
  img {
    object-fit: cover;
  }

  .description-image-container {
    display:inline-block;
    overflow-x: auto;
    white-space:nowrap;
  }

  .description-image {
    height: 270px;
    margin-right: 9px;
    border: solid 1px #d4d4d4
  }

  .check-image {
    float: left;
    height: 10px;
    margin-top: 8px;
    margin-right: 10px;
  }

  .interview-prepare {
    margin-top: 30px;
    display: inline-flex;
    width: 100%;
  }

  .white-space-pre-wrap {
    white-space: pre-wrap;
  }

  .bm-charcoal-24 {
    color: #4a4a4a;
    font-size: 24px;
    font-family: BMJUAOTF;
  }

  .bm-charcoal-26 {
    color: #4a4a4a;
    font-size: 26px;
    font-family: BMJUAOTF;
  }
  .r-blue-11 {
    color: #00c8ff;
    font-size: 11px;
    font-family: NotoSansCJKkr-Regular;
  }
  .r-blue-13 {
    color: #00c8ff;
    font-size: 13px;
    font-family: NotoSansCJKkr-Regular;
  }
  .r-charcoal-20 {
    color: #4a4a4a;
    font-size: 20px;
    font-family: NotoSansCJKkr-Regular;
  }
  .m-charcoal-13 {
    color: #4a4a4a;
    font-size: 13px;
    font-family: NotoSansCJKkr-Medium;
  }
  .m-charcoal-14 {
    color: #4a4a4a;
    font-size: 14px;
    font-family: NotoSansCJKkr-Medium;
  }

  .m-charcoal-16 {
    color: #4a4a4a;
    font-size: 16px;
    font-family: NotoSansCJKkr-Medium;
  }
  .r-warm-11 {
    color: #808080;
    font-size: 11px;
    font-family: NotoSansCJKkr-Regular;
  }
  .r-warm-12 {
    color: #808080;
    font-size: 12px;
    font-family: NotoSansCJKkr-Regular;
  }
  .r-warm-12 {
    color: #808080;
    font-size: 12px;
    font-family: NotoSansCJKkr-Regular;
  }

  .m-warm-10 {
    color: #808080;
    font-size: 10px;
    font-family: NotoSansCJKkr-Medium;
  }


</style>
