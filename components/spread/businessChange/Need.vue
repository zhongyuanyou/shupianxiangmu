<template>
  <div class="need">
    <span class="title">您可能还需要办理</span>
    <ul class="productlist">
      <li v-for="(item, index) in ProductList" :key="index">
        <a
          v-md-map
          v-md:webClick
          :data-name="`${needlist[index]}`"
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
      needlist: [
        '工商变更_您可能还需要办理_工商注册',
        '工商变更_您可能还需要办理_税务筹划',
        '工商变更_您可能还需要办理_其他服务',
      ],
      ProductList: [
        {
          code: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6tk67e93mps0000.jpg',
          url: '/spread/companyRegister',
        },
        {
          code: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6q2l9tmcb7g0000.jpg',
          url: '/spread/tax',
        },
        {
          code: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/aqftfdwnwz40000.jpg',
          url: '',
        },
      ],
    }
  },
  created() {},
  methods: {
    // 调起拨打电话
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
  ::v-deep.cousulttel-title {
    margin-top: 64px;
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
      > a {
        > img {
          width: 100%;
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
