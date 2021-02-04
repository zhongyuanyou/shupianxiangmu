<template>
  <div class="serve">
    <div class="serve-text">税筹服务介绍</div>
    <div
      v-for="(item, i) of serveData"
      :key="i"
      v-md-map
      v-md:webClick
      :data-name="`税筹服务介绍_${item.productName}_在线咨询`"
      class="serve-card"
      @click="openImUrl(i)"
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
          v-for="(val, index) of promise"
          :key="index"
          class="serve-card-promise-item"
        >
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png"
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
                  : { backgroundImage: `url(${item.person})` }
              "
              @click="openIm(i, $event)"
            ></div>
          </a>
          <a href="javascript:;">
            <div
              v-md-map
              v-md:webClick
              :data-name="`税筹服务介绍_${item.productName}_在线咨询`"
              class="serve-card-second-right-rap"
              @click="openIm(i, $event)"
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
              @click="call(i, $event)"
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
      promise: ['一对一服务', '开具正规发票', '节税率高'],
    }
  },
  methods: {
    // 电话图标调用电话接口
    call(i, e) {
      e.stopPropagation()
      window.location.href = `tel:${this.serveData[i].phone}`
    },
    // 信息图标直接调用IM
    openIm(i, e) {
      e.stopPropagation()
      this.$root.$emit(
        'openIMM',
        this.serveData[i].id,
        this.serveData[i].name,
        this.serveData[i].jobNum,
        this.serveData[i].person
      )
    },
    // 点击该模块判断是否进行跳转，如果不跳转就调用IM
    openImUrl(i) {
      if (this.url !== '') {
        window.open = this.url
      } else {
        this.$root.$emit(
          'openIMM',
          this.serveData[i].id,
          this.serveData[i].name,
          this.serveData[i].jobNum,
          this.serveData[i].person
        )
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
      justify-content: space-around;
      &-item {
        display: flex;
        align-items: center;
        > img {
          width: 26px;
          height: 26px;
          margin-right: 18px;
        }
        &-text {
          font-size: 26px;
          font-weight: 400;
          color: #555555;
          // line-height: 52px;
          line-height: 1;
        }
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
}
</style>
