<template>
    <div id="project-item">
      <div id="project-overview">
        <img v-bind:src="project.images[0].url"/><br/>
        {{project.status}}<br/>
        2/5명
      </div>
      <div id="project-description">
        {{project.apps}}<br/>
        모집기간 : {{project.interview.open_date}} ~ {{project.interview.close_date}} {{dDay}}<br/>
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
    project: Object,
  },
  computed: {
    dDay() {
      moment.updateLocale('en', {
        relativeTime: {
          future: '%s',
          dd: 'D-%d',
        },
      });
      return moment(this.project.interview.close_date, 'YYYYMMDD').endOf('day').fromNow();
    },
  },
};
</script>

<style scoped>

</style>
