<template>
    <div id="project-item">
      <div id="project-overview">
        <img v-bind:src="project.images[0].url"/><br/>
        {{project.status}}<br/>
        2/5명
      </div>
      <div id="project-description">
        {{project.apps}}<br/>
        모집기간 : {{project.interview.openDate}} ~ {{project.interview.closeDate}} {{dDay}}<br/>
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
  computed: {
    dDay() {
      moment.updateLocale('en', {
        relativeTime: {
          future: '%s',
          dd: 'D-%d',
        },
      });
      return moment(this.project.interview.closeDate, 'YYYY-MM-DD').endOf('day').fromNow();
    },
  },
};
</script>

<style scoped>

</style>
