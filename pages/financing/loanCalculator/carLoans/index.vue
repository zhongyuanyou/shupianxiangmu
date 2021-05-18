<template>
  <div class="car-loans">
    <Head title="车贷计算器"></Head>
    <div class="form-box">
      <div class="car-value">
        <span class="title">车价总额</span>
        <input
          v-model="value"
          class="input-value"
          type="text"
          placeholder="请输入车价总额"
          @focus="blur"
        />
        <span class="unit">万元</span>
      </div>
      <div class="car-value">
        <span class="title">首付款</span>
        <input
          v-model="value"
          class="input-value"
          type="text"
          placeholder="请输入首付比率"
          @focus="paymentBlur"
        />
        <span class="unit">%</span>
      </div>
      <div class="car-value">
        <span class="title">贷款年利率</span>
        <input
          v-model="value"
          class="input-value"
          type="text"
          placeholder="请输入贷款年利率"
          @focus="loanBlur"
        />
        <span class="unit">%</span>
      </div>
      <div class="car-value">
        <span class="title">贷款期限</span>

        <span class="unit">%</span>
      </div>
    </div>
    <Keyword ref="keyword"></Keyword>
    <sp-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="2"
    />
  </div>
</template>

<script>
import { Picker } from '@chipspc/vant-dgg'
import Head from '@/components/financing/common/Header'
import Keyword from '@/components/financing/common/keyword'
export default {
  components: {
    Head,
    Keyword,
    [Picker.name]: Picker,
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    blur() {
      document.activeElement.blur()
      this.$refs.keyword.show = true
    },
    // paymentBlur() {
    //   document.activeElement.blur()
    //   this.$refs.keyword.show = true
    // },
    // loanBlur() {
    //   document.activeElement.blur()
    //   this.$refs.keyword.show = true
    // },
  },
}
</script>

<style lang="less" scoped>
.car-loans {
  width: 750px;
  height: 100vh;
  margin: 0 auto;
  background: #f5f5f5;
  ::v-deep.my-head {
    width: 750px;
    position: fixed;
    left: 50%;
    margin-left: -375px;
  }
  .form-box {
    margin-top: 20px;
    width: 100%;
    padding: 0 40px;
    background: #ffffff;
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
    }
  }
}
</style>
