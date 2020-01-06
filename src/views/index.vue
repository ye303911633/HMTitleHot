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
        <van-tab v-for="(item,index) in category"
                 :key="index"
                 :title="item.name">
          <hmmodel v-for='items in item.postList'
                   :key="items.id"
                   :post="items"></hmmodel>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>

import { getCate } from '@/apis/cate.js'
import { getPost } from '@/apis/article.js'
import hmmodel from '@/components/hmmodel.vue'

export default {
  components: {
    hmmodel
  },
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      id: '',
      category: ''
    }
  },
  async mounted () {
    // this.id = JSON.parse(localStorage.getItem('token') || '{}').id
    // console.log(this.id)
    let res = await getCate()
    this.category = res.data.data
    this.category = this.category.map(value => {
      return {
        ...value,
        postList: [],
        pageSize: 10,
        pageIndex: 1
      }
    })
    console.log(this.category)

    let res1 = await getPost({
      category: this.category[this.active].id,
      pageIndex: this.category[this.active].pageIndex,
      pageSize: this.category[this.active].pageSize
    })
    this.category[this.active].postList = res1.data.data
    console.log(this.category)
  },
  watch: {
    async active () {
      let res1 = await getPost({
        category: this.category[this.active].id,
        pageIndex: this.category[this.active].pageIndex,
        pageSize: this.category[this.active].pageSize
      })
      this.category[this.active].postList = res1.data.data
      console.log(this.category)
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
