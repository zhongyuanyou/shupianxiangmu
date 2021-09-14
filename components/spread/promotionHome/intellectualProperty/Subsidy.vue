<template>
  <div class="subsidy">
    <h1>测测我的企业能获得多少补贴?</h1>
    <div class="tag">
      <span v-for="(item, index) in tagList" :key="index">{{ item }}</span>
    </div>
    <div class="box">
      <div class="btn" @click="jump">免费评估补贴金额</div>
      <div class="tit" @click="jump1">
        <p>完善资料测算更精准</p>
        <my-icon
          name="order_ic_listnext"
          size="0.24rem"
          color="#222222"
        ></my-icon>
      </div>
    </div>
  </div>
</template>

<script>
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'Subsidy',
  data() {
    return {
      tagList: ['申报早规划', '补贴不漏报', '智能精匹配'],
    }
  },
  methods: {
    jump() {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      window.location.href = `https://${base}mtool.shupian.cn/policySubsidy/measure`
    },
    jump1() {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      window.location.href = `https://${base}mtool.shupian.cn/policySubsidy/measure/perfectData`
    },
  },
}
</script>

<style lang="less" scoped>
.subsidy {
  margin: 0 20px;
  background: #feefd6;
  border-radius: 24px;
  padding: 28px 20px 0 20px;
  > h1 {
    text-align: center;
    font-size: 32px;
    color: #222222;
    letter-spacing: 0;
  }
  > .tag {
    margin-top: 16px;
    display: flex;
    > span {
      width: 214px;
      text-align: center;
      padding: 4px 0;
      border: 1px solid #eecc94;
      border-radius: 4px;
      font-size: 24px;
      color: #af8b51;
      letter-spacing: 0;
      margin-left: 14px;
    }
    > span:first-child {
      margin-left: 0;
    }
  }
  > .box {
    background-image: linear-gradient(180deg, #fdfcf8 0%, #feefd6 100%);
    padding: 28px 25px 40px 25px;
    // margin: 20px 20px 0 20px;
    margin-top: 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    > .btn {
      height: 96px;
      background: #f9632a;
      border-radius: 12px;
      font-size: 32px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 96px;
      font-weight: bold;
    }
    > .tit {
      margin-top: 32px;
      font-size: 28px;
      color: #222222;
      letter-spacing: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      > p {
        margin-right: 16px;
      }
    }
  }
}
</style>
