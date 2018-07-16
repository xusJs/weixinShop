<!--
<template>
  <div class="login page">
    <xheader title="登录"></xheader>
    <div class="contents">
      <img src="../img/logo.jpg" alt="">
      <input type="text" v-model="loginFrom.phone" class="xqd-input" placeholder="输入手机号">
      <input type="text" v-model="loginFrom.password" class="xqd-input" placeholder="输入密码" @keyup.enter="_login">
      <button class="xqd-button" @click="_login">登录</button>
      <div class="btn">
        &lt;!&ndash;<mt-button type="primary" @click="$router.push({path:'/register'})">{{$t('currency.register')}}</mt-button>&ndash;&gt;
        <a @click="$router.push({name:'retrieve'})">忘记密码？</a>
        <span></span>
        <a @click="$router.push({name:'register'})">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from "vant"
  import xheader from "../components/xheader"

  export default {
    name: "login",
    components: {
      xheader,
    },
    data() {
      return {
        loginFrom: {
          phone: "",
          password: ""
        }
      }
    },
    methods: {
      _login() {
        let $self = this
        if (this.Trim($self.loginFrom.phone) && this.Trim($self.loginFrom.password)) {
          $self.$store.dispatch('AppLogin', $self.loginFrom).then(response => {
            console.log(response)
            if (response.success) {
              $self.$router.push({name: 'home'})
            } else {
              Toast(response.result)
            }
          })
        } else {
          Toast("内容不能为空")
        }
      },
      Trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },
    },
    beforeDestroy() {

    },
    created() {

      // this.$store.dispatch("Initialization")

      //   if (this.$store.state.login.userId === "" || this.$store.state.login.userId === null) {
      //
      //   } else {
      //     this.$router.push({name: 'Community'})
      //   }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    text-align: center;
    .contents {
      .btn {
        display: flex;
        span {
          flex: 1;
        }
        a {
          padding: 0 5%;
        }
      }
      .xqd-input {
        border: 1px solid #00aaef;
        line-height: 28px;
        font-size: 16px;
        padding: 10px;
        width: 90%;
        margin-bottom: 20px;
      }
      .xqd-button {
        line-height: 28px;
        font-size: 16px;
        padding: 10px;
        width: 90%;
        margin-bottom: 20px;
        background: #00aaef;
        color: #fff;
        text-align: center;
      }
      img {
        width: 300px;
      }
    }
  }


</style>
-->
