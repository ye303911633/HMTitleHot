<template>
  <div>
    <div class="header">
      <van-icon name="arrow-left"
                @click="$router.go(-1)" />
      <van-search v-model="value"
                  placeholder="请输入搜索关键词"
                  shape="round"
                  @keydown.13="onSearch()"
                  autofocus>
      </van-search>
      <div slot="action"
           @click="onSearch">搜索</div>
    </div>

    <div class="cateList">
      <h2>历史记录</h2>
      <a href="javascript:;"
         v-for="(item,index) in history"
         :key="index">
        {{index+1}}:{{item}}
      </a>
    </div>
    <div class="cateList">
      <h2>搜索记录</h2>
      <router-link :to="{path:`/article/${item.id}`}"
                   v-for="(item,index) in cateList"
                   :key="index">
        <p v-for="(items, index) in item"
           :key="index">{{items.title}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { postSearch } from '@/apis/search.js'
export default {
  data () {
    return {
      value: '',
      cateList: [],
      history: []
    }
  },
  methods: {
    // 点击搜索
    async onSearch () {
      if (this.value.trim() !== '') {
        let res = await postSearch({keyword: this.value})

        if (res.data.data.length > 0) { // 判断输入的内容是否存在后台
          // 搜索记录的本地存储
          let arr = localStorage.getItem('cateList') ? JSON.parse(localStorage.getItem('cateList')) : []

          arr.unshift(res.data.data)
          localStorage.setItem('cateList', JSON.stringify(arr))
        }
        // 历史记录的本地存储
        this.history = localStorage.getItem('historyList') ? JSON.parse(localStorage.getItem('historyList')) : []
        if (this.history.indexOf(this.value) === -1) {
          this.history.unshift(this.value)
          localStorage.setItem('historyList', JSON.stringify(this.history))
        }
        this.value = ''
        this.cateList = JSON.parse(localStorage.getItem('cateList'))
        this.history = JSON.parse(localStorage.getItem('historyList'))
      }
    }
  },
  mounted () {
    this.cateList = JSON.parse(localStorage.getItem('cateList'))
    this.history = JSON.parse(localStorage.getItem('historyList'))
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  .van-search {
    flex: 1;
  }
}
.cateList {
  padding: 10px 40px;
  border-bottom: 2px solid #eee;
  h2 {
    padding: 10px 0;
    font-size: 20px;
  }
  a {
    margin-bottom: 10px;
    text-decoration: underline;
    color: #ccc;
    display: -webkit-box;
    display: -moz-box;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*显示行数*/
  }
}
</style>
