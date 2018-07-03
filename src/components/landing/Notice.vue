<template>
  <div id="notice" class="ui vertical segment">
    <div class="ui container">
      <p class="notice-title">NOTICE</p>
      <b-table :data="notices"
        paginated per-page="5"
        detailed detail-key="seq" :opened-detailed="openedDetails" :has-detailed-visible="() => false"
        @details-open="(row, index) => $toast.open(`Expanded ${row.title}`)"
        default-sort="seq" default-sort-direction="desc"
        hoverable
        @click="expandRow">

        <template id="notice-row" slot-scope="props">
          <b-table-column class="notice-item-date" field="seq" label="Seq" width="40" numeric sortable>
            {{ props.row.seq }}
          </b-table-column>

          <b-table-column class="notice-item-title" field="title" label="Title">
            {{ props.row.title }}
          </b-table-column>

          <b-table-column class="notice-item-date" field="date" label="Date" sortable centered>
            {{ convertDateFormat(props.row.date) }}
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                  <strong class="notice-item-title">{{ props.row.title }}</strong>
                  <small class="notice-item-date">{{ convertDateFormat(props.row.date) }}</small>
                  <pre class="notice-item-contents">{{ props.row.contents.replace()}}</pre>
              </div>
            </div>
          </article>
        </template>

        <template slot="empty" slot-scope="props">
          <p class="notice-item-title text-align-center">아직 등록된 공지사항이 없습니다 :-)</p>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import HTTP from '../../apis/http-common';

  export default {
    name: 'notice',
    data() {
      return {
        notices: [],
        openedDetails: [],
      };
    },
    created() {
      console.log('created');
      HTTP.get('/notices').then((res) => {
        this.notices = res.data;
        this.openedDetails = [res.data.length];
      });
    },
    methods: {
      expandRow(row) {
        console.log(row);
        this.openedDetails = [row.seq];
      },
      convertDateFormat(date) {
        return moment(date).format('YYYY-MM-DD HH:MM');
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #notice {
    padding-top: 56px;
    border: 0;
  }

  #notice p {
    margin-bottom: 0;
  }

  .notice-title {
    font-family: BMJUAOTF;
    font-size: 27px;
    line-height: 1.74;
    color: #2894b1;
  }

  .notice-item-title {
    margin-top: 23px;
    font-family: NotoSansCJKkr;
    font-size: 16px;
    font-weight: bold;
    color: #808080;
  }

  .notice-item-contents, .notice-item-contents a {
    margin-top: 4px;
    font-family: NotoSansCJKkr-light;
    font-size: 15px;
    font-weight: 300;
    color: #808080;
    text-decoration: none;
  }

  .notice-item-date {
    font-family: NotoSansCJKkr-light;
    font-size: 13px;
    vertical-align: middle;
    color: #808080;
  }

  .notice-item-contents a:hover {
    text-decoration: underline;
  }
</style>
