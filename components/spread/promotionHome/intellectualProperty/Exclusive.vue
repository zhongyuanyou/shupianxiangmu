<template>
  <div class="exclusive">
    <!-- 新人专属 -->
    <div class="exclusive-floor" v-show="proTitle.length > 0">
      <div class="exclusive-floor-top">
        <span class="title">新人专属礼</span>
        <a class="more" href="javascript:;">
          <span
            v-md-map
            v-md:webClick
            data-name="工商注册_服务介绍_展开更多"
            @click="onMore('')"
            >更多
            <my-icon
              name="list_ic_next"
              size="0.15rem"
              color="#555555"
            ></my-icon>
          </span>
        </a>
      </div>
      <div class="exclusive-floor-item">
        <div class="event" @click="onMore('')">
          <div class="bgimg"></div>
          <!-- <p class="event-title">新人红包</p>
          <p class="event-content">立享多重优惠</p> -->
        </div>
        <div
          v-for="(item, items) of proTitle"
          :key="items"
          class="product"
          @click="onMore(item.url)"
        >
          <div class="product-img">
            <img :src="item.img" alt="" />
          </div>
          <div class="product-content">
            <div class="product-title">{{ item.title }}</div>
            <div class="product-price">
              {{ item.price }} <span>元</span>
              <span>新人价<i></i></span>
            </div>
            <div class="product-quantity">192人已购买</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 广告介绍 -->
    <div class="advertising" @click="onServe">
      <div
        v-for="(item, pro) of imgContent"
        :key="pro"
        class="advertising-list"
        @click="onServe"
      >
        <p>{{ item.title }}</p>
        <img :src="item.bgImg" alt="" />
        <p>{{ item.assistantTitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Exclusive',
  components: {
    [Toast.name]: Toast,
  },
  props: {
    // 新人循专属
    proTitle: {
      type: Array,
      default: () => {
        return [
          {
            title: '[企业必备] 商标注...',
            price: 488,
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/19k5aeu2fsdc000.png',
            url: '',
          },
          {
            title: '[企业必备] 商标注...',
            price: 488,
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/np4823u4b1c000.png',
            url: '',
          },
        ]
      },
    },
    imgContent: {
      type: Array,
      default: () => {
        return [
          {
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/84tta2vzooc0000.png',
            title: '先服务后收费',
            assistantTitle: '',
          },
          {
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/co9djdht52g0000.png',
            title: '千万补贴',
            assistantTitle: '精选好服务',
          },
          {
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/2cxu5ow9hmhw000.png',
            title: '政府补贴',
            assistantTitle: '政策解析',
          },
          {
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/e0b8ph3n46o0000.png',
            title: '快速通道',
            assistantTitle: '加急办理',
          },
        ]
      },
    },
  },
  methods: {
    onMore(url) {
      if (url !== '') {
        window.location.href = url
      } else {
        Toast('功能正在建设中，敬请期待')
        // this.$root.$emit(
        //   'openIMM',
        //   this.listCount[index].id,
        //   this.listCount[index].name,
        //   this.listCount[index].jobNum,
        //   this.listCount[index].imgSrc
        // )
      }
    },
    onServe() {
      Toast('功能正在建设中，敬请期待')
    },
  },
}
</script>

<style lang="less">
.exclusive {
  width: 710px;
  margin: 0 20px;
  // 新人专属
  .exclusive-floor {
    height: 263px;
    background: #ffffff;
    border-radius: 24px;
    padding-left: 22px;
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      padding: 0 23px 0 0px;
      .title {
        font-size: 32px;
        font-weight: bold;
        color: #222222;
      }
      // 标题更多
      .more {
        font-size: 22px;
        font-weight: 500;
        color: #555555;
        // line-height: 46px;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
    &-item {
      padding: 0 0 24px 0px;
      display: flex;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        display: none;
      }
      .event {
        width: 140px;
        height: 160px;
        background: url(https://cdn.shupian.cn/sp-pt/wap/images/804vx1puq1s0000.png);
        background-size: 100%;
        border-radius: 8px;
        > .bgimg {
          width: 140px;
          height: 160px;
          font-size: 1px;
        }
        .event-title {
          text-align: center;
          font-size: 22px;
          height: 22px;
          margin-top: 26px;
          margin-bottom: 8px;
          font-weight: bold;
          color: #fff9ef;
        }
        .event-content {
          text-align: center;
          font-size: 18px;
          height: 17px;
          font-weight: 400;
          color: #fff9ef;
          white-space: nowrap;
        }
      }
      .product {
        border: 1px solid rgba(205, 205, 205, 0.5);
        margin-left: 16px;
        width: 410px;
        height: 160px;
        background: #ffffff;
        border-radius: 8px;
        display: flex;
        &-img {
          width: 128px;
          height: 128px;
          border-radius: 8px;
          background: #f4f4f4;
          margin: 16px;
          img {
            display: flex;
            width: 128px;
            height: 128px;
          }
        }
        &-content {
          width: 228px;
          margin: 24px 21px 25px 0;
          display: flex;
          font-size: 26px;
          flex-direction: column;
          justify-content: space-between;
          .product-title {
            width: 228px;
            font-size: 26px;
            font-weight: bold;
            color: #222222;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .product-price {
            display: flex;
            align-items: center;
            font-size: 28px;
            font-weight: bold;
            color: #ec5330;
            span:first-child {
              font-size: 22px;
              padding-right: 20px;
            }
            span:last-child {
              position: relative;
              height: 28px;
              display: flex;
              align-items: center;
              background: #ff676a;
              border-radius: 4px;
              font-size: 18px;
              font-weight: 400;
              color: #ffffff;
              font-style: normal;
              text-align: center;
              white-space: normal;
              padding: 6px;
              i {
                content: '';
                width: 0;
                height: 0;
                position: absolute;
                top: 6px;
                left: -7px;
                border-width: 8px 8px 8px 0px;
                border-style: solid;
                border-color: transparent #ff676a transparent transparent;
              }
            }
          }
          .product-quantity {
            font-size: 20px;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
  }
  // 广告介绍
  .advertising {
    margin: 20px 0 20px 0;
    display: flex;
    justify-content: space-between;
    &-list {
      position: relative;
      width: 168px;
      height: 120px;
      background: #ffffff;
      border-radius: 12px;
      font-size: 26px;
      font-weight: bold;
      color: #222222;
      line-height: 32px;
      padding: 20px 0 0 20px;
      p:last-child {
        color: #999999;
        font-size: 24px;
      }
      img {
        position: absolute;
        right: 23px;
        bottom: 2px;
        width: 36px;
        height: 34px;
      }
    }
    &-list:first-child {
      > p {
        width: 100px;
      }
    }
  }
}
</style>
