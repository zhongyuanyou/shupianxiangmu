<template>
  <div v-show="rollNav.length > 0" class="nav-content">
    <div class="content">
      <div
        ref="refScroll"
        :class="rollNavHandle.length > 10 ? 'up-and-down' : 'left-and-right'"
        @scroll="scrollHandle"
      >
        <ul v-if="rollNavHandle && rollNavHandle.length" class="scroll-nav">
          <li
            v-for="(item, index) in rollNavHandle"
            :key="index"
            v-md-map
            v-md:webClick
            :data-name="`${item.name}`"
          >
            <div v-if="item.label">{{ item.label }}</div>
            <a @click="onHerf(item.url, item.code, item.type)">
              <img
                v-if="item.size === 'small'"
                v-lazy="item.imageUrl + $ossImgSet(48, 48)"
                alt=""
              />
              <img
                v-else-if="item.size === 'big'"
                v-lazy="item.imageUrl + $ossImgSet(104, 72)"
                :style="{ width: '52px', height: '36px' }"
                alt=""
              />
              <span
                :style="{
                  fontWeight: `${item.size === 'small' ? '400' : 'bold'}`,
                }"
                >{{ item.name }}</span
              >
            </a>
          </li>
        </ul>
      </div>
      <div v-if="rollNavHandle.length > 10" class="scroll-box">
        <span><i :style="{ left: scroLeft + '%' }"></i></span>
      </div>
      <div
        class="live-box"
        :style="{ marginTop: rollNavHandle.length > 10 ? '10px' : '0' }"
      >
        <div class="live">
          <div class="left">
            <div class="img-first">
              <span class="living-icon">
                <span class="living-bar living-bar1"></span>
                <span class="living-bar living-bar2"></span>
                <span class="living-bar living-bar3"></span>
              </span>
            </div>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/dtcx1vonuxk0000.png?x-oss-process=image/resize,m_fill,w_141,h_28,limit_0"
              alt=""
              class="img-second"
            />
          </div>
          <div class="content" @click="jump()">进入直播</div>
          <div class="right" @click="jump()">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/7x08ukaxwdo0000.png?x-oss-process=image/resize,m_fill,w_8,h_14,limit_0"
              alt=""
              class="img-second"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- S 自定义滚动条 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imHandle from '@/mixins/imHandle'
