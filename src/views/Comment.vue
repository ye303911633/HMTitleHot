<template>
  <div class="Comment">
    <van-nav-bar title="评论板"
                 left-arrow
                 @click-left="onClickLeft" />
    <div class="comm"
         v-for="(item, index) in commentList"
         :key="index">
      <div class="header">
        <img :src="item.user.head_img"
             alt="">
        <div class="contName">
          <p>{{item.user.nickname}}</p>
          <p>{{item.create_date}}</p>
        </div>
        <p @click='reply(item)'>回复</p>
      </div>
      <div class="flooter">{{item.content}}</div>
      <hmComment v-if="item.parent"
                 :post="item.parent"
                 @click="reply"></hmComment>
    </div>
    <hmCommentFooter :post="user"
                     @refresh="refreshPage"
                     :obj="objNull"
                     @click="reply"></hmCommentFooter>
  </div>
</template>

<script>
import { getCommentList, getPostById } from '@/apis/article.js'
import hmComment from '../components/hmComment'
import hmCommentFooter from '../components/commentFooter'
export default {
  name: 'Comment',
  components: {
    hmComment, hmCommentFooter
  },
  data () {
    return {
      user: {},
      commentList: [],
      objNull: null
    }
  },
  async mounted () {
    this.init()
    let res2 = await getPostById(this.$route.params.id)
    this.user = res2.data.data
    console.log(this.user)
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async init () {
      let res = await getCommentList(this.$route.params.id, {
        pageSize: 40,
        pageIndex: 1
      })
      console.log(res)
      this.commentList =
        res.data.data.length > 0 ? res.data.data : this.commentList

      this.commentList = this.commentList.map(value => {
        value.user.head_img = 'http://127.0.0.1:3000' + value.user.head_img
        return value
      })
    },
    refreshPage () {
      this.init()
      // window.screenTop(0, 0)
    },

    // 点击回复
    reply (item) {
      this.objNull = item
      console.log(item)
    },

    // 接受子的点击事件
    fatherGetSon (data) {
      console.log(data)
    }

  }

}
</script>

<style  scoped lang="less">
.Comment {
  .comm {
    margin-bottom: 20px;
    border-bottom: 1px solid #969896;
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        padding-left: 20px;
        border-radius: 50%;
      }
      .contName {
        flex: 2;
        padding: 10px;
        > p {
          margin-bottom: 15px;
        }
      }
      > p {
        padding-right: 20px;
      }
    }
    .flooter {
      padding-left: 25px;
      padding: 20px 0 10px 30px;
    }
  }
}
</style>
