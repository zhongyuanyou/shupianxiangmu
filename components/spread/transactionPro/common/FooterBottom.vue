<template>
  <div>
    <div class="footer" v-if="isShow">
      <div class="service">
        <img :src="planner.imgSrc" alt="" />
        <div class="waiter">
          <p class="name">智能精选</p>
          <p class="level">金牌规划师</p>
        </div>
      </div>

      <!-- S 右侧按钮 -->
      <div class="btns">
        <button
          v-md-map
          v-md:p_IMClick
          :data-name="`${md.imMd.name}`"
          :data-im_type="`${md.imMd.type}`"
          @click="onlineConsult"
        >
          在线咨询
        </button>
        <button
          v-md-map
          v-md:webClick
          :data-name="`${md.telMd.name}`"
          @click="telConsult"
        >
          电话联系
        </button>
      </div>
      <!-- E 右侧按钮 -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    planner: {
      type: Object,
      default: () => {
        return {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
        }
      },
    },
    md: {
      type: Object,
      default: () => {
        return {
          telMd: {
            name: ' ',
            type: '售前',
          },
          imMd: {
            name: '工商聚合页_底部_在线咨询',
            type: '售前',
          },
        }
      },
    },
  },
  data() {
    return {
      // @--组件是否显示
      isShow: true,
      userAgent: '', // 当前机型的系统

      // @--安卓机判断组件是否显示的参数
      docHeight: 0, // 页面初始的屏幕高度
      showHeight: 0, // 实时屏幕高度，<=页面初始高度

      // @--IOS机判断组件是否显示的参数
      isInputEle: false, // 当前点击元素是否是INPUT标签元素
    }
  },
  watch: {
    showHeight() {
      if (this.docHeight > this.showHeight + 120) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
    window.removeEventListener('focusin', this.showBottom)
    window.removeEventListener('focusout', this.isAndroidOrIOS)
  },
  mounted() {
    // @-- 监听窗口大小和横竖屏变化
    // const _this = this
    // const windheight = window.innerHeight
    // window.addEventListener(
    //   'orientationchange',
    //   function () {
    //     if (window.orientation === 90) {
    //       location.reload()
    //     }
    //   },
    //   false
    // )
    // window.onresize = () => {
    //   const docheight = window.innerHeight
    //   if (docheight < windheight) {
    //     _this.$refs.fixed.style.position = 'relative'
    //     _this.$refs.fixed.style.marginTop = '-100px'
    //   } else {
    //     _this.$refs.fixed.style.position = 'fixed'
    //   }
    // }

    // @--Android系统：添加事件监听
    if (this.isAndroidOrIOS() === 'Android') {
      this.docHeight = document.body.clientHeight
      // window.onresize监听页面高度的变化
      window.addEventListener('resize', this.windowResize)
    }

    // @--IOS系统：添加事件监听
    if (this.isAndroidOrIOS() === 'IOS') {
      document.body.addEventListener('focusin', this.hideBottom)
      document.body.addEventListener('focusout', this.showBottom)
    }
  },
  methods: {
    // @--事件回调函数
    windowResize() {
      const vm = this
      return (() => {
        vm.showHeight = document.body.clientHeight
      })()
    },
    showBottom(event) {
      if (event.target.tagName === 'INPUT') this.isShow = true
    },
    hideBottom(event) {
      if (event.target.tagName === 'INPUT') this.isShow = false
    },

    // @--判断页面所在设备的系统
    isAndroidOrIOS() {
      const ua = navigator.userAgent
      const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
      const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

      if (isAndroid) {
        this.userAgent = 'Android'
        console.log('安卓系统')
        return 'Android'
      }
      if (isiOS) {
        this.userAgent = 'IOS'
        console.log('IOS系统')
        return 'IOS'
      }
      console.log(ua)
    },

    // @--按钮
    // 在线咨询：工商首页页面的在线咨询走美恰
    onlineConsult() {
      window.spptMqMi.showPanel()
    },
    // 电话咨询
    telConsult() {
      window.location.href = `tel:4000962540`
    },
  },
}
</script>

<style lang="less" scoped>
.footer {
  width: 750px;
  height: 102px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 98;
  justify-content: space-between;
  padding: 11px 24px;
  .service {
    display: flex;
    width: 215px;
    justify-content: space-between;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: fill;
    }
    .waiter {
      .name {
        font-size: 28px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .level {
        font-size: 22px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .btns {
    display: flex;
    justify-content: space-between;
    button {
      width: 222px;
      height: 80px;
      background: linear-gradient(
        90deg,
        rgba(255, 97, 78, 1),
        rgba(250, 119, 105, 1)
      );
      border-radius: 40px;
      font-size: 28px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      &:last-child {
        background: linear-gradient(
          90deg,
          rgba(70, 83, 224, 1),
          rgba(89, 114, 233, 1)
        );
      }
    }
  }
}
</style>
