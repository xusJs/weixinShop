<template>
  <div class="page">
    <xheader is-left="true" title="商品详情"></xheader>
    <div class="contents">
      <div class="page">
        <div class="Details_nav">
          <ul class="Details_list">
            <li><a href="javascript:void(0)" @click="goAnchor('CommodityDetails')">商品</a></li>
            <li><a href="javascript:void(0)" @click="goAnchor('commodity_evaluate')">评价</a></li>
            <li><a href="javascript:void(0)" @click="goAnchor('commodity_introduce')">详情</a></li>
            <!-- <li><a href="#CommodityDetails">商品</a></li>
             <li><a href="#commodity_evaluate">评价</a></li>
             <li><a href="#commodity_introduce">详情</a></li>-->
          </ul>
        </div>
        <div class="contents">
          <div class="swiper" id="CommodityDetails">
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide v-for="(item,index) in ProductObj.pic" :key="item+index">
                <img :src="item" alt="">
              </swiper-slide>
            </swiper>
          </div>

          <div class="CommodityDetails">
            <p class="Commodity_name">{{ProductObj.productName}}</p>
            <p class="Commodity_dis">{{ProductObj.description}}</p>
            <div class="Commodity_pir">
              <span>￥ {{ProductObj.price}}</span>
            </div>
            <div class="Commodity_num">
              <div><b>数量</b></div>
              <div>
                <!-- <span @click="resNum">-</span>
                 <input type="number" placeholder="输入商品数量" v-model="CommodityNum">
                 <span @click="addNum">+</span>-->
                <van-stepper
                  v-model="CommodityNum"
                  integer
                />
              </div>
            </div>
            <!--  <div class="Commodity_address">
                <div><b>送至</b></div>
                <div style="flex: 1">
                  <span>广州省深圳市福田区</span>
                </div>
                <div @click="addressColl=true">
                  .....
                </div>
              </div>-->
          </div>

          <div class="commodity_evaluate" id="commodity_evaluate">
            <div class="title">评价</div>
            <ul v-if="EvaluateList.length">
              <li v-for="(item,index) in EvaluateList" :key="item+index">
                <div class="evaluate_header">
                  <div>{{item.realName}}</div>
                  <div class="center">
                    <van-rate v-model="item.productScore" disabled disabled-color="#ffd21e"/>
                  </div>
                  <div>{{item.createDate/1000 | timeYearFilter}}</div>
                </div>
                <div class="evaluate_content">
                  <div class="title">{{item.content}}</div>
                  <!-- <div class="Img">
                     <img src="../img/swiper1.jpg" alt="">
                   </div>-->
                </div>
              </li>
            </ul>
            <div v-else>
              暂无评价
            </div>
          </div>

          <div class="commodity_introduce" id="commodity_introduce">
            <!--<div class="title">商品介绍</div>
            <div class="introduce_title">
              <img src="../img/swiper4.png" alt="">
              <img src="../img/swiper3.jpg" alt="">
              <img src="../img/swiper2.jpg" alt="">
              <img src="../img/swiper1.jpg" alt="">
            </div>-->
          </div>

        </div>
      </div>
    </div>
    <div class="footer">
      <div @click="PurchaseImmediately">
        立即购买
      </div>
    </div>
    <van-popup v-model="addressColl" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
      />
    </van-popup>
  </div>
</template>

