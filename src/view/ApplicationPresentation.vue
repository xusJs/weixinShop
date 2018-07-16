<template>
  <div class="page">
    <xheader is-left="true" title="申请提现"></xheader>

    <div class="contents">

      <van-cell-group>

        <van-field
          v-model="ApplicationData.userName"
          type="text"
          label="姓名"
          placeholder="输入您的姓名"
          required
        />

        <van-field
          v-model="ApplicationData.cardNumber"
          label="银行卡"
          icon="clear"
          placeholder="输入提现卡号"
          required
          @click-icon="ApplicationData.card = ''"
        />

        <van-field
          v-model="ApplicationData.withdrawalSum"
          type="text"
          label="金额"
          placeholder="请输入提现金额"
          required
        />

      </van-cell-group>
    </div>

    <div class="footer" @click="ApplicationCashFun">
      申请提现
    </div>

  </div>
</template>

<script>

  import xheader from "../components/xheader"

  import {Toast} from "vant"

  export default {
    name: "ApplicationPresentation",
    components: {
      xheader
    },
    data() {
      return {
        ApplicationData: {
          withdrawalSum: "",
          cardNumber: "",
          userName: "",
        }
      }
    },
    methods: {
      ApplicationCashFun() {
        let $self = this
        let reg = /\d{15}|\d{19}/
        if (reg.test($self.ApplicationData.cardNumber)) {
          $self.$store.dispatch("ApplicationCash", this.ApplicationData)
            .then(response => {
              if (response.success) {
                Toast("申请成功！待后台审核")
              } else {
                Toast("申请失败" + response.result)
              }
            })
            .catch(error => {
              Toast("申请错误！" + error)
            })
        } else {
          Toast("请输入正确的银行卡号")
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .contents {
    padding: 50px 0;
  }

  .footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    /*text-justify: auto;*/
    font-size: 16px;
    background: #00aaef;
  }
</style>
