<template>
  <div class="login">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
    </div>
    <!--      用户名-->
    <hminput placeholder="用户名/手机号"
             v-model="user.username"
             :rules='/^(\d{5,6})$|^(1\d{10})$/'
             msg='用户名或者手机号输入不正确'></hminput>

    <!--      密码-->
    <hminput placeholder="密码"
             v-model="user.password"
             :rules='/^\S{3,16}$/'
             msg='请输入3-16位的密码'></hminput>
    <hmbutton @click="getBtn">登录</hmbutton>
  </div>
</template>

<script>
import hminput from '../components/hminput'
import hmbutton from '../components/hmbutton'
import { login } from '@/apis/loginApi'

export default {
  name: 'login',
  data () {
    return {
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
      if (/^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) && /^\S{3,16}$/.test(this.user.password)) {
        let res = await login(this.user)
        // alert(res)
        console.log(res)
      }
    }
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
</style>
