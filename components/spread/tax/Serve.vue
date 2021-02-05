<template>
  <div class="serve">
    <div class="serve-text">税筹服务介绍</div>
    <div
      v-for="(item, i) of serveData"
      :key="i"
      v-show="i > num ? false : true"
      v-md-map
      v-md:webClick
      :data-name="`税筹服务介绍_${item.productName}_在线咨询`"
      class="serve-card"
      @click="openIM(item.detailsUrl, item.planner)"
    >
      <div class="serve-card-bg"></div>
      <div class="serve-card-text">
        <p class="serve-card-text-title">{{ item.showName }}</p>
        <p class="serve-card-text-subtitle">{{ item.slogan }}</p>
      </div>
      <div class="serve-card-activity">
        <p class="serve-card-activity-text">限时活动</p>
      </div>
      <div class="serve-card-promise">
        <div
          v-for="(val, index) of item.label"
          :key="index"
          class="serve-card-promise-item"
        >
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/f7ec4mvmvrk0000.png"
            alt=""
          />
          <p class="serve-card-promise-item-text">{{ val }}</p>
        </div>
      </div>
      <div class="serve-card-first">
        <div>
          <div class="serve-card-first-big">{{ item.num1 }}</div>
          <div class="serve-card-first-small">在线咨询</div>
        </div>
        <div class="serve-card-first-hr"></div>
        <div>
          <div class="serve-card-first-big">{{ item.num2 }}</div>
          <div class="serve-card-first-small">累计成交</div>
        </div>
        <div class="serve-card-first-hr"></div>
        <div>
          <div class="serve-card-first-big">{{ item.num3 }}</div>
          <div class="serve-card-first-small">成功案列</div>
        </div>
      </div>
      <div class="serve-card-second">
        <div class="serve-card-second-left">
          <span>{{ item.price }}</span
          ><span>元起</span>
          <!--          <strike>488.00元</strike>-->
        </div>
        <div class="serve-card-second-right">
          <a href="javascript:;">
            <div
              v-md-map
              v-md:p_IMClick
              :data-name="`税筹服务介绍_${item.productName}_在线咨询`"
              data-im_type="售前"
              class="serve-card-second-right-person"
              :style="
                item.person === ''
                  ? {
                      backgroundImage: `url(http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg)`,
                    }
                  : { backgroundImage: `url(${item.planner.person})` }
              "
              @click="im(item.planner)"
            ></div>
          </a>
          <a href="javascript:;">
            <div
              v-md-map
              v-md:webClick
              :data-name="`税筹服务介绍_${item.productName}_在线咨询`"
              class="serve-card-second-right-rap"
              @click="im(item.planner)"
            >
              <my-icon
                name="notify_ic_chat"
                color="#4974F5"
                size="0.4rem"
                class="icon"
              ></my-icon>
            </div>
          </a>
          <a href="javascript:;">
            <div
              v-md-map
              v-md:webClick
              data-name="税筹服务介绍_增值税筹划_拔打电话"
              class="serve-card-second-right-rap"
              @click="call(item.planner.phone)"
            >
              <my-icon
                name="notify_ic_tel"
                color="#4974F5"
                size="0.4rem"
                class="icon"
              ></my-icon>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div v-show="serveData.length > 3" class="show-more-btn" @click="showMore">
      <span
        v-show="more"
        v-md-map
        v-md:webClick
        data-type="售前"
        data-name="税务筹划页面_更多服务"
        >更多服务</span
      >
      <span
        v-show="close"
        v-md-map
        v-md:webClick
        data-type="售前"
        data-name="税务筹划页面_收起"
        >收起</span
      >
      <my-icon
        v-show="more"
        name="tab_ic_all_n"
        size="0.2rem"
        class="input-ic-open"
        color="#cccccc"
      ></my-icon>
      <my-icon
        v-show="close"
        name="tab_ic_all_s"
        size="0.2rem"
        class="input-ic-open"
        color="#cccccc"
      ></my-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Serve',
  props: {
    // 每个模块的信息
    serveData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      url: '',
      more: true,
      close: false,
      num: 2,
    }
  },
  methods: {
    // 现实更多
    showMore() {
      if (this.more) {
        this.close = true
        this.more = false
        this.num = this.serveData.length
      } else {
        this.close = false
        this.more = true
        this.num = 2
      }
    },
    // 电话图标调用电话接口
    call(tel) {
      window.location.href = `tel:${tel}`
      event.stopPropagation()
    },
    // 信息图标直接调用IM
    im(planner) {
      this.plannerIm(planner)
      event.stopPropagation()
    },
    plannerIm(planner) {
      const guiHuaShi = planner
      this.$root.$emit(
        'openIMM',
        guiHuaShi.id,
        guiHuaShi.name || '',
        guiHuaShi.jobNum || '',
        planner.person
      )
    },
    // 跳转产品详情
    openIM(url, planner) {
      // url不为空跳转详情页
      if (url !== null) {
        window.location.href = url
      } else {
        // url wei空唤起规划师
        this.plannerIm(planner)
      }
    },
  },
}
</script>

