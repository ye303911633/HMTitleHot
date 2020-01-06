<template>
  <div class="editProfile">
    <!--    顶部nav-->
    <div class="header">
      <van-nav-bar title="编辑资料"
                   left-arrow
                   @click-left="onClickLeft" />
    </div>

    <!--    图片-->
    <div class="ImgBox">
      <img :src="imgSrc"
           alt="">
      <van-uploader :after-read="afterRead" />
    </div>

    <!--    内容cell单元格-->
    <van-cell title="昵称"
              is-link
              :value="user.nickname"
              @click="show=!show" />
    <van-dialog v-model="show"
                title="昵称"
                show-cancel-button
                @confirm="getUsername">
      <van-field :value="user.nickname"
                 ref="nick"
                 required
                 label="昵称" />
    </van-dialog>

    <van-cell title="密码"
              is-link
              :value="user.password"
              @click="show1=!show1" />
    <van-dialog v-model="show1"
                title="密码"
                show-cancel-button
                @confirm="getPassword">
      <van-field :value="user.password"
                 ref="psd"
                 required
                 label="密码" />
    </van-dialog>

    <van-cell title="性别"
              is-link
              :value="user.gender===1?'男':'女'"
              @click="show2=!show2" />
    <van-dialog v-model="show2"
                title="修改性别"
                show-cancel-button
                @confirm="getGender">

      <van-picker :columns="['女','男']"
                  :default-index='user.gender'
                  @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
import { getUser, uploadFile } from '@/apis/users'
import { uploadImg } from '@/apis/upload.js'

export default {
  data () {
    return {
      value: '',
      user: {
        nickname: '',
        password: '****',
        gender: ''
      },
      // columns: ['女', '男'],
      show: false,
      show1: false,
      show2: false,
      dataStorage: '',
      imgSrc: '',
      imgUrl: 'http://127.0.0.1:3000'
    }
  },
  computed: {},
  methods: {
    // 返回浏览器上一步
    onClickLeft () {
      this.$router.go(-1)
    },

    // 图片上传
    async afterRead (data) {
      let formData = new FormData()
      formData.append('file', data.file)
      let res = await uploadImg(formData)
      if (res.data.message === '文件上传成功') {
        this.imgSrc = 'http://127.0.0.1:3000' + res.data.data.url
        let res1 = await uploadFile(this.$route.query.id, { head_img: res.data.data.url })
        if (res1.data.message === '修改成功') {
          this.$toast.success(res1.data.message)
        } else {
          this.$toast.fail(res1.data.message)
        }
      }
    },
    async getUsername () {
      let name = this.$refs.nick.$refs.input.value
      let res = await uploadFile(this.user.id, { nickname: name })
      if (res.data.message === '修改成功') {
        this.$toast.success(res.data.message)
        this.user.nickname = res.data.data.nickname
      } else {
        this.$toast.fail(res.data.message)
      }
    },
    async getPassword () {
      let psd = this.$refs.nick.$refs.input.value
      let res = await uploadFile(this.user.id, { password: psd })
      if (res.data.message === '修改成功') {
        this.$toast.success(res.data.message)
        this.user.nickname = res.data.data.nickname
      } else {
        this.$toast.fail(res.data.message)
      }
    },
    async getGender () {
      let res = await uploadFile(this.user.id, { gender: this.user.gender })
      console.log(res)

      if (res.data.message === '修改成功') {
        this.$toast.success(res.data.message)
        this.user.gender = res.data.data.gender
      } else {
        this.$toast.fail(res.data.message)
      }
    },
    onChange (picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.user.gender = index
    }
  },

  async mounted () {
    let id = this.$route.query.id
    let res = await getUser(id)
    this.user = res.data.data
    this.imgSrc = this.imgUrl + res.data.data.head_img
  }
}
</script>

<style lang="less" scoped>
.editProfile {
  height: 100vh;
  background: #f2f2f2;
}

/deep/ .van-cell {
  background: #f2f2f2;
  border-bottom: 1px solid #e4e4e4;
}

/deep/ .van-dialog__content {
  background: #ffffff;
}

.ImgBox {
  position: relative;

  > img {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  /deep/ .van-uploader__upload {
    width: 100px;
    height: 100px;
    left: calc(100px - -25%);
    top: calc(100px - 50%);
    opacity: 0;
  }
}

/deep/ .van-nav-bar {
  background: #f2f2f2;
}
</style>
