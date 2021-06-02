<template>
  <div class="product-item">
    <div class="content" @click="junmpUrl(item.id)">
      <div class="img-box">
        <img :src="item.img" alt="" />
      </div>
      <div class="content-right">
        <span class="title">{{ item.title }}</span>
        <span class="desc">{{ item.desc }}</span>
        <div class="label">
          <span v-for="(labels, index) in item.label" :key="index">
            {{ labels }}
          </span>
        </div>
        <div class="price-box">
          <span class="price">{{ item.price }}</span>
          <span class="unit">元</span>
          <span class="high">最高可借</span>
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
    item: {
      type: Object,
      default: () => {
        return {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6at0si4uxz80000.png', // 商品图片
          title: '这是两行列表标题这是列表标题这是列表标题', // 商品名称
          desc: '这是描述信息，默认展示一行', // 商品描述
          label: ['月利息低至0.35%', '贷款期限最长24期'], // 商品标签
          price: '100', // 最高可贷金额
          classCodeLevel: '', // 商品的一级分类
          classCode: '', // 商品分类
          id: '', // 商品id
        }
      },
    },
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },

  methods: {
    junmpUrl(id) {
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
  },
}
</script>

<style lang="less" scoped>
.product-item {
  width: 100%;
  height: 284px;
  background: #ffffff;
  padding: 0 40px;
  .content {
    // height: 100%;
    border-bottom: 1px solid #f4f4f4;
    padding: 32px 0;
    display: flex;
    .img-box {
      width: 220px;
      height: 220px;
      border-radius: 12px;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        object-fit: cover;
      }
    }
    .content-right {
      width: 418px;
      margin-left: 32px;
      position: relative;
      > span {
        display: block;
      }
      .title {
        max-height: 84px;
        min-height: 42px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 42px;
        .textOverflow(2);
      }
      .desc {
        max-height: 30px;
        min-height: 30px;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 30px;
        margin-top: 12px;
      }
      .label {
        margin-top: 12px;
        display: flex;
        align-items: center;
        > span {
          display: block;
          max-width: 176px;
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #5c7499;
          line-height: 28px;
          padding: 0 6px;
          background: #f0f2f5;
          border-radius: 4px;
          margin-right: 8px;
          .textOverflow(1);
        }
      }
      .price-box {
        font-size: 0;
        position: absolute;
        bottom: -16px;
        align-items: center;
        .price {
          font-size: 36px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #ec5330;
          line-height: 50px;
        }
        .unit {
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #ec5330;
          line-height: 30px;
          margin-left: 2px;
          margin-top: -6px;
          vertical-align: baseline;
        }
        .high {
          width: 92px;
          height: 28px;
          background: rgba(236, 83, 48, 0.08);
          border-radius: 4px;
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ec5330;
          line-height: 28px;
          padding: 0 6px;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
