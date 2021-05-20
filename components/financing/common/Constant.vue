<template>
  <div class="constant">
    <div class="car-value">
      <span class="title">首月还款</span>
      <span class="input-value">{{ standardNum.mrepayment }}</span>
      <span class="unit">元</span>
    </div>
    <div class="car-value">
      <span class="title">每月递减</span>
      <span class="input-value">{{ standardNum.diminishing }}</span>
      <span class="unit">元</span>
    </div>
    <div class="car-value">
      <span class="title">支付利息</span>
      <span class="input-value">{{ standardNum.interest }}</span>
      <span class="unit">元</span>
    </div>
    <div class="car-value">
      <span class="title">总还款额</span>
      <span class="input-value">{{ standardNum.sum }}</span>
      <span class="unit">元</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    standardNum: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.constant {
  width: 100%;
  padding: 0 40px;
  background: #ffffff;
  margin-top: 20px;
  .car-value {
    width: 100%;
    height: 120px;
    background: #ffffff;
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
    > span {
      display: block;
    }
    .title {
      width: 160px;
      height: 45px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 45px;
    }
    .input-value {
      width: 346px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      display: block;
      border: none;
      margin-left: 60px;
    }
    .input-value::-moz-placeholder {
      font-weight: 400;
      font-size: 32px;
      color: #999999;
    }
    .unit {
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-left: auto;
    }
    .choose-box {
      display: flex;
      margin-left: 60px;
      > div {
        width: 152px;
        height: 56px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #dddddd;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 56px;
        margin-right: 20px;
        text-align: center;
      }
      .active {
        background: #f2f5ff;
        border: 1px solid #4974f5;
        color: #4974f5;
      }
    }
  }
}
</style>
