<template>
    <input class="hminput" type="text" @input="getData" @blur="handleBlur" :class="{'success':statu,'error':!statu}">
</template>

<script>
export default {
  name: 'hminput',
  props: ['rules', 'msg'],
  data () {
    return {
      statu: true
    }
  },
  methods: {
    getData (event) {
      let value = event.target.value
      if (this.rules && this.rules.test(value)) {
        this.statu = true
      } else {
        this.statu = false
      }
      this.$emit('input', value)
    },
    // 失去焦点再次验证
    handleBlur (event) {
      let value = event.target.value
      if (this.rules && !this.rules.test(value)) {
        console.log(this.msg || '输入不正确')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .hminput{
    width:318/360*100vw;
    height: 50px;
    outline:none;
    border:none;
    border-bottom: 2px solid #ccc;
    font-size: 20px;
    line-height: 50px;
    display: flex;
    margin: 10px auto;
  }

  .success{
    border-bottom-color:green;
  }
  .error{
    border-bottom-color:red;
  }

</style>
