<template>
  <div class="recommended">
    <sp-tabs
      v-model="active"
      sticky
      title-active-color="#222222"
      :swipe-threshold="titleName.length - 1"
      title-inactive-color="#555555"
      :offset-top="offsetTop"
      :background="isFixed === true ? fixedColor : bgColor"
      @scroll="scroll"
      @click="onClick()"
    >
      <sp-tab v-for="(item, itemKey) of titleName" :key="itemKey">
        <template #title>
          <div class="title">
            <span>{{ item.name }}</span>
            <span v-show="active === itemKey" class="title_tag"></span>
          </div>
        </template>
        <!-- 二级分类 -->
        <!-- <sp-sticky ref="sticky" :offset-top="top"> -->
        <div
          v-if="itemKey !== 0 && secondaryLabel.length"
          class="secondary-label"
          :style="{
            paddingTop: isFixed ? '10px' : '',
            top: isFixed ? top - 6 + 'px' : '',
          }"
        >
          <div class="class-box">
            <div
              v-for="(className, index) in secondaryLabel"
              :key="index"
              class="class-name"
              :style="{ color: calssActive === index ? '#4974F5' : '' }"
              @click="chooes(index)"
            >
              {{ className.name }}
            </div>
          </div>
        </div>
        <!-- </sp-sticky> -->
        <div class="list-box">
          <sp-list
            v-model="loading"
            :finished="finished"
            :error.sync="error"
            finished-text="没有更多了"
            error-text=""
            @load="onLoad"
          >
            <template #loading>
              <div v-show="pageNumber !== 1 && num !== 1" class="loding-box">
                <sp-loading size="12px" />加载中...
              </div>
            </template>
            <div class="product-box">
              <div v-if="oddList.length > 0" class="product-odd">
                <div v-for="(proItem, proKey) of oddList" :key="proKey">
                  <ProductItem class="product-item" :product="proItem" />
                </div>
              </div>
            </div>
          </sp-list>
        </div>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tab, Tabs, List, Sticky, Loading } from '@chipspc/vant-dgg'
// import Waterfall from 'vue-waterfall2'
// import product from '@/components/spread/promotionHome/internetHomePage/Product.vue'
import ProductItem from '@/components/spread/promotionHome/internetHomePage/ProductItem.vue'

