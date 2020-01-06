<template>
  <div class="personal">
    <div class="top">
      <!-- 头像 -->
      <div class="top-left">
        <img :src="oImgSrc"
             alt="">
      </div>

      <!-- 右边信息 -->
      <div class="top-right">
        <div class="top-right-header">
          <!-- <p>id：{{user.id}}</p> -->
          <p>姓名：{{user.username}}</p>
          <div class="boximg">
            姓别：
            <van-icon name="like-o"
                      class="iconfont"
                      :class="{iconxingbienv:isTrue,iconxingbienan:!isTrue}"
                      color="#75b9eb" />

          </div>
          <p>昵称：{{user.nickname}}</p>
        </div>
        <div class="top-right-timer">
          <span>{{formateDate(user.create_date)}}</span>
        </div>
      </div>
    </div>

    <van-collapse v-model="activeNames"
                  accordion>
      <van-collapse-item title="我的关注"
                         class="btnColor"
                         value="关注的用户"
                         name="1">关注的用户<span>关注的用户</span></van-collapse-item>

      <van-collapse-item title="我的跟帖"
                         value="跟帖/回复"
                         name="2">内容内容内容</van-collapse-item>
      <van-collapse-item title="我的收藏"
                         value="文章/视频"
                         name="3">内内容内容内容容</van-collapse-item>
      <van-collapse-item title="设置"
                         icon="shop-o"
                         right-icon="arrow-left"
                         name="4">内容</van-collapse-item>
    </van-collapse>

    <van-tabbar v-model="active"
                active-color="#07c160"
                inactive-color="#000">
      <van-tabbar-item icon="friends-o"
                       @click="editProfile">编辑</van-tabbar-item>
      <van-tabbar-item icon="replay"
                       @click="clearStorage">退出</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getUser } from '@/apis/users'
export default {
  data () {
    return {
      value: '',
      user: '',
      isTrue: true,
      activeNames: '1',
      oImg: 'http://127.0.0.1:3000',
      oImgSrc: '',
      active: ''
    }
  },
  async mounted () {
    let res = await getUser(this.$route.params.id)
    this.user = res.data.data
    this.user.gender === 1 ? this.isTrue = false : this.isTrue = true
    this.oImgSrc = this.oImg + this.user.head_img
  },
  methods: {
    formateDate (item) {
      let data = new Date(item)

      let Y = data.getFullYear()
      let M = data.getMonth() + 1
      let D = data.getDay()

      let H = data.getHours()
      let m = data.getMinutes()
      let s = data.getSeconds()

      function fn (a) {
        if (a < 10) {
          a = '0' + a
        }
        return a
      }

      let result = `${Y}-${fn(M)}-${fn(D)} ${fn(H)}:${fn(m)}:${fn(s)}`
      return result
    },

    clearStorage () {
      this.$dialog.confirm({
        title: '提示',
        message: '你确定退出吗！'
      }).then(() => {
        localStorage.removeItem('Personal_token')
        this.$router.push({ name: 'Login' })
      }).catch(() => {

      })
    },

    editProfile () {
      this.$router.push({ name: 'Editprofile', query: { id: this.user.id } })
    }
  }

}
</script>

<style lang='less' scoped>
.iconfont {
  font-size: 20px;
}
.iconxingbienv {
  color: red !important;
}

.personal {
  height: 100vh;
  background: #f2f2f2;
  .top {
    padding: 30px 20px;
    display: flex;
    align-items: center;
    border-bottom: 6px solid #e4e4e4;
    .top-left {
      padding: 10px 20px;
      img {
        width: 100px;
        border-radius: 50%;
      }
    }
    .top-right-header {
      margin-bottom: 10px;
      p,
      .boximg {
        margin-bottom: 10px;
      }
      .boximg {
        display: flex;
      }
    }
  }
}

.functionBtn {
  // position: absolute;
  width: 100%;
  bottom: 0;
}
.btnColor () {
  background-color: #f2f2f2;
}
</style>