<style scoped lang="less">
.serve {
  margin: 50px 40px 0;
  &-text {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin: 0 0 32px 10px;
    line-height: 40px;
  }
  &-card {
    position: relative;
    width: 670px;
    // height: 472px;
    background-size: 101% 101%;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid rgba(205, 205, 205, 0.3);
    border-radius: 4px;
    margin-bottom: 25px;
    &-promise {
      margin-bottom: 64px;
      margin-top: 32px;
      display: flex;
      padding-left: 32px;
      //   justify-content: space-around;

      &-item {
        display: flex;
        align-items: center;
        > img {
          width: 52px;
          height: 52px;
          margin-right: 5px;
          transform: scale(0.5);
        }
        &-text {
          font-size: 26px;
          font-weight: 400;
          color: #555555;
          // line-height: 52px;
          line-height: 1;
        }
      }
      &-item:not(:first-child) {
        margin-left: 40px;
      }
    }

    &-activity {
      display: flex;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      width: 63px;
      height: 71px;
      background: url(https://cdn.shupian.cn/sp-pt/wap/images/312ntaxb9au0000.png)
        no-repeat 100% 100%;
      background-size: 100% 100%;
      &-text {
        width: 50px;
        height: 48px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        -webkit-transform: scale(0.84);
      }
    }
    &-text {
      position: absolute;
      top: 32px;
      left: 32px;
      &-title {
        font-size: 32px;
        font-weight: bold;
        color: #222222;
        line-height: 1;
        margin-bottom: 15px;
      }
      &-subtitle {
        font-size: 22px;
        font-weight: 400;
        color: #999999;
        line-height: 1;
      }
    }
    &-bg {
      background: url(https://cdn.shupian.cn/sp-pt/wap/images/fc9g2cng1dc0000.jpg)
        no-repeat 100% 100%;
      background-size: 100% 100%;
      width: 100%;
      height: 130px;
    }
    &-first {
      // height: 351px;
      padding: 0 0 32px 0;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      border-bottom: 1px dashed #f4f4f4;
      &-big {
        font-size: 34px;
        line-height: 34px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-bottom: 17px;
        text-align: center;
      }
      &-small {
        font-size: 22px;
        line-height: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        text-align: center;
      }
      &-hr {
        width: 0.01rem;
        height: 34px;
        background: #f4f4f4;
        margin-bottom: 11px;
      }
    }
    &-second {
      height: 120px;
      padding: 0 22px 0 33px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-left {
        display: flex;
        align-items: center;
        height: 72px;
        > :nth-child(1) {
          font-size: 40px;
          line-height: 40px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        > :nth-child(2) {
          font-size: 24px;
          line-height: 24px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        > :nth-child(3) {
          font-size: 20px;
          line-height: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          text-decoration: line-through;
          color: #cccccc;
          margin-left: 15px;
        }
      }
      &-right {
        height: 72px;
        width: 240px;
        background: #ebf3ff;
        border-radius: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px 0 8px;
        &-person {
          height: 56px;
          width: 56px;
          border-radius: 50%;
          background-position: center center;
          background-size: 100% 100%;
        }
        &-rap {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .show-more-btn {
    width: 278px;
    height: 64px;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    border-radius: 32px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 19px 0;
    margin-top: 40px;
    > span {
      display: block;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .input-ic-open {
      margin-left: 12px;
      margin-top: 2px;
    }
  }
}
</style>
