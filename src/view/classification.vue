<template>
  <div class="page">
    <xheader title="分类"></xheader>
    <div class="contents">
      <div class="box" v-if="classificationList.length">
        <div class="box_left">
          <ul>
            <li
              v-for="(item,index) in classificationList"
              :key="item+index"
              :class="{active:index === classIndex}"
              @click="classIndex = index"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="box_right">
          <ul>
            <li v-for="(item,index) in classificationList[classIndex].subList" :key="item+index"
                @click="$router.push({name:'ProductList',params:{cid:item.id}})">
              <img :src="item.picture" alt="">
              <p> {{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <xfooter is-active="2"></xfooter>
  </div>
</template>

<script>
  import xheader from "../components/xheader"
  import xfooter from "../components/xfooter"
  import {Toast} from "vant"

  export default {
    name: "classification",
    components: {
      xfooter,
      xheader
    },
    data() {
      return {
        classificationList: [],
        classIndex: 0               // 当前选择的一级分类索引
      }
    },
    methods: {
      classificationFun() {
        let $self = this
        $self.$store.dispatch("FindClassification")
          .then(response => {
            // console.log(response)

            if (response.success) {
              $self.classificationList = response.result
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
      this.classificationFun()
    }
  }
</script>

<style scoped lang="scss">
  .box {
    display: flex;
    height: 100%;
    .box_left {
      height: 100%;
      background: #efedef;
      ul {
        li {
          padding: 18px 6px;
          border-bottom: 1px solid #ddd;
          color: #333;
        }
        .active {
          color: #ef2929;
        }
      }
    }
    .box_right {
      flex: 1;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          text-align: center;
          padding: 8px;
          flex: 0 0 33.33%;
          img {
            width: 66px;
            height: 66px;
          }
          span {
          }
        }
      }
    }
  }
</style>
