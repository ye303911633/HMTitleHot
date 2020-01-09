<template>
    <div>
      <van-nav-bar
        title="我的关注"
        left-arrow
        @click-left="onClickLeft"
      />
      <hmattention :attenContent="attentionContent" @click="unFollowBtn"></hmattention>
    </div>
</template>

<script>
import hmattention from '../components/hmattention'
import {unFollows, getUserAttention} from '@/apis/article.js'
export default {
  name: 'Attention',
  data () {
    return {
      attentionContent: {}
    }
  },
  components: {
    hmattention
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async unFollowBtn (id) {
      let res = await unFollows(id)
      console.log(res)
      if (res.data.message === '取消关注成功') {
        let res1 = await getUserAttention()
        this.attentionContent = res1.data.data
      }
    }
  },
  async mounted () {
    let res = await getUserAttention()
    console.log(res)
    this.attentionContent = res.data.data
  }
}
</script>

<style scoped>

</style>
