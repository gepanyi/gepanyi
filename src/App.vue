<template>
  <div id="app">
    <Home/>
  </div>
</template>
<script>
// 引入组件
import Home from "@/views/Home.vue";
export default {
  // 注册组件
  components: {
    Home
  }
};
</script>
<style lang="less">
#app{
  height: 100%;
}
</style>
