<template>
    <div id="project-item">
      <div id="project-overview">
        <img v-bind:src="project.images[0].url"/><br/>
        {{project.status}}<br/>
        2/5명
      </div>
      <div id="project-description" v-for="interview in project.interviews">
        <p>{{interview.apps}}</p>
        모집기간 : {{interview.openDate}} ~ {{interview.closeDate}} {{dDay(interview.closeDate)}}<br/>
        {{project.introduce}}<br/>
        {{project.name}}
      </div>
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
  },
};
</script>

<style scoped>

</style>
