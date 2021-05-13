<template>
  <div class="advertising">
    <!-- 新人专属 -->
    <div v-show="gift.length > 0" class="exclusive-floor">
      <div class="exclusive-floor-top">
        <span class="title">{{ gift[0].mainTitle }}</span>
        <a class="more" href="javascript:;">
          <span
            v-md-map
            v-md:webClick
            data-name="工商注册_服务介绍_展开更多"
            @click="onMore(gift[0].url)"
            >更多
            <my-icon name="list_ic_next" size="0.14rem"></my-icon>
          </span>
        </a>
      </div>
      <div class="exclusive-floor-item">
        <!-- 红包 -->
        <!-- <div class="event"> -->
        <!-- <p class="event-title">新人红包</p>
          <p class="event-content">多重优惠</p> -->
        <!-- </div> -->
        <div
          v-for="(gifts, proKey) of gift"
          :key="proKey"
          class="product"
          :style="{
            backgroundImage: `url(
              ${gifts.img}
            )`,
          }"
          @click="onMore(gifts.url)"
        >
          <div v-if="proKey > 0">
            <div class="imge">
              <div class="placeholder"></div>
              <!-- <img :src="gifts.img" /> -->
              <span class="icon">新人礼</span>
            </div>
            <div class="title">{{ gifts.title }}</div>
            <div class="price">
              <span>
                {{ gifts.price }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 企服直播 1000万补贴  -->
    <div class="discounts">
      <div
        v-for="(item, proKey) of proDiscounts"
        :key="proKey"
        class="discounts-item"
        @click="onMore(item.url)"
      >
        <div class="title">
          {{ item.proTitle }}
          <span v-if="false" class="title-live">
            <span v-if="proKey === 0" class="living-margin">
              <span class="living-icon">
                <span class="living-bar living-bar1"></span>
                <span class="living-bar living-bar2"></span>
                <span class="living-bar living-bar3"></span>
              </span>
            </span>
            {{ item.label }}
          </span>
        </div>
        <div class="subheading">{{ item.subheading }}</div>
        <div
          class="bgimge"
          :style="{
            backgroundImage: 'url(' + item.bgImg + ')',
          }"
        >
          <!-- :style="{ backgroundImage: 'url(' + item.bgimage + ')' }" -->
          <!-- https://cdn.shupian.cn/sp-pt/wap/images/3s76r4rbngc0000.png -->
          <!-- <div class="imge-title"></div>
          <div class="imge-subheading"></div>
          <div class="imge-detail"></div> -->
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="introduce">
      <div
        v-for="(introduces, proKey) of introduce"
        :key="proKey"
        class="introduce-item"
        @click="onMore(introduces.url)"
      >
        <div class="introduce-title">{{ introduces.title }}</div>
        <div class="introduce-subheading">{{ introduces.subheading }}</div>
        <div class="subheading-img">
          <img :src="introduces.img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Advertising',
  props: {
    // 新人推荐
    gift: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/oqnu6gqeojk000.png',
            url: '',
            title: '有限公司注册',
            price: '0元',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/13ue2gpa99mo000.png',
            url: '',
            title: '一般纳税人…',
            price: '1元/月',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/b9s8062zh1s0000.png',
            url: '',
            title: '服务代金券',
            price: '600元',
          },
        ]
      },
    },
    // 直播 补贴
    proDiscounts: {
      type: Array,
      default: () => {
        return [
          {
            proTitle: '企服直播',
            subheading: '行业大牛助力企业',
            label: '直播中5646',
            bgImg: 'https://cdn.shupian.cn/sp-pt/wap/g3rg0424lp40000.png',
            url: '',
          },
          {
            proTitle: '1000万补贴',
            subheading: '万款服务全补贴',
            label: '优惠放送',
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/3s76r4rbngc0000.png',
            url: '',
          },
        ]
      },
    },
    // 活动广告位
    introduce: {
      type: Array,
      default: () => {
        return [
          {
            title: '99元团',
            subheading: '品质拼团',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/2hzc75qqmue0000.png',
            url: '',
          },
          {
            title: '先服务后收费',
            subheading: '平台担保放心购',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/7qxwt6b084w0000.png',
            url: '',
          },
          {
            title: '领券中心',
            subheading: '服务销冠',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/doh8spl2kkg0000.png',
            url: '',
          },
          {
            title: '帮找服务',
            subheading: '免费高效',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/hpselpo4ug0000.png',
            url: '',
          },
        ]
      },
    },
  },
  // data() {
  //   return {
  //     // 新人专属单位
  //     unit: ['元', '元/月', '元'],
  //     price: [0, 1, 600],
  //   }
  // },
  methods: {
    onMore(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
          return
        }
      }
      this.$parent.jumpLink(url)
      // if (url) {
      //   if (url.indexOf('http') > -1) {
      //     window.location.href = url
      //   }
      // } else {
      //   Toast('功能正在建设中，敬请期待')
      // }
    },
    onServe() {
      Toast('功能正在建设中，敬请期待')
    },
  },
}
</script>

