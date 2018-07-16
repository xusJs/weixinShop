<template>
  <div class="register page">
    <xheader is-left="true" title="平台账号绑定"></xheader>
    <div class="contents">
      <img src="../img/logo.jpg" alt="">
      <!--<input type="text" class="xqd-input" placeholder="请输入用户名" v-model="registerFrom.username">-->
      <input type="text" class="xqd-input" placeholder="请输入手机号" v-model="registerFrom.phone">
      <!--<span class="xqd-input-button">-->
      <!--<input type="text" placeholder="验证码" v-model="registerFrom.captcha">-->
      <!--<button @click="_addCaptcha">点击获取</button>-->
      <!--</span>-->
      <!--<input type="text" class="xqd-input" placeholder="请输入地址" v-model="registerFrom.address">-->
      <button class="xqd-button" @click="register">绑定</button>
    </div>
  </div>
</template>

<script>
  import {Toast} from "vant"
  import xheader from "../components/xheader"

  export default {
    name: "binding",
    data() {
      return {
        registerFrom: {
          captcha: "",
          username: "",
          phone: "",
          address: ""
        }
      }
    },
    components: {
      xheader
    },
    methods: {
      _addCaptcha() {
        let $self = this
        if ($self.phone === "") {
          Toast("手机号不能为空")
        }
        else {
          $self.$store.dispatch("_addCaptcha", {phone: $self.registerFrom.phone})
            .then((response) => {
              if (response.success) {
                Toast("验证发送成功")
              } else {
                Toast(response.result)
              }
            })
            .catch(error => {
              Toast(error)
            })
        }
      },
      register() {
        let $self = this
        if ($self.registerFrom.phone.length === 0) {
          Toast("长度不能为空")
        }
        else {
          $self.$store.dispatch("_register", $self.registerFrom)
            .then(res => {
              if (res.success) {
                Toast("绑定成功")
                $self.$router.push({name: 'home'})
              } else {
                Toast("绑定失败：" + res.result)
              }
            })
            .catch(error => {
              Toast("绑定错误：" + error)
            })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .register {
    text-align: center;
    .contents {
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
      .xqd-input-button {
        display: flex;
        width: 90%;
        margin-bottom: 20px;
        margin-left: 5%;
        input {
          border: 1px solid #00aaef;
          line-height: 28px;
          font-size: 16px;
          padding: 10px;
          flex: 1;
        }
        button {
          line-height: 28px;
          font-size: 16px;
          padding: 10px;
          width: 100px;
          background: #00aaef;
          color: #fff;
          text-align: center;
        }
      }
    }
  }

</style>
