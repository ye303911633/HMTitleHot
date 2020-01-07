<template>
  <div>
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <van-field v-model="user.username"
                 required
                 ref="nameFocus"
                 placeholder="用户名" />

      <van-field v-model="user.nickname"
                 required
                 placeholder="昵称" />
      <van-field v-model="user.password"
                 type="password"
                 required
                 @keyup.enter="getRegister"
                 placeholder="密码" />

      <hmbutton @click="getRegister">注册</hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '../components/hmbutton'
import { register } from '@/apis/users.js'
export default {
  components: {
    hmbutton
  },
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async getRegister () {
      let res = await register({
        username: this.user.username,
        nickname: this.user.nickname,
        password: this.user.password
      })
      console.log(res)
      if (res.data.message === '注册成功') {
        this.$toast.success(res.data.message)
        this.$router.push({ name: 'Login' })
      } else if (res.data.message === '用户名已经存在') {
        this.$toast.fail(res.data.message)
      } else {
        this.$toast.fail('请输入5~6位数字的用户名!')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
</style>
