<template>
  <div class="recommend-list">
    <sp-tabs
      v-model="active"
      :background="isFixed === true ? fixedColor : bgColor"
      title-inactive-color="#999999"
      title-active-color="#222222"
      sticky
      :offset-top="offsetTop"
      @scroll="scroll"
    >
      <sp-tab
        v-for="item in recommendList"
        :key="item.code"
        :title="item.title"
      >
        <!-- 二级分类 -->
        <!-- <div class="secondary-label">
          <div class="labels">
            <ul>
              <li
                v-for="(label, index) in labels"
                :key="index"
                :class="index === isActive ? 'choose' : 'nochoose'"
                @click="change(index)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="labels-icon">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/s5owvahe3ls000.png"
              alt=""
            />
          </div>
        </div> -->
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          class="list-box"
          @load="onLoad"
        >
          <!-- 律师列表 -->
          <div v-if="item.code === 1" class="lawyer-list">
            <div
              v-for="(law, index) in lawyerList"
              v-show="index < max"
              :key="index"
              class="law-list"
            >
              <a :href="law.url">
                <div class="img-box"><img :src="law.lawImg" alt="" /></div>
                <div class="law-content">
                  <span class="law-name">{{ law.name }}</span>
                  <div class="label-box">
                    <span
                      v-for="(label, labelcode) in law.label"
                      :key="labelcode"
                      >{{ label }}</span
                    >
                  </div>
                  <div class="data-box">
                    <div class="case">
                      <span class="case-number">{{ law.case }}</span>
                      <span class="case-text">案件数</span>
                    </div>
                    <div class="line"></div>
                    <div class="parity">
                      <span class="parity-number">{{ law.parity }}</span>
                      <span class="parity-text">好评率</span>
                    </div>
                  </div>
                  <span class="law-firms">{{ law.lawFirms }}</span>
                </div>
              </a>
            </div>
          </div>
          <!-- 服务列表 -->
          <div v-else-if="item.code === 2" class="service-list">
            <ServiceItem
              v-for="(services, idx) in serviceList"
              :key="idx"
              :product="services"
            ></ServiceItem>
          </div>
          <!-- 文章阅读 -->
          <div v-else-if="item.code === 3" class="read-list">
            <KnowledgeList
              v-for="reads in readList"
              :key="reads.code"
              :knowledge-arr="reads"
              active-name="搜知识"
              class="reads"
            ></KnowledgeList>
          </div>
        </sp-list>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
