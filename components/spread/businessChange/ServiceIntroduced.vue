<template>
  <div class="serviceIntroduced">
    <span class="title">变更服务介绍</span>
    <div class="prolist">
      <ul>
        <li
          v-for="(item, index) in servicelist"
          :key="index"
          v-show="index > num ? false : true"
          v-md-map
          v-md:webClick
          data-type="售前"
          :data-name="`变更服务介绍_${item.plannerName}_在线咨询`"
          @click="openIM(item.detailsUrl, item.planner)"
        >
          <!-- 产品头部名称部分 -->
          <div
            class="product-head"
            :style="{ backgroundImage: 'url(' + item.bgimage + ')' }"
          >
            <div class="product-head-title">
              <span>{{ item.productName }}</span>
              <div v-show="item.salesTag" class="product-head-label">
                {{ item.salesTag }}
              </div>
            </div>
            <span class="product-head-subtitle">{{
              item.productDescribe
            }}</span>
          </div>
          <!-- 产品标签 -->
          <div class="product-label">
            <div v-for="(label, key) in item.label" v-show="key < 3" :key="key">
              <img
                src="https://cdn.shupian.cn/sp-pt/wap/images/f7ec4mvmvrk0000.png"
                alt=""
              />
              <span>{{ label }}</span>
            </div>
          </div>
          <div class="total">
            <div>
              <div>
                <span>{{ item.actualViews }}</span>
                <span>在线咨询</span>
              </div>
              <div>
                <span>{{ item.defaultSales }}</span>
                <span>累计成交</span>
              </div>
              <div>
                <span>{{ item.actualSales }}</span>
                <span>成功案例</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="contact">
            <div class="price">
              <span>{{ item.price }}</span>
              <span>元起</span>
            </div>
            <div class="contact-btn">
              <a href="javascript:;" @click="im(item.planner)">
                <img :src="item.planner.avatarImg" alt="" />
              </a>
              <a
                v-md-map
                v-md:p_IMClick
                data-type="售前"
                :data-name="`变更服务介绍_${item.plannerName}_在线咨询`"
                @click="im(item.planner)"
              >
                <my-icon
                  name="notify_ic_chat"
                  color="#4974F5"
                  size="0.4rem"
                  class="icon"
                >
                </my-icon>
              </a>
              <a
                v-md-map
                v-md:webClick
                data-type="售前"
                :data-name="`变更服务介绍_${item.plannerName}_拨打电话`"
                href="javascript:;"
                @click="call(item.planner.telephone)"
              >
                <my-icon
                  name="notify_ic_tel"
                  color="#4974F5"
                  size="0.4rem"
                  class="icon"
                >
                </my-icon>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-show="servicelist.length > 3"
      class="show-more-btn"
      @click="showMore"
    >
      <a
        v-show="more"
        v-md-map
        v-md:webClick
        data-type="售前"
        data-name="工商变更页面_更多服务"
        >更多服务</a
      >
      <a
        v-show="close"
        v-md-map
        v-md:webClick
        data-type="售前"
        data-name="工商变更页面_收起"
        >收起</a
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
import MyIcon from '../../common/myIcon/MyIcon.vue'

export default {
  components: { MyIcon },
  props: {
    servicelist: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      more: true,
      close: false,
      num: 2,
    }
  },
  methods: {
    // 显示更多服务介绍
    showMore() {
      if (this.more) {
        this.close = true
        this.more = false
        this.num = this.servicelist.length
      } else {
        this.close = false
        this.more = true
        this.num = 2
      }
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
    // 服务列表对应的规划师
    plannerIm(planner) {
      const guiHuaShi = planner
      this.$root.$emit(
        'openIMM',
        guiHuaShi.id,
        guiHuaShi.name || '',
        guiHuaShi.jobNum || '',
        planner.imgSrc || ''
      )
    },
    im(planner) {
      this.plannerIm(planner)
      event.stopPropagation()
    },
    call(tel) {
      window.location.href = `tel:${tel}`
      event.stopPropagation()
    },
  },
}
</script>

<style lang="less" scoped>
.serviceIntroduced {
  width: 100%;
  padding: 31px 40px 32px;
  .title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  .prolist {
    margin-top: 31px;
    > ul {
      > li {
        width: 670px;
        height: 456px;
        border: 1px solid rgba(205, 205, 205, 0.3);
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        background-repeat: no-repeat;
        background-position: 0px -3px;
        background-size: 101% 100%;
        &:not(:first-child) {
          margin-top: 24px;
        }
        .product-head {
          width: 100%;
          height: 132px;
          background-repeat: no-repeat;
          background-position: 0px 0px;
          background-size: 100% 100%;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          padding: 30px 0 0 30px;
          .product-head-title {
            display: flex;
            align-items: center;
            > span {
              font-size: 32px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #222222;
              line-height: 31px;
            }
            .product-head-label {
              height: 32px;
              background: #fa5741;
              border: 1px solid #fa5741;
              border-radius: 10px 0px 10px 0px;
              margin-left: 16px;
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #ffffff;
              line-height: 31px;
              padding: 0px 9px;
              margin-top: -5px;
            }
          }
          .product-head-subtitle {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 23px;
            display: block;
            margin-top: 16px;
          }
        }
        .product-label {
          display: flex;
          align-items: center;
          margin-top: 20px;
          > div {
            display: flex;
            align-items: center;
            &:first-child {
              margin-left: 18px;
            }
            &:not(:first-child) {
              margin-left: 40px;
            }
            > img {
              width: 48px;
              height: 48px;
              transform: scale(0.5);
            }
            > span {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #555555;
              vertical-align: middle;
            }
          }
          > div:last-child {
            > span {
              margin-top: -5px;
              display: block;
            }
          }
        }

        .total {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 56px;
          padding-left: 32px;
          > div {
            display: flex;
            align-items: center;
            width: 100%;
            > div {
              flex: 1;
              position: relative;
              &:not(:first-child)::before {
                content: '';
                position: absolute;
                width: 1px;
                height: 40px;
                background: #f4f4f4;
                left: -25px;
              }
              > span {
                display: block;
                font-size: 32px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #222222;
                line-height: 31px;
                &:last-child {
                  font-size: 22px;
                  font-weight: normal;
                  color: #999999;
                  line-height: 21px;
                  margin-top: 10px;
                }
              }
            }
          }
        }
        .line {
          width: 100%;
          border-bottom: 1px dashed #f4f4f4;
          margin-top: 32px;
        }
        .contact {
          padding: 0 32px 0 34px;
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .price {
            font-size: 40px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ec5330;
            line-height: 40px;
            display: flex;
            align-items: flex-end;

            > span {
              display: block;
            }
            > span:last-child {
              font-size: 22px;
              line-height: 30px;
              font-weight: normal;
            }
          }
          .contact-btn {
            width: 240px;
            height: 72px;
            background: #ebf3ff;
            border-radius: 36px;
            display: flex;
            align-items: center;
            position: relative;
            > a {
              width: 56px;
              height: 56px;
              position: relative;
              .icon {
                position: absolute;
                left: 50%;
                top: 50%;
                margin-top: -20px;
                margin-left: -20px;
              }
            }
            > a:first-child {
              border-radius: 50%;
              margin-left: 8px;
              display: flex;
              > img {
                width: 100%;
                border-radius: 50%;
              }
            }
            > a:not(:first-child) {
              width: 40px;
              height: 40px;
              position: absolute;
              top: 50%;
              margin-top: -22px;
            }
            > a:nth-child(2) {
              left: 104px;
            }
            > a:last-child {
              right: 24px;
            }
          }
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
    > a {
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
