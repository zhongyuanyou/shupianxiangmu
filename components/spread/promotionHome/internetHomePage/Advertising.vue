<template>
  <div class="advertising">
    <div class="advertising-box">
      <!-- 限时秒杀 -->
      <div
        class="advertising-limited-time"
        @click="prompt(advertisingList.limitedTime.url)"
      >
        <div class="advertising-limited-time-title">
          <span class="limited-time-title"
            >{{ advertisingList.limitedTime.title }}
          </span>
          <!-- 倒计时 -->
          <!-- <div>
            <sp-count-down :time="time" class="countdown">
              <template #default="timeData">
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </sp-count-down>
          </div> -->
        </div>
        <span class="advertising-limited-time-describe">{{
          advertisingList.limitedTime.describe
        }}</span>
        <div class="limited-time-product">
          <!-- <a
            v-for="(item, index) in advertisingList.limitedTime.product"
            :key="index"
            href="javascript:;"
            @click="prompt"
          > -->
          <div><img :src="advertisingList.limitedTime.imgUrl" alt="" /></div>

          <!-- <div><img :src="item.imgUrl" alt="" /></div>
            <span class="limited-time-product-title">{{ item.name }}</span>
            <span class="limited-time-product-label">{{ item.label }}</span> -->
          <!-- </a> -->
        </div>
      </div>
      <!-- 企服直播板块 -->
      <div class="advertising-live" @click="prompt(advertisingList.live.url)">
        <div class="advertising-live-title">
          <div class="live-title-box">
            <span>{{ advertisingList.live.title }}</span>
            <div v-if="advertisingList.live.label !== ''" class="live-label">
              <span class="living-icon">
                <span class="living-bar living-bar1"></span>
                <span class="living-bar living-bar2"></span>
                <span class="living-bar living-bar3"></span>
              </span>
              {{ advertisingList.live.label }}
            </div>
            <!-- <div v-if="advertisingList.live.label !== ''" class="live-label">
              直播中
            </div> -->
          </div>
          <span class="advertising-live-describe">
            {{ advertisingList.live.describe }}
          </span>
          <div
            class="live-product-box"
            :style="{
              backgroundImage: 'url(' + advertisingList.live.imgUrl + ')',
            }"
          >
            <!-- <div class="live-product-price">
              <span>100</span>
              <span>元</span>
            </div>
            <span class="live-product-describe">行业内大佬</span>
            <div class="live-product-btn" @click="prompt">立即进入</div> -->
          </div>
        </div>
      </div>
      <!-- 千万奖金 -->
      <div
        class="advertising-free-trial"
        @click="prompt(advertisingList.freeTrial.url)"
      >
        <div class="advertising-free-trial-title">
          <span class="free-trial-title">{{
            advertisingList.freeTrial.title
          }}</span>
          <span
            v-if="advertisingList.freeTrial.describe !== ''"
            class="free-trial-label"
            >{{ advertisingList.freeTrial.label }}</span
          >
        </div>
        <span class="advertising-free-trial-describe">{{
          advertisingList.freeTrial.describe
        }}</span>
        <div class="free-trial-product">
          <!-- <a
            v-for="(item, index) in advertisingList.freeTrial.product"
            :key="index"
            href="javascript:;"
            @click="prompt"
          > -->
          <div><img :src="advertisingList.freeTrial.imgUrl" alt="" /></div>
          <!-- <span class="free-trial-product-title">{{ item.name }}</span>
            <span class="free-trial-product-label">{{ item.label }}</span> -->
          <!-- </a> -->
        </div>
      </div>
      <!-- 薯片课程 -->
      <div
        class="advertising-course"
        @click="prompt(advertisingList.course.url)"
      >
        <div class="advertising-course-title">
          <span class="course-title">{{ advertisingList.course.title }}</span>
          <span
            v-if="advertisingList.course.label !== ''"
            class="course-label"
            >{{ advertisingList.course.label }}</span
          >
        </div>
        <span class="advertising-course-describe">{{
          advertisingList.course.describe
        }}</span>
        <div class="course-product">
          <!-- <a
            v-for="(item, index) in advertisingList.course.product"
            :key="index"
            href="javascript:;"
            @click="prompt"
          > -->
          <div><img :src="advertisingList.course.imgUrl" alt="" /></div>
          <!-- <span class="course-product-title">{{ item.name }}</span>
            <span v-show="item.label" class="course-product-label">{{
              item.label
            }}</span> -->
          <!-- </a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CountDown, Toast } from '@chipspc/vant-dgg'
