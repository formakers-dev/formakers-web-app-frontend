<template>
  <div id="preview">
    <myProjectTitle />
    <div class="preview-description">Appbee 앱에서는 다음과 같은 화면이 보여집니다.</div>
    <div>
      <div class="mobile-container text-align-center">
        <img class="project-image" style="margin-bottom: 30px;" v-bind:src="project.image.url" />
        <div style="margin-right: 30px; margin-left: 30px;">
          <div style="color:#00c8ff;"><span v-for="app in interview.apps">'{{app.appName}}' </span>앱 유저에게 추천</div>
          <p class="project-name" style="font-size: 22px; font-weight: bold;">{{project.name}}</p>
          <p class="project-introduce" style="font-size: 18px; color: #808080">{{project.introduce}}</p>
        </div>
        <hr class="divider"/>

        <div>
          <div>
            <div class="project-summary-box border-right">
              <p class="bold-text">인터뷰 종류</p>
              <p class="plain-text">{{interview.type}}</p>
            </div>
            <div class="project-summary-box border-right">
              <p class="bold-text">인터뷰 장소</p>
              <p class="plain-text">{{interview.location}}</p>
            </div>
            <div class="project-summary-box">
              <p class="bold-text">감사 선물</p>
              <p class="plain-text">스벅 쿠폰 3만원</p>
            </div>
          </div>
          <hr class="project-summary-divider" />
          <div>
            <div class="project-summary-box border-right">
              <p class="bold-text">인터뷰 날짜</p>
              <p class="plain-text">{{interview.interviewDate}}</p>
            </div>
            <div class="project-summary-box border-right">
              <p class="bold-text">인터뷰 시간</p>
              <p class="plain-text">약 40분</p>
            </div>
            <div class="project-summary-box">
              <p class="bold-text">신청 마감 날짜</p>
              <p class="plain-text">D-337(하드)</p>
            </div>
          </div>
        </div>
        <hr class="divider"/>
        <div><span class="project-title">&nbsp;&nbsp;&nbsp;저희 프로젝트를 소개합니다&nbsp;&nbsp;&nbsp;</span></div>
        <video v-bind:src="project.videoUrl" style="width: 100%;" controls autoplay/>
        <div style="display:inline-block; overflow-x: scroll; white-space:nowrap;" >
          <img style="height: 300px;" v-for="descriptionImage in project.descriptionImages" v-bind:src="descriptionImage.url"/>
        </div>
        <div class="mobile-subcontainer">{{project.description}}</div>
        <hr class="divider"/>

        <div class="mobile-subcontainer text-align-left">
          <p class="bold-text">인터뷰 안내</p>
          <p class="plain-text">{{interview.introduce}}</p>
        </div>

        <hr class="divider"/>

        <div class="mobile-subcontainer text-align-left">
          <div style="margin-bottom: 20px;">
            <img class="owner-img" v-bind:src="project.owner.image.url" />
            <p class="plain-text">창작자</p>
            <p class="bold-text">{{project.owner.name}}</p>
          </div>
          <p class="plain-text" style="clear:both;">{{project.owner.introduce}}</p>
        </div>

        <hr class="divider"/>

        <div><span class="project-title">유저인터뷰 신청 전 읽어주세요</span></div>
        <div>
          <div style="margin-top: 30px; display: inline-flex">
            <img style="float: left; height: 10px; margin-top: 8px; margin-right: 10px;" src="../assets/check_image.png" />
            <div class="text-align-left">
              <p class="bold-text">인터뷰 신청 후 ‘확정’을 기다려주세요.</p>
              <p class="plain-text">확정된 인터뷰만 실제로 진행됩니 조금만 기다려주세요.</p>
              <p class="plain-text">신청 마감일 이후 앱비에서 확인 후 확정 푸시를 보내드립니다.</p>
            </div>
          </div>
          <div style="margin-top: 30px; display: inline-flex">
            <img style="float: left; height: 10px; margin-top: 8px; margin-right: 10px;" src="../assets/check_image.png" />
            <div class="text-align-left">
              <p class="bold-text">확정 후 취소/ 노쇼 / 지각은 패널티가 있을 수 있습니다.</p>
              <p class="plain-text">인터뷰는 약속입니다. 준비하신 분들께 예의를 지켜주세요.</p>
              <p class="plain-text">( 확정 후 취소 / 노쇼 / 지각 패널티 : 3개월간 신청 불가)</p>
            </div>
          </div>
          <div style="margin-top: 30px; display: inline-flex">
            <img style="float: left; height: 10px; margin-top: 8px; margin-right: 10px;" src="../assets/check_image.png" />
            <div class="text-align-left">
              <p class="bold-text">확정 후 변동 시 인터뷰 담당자에게 꼭 연락주세요.</p>
              <p class="plain-text">피치못할 사정이 생겼을 때 대응할 수 있도록 협조해주세요.</p>
              <p class="plain-text">( 담당자 번호는 인터뷰 신청 후 확정되면 안내됩니다.)</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="button-area">
      <button class="cancel-button" v-on:click="moveToInterview">수정</button>
      <button class="save-button" v-on:click="registerInterview">등록하기</button>
    </div>
  </div>
</template>

<script>
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

    methods: {
      moveToInterview() {
        console.log(this.interview);
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
    font-family: NotoSansCJKkr;
    font-size: 20px;
    text-align: center;
    color: #4a4a4a;
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

  .mobile-subcontainer {
    margin-left: 30px;
    margin-right: 30px
  }

  .text-align-center {
    text-align: center;
  }

  .text-align-left {
    text-align: left;
  }
  .project-image {
    height: 300px;
  }

  .project-summary-box {
    display: inline-block;
    width: 30%
  }
  .bold-text {
    font-size: 16px;
    color: #808080;
  }

  .plain-text {
    font-size: 16px;
    color: #4a4a4a;
  }

  .divider {
    background-color: #ffcd00;
  }

  .project-summary-divider {
    background-color: #f0f0f1;
  }

  .border-right {
    border-right: solid 1px #f0f0f1;
  }

  .project-title {
    border-bottom: 1px solid #000;
    padding-bottom: 4px;
  }

  .owner-img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 30px;
  }

</style>
