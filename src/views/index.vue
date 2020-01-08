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
        <van-icon name="contact"
                  @click="goLogin" />
      </div>
    </div>

    <div class="contentBox">
      <van-tabs v-model="active"
                sticky
                swipeable>
        <van-tab v-for="(item,index) in category"
                 :key="index"
                 :title="item.name">
          <van-list v-model="item.loading"
                    :offset='5'
                    :immediate-check='false'
                    :finished="item.finished"
                    loading-text='玩命加载中..'
                    finished-text="没有更多了!"
                    @load="onLoad">
            <hmmodel v-for='items in item.postList'
                     :key="items.id"
                     :post="items"></hmmodel>
          </van-list>
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
  methods: {
    goLogin () {
      if (localStorage.getItem('token')) {
        this.$router.push({ path: `/personal/${JSON.parse(localStorage.getItem('Personal')).id}` })
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
    onLoad () {
      this.category[this.active].pageIndex++
      console.log(this.category[this.active].pageIndex)

      setTimeout(() => {
        this.init()
      }, 2000)
    },
    // onRefresh () {
    //   // 重新第一页加载数据
    //   this.category[this.active].pageIndex = 1
    //   // this.cateList[this.active].articleList = []
    //   this.category[this.active].articleList.length = 0
    //   this.init(() => {
    //     setTimeout(() => {
    //       this.category[this.active].isLoading = false
    //       // 将下拉刷新的结束标识进行重置,如果没有重置,那么有可能就不能再上拉加载更多数据了
    //       this.category[this.active].finished = false
    //     }, 1000)
    //   })
    //   // 加载成功后将isLoading重置为false
    // },
    async init () {
      let res1 = await getPost({
        category: this.category[this.active].id,
        pageIndex: this.category[this.active].pageIndex,
        pageSize: this.category[this.active].pageSize
      })
      this.category[this.active].loading = false
      if (res1.data.data.length < this.category[this.active].pageSize) {
        this.category[this.active].finished = true
      }
      this.category[this.active].postList.push(...res1.data.data)
      console.log(this.category)
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
        pageIndex: 1,
        loading: false,
        finished: false,
        isLoading: false
      }
    })
    this.init()
  },
  watch: {
    // 动态监听栏目的变化而发起请求
    async active () {
      if (this.category[this.active].postList.length === 0) {
        this.init()
      }
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