<style lang="less">
.advertising {
  width: 710px;
  margin: 0 20px;
  // 新人专属
  .exclusive-floor {
    height: 340px;
    background: #ffffff;
    border-radius: 24px;
    padding-left: 20px;
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      padding: 0 36px 0 0px;
      .title {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 32px;
      }
      // 标题更多
      .more {
        font-size: 22px;
        font-weight: 500;
        color: #4974f5;
        height: 100%;
        span {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .spiconfont {
            margin-left: 4px;
          }
        }
      }
    }
    &-item {
      padding: 0 0 26px 0px;
      display: flex;
      // flex-wrap: nowrap;
      overflow-y: auto;
      // scrollbar-width: none;
      ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      .event {
        width: 160px;
        height: 234px;
        background: url(https://cdn.shupian.cn/sp-pt/wap/images/1fw0rg3omdeo000.png)
          no-repeat;
        background-size: 100%;
        border-radius: 8px;
        .event-title {
          width: 160px;
          text-align: center;
          margin: 36px 0 8px 0;
          //   height: 30px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 30px;
          text-shadow: 0px 2px 4px rgba(192, 47, 47, 0.5);
        }
        .event-content {
          text-align: center;
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 22px;
        }
      }
      .product {
        width: 160px;
        height: 234px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid rgba(205, 205, 205, 0.5);
        padding: 10px;
        margin-left: 8px;
        background-size: cover;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 16px 0 10px 0;
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 22px;
        }
        .imge {
          position: relative;
          // background-color: rgba(244, 244, 244, 1);
          .placeholder {
            display: block;
            width: 140px;
            height: 140px;
          }
          .icon {
            line-height: 19px;
            display: flex;
            align-items: center;
            position: absolute;
            left: 12px;
            bottom: 12px;
            border-radius: 16px 16px 16px 0;
            background-color: rgba(255, 103, 106, 1);
            font-size: 18px;
            color: white;
            padding: 7px 10px;
          }
        }
        .price {
          font-size: 26px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ec5330;
          line-height: 26px;
          span {
            font-size: 22px;
          }
        }
      }
    }
  }
  //    企服直播 1000万补贴
  .discounts {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
    .discounts-item {
      width: 347px;
      height: 300px;
      background: #ffffff;
      border-radius: 24px;
      padding: 24px 21px 20px 20px;
      .title {
        display: flex;
        align-items: center;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 32px;
        > .title-live {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 32px;
          border-radius: 4px;
          border: 1px solid #ec5330;
          margin-left: 8px;
          font-size: 20px;
          font-weight: 500;
          color: #ec5330;
          line-height: 32px;
          padding-right: 8px;
          padding-left: 8px;
          // 直播动态图标
          .living-icon {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: 16px;
            height: 16px;
            margin-right: 4px;
            .living-bar {
              padding: 0 1px;
              background-color: #ec5330;
              animation-name: living-bar;
              animation-duration: 0.5s;
              animation-iteration-count: infinite;
              animation-direction: alternate-reverse;
              animation-timing-function: linear;
            }
            .living-bar1 {
              animation-delay: 0.2s;
            }
            .living-bar2 {
              animation-delay: 0s;
            }
            .living-bar3 {
              animation-delay: 0.4s;
            }
            @keyframes living-bar {
              from {
                height: 16px;
              }
              to {
                height: 6px;
              }
            }
          }
        }
      }
      .subheading {
        margin: 16px 0 24px 0;
        height: 26px;
        font-size: 26px;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
      }
      .bgimge {
        width: 306px;
        height: 158px;
        background-size: 100%;
        // .imge-title {
        // }
        // .imge-subheading {
        // }
        // .imge-detail {
        // }
      }
    }
  }

  .discounts-item:last-child {
    .title {
      > span img {
        display: none;
      }
    }
  }
  // 介绍
  .introduce {
    display: flex;
    flex-wrap: wrap;
    width: 720px;
    height: 268px;
    border-radius: 24px;
    &-item {
      position: relative;
      width: 354px;
      height: 134px;
      background-color: #fff;
      padding: 32px 31px 30px 20px;
      .introduce-title {
        height: 32px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 32px;
        margin-bottom: 14px;
      }
      .introduce-subheading {
        height: 26px;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
      }
      .subheading-img {
        width: 43px;
        height: 44px;
        line-height: 35px;
        position: absolute;
        top: 45px;
        right: 31px;
        img {
          width: 43px;
          height: 44px;
        }
      }
    }
    .introduce-item:first-child {
      border-radius: 24px 0px 0 0;
      margin: 0 1px 1px 0;
    }
    .introduce-item:nth-child(2) {
      border-radius: 0 24px 0 0;
    }
    .introduce-item:nth-child(3) {
      border-radius: 0 0 0 24px;
    }
    .introduce-item:last-child {
      border-radius: 0 0 24px 0;
      margin: 0 0 0 1px;
    }
  }
}
</style>
