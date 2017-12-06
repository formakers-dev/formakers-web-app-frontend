<template>
  <div id="registerInterview" class="container">
    <h1>
      프로젝트 등록이 완료되었습니다.
      <br/>
      심층인터뷰를 신청해서 미래의 사용자를 만나보세요.
    </h1>
    <br/>
    <div>
      미래의 고객이 될 진짜 사용자를 만나보세요. <br/>
      솔직한 피드백은 프로젝트를 성공시키는 지름길입니다. <br/>
      (인터뷰 신청은 선택 옵션입니다.)
    </div>
    <br/>
    <button class="skip-button" v-on:click="moveToMyPage">다음에 하겠습니다.</button>
    <br/>
    <br/>
    <hr/>
    <div>
      <p>인터뷰 타입 선택</p>
      <p>원하는 인터뷰 종류를 선택해 주세요</p>
    </div>

    <div>
      <input type="radio" id="offline" value="오프라인 인터뷰" v-model="interview.type"/>
      <label for="offline">오프라인 인터뷰</label>
    </div>
    <div>
      <input type="radio" id="online" value="온라인 인터뷰" v-model="interview.type"/>
      <label for="online">온라인 인터뷰</label>
    </div>

    <p>인터뷰 소개</p>
    <textarea v-model="interview.introduce" placeholder=""></textarea>

    <br/>
    <p>인터뷰 장소 선택</p>
    <b-field>
      <b-radio-button v-model="interview.location" native-value="수원 사업장">
        수원 사업장
      </b-radio-button>
      <b-radio-button v-model="interview.location" native-value="우면 사업장">
        우면 사업장
      </b-radio-button>
      <b-radio-button v-model="interview.location" native-value="서울대 연구소">
        서울대 연구소
      </b-radio-button>
    </b-field>
    <input v-model="interview.locationDescription" placeholder=""/>

    <br/>

    <p>인터뷰 모집기간</p>
    <p>모집 시작일과 종료일을 선택하세요.</p>
    <b-field label="시작일">
      <b-datepicker
        icon="today"
        v-model="datePicker.openDate">
      </b-datepicker>
    </b-field>
    <b-field label="종료일">
      <b-datepicker
        icon="today"
        v-model="datePicker.closeDate">
      </b-datepicker>
    </b-field>
    <br/>
    <p>인터뷰 진행날짜</p>
    <p>인터뷰를 진행할 날짜와 시간을 선택하세요. 진행 시간은 5개 이상을 선택하셔야 합니다.</p>
    <b-field label="인터뷰 시작일">
      <b-datepicker
        icon="today"
        v-model="datePicker.interviewDate">
      </b-datepicker>
    </b-field>
    <b-field>
      <b-checkbox-button v-for="timeSlot in timeSlots"
                         v-model="interview.timeSlotTimes"
                         v-bind:native-value="timeSlot"
                         type="is-success">
        <b-icon icon="check"></b-icon>
        <span>{{timeSlot}}:00</span>
      </b-checkbox-button>
    </b-field>
    <br/>
    <br/>
    <br/>
    <p>벤치마킹 앱 검색</p>

    <b-field label="벤치마킹 앱">
      <ul v-for="item in interview.apps">
        <li>
          {{ item }}
        </li>
      </ul>
    </b-field>

    <input v-model="searchAppName" placeholder="유사앱 이름을 입력하세요"/>
    <button class='search-button' v-on:click="searchApp">Search</button>
    <ul class='search-result-list' v-for="app in searchedApps">
      <li @click="addInterviewTargetApp(app)">
        {{ app.appName }}
      </li>
    </ul>
    <br/>
    <br/>

    <p>비상연락처</p>
    <p>비상시에 연락이 가능한 연락처를 적어주세요. 인터뷰에 모집된 사용자들에게만 보여집니다.</p>
    <input v-model="interview.emergencyPhone" placeholder=""/>

    <br/>
    <br/>
    <button class="save-button" v-on:click="registerInterview">등록하기</button>
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
        timeSlots: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
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

        HTTP.post(`/projects/${this.projectId}/interviews`, this.interview).then(() => {
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
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }
</style>
