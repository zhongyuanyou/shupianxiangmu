<template>
  <div v-show="show" class="dialog-overlay">
    <div class="dialog-content">
      <div class="content-img">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/1mht4axlqkxs000.png"
          alt=""
        />
      </div>
      <span class="dialog-title">提交成功</span>
      <span class="dialog-msg">{{ dialogMsg }}</span>
      <div class="line"></div>
      <button class="confirm-btn" @click="close">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      dialogMsg: '您的信息已提交，我们的规划师将在5分钟之内联系您',
    }
  },
  watch: {
    show(newval, oldval) {
      if (newval) {
        document.querySelector('.default-layout').style.position = 'fixed'
      }
    },
  },
  created() {
    this.$root.$on('Dialog', (dialogMsg) => {
      this.show = true
      if (dialogMsg) {
        this.dialogMsg = dialogMsg
      }
    })
  },
  mounted() {
    // 调起提示框后 遮罩成后面的内容不滚动
  },
  methods: {
    close() {
      this.show = false
      document.querySelector('.default-layout').style.position = 'static '
    },
  },
}
</script>

<style lang="less" scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1111;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  .dialog-content {
    position: fixed;
    top: 45%;
    left: 50%;
    width: 540px;
    height: 461px;
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    font-size: 16px;
    transform: translate3d(-50%, -50%, 0);
    backface-visibility: hidden;
    transition: 0.3s;
    transition-property: transform, opacity, -webkit-transform;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content-img {
      width: 96px;
      height: 96px;
      margin-top: 48px;
      > img {
        width: 100%;
      }
    }
    .dialog-title {
      display: block;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 35px;
      margin-top: 41px;
    }
    .dialog-msg {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 38px;
      display: block;
      padding: 0 40px;
      text-align: center;
      margin-top: 32px;
    }
    .line {
      width: 100%;
      height: 1px;
      background: #f4f4f4;
      margin-top: 48px;
    }
    .confirm-btn {
      display: block;
      height: 31px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
      height: 96px;
      background: transparent;
    }
  }
}
</style>
