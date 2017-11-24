<template>
    <div id="project-item">
      <div>
        {{project.name}}<br/>
        {{project.introduce}}<br/>
        <img v-bind:src="project.images[0].url"/>
        <button class="add-interview-button" v-on:click="moveToInterviewRegister"> 인터뷰 등록 </button>
      </div>
      <div v-for="interview in project.interviews">
        <p>{{interview.apps}}</p>
        모집기간 : {{interview.openDate}} ~ {{interview.closeDate}} (D-{{dDay(interview.interviewDate)}})<br/>
      </div>
      <hr/>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'project-item',
  props: {
    project: {
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
    moveToInterviewRegister() {
      this.$router.push({
        name: 'RegisterInterview',
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
  width: 320px
}
</style>
