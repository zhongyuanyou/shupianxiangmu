<template>
  <div class="product-card">
    <div class="item" @click="onMore(product.id)">
      <div class="item-left">
        <img :src="product.img" alt="" />
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
        <div
          v-if="product.label && product.label.length !== 0"
          class="tab-list"
        >
          <div v-for="(item, index) in product.label" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="cycle">办理周期：{{ product.cycle || '--' }}天</div>
        <div class="price-box">
          <div v-if="product.priceType === 'PRO_FLOATING_PRICE'" class="price">
            <div class="num1">{{ product.currentPrice }}%</div>
            <div class="unit">服务费</div>
          </div>
          <div v-else class="price">
            <div class="num">
              {{
                product.salesPrice !== '0.00' &&
                product.refConfig &&
                product.refConfig.taskType != 'PRO_WANT_ORDER_DIGEST'
                  ? product.currentPrice
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
        return {
          code: 1,
          img: 'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png',
          title: '成都地区5年餐饮公司出售带全套证件',
          label: ['有保障', '1对1服务', '店铺干净'],
          currentPrice: 1000000,
          originalPrice: 0,
          sales: 121,
          url: '',
          desc: '',
          cycle: '6',
          id: 111,
        }
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
    onMore(id) {
      if (!id) return
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      if (this.isInApp) {
        const iOSRouters = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: id },
          },
        }
        const androidRouters = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: id },
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouters)
        const androidRouterStr = JSON.stringify(androidRouters)
        this.$appFn.dggJumpRoute({
          iOSRouter: iOSRouterStr,
          androidRouter: androidRouterStr,
        })
      } else {
        window.location.href = `https://${base}m.shupian.cn/detail?productId=${id}`
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
.product-card {
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
      width: 220px;
      height: 220px;
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
          //   margin-left: 8px;
          font-size: 32px;
          color: #222222;
          line-height: 42px;
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

      .tab-list {
        margin-top: 12px;
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
      .cycle {
        font-size: 22px;
        color: #222222;
        margin-top: 16px;
      }
      .price-box {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .price {
          display: flex;

          .num {
            font-size: 36px;
            color: #ec5330;
            line-height: 36px;
            font-weight: bold;
          }
          .num1 {
            font-size: 36px;
            color: #ec5330;
            line-height: 36px;
            font-weight: bold;
            margin-right: 15px;
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
