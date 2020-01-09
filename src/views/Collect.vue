<template>
    <div>
      <van-nav-bar
        title="我的收藏"
        left-arrow
        @click-left="onClickLeft"
      />

      <van-swipe-cell  v-for='(items,index) in attenContent'
                      :key="index">
        <hmmodel :post="items"></hmmodel>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="deleteColl(items.id)" />
        </template>
      </van-swipe-cell>
      <router-link :to="{name:'Index'}" v-show="haha">快去收藏更多资讯吧!</router-link>
    </div>
</template>

<script>
import { getPostList, getPostStar } from '@/apis/article.js'
import hmmodel from '../components/hmmodel'
export default {
  name: 'Collect',
  components: {
    hmmodel
  },
  data () {
    return {
      attenContent: '',
      haha: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async deleteColl (id) {
      let res = await getPostStar(id)
      if (res.data.message === '取消成功') {
        this.$toast.success(res.data.message)
        let res1 = await getPostList()
        this.attenContent = res1.data.data
      }
    }
  },
  async mounted () {
    let res = await getPostList()
    if (res.data.data.length === 0) {
      this.haha = true
    } else {
      this.attenContent = res.data.data
    }
  }
}
</script>

<style scoped lang="less">
  /deep/.van-swipe-cell__right{
    .van-button--square{
      top: 50%;
      transform: translate(0, -50%);
    }
  }
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
    font-size: 14px;
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
  a{
    color: #55a532;
    font-size: 30px;
    margin: 20px;
    display: inline-block;
  }

</style>
