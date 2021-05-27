<template>
  <div class="need">
    <span class="title">您可能还需要办理</span>
    <ul class="productlist">
      <li v-for="(item, index) in ProductList" :key="index">
        <a
          v-md-map
          v-md:webClick
          :data-name="`${needlist[index]}`"
          :style="{ backgroundImage: 'url(' + item.bgimage + ')' }"
          href="javascript:;"
          @click="
            () => {
              $parent.openIM(item.url)
            }
          "
        >
          <span>{{ item.title }}</span>
          <span>{{ item.subtitle }}</span></a
        >
      </li>
    </ul>
    <!--  -->
    <ConsultTel
      title="对代理记账有疑问？企服专家为您免费解答"
      tel="4000-962540"
    />
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
      needlist: [
        '代理记账_您可能还需要办理_工商注册',
        '代理记账_您可能还需要办理_税务筹划',
        '代理记账_您可能还需要办理_其他服务',
      ],
      ProductList: [
        {
          code: 1,
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/4je0tke40qo0000.jpg',
          url: '/spread/companyRegister',
          title: '工商注册',
          subtitle: '专家护航，注册无忧',
        },
        {
          code: 2,
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/bbgyc5pc5140000.jpg',
          url: '/spread/tax',
          title: '税务筹划',
          subtitle: '落地园区多，税筹效果好',
        },
        {
          code: 3,
          bgimage: 'https://cdn.shupian.cn/sp-pt/wap/images/c62qcfb0z5s000.jpg',
          url: '',
          title: '其他工商服务',
          subtitle: '一站式服务，省时高效',
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
      border: 1px solid rgba(205, 205, 205, 0.3);
      border-radius: 8px;
      width: 215px;
      height: 163px;
      border-radius: 8px;
      > a {
        width: 100%;
        height: 100%;
        display: block;
        background-repeat: no-repeat;
        background-position: 0px 0px;
        background-size: 100% 100%;
        border-radius: 8px;
        padding: 32px 0 0 24px;
        > span:first-child {
          display: block;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 27px;
        }
        > span:last-child {
          margin-top: -5px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 32px;
          display: block;
          margin-top: 19px;
          white-space: pre-wrap;
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
