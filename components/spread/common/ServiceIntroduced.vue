<template>
  <div class="serviceList">
    <span class="serviceList-title">{{ serviceTitle }}</span>
    <slot name="dropDown"></slot>
    <div>
      <div
        v-for="(item, index) in serviceList"
        v-show="index > num ? false : true"
        :key="index"
        v-md-map
        v-md:webClick
        :data-type="item.md ? item.md.imMd.type : '售前'"
        :data-name="
          item.md ? item.md.imMd.name : `${serviceTitle}_${item.title}_在线咨询`
        "
        class="serviceList-content"
        @click="openIM(item.detailsUrl, item.planner)"
      >
        <div
          class="serviceList-content-head"
          :style="{ backgroundImage: 'url(' + item.bgImg + ')' }"
        >
          <div class="serviceList-content-head-title">
            <span>{{ item.title }}</span>
            <div v-show="item.salesTag">{{ item.salesTag }}</div>
          </div>
          <span>{{ item.titleContent }}</span>
          <!-- 右上角标签 -->
          <i v-show="item.activityTag && item.activityTag !== ''" class="img">{{
            item.activityTag
          }}</i>
        </div>
        <div class="lable-row-box">
          <div
            v-for="(lable, nums) in item.label"
            v-show="nums < 3"
            :key="nums"
            class="lable-row-content"
          >
            <img
              class="lable-row-content-img"
              src="https://cdn.shupian.cn/sp-pt/wap/images/f7ec4mvmvrk0000.png"
              alt=""
            />
            <span class="lable-row-content-msg">{{ lable }}</span>
          </div>
        </div>
        <div class="serviceList-content-total">
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
        <div class="serviceList-content-contact">
          <div class="price">
            <span>{{ item.price }}</span>
            <span>元起</span>
          </div>
          <div class="contact-btn">
            <a href="javascript:;" @click="im(item.planner)">
              <img :src="item.planner.imgSrc" alt="" />
            </a>
            <a @click="im(item.planner)">
              <my-icon
                v-md-map
                v-md:p_IMClick
                :data-type="item.md ? item.md.imMd.type : '售前'"
                :data-name="
                  item.md
                    ? item.md.imMd.name
                    : `${serviceTitle}_${item.title}_在线咨询`
                "
                name="notify_ic_chat"
                color="#4974F5"
                size="0.4rem"
                class="icon"
              >
              </my-icon>
            </a>
            <a href="javascript:;" @click="call(item.planner.telephone)">
              <my-icon
                v-md-map
                v-md:webClick
                :data-type="item.md ? item.md.imMd.type : '售前'"
                :data-name="
                  item.md
                    ? item.md.imMd.name
                    : `${serviceTitle}_${item.title}_拨打电话`
                "
                name="notify_ic_tel"
                color="#4974F5"
                size="0.4rem"
                class="icon"
              >
              </my-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看更多 -->
    <div
      v-show="serviceList.length > 3"
      class="show-more-btn"
      @click="showMore"
    >
      <a
        v-show="more"
        v-md-map
        v-md:webClick
        data-type="售前"
        :data-name="`${pageTitle}页面_更多服务`"
        href="javascript:;"
        >更多服务</a
      >
      <a
        v-show="close"
        v-md-map
        v-md:webClick
        data-type="售前"
        :data-name="`${pageTitle}页面_收起`"
        href="javascript:;"
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
    // 服务介绍列表
    serviceList: {
      type: Array,
      default: () => {
        return [
          {
            title: '银行销户',
            titleLabel:
              'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
            titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
            actualViews: '152',
            defaultSales: '108',
            actualSales: '108',
            price: 600,
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
            planner: {
              id: '7862495547640840192',
              name: '李劲',
              jobNum: '107547',
              telephone: '18402858698',
              imgSrc:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            },
            lable: ['免费核验', '3天拿证', '一对一服务'], // 标签
            salesTag: '特价优惠', // 活动标签
            activityTag: '热门商品', // 右上角标签
            detailsUrl: '', // 详情页链接
            md: {
              telMd: {
                name: '',
                type: '',
              },
              imMd: {
                name: '',
                type: '',
              },
            },
          },
        ]
      },
    },
    // 服务列表主title
    serviceTitle: {
      type: String,
      default: () => {
        return '服务介绍'
      },
    },
    pageTitle: {
      type: String,
      default: () => {},
    },
  },
  data() {
    return {
      col: 'col',
      more: true,
      close: false,
      num: 2,
    }
  },
  methods: {
    // 唤起规划师
    im(planner) {
      this.plannerIm(planner)
      event.stopPropagation()
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
    // 调起打电话
    call(telephone) {
      window.location.href = `tel:${telephone}`
      event.stopPropagation() // 阻止冒泡
    },
    // 显示更多服务列表
    showMore() {
      if (this.more) {
        this.close = true
        this.more = false
        this.num = this.serviceList.length
      } else {
        this.close = false
        this.more = true
        this.num = 2
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
      event.stopPropagation()
    },
  },
}
</script>

<style lang="less" scoped>
.serviceList {
  width: 100%;
  padding: 0 40px;
  margin-top: 63px;
  .serviceList-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    display: block;
    line-height: 39px;
  }
  .serviceList-content {
    display: block;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.3);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    margin-top: 31px;
    position: relative;
    margin-top: 25px;
    &:first-child {
      margin-top: 31px;
    }
  }
  .serviceList-content-head {
    width: 100%;
    height: 132px;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 100% 100%;
    border-radius: 8px 8px 0px 0px;
    padding: 32px 0 31px 31px;
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    position: relative;
    .serviceList-content-head-title {
      display: flex;
      > span {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 31px;
        display: block;
      }
      > div {
        height: 32px;
        background: #fa5741;
        border: 1px solid #fa5741;
        border-radius: 10px 0px 10px 0px;
        margin-left: 15px;
        padding: 0px 8px 0px 9px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 31px;
        margin-top: -5px;
      }
    }
    > span {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 23px;
      margin-top: 15px;
    }
    // 右上角标签
    .img {
      position: absolute;
      display: inline-block;
      top: 0px;
      right: 0px;
      width: 64px;
      height: 72px;
      background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/312ntaxb9au0000.png);
      background-size: 100%;
      font-size: 20px;
      font-style: normal;
      font-weight: bold;
      color: #ffffff;
      line-height: 24px;
      padding: 6px 4px 0 6px;
      text-align: center;
    }
  }
  .lable-row-box {
    padding: 0 20px;
    display: flex;
    align-items: center;
    .lable-row-content {
      display: flex;
      align-items: center;
    }
    .lable-row-content:not(:first-child) {
      margin-left: 40px;
    }
    .lable-row-content-img {
      width: 48px;
      height: 48px;
      transform: scale(0.5);
      flex-shrink: 0;
    }
    .lable-row-content-msg {
      height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 23px;
      display: block;
      margin-left: 1px;
      margin-top: 8px;
    }
  }
  .serviceList-content-total {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 32px;
    margin-top: 48px;
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
          top: 50%;
          margin-top: -20px;
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
    margin-top: 26px;
  }
  .serviceList-content-contact {
    margin: 24px 0;
    padding: 0 32px 0 34px;
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
