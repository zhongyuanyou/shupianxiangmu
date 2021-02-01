<template>
  <div class="need">
    <span class="title">您可能还需要办理</span>
    <ul class="productlist">
      <li v-for="(item, index) in ProductList" :key="index">
        <a
          v-md-map
          v-md:webClick
          data-type="售前"
          :data-name="`银行服务_您可能还需要办理_${item.title}`"
          href="javascript:;"
          @click="
            () => {
              $parent.openIM(item.url)
            }
          "
          ><img :src="item.img" alt=""
        /></a>
      </li>
    </ul>
    <ConsultTel title="还有疑问？企服专家为您免费解答" tel="4000-962540" />
    <div class="chips">
      <div>
        <div></div>
        <span>顶呱呱</span>
        <div></div>
      </div>
      <span class="service">顶呱呱企业服务平台，2800万用户的选择</span>
      <span>顶呱呱科技股份版权所有</span>
    </div>
    <div class="positionbox"></div>
  </div>
</template>

<script>
import ConsultTel from '../common/ConsultTel'
export default {
  components: { ConsultTel },
  data() {
    return {
      telephone: '4000962540',
      url: '',
      ProductList: [
        {
          code: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6rs29o764540000.png',
          url: '/spread/system',
          title: '体系认证',
        },
        {
          code: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/82vsavebgnk0000.jpg',
          url: '/spread/agency/',
          title: '代理记账',
        },
        {
          code: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/30xrqmq3bey0000.jpg',
          url: '/spread/licence',
          title: '许可证办理',
        },
        {
          code: 4,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/akgnqp1al0g0000.jpg',
          url: '/spread/internetQualification',
          title: '互联网资质',
        },
        {
          code: 5,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6f1d205sae40000.jpg',
          url: '/spread/tax',
          title: '财务税筹',
        },
        {
          code: 6,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fazszc8imvk0000.jpg',
          url: '/spread/businessCancellation',
          title: '工商注销',
        },
      ],
    }
  },
  created() {},
  methods: {
    // 调起打电话
    call() {
      window.location.href = `tel:${this.telephone}`
    },
  },
}
</script>

<style lang="less" scoped>
.need {
  width: 100%;
  padding: 0 40px;
  margin-top: 22px;
  ::v-deep.cousulttel {
    margin-left: -40px;
  }
  .title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  .productlist {
    display: flex;
    flex-wrap: wrap;
    margin-top: 31px;
    justify-content: space-between;
    > li {
      flex-basis: 32%;
      background: #f8f8f8;
      border-radius: 8px;
      &:nth-child(3) ~ li {
        margin-top: 12px;
      }
      > a {
        width: 100%;
        height: 100%;

        > img {
          width: 100%;
          border-radius: 8px;
        }
      }
    }
  }
  .chips {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      align-items: center;
      > div {
        width: 90px;
        height: 1px;
        background: #c5c5c5;
      }
      > span {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #555555;
        line-height: 31px;
        display: block;
        margin-left: 11px;
        margin-right: 12px;
      }
    }
    .service {
      display: block;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 25px;
      margin-top: 15px;
    }
    > span:last-child {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #c5c5c5;
      line-height: 19px;
      margin-top: 24px;
      margin-bottom: 64px;
    }
  }
  .positionbox {
    height: 144px;
    width: 100%;
  }
}
</style>
