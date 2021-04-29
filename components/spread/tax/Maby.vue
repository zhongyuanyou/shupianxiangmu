<template>
  <div class="maby">
    <div class="maby-title">这些业务您可能也需要</div>
    <div class="maby-banner">
      <a v-for="(item, i) of serviceList" :key="i" href="javascript:;">
        <div
          v-md-map
          v-md:webClick
          :data-name="`这些业务您可能也需要_${item.title}`"
          class="maby-banner-item"
          :style="item.bg"
          @click="openImUrl(item.url)"
        >
          <div class="banner-item-box">
            <div class="banner-item-box-title">{{ item.title }}</div>
            <div class="banner-item-box-subtitle">{{ item.subtitle }}</div>
          </div>
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
      serviceList: [
        {
          title: '工商变更',
          subtitle: '各大服务包随心选择',
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/images/1596zop5zoak000.png)',
          },
          url: '/spread/businessChange',
        },
        {
          title: '代理记账',
          subtitle: '灵活制定节税方案',
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/images/3gxiam5vxau0000.png)',
          },
          url: '/spread/agency/',
        },
        {
          title: '其他服务',
          subtitle: '一站服务，省时高效',
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/images/8v6ghjtbd3w0000.png)',
          },
          url: '',
        },
      ],
    }
  },
  methods: {
    // 点击该模块判断是否进行跳转，如果不跳转就调用IM
    openImUrl(url) {
      if (url !== '') {
        this.$router.push(url)
        // window.location.href = url
      } else {
        this.$parent.openIm()
      }
    },
  },
}
</script>

<style scoped lang="less">
.maby {
  padding: 31px 40px 0;
  width: @spread-page-width;
  &-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
    line-height: 40px;
  }
  &-banner {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    &-item {
      width: 207px;
      height: 187px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      padding: 24px 0 0 24px;
      background-size: 100% 100%;
      margin-bottom: 24px;
    }
  }
  &-bottom {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin: 39px 0 31px 0;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  &-last {
    width: 670px;
    height: 80px;
    border: 2px solid #4974f5;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      margin-left: 26px;
      display: flex;
      align-items: center;
      &-text {
        font-size: 24px;
        line-height: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        margin: 0 14px;
      }
      &-number {
        font-size: 40px;
        line-height: 40px;
        font-family: @Bebas;
        font-weight: 400;
        color: #4974f5;
      }
    }
    &-button {
      width: 200px;
      height: 80px;
      background: #4974f5;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      padding: 0;
      border-radius: 0px 8px 8px 0px;
      color: #ffffff;
      margin-right: -1px;
    }
  }
}
.banner-item-box {
  &-title {
    font-size: 28px;
    font-weight: bold;
    color: #222222;
    margin-bottom: 11px;
    line-height: 1;
  }
  &-subtitle {
    font-size: 22px;
    font-weight: 400;
    color: #999999;
    width: 153px;
    line-height: 1.36;
  }
}
</style>
