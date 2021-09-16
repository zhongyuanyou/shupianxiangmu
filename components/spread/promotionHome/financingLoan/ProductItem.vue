<template>
  <div>
    <div class="my-component" @click="onMore(product.id)">
      <div class="item-img">
        <img :src="product.img" />
      </div>
      <div class="item-content">
        <div class="item-title">{{ product.title }}</div>
        <div class="item-desc">{{ product.desc }}</div>
        <div class="item-labels">
          <span
            v-for="(label, index) in product.labels"
            v-show="index < 3"
            :key="index"
            class="item-label"
            >{{ label }}</span
          >
        </div>
        <div class="item-price">
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
          <!-- <span class="item-price-note">最高可借</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { newSpreadApi } from '@/api/spread'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
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
          id: '',
        }
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  methods: {
    onMore(id) {
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
.my-component {
  display: flex;
  // margin-right: 32px;
  margin-bottom: 20px;
  padding: 28px 20px 32px 20px;
  background-color: #fff;
  width: 100%;
  border-radius: 24px;
  .item-img {
    width: 180px;
    height: 180px;
    // background: linear-gradient(180deg, #46494d 5%, #797d83 75%, #414347 100%);
    border-radius: 14px;
    margin-right: 32px;
    img {
      width: 180px;
      height: 180px;
      border-radius: 14px;
    }
  }

  .item-content {
    position: relative;
    width: 100%;
    .item-title {
      // height: 34px;
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 42px;
      margin-bottom: 12px;
      width: 418px;
      .textOverflow(2);
    }
    .item-desc {
      font-size: 22px;
      font-weight: 400;
      color: #222222;
      line-height: 26px;
      width: 418px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 26px;
      margin-bottom: 12px;
    }
    .item-labels {
      display: flex;
      align-items: center;
      overflow: hidden;
      //   width: 418px;
      height: 28px;
      .item-label {
        flex: none;
        background: #f0f2f5;
        border-radius: 4px;
        font-size: 20px;
        color: #5c7499;
        line-height: 20px;
        padding: 4px 6px;
        margin-right: 8px;
      }
    }

    .item-price {
      //   position: absolute;
      //   bottom: -5px;
      margin-top: 29px;
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
</style>
