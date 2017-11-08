<template>
  <div id="registerProject" class="container">
    <h1>프로젝트 등록</h1>

    <p>프로젝트 이름</p>
    <input v-model="project.name" placeholder=""/>
    <p>한줄 소개</p>
    <input v-model="project.introduce" placeholder=""/>
    <p>대표이미지</p>
    <br/>
    <add-image v-on:update-file-data="onUpdateFileData"></add-image>
    <br/>
    <p>인터뷰 진행자 이름</p>
    <input v-model="project.interviewer.name" placeholder=""/>
    <p>인터뷰 진행자 사진</p>
    <add-image v-on:update-file-data="onUpdateInterviewerImage"></add-image>
    <p>인터뷰 진행자 소개</p>
    <input v-model="project.interviewer.introduce" placeholder=""/>
    <p>프로젝트 소개</p>
    <input v-model="project.description" placeholder=""/>
    <p>인터뷰 타입 선택</p>
    <input v-model="project.interview.type" placeholder=""/>
    <p>인터뷰 장소 선택</p>
    <div class="field">
      <b-checkbox v-model="project.interview.locationNegotiable">협의가능</b-checkbox>
    </div>
    <input v-model="project.interview.location" placeholder=""/>
    <p>인터뷰 모집기간</p>
    <b-field label="모집 시작일">
      <b-datepicker
        icon="today"
        v-model="datePicker.openDate">
      </b-datepicker>
    </b-field>
    <b-field label="모집 종료일">
      <b-datepicker
        icon="today"
        v-model="datePicker.closeDate">
      </b-datepicker>
    </b-field>
    <p>인터뷰 진행기간</p>
    <div class="field">
      <b-checkbox v-model="project.interview.dateNegotiable">인터뷰이가 원하는 날짜로 협의</b-checkbox>
    </div>
    <b-field label="인터뷰 시작일">
      <b-datepicker
        icon="today"
        v-model="datePicker.startDate">
      </b-datepicker>
    </b-field>
    <b-field label="인터뷰 종료일">
      <b-datepicker
        icon="today"
        v-model="datePicker.endDate">
      </b-datepicker>
    </b-field>
    <p>인터뷰 세부일정 입력</p>
    <ul>
      <li v-for="item in plans">
        <input id="interview-minutes" type="number" v-model.number="item.minute"/>
        분
        <input id="interview-plan" type="text" v-model="item.plan"/>
      </li>
    </ul>
    <button class="add-interview-plan-button" v-on:click="addInterviewSchedule">일정 추가</button>
    <br/>
    <p>벤치마킹 앱 검색</p>

    <b-field label="벤치마킹 앱">
      <ul v-for="item in project.apps">
        <li>
          {{ item }}
        </li>
      </ul>
    </b-field>

    <input v-model="similarAppname" placeholder="유사앱 이름을 입력하세요"/>
    <button class='search-button' v-on:click="getSimilarApp">Search</button>
    <ul class='search-result-list' v-for="app in apps">
      <li @click="addSimilarApps(app)">
        {{ app.appName }}
      </li>
    </ul>
    <br/>
    <br/>
    <br/>
    <br/>
    <button class="temporary-save-button" v-on:click="tempRegisterProject">임시저장</button>
    <button class="save-button" v-on:click="registerProject">프로젝트 등록</button>
    <br/>
    <br/>
    <br/>
  </div>
</template>
<script>
import moment from 'moment';
import debounce from 'lodash.debounce';
import HTTP from '../apis/http-common';
import AddImage from './AddImage';

export default {
  name: 'registerProject',
  components: {
    addImage: AddImage,
  },
  data() {
    return {
      project: {
        name: '',
        introduce: '',
        images: [],
        apps: [],
        description: '',
        interview: {
          type: '',
          location: '',
          locationNegotiable: false,
          openDate: '',
          closeDate: '',
          startDate: '',
          endDate: '',
          dateNegotiable: false,
          plans: [{
            minute: 0,
            plan: '',
          }],
        },
        status: '',
        interviewer: {
          name: '',
          url: '',
          introduce: '',
        },
      },
      similarAppname: '',
      apps: [],
      datePicker: {
        openDate: new Date(),
        closeDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
      },
      plans: [{
        minute: 0,
        plan: '',
      }],
      searchStatus: '',
    };
  },
  watch: {
    similarAppname(value) {
      this.searchStatus = '입력중';
      if (value.length > 1) {
        this.debounceGetSimilarApp();
      } else {
        this.apps = [];
      }
    },
  },
  methods: {
    debounceGetSimilarApp: debounce(function () {
      this.searchStatus = '검색중';
      this.getSimilarApp();
    }, 300),
    getSimilarApp() {
      HTTP.get(`/app?keyword=${this.similarAppname}`).then((result) => {
        this.searchStatus = '조회완료';
        this.apps = result.data;
      }).catch((err) => {
        this.searchStatus = err;
      });
    },
    tempRegisterProject() {
      this.project.status = 'temporary';
      HTTP.post('/project', this.project).then(() => {
        this.$router.push('my_page');
      });
    },
    registerProject() {
      this.project.interview.openDate = this.dateFormatter(this.datePicker.openDate);
      this.project.interview.closeDate = this.dateFormatter(this.datePicker.closeDate);
      this.project.interview.startDate = this.dateFormatter(this.datePicker.startDate);
      this.project.interview.endDate = this.dateFormatter(this.datePicker.endDate);
      this.project.status = 'registered';
      this.project.interview.plans = this.plans;

      HTTP.post('/project', this.project).then(() => {
        this.$router.push('my_page');
      });
    },
    onUpdateFileData(fileMetadataList) {
      this.project.images = fileMetadataList;
    },
    onUpdateInterviewerImage(fileMetadata) {
      this.project.interviewer.url = fileMetadata[0].url;
    },
    dateFormatter(date = new Date()) {
      return moment(date).format('YYYY-MM-DD');
    },
    addInterviewSchedule() {
      this.plans.push({
        minute: 0,
        plan: '',
      });
    },
    addSimilarApps(app) {
      this.project.apps.push(app.packageName);
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
