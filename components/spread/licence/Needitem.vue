<template>
  <div class="need">
    <div class="need_title">
      <h2>您可能还需要办理</h2>
    </div>
    <div class="need_content">
      <ul>
        <li v-for="(item, index) in imgList" :key="index">
          <a
            v-md-map
            v-md:webClick
            data-type="售前"
            :data-name="`许可证_还需要办理_${item.title}`"
            href="javascript:void(0);"
            @click="goToPage(item.url)"
          >
            <img :src="item.img" alt="" />
            <div class="need-content-box">
              <div class="need-content-box--title">{{ item.title }}</div>
              <div class="need-content-box--desc">{{ item.desc }}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      imgList: [
        {
          title: '体系认证',
          img: 'https://cdn.shupian.cn/sp-pt/wap/44ihhs6y7h20000.png',
          url: '/spread/system',
          desc: '快速办理ISO认证',
        },
        {
          title: '工商注销',
          img: 'https://cdn.shupian.cn/sp-pt/wap/8uaj10dogso0000.png',
          url: '/spread/businessCancellation',
          desc: '避免工商/税务黑名单',
        },
        {
          title: '工商变更',
          img: 'https://cdn.shupian.cn/sp-pt/wap/dfn3awbv8io0000.png',
          url: '/spread/businessChange',
          desc: '避免高额罚款',
        },
        {
          title: '互联网资质',
          img: 'https://cdn.shupian.cn/sp-pt/wap/cn6fkgv9d8g0000.png',
          url: '/spread/internetQualification',
          desc: '专业团队，快捷无忧',
        },
        {
          title: '代理记账',
          img: 'https://cdn.shupian.cn/sp-pt/wap/9henkyh3mxw0000.png',
          url: '/spread/agency',
          desc: '灵活制定节税方案',
        },
        {
          title: '银行服务',
          img: 'https://cdn.shupian.cn/sp-pt/wap/9jyjto7u3xs0000.png',
          url: '/spread/bankService',
          desc: '各大银行业务一站式解决',
        },
      ],
    }
  },
  methods: {
    goToPage(url) {
      this.$router.push(url)
    },
  },
}
</script>
<style lang="less" scoped>
.need {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  &_title {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 64px;
    > h2 {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      padding-bottom: 5px;
    }
  }
  &_content {
    width: 100%;
    margin-top: 29px;
    > ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > li {
        position: relative;
        width: 215px;
        height: 153px;
        border: 1px solid rgba(205, 205, 205, 0.5);
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        margin-bottom: 12px;
        overflow: hidden;
        > a {
          > img {
            width: 215px;
            height: 153px;
            border-radius: 8px;
          }
          .need-content-box {
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
    }
  }
}
</style>
