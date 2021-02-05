<template>
  <div>
    <div class="my-component">
      <div class="title">你还可能需要办理</div>
      <div class="content">
        <a
          v-for="(item, index) in data"
          :key="index"
          v-md-map
          v-md:webClick
          data-type="售前"
          :data-name="item.mdName"
          class="item"
          :style="{
            backgroundImage: 'url(' + item.img + ')',
          }"
          @click="jumpLink(item.url)"
        >
          <div class="item-title">{{ item.name }}</div>
          <div class="item-desc">{{ item.desc }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PossibleHandle',
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/k1ala1o74ts000.png',
          name: '公司注册',
          mdName: '互联网资质_还需要办理_公司注册',
          url: '/spread/companyRegister',
          desc: '专业代办，无需跑腿',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/36s5qr3v80y0000.png',
          name: '工商注销',
          mdName: '互联网资质_还需要办理_工商注销',
          url: '/spread/businessCancellation',
          desc: '避免工商/税务黑名单',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/81vn0wd5ofk0000.png',
          name: '工商变更',
          mdName: '互联网资质_还需要办理_工商变更',
          url: '/spread/businessChange',
          desc: '避免高额罚款',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4b11r0frbn80000.png',
          name: '体系认证',
          mdName: '互联网资质_还需要办理_体系认证',
          url: '/spread/system',
          desc: '快速办理ISO认证',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/54qz2jap5z00000.png',
          name: '代理记账',
          mdName: '互联网资质_还需要办理_代理记账',
          url: '/spread/agency',
          desc: '灵活制定节税方案',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/29kiy07vusu8000.png',
          name: '银行服务',
          mdName: '互联网资质_还需要办理_银行服务',
          url: '/spread/bankService',
          desc: '各大银行业务一站式解决',
        },
      ],
    }
  },
  methods: {
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    flex: none;
    width: calc(100% - 80px);
    font-size: 40px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 40px;
    margin-bottom: 25px;
  }

  .content {
    flex: none;
    width: calc(100% - 60px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 230px;
      height: 210px;
      background-size: cover;

      .item-title {
        margin-top: 27px;
        padding: 0 34px;
        font-size: 28px;
        font-weight: 600;
        color: #222222;
        line-height: 40px;
      }

      .item-desc {
        margin-top: 5px;
        padding: 0 34px;
        font-size: 22px;
        font-weight: 400;
        color: #999999;
        line-height: 30px;
      }
    }
  }
}
</style>
