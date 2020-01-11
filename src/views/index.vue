<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>

      <div class="search"
           @click="toSearch">
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
                swipeable @resize="onResize">
          <van-icon slot="nav-right" name="plus" @click="goTabs"/>
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
            <van-pull-refresh v-model="item.isLoading"
                              @refresh="onRefresh">
              <hmmodel v-for='items in item.postList'
                       :key="items.id"
                       :post="items"
                       @click="goArticle(items.id)"></hmmodel>
            </van-pull-refresh>

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
      /*
      *   判断本地存储中是否有token值，有则表示登录状态,则头条栏目的索引为1， 没有则表示未登录状态,头条栏目的索引值为0
      * */
      active: localStorage.getItem('token') ? 1 : 0,
      id: '',
      category: ''
    }
  },
  methods: {
    /*
    *   当点击用户图标时，触发goLogin方法, 通过本地的localStorage判断当前的用户是否登录，登录状态，则拿到用户的id 跳转至个人中心
    *   否则进入登录页面
    * */
    goLogin () {
      if (localStorage.getItem('token')) {
        this.$router.push({ path: `/personal/${JSON.parse(localStorage.getItem('Personal')).id}` })
      } else {
        this.$toast.fail('请先登录!')
        setTimeout(() => {
          this.$router.push({ name: 'Login' })
        }, 1300)
      }
    },
    // 页面下拉刷新 加载数据
    onLoad () {
      this.category[this.active].pageIndex++
      setTimeout(() => {
        this.init()
      }, 2000)
    },
    // 页面上拉刷新 加载数据
    onRefresh () {
      this.category[this.active].pageIndex = 1
      this.category[this.active].postList.length = 0
      setTimeout(() => {
        this.init()
      }, 1000)
    },
    // 异步封装方法
    async init () {
      // 调用getPost接口： 把category的id, pageIndex, pageSize 传到后台
      let res1 = await getPost({
        category: this.category[this.active].id,
        pageIndex: this.category[this.active].pageIndex,
        pageSize: this.category[this.active].pageSize
      })

      // 判断loading是否存在：存在loading时，就把loading的状态改成false，就是允许继续下拉加载数据
      if (this.category[this.active].loading) {
        this.category[this.active].loading = false
      }

      // 判断isloading是否存在：存在isLoading，则把isLoading的状态改成false, 表示上拉加载数据完成
      if (this.category[this.active].isLoading) {
        this.category[this.active].isLoading = false
      }

      // 判断从后台传入的数据的长度 小于 当前显示的页面数时，表示后台没有更多数据了，则需要把finished的状态改成true,停止继续下拉
      if (res1.data.data.length < this.category[this.active].pageSize) {
        this.category[this.active].finished = true
      } else {
        // 当后台传入的数据 不小于 当前显示的页面数时， 表示后台有更多数据，则把finished的状态改成true，可以继续下拉刷新
        this.category[this.active].finished = false
      }

      // 把后台返回的 id,页面的索引,以及当前页的数量push到 当前的category的postlist里面
      this.category[this.active].postList.push(...res1.data.data)
    },

    // 跳转当前栏目点的内容 ， 并把id传入到Article中
    goArticle (event) {
      this.$router.push({ name: 'Article', params: { id: event } })
    },

    // 跳转至搜索页面
    toSearch () {
      this.$router.push({ name: 'Search' })
    },

    // 跳转至栏目
    goTabs () {
      this.$router.push({ name: 'Tabs' })
    },

    onResize (a) {
      console.log(a)
    }
  },

  // 当页面加载完成时，执行的钩子函数
  async mounted () {
    // this.id = JSON.parse(localStorage.getItem('token') || '{}').id
    // console.log(this.id)

    if (!localStorage.getItem('cateList')) {
      // 调用getCate接口
      let res = await getCate()

      // 把后台拿到的数据 赋值到this.category
      this.category = res.data.data
    }
    // 本地有栏目数据的时候 则直接从本地获取
    this.category = JSON.parse(localStorage.getItem('cateList'))

    /*
    *   人为添加关注和头条, 先判断有无登录，从本地获取token，有则添加关注，没有则不添加， 有无登录都可以访问到头条内容
    * */
    this.category.unshift(...[{id: 999, name: '头条', is_top: 1}])
    if (localStorage.getItem('token')) {
      this.category.unshift(...[{id: 1, name: '关注', is_top: 1}])
    }

    /*
    * 对数据进行改造，把拿到的数据 在后面继续追加 postlist pageIndex pageSize loading finished isLoading 属性
    * 方便后期的数据维护，让所有栏目对应的数据 互不影响
    * */
    this.category = this.category.map(value => {
      return {
        ...value,
        postList: [],
        pageSize: 5,
        pageIndex: 1,
        loading: false,
        finished: false,
        isLoading: false
      }
    })

    // 调用init函数， 拿到当前的this.active所在的栏目位置 进行数据交互 并对loading isLoading finished 的状态做出回应
    this.init()
  },

  // 监听状态
  watch: {
    // 动态监听栏目的变化而发起请求
    async active () {
      /*
      * 当 当前的栏目数据的长度为0时，则表示该栏目没有加载数据，需要调用init函数 进行数据交互
      * 否则 不做出回应
      * */
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
/deep/.van-tabs{
  .van-tab{
    padding-right: 20px;
  }
  .van-icon{
    font-size: 25px;
    background: #fff;
    position: fixed;
    right: 0;
    height: 40px;
    line-height: 40px;
  }
  .van-tabs__line{
    left: -8px;
  }
}

</style>
