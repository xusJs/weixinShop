<template>
  <div class="X_header">
    <div class="header-left">
      <span v-if="isLeft" @click="$router.go(-1)"> 返回 </span>
    </div>
    <div class="header-center">
      {{title}}
    </div>
    <div class="header-right">
      <span v-if="isRight"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "xheader",
    props: ["isLeft", 'title', 'isRight']
  }
</script>

<style scoped lang="scss">
  .X_header {
    font-size: 14px;
    height: 40px;
    line-height: 30px;
    padding-top: 10px;
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
    color: #ffffff;
    display: flex;
    .header-left {
      width: 20%;
      span {
        padding: 0px 10px;
      }
    }
    .header-center {
      text-align: center;
      flex: 1;
      font-size: 18px;
    }
    .header-right {
      width: 20%;
    }
  }
</style>
