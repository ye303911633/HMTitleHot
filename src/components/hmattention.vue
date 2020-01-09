<template>
    <div class="hmattention">
      <div class="box" v-for="(item,index) in attenContent" :key="index">
      <div class="right">
        <img :src="'http://127.0.0.1:3000'+item.head_img" alt="">
      </div>
      <div class="middle">
        <div class="nickNav">{{item.nickname}}</div>
        <div class="nickDate">{{item.create_date}}</div>
      </div>

      <div class="left" @click="unFollow(item.id)">
        <i>取消关注</i>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'hmattention',
  props: ['attenContent'],
  methods: {
    unFollow (id) {
      this.$emit('click', id)
    }
  }
}
</script>

<style scoped lang="less">
.hmattention{
  .box{
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    height: 100px;
    .right{
      img {
        width: 60px;
        border-radius: 50%;
        padding: 0 30px;
      }
    }
    .middle{
      flex: 2;
      div{
        padding: 5px 0;
      }
    }
    .left{
      margin-right: 15px;
      i{
        display: inline-block;
        text-align: center;
        padding: 10px 20px;
        background: #e1e1e1;
        border-radius: 20px;
      }
    }
  }
}
</style>
