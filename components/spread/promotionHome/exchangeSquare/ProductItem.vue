<template>
  <div class="product-item">
    <div v-for="products in product" :key="products.code" class="product-box">
      <div class="product-left">
        <img :src="product.img" alt="" />
      </div>
      <div class="product-right">
        <span class="title">{{ products.title }}</span>
        <div class="label-box">
          <span
            v-for="labels in products.labels"
            :key="labels.code"
            class="label"
            :class="labels.type === 'saleTag' ? 'saleTag' : 'label'"
            >{{ labels.label }}</span
          >
        </div>
        <div class="describe-box">
          <span
            v-for="describe in products.describe"
            :key="describe.code"
            class="describe-msg"
            >{{ describe.msg }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: [
        {
          code: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
          title: '房建市政公路三级+四专三级',
          labels: [
            { code: 1, label: '精选资质TOP1', type: 'saleTag' },
            { code: 2, label: '可线下', type: 'tag' },
            { code: 2, label: '热门行业', type: 'tag' },
          ],
          describe: [
            { code: 1, msg: '施工总承包三级标准资质' },
            { code: 2, msg: '带安许' },
            { code: 3, msg: '500万-1000万' },
          ],
          discountTag:
            'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
          salePrice: 33.99,
          originalPrice: 34,
          priceUnit: '万元',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.product-item {
  width: 100%;
  padding: 0 20px;
  .product-box {
    width: 100%;
    height: 276px;
    background: #ffffff;
    border-radius: 24px;
    padding: 28px 23px 28px 20px;
    display: flex;
    align-items: center;
    .product-left {
      width: 220px;
      height: 220px;
      background: linear-gradient(180deg, #46494d 0%, #797d83 0%, #414347 100%);
      border-radius: 12px;
      flex-shrink: 0;
      display: flex;
      > img {
        width: 100%;
      }
    }
    .product-right {
      margin-left: 32px;
      display: flex;
      flex-direction: column;
      .title {
        display: block;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 42px;
        .textOverflow(2);
        margin-bottom: 12px;
      }
      .label-box {
        display: flex;
        align-items: center;
        > span {
          display: block;
          padding: 4px 6px;
          border-radius: 4px;
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 20px;
        }
        > span:not(:first-child) {
          margin-left: 8px;
        }
        .label {
          background: #f0f2f5;
          color: #5c7499;
        }
        .saleTag {
          background: #fdeded;
          color: #f1524e;
        }
      }
      .describe-box {
        display: flex;
        align-items: center;
        .describe-msg {
          display: block;
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 22px;
        }
        > span:not(:first-child)::before {
          content: '';
          height: 22px;
          width: 1px;
          border-left: 1px solid #222222;
        }
      }
    }
  }
}
</style>
