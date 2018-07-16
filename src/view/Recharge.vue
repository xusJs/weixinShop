<template>
  <div class="page">
    <xheader is-left="true" title="充值"></xheader>

    <div class="contents">
      <div class="Recharge_top"></div>
      <div class="Recharge_center">
        <ul>
          <li v-for="(item,index) in RechargeNumList" :key="index+item" :class="{ active : index===isActive}"
              @click="changeRechargeNum(item,index)">
            <div>
              ￥{{item.Num}}
            </div>
          </li>
        </ul>
        <div class="RechargeNum">
          <label for="RechargeNum">
            充值金额
            <input type="number" id="RechargeNum" placeholder="充值金额" v-model="RechargeNum">
          </label>
        </div>
      </div>
      <div class="Recharge_bottom">
        <!-- <mt-radio
           title="支付方式"
           v-model="RechargeMode"
           :options="RechargeModeList">
         </mt-radio>-->
        <h4>支付方式</h4>

        <van-radio-group v-model="RechargeMode">
          <van-radio name="1">微信支付</van-radio>
        </van-radio-group>


      </div>
    </div>

    <div class="footer">
      <div class="footer_btn" @click="_Recharge">
        充值
      </div>
    </div>


  </div>
</template>

<script>
  import xheader from "../components/xheader"
  import {Toast} from "vant"

  export default {
    name: "Recharge",
    data() {
      return {
        RechargeNumList: [
          {Num: 100},
          {Num: 200},
          {Num: 500},
          {Num: 1000},
          {Num: 2000},
          {Num: 5000},
        ],
        isActive: -1,
        RechargeNum: "",
        RechargeMode: "1",        // 支付方式选择
        RechargeModeList: [
          /* {
             label: '被禁用',
             value: '值F',
             disabled: true
           },*/
          {
            label: '微信',
            value: '1'
          },
        ]
      }
    },
    methods: {
      changeRechargeNum(item, index) {
        this.isActive = index
        this.RechargeNum = item.Num
      },
      //  付款
      _Recharge() {

        let $self = this
        this.$store.dispatch("WXRecharge", {rechargeSum: $self.RechargeNum})
          .then(response => {
            if (response.success) {
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', $self.onBridgeReady(response.result), false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', $self.onBridgeReady(response.result));
                  document.attachEvent('onWeixinJSBridgeReady', $self.onBridgeReady(response.result));
                }
              } else {
                $self.onBridgeReady(response.result);
              }
            } else {
              Toast("支付失败：" + response.result)
            }
          })
          .catch(error => {
            Toast("支付错误：" + error)
          })


        /*   this.$store.dispatch("TestPay", {orderNo: orderNo})
             .then(response => {
               console.log(response)
               // if (response.success) {
               if (typeof WeixinJSBridge == "undefined") {
                 if (document.addEventListener) {
                   document.addEventListener('WeixinJSBridgeReady', $self.onBridgeReady(response.result), false);
                 } else if (document.attachEvent) {
                   document.attachEvent('WeixinJSBridgeReady', $self.onBridgeReady(response.result));
                   document.attachEvent('onWeixinJSBridgeReady', $self.onBridgeReady(response.result));
                 }
               } else {
                 $self.onBridgeReady(response.result);
               }
               // } else {
               //   Toast("支付失败：" + response.result)
               // }
             })
             .catch(error => {
               Toast("支付错误：" + error)
             })
   */

      },
      onBridgeReady(obj) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', obj,
          function (res) {
            // alert(JSON.stringify(res));
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // alert(res)
              Toast("充值成功")

            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        );
      },
    },
    components: {
      xheader
    }
  }
</script>

<style scoped lang="scss">
  .contents {
    .Recharge_top {
    }
    .Recharge_center {
      ul {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        margin: 20px auto;
        li {
          flex: 0 0 33.33%;
          /*padding: 10px 0;*/
          div {
            margin: 10px;
            padding: 6px 0;
            border: 1px solid #333;
          }
        }

        .active {
          div {
            border: 1px solid #fe2929;
            color: #fe2929;
          }
        }
      }
      .RechargeNum {
        padding: 10px;
        label {
          font-size: 16px;
        }
        input {
          font-size: 14px;
          /*border-bottom: 1px solid #00aaee;*/
          padding: 4px 10px;
        }
      }
    }
    .Recharge_bottom {
      padding: 6px;
      h4 {
        padding: 4px;
        font-size: 12px;
        color: #999;
      }
    }
  }

  .footer_btn {
    font-size: 16px;
    text-align: center;
    background: #00aaee;
    color: #fff;
    height: 43px;
    line-height: 43px;
  }
</style>
