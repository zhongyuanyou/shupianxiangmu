<template>
  <div class="product-item">
    <div class="item" @click="onMore(product)">
      <div class="item-left">
        <img :src="product.imageUrl" alt="" />
      </div>
      <div class="item-right">
        <div class="title-box">
          <div class="title">
            <span v-show="product.activeTag" class="tag">{{
              product.activeTag
            }}</span>
            {{ product.title }}
          </div>
        </div>
        <div class="desc">{{ product.desc }}</div>
        <div class="tab-list">
          <div v-for="(item, index) in product.labels" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="price-box">
          <div v-if="product.priceType === 'PRO_FLOATING_PRICE'" class="price">
            <div class="num1">{{ parseFloat(product.price) }}%</div>
            <div class="unit">服务费</div>
          </div>
          <div v-else class="price">
            <div class="num">
              {{
                product.salesPrice !== '0.00' &&
                product.refConfig &&
                product.refConfig.taskType != 'PRO_WANT_ORDER_DIGEST'
                  ? product.price
                  : ''
              }}
            </div>
            <div class="unit">
              {{
                product.salesPrice !== '0.00' &&
                product.refConfig &&
                product.refConfig.taskType != 'PRO_WANT_ORDER_DIGEST'
                  ? '元'
                  : '面议'
              }}
            </div>
          </div>
          <!-- <div class="sales">销量 {{ product.sales }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      tabList: ['专业服务', '专业服务', '专业服务', '专业服务'],
    }
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
.product-item {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  .item {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 24px;
    padding: 28px 20px;
    display: flex;
    .item-left {
      width: 180px;
      height: 180px;
      border-radius: 12px;
      display: flex;
      flex-shrink: 0;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
      }
    }
    .item-right {
      margin-left: 32px;
      flex: 1;
      position: relative;
      .title-box {
        display: flex;
        align-items: flex-start;
        .title {
          font-size: 32px;
          color: #222222;
          line-height: 45px;
          font-weight: bold;
          .textOverflow(2);
          .tag {
            margin-right: 8px;
            height: 32px;
            background: #ec5330;
            border-radius: 4px;
            font-size: 20px;
            color: #ffffff;
            padding: 0 6px;
            flex-shrink: 0;
            display: inline-block;
            line-height: 32px;
            vertical-align: 3px;
          }
        }
      }
      .desc {
        font-size: 22px;
        color: #555555;
        letter-spacing: 0;
        line-height: 22px;
        margin-top: 9px;
        height: 22px;
        .textOverflow(1);
      }
      .tab-list {
        margin-top: 16px;
        height: 28px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        > div {
          height: 28px;
          padding: 0 6px;
          line-height: 28px;
          font-size: 20px;
          color: #5c7499;
          background: #f0f2f5;
          border-radius: 4px;
          margin-right: 8px;
        }
      }
      .price-box {
        // position: absolute;
        // bottom: 0;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          display: flex;
          .num1 {
            font-size: 36px;
            color: #ec5330;
            line-height: 36px;
            font-weight: bold;
            margin-right: 15px;
          }
          .num {
            font-size: 36px;
            color: #ec5330;
            line-height: 36px;
            font-weight: bold;
          }
          .unit {
            margin-left: 2px;
            font-size: 22px;
            color: #ec5330;
            font-weight: bold;
            margin-top: 3px;
          }
        }
        .sales {
          font-size: 22px;
          color: #999999;
          letter-spacing: 0;
          text-align: right;
        }
      }
    }
  }
}
</style>
