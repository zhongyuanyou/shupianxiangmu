<template>
  <div class="giftbag">
    <div class="giftbag-box">
      <div class="giftbag-box-title">
        <div class="giftbag-box-title-left">
          {{ giftBagList[0].title || '新人专属礼' }}
        </div>
        <a class="giftbag-box-title-right" @click="jump(giftBagList[0].url)">
          <span @click="jump(giftBagList[0].url)">更多</span>
          <my-icon
            class="next-icon"
            name="list_ic_next"
            size="0.14rem"
            color="#555555"
          ></my-icon>
        </a>
      </div>
      <div class="giftbag-box-content">
        <!-- <div
          class="new-people-giftbag"
          :style="{ backgroundImage: 'url(' + bg + ')' }"
          @click="prompt"
        > -->
        <!-- <span class="new-people-giftbag-title">新人红包</span>
          <span class="new-people-giftbag-price">100<span>元</span></span> -->
        <!-- <div class="new-people-giftbag-icon">
            <my-icon
              class="search-icon"
              name="list_ic_next"
              size="0.1414rem"
              color="#FFFFFF"
            ></my-icon>
          </div> -->
        <!-- </div> -->
        <div class="new-people-giftbag-show">
          <ul>
            <li
              v-for="(item, Gifkey) in giftBagList"
              :key="Gifkey"
              :style="{ backgroundImage: 'url(' + item.headImage + ')' }"
              @click="jump(item.url)"
            >
              <!-- @click="jump(item.url)" -->
              <!-- <div class="head-img"><img :src="item.headImage" alt="" /></div> -->
              <div v-if="Gifkey > 0">
                <!-- <div class="head-img"></div> -->
                <span class="title">{{ item.title }}</span>
                <span class="price">{{ item.price }}</span>
                <!-- <span class="label">{{ item.label }}</span> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from '@chipspc/vant-dgg'
export default {
  name: 'GiftBag',
  components: { [Toast.name]: Toast },
  props: {
    giftBagList: {
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
  },
  data() {
    return {
      bg: 'https://cdn.shupian.cn/sp-pt/wap/images/1gqmwm0x9h8g000.png',
    }
  },
  methods: {
    jump(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
          return
        }
      }
      this.$parent.jumpLink(url)
    },
    prompt() {
      Toast('功能正在建设中，敬请期待')
    },
  },
}
</script>
<style lang="less" scoped>
.giftbag {
  width: 100%;
  padding: 0 20px;
  height: 340px;
  .giftbag-box {
    width: 100%;
    height: 100%;
    padding: 24px 20px 26px 20px;
    background-image: linear-gradient(#ffe4b8, #ffefd5);
    border-radius: 24px;
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
          color: #555555;
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
  }
  .giftbag-box-content {
    width: 100%;
    margin-top: 24px;
    height: 234px;
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .new-people-giftbag {
      width: 180px;
      height: 234px;
      background: linear-gradient(134deg, #fffdf5 0%, #ffecd1 100%);
      border-radius: 12px 0px 50px 12px;
      background-repeat: no-repeat;
      background-position: 0px 0px;
      background-size: 100% 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      .new-people-giftbag-title {
        display: block;
        height: 30px;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #ec5330;
        line-height: 30px;
      }
      .new-people-giftbag-price {
        display: block;
        margin-top: 10px;
        height: 40px;
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #ec5330;
        line-height: 40px;
        > span {
          font-size: 22px;
        }
      }
      .new-people-giftbag-icon {
        width: 46px;
        height: 32px;
        background: #ec5330;
        border-radius: 16px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .new-people-giftbag-show {
      // width: 490px;
      height: 100%;
      // padding: 10px 10px 12px 10px;
      > ul {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > li {
          width: 150px;
          height: 100%;
          margin-left: 8px;
          background-size: cover;
          position: relative;
          .head-img {
            width: 150px;
            height: 140px;
            // background: #f4f4f4;
            border-radius: 8px;
            > img {
              width: 100%;
            }
          }
          .title {
            height: 22px;
            font-size: 22px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 23px;
            margin-top: 16px;
            display: block;
            .textOverflow(1);
            width: 150px;
            position: absolute;
            bottom: 42px;
            left: 10px;
          }
          .price {
            display: block;
            height: 22px;
            font-size: 22px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ec5330;
            line-height: 22px;
            margin-top: 12px;
            position: absolute;
            bottom: 8px;
            left: 10px;
          }
          // .label {
          //   width: 74px;
          //   height: 32px;
          //   border-radius: 15px 32px 32px 2px;
          //   font-size: 18px;
          //   font-family: PingFangSC-Medium, PingFang SC;
          //   font-weight: bold;
          //   color: #ffffff;
          //   line-height: 37px;
          //   background: #ff676a;
          //   text-align: center;
          //   position: absolute;
          //   left: 12px;
          //   top: 96px;
          // }
        }
        > li:first-child {
          width: 180px;
          margin-left: 0px;
          border-radius: 12px 0 0 12px;
        }
      }
    }
  }
}
</style>
