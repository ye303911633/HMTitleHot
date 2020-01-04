<template>
  <div class="personal">
    <div class="top">
      <!-- 头像 -->
      <div class="top-left">
        <img src="../assets/header.png"
             alt="">
      </div>

      <!-- 右边信息 -->
      <div class="top-right">
        <div class="top-right-header">
          <p>id：{{user.id}}</p>
          <div class="boximg">
            姓别：
            <van-icon name="like-o"
                      class="iconfont"
                      :class="{iconxingbienv:isTrue,iconxingbienan:!isTrue}"
                      font-size=""
                      color="#75b9eb" />

            <p>{{user.gender == 1? '男':'女'}}</p>
          </div>
          <p>姓名：{{user.username}}</p>
          <p>昵称：{{user.nickname}}</p>
        </div>
        <div class="top-right-timer">
          <span>{{formateDate(user.create_date)}}</span>
        </div>
      </div>
    </div>
    <van-button type="warning"
                @click="clearStorage">退出</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      user: '',
      isTrue: true
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('Personal')).data.user
    this.user.gender === 1 ? this.isTrue = false : this.isTrue = true
    // console.log(this.user)
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
      // console.log(1)

      this.$dialog.confirm({
        title: '提示',
        message: '你确定退出吗！'
      }).then(() => {
        localStorage.setItem('Personal', '')
        this.$router.push({ name: 'Login' })
      }).catch(() => {

      })
    }
  },
  computed: {
    // formateDate () {
    //   let data = new Date(this.Data)

    //   let Y = data.getFullYear()
    //   let M = data.getMonth() + 1
    //   let D = data.getDay()

    //   let H = data.getHours()
    //   let m = data.getMinutes()
    //   let s = data.getSeconds()

    //   function fn (a) {
    //     if (a < 10) {
    //       a = '0' + a
    //     }
    //     return a
    //   }

    //   let result = `${Y}-${fn(M)}-${fn(D)} ${fn(H)}:${fn(m)}:${fn(s)}`
    //   return result
    // }
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
      margin-bottom: 15px;
      .boximg {
        display: flex;
      }
    }
  }
}
</style>
