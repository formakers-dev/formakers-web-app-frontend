<template>
  <div id="percentage-bar">
    <div class="percentage-bar-graph">
      <div class="total-bar"></div>
      <div class="filled-bar" v-bind:style="[styleObject]"></div>
    </div>
    <p>{{Math.round(this.percentage * 100)}}% </p>
  </div>

</template>

<script>
  export default {
    name: 'percentage-bar',
    props: {
      percentage: {
        type: Number,
        required: true,
      },
    },
    created() {
      this.styleObject.width = `${172 * this.percentage}px`;
    },
    data() {
      return {
        styleObject: {
          width: '0',
        },
      };
    },
  };
</script>

<style scoped>
  #percentage-bar {
    margin: 5px 0;
  }

  .percentage-bar-graph {
    width: 172px;
    height: 13px;
    display: inline-block;
  }

  .total-bar {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background-color: #d8d8d8;
  }

  .filled-bar {
    height: 100%;
    margin-top: -13px;
    border-radius: 3px;
    background-color: #4a90e2;
  }

  #percentage-bar p {
    margin-left: 5px;
    display: inline-block;
  }

</style>
