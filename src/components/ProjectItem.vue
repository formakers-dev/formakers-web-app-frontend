<template>
    <div id="project-item">
      <div class="project-area">
        <img v-bind:src="project.image.url" />
        <div class="project-text-button-area">
          <div class="text-area">
            <p class="project-name">{{project.name}}</p>
            <p class="project-introduce">{{project.introduce}}</p>

          </div>
          <div class="button-area">
            <div class="button update-interview-button" v-on:click="moveToUpdateProject"> 프로젝트 수정 </div>
            <div class="button add-interview-button" v-on:click="moveToInterviewRegister"> 인터뷰 추가 </div>
          </div>
        </div>
      </div>

      <div v-for="interview in project.interviews">
        <interview-item v-bind:interview="interview" v-bind:projectId="project.projectId"/>
      </div>
      <hr/>
    </div>
</template>

<script>
import moment from 'moment';
import InterviewItem from './InterviewItem';

export default {
  name: 'project-item',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  components: {
    InterviewItem,
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
    moveToInterviewRegister() {
      this.$router.push({
        name: 'RegisterInterview',
        params: { projectId: this.project.projectId },
      });
    },
    moveToUpdateProject() {
      this.$router.push({
        name: 'UpdateProject',
        params: { projectId: this.project.projectId },
      });
    },
  },
};
</script>

<style scoped>
#project-item {
  padding-bottom: 50px;
}

img {
  width: 350px;
  height: 200px;
}

.project-area {
  margin-bottom: 30px;
}

.project-text-button-area {
  width:450px;
  display: inline-block;
  vertical-align: top;
  background-color: white;
}
.project-text-button-area .text-area {
  padding-top: 30px;
  padding-bottom: 30px;
  height: 150px;

}
.project-text-button-area .text-area p {
  padding-left: 30px;
  padding-right: 30px;
}
.project-text-button-area .text-area .project-name {
  font-size: 25px;
}
.project-text-button-area .text-area .project-introduce {
  font-size: 20px;
}
.project-text-button-area .button-area {
  height: 50px;
}
.project-text-button-area .button {
  display: inline-block;
  width: 195px;
  height: 50px;
  border: 1px solid gray;
}
</style>
