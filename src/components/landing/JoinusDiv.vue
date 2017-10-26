<template>
  <div id="joinusDiv" class="ui vertical segment">
    <div class="ui container">
      <p class="joinus-title">핸드폰 속의 진짜 당신의 모습이 궁금하다면?<br/>혹은 앱비가 만들어지는 과정이 궁금하다면?</p>
      <p class="joinus-description">앱으로 당신을, 사람을 알아가는 앱비의 뉴스레터를 받아보세요.</p>
      <input type="hidden" name="action"/>
      <input type="hidden" name="list"/>
      <div class="ui joinus-email-component" v-bind:class="{active: isActive}">
        <input v-model="newEmail.email" type="text" name="email_address" data-validate="email"
               placeholder="여기에 이메일 입력! 앱으로 나도 알고 너도 알고, 앱비가 만들어지는 과정을 보세요." v-bind:class="{warningInput: isWarn}"/>
        <button class="ui secondary submit button huge" v-on:click="addEmail" type="submit" value="Subscribe"/>
        <div class="ui warning" v-bind:class="{active: isWarn}">
          <p class="warning-msg">* 이메일 주소를 확인해 주세요.</p>
        </div>
      </div>
      <div class="ui joinus-email-component" v-bind:class="{active: !isActive}">
        <p class="success">
          <img class="success-img" src="static/image/success.png"/>
          <span class="success-text">
            뉴스레터 신청 성공! 앞으로 재미있는 소식 보내드릴게요.
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '../../apis/http-common';

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: 'joinusDiv',
  data() {
    return {
      newEmail: {
        email: '',
      },
      isWarn: false,
      isActive: true,
    };
  },
  computed: {
    validation() {
      return {
        email: emailReg.test(this.newEmail.email),
      };
    },
    isValid() {
      const validation = this.validation;
      return Object.keys(validation).every(key => validation[key]);
    },
  },
  methods: {
    addEmail() {
      if (this.isValid) {
        this.isWarn = false;
        HTTP.post('/email', {
          email: this.newEmail.email,
          isActive: true,
        }).then((res) => {
          this.isActive = !this.isActive;
          console.log(res);
        }).catch((err) => {
          console.error(err);
        });
      } else {
        this.isWarn = true;
      }
      this.newEmail.email = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #joinusDiv {
    height: 436px;
    padding-top: 106px;
    background-color: #ffffff;
    border: 0;
  }

  #joinusDiv input {
    vertical-align: top;
    width: 514px;
    height: 50px;
    border-radius: 0;
    padding-left: 20px;
    padding-right: 20px;
    color: #4a4a4a;
    background-color: #ffffff;
    border: solid 1px #979797;
  }

  #joinusDiv button {
    vertical-align: top;
    margin-left: 14px;
    width: 202px;
    height: 50px;
    border-radius: 0;
    background: #ffba00 url('../../../static/image/signup.png');
    background-size: 100%;
  }

  .joinus-title {
    height: 82px;
    margin-bottom: 0px;
    font-family: BMJUAOTF;
    font-size: 34px;
    line-height: 1.21;
    color: #4a4a4a;
  }

  .joinus-description {
    margin-top: 8px;
    margin-bottom: 0px;
    font-family: NotoSansCJKkr;
    font-size: 17px;
    font-weight: 300;
    text-align: center;
    color: #808080;
  }

  .joinus-email-component {
    margin-top: 56px;
    display: none;
  }

  .joinus-email-component input::-webkit-input-placeholder {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    font-weight: 300;
    color: rgba(155, 155, 155, 0.7);
  }

  @media only screen and (max-width: 600px) {
    #joinusDiv input {
      width: 100%;
    }

    #joinusDiv button {
      margin-top: 0.5em;
    }
  }

  .warning {
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    color: #d0011b;
    width: 730px;
    display: none;
  }
  .warning-msg {
    margin-left: 14px;
  }
  .success-img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .success-text {
    margin-left: 10px;
    font-size: 24px;
    vertical-align: middle;
    font-family: BMJUAOTF;
    color: #2894b1;
  }
  .active {
    display: block;
  }
  #joinusDiv input.warningInput {
    border: solid 1px #d0011b;
  }
</style>
