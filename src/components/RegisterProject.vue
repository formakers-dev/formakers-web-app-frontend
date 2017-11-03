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
    <p>벤치 마킹 앱</p>
    <input v-model="project.apps" placeholder=""/>
    <input v-model="project.apps" placeholder=""/>
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
      <b-checkbox v-model="project.interview.location_negotiable">협의가능</b-checkbox>
    </div>
    <input v-model="project.interview.location" placeholder=""/>
    <p>인터뷰 모집기간</p>
    <b-field label="모집 시작일">
      <b-datepicker
        icon="today"
        v-model="date_picker.open_date">
      </b-datepicker>
    </b-field>
    <b-field label="모집 종료일">
      <b-datepicker
        icon="today"
        v-model="date_picker.close_date">
      </b-datepicker>
    </b-field>
    <p>인터뷰 진행기간</p>
    <div class="field">
      <b-checkbox v-model="project.interview.date_negotiable">인터뷰이가 원하는 날짜로 협의</b-checkbox>
    </div>
    <b-field label="인터뷰 시작일">
      <b-datepicker
        icon="today"
        v-model="date_picker.start_date">
      </b-datepicker>
    </b-field>
    <b-field label="인터뷰 종료일">
      <b-datepicker
        icon="today"
        v-model="date_picker.end_date">
      </b-datepicker>
    </b-field>
    <p>인터뷰 세부일정 입력</p>
    <ul>
      <li v-for="(item, index) in plans">
        <input id="interview-minutes" type="number" v-model.number="plans[index].minute"/>
        분
        <input id="interview-plan" type="text" v-model="plans[index].plan"/>
      </li>
    </ul>
    <button class="add-interview-plan-button" v-on:click="addInterviewSchedule">일정 추가</button>
    <br/>
    <button class="temporary-save-button" v-on:click="tempRegisterProject">임시저장</button>
    <button class="save-button" v-on:click="registerProject">프로젝트 등록</button>
    <br/>
    <br/>
    <br/>
    <input v-model="message" placeholder="앱 이름을 입력하세요"/>
    <button v-on:click="searchApps">Search</button>
    <p> {{message}}가 입력됨 </p>
    <p> 전체 사용자 수 {{count}}</p>
    <button v-on:click="sendMessage">Push Push Baby~</button>
    <ul>
      <li v-for="app in apps" v-on:click="">
        {{ app.appName }}
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment';
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
          location_negotiable: false,
          open_date: '',
          close_date: '',
          start_date: '',
          end_date: '',
          date_negotiable: false,
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
      message: '',
      count: 0,
      apps: [],
      date_picker: {
        open_date: new Date(),
        close_date: new Date(),
        start_date: new Date(),
        end_date: new Date(),
      },
      plans: [{
        minute: 0,
        plan: '',
      }],
    };
  },
  created() {
    HTTP.get('/user/count').then((result) => {
      this.count = result.data.count;
    });
  },
  methods: {
    searchApps() {
      HTTP.get(`/app?keyword=${this.message}`).then((result) => {
        this.apps = result.data;
      });
    },
    sendMessage() {
      HTTP.post('/notification').then((result) => {
        console.log(result);
      });
    },
    tempRegisterProject() {
      this.project.status = 'temporary';
      HTTP.post('/project', this.project).then(() => {
        this.$router.push('my_page');
      });
    },
    registerProject() {
      this.project.interview.open_date = this.dateFormatter(this.date_picker.open_date);
      this.project.interview.close_date = this.dateFormatter(this.date_picker.close_date);
      this.project.interview.start_date = this.dateFormatter(this.date_picker.start_date);
      this.project.interview.end_date = this.dateFormatter(this.date_picker.end_date);
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
