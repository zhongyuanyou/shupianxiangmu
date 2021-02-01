<template>
  <sp-bottombar v-if="isShow" safe-area-inset-bottom class="my-sp-bottom-bar">
    <sp-bottombar-info title avatar :card="card" />
    <sp-bottombar-button
      v-md-map
      v-md:p_IMClick
      :data-im_type="`${md.imMd.type}`"
      :data-im_name="`${md.imMd.name}`"
      type="info"
      :text="leftBtn"
      @click="onlineConsult"
    >
    </sp-bottombar-button>
    <sp-bottombar-button
      v-md-map
      v-md:webClick
      :data-im_name="`${md.telMd.name}`"
      type="primary"
      :text="rightBtn"
      @click="telConsult"
    >
    </sp-bottombar-button>
  </sp-bottombar>
</template>

<script>
import {
  Bottombar,
  BottombarButton,
  BottombarIcon,
  BottombarInfo,
} from '@chipspc/vant-dgg'
export default {
  name: 'FixedBottom',
  components: {
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
    [BottombarInfo.name]: BottombarInfo,
  },
  props: {
    planner: {
      type: Object,
      required: true,
      default: () => {
        return {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
          imgSrc:
            'https://tenant-assets.meiqiausercontent.com/avatars/16984/5uyI/HqRHeYKk3pkWUn04xfOB.jpg',
        }
      },
    },
    md: {
      type: Object,
      default: () => {
        return {
          telMd: { name: ' ', type: '售前' },
          imMd: { name: '工商聚合页_底部_在线咨询', type: '售前' },
        }
      },
    },
  },
  data() {
    return {
      // @--两个按钮文字
      leftBtn: '在线咨询',
      rightBtn: '电话咨询',

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
  computed: {
    card() {
      return {
        imgSrc:
          this.planner.imgSrc ||
          'https://tenant-assets.meiqiausercontent.com/avatars/16984/5uyI/HqRHeYKk3pkWUn04xfOB.jpg',
        cardName: this.planner.name,
        cardSign: '金牌规划师',
        icon: '',
        round: true,
        avatarSize: 40,
      }
    },
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
  mounted() {
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
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
    window.removeEventListener('focusin', this.showBottom)
    window.removeEventListener('focusout', this.isAndroidOrIOS)
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
    // 在线咨询
    onlineConsult() {
      // 7862495547640840192：规划师id。必需
      // 张毅：规划师名字。
      // 107547：工号。可不传
      this.$root.$emit(
        'openIMM',
        this.planner.id,
        this.planner.name || '',
        this.planner.jobNum || '',
        this.planner.imgSrc || ''
      )
    },
    // 电话咨询
    telConsult() {
      if (!this.planner.telephone) return
      window.location.href = `tel:${this.planner.telephone}`
    },
  },
}
</script>

<style lang="less" scoped>
// .my-sp-bottombar覆写了组件原本的样式
.my-sp-bottom-bar {
  width: calc(@spread-page-width - 80px) !important;
  padding: 24px 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  z-index: 10;
}

// @--穿透修改样式
::v-deep .sp-bottombar-info__name {
  display: flex;
}
::v-deep .sp-bottombar-info__avatar {
  display: flex;
}
::v-deep .sp-button--info {
  background: #24ae68;
  border: 1px solid #24ae68;
}
</style>
