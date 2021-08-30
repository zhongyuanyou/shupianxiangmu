<template>
  <div class="nav-bar">
    <div class="nav-content">
      <div v-for="(nav, index) in navList" :key="index" class="navs">
        <img
          :src="`${nav.icon}?x-oss-process=image/resize,m_fill,w_104,h_72,limit_0`"
          alt=""
        />
        <div class="title">{{ nav.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: '企业信贷',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/4evlkrr6rsi0000.png',
          url: '',
        },
        {
          title: '企业抵押贷',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/7vrewu11obk0000.png',
          url: '',
        },
        {
          title: '个人信贷',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/2ot1uzcy2v20000.png',
          url: '',
        },
        {
          title: '个人抵押贷',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/fd1uvha2wps0000.png',
          url: '',
        },
        {
          title: '免费咨询',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/e0sxb8n40qg0000.png',
          url: '',
        },
      ],
    }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    .navs {
      display: flex;
      flex-direction: column;
      align-items: center;
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
</style>
