<template>
  <div>
    这是一个404 页
    <span @click="$router.push({name:'home'})">点我回主页</span>
  </div>
</template>

<script>
  export default {
    name: "404"
  }
</script>

<style scoped>

</style>
