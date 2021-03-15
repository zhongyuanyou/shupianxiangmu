<template>
  <div class="gift-bag">
    <div class="gift-bag-box">
      <div class="title-box">
        <span>私人律师VIP礼包</span>
        <div class="sales-label">价值1280元</div>
      </div>
      <div class="product-box">
        <a href="">
          <img :src="giftList.giftImg" alt="" />
        </a>
        <div class="product">
          <ul>
            <li v-for="(item, index) in giftList.product" :key="index">
              <a :href="item.url">
                <div class="img-box"><img :src="item.img" alt="" /></div>
                <span class="title">{{ item.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    giftList: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.gift-bag {
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
  .gift-bag-box {
    width: 100%;
    height: 329px;
    background: #ffffff;
    border-radius: 24px;
    padding: 24px 0 24px 20px;
    .title-box {
      display: flex;
      align-items: center;
      > span {
        display: inline-block;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 36px;
        margin-right: 12px;
      }
      .sales-label {
        width: 138px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #ff4218;
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #ff4218;
        line-height: 32px;
        text-align: center;
      }
    }
    .product-box {
      margin-top: 22px;
      display: flex;
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        display: none;
      }
      > a {
        > img {
          display: block;
          width: 221px;
          height: 225px;
        }
      }
      .product {
        margin-left: 20px;
        > ul {
          display: flex;
          align-items: center;
          > li:not(:first-child) {
            margin-left: 20px;
          }
          > li {
            > a {
              width: 157px;
              height: 225px;
              background: #ffffff;
              border-radius: 8px;
              border: 1px solid rgba(205, 205, 205, 0.5);
              padding: 11px 11px 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              .img-box {
                width: 135px;
                height: 145px;
                background: #f4f4f4;
                border-radius: 6px;
                > img {
                  width: 100%;
                }
              }
              .title {
                display: block;
                font-size: 24px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: bold;
                color: #222222;
                line-height: 30px;
                margin-top: 17px;
                .textOverflow(1);
              }
            }
          }
        }
        > ul::after {
          content: '';
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
