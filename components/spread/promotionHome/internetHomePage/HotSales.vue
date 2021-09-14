<template>
  <div class="hot-sales">
    <div class="content-box">
      <div class="title-box">
        <div class="title">热销商品</div>
        <div class="tag">一周热销榜</div>
      </div>
      <div class="hot-img">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/bhn3ppmwi880000.png"
          alt=""
        />
      </div>
      <div class="content-msg">
        <div class="content-left" @click="jumpLink(images.url, images.code)">
          <img :src="images.img" alt="" />
        </div>
        <div class="content-right">
          <div
            v-for="(item, index) in imgList"
            :key="index"
            class="img-box"
            @click="jumpLink(item.url, item.code)"
          >
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    images: {
      type: Object,
      default: () => {
        return {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/flmorlbvogw0000.png',
          url: '',
        }
      },
    },
    imgList: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/7dmtrdrvea40000.png',
            title: '电商运营经典版',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/b0vttcfpcvk0000.png',
            title: '模板建设经典版',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/tbfco0zrry8000.png',
            title: '智慧云推',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/a3hjnoh3jag0000.png',
            title: '域名备案',
            url: '',
          },
        ]
      },
    },
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  methods: {
    jumpLink(url, code) {
      if (this.isInApp && url) {
        const iOSRouters = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: code },
          },
        }
        const androidRouters = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: code },
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouters)
        const androidRouterStr = JSON.stringify(androidRouters)
        this.$appFn.dggJumpRoute({
          iOSRouter: iOSRouterStr,
          androidRouter: androidRouterStr,
        })
      } else if (url.indexOf('http') > -1) {
        window.location.href = url
      } else {
        this.$parent.$refs.plannerIM.onlineConsult()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.hot-sales {
  width: 100%;
  height: 356px;
  padding: 0 20px;
  .content-box {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 24px;
    padding: 24px 20px;
    position: relative;
    .title-box {
      display: flex;
      align-items: center;
      .title {
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #222222;
        font-weight: bold;
      }
      .tag {
        height: 32px;
        border: 1px solid #ec5330;
        border-radius: 4px;
        line-height: 32px;
        padding: 0 8px;
        font-size: 20px;
        color: #ec5330;
        margin-left: 8px;
        font-weight: bold;
      }
    }
    .hot-img {
      width: 104px;
      height: 120px;
      position: absolute;
      top: 10px;
      right: 20px;
      z-index: 0;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .content-msg {
      margin-top: 24px;
      display: flex;
      .content-left {
        flex-shrink: 0;
        width: 202px;
        height: 244px;
        // background-image: linear-gradient(-46deg, #edf4ff 0%, #f7fbff 100%);
        border-radius: 12px;
        border-color: transparent;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          border-color: transparent;
        }
      }
      .content-right {
        margin-left: 12px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        position: relative;
        z-index: 1;
        .img-box {
          width: 222px;
          height: 116px;
          border-radius: 12px;
          display: flex;
          margin-bottom: 12px;
          > img {
            width: 100%;
            height: 100%;
            border-radius: 12px;
          }
        }
      }
    }
  }
}
</style>
