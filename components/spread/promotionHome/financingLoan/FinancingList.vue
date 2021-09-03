<template>
  <div class="finacing-list">
    <sp-tabs
      v-model="active"
      sticky
      :animated="false"
      title-active-color="#222222"
      :swipe-threshold="titleName.length - 1"
      title-inactive-color="#555555"
      :offset-top="offsetTop"
      :background="isFixed ? fixedColor : bgColor"
      @scroll="scroll"
      @click="onClick()"
    >
      <sp-tab
        v-for="(item, itemKey) of titleName"
        :key="itemKey"
        :title="item.name"
      >
        <template #title>
          <div class="title">
            <span class="title_name">{{ item.name }}</span>
            <span v-show="active === itemKey" class="title_tag"></span>
          </div>
        </template>
        <sp-sticky :offset-top="top">
          <div
            v-show="itemKey !== 0 && classList.length"
            class="labels"
            :style="{ paddingTop: isFixed ? '10px' : '' }"
          >
            <div class="lab-box">
              <div
                v-for="(classItem, classIndex) in classList"
                :key="classIndex"
                class="lab"
                :style="{ color: classActive === classIndex ? '#4974F5' : '' }"
                @click="chooesClass(classIndex)"
              >
                {{ classItem.name }}
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
            <div v-if="list.length > 0" class="product-item">
              <product
                v-for="(proItem, proKey) of list"
                :key="proKey"
                :product="proItem"
              />
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
import product from '@/components/spread/promotionHome/financingLoan/ProductItem.vue'
import { newSpreadApi, financingApi, spreadApi } from '@/api/spread'
export default {
  name: 'FinacingList',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Sticky.name]: Sticky,
    product,
    // Waterfall,
  },
  props: {
    titleName: {
      type: Array,
      default: () => {
        return [
          {
            code: 1,
            type: 1,
            name: '推荐',
          },
          {
            code: 'FL20210425163778',
            type: 'FL20210425163778',
            name: '电商运营',
          },
          {
            code: 3,
            type: 1,
            name: '营销推广',
          },
          {
            code: 4,
            type: 1,
            name: '小程序建设',
          },
        ]
      },
    },
    classList: {
      type: Array,
      default: () => {
        return [
          { name: '人气产品', code: '' },
          { name: '低息好借', code: '' },
          { name: '随借随还', code: '' },
          { name: '大额面签', code: '' },
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
      // secondaryLabel: ['全部', '免费维护', '极速交付', '多方案维护'],
      loading: false,
      finished: false,
      list: [],
      error: false,
      max: 2,
      pageNumber: 1,
      classActive: -1,
      top: 0,
      classArr: '',
      classCode: '',
      activeCode: '',
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
  },
  methods: {
    // 选择二级分类
    chooesClass(i) {
      this.activeCode = this.titleName[this.active].children[i].ext1
      this.pageNumber = 1
      this.classActive = i
      this.finished = false
      this.list = []
      this.selectTab()
    },
    scroll(e) {
      this.$nextTick(() => {
        this.isFixed = e.isFixed
      })
    },
    onClick() {
      this.pageNumber = 1
      this.classActive = -1
      this.classList = this.titleName[this.active].children
      this.activeCode = this.titleName[this.active].type
      this.initialize()
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
        this.list = []
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
      // 2、调用接口
      const url =
        'http://127.0.0.1:7001/service/nk/newChipSpread/v1/service_product_list.do'
      //   newSpreadApi.service_product_list
      if (this.active !== 0) {
        this.$axios
          .get(newSpreadApi.service_product_list, {
            params: {
              start: this.pageNumber,
              limit: '14',
              classCodes: this.activeCode,
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
                  img:
                    elem.img ||
                    'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png',
                  title: elem.title,
                  labels: elem.tabs || ['套餐优惠', '热销好品', '金牌团队'],
                  price: elem.price,
                  sales: elem.saleNum || 0,
                  // activeTag: '', // 活动标签
                  url: '',
                  desc: elem.desc, // 说明
                  id: elem.id,
                }
                this.list.push(obj)
              })
              this.loading = false
              if (result.length < 14) this.finished = true

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
      } else {
        this.$axios
          .post(spreadApi.recommend_product, {
            userId: '',
            deviceId: '9036341960355128675',
            platform: 'APP',
            areaCode: '510100',
            sceneId: 'app-dkjhy-W-01',
            formatIdOne: 'FL20210425164558',
            productType: 'PRO_CLASS_TYPE_SALES',
          })
          .then((res) => {
            if (res.code === 200) {
              res.data.records.forEach((item, index) => {
                item.imageUrl = item.img
                this.list.push(item)
              })
              this.finished = true
            } else {
              this.finished = true
            }
          })
          .catch((err) => {
            this.finished = true
            console.log(err)
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.finacing-list {
  width: 100%;
  margin-top: 16px;
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
    top: 47px;
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
    position: relative;
    &_name {
      position: relative;
      z-index: 2;
    }
    &_tag {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60px;
      height: 12px;
      background: linear-gradient(90deg, #4974f5 0%, #dbe4fc 100%);
      border-radius: 6px;
    }
  }
  .labels {
    padding: 0 20px 20px;
    background: #f5f5f5;

    .lab-box::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .lab-box {
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;
      align-items: center;
      height: 56px;
      .lab {
        height: 56px;
        background: #ffffff;
        border-radius: 8px;
        padding: 16px 20px;
        font-size: 24px;
        color: #555555;
        line-height: 24px;
        margin-right: 10px;
        flex-shrink: 0;
        text-align: center;
      }
    }
  }
  .secondary-label {
    > ul {
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 11px;
      > li {
        width: 164px;
        height: 56px;
        background: #ffffff;
        border-radius: 8px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: bold;
        color: #555555;
        text-align: center;
        line-height: 56px;
      }
    }
  }
  .sp-list {
    min-height: 800px;
    .product-box {
      width: 100%;
      .product-item {
        padding: 0 20px;
      }
      .hot-product {
        width: 345px;
        height: 523px;
        background: #ffffff;
        border-radius: 24px;
        margin-bottom: 20px;
        img {
          width: 345px;
          height: 518px;
        }
      }
    }
  }

  ::v-deep.sp-tab--active {
    // line-height: 32px;
    .sp-tab__text {
      // font-size: 32px;
      font-weight: bold;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #222222;
    }
  }
}
</style>
