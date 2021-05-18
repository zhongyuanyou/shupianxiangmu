<template>
  <div class="loan-calculator">
    <Head title="贷款计算器"></Head>
    <div
      v-for="(item, idx) in cardMsg"
      :key="idx"
      :style="{ backgroundImage: 'url(' + item.img + ')' }"
      class="card"
    >
      <span class="title">{{ item.title }}</span>
      <span class="desc">{{ item.desc }}</span>
      <button class="btn" @click="calculate(idx)">开始计算</button>
    </div>
  </div>
</template>

<script>
import Head from '@/components/financing/common/Header'
export default {
  components: {
    Head,
  },
  data() {
    return {
      cardMsg: [
        {
          title: '车贷计算器',
          desc: '测测如何优雅的买车',
          path: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/dhvgphn58hk0000.png',
        },
        {
          title: '房贷计算器',
          desc: '测测我的月供是多少',
          path: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/dhvgphn58hk0000.png',
        },
      ],
    }
  },
  methods: {
    calculate(idx) {
      const path = this.cardMsg[idx].path
      if (path) {
        this.$router.push(`${path}`)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.loan-calculator {
  width: 750px;
  height: 100vh;
  margin: 0 auto;
  background: #f5f5f5;
  padding: 0 20px;
  ::v-deep.my-head {
    width: 750px;
    position: fixed;
    left: 50%;
    margin-left: -375px;
    // box-shadow: none !important;
  }
  .card {
    width: 100%;
    height: 254px;
    background: #ffffff;
    border-radius: 24px;
    margin: 20px 0;
    padding: 40px;
    font-size: 0;
    position: relative;
    background-repeat: no-repeat;
    background-position: 450px 30px;
    background-size: 180px 180px;
    .title {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 700;
      color: #222222;
      line-height: 32px;
    }
    .desc {
      display: block;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
      margin-top: 20px;
    }
    .btn {
      width: 152px;
      height: 56px;
      background: #4974f5;
      border-radius: 8px;
      font-size: 26px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 700;
      color: #ffffff;
      line-height: 56px;
      margin-top: 40px;
    }
  }
}
</style>
