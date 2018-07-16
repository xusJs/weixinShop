<template>
  <div class="page">
    <xheader title="首页"></xheader>
    <div class="contents">
      <div class="search" @click="$router.push({path:'/ProductList/null'})">
        <!--<div class="search" @click="$router.push({name:'ProductList',params:{cid:null}})">-->
        <input type="text" placeholder="输入想要查询的关键字">
        <span>搜索</span>
      </div>
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(i,o) in bannerDataList" :key="i+o">
          <img :src="i" alt="">
        </swiper-slide>
      </swiper>
      <div class="box">
        <hr/>
        <div class="title">
          热卖单品
        </div>
        <ul>
          <li v-for="(item,index) in productList" :key="item+index"
              @click="$router.push({name:'CommodityDetails',params:{CID:item.id}})">
            <div class="component">
              <img :src="item.pic[0]" alt="" v-lazy="item.pic[0]">
              <div>
                <span>{{item.productName}}</span>
                <b>￥ {{item.price}}</b>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <xfooter is-active="1"></xfooter>
  </div>
</template>

<script>

  import xheader from "../components/xheader"
  import xfooter from "../components/xfooter"
  import {Toast, Lazyload} from "vant"

  import img1 from "../img/banner.jpg"
  import img2 from "../img/banner2.jpg"
  import img3 from "../img/banner3.jpg"


  export default {
    name: "home",
    components: {
      xheader,
      xfooter
    },
    data() {
      return {
        swiperOption: {
          speed: 300,          // 动画速度
          autoplay: {
            delay: 3000
          },
          loop: true,
          effect: "coverflow",
          grabCursor: true,
          setWrapperSize: true,
        },
        productList: [],
        productOther: {
          count: "",
          countpage: ""
        },
        bannerDataList: [img3, img1, img2]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      //  首页商品
      homeProduct() {
        let $self = this
        this.$store.dispatch("_homeProduct", {page: '1', pageSize: '20'})
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.productList = response.result.productList
              $self.productOther.count = response.result.count
              $self.productOther.countpage = response.result.countPage
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            Toast(error)
          })
      }
    },
    created() {
      this.homeProduct()
    }
  }
</script>

<style scoped lang="scss">
  .contents {
    .search {
      border-bottom: 1px solid #333;
      padding: 10px 8px;
      display: flex;
      input {
        flex: 1;
        border: 1px solid #999;
        padding: 6px 8px;
        border-radius: 5px;
        margin-right: 10px;
      }
      span {
        /*border: 1px solid #999;*/
        padding: 6px 8px;
        border-radius: 5px;
        color: #fff;
        background: #00aaef;
      }
    }
    img {
      /*  position: relative;
        !*top: 50%;*!
        left: 50%;
        transform: translate(-50%, 0);
        height: 140px;*/
      width: 100%;
      height: 140px;
    }
    .box {
      background: #efefef;
      .title {
        margin: 10px 8px;
        padding-left: 10px;
        border-left: 3px solid #ef2929;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        li {
          flex: 0 0 50%;
          padding-left: 4px;
          padding-right: 5px;
          background: #fff;
          .component {
            div {
              padding: 9px 0;
              span {
                font-size: 13px;
                padding: 4px 8px;
                color: #333;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2; /** 显示的行数 **/
                overflow: hidden; /** 隐藏超出的内容 **/
              }
              b {
                padding: 0 8px;
                font-size: 16px;
                color: #FE2929;
              }
            }
          }
        }
      }
    }
  }
</style>
