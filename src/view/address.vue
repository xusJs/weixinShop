<template>
  <div class="page">
    <xheader is-left="true" title="添加地址"></xheader>
    <div class="contents">
      <!--<ul>
        <li>
          <span>收货人</span>
          <input type="text" placeholder="姓名">
        </li>
        <li>
          <span>联系方式</span>
          <input type="tel" placeholder="手机号码">
        </li>
        <li>
          <span>收货地区</span>
          <input type="button" value="- - 请选择 - - ">
        </li>
        <li>
          <span>详细地址</span>
          <input type="text" placeholder="收货详细地址">
        </li>
      </ul>-->

      <!--   <van-cell-group>
           <van-field
             v-model="username"
             label="收货人"
             icon="clear"
             placeholder="姓名"
             required
             @click-icon="username = ''"
           />

           <van-field
             v-model="username"
             label="联系方式"
             icon="clear"
             type="tel"
             placeholder="手机号码"
             required
             @click-icon="username = ''"
           />


           <div data-v-7b4a11c3="" class="van-cell van-cell&#45;&#45;required van-hairline van-field van-field&#45;&#45;has-icon">&lt;!&ndash;&ndash;&gt;
             <div class="van-cell__title"><span>所在地区</span>&lt;!&ndash;&ndash;&gt;</div>
             <div class="">

               <button data-v-7b4a11c3="" class="van-button van-button&#45;&#45;primary van-button&#45;&#45;small">
                 <span class="van-button__text">&#45;&#45;请选择&#45;&#45;</span>
               </button>
             </div>
           </div>

           <van-field
             v-model="username"
             label="详细地址"
             icon="clear"
             placeholder="小区信息/楼层门牌号"
             required
             @click-icon="username = ''"
           />
         </van-cell-group>-->


      <van-address-edit
        :area-list="areaList"
        show-search-result
        :search-result="searchResult"
        @save="onSave"
      />

    </div>
  </div>
</template>

<script>
  import xheader from "../components/xheader"
  import areaList from "../utils/address"

  import {Toast} from "vant"

  export default {
    name: "address",
    components: {
      xheader
    },
    data() {
      return {
        areaList: areaList,
        searchResult: []
      }
    },
    methods: {
      onSave(content) {
        // Toast('save');
        // console.log(content)
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


      },
      onDelete() {
        Toast('delete');
      },
    }
  }
</script>

<style scoped lang="scss">
  .contents {
    padding: 10px;
    ul {
      li {
        display: flex;
        padding: 10px 4px;
        border-bottom: 1px solid #ddd;
        span {
          width: 100px;
          color: #999;
        }
        input {
          flex: 1;
          padding: 4px;
        }
        input[type='button'] {
          color: #00aaef;
        }
      }
    }
  }

  .x_footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: #00aaef;
    font-size: 16px;
    letter-spacing: 3px;
  }
</style>
