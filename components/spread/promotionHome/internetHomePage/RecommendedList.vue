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
        <sp-sticky :offset-top="top">
          <div
            v-show="item.name !== '推荐'"
            class="secondary-label"
            :style="{ paddingTop: isFixed ? '10px' : '' }"
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
        </sp-sticky>
        <sp-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          finished-text="没有更多了"
          error-text=""
          @load="onLoad"
        >
          <div class="product-box">
            <div v-if="oddList.length > 0" class="product-odd">
              <div v-for="(proItem, proKey) of oddList" :key="proKey">
                <ProductItem
                  v-if="proKey !== 3"
                  class="product-item"
                  :product="proItem"
                />
                <div v-if="proKey === 3" class="content">
                  <div class="content-box">
                    <div class="box-left">
                      <img
                        src="https://cdn.shupian.cn/sp-pt/wap/images/eztp2h80bo00000.png"
                        alt=""
                      />
                    </div>
                    <div class="box-right">
                      <div class="title">增长用户从拥有一款小程序开始</div>
                      <div class="labs">
                        <div v-for="(lab, index) in labs" :key="index">
                          {{ lab }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </sp-list>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tab, Tabs, List, Sticky } from '@chipspc/vant-dgg'
// import Waterfall from 'vue-waterfall2'
// import product from '@/components/spread/promotionHome/internetHomePage/Product.vue'
import ProductItem from '@/components/spread/promotionHome/internetHomePage/ProductItem.vue'
import { newSpreadApi, financingApi } from '@/api/spread'
export default {
  name: 'Recommended',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Sticky.name]: Sticky,
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
      classArr: '',
      classCode: '',
      labs: ['规划', '开发', '一站式服务'],
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
      this.offsetTop = this.appInfo.statusBarHeight + 57 + 'px'
      this.top = this.appInfo.statusBarHeight + 57 + 44
    } else {
      this.offsetTop = 57 + 'px'
      this.top = 101
    }
    this.getClassCode()
  },
  methods: {
    // 获取三级分类
    getClassCode() {
      const params = {
        code: 'FL20210425164016',
      }
      this.$axios.get(financingApi.get_product_code, { params }).then((res) => {
        if (res.code === 200) {
          this.classArr = res.data
        }
      })
    },
    chooes(idx) {
      this.calssActive = idx
    },
    scroll(e) {
      this.isFixed = e.isFixed
    },
    onClick() {
      this.calssActive = -1
      this.secondaryLabel = []
      this.initialize()
      this.classArr.forEach((item, index) => {
        if (item.name === this.titleName[this.active].name) {
          this.secondaryLabel = item.children
        }
      })
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
        this.eventList = []
      }
      this.selectTab()
    },
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
    // 请求数据
    selectTab(item) {
      // 当前无数据不执行
      if (this.finished && !this.loading) return
      this.loading = true
      const type = this.titleName[this.active].type
      // 2、调用接口
      this.$axios
        .get(newSpreadApi.service_product_list, {
          params: {
            start: this.pageNumber,
            limit: '10',
            classCodes: type,
          },
        })
        .then((res) => {
          // 调用回调函数处理数据
          const result = res.data.records
          if (res.code === 200 && result.length !== 0) {
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
              }
              this.oddList.push(obj)
            })
            this.oddList.splice(3, 0, {})
            console.log(this.oddList, 444)
            this.loading = false
            if (result.length < 10) this.finished = true

            return
          }
          this.loading = false
          this.finished = true
        })
        .catch((err) => {
          this.loading = false
          this.finished = true
          this.error = true
          console.log(err)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.recommended {
  width: 100%;
  margin-top: 27px;

  ::v-deep.sp-tabs__nav {
    margin: 0 auto;
  }

  ::v-deep.sp-tabs__nav--line {
    padding-left: 20px;
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
    .title_tag {
      position: absolute;
      bottom: 24px;
      right: 0;
      width: 60px;
      height: 12px;
      background: linear-gradient(90deg, #4974f5 0%, #dbe4fc 100%);
      border-radius: 6px;
      z-index: 2;
    }
  }

  .secondary-label {
    width: 100%;

    padding: 0 20px;
    padding-bottom: 20px;
    background: #f5f5f5;
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
        line-height: 56px;
        padding: 0 19px;
        margin-right: 10px;
        font-size: 24px;
        color: #555555;
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
  .product-box {
    margin-top: 32px;
    width: 100%;
  }
}
</style>
