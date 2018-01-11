<template>
  <div id="registerInterview" class="container is-fullhd">
    <section class="section">
      <div class="container container-wrapper">
        <nav class="level">
          <p class="level-item has-text-centered">
            <span class="navigation-circle active"><i class="mdi mdi-check"></i></span>
            <span class="navigation-text">프로젝트 등록</span>
          </p>
          <p class="level-item has-text-centered navigation-line"></p>
          <p class="level-item has-text-centered">
            <span class="navigation-circle active">2</span>
            <span class="navigation-text">인터뷰 모집</span>
          </p>
          <p class="level-item has-text-centered navigation-line"></p>
          <p class="level-item has-text-centered">
            <span class="navigation-circle">3</span>
            <span class="navigation-text">등록완료</span>
          </p>
        </nav>

        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">오프라인 유저 인터뷰</div>
            <div class="column title-description">인터뷰 내용을 확인하고 진행해 주세요.</div>
          </div>
          <div class="columns margin-top-50 margin-bottom-38">
            <div class="column border-right">
              <div class="appbee-guide-image"><img src="../assets/appbee-guide-image1.png"/></div>
              <div class="appbee-guide-name"><u>1:1 인터뷰</u></div>
              <div class="appbee-guide-description">사용자를 1명씩 만나서 40분간<br> 1:1 심층 인터뷰를 진행합니다.</div>
            </div>
            <div class="column border-right">
              <div class="appbee-guide-image"><img src="../assets/appbee-guide-image2.png"/></div>
              <div class="appbee-guide-name"><u>5명의 잠재 고객</u></div>
              <div class="appbee-guide-description"> 총 5명의 잠재 고객을 만납니다.</div>
            </div>
            <div class="column">
              <div class="appbee-guide-image"><img src="../assets/appbee-guide-image3.png"/></div>
              <div class="appbee-guide-name"><u>이벤트가: 무료</u></div>
              <div class="appbee-guide-description">1월까지 이벤트로 무료입니다.</div>
            </div>
          </div>
          <div>
            <p class="appbee-guide-warning">* 앱비는 사용자의 매칭과 모집을 도와드리며, 인터뷰 진행에 직접 참가하지 않습니다.</p>
            <p class="appbee-guide-warning">* 인터뷰 신청자의 취소나 No-Show가 발생할 수 있습니다.</p>
            <p class="appbee-guide-warning">&nbsp;&nbsp;&nbsp;모집 종료 전에 사용자의 취소가 발생하면 모집 기간 내에 다시 모집이 진행됩니다.</p>
            <p class="appbee-guide-warning color-red">* 인터뷰 신청 모집이 시작되기 전까지는 취소가 가능하지만, 그 이후의 취소는 패널티가 발생합니다.</p>
            <p class="appbee-guide-warning">&nbsp;&nbsp;&nbsp;<u>취소 환불 정책 보러가기</u></p>
          </div>
        </div>

        <div class="seperator"></div>
        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">벤치마킹 앱 검색</div>
            <div class="column title-description">프로젝트와 유사한 성격의 앱을 1개 선택하시면 그 유저들에게 프로젝트가 노출됩니다.</div>
          </div>
          <div class="margin-top-50 margin-bottom-50">
            <div v-if="interview.apps.length === 0">
              <div class="app-filter-no-list-text">사용자 모집에 필터로 사용할 앱을 검색하세요</div>
            </div>
            <div v-else>
              <ul v-for="item in interview.apps">
                <li>
                  <div class="app-container margin-side-auto">
                    <div class="app-inner-container">
                      <img class="app-icon-url" v-bind:src="item.iconUrl"/>
                      <div class="app-info">
                        <span class="app-name">{{ item.appName }}</span>
                        <span class="app-developer">{{ item.developer }}</span>
                      </div>
                    </div>
                    <img class="app-remove-button" src="../assets/delete_image.png" v-on:click="removeInterviewTargetApp(item)">
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input input-text" v-model="searchAppName" placeholder="예를들어, 배달에 관련된 앱을 만든다면 '배달의 민족' 앱을 검색해보면 어때요?"/>
              <span class="icon is-medium is-left">
                <i class="mdi mdi-magnify"></i>
              </span>
              <span v-show="searchAppName" class="icon is-medium is-right">
                <i class="mdi mdi-close"></i>
              </span>
            </p>

            <ul class='searched-app-list' v-show="searchedApps.length > 0">
              <li v-for="app in searchedApps" @click="addInterviewTargetApp(app)" class='searched-app'>
                <img class="searched-app-icon" v-bind:src="app.iconUrl"/>
                <div class="searched-app-title">{{ app.appName }}</div>
                <div class="searched-app-developer">{{ app.developer }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="seperator"></div>
        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">인터뷰 장소 선택</div>
            <div class="column title-description">상세 위치와 오는 방법에 대한 안내를 적어주세요</div>
          </div>
          <div class="location-button-group">
            <b-radio class="button" v-model="interview.location"
                     native-value="수원 사업장">
              수원 사업장
            </b-radio>
            <b-radio class="button" v-model="interview.location"
                     native-value="우면 사업장">
              우면 사업장
            </b-radio>
            <b-radio class="button" v-model="interview.location"
                     native-value="서울대 연구소">
              서울대 연구소
            </b-radio>
          </div>
          <input class="input-text" v-model="interview.locationDescription" placeholder=""/>
        </div>
        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">인터뷰 실행 날짜 및 시간</div>
            <div class="column title-description">인터뷰 날짜와 시간을 선택합니다. 인터뷰를 진행할 시간을 5개 선택해 주세요.</div>
          </div>

          <b-datepicker
            class="date-picker"
            icon="calendar-today"
            v-model="datePicker.interviewDate">
          </b-datepicker>
          <div class="timeslot-list">
            <b-checkbox class="button timeslot-checkbox"
                        v-for="timeSlot in timeSlots"
                        v-model="interview.timeSlotTimes"
                        v-bind:native-value="timeSlot"
                        type="is-success">
              {{timeSlot}}:00
            </b-checkbox>
          </div>
        </div>
        <div class="text-align-left">
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">유저 모집 시작일</div>
            <div class="column title-description">인터뷰를 할 유저 모집 시작일을 선택해 주세요. 선택한 날부터 모집이 시작됩니다.</div>
          </div>
          <div>
            <div class="date-picker-area">
              <label class="date-picker-label">모집 시작일</label>
              <b-datepicker
                class="date-picker"
                icon="calendar-today"
                v-model="datePicker.openDate">
              </b-datepicker>
            </div>
            <span>~</span>
            <div class="date-picker-area">
              <label class="date-picker-label">모집 종료일</label>
              <b-datepicker
                class="date-picker"
                icon="calendar-today"
                v-model="datePicker.closeDate">
              </b-datepicker>
            </div>
          </div>
          <p class="title-description text-align-center margin-top-15">* 모집 종료일은 인터뷰 실행 전날로 자동 지정됩니다.</p>
        </div>
        <div class="seperator"></div>
        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">인터뷰 소개</div>
            <div class="column title-description">인터뷰에 대한 소개를 적어주세요. 진행 개요나 인터뷰전에 전할 내용을 적으셔도 됩니다.</div>
          </div>
          <textarea class="input-textarea" v-model="interview.introduce" placeholder=""></textarea>
        </div>
        <div class="seperator"></div>
        <div>
          <div class="columns is-centered title-div">
            <div class="column is-narrow title-name">비상연락처</div>
            <div class="column title-description">비상시에 연락이 가능한 연락처를 적어주세요. 인터뷰에 모집된 사용자들에게만 보여집니다.</div>
          </div>
          <input class="input-text" v-model="interview.emergencyPhone" placeholder=""/>
        </div>

        <div class="button-area">
          <button class="save-button" v-on:click="registerInterview">인터뷰 등록</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import debounce from 'lodash.debounce';
  import moment from 'moment';
  import HTTP from '../apis/http-common';

  export default {
    name: 'registerInterview',
    props: {
      projectId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        interview: {
          type: '오프라인 인터뷰',
          apps: [],
          introduce: '',
          location: '',
          locationDescription: '',
          openDate: moment().format('YYYY-MM-DD'),
          closeDate: moment().format('YYYY-MM-DD'),
          interviewDate: moment().format('YYYY-MM-DD'),
          timeSlotTimes: [],
          emergencyPhone: '',
        },
        // cache
        datePicker: {
          openDate: new Date(),
          closeDate: new Date(),
          interviewDate: new Date(),
        },
        // Search for similar app
        searchAppName: '',
        searchedApps: [],
        searchStatus: '',
        // Time Slots
        timeSlots: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      };
    },
    watch: {
      searchAppName(value) {
        this.searchStatus = '입력중';
        if (value.length > 1) {
          this.debounceSearchApp();
        } else {
          this.searchedApps = [];
        }
      },
    },
    methods: {
      debounceSearchApp: debounce(function () {
        this.searchStatus = '검색중';
        this.searchApp();
      }, 300),
      searchApp() {
        HTTP.get(`/apps?keyword=${this.searchAppName}`).then((result) => {
          this.searchStatus = '조회완료';
          this.searchedApps = result.data;
        }).catch((err) => {
          this.searchStatus = err;
        });
      },
      getTruncatedTimestamp(date) {
        return Number(
          moment(date).hours(0).minutes(0).seconds(0)
            .milliseconds(0)
            .format('x'));
      },
      getEndTimestampOfTheDate(date) {
        return Number(
          moment(date).hours(23).minutes(59).seconds(59)
            .milliseconds(999)
            .format('x'));
      },
      registerInterview() {
        this.interview.openDate = this.getTruncatedTimestamp(this.datePicker.openDate);
        this.interview.closeDate = this.getEndTimestampOfTheDate(this.datePicker.closeDate);
        this.interview.interviewDate = this.getEndTimestampOfTheDate(this.datePicker.interviewDate);

        console.log(this.interview);
        HTTP.post(`/projects/${this.projectId}/interviews`, this.interview)
          .then(() => {
            this.$router.push({ name: 'MyPage' });
          });
      },
      moveToMyPage() {
        this.$router.push({ name: 'MyPage' });
      },
      addInterviewTargetApp(app) {
        this.interview.apps.push({
          packageName: app.packageName,
          appName: app.appName,
          iconUrl: app.iconUrl,
          developer: app.developer,
        });
      },
      removeInterviewTargetApp(app) {
        this.interview.apps = this.interview.apps.filter(item =>
          item.packageName !== app.packageName);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app-container {
    width: 544px;
    height: 112px;
    border-radius: 3px;
    border: solid 2px #4285f4;
    margin-bottom: 15px;
    display: inline-flex;
  }
  .app-inner-container {
    padding: 16px;
    display: inline-flex;
  }
  .app-icon-url {
    width: 80px;
    height: 80px;
    border-radius: 3px;
    margin-left: 4px;
  }

  .app-info {
    margin-left: 25px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: left;
  }
  .app-name {
    font-family: NotoSansCJKkr;
    font-size: 18px;
    color: #4a4a4a;
    display: block;
    min-width: 360px;
  }
  .app-developer {
    min-width: 360px;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    color: #4a4a4a;
  }
  .app-remove-button {
    width: 22px;
    height: 22px;
    margin-top: 15px;
  }
  .container-wrapper {
    max-width: 750px;
    margin-bottom: 100px;
  }

  nav {
    margin-top: 50px;
    padding-bottom: 50px;
  }

  .title-div {
    margin-top: 50px;
    vertical-align: middle;
  }

  .title-name {
    padding-top: 0;
    padding-bottom: 3px;
    margin-right: 26px;
    white-space: nowrap;
    font-family: NotoSansCJKkr;
    line-height: 1.17;
    font-size: 18px;
    text-align: left;
    color: #4a4a4a;
  }

  .title-description {
    padding-top: 0;
    padding-bottom: 0;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    text-align: left;
    color: #979797;
  }

  .input-textarea {
    height: 254px;
  }

  .appbee-guide-image {
    line-height: 98px;
    margin-bottom: 50px;
  }

  .appbee-guide-image img {
    vertical-align: middle;
  }

  .appbee-guide-name {
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: #4a4a4a;
    margin-bottom: 21px;
  }

  .appbee-guide-description {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    text-align: center;
    color: #000000;
  }

  .border-right {
    border-right: solid 0.5px #d4d4d4;
  }

  .margin-top-15 {
    margin-top: 15px;
  }

  .margin-top-50 {
    margin-top: 50px;
  }

  .margin-bottom-38 {
    margin-bottom: 38px;
  }

  .margin-bottom-50 {
    margin-bottom: 50px;
  }

  .text-align-left {
    text-align: left;
  }

  .text-align-center {
    text-align: center;
  }

  .appbee-guide-warning {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    line-height: 2.14;
    text-align: left;
    color: #000000;
  }

  .color-red {
    color: #d0021b;
  }

  .app-filter-no-list-text {
    height: 112px;
    line-height: 112px;
    text-align: center;
    vertical-align: middle;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    color: #979797;
    background: url("../assets/app-filter-background.png") no-repeat center;
  }

  .location-button-group {
    margin-bottom: 15px;
    text-align: left;
  }

  .date-picker-area {
    display: inline-block;
  }

  .date-picker-label {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    color: #000000;
    font-weight: normal;
  }

  .date-picker {
    width: 177px;
    height: 40px;
    border-radius: 2px;
    background-color: #f9f9f9;
  }

  .timeslot-list {
    margin-top: 15px;
    text-align: left;
  }

  .timeslot-list .timeslot-checkbox {
    width: 90px;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 8px;
  }

  input, textarea {
    outline: none;
    background-color: #f9f9f9;
    border: solid 1px #d8d8d8;
  }

  input:focus, textarea:focus {
    background-color: #ffffff;
    border: solid 1px #4285f4;
  }

  .button-area {
    margin-top: 100px;
  }

  .searched-app-list {
    padding-left: 100px;
    padding-top: 25px;
    padding-bottom: 5px;

    box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.5), 0.5px 2px 4px 0 rgba(0, 0, 0, 0.3);
    border-left: solid 1px #4285f4;
    border-right: solid 1px #4285f4;
    border-bottom: solid 1px #4285f4;
  }

  .searched-app {
    margin-bottom: 20px;
    height: 38px;
    text-align: left;
  }

  .searched-app-icon {
    width: 40px;
    height: 38px;
    margin-right: 19px;
    float: left;
  }

  .searched-app-title {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    line-height: 1.43;
    text-align: left;
    color: #4a4a4a;
  }

  .searched-app-developer {
    font-family: NotoSansCJKkr;
    font-size: 11px;
    line-height: 1.55;
    text-align: left;
    color: #4a4a4a;
  }
</style>
