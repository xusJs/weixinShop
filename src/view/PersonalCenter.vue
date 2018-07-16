<template>
  <div class="page">
    <xheader title="个人中心"></xheader>
    <div class="contents">
      <div class="Personal_panel">
        <div class="panel_img">
          <img :src="userInfo.headimgurl" alt="">
        </div>
        <div class="center">
          <p>{{userInfo.nickname}}</p>
          <!--<p></p>-->
        </div>
      </div>
      <div class="Personal_order">
        <ul>
          <li v-for="(item,index) in order_list" :key="item+index"
              @click="$router.push({name:'myOrder',params:{isIndex:index}})">
            <div>
              <!--<img :src="item.Img" alt="">-->
              <img src="../img/share.jpg" alt="">
            </div>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="Personal_other">
        <ul class="xlist">
          <li class="xitem" @click="$router.push({name:'MyWallet'})">
            <div>
              <img src="../img/share.jpg" alt="">
            </div>
            <div class="center">
              <span>我的钱包</span>
            </div>
            <div>
              <img src="../img/right_icon.png" alt="">
            </div>
          </li>
          <li class="xitem" @click="$router.push({name:'ReceivingAddress'})">
            <div>
              <img src="../img/share.jpg" alt="">
            </div>
            <div class="center">
              <span>收货地址</span>
            </div>
            <div>
              <img src="../img/right_icon.png" alt="">
            </div>
          </li>
          <li class="xitem" @click="$router.push({name:'TransactionRecord'})">
            <div>
              <img src="../img/share.jpg" alt="">
            </div>
            <div class="center">
              <span>交易记录</span>
            </div>
            <div>
              <img src="../img/right_icon.png" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <xfooter is-active="3"></xfooter>
  </div>
</template>

<script>

  import xheader from "../components/xheader"
  import xfooter from "../components/xfooter"


  export default {
    name: "PersonalCenter",
    components: {
      xheader,
      xfooter
    },
    data() {
      return {
        order_list: [
          {name: "待付款", Img: "../img/share.png", value: 'order'},
          {name: "待发货", Img: "../img/share.png", value: 'order'},
          {name: "待收货", Img: "../img/share.png", value: 'order'},
          {name: "待评价", Img: "../img/share.png", value: 'order'},
          // {name: "退款/售后", Img: "share.jpg", value: 'order'},
          {name: "全部订单", Img: "../img/share.png", value: 'order'},
        ],
        userInfo: {
          headimgurl: "",
          nickname: ""
        },
      }
    },
    methods: {
      userInfoFun() {
        let $self = this
        $self.$store.dispatch('_userInfoFind')
          .then(response => {
            if (response.success) {
              $self.userInfo = response.result
            }
          })
      },
    },
    created() {
      this.userInfoFun()
    }
  }
</script>

<style scoped lang="scss">

  .contents {
    .Personal_panel {
      margin: 10px;
      border-radius: 5px;
      display: flex;
      border: 1px solid #333a;
      align-items: center;
      .panel_img {
        padding: 20px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      .center {
        flex: 1;
        p {
          font-size: 14px;

        }
      }
    }
    .Personal_order {
      background: #eee;
      padding: 10px 0;
      ul {
        display: flex;
        background: #fff;
        padding: 4px 0;
        li {
          flex: 1;
          div {
            text-align: center;
            img {
              width: 28px;
              height: 28px;
            }
          }
          p {
            text-align: center;
          }
        }
      }
    }
  }
</style>