import { newSpreadApi, financingApi, spreadApi } from '@/api/spread'
export default {
  name: 'Recommended',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Sticky.name]: Sticky,
    [Loading.name]: Loading,
    // product,
    ProductItem,
    // Waterfall,
  },
  props: {
    product: {
      type: Array,
      default: () => {
        return [
          {
            title: '推荐',
            describe: '猜你喜欢',
            list: [
              {
                code: 1,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/5swgfx9bv0w0000.png',
                title: '商品名称商品名称…',
                score: '',
                saleTage: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 2,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                title: '商品名称商品名称',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 3,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/oj7zb1uxhi8000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 4,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 5,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '商品名称商品',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
            ],
          },
          {
            title: '电商运营',
            describe: '品质保障',
            list: [
              {
                code: 4,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 5,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '商品名称商品',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
            ],
          },
          {
            title: '营销推广',
            describe: '品质保障',
            list: [
              {
                code: 1,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/5swgfx9bv0w0000.png',
                title: '商品名称商品名称…',
                score: '5.0',
                saleTage: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 2,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                title: '商品名称商品名称',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
            ],
          },
          {
            title: '小程序建设',
            describe: '品质保障',
            list: [
              {
                code: 2,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                title: '商品名称商品名称',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 3,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/oj7zb1uxhi8000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 4,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
            ],
          },
        ]
      },
    },
    titleName: {
      type: Array,
      default: () => {
        return [
          {
            code: 1,
            type: 1,
            name: '推荐',
            describe: '猜你喜欢',
          },
          {
            code: 'FL20210425163778',
            type: 'FL20210425163778',
            name: '电商运营',
            describe: '品质保障',
          },
          {
            code: 3,
            type: 1,
            name: '营销推广',
            describe: '品质保障',
          },
          {
            code: 4,
            type: 1,
            name: '小程序建设',
            describe: '品质保障',
          },
        ]
      },
    },
  },
  data() {
    return {
      active: 0,
      offsetTop: 0,
      isFixed: false,
      fixedColor: '#ffffff',
      bgColor: '#f5f5f5',
      secondaryLabel: [],
      loading: false,
      finished: false,
      list: [],
      oddList: [],
      eventList: [],
      error: false,
      pageNumber: 1,
      max: 2,
      calssActive: -1,
      top: 0,
      classArr: [],
      classCode: '',
      labs: ['规划', '开发', '一站式服务'],
      activeCode: '',
      num: 1,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
      currentCity: (state) => state.city.currentCity,
    }),
  },
  watch: {
    isFixed(newval, oldval) {
      this.isFixed = newval
    },
  },
  mounted() {
    if (this.isInApp) {
      this.offsetTop = this.appInfo.statusBarHeight + 57 + 'px'
      this.top = this.appInfo.statusBarHeight + 57 + 44
    } else {
      this.top = 101
      this.offsetTop = 57 + 'px'
    }
  },
  methods: {
    chooes(idx) {
      this.$xToast.showLoading({ message: '加载中...' })
      this.calssActive = idx
      this.activeCode = this.titleName[this.active].children[idx].ext1
      this.pageNumber = 1
      this.oddList = []
      this.finished = false
    },
    scroll(e) {
      this.isFixed = e.isFixed
    },
    onClick() {
      this.$xToast.showLoading({ message: '加载中...' })
      this.calssActive = -1
      this.secondaryLabel = []
      this.oddList = []
      this.activeCode = this.titleName[this.active].type
      this.initialize()
      this.secondaryLabel = this.titleName[this.active].children
    },
    initialize(changeObj) {
      this.pageNumber = 1
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    onLoad() {
      // // 异步更新数据
      if (this.pageNumber === 1) {
        this.oddList = []
      }
      this.selectTab()
    },
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
    // 请求数据
    async selectTab(item) {
      // 当前无数据不执行
      const device = await this.$getFinger().then((res) => {
        return res
      })

      if (this.finished && !this.loading) return

      this.loading = true
      // 2、调用接口
      if (this.active !== 0) {
        this.$axios
          .get(newSpreadApi.service_product_list, {
            params: {
              start: this.pageNumber,
              limit: '10',
              classCodes: this.activeCode,
            },
          })
          .then((res) => {
            // 调用回调函数处理数据
            const result = res.data.records
            if (res.code === 200 && result.length !== 0) {
              this.$xToast.hideLoading()
              this.num = 2
              if (res.data.pageNumber === 1) {
                this.list = []
              }
              ++this.pageNumber
              result.forEach((elem, index) => {
                const obj = {
                  code: index + 1,
                  imageUrl:
                    elem.img ||
                    'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png',
                  title: elem.title,
                  labels: elem.tabs || ['套餐优惠', '热销好品', '金牌团队'],
                  price: elem.price,
                  sales: elem.saleNum || 0,
                  activeTag: '', // 活动标签
                  url: '',
                  desc: elem.desc, // 说明
                  id: elem.id,
                  priceType: elem.priceType,
                  salesPrice: elem.salesPrice,
                  refConfig: elem.refConfig,
                }
                this.oddList.push(obj)
              })
              this.loading = false
              if (result.length < 10) this.finished = true
            } else {
              this.$xToast.hideLoading()
              this.loading = false
              this.finished = true
            }
          })
          .catch((err) => {
            this.$xToast.hideLoading()
            this.loading = false
            this.finished = true
            this.error = true
            console.log(err)
          })
      } else {
        this.$axios
          .post(spreadApi.recommend_product, {
            userId: '',
            deviceId: '9036341960355128675',
            platform: 'APP',
            areaCode: this.currentCity.code || '510100',
            sceneId: 'app-zscqjhy-W-01',
            formatIdOnes: 'FL20210425164438#FL20210425164496', // 商品一级分类集合，#作为分隔，知识产权分为版权，专利(FL20210425164496)和商标(FL20210425164438)
            productType: 'PRO_CLASS_TYPE_SALES',
            classCode: this.titleName[0].type,
          })
          .then((res) => {
            if (res.code === 200) {
              this.$xToast.hideLoading()
              res.data.records.forEach((item, index) => {
                item.imageUrl = item.img
                this.oddList.push(item)
              })
              this.finished = true
            } else {
              this.$xToast.hideLoading()
              this.finished = true
            }
          })
          .catch((err) => {
            this.$xToast.hideLoading()
            this.finished = true
            console.log(err)
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.recommended {
  width: 100%;
  margin-top: 8px;
  position: relative;
  ::v-deep.sp-tabs__nav {
    margin: 0 auto;
  }

  ::v-deep.sp-tabs__nav--line {
    padding-left: 20px;
  }
  ::v-deep.sp-tabs__wrap {
    height: 80px;
  }
  ::v-deep.sp-tab {
    padding: 0;
    flex: 0 0 auto;
    margin-right: 46px;
    .sp-tab__text {
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #999999;
    }
  }

  ::v-deep.sp-tabs__line {
    display: none;
    width: 60px;
    height: 12px;
    background: linear-gradient(90deg, #4974f5 0%, #dbe4fc 100%);
    border-radius: 6px;
    top: 30px;
    left: 34px;
  }
  ::v-deep.sp-tab--active {
    font-weight: bold;
    line-height: 32px;
    .sp-tab__text {
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #222222;
    }
  }
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      z-index: 3;
    }
    .title_tag {
      position: absolute;
      bottom: 20px;
      right: 0;
      width: 60px;
      height: 12px;
      background: linear-gradient(90deg, #4974f5 0%, #dbe4fc 100%);
      border-radius: 6px;
      z-index: 2;
      opacity: 0.8;
    }
  }

  .secondary-label {
    width: 100%;

    padding: 0 20px;
    padding-bottom: 20px;
    background: #f5f5f5;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 999;
    .class-box::-webkit-scrollbar {
      display: none;
    }
    .class-box {
      width: 100%;
      display: flex;
      align-items: center;
      overflow-x: scroll;
      overflow-y: hidden;
      .class-name {
        flex-shrink: 0;
        height: 56px;
        background: #ffffff;
        border-radius: 8px;
        // line-height: 56px;
        padding: 0 19px;
        margin-right: 10px;
        font-size: 24px;
        color: #555555;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .content {
    width: 100%;
    height: 240px;
    margin-bottom: 20px;
    padding: 0 20px;
    .content-box {
      width: 100%;
      border-radius: 24px;
      background: #fff;
      display: flex;
      .box-left {
        width: 240px;
        height: 240px;
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
        display: flex;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .box-right {
        padding: 46px 32px;
        .title {
          font-size: 32px;
          color: #222222;
          letter-spacing: 0;
          line-height: 44px;
          font-weight: 700;
          .textOverflow(2);
        }
        .labs {
          display: flex;
          align-items: center;
          height: 41px;
          flex-wrap: wrap;
          overflow: hidden;
          margin-top: 20px;
          > div {
            margin-right: 8px;
            height: 41px;
            line-height: 41px;
            background: #f2f5ff;
            border-radius: 8px;
            padding: 0 24px;
            font-size: 26px;
            color: #547cf8;
          }
        }
      }
    }
  }
  .list-box {
    min-height: calc(100vh - 88px);
    .loding-box {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .product-box {
      width: 100%;
    }
  }
}
</style>
