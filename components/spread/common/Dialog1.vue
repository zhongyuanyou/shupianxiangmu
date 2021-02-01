<template>
  <sp-popup v-model="show" position="center" class="dialog-overlay">
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
  </sp-popup>
</template>

<script>
import { Popup } from '@chipspc/vant-dgg'

export default {
  components: {
    [Popup.name]: Popup,
  },
  data() {
    return {
      show: false,
      dialogMsg: '您的信息已提交，我们的规划师 将在5分钟之内联系您',
    }
  },
  created() {
    this.$root.$on('Dialog', (dialogMsg) => {
      this.show = true
      if (dialogMsg) {
        this.dialogMsg = dialogMsg
      }
    })
  },
  methods: {
    close() {
      this.show = false
    },
  },
}
</script>

<style lang="less">
::v-deep .sp-overlay {
  width: @spread-page-width;
  left: 50%;
  right: auto;
  margin-left: calc(-@spread-page-width / 2);
}

.dialog-overlay {
  width: 540px;
  border-radius: 24px;
  .dialog-content {
    background: #ffffff;
    font-size: 16px;
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
