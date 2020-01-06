<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>

      <div class="search">
        <van-icon name="search" />
        <span>搜索</span>
      </div>

      <div class="user">
        <van-icon name="contact" />
      </div>
    </div>

    <div class="contentBox">
      <van-tabs v-model="active"
                sticky
                swipeable>
        <van-tab title="标签 1">内容 1</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: red;
  color: #fff;
  .iconnew {
    padding: 0 10px;
    font-size: 55px;
  }
  .search {
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    height: 40px;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    cursor: pointer;
  }
  .user {
    padding: 0 10px;
    font-size: 25px;
  }
}
</style>
