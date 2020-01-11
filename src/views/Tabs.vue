<template>
  <div>

    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="mycate">
      <p>点击删除频道</p>
      <span v-for="(item,index) in cateList" :key="item.id" @click="removeCate(index)">{{item.name}}</span>
    </div>
    <div class="mycate">
      <p>点击恢复频道</p>
      <span
        v-for="(item,index) in unaddCateList"
        :key="item.id"
        @click="addCate(index)"
      >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import {getCate} from '@/apis/cate.js'
export default {
  data () {
    return {
      cateList: [],
      unaddCateList: []
    }
  },
  methods: {
    // 回退上一步
    onClickLeft () {
      this.$router.go(-1)
    },

    // 点击删除频道
    removeCate (i) {
      /*
      *   在删除频道点击对应的内容，则把对应的内容添加到unaddCateList数组中
      * */
      this.unaddCateList.push(this.cateList[i])
      this.cateList.splice(i, 1)

      /*
      *   把cateList中删除后剩下的数据保存到cateList存储
      *   把cateList中删除的数据保存到unCateList存储
      * */
      this.localStorageMethod()
    },

    /*
    *   在恢复频道点击对应的内容， 则把对应的内容添加到cateList数组中
    * */
    addCate (i) {
      this.cateList.push(this.unaddCateList[i])
      this.unaddCateList.splice(i, 1)
      this.localStorageMethod()
    },

    /*
    *   封装本地存储的方法
    * */
    localStorageMethod () {
      localStorage.setItem('cateList', JSON.stringify(this.cateList))
      localStorage.setItem('unCateList', JSON.stringify(this.unaddCateList))
    }
  },
  async mounted () {
    /*
    *   页面加载完成时，先判断本地是否有数据，有则直接从本地获取数据，没有则发起请求，从后台获取数据
    * */
    if (!localStorage.getItem('cateList')) {
      let res = await getCate()
      this.cateList = res.data.data
    } else {
      this.cateList = JSON.parse(localStorage.getItem('cateList'))
      this.unaddCateList = JSON.parse(localStorage.getItem('unCateList'))
    }
  }

}
</script>

<style lang="less" scoped>
  .mycate {
    padding: 15px;
    clear: both;
    > p {
      font-size: 16px;
      color: #888;
      line-height: 30px;
    }
    > span {
      float: left;
      padding: 10px 20px;
      border: 1px solid #ccc;
      margin-left: 12px;
      margin-top: 10px;
      font-size: 14px;
    }
  }
</style>
