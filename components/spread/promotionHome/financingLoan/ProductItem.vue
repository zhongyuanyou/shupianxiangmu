<template>
  <div>
    <div class="my-component">
      <div class="item-img">
        <img :src="product.img" />
      </div>
      <div class="item-content">
        <div class="item-title">{{ product.title }}</div>
        <div class="item-desc">{{ product.desc }}</div>
        <div class="item-labels">
          <span
            v-for="(label, index) in product.labels"
            :key="index"
            class="item-label"
            >{{ label }}</span
          >
        </div>
        <div class="item-price">
          <span class="item-price-num">
            {{
              product.price > 10000
                ? (product.price / 10000).toFixed(1)
                : product.price
            }}
          </span>
          <span v-if="product.price > 10000" class="item-price-unit">万</span>
          <span class="item-price-note">最高可借</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          title: '社保贷',
          desc: '手续简单，审批快',
          price: 1000,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
          url: '',
          labels: ['月利率低至0.35%', '贷款期限最长24期'],
        }
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.my-component {
  display: flex;
  margin-right: 32px;
  margin-bottom: 20px;
  padding: 28px 20px 32px 20px;
  background-color: #fff;
  width: 100%;
  border-radius: 24px;
  .item-img {
    width: 180px;
    height: 180px;
    background: linear-gradient(180deg, #46494d 0%, #797d83 0%, #414347 100%);
    border-radius: 14px;
    margin-right: 32px;
    img {
      width: 180px;
      height: 180px;
    }
  }

  .item-content {
    .item-title {
      height: 34px;
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 34px;
      margin-bottom: 10px;
      // 超出省略号
      overflow: hidden;
      text-overflow: ellipsis;
      //white-space: nowrap;
    }
    .item-desc {
      font-size: 22px;
      font-weight: 400;
      color: #222222;
      line-height: 26px;
      // 超出省略号
      overflow: hidden;
      text-overflow: ellipsis;

      height: 26px;
      margin-bottom: 14px;
    }
    .item-labels {
      display: flex;
      align-items: center;
      overflow: hidden;
      .item-label {
        flex: none;
        background: #f0f2f5;
        border-radius: 4px;
        font-size: 20px;
        font-weight: bold;
        color: #5c7499;
        line-height: 20px;
        padding: 4px 6px;
        margin-right: 8px;
      }
    }

    .item-price {
      margin-top: 33px;
      display: flex;
      align-items: baseline;
      .item-price-num {
        font-size: 36px;
        font-weight: bold;
        color: #ec5330;
        line-height: 36px;
      }
      .item-price-unit {
        margin-left: 2px;
        font-size: 22px;
        font-weight: bold;
        color: #ec5330;
        line-height: 22px;
      }
      .item-price-note {
        margin-left: 8px;
        background: rgba(236, 83, 48, 0.08);
        border-radius: 4px;
        padding: 4px 6px;
        font-size: 20px;
        font-weight: bold;
        color: #ec5330;
        line-height: 20px;
      }
    }
  }
}
</style>
