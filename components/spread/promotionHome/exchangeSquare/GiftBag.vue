<template>
  <div class="gift-bag">
    <div class="gift-bag-box">
      <div class="giftbag-box-title">
        <div class="giftbag-box-title-left">新人专属礼</div>
        <a class="giftbag-box-title-right" @click="prompt(giftBagList[0].url)">
          <span>更多</span>
          <my-icon
            class="next-icon"
            name="list_ic_next"
            size="0.14rem"
            color="#4974F5"
          ></my-icon>
        </a>
      </div>
      <div class="giftbag-content-box">
        <div
          class="giftbag-content-left"
          :style="{ backgroundImage: 'url(' + bg + ')' }"
          @click="prompt(giftBagList[0].url)"
        >
          <!-- <span class="title">新人红包</span>
          <span class="title-describe">立享多重优惠</span> -->
        </div>
        <div class="giftbag-content-right">
          <div
            v-for="item in giftBagList"
            :key="item.code"
            class="product"
            @click="prompt(item.url)"
          >
            <a href="javascript:;">
              <div class="img-box"><img :src="item.img" alt="" /></div>
              <span class="product-title">{{ item.title }}</span>
              <span class="product-price">{{ item.price }}</span>
              <span class="product-label">{{ item.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from '@chipspc/vant-dgg'
export default {
  components: {
    [Toast.name]: Toast,
  },
  props: {
    giftBagList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      bg: 'https://cdn.shupian.cn/sp-pt/wap/images/chyvr74rti80000.png',
    }
  },
  methods: {
    prompt(url) {
      if (url) {
        url.indexOf('http') > -1 && (window.location.href = url)
        return
      }
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.gift-bag {
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  .gift-bag-box {
    width: 100%;
    height: 310px;
    background: #ffffff;
    border-radius: 24px;
    padding: 24px 20px;
    .giftbag-box-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0;
      > .giftbag-box-title-left {
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 32px;
      }
      .giftbag-box-title-right {
        display: flex;
        align-items: center;
        > span {
          height: 22px;
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #4974f5;
          line-height: 22px;
          display: block;
          margin-right: 6px;
        }
        .next-icon {
          line-height: 22px;
          margin-top: -2px;
        }
      }
    }
    .giftbag-content-box {
      margin-top: 24px;
      display: flex;
      align-items: center;
      .giftbag-content-left {
        width: 154px;
        height: 206px;
        background: linear-gradient(45deg, #f1510d 0%, #fe7f06 100%);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-repeat: no-repeat;
        background-position: 0px 0px;
        background-size: 100% 100%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;

        > span {
          text-align: center;
        }
        .title {
          display: block;
          height: 28px;
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 28px;
          margin-top: 116px;
        }
        .title-describe {
          display: block;
          height: 20px;
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 20px;
          margin-top: 12px;
        }
      }
      .giftbag-content-right {
        margin-left: 12px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .product {
          width: 160px;
          height: 206px;
          background: #ffffff;
          border-radius: 12px;
          padding: 8px 8px 16px 8px;
          border: 1px solid rgba(205, 205, 205, 0.5);
          position: relative;
          > a {
            width: 100%;
            .img-box {
              width: 144px;
              height: 100px;
              border-radius: 12px 12px 0px 0px;
              display: flex;
              > img {
                width: 100%;
              }
            }
            .product-title {
              display: block;
              font-size: 24px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #222222;
              line-height: 32px;
              margin-top: 12px;
              .textOverflow(1);
            }
            .product-price {
              display: block;
              font-size: 26px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #ec5330;
              line-height: 26px;
              margin-top: 10px;
            }
            .product-label {
              width: 70px;
              height: 28px;
              background: #f1524e;
              border-radius: 12px 0px 0px 0px;
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #ffffff;
              line-height: 34px;
              text-align: center;
              position: absolute;
              right: 4px;
              top: 80px;
            }
          }
        }
      }
    }
  }
}
</style>
