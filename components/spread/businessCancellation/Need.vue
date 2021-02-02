<template>
  <div class="you-need">
    <Title title="你可能还需办理" />
    <ul class="need-content">
      <li
        v-for="(item, i) of needData"
        :key="i"
        class="need-content-item"
        @click="jumpLink(item.url)"
      >
        <a
          v-md-map
          v-md:webClick
          data-type="售前"
          :data-name="item.mdName"
          href="javascript:;"
          class="a-clear"
        >
          <img :src="item.background" alt="" />
          <div class="need-content-item-box">
            <div class="need-content-item-box--title">{{ item.title }}</div>
            <div class="need-content-item-box--desc">{{ item.desc }}</div>
          </div>
        </a>
      </li>
    </ul>
    <div class="need-tel">
      <ConsultTel
        title="还有疑问？企服专家为您免费解答"
        desc="电话咨询:"
        md-name="工商注销_还有疑问_立即咨询"
      />
    </div>
  </div>
</template>
<script>
import Title from '~/components/spread/businessCancellation/Title'
import ConsultTel from '~/components/spread/businessCancellation/ConsultTel'
export default {
  components: {
    Title,
    ConsultTel,
  },
  data() {
    return {
      needData: [
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/a7b98fnqs0c0000.png',
          url: '/spread/system',
          mdName: '工商注销_还需要办理_体系认证',
          title: '体系认证',
          desc: '快速办理ISO认证',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/87vztpsbuzk0000.png',
          url: '/spread/licence',
          mdName: '工商注销_还需要办理_许可证办理',
          title: '许可证办理',
          desc: '各大热门许可证',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/lcr5190g8k0000.png',
          url: '/spread/tax',
          mdName: '工商注销_还需要办理_财务税筹',
          title: '财务税筹',
          desc: '各大服务包，随心选择',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/dtjfez55sj40000.png',
          url: '/spread/internetQualification',
          mdName: '工商注销_还需要办理_互联网资质',
          title: '互联网资质',
          desc: '专业团队，快捷无忧',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/2nnjq5x4vig0000.png',
          url: '/spread/agency',
          mdName: '工商注销_还需要办理_代理记账',
          title: '代理记账',
          desc: '灵活制定节税方案',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/dq4jr4w4v2o0000.png',
          url: '/spread/bankService',
          mdName: '工商注销_还需要办理_银行服务',
          title: '银行服务',
          desc: '各大银行业务一站式解决',
        },
      ],
    }
  },
  methods: {
    jumpLink(url) {
      this.$router.push(url)
    },
  },
}
</script>
<style lang="less" scoped>
.you-need {
  padding: 32px 40px 0;
}
.need-content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  &-item {
    position: relative;
    width: 215px;
    height: 153px;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 8px;
    margin-bottom: 12px;
    overflow: hidden;
    img {
      width: 215px;
      height: 153px;
    }
    &-box {
      position: absolute;
      width: 215px;
      height: 153px;
      left: 0;
      top: 0;
      padding: 32px 45px 32px 24px;
      overflow: hidden;
      &--title {
        font-size: 26px;
        font-weight: bold;
        color: #222222;
        line-height: 1;
        margin-bottom: 12px;
      }
      &--desc {
        font-size: 22px;
        font-weight: 400;
        color: #555555;
        line-height: 1.27;
      }
    }
  }
}
.need-tel {
  margin-top: -12px;
  margin-left: -40px;
}
.a-clear {
  text-decoration: none;
  color: inherit;
}
</style>
