<template>
    <div class="flooterNav">
      <input type="text" placeholder="写跟帖">
      <div class="right">
        <van-icon name="chat-o" />
        <i class="redBox">100</i>
        <van-icon class="van-collect" :class="{collect:getColl.has_star}" name="star-o" @click="getCollect(getColl)"
        />
        <i class="iconfont">&#xe607;</i>
      </div>
    </div>
</template>

<script>
import { getPostStar } from '@/apis/article.js'
export default {
  name: 'flooterNav',
  props: ['getColl'],
  methods: {
    async getCollect (data) {
      let res = await getPostStar(data.id)
      console.log(res)
      if (res.data.message === '收藏成功') {
        this.getColl.has_star = !this.getColl.has_star
      } else if (res.data.message === '取消成功') {
        this.getColl.has_star = !this.getColl.has_star
      }
    }
  }
}
</script>

<style scoped lang="less">
  .flooterNav{
    display: flex;
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    justify-content: center;
    align-items: center;
    border: 1px solid #e5e5e5;
    input{
      border-radius: 20px;
      text-indent: 20px;
      border: none;
      outline: none;
      background: #d7d7d7;
      height: 30px;
    }
    .right{
        margin-left: 20px;
        position: relative;
      .redBox{
        position: absolute;
        border-radius: 10px;
        width: 30px;
        height: 15px;
        left: 10px;
        top: -10px;
        background: red;
        font-size: 12px;
        text-align: center;
        color: #fff;
      }
      i{
        font-size: 30px;
        padding: 0 7px;
      }
      /deep/.van-collect{
        &.collect{
          color: gold;
      }
      }

    }

  }
</style>