import ServiceItem from '@/components/spread/promotionHome/law/ServiceItem'
import KnowledgeList from '@/components/spread/promotionHome/law/KnowledgeList'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    ServiceItem,
    KnowledgeList,
  },
  props: {
    recommendList: {
      type: Array,
      default: () => {
        return []
      },
    },
    serviceList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      offsetTop: 0,
      fixedColor: '#ffffff',
      bgColor: '#f5f5f5',
      isFixed: false,
      active: '',
      loading: false,
      finished: false,
      isActive: 0,
      max: 2,
      labels: ['本地推荐', '全国律师', '婚姻家庭', '刑事辩护', '交通事故'],
      lawyerList: [
        {
          code: 1,
          name: '王晓厄尔',
          label: ['婚姻家事', '刑事辩护', '交通事故'],
          case: '155',
          parity: '99%',
          lawFirms: '北京市京师（上海）律师事务所',
          url: '',
          lawImg: 'https://cdn.shupian.cn/sp-pt/wap/images/3eec1phhyj80000.png',
        },
        {
          code: 2,
          name: '李阳',
          label: ['婚姻家事', '刑事辩护', '交通事故'],
          case: '1250',
          parity: '98%',
          lawFirms: '北京市京师（上海）律师事务所',
          url: '',
          lawImg: 'https://cdn.shupian.cn/sp-pt/wap/images/4p35u96cx340000.png',
        },
        {
          code: 3,
          name: '欧阳清平',
          label: ['婚姻家事', '刑事辩护', '交通事故'],
          case: '340',
          parity: '99%',
          lawFirms: '北京市京师（上海）律师事务所',
          url: '',
          lawImg: 'https://cdn.shupian.cn/sp-pt/wap/images/4qxueo7unbq0000.png',
        },
        {
          code: 4,
          name: '王晓峰',
          label: ['婚姻家事', '刑事辩护', '交通事故'],
          case: '155',
          parity: '98%',
          lawFirms: '北京市京师（上海）律师事务所',
          url: '',
          lawImg: 'https://cdn.shupian.cn/sp-pt/wap/images/d9gkwbvzi0g0000.png',
        },
        {
          code: 1,
          name: '王晓厄尔',
          label: ['婚姻家事', '刑事辩护', '交通事故'],
          case: '155',
          parity: '98%',
          lawFirms: '北京市京师（上海）律师事务所',
          url: '',
          lawImg: 'https://cdn.shupian.cn/sp-pt/wap/images/3eec1phhyj80000.png',
        },
      ],
      //   serviceList: [
      //     {
      //       img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
      //       title: '一对一法律咨询',
      //       desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
      //       currentPrice: '5900',
      //       originalPrice: '20000',
      //       saleNum: '5200',
      //       tabs: ['专业律师团队', '高效沟通', '全流程监管'],
      //       url: '',
      //     },
      //     {
      //       img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
      //       title: '一对一法律咨询',
      //       desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
      //       currentPrice: '5900',
      //       originalPrice: '20000',
      //       saleNum: '5200',
      //       tabs: ['专业律师团队', '高效沟通', '全流程监管'],
      //       url: '',
      //     },
      //     {
      //       img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
      //       title: '一对一法律咨询',
      //       desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
      //       currentPrice: '5900',
      //       originalPrice: '20000',
      //       saleNum: '5200',
      //       tabs: ['专业律师团队', '高效沟通', '全流程监管'],
      //       url: '',
      //     },
      //     {
      //       img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
      //       title: '一对一法律咨询',
      //       desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
      //       currentPrice: '5900',
      //       originalPrice: '20000',
      //       saleNum: '5200',
      //       tabs: ['专业律师团队', '高效沟通', '全流程监管'],
      //       url: '',
      //     },
      //     {
      //       img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
      //       title: '一对一法律咨询',
      //       desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
      //       currentPrice: '5900',
      //       originalPrice: '20000',
      //       saleNum: '5200',
      //       tabs: ['专业律师团队', '高效沟通', '全流程监管'],
      //       url: '',
      //     },
      //   ],
      readList: [
        {
          code: 1,
          title: '为什么公司需要企业法律服务，聘请法律顾问',
          label: ['专业律师团队', '高效沟通', '全流程监管'],
          evaluating: '9.5', // 评测
          time: '2020-09-09',
          count: '4985',
          url: '',
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
        },
        {
          code: 2,
          title: '为什么公司需要企业法律服务，聘请法律顾问',
          label: ['专业律师团队', '高效沟通', '全流程监管'],
          evaluating: '9.5', // 评测
          time: '2020-09-09',
          count: '4985',
          url: '',
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
        },
        {
          code: 3,
          title: '为什么公司需要企业法律服务，聘请法律顾问',
          label: ['专业律师团队', '高效沟通', '全流程监管'],
          evaluating: '9.5', // 评测
          time: '2020-09-09',
          count: '4985',
          url: '',
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  watch: {
    isFixed(newval, oldval) {
      this.isFixed = newval
    },
  },
  mounted() {
    if (this.isInApp) {
      this.offsetTop = this.appInfo.statusBarHeight + 58 + 'px'
    } else {
      this.offsetTop = 58 + 'px'
    }
  },
  methods: {
    scroll(e) {
      this.isFixed = e.isFixed
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.max = this.max + 3
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.max > 6) {
          this.finished = true
        }
      }, 1000)
    },
    change(index) {
      this.isActive = index
    },
  },
}
</script>