export default {
  components: {
    [CountDown.name]: CountDown,
    [Toast.name]: Toast,
  },
  props: {
    advertisingList: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      time: '1614600000',
      bg: 'https://cdn.shupian.cn/sp-pt/wap/images/bs87fvzhfj40000.png',
    }
  },
  methods: {
    prompt(url) {
      console.log(url)
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.advertising {
  width: 100%;
  height: 593px;
  padding: 0 20px;
  margin-top: 20px;
  .advertising-box {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 24px;
    display: flex;
    flex-wrap: wrap;
    > div {
      flex-basis: 50%;
      border: 1px solid #f4f4f4;
      height: 296px;
    }
    > div:first-child {
      border-bottom-color: transparent;
      border-right-color: transparent;
    }
    > div:nth-child(2) {
      border-bottom-color: transparent;
      border-bottom: none;
    }
    > div:nth-child(3) {
      border-bottom: none;
      border-right-color: transparent;
    }
    > div:last-child {
      border-bottom: none;
      border-right-color: transparent;
    }
    .advertising-limited-time {
      padding: 24px 18px 20px 20px;
      .advertising-limited-time-title {
        display: flex;
        align-items: center;
        .limited-time-title {
          height: 32px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 32px;
        }
        .countdown {
          display: flex;
          align-items: center;
          margin-left: 12px;
          .colon {
            display: block;
            color: #ec5330;
            margin: 0 4px;
          }
          .block {
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 4px;
            color: #ec5330;
            font-size: 20px;
            text-align: center;
            border: 1px solid #ec5330;
            line-height: 32px;
            text-align: center;
          }
        }
      }
      .advertising-limited-time-describe {
        display: block;
        height: 26px;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
        margin-top: 14px;
      }
      .limited-time-product {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          > img {
            width: 100%;
            height: 162px;
          }
        }

        // > a {
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   position: relative;
        // > div {
        //   width: 154px;
        //   height: 124px;
        //   background: #f4f4f4;
        //   border-radius: 12px;
        //   display: flex;
        //   > img {
        //     width: 100%;
        //     height: 100%;
        //   }
        // }
        // > .limited-time-product-title {
        //   display: block;
        //   height: 26px;
        //   font-size: 24px;
        //   font-family: PingFangSC-Regular, PingFang SC;
        //   font-weight: bold;
        //   color: #222222;
        //   line-height: 27px;
        //   margin-top: 14px;
        // }
        // > .limited-time-product-label {
        //   width: 60px;
        //   height: 32px;
        //   background: #ff676a;
        //   border-radius: 16px 32px 32px 0px;
        //   font-size: 18px;
        //   font-family: PingFangSC-Medium, PingFang SC;
        //   font-weight: bold;
        //   color: #ffffff;
        //   line-height: 37px;
        //   text-align: center;
        //   position: absolute;
        //   left: 8px;
        //   top: 84px;
        // }
        // }
      }
    }
    .advertising-live {
      padding: 24px 18px 20px 20px;
      .advertising-live-title {
        .live-title-box {
          display: flex;
          align-items: center;
          line-height: 44px;
          height: 44px;
          > span {
            display: block;
            font-size: 32px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #222222;
            // line-height: 33px;
          }
          > .live-label {
            border-radius: 4px;
            border: 1px solid #ec5330;
            margin-left: 12px;
            font-size: 20px;
            line-height: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ec5330;
            display: flex;
            padding: 4px 8px;
            margin-bottom: 6px;
            // 直播动态图标
            .living-icon {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
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
        .advertising-live-describe {
          display: block;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 36px;
          margin-top: 4px;
        }
        .live-product-box {
          width: 100%;
          height: 162px;
          background: linear-gradient(135deg, #5d85ff 0%, #3b67ec 100%);
          border-radius: 12px;
          margin-top: 12px;
          padding: 22px 0 17px 18px;
          background-repeat: no-repeat;
          background-position: 0px 0px;
          background-size: 100% 100%;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          .live-product-price {
            display: flex;
            align-items: center;
            > span {
              display: block;
              font-size: 24px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: bold;
              color: #ffffff;
              text-shadow: 0px 2px 8px #575fb4;
            }
            > span:first-child {
              font-size: 34px;
            }
            > span:last-child {
              margin-left: 5px;
            }
          }
          .live-product-describe {
            display: block;
            height: 30px;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #e2e9ff;
            line-height: 30px;
            margin-top: 3px;
          }
          .live-product-btn {
            width: 120px;
            height: 36px;
            background: #ffffff;
            box-shadow: 0px 2px 8px 0px #3c79dc;
            border-radius: 4px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #527bf8;
            line-height: 36px;
            text-align: center;
            margin-top: 8px;
          }
        }
      }
    }
    .advertising-free-trial {
      padding: 20px 18px 24px 20px;
      .advertising-free-trial-title {
        display: flex;
        align-items: center;
        .free-trial-title {
          height: 32px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 32px;
        }
        .free-trial-label {
          width: 100px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid #ec5330;
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #ec5330;
          line-height: 30px;
          text-align: center;
          margin-left: 12px;
          margin-top: -2px;
        }
      }
      .advertising-free-trial-describe {
        display: block;
        height: 26px;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
        margin-top: 14px;
      }
      .free-trial-product {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // > a {
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   position: relative;
        > div {
          width: 100%;
          height: 162px;
          background: #f4f4f4;
          border-radius: 12px;
          display: flex;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        > .free-trial-product-title {
          display: block;
          height: 26px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 27px;
          margin-top: 14px;
        }
        > .free-trial-product-label {
          width: 92px;
          height: 32px;
          background: #ff676a;
          border-radius: 16px 32px 32px 0px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 37px;
          text-align: center;
          position: absolute;
          left: 8px;
          top: 84px;
        }
        // }
      }
    }

    .advertising-course {
      padding: 20px 18px 24px 20px;
      .advertising-course-title {
        display: flex;
        align-items: center;
        .course-title {
          height: 32px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 32px;
        }
        .course-label {
          width: 100px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid #4974f5;
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #4974f5;
          line-height: 30px;
          text-align: center;
          margin-left: 12px;
          margin-top: -2px;
        }
      }
      .advertising-course-describe {
        display: block;
        height: 26px;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
        margin-top: 14px;
      }
      .course-product {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // > a {
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   position: relative;
        > div {
          width: 100%;
          height: 162px;
          background: #f4f4f4;
          border-radius: 12px;
          display: flex;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        > .course-product-title {
          display: block;
          height: 26px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 27px;
          margin-top: 14px;
        }
        > .course-product-label {
          width: 92px;
          height: 32px;
          background: #ff676a;
          border-radius: 16px 32px 32px 0px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 37px;
          text-align: center;
          position: absolute;
          left: 8px;
          top: 84px;
        }
      }
      // }
    }
  }
}
</style>