<script>
  import xheader from "../components/xheader"

  import {Toast, Lazyload} from "vant"

  export default {
    name: "CommodityDetails",
    components: {xheader},
    data() {
      return {
        swiperOption: {
          speed: 300,          // 动画速度
          // loop: true,
          effect: "coverflow",
          grabCursor: true,
          setWrapperSize: true,
        },
        CommodityNum: 1,
        addressColl: false,   //地址选择框 控制器
        chosenAddressId: '1',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ],
        ProductObj: {},        //  商品对象
        EvaluateList: [],       // 评论列表
        EvaluateObj: {
          productId: this.$route.params.CID,
          page: "1",
          pageSize: "8"
        },       //   评价查询参数
        EvaluatePageSize: ""            //  评论总数
      }
    },
    methods: {
      onAdd() {
        Toast('新增收货地址');
      },
      onEdit(item, index) {
        Toast('编辑收货地址:' + index);
      },
      goAnchor(selector) {
        // console.log(selector)
        document.querySelector("#" + selector).scrollIntoView(true);
      },
      productFind() {
        let $self = this
        this.$store.dispatch("findProduct", {productId: this.$route.params.CID})
          .then(response => {
            if (response.success) {
              $self.ProductObj = response.result
              // console.log(response.result)
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            Toast(error)
          })

      },
      productEvaluateFun() {
        let $self = this

        $self.$store.dispatch("productEvaluate", $self.EvaluateObj)
          .then(response => {
            if (response.success) {
              $self.EvaluateList = response.result.evaluateList
              $self.EvaluatePageSize = response.result.count
            } else {
              Toast(response.result)
            }
          })

      },

      PurchaseImmediately() {
        this.ProductObj.CommodityNum = this.CommodityNum

        this.$store.commit("SET_ConfirmationOrderList", [this.ProductObj])

        this.$store.commit("SET_total")

        this.$router.push({name: 'ConfirmationOrder'})

      }
    },
    created() {
      this.productFind()
      this.productEvaluateFun()
    }
  }
</script>

<style scoped lang="scss">
  .Details_nav {
    .Details_list {
      display: flex;
      padding: 10px 0;
      border-bottom: 2px solid #efedef;
      li {
        text-align: center;
        flex: 1;
      }
    }
  }

  .swiper {
    img {
      height: 380px;
      width: 100%;
    }
  }

  .CommodityDetails {
    padding: 0 10px;
    .Commodity_name {
      font-size: 18px;
      padding: 8px;
    }
    .Commodity_dis {
      padding: 8px 0;
      font-size: 14px;
      color: red;
    }
    .Commodity_pir {
      span {
        font-size: 18px;
        color: #ef2929;
      }
    }
    .Commodity_num {
      display: flex;
      padding: 8px 0;
      align-items: center;
      div {
        padding: 10px 0;
        b {
          font-weight: 100;
          font-size: 14px;
          color: #999;
          padding-right: 6px;
        }
        span {
          border: 1px solid #999;
          padding: 4px 8px;
          border-radius: 5px;
        }
        input {
          border: 1px solid #999;
          padding: 4px 8px;
          border-radius: 5px;
          width: 60px;
        }
      }
    }
    .Commodity_address {
      display: flex;
      padding: 8px 0;
      align-items: center;
      div {
        padding: 10px 0;
        b {
          font-weight: 100;
          font-size: 14px;
          color: #999;
          padding-right: 6px;
        }
        span {
          border: 1px solid #999;
          padding: 4px 8px;
          border-radius: 5px;
        }
        input {
          border: 1px solid #999;
          padding: 4px 8px;
          border-radius: 5px;
          width: 60px;
        }
      }
    }
  }

  .commodity_evaluate {
    .title {
      padding: 10px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }
    ul {
      li {
        border-bottom: 1px solid #ddd;
        padding-bottom: 8px;
        .evaluate_header {
          display: flex;
          align-items: center;
          div {
            padding: 4px 6px;
          }
          .center {
            flex: 1;
            align-items: center;
            img {
              width: 28px;
              height: 28px;
            }
          }
        }
        .evaluate_content {
          padding: 4px 6px;
          .title {
            font-size: 14px;
            border-bottom: 0;
          }
          .Img {
            img {
              width: 20%;
            }
          }
        }
      }
    }
  }

  .commodity_introduce {
    .title {
      padding: 10px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }
    .introduce_title {
      img {
        width: 100%;
      }
    }
  }

  .footer {
    div {
      height: 40px;
      line-height: 40px;
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
      color: #fff;
      font-size: 16px;
      text-align: center;
    }
  }

</style>
