<template>
  <div class="login">
    <div class="container">
      <div class="close"
           @click="goBack"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
    </div>

    <van-field v-model="user.username"
               required
               ref="nameFocus"
               placeholder="用户名" />

    <van-field v-model="user.password"
               type="password"
               required
               @keyup.enter="getBtn()"
               placeholder="密码" />
    <div class="RegisterBox">
      <p>没有账号? <router-link to="Register">注册账号</router-link>
      </p>
    </div>

    <hmbutton @click="getBtn">登录</hmbutton>
  </div>
</template>

<script>
import hminput from '../components/hminput'
import hmbutton from '../components/hmbutton'
import { login } from '@/apis/users'

export default {
  data () {
    return {
      value: '',
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    hminput,
    hmbutton
  },
  methods: {
    async getBtn () {
      let usernameReg = /^(\d{5,6})$|^(1\d{10})$/
      let passwordReg = /^\S{3,16}$/
      if (usernameReg.test(this.user.username) && passwordReg.test(this.user.password)) {
        let res = await login(this.user)
        // console.log(res)
        if (res.data.message === '登录成功') {
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('Personal', JSON.stringify(res.data.data.user))
          this.$router.push({ name: 'Index' })
        } else {
          this.$toast.fail('账号或密码错误')
        }
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.$refs.nameFocus.focus()
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.RegisterBox {
  position: absolute;
  margin-top: 10px;
  right: 10px;
  font-size: 14px;
}
</style>
