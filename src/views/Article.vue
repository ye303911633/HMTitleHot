<template>
  <div class="Article">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left" @click="$router.back()"/>
        <span class="iconfont iconnew new"></span>
      </div>
      <span class="attention" @click="attentionBtn" :class="{active:articleUser.has_follow}">{{articleUser.has_follow?'已关注':'关注'}}</span>
    </div>

    <div class="ArticleContent">
      <h1>{{articleUser.title}}</h1>
      <div class="nickBox">
        <span>{{articleUser.user.nickname}}</span> <span>{{articleUser.user.create_date}}</span>
      </div>
      <div class="contentBox" v-html="articleUser.content"></div>
      <div class="contentFlooter">
        <div class="zan borderBox" @click="clickZanBtn" :class="{active1:dianzan}"><van-icon name="good-job-o" style="font-size: 20px"/>点赞{{articleUser.like_length}}</div>
        <div class="weChat borderBox iconfont"><span>&#xe620;</span> 微信</div>
      </div>
    </div>

    <div class="follow-up">
      <div class="noContent">
        <h1>精彩跟帖</h1>
        <p>暂无跟帖，抢占沙发</p>
      </div>
    </div>
    <flooterNav :getColl="articleUser"></flooterNav>
  </div>
</template>

<script>
import {getPostById, getFollows, unFollows, clickZan} from '@/apis/article.js'
import flooterNav from '../components/flooterNav'
export default {
  name: 'Article',
  components: {
    flooterNav
  },
  data () {
    return {
      articleUser: {
        user: ''
      },
      dianzan: false
    }
  },
  async mounted () {
    console.log(this.$route.params.id)
    let res = await getPostById(this.$route.params.id)

    this.articleUser = res.data.data
    console.log(this.articleUser)
  },
  methods: {
    async attentionBtn () {
      // 判断是否登录
      if (localStorage.getItem('token')) {
        // 登录的用户是否已关注，true为已关注，false为未关注
        if (this.articleUser.has_follow) {
          let res = await unFollows(this.articleUser.user.id)
          if (res.data.message === '取消关注成功') {
            this.$toast.fail(res.data.message)
            this.articleUser.has_follow = false
          }
        } else {
          let res = await getFollows(this.articleUser.user.id)
          if (res.data.message === '已关注' || res.data.message === '关注成功') {
            this.$toast.fail(res.data.message)
            this.articleUser.has_follow = true
            console.log(this.articleUser.has_follow)
          }
        }
      } else {
        this.$toast.fail('请先登录!')
        setTimeout(() => {
          this.$router.push({name: 'Login'})
        }, 1000)
      }
    },

    // 点赞
    async clickZanBtn () {
      let res = await clickZan(this.$route.params.id)
      if (res.data.message === '点赞成功') {
        this.$toast.success(res.data.message)
        this.dianzan = true
        ++this.articleUser.like_length
      } else if (res.data.message === '取消成功') {
        this.$toast.fail(res.data.message)
        this.dianzan = false
        --this.articleUser.like_length
      }
    }
  }
}
</script>

<style scoped lang="less">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 10px;

    .left {
      display: flex;
      align-items: center;
      /deep/ .van-icon {
        font-size: 20px;
        vertical-align: center;
      }
      .iconfont {
        font-size: 50px;
      }
    }

    .attention {
      border-radius: 15px;
      background: #fff;
      color: #000;
      border: 1px solid #ccc;
      font-size: 14px;
      padding: 7px 20px;
      /*width: 70px;*/
      /*height: 20px;*/
      &.active{
        padding: 7px 15px;
        background: #cc3300;
        color: #fff;
      }
    }
  }

  .ArticleContent {
    padding: 5px 10px;
    h1 {
      font-size: 20px;
      font-weight: bold;
    }
    .nickBox{
      margin: 10px 0;
    }
    /deep/.content{

      .photo {
        img{
          width: 100%;
          display: block;
          margin: 10px 0;
        }
        span{
          display: block;
          margin: 10px 0;
        }
        /deep/p{
          line-height: 30px;
          margin-bottom: 10px !important;
        }
      }
    }
    .contentBox{
      margin: 10px 0;
    }

    .contentFlooter{
      display: flex;
      justify-content: space-around;
      .zan{
        &.active1{
          color: red;
        }
      }
      .borderBox{
        display: inline-block;
        padding: 6px 20px;
        border-radius: 20px;
        border: 1px solid #eeeeee;
      }
      .iconfont{
        > span{
        color: #55a532;
        font-size: 18px;
        }
      }
    }
  }

  /*跟帖*/
  .follow-up{
    width: 100%;
    text-align: center;
    padding: 10px 0 50px 0;
    margin: 20px 0;
    border-top: 3px solid #e4e4e4;
    h1{
      font-size: 18px;
      padding: 10px 0;
    }
    p{
      color: #969896;
      font-size: 14px;
    }
  }

</style>
