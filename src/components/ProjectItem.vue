<template>
    <div id="project-item">
      <div class="project-card-area">
        <div class="project-card-image-area">
          <img v-bind:src="project.image.url" />
        </div>
        <div class="project-description-area">
          <div class="text-area">
            <p class="project-name">{{project.name}}</p>
            <p class="project-introduce">{{project.introduce}}</p>

          </div>
          <div class="button-area">
            <div class="buttons update-interview-button" v-on:click="moveToUpdateProject">
              <img src="../assets/edit_button.png" class="edit-button"/>
              <span>프로젝트 수정</span>
            </div>
            <div class="buttons add-interview-button" v-on:click="moveToInterviewRegister">
              <img src="../assets/add_button.png" class="add-button"/>
              <span>인터뷰 추가</span>
            </div>
          </div>
        </div>
      </div>

      <div class="interview-card-area" v-for="interview in project.interviews">
        <interview-item v-bind:interview="interview" v-bind:projectId="project.projectId"></interview-item>
      </div>

      <hr class="divider"/>

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
  width: 870px;
  margin: 0 auto 30px auto;
  padding-bottom: 30px;
}

.project-card-image-area {
  display: table-cell;
  width: 360px;
  height: 234px;
}

img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.project-card-area {
  border-radius: 2px;
  background-color: #ffffff;
  border: solid 1px #d8d8d8;
  display: table;
  table-layout: fixed;
  font-size: 0;
}

.project-description-area {
  display: table-cell;
  vertical-align: top;
  margin: 0;
  width: 510px;
  height: 233px;
}
.project-description-area .text-area {
  height: 170px;
  padding: 22px 71px 22px 95px;
}

.project-description-area .text-area .project-name {
  font-size: 22px;
  font-weight: 500;
  line-height: 1.59;
  text-align: left;
  color: #4a4a4a;
}
.project-description-area .text-area .project-introduce {
  margin-top: 18px;
  font-size: 20px;
  line-height: 1.5;
  text-align: left;
  color: #4a4a4a;
  white-space: pre;
}

.project-description-area .button-area {
  width: 100%;
  height: 64px;
  margin: 0;
  display: table;
  table-layout: auto;
}

.project-description-area .button-area .buttons {
  display: table-cell;
  width: 50%;
  height: 64px;
  margin: 0;
  vertical-align:middle;
  overflow: hidden;
}

.project-description-area .button-area span {
  font-size: 16px;
  text-align: center;
  color: #4a4a4a;
}

.buttons.update-interview-button {
  border-top: solid 0.5px #d8d8d8;
  border-right: solid 0.5px #d8d8d8;
}
.buttons.add-interview-button {
  border-top: solid 0.5px #d8d8d8;
}

.edit-button {
  width: 26px;
  height: 28px;
  vertical-align: top;
  margin-right: 15px;
}

.add-button {
  width: 30px;
  height: 30px;
  vertical-align: top;
  margin-right: 15px;
}

.interview-card-area {
  margin-top: 30px;
}

.divider {
  margin-top: 50px;
  border: solid 1px #979797;
}
</style>
