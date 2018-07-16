<template>
  <div class="page">
    <div class="contents">
      <h4>您还未绑定平台账号</h4>
      <div>
        <span @click="$router.push({name:'binding'})">绑定平台账号</span>
        <span @click="$router.push({name:'register'})">注册一个账号</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Choice",
  }
</script>

<style scoped lang="scss">
  .page {
    /*align-items: center;*/
    .contents {
      padding-top: 80%;
      background: url("../img/bj.jpg") no-repeat 0 0;
      h4 {
        text-align: center;
        font-size: 16px;
        color: #44db5e;
      }
      div {
        display: flex;
        /*align-items: center;*/
        text-align: center;
        margin-top: 20px;
        span {
          flex: 1;
          margin: 0 10px;
          padding: 10px;
          background: #ef2929;
          border-radius: 5px;
          color: #fff;
        }
      }
    }
  }
</style>
