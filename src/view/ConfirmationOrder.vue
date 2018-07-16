<template>
  <div class="page">
    <xheader is-left="true" title="确认订单"></xheader>
    <div class="contents">
      <div class="page">
        <div class="address_header" v-if="addressList.length" @click="addrshow=true">
          <div class="address_name">
            <span>{{addressList[addressIndex].name}}</span>
            <span>{{addressList[addressIndex].tel}}</span>
          </div>
          <div class="address_detail">
            {{addressList[addressIndex].address}}
          </div>
        </div>
        <div v-else class="address_header">
          <div>
            您还没有设置收货地址
            <a href="javascript:void(0)" @click="$router.push({name:'ReceivingAddress'})">点我去设置的收货地址</a>
          </div>
        </div>
        <div class="contents">
          <div class="box">
            <ul class="Confirmation_list">
              <li class="Confirmation_item"
                  v-for="(item,index) in $store.state.user.ConfirmationOrderList"
                  :key="(item+index)">
                <div class="Confirmation_box">
                  <div class="Confirmation_img">
                    <img :src="item.pic[0]" alt="">
                  </div>
                  <div class="Confirmation_detail">
                    <p class="Confirmation_name">{{ item.productName}}</p>
                    <div class="Confirmation_pir">
                      <div class="pir"><span>￥ {{item.price}}</span></div>
                      <div>
                        <van-stepper integer v-model="item.CommodityNum" @change="changeNum"/>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <van-submit-bar
       :price="total"
       button-text="提交订单"
       @submit="onSubmit"
     />-->
    <div class="footer">
      <div class="footer_box">
        <div class="footer_box_left">
          <span>合计：</span>
          <span class="price">￥{{$store.state.user.orderTotal}}</span>
        </div>
        <div class="footer_box_right">
          <span @click="onSubmit">确认订单</span>
        </div>
      </div>
    </div>
    <van-popup v-model="addrshow"
               position="right"
               class="addrpopup"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        @add="onAdd"
        @select="changeAddr"
        @edit="onEdit"
      />
    </van-popup>


    <van-popup v-model="addAddrShow"
               position="right"
               class="addrpopup"
    >
      <van-address-edit
        :area-list="areaList"
        show-search-result
        :search-result="searchResult"
        @save="onSave"
      />

    </van-popup>

  </div>
</template>

<script>

  import xheader from "../components/xheader"
  import {Toast} from "vant"

  import areaList from "../utils/address"

  export default {
    name: "ConfirmationOrder",
    components: {
      xheader
    },
    data() {
      return {
        ProductNum: "",       //商品数量
        addressList: [],     // 收货地址 列表
        addressIndex: 0,   // 当前地址 索引  默认为第一个
        addrshow: false,     //切换收货地址 控制器
        addAddrShow: false,    // 增加收货地址控制器
        chosenAddressId: "",     //   选择的当前地址ID

        areaList: areaList,      //收货地址 省市区
        searchResult: [],

      }
    },
    methods: {
      onSubmit() {
        // Toast("提交订单")

        let $self = this

        let data = {
          productId: $self.$store.state.user.ConfirmationOrderList[0].id,
          purchaseCount: $self.$store.state.user.ConfirmationOrderList[0].CommodityNum,
          postage: $self.$store.state.user.ConfirmationOrderList[0].postage,
          recvAddrId: $self.addressList[0].id
        }

        $self.$store.dispatch("confirmOrder", data)
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.WeixinJSBridgePlay(response.result)
            } else {
              Toast("提交订单失败：" + response.result)
            }
          })
          .catch(error => {
            Toast("提交订单错误：" + error)
          })

      },                           //确认订单
      WeixinJSBridgePlay(orderNo) {

        let $self = this

        this.$store.dispatch("BridgePay", {orderNo: orderNo})
          .then(response => {
            console.log(response)
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

      },         //微信支付 订单
      onBridgeReady(obj) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', obj,
          function (res) {

            // alert(JSON.stringify(res));

            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // alert(res)
              Toast("支付成功")
            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        );
      },                  //调起微信支付
      addressFind() {
        let $self = this
        $self.$store.dispatch("findAddress")
          .then(response => {
            if (response.success) {
              response.result.forEach(function (res, index) {
                $self.addressList.push(
                  {
                    id: res.id,
                    name: res.userName,
                    tel: res.mobilePhoneNo,
                    address: res.region + "  " + res.address
                  }
                )
              })
            } else {
              Toast("获取收货地址失败：" + response.result)
            }
          })
          .catch(error => {
            Toast("收货地址错误：" + error)
          })
      },                     //获取收货地址

      onAdd() {
        // Toast('新增收货地址');
        this.addAddrShow = true
      },                         //增加地址  控制器
      onEdit(item, index) {
        Toast('编辑收货地址:' + index);
      },            //编辑地址
      onSave(content) {

        let $self = this

        this.$store.dispatch("addAddress", content)
          .then(response => {
            if (response.success) {
              Toast("成功")
              $self.$router.push({name: 'ReceivingAddress'})
            } else {
              Toast("失败：" + response.result)
            }
          })
          .catch(error => {
            Toast("错误：" + error)
          })


      },               // 增加地址
      changeAddr(item, index) {
        // alert(item)
        // alert(index)
        this.addressIndex = index

      },     // 切换地址

      changeNum() {
        // Toast("数值发生改变 ！当前的绑定的数值为：" + this.$store.state.user.ConfirmationOrderList[0].CommodityNum + ",总数为：" + this.total)
        this.$store.commit("SET_total")


      }// 商品数量发生改变
    },
    created() {
      // console.log(this.$store.state.user.ConfirmationOrderList)
      this.addressFind()
    }
  }
</script>

<style scoped lang="scss">
  .address_header {
    border-bottom: 3px solid #ddd;
    padding: 10px;
    .address_name {
      span {
        font-weight: 900;
        font-size: 16px;
        padding: 8px;
      }
    }
    .address_detail {
      padding: 4px;
    }
  }

  .box {
    .Confirmation_list {
      padding: 6px;
      .Confirmation_item {
        padding: 10px 0;
        .Confirmation_box {
          display: flex;
          .Confirmation_img {
            padding: 4px;
            img {
              width: 100px;
              height: 100px;
            }
          }
          .Confirmation_detail {
            padding: 0px 10px;
            flex: 1;
            .Confirmation_name {
              font-weight: 900;
              font-size: 16px;
              padding: 4px;
            }
            .Confirmation_pir {
              display: flex;
              align-items: center;
              margin-top: 10px;
              .pir {
                flex: 1;
                span {
                  color: #ef2929;
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
    }

  }

  .addrpopup {
    width: 100%;
  }

  .footer {
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
    position: fixed;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .footer_box {
      height: 50px;
      display: -ms-flexbox;
      display: flex;
      font-size: 16px;
      -ms-flex-align: center;
      align-items: center;
      background-color: #fff;
      .footer_box_left {
        -ms-flex: 1;
        flex: 1;
        text-align: right;
        color: #666;
        padding-right: 12px;
        span {
        }
        .price {
          color: #ef2929;
        }
      }
      .footer_box_right {
        width: 110px;
        height: 100%;
        border-radius: 0;
        font-size: 16px;
        color: #fff;
        background-color: #f44;
        border: 1px solid #f44;
        text-align: center;
        line-height: 50px;
      }
    }
  }

</style>
