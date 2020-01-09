<template>
    <div class="Comment">
      <van-nav-bar
        title="评论板"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="comm" v-for="(item, index) in user" :key="index">
        <div class="header">
          <img :src="'http://127.0.0.1:3000'+item.user.head_img" alt="" >
          <div class="contName">
            <p>{{item.user.nickname}}</p>
            <p>{{item.create_date}}</p>
          </div>
          <p>回复</p>
        </div>
        <div class="flooter">{{item.content}}</div>
        <hmComment v-if="item.parent" :post="item.parent" ></hmComment>
      </div>
    </div>
</template>

<script>
import {getCommentList} from '@/apis/article.js'
import hmComment from '../components/hmComment'
export default {
  name: 'Comment',
  components: {
    hmComment
  },
  data () {
    return {
      user: {}
    }
  },
  async mounted () {
    let id = this.$route.params.id
    let res = await getCommentList(id, {pageIndex: 40, pageSize: 1})
    this.user = res.data.data
    console.log(this.user)
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }

}
</script>

<style  scoped lang="less">
.Comment{
  .comm{
    margin-bottom: 40px;
    border-bottom: 1px solid #969896;
    .header{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 100px;
        padding-left: 20px;
        border-radius: 50%;
      }
      .contName{
        flex: 2;
        padding: 10px;
        > p{
          margin-bottom: 15px;
        }
      }
      > p{
        padding-right: 20px;
      }
    }
    .flooter{
      padding-left: 25px;
      padding: 20px 0 10px 30px;
    }
  }
}
</style>
