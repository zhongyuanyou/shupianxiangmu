<template>
  <div class="seal-maby">
    <div class="seal-maby-title">你可能还需要办理</div>
    <div class="seal-maby-content">
      <a v-for="(item, index) of tabs" :key="index" href="javascript:;">
        <div
          v-md-map
          v-md:webClick
          :data-name="`可能还需要办理_${item.name}`"
          :style="{ backgroundImage: 'url(' + item.img + ')' }"
          class="seal-maby-content-item"
          @click="tabUrl(item.url)"
        >
          <p class="seal-maby-content-item-name">{{ item.name }}</p>
          <p class="seal-maby-content-item-ps">{{ item.ps }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Maby',
  data() {
    return {
      tabs: [
        {
          name: '工商注销',
          ps: '避免工商/税务黑名单',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7iyzjygzrag0000.jpg',
          url: '/spread/businessCancellation',
        },
        {
          name: '代理记账',
          ps: '灵活制定节税方案',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7l2nukw6b800000.jpg',
          url: '/spread/agency',
        },
        {
          name: '许可证办理',
          ps: '各大热门许可证',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2s8xj8kabm60000.jpg',
          url: '/spread/licence',
        },
        {
          name: '互联网资质',
          ps: '专业团队，快捷无忧',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1zi7g3iaut40000.jpg',
          url: '/spread/internetQualification',
        },
        {
          name: '财务稅筹',
          ps: '各大服务包，随心选择',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/dhly0phjfzk0000.jpg',
          url: '/spread/tax',
        },
        {
          name: '银行服务',
          ps: '各大银行业务一站式解决',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5bels1i08xk0000.jpg',
          url: '/spread/bankService',
        },
      ],
    }
  },
  methods: {
    // 点击该模块判断是否进行跳转，如果不跳转就调用IM
    tabUrl(url) {
      this.$router.push(url)
      // window.location.href = url
    },
  },
}
</script>

<style scoped lang="less">
a {
  text-decoration: none;
  color: inherit;
}
.seal-maby {
  margin: 0 40px 52px;
  font-family: PingFang SC;
  &-title {
    margin-bottom: 31px;
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      width: 215px;
      height: 163px;
      background: #f8f8f8;
      border: 1px solid rgba(205, 205, 205, 0.3);
      border-radius: 8px;
      margin-bottom: 12px;
      background-size: 100% 100%;
      background-position: center;
      padding: 33px 0 0 24px;
      &-name {
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 1;
        margin-bottom: 19px;
      }
      &-ps {
        font-size: 22px;
        font-weight: 400;
        color: #555555;
        line-height: 30px;
      }
    }
  }
}
</style>
