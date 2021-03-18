<template>
  <div>
    <div class="my-component">
      <div class="row1">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/cce90t7aiqg0000.png"
        />
        <span class="row1-text">我要借款</span>
        <span class="row1-text row1-desc">(最高可借)</span>
      </div>

      <div class="row2">
        <span class="row2-price">1,000,000</span>
        <button class="row2-btn">免费领取额度</button>
      </div>

      <p class="desc">一千元日息低于5毛 最快1天到账</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loan',
}
</script>

<style lang="less" scoped>
.my-component {
  background: #ffffff;
  border-radius: 24px;
  margin: 0px 20px;
  padding: 40px 32px;
  .row1 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    img {
      flex: none;
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
    .row1-text {
      flex: none;
      height: 24px;
      font-size: 26px;
      font-weight: bold;
      color: #222222;
      line-height: 24px;
    }
    .row1-desc {
      flex: none;
      color: #999999;
    }
  }

  .row2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    .row2-price {
      font-size: 52px;
      font-family: @Bebas;
      color: #ec5330;
      line-height: 52px;
      letter-spacing: 1px;
    }
    .row2-btn {
      height: 72px;
      background: #4974f5;
      border-radius: 8px;
      font-size: 30px;
      font-weight: bold;
      color: #ffffff;
      line-height: 30px;
    }
  }

  .desc {
    font-size: 26px;
    font-weight: bold;
    color: #222222;
    line-height: 24px;
  }
}
</style>