<style lang="less" scoped>
.recommend-list {
  width: 100%;
  .read-list {
    padding: 0 40px;
    background: #ffffff;
  }
  margin-top: 6px;
  .secondary-label {
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    .labels {
      width: 710px;
      height: 56px;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        display: none;
      }
      > ul {
        width: 710px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        > li:not(:first-child) {
          margin-left: 10px;
        }
        .choose {
          color: #4974f5;
        }
        .nochoose {
          color: #555555;
        }
        > li {
          flex-shrink: 0;
          width: 134px;
          height: 56px;
          background: #ffffff;
          border-radius: 8px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #555555;
          line-height: 56px;
          text-align: center;
        }
      }
    }

    .labels-icon {
      position: absolute;
      width: 71px;
      height: 56px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      top: 0;
      > img {
        font-size: 0;
        width: 30px;
        height: 30px;
      }
    }
  }

  ::v-deep.sp-tab {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    flex: none;
  }
  ::v-deep.sp-tab:first-child {
    margin-left: -8px;
  }
  ::v-deep.sp-tab:not(:first-child) {
    margin-left: 24px;
  }
  ::v-deep.sp-tab__text {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    line-height: 40px;
  }
  ::v-deep.sp-tabs__wrap {
    margin-bottom: 6px;
  }
  ::v-deep.sp-tabs__nav {
    width: 750px;
    margin: 0 auto;
    padding: 0 20px;
  }
  ::v-deep.sp-tabs__line {
    width: 60px;
    height: 12px;
    background-color: transparent;
    background-image: linear-gradient(to right, #4974f5, transparent);
    top: 50px;
    left: 35px;
  }
  ::v-deep.item {
    width: 710px;
    margin: 0 auto;
    padding: 28px 20px;
    background: #ffffff;
    margin-bottom: 20px;
    border-radius: 24px;
    .separate-line {
      display: none;
    }
    .item.desc {
      line-height: 30px;
    }
  }
  ::v-deep.item-sales {
    display: none !important;
  }
  .list-box {
    .lawyer-list {
      .law-list:not(:first-child) {
        margin-top: 20px;
      }
      .law-list {
        width: 710px;
        margin: 0 auto;
        height: 276px;
        background: #ffffff;
        border-radius: 24px;
        padding: 28px 0 28px 20px;

        > a {
          width: 100%;
          display: flex;
          align-items: center;
          .img-box {
            width: 220px;
            height: 220px;
            background: linear-gradient(
              180deg,
              #46494d 0%,
              #797d83 0%,
              #414347 100%
            );
            border-radius: 12px;
            display: flex;
            > img {
              width: 100%;
            }
          }
          .law-content {
            margin-left: 32px;
            .law-name {
              display: block;
              font-size: 32px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #222222;
              line-height: 32px;
            }
            .label-box {
              margin-top: 16px;
              display: flex;
              align-items: center;
              > span:not(:first-child) {
                margin-left: 8px;
              }
              > span {
                display: block;
                padding: 4px 6px;
                height: 28px;
                background: #f0f2f5;
                border-radius: 4px;
                font-size: 20px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: bold;
                color: #5c7499;
                line-height: 25px;
                text-align: center;
              }
            }
            .data-box {
              margin-top: 16px;
              display: flex;
              align-items: center;

              .case {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                > span {
                  display: block;
                }
                .case-number {
                  font-size: 36px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: bold;
                  color: #222222;
                  line-height: 50px;
                }
                .case-text {
                  font-size: 22px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: bold;
                  color: #999999;
                  line-height: 30px;
                }
              }
              .line {
                height: 65.5px;
                width: 1px;
                background: #d8d8d8;
                transform: rotate(25deg);
                margin-left: 30px;
              }
              .parity {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-left: 30px;
                > span {
                  display: block;
                }
                .parity-number {
                  font-size: 36px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: bold;
                  color: #222222;
                  line-height: 50px;
                }
                .parity-text {
                  font-size: 22px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: bold;
                  color: #999999;
                  line-height: 30px;
                }
              }
            }
            .law-firms {
              display: block;
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: #999999;
              line-height: 22px;
              margin-top: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
