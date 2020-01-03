<template>
    <div class="hmbutton" @click="getData">

      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'hmbutton',
  methods: {
    getData (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped lang="less">
.hmbutton{
  width: 318*100vw/360;
  height: 50px;
  background-color: #cc3300;
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color:#fff;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;

}
</style>
