<template>
  <div v-show="rollNav.length > 0" class="nav-content">
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
          <a @click="jump(item)">
            <img v-lazy="item.navigationImageUrl + $ossImgSet(48, 48)" alt="" />
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- S 自定义滚动条 -->
    <div v-if="rollNavHandle.length > 10" class="scroll-box">
      <span><i :style="{ left: scroLeft + '%' }"></i></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imHandle from '@/mixins/imHandle'
import jump from '@/mixins/jump'
export default {
  mixins: [imHandle, jump],
  props: {
    // 滚动导航
    rollNav: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  data() {
    return {
      canScrollWidth: 0,
      scroLeft: 0,
    }
  },

  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    // 滚共导航数处理；个数小于等于10，横向排列；个数大于10，前10个横向排列，后面上下排列
    rollNavHandle() {
      const { rollNav } = this
      if (rollNav.length <= 10) {
        return rollNav
      }
      //   //   超过10个，改变前10个的排列顺序
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
      //   return newRollNav
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
  },
  mounted() {
    const scrollWidth = this.$refs.refScroll.scrollWidth // 容器文档总宽
    const clientWidth = this.$refs.refScroll.clientWidth // 容器可视宽度
    this.canScrollWidth = scrollWidth - clientWidth // 容器可滚动宽度
  },
  methods: {
    scrollHandle() {
      if (!this.canScrollWidth) {
        const scrollWidth = this.$refs.refScroll.scrollWidth // 容器文档总宽
        const clientWidth = this.$refs.refScroll.clientWidth // 容器可视宽度
        this.canScrollWidth = scrollWidth - clientWidth // 容器可滚动宽度
      }
      const scrollLeft = this.$refs.refScroll.scrollLeft // 容器滚动距离
      const scroLeft = Math.floor((scrollLeft / this.canScrollWidth) * 100) // 计算导航容器滚动百分比
      this.scroLeft = scroLeft / 2
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
  },
}
</script>

<style lang="less" scoped>
.nav-content {
  position: relative;
  width: 100%;
  padding: 0 20px;
  .up-and-down {
    margin: 0 auto;
    width: 710px;
    height: 308px;
    background: #ffffff;
    border-radius: 24px;
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
.scroll-box {
  z-index: 99;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  bottom: 20px;
  display: flex;
  justify-content: center;
  // width: 100%;
  height: 8px;
  span {
    position: relative;
    display: flex;
    content: '';
    width: 80px;
    height: 8px;
    background-color: rgba(73, 116, 245, 0.1);
    border-radius: 3px;
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
</style>
