<template>
  <div class="hmcell">
    <div>
      <slot name="left"></slot>
    </div>
    <div>{{title}}</div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hmcell',
  props: ['title']
}
</script>

<style lang="less" scoped>

</style>
