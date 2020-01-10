<template>
  <div class="Comment">
    <!-- 组件递归 -->
    <Comment v-if="post.parent"
             :post="post.parent"></Comment>
    <div class="top">
      <div class="left">
        <span>{{post.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span @click="reply(post)">回复</span>
    </div>
    <div class="bottom">{{post.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['post', 'obj'],
  methods: {
    sonPostFather () {
      this.$emit('click', '子组件回复被点击 ')
    }
  }
}
</script>

<style  scoped lang="less">
.Comment {
  border: 1px solid #ccc;
  padding: 5px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>
