<template>
  <div class="loan-tool" @click="jump()">
    <span class="title">贷款工具</span>
    <div
      class="content"
      :style="{ backgroundImage: 'url(' + toolMsg.icon + ')' }"
    >
      <div class="msg">
        <span class="msg-title">{{ toolMsg.title }}</span>
        <span class="msg-desc">{{ toolMsg.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toolMsg: {
      type: Object,
      default: () => {
        return {
          title: '额度评估',
          desc: '测测您的信用额度',
          icon: '',
          path: '',
        }
      },
    },
  },
  methods: {
    jump() {
      this.$router.push(this.toolMsg.path)
    },
  },
}
</script>

<style lang="less" scoped>
.loan-tool {
  width: 750px;
  height: 296px;
  //   background: #ffffff;
  padding: 40px;
  font-size: 0;

  .title {
    height: 32px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #222222;
    line-height: 32px;
  }
  .content {
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 100% 100%;
    width: 670px;
    height: 152px;
    // background: #f8f8f8;
    border-radius: 12px;
    margin-top: 32px;
    padding: 32px 32px 30px;
    display: flex;
    justify-content: space-between;
    .msg {
      .msg-title {
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 40px;
        display: block;
      }
      .msg-desc {
        height: 32px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 32px;
        margin-top: 6px;
      }
    }
    .img-box {
      width: 100px;
      height: 90px;
      background: linear-gradient(137deg, #d7b285 0%, #e1c7a4 100%);
    }
  }
}
</style>
