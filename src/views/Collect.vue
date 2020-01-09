<template>
    <div>
      <van-nav-bar
        title="我的收藏"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
</template>

<script>
export default {
  name: 'Collect',
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
