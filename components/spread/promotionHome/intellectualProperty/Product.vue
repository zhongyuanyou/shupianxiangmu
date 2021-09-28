<template>
  <div
    v-if="JSON.toString(product) !== '{}'"
    class="product"
    @click="onMore(product)"
  >
    <div class="img-box"><img :src="product.imageUrl" alt="" /></div>
    <div class="product-title-box">
      <span v-if="product.activeTag !== ''" class="title-tag">{{
        product.activeTag
      }}</span>
      <span
        class="product-title"
        :style="{ marginLeft: product.activeTag !== '' ? '12px' : 0 }"
        >{{ product.title }}</span
      >
    </div>
    <div
      v-if="product.saleTage && product.saleTage !== ''"
      class="product-field-box"
    >
      <!-- 活动标签 -->
      <span class="sale-tag">{{ product.saleTage }}</span>
      <!-- 评分 -->
      <span
        v-if="product.score && product.score !== '' && product.saleTage === ''"
        class="score"
        >{{ product.score }}分</span
      >
      <div
        v-if="
          (product.saleTage && product.saleTage !== '') ||
          (product.score && product.score !== '')
        "
        class="line"
      ></div>
      <!-- 销量 -->
      <!-- <span class="sales">月销量{{ product.sales }}</span> -->
    </div>
    <div v-if="product.labels.length > 0" class="product-label-box">
      <ul>
        <li
          v-for="(label, labelcode) in product.labels"
          v-show="labelcode < 3"
          :key="labelcode"
        >
          {{ label }}
        </li>
      </ul>
    </div>
    <div class="price-btn-box">
      <div class="content">
        <div class="price-box">
          <span class="price">{{ price(product.price) }}</span>
          <span v-if="product.price > 10000" class="item-price-unit">万元</span>
          <span v-else class="item-price-unit">元</span>
        </div>
        <span class="sales">月销量 {{ product.sales }}</span>
      </div>
      <!-- <a class="btn" @click="onMore(product.id)">立即购买</a> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  methods: {
    onMore(product) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      if (this.isInApp) {
        const iOSRouters = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: product.id },
          },
        }
        const androidRouters = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: product.id },
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouters)
        const androidRouterStr = JSON.stringify(androidRouters)
        this.$appFn.dggJumpRoute({
          iOSRouter: iOSRouterStr,
          androidRouter: androidRouterStr,
        })
      } else {
        let code = this.product.classCodeLevel
          ? this.product.classCodeLevel.split(',')
          : []
        code = code.length > 0 ? code[0] : ''
        window.location.href = `https://${base}m.shupian.cn/detail?productId=${product.id}&classCodeOne=${code}`
      }
    },
    price(price) {
      if (price % 1) {
        return price > 10000 ? (price / 10000).toFixed(1) : price
      } else {
        return parseInt(price > 10000 ? (price / 10000).toFixed(1) : price)
      }
    },
  },
}
</script>
<style lang="less" scoped>
// .product:nth-child(even) {
//   margin-left: 19px;
//   margin-bottom: 19px;
// }
.product {
  width: 345px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 24px;
  padding: 20px 20px 14px 20px;
  margin-bottom: 20px;
  .img-box {
    width: 305px;
    height: 305px;
    // background: linear-gradient(178deg, #46494d 0%, #797d83 0%, #414347 100%);
    border-radius: 12px;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }
  }
  .product-title-box {
    display: flex;
    margin-top: 16px;
    .title-tag {
      display: inline-block;
      width: 52px;
      height: 32px;
      background: #ec5330;
      border-radius: 4px;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      line-height: 36px;
    }
    .product-title {
      display: block;
      font-size: 30px;
      font-weight: bold;
      color: #222222;
      line-height: 40px;
      .textOverflow(2);
    }
  }

  .product-field-box {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .sale-tag {
      display: block;
      width: 52px;
      height: 32px;
      background: #ec5330;
      border-radius: 4px;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      line-height: 36px;
    }
    .score {
      display: block;
      font-size: 22px;
      font-weight: bold;
      color: #fdb032;
    }
    .line {
      width: 1px;
      height: 20px;
      background: #cdcdcd;
      margin: 0 12px;
    }
  }
  .product-label-box {
    margin-top: 12px;
    > ul {
      display: flex;
      align-items: center;
      > li {
        padding: 4px 6px;
        background: #f0f2f5;
        border-radius: 4px;
        font-size: 20px;
        font-weight: bold;
        color: #5c7499;
        // line-height: 20px;
        text-align: center;
        max-width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > li:not(:first-child) {
        margin-left: 8px;
      }
    }
  }
  .price-btn-box {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content {
      .price-box {
        vertical-align: baseline;
        display: flex;
        .price {
          display: block;
          font-size: 36px;
          font-weight: bold;
          color: #ec5330;
          line-height: 36px;
          padding-right: 4px;
        }
        > .item-price-unit {
          display: block;
          font-size: 22px;
          font-weight: bold;
          color: #ec5330;
          line-height: 36px;
          margin-left: 2px;
          margin-top: 3px;
        }
      }
      .sales {
        display: block;
        font-size: 20px;
        font-weight: 400;
        color: #999999;
        line-height: 28px;
      }
    }
    .btn {
      width: 120px;
      height: 48px;
      border-radius: 8px;
      border: 1px solid #4974f5;
      font-size: 24px;
      font-weight: 400;
      color: #4974f5;
      line-height: 48px;
      text-align: center;
    }
  }
}
> div:nth-child(2) ~ div {
  margin-top: 20px;
}
</style>
