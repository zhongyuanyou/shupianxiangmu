<template>
  <div class="nav-bar">
    <div class="nav-content">
      <div
        class="content"
        :style="{ overflowX: navList.length < 5 ? 'hidden' : '' }"
      >
        <div
          v-for="(nav, index) in navList"
          :key="index"
          class="navs"
          :style="{ marginRight: navList.length > 5 ? '16px' : '' }"
          @click="jump(nav.url)"
        >
          <img
            :src="`${nav.icon}?x-oss-process=image/resize,m_fill,w_104,h_72,limit_0`"
            alt=""
          />
          <div class="title">{{ nav.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array,
      default: () => {
        return [
          {
            title: '小程序',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/g8as29uy5e00000.png',
            url: '',
          },
          {
            title: '电商运营',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/9w68yknwru00000.png',
            url: '',
          },
          {
            title: '网站建设',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f1l4zlbscns0000.png',
            url: '',
          },
          {
            title: '营销推广',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/2m2m7l2drfs0000.png',
            url: '',
          },
          {
            title: '定制开发',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/7ratpz2wb1w0000.png',
            url: '',
          },
        ]
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    jump(url) {
      if (url.indexOf('http') !== -1) {
        window.location.href = url
      }
    },
  },
}
</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  height: 192px;
  padding: 0 20px;
  .nav-content {
    width: 100%;
    height: 192px;
    background: #ffffff;
    border-radius: 24px;
    padding: 40px 20px;
    .content::-webkit-scrollbar {
      display: none;
    }
    .content {
      width: 100%;
      display: flex;
      align-items: center;
      overflow-x: scroll;
      overflow-y: hidden;
      justify-content: space-between;
      .navs {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        // margin-right: 29px;
        > img {
          width: 104px;
          height: 72px;
        }
        .title {
          font-size: 24px;
          color: #222222;
          margin-top: 16px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
