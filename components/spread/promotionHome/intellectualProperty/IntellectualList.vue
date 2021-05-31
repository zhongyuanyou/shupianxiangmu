<template>
  <div class="intellectual-list">
    <sp-tabs
      v-model="active"
      sticky
      :animated="false"
      title-active-color="#222222"
      :swipe-threshold="titleName.length - 1"
      title-inactive-color="#555555"
      :offset-top="offsetTop"
      :background="isFixed === true ? fixedColor : bgColor"
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
              <product
                v-for="(proItem, proKey) of oddList"
                :key="proKey"
                class="product-item"
                :product="proItem"
              />
            </div>
            <div class="product-event">
              <!-- 待改跳转 -->
              <div
                v-show="active === 0"
                class="hot-product"
                @click="
                  jumpLink(
                    '/spread/promotionHome/hotSaleTop?code=CRISPS-C-ZSCQ'
                  )
                "
              >
                <img
                  src="https://cdn.shupian.cn/sp-pt/wap/images/5a270klvc280000.png"
                  alt=""
                />
              </div>
              <product
                v-for="(proItem, proKey) of eventList"
                :key="proKey"
                class="product-item"
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
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
import product from '@/components/spread/promotionHome/intellectualProperty/Product.vue'
import { newSpreadApi } from '@/api/spread'
export default {
  name: 'IntellectualList',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
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
      oddList: [],
      eventList: [],
      error: false,
      pageNumber: 1,
      max: 2,
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
    } else {
      this.offsetTop = 57 + 'px'
    }
  },
  methods: {
    scroll(e) {
      this.isFixed = e.isFixed
    },
    onClick() {
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
            limit: '14',
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
                // desc: elem.desc, // 说明
                id: elem.id,
              }
              index % 2 === 0
                ? this.oddList.push(obj)
                : this.eventList.push(obj)
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
    },
  },
}
</script>

<style lang="less" scoped>
.intellectual-list {
  width: 100%;
  ::v-deep.sp-tabs__nav {
    margin: 0 auto;
  }

  ::v-deep.sp-tabs__nav--line {
    padding-left: 20px;
  }
  ::v-deep.sp-tab {
    padding: 0 20px;
    flex: 0 0 auto;
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
    min-height: 1000px;
    .product-box {
      width: 100%;
      display: flex;
      .product-box {
        width: 50%;
        padding-left: 20px;
      }
      .product-odd {
        padding-left: 20px;
      }
      .product-event {
        padding-left: 20px;
      }
      .hot-product {
        width: 345px;
        height: 523px;
        background: #ffffff;
        border-radius: 24px;
        margin-bottom: 20px;
        img {
          width: 345px;
          height: 523px;
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
