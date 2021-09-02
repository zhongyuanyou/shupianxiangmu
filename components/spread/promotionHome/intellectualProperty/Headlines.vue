<template>
  <div class="headlines" @click="Jump()">
    <img
      src="https://cdn.shupian.cn/sp-pt/wap/images/d0ritn7wp740000.png"
      alt=""
    />
    <div class="content">自己就能查商标，轻松获取结果！</div>
    <my-icon
      size="0.24rem"
      name="order_ic_listnext"
      style="margin-left: auto"
      color="#CCCCCC"
    />
  </div>
</template>

<script>
export default {
  methods: {
    Jump() {
      this.$emit('handleJump')
    },
  },
}
</script>

<style lang="less" scoped>
.headlines {
  height: 80px;
  margin: 20px 20px 0 20px;
  background: #fff;
  padding: 0 24px 0 20px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  > img {
    width: 126px;
    object-fit: cover;
  }
  > .content {
    margin-left: 41px;
    font-size: 24px;
    color: #222222;
    width: calc(100% - 180px);
  }
}
</style>