export default {
  mixins: [imHandle],
  props: {
    // 滚动导航
    rollNav: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  computed: {
    // 滚共导航数处理；个数小于等于10，横向排列；个数大于10，前10个横向排列，后面上下排列
    rollNavHandle() {
      const { rollNav } = this
      if (rollNav.length <= 10) {
        return rollNav
      }
      //   超过10个，改变前10个的排列顺序
      //   const newRollNav = JSON.parse(JSON.stringify(rollNav))
      //   // 取前10个中的奇数项
      //   const oddNavArr = rollNav.filter((item, index) => {
      //     return (index + 1) % 2 !== 0 && index < 10
      //   })
      //   // 取前10个的偶数项
      //   const evenNavArr = rollNav.filter((item, index) => {
      //     return (index + 1) % 2 === 0 && index < 10
      //   })
      //   newRollNav.splice(0, 10, ...oddNavArr.concat(evenNavArr))
      const newRollNav = JSON.parse(JSON.stringify(rollNav))
      const newRollNav1 = JSON.parse(JSON.stringify(newRollNav))
      let length = newRollNav.length
      length = Math.ceil(length / 2)
      let star = []
      star = newRollNav.splice(0, length)
      const end = newRollNav1.splice(length)
      const arr = []
      star.forEach((i, a) => {
        arr.push(star[a])
        if (end[a]) {
          arr.push(end[a])
        }
      })
      return arr
    },
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  data() {
    return {
      canScrollWidth: 0,
      scroLeft: 0,
    }
  },

  mounted() {
    const scrollWidth = this.$refs.refScroll.scrollWidth // 容器文档总宽
    const clientWidth = this.$refs.refScroll.clientWidth // 容器可视宽度
    this.canScrollWidth = scrollWidth - clientWidth // 容器可滚动宽度
  },
  methods: {
    scrollHandle() {
      const scrollLeft = this.$refs.refScroll.scrollLeft // 容器滚动距离
      const scroLeft = Math.floor((scrollLeft / this.canScrollWidth) * 100) // 计算导航容器滚动百分比
      this.scroLeft = scroLeft / 2
    },
    onHerf(url, code, type) {
      // if (url) {
      //   if (url.indexOf('http') > -1) {
      //     window.location.href = url
      //     // return
      //   }
      // }
      if (url && type !== 'tool' && this.isInApp) {
        const iOSRouter = {
          path: 'CPSCustomer:CPSCustomer/CPSCAllCategoryResultViewController///push/animation',
          parameter: {
            type: 1,
            classCode: code,
          },
        }
        const androidRouter = {
          path: '/reform/flutter/classify_result',
          parameter: {
            trade: false,
            classCode: code,
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
      } else if (url === '/') {
        const planner = {
          mchUserId: this.planner.id,
          userName: this.planner.name,
          type: this.planner.type,
          msgParam: {},
          templateIds: '',
        }
        if (this.isInApp) {
          this.uPIM(planner)
        } else {
          this.uPIM(planner)
        }
      } else {
        window.location.href = url
      }
      //   this.$parent.jumpLink(url, description, execution)
    },
    jumpHandle(item) {
      let url = ''
      switch (item.navigationWay) {
        // 跳转内链
        case 1:
          url = item.wapRoute
          break
        // 跳转外链
        case 2:
          url = item.url
          break
        // 跳转图片链接
        case 3:
          url = {
            name: 'img',
            params: {
              url: item.imageUrl,
            },
          }
          break
        default:
          url = item.url
          break
      }
      return url
    },
    jump() {
      this.$parent.jump()
    },
  },
}
</script>

<style lang="less" scoped>
.nav-content {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  .content {
    width: 100%;
    background: #ffffff;
    border-radius: 24px;
    padding: 0 0 20px;
    .up-and-down {
      margin: 0 auto;
      width: 710px;
      height: 298px;
      border-radius: 24px;
      background: #ffffff;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        display: none;
      }
      .scroll-nav {
        display: flex;
        flex-flow: column wrap;
        align-content: flex-start;
        height: 264px;
        li {
          width: 20%;
          margin-top: 29px;
          position: relative;
          &:last-child {
            position: relative;
            &::before {
              position: absolute;
              right: -24px;
              top: 0;
              content: '';
              width: 24px;
              height: 16px;
            }
          }
          div {
            height: 28px;
            background: #ff6363;
            border-radius: 14px 14px 14px 0px;
            border: 2px solid #ffffff;
            position: absolute;
            left: 60px;
            top: -8px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ffffff;
            line-height: 27px;
            text-align: center;
          }
          a {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: space-between;
            img {
              width: 48px;
              height: 48px;
              margin-top: 8px;
            }
            span {
              font-size: 24px;
              line-height: 30px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #222222;
              margin-top: 13px;
              white-space: nowrap;
              .textOverflow(1);
              width: 100%;
            }
          }
        }
      }
    }
    .left-and-right {
      overflow: hidden;
      // width: 710px;
      width: 100%;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      padding: 8px 0px 40px;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          margin-top: 29px;
          width: 20%;
          position: relative;
          &:last-child {
            position: relative;
            &::before {
              position: absolute;
              right: -24px;
              top: 0;
              content: '';
              width: 24px;
              height: 16px;
            }
          }
          div {
            height: 28px;
            background: #ff6363;
            border-radius: 14px 14px 14px 0px;
            border: 2px solid #ffffff;
            position: absolute;
            left: 60px;
            top: -8px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ffffff;
            line-height: 27px;
            text-align: center;
          }
          a {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: space-between;
            img {
              width: 48px;
              height: 48px;
              margin-top: 8px;
            }
            span {
              font-size: 24px;
              line-height: 30px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: #222222;
              margin-top: 13px;
              white-space: nowrap;
              .textOverflow(1);
            }
          }
        }
      }
    }
  }
}
.scroll-box {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 20px;
  padding-top: 3px;
  margin-top: -20px;
  span {
    position: relative;
    display: flex;
    content: '';
    width: 80px;
    height: 8px;
    background-color: rgba(73, 116, 245, 0.1);
    border-radius: 4px;
    i {
      position: absolute;
      top: 0;
      width: 40px;
      height: 6px;
      background: #4974f5;
      border-radius: 3px;
    }
  }
}
.live-box {
  width: 100%;
  height: 72px;

  margin-top: 20px;
  padding: 0 20px;
  .live {
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    border-radius: 12px;
    padding: 22px 24px;
    display: flex;
    align-items: center;
    .left {
      display: flex;
      .img-first {
        border-radius: 4px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #4974f5;
        width: 28px;
        height: 28px;
        line-height: 32px;
        display: flex;
        margin-bottom: 6px;
        // 直播动态图标
        .living-icon {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 28px;
          height: 28px;
          margin-right: 4px;

          .living-bar {
            padding: 0 3px;
            background-color: #4974f5;
            animation-name: living-bar;
            animation-duration: 0.5s;
            animation-iteration-count: infinite;
            animation-direction: alternate-reverse;
            animation-timing-function: linear;
          }
          .living-bar1 {
            animation-delay: 0.2s;
          }
          .living-bar2 {
            animation-delay: 0s;
          }
          .living-bar3 {
            animation-delay: 0.4s;
          }
          @keyframes living-bar {
            from {
              height: 28px;
            }
            to {
              height: 16px;
            }
          }
        }
      }
      > img {
        display: block;
        width: 100%;
      }

      .img-second {
        width: 141px;
        height: 28px;
        margin-left: 9px;
      }
    }
    .content {
      width: 377px;
      font-size: 26px;
      color: #555555;
      text-align: right;
      margin-left: 34px;
      height: 37px;
      background: #f8f8f8;
    }
    .right {
      width: 8px;
      height: 14px;
      margin-left: auto;
      display: flex;
      > img {
        width: 100%;
      }
    }
  }
}
</style>
