<template>
  <div class="management-must">
    <div class="content-box">
      <div class="title-box">
        <div class="title">经营必备</div>
        <div class="more" @click="jump('more')">
          <div>更多</div>
          <my-icon name="list_ic_next" size="0.14rem" color="#999"></my-icon>
        </div>
      </div>
      <div class="content">
        <div class="top-box">
          <div
            v-for="(item, index) in topList"
            :key="index"
            class="img-box"
            @click="jump('top', item.url, item.code)"
          >
            <img
              :src="`${item.img}?x-oss-process=image/resize,m_fill,w_329,h_120,limit_0`"
              alt=""
            />
          </div>
        </div>
        <div class="bottom-box">
          <div
            v-for="(item, index) in bottomList"
            :key="index"
            class="img-box"
            @click="jump('top', item.url, item.code)"
          >
            <img
              :src="`${item.img}?x-oss-process=image/resize,m_fill,w_158,h_176,limit_0`"
              alt=""
            />
          </div>
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
    topList: {
      type: Array,
      default: () => {
        return [
          {
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/bbt895d2jts0000.png',
          },
        ]
      },
    },
    bottomList: {
      type: Array,
      default: () => {
        return [
          {
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/ephzcy1vqe00000.png',
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
    jump(type, url, code) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')

      if (type === 'more') {
        window.location.href = `https://${base}m.shupian.cn/list/transactionList`
      } else if (type === 'top') {
        if (url && this.isInApp) {
          const iOSRouter = {
            path: 'CPSCustomer:CPSCustomer/CPSCAllCategoryResultViewController///push/animation',
            parameter: {
              type: 1,
              classCode: code.split('#')[1],
            },
          }
          const androidRouter = {
            path: '/reform/flutter/classify_result',
            parameter: {
              trade: false,
              classCode: code.split('#')[1],
            },
          }
          const iOSRouterStr = JSON.stringify(iOSRouter)
          const androidRouterStr = JSON.stringify(androidRouter)
          this.$appFn.dggJumpRoute(
            {
              iOSRouter: iOSRouterStr,
              androidRouter: androidRouterStr,
            },
            (res) => {
              console.log(res)
            }
          )
        } else {
          window.location.href = url
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.management-must {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  .content-box {
    width: 100%;
    background: #fff;
    border-radius: 24px;
    padding: 18px 20px 24px;
    .title-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        line-height: 45px;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #222222;
        font-weight: 700;
      }
      .more {
        display: flex;
        align-items: center;
        > div {
          margin-right: 9px;
          font-size: 22px;
          color: #999999;
          font-weight: 700;
        }
      }
    }
    .content {
      margin-top: 18px;
      width: 100%;
      .top-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .img-box {
          width: 329px;
          height: 120px;
          display: flex;
          border-radius: 12px;
          > img {
            width: 100%;
            border-radius: 12px;
          }
        }
      }
      .bottom-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;
        .img-box {
          width: 158px;
          height: 176px;
          border-radius: 12px;
          display: flex;
          > img {
            width: 100%;
            border-radius: 12px;
          }
        }
      }
    }
  }
}
</style>
