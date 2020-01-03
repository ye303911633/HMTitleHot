<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');

  .iconweixin:before {
    content: "\e637";
  }
  #app{
    margin: 0 auto;
  }
</style>
