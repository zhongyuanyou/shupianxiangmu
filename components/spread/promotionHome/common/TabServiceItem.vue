<template>
  <div class="tab-service-item">
    <sp-tabs
      v-model="active"
      :animated="false"
      :background="isFixed ? '#ffffff' : '#F5F5F5'"
      :swipe-threshold="titleName.length - 1"
      sticky
      title-style="title-style"
      :offset-top="offsetTop"
      @scroll="scroll"
      @click="onClick()"
    >
      <sp-tab
        v-for="(items, proKey) of titleName"
        :key="proKey"
        :title="items.name"
      >
        <template #title>
          <div class="title">
            <span class="title_name">{{ items.name }}</span>
            <span v-show="active === proKey" class="title_tag"></span>
          </div>
        </template>
        <!-- 二级分类 -->
        <sp-sticky :offset-top="top">
          <div
            v-show="proKey !== 0 && titleName[active].children.length"
            class="secondary-label"
            :style="{ paddingTop: isFixed ? '10px' : '' }"
          >
            <div class="class-box">
              <div
                v-for="(className, index) in titleName[active].children"
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
        <div class="enterprise-list">
          <sp-list
            v-model="loading"
            :finished="finished"
            :error.sync="error"
            finished-text="没有更多了"
            error-text=""
            offset="100"
            @load="onLoad"
          >
            <div class="content">
              <div
                v-for="(item, itemKey) of list"
                :key="itemKey"
                class="content-list"
              >
                <ProductCard v-if="itemKey !== 4" :product="item"></ProductCard>
                <div
                  v-else-if="proKey === 0 && itemKey === 4"
                  class="advertising-box"
                >
                  <div v-show="recommendedList.length" class="advertising">
                    <div class="title">您的企业需求是什么？</div>
                    <div class="list-box">
                      <div class="list">
                        <div
                          v-for="(elem, index) in recommendedList"
                          :key="index"
                          :class="[
                            demandActive === index ? 'item-active' : 'item',
                          ]"
                          @click.stop="demandChooes(index, elem.url, elem.code)"
                        >
                          {{ elem.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </sp-list>
        </div>
        <!-- <EnterpriseList /> -->
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast, Tab, Tabs, List, Sticky } from '@chipspc/vant-dgg'
import ProductCard from '@/components/spread/promotionHome/enterpriseService/ProductCard.vue'
// import EnterpriseList from '@/components/spread/promotionHome/common/EnterpriseList'
import { newSpreadApi, financingApi, spreadApi } from '@/api/spread'
import imHandle from '@/mixins/imHandle'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'TabServiceItem',
  mixins: [imHandle],
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    ProductCard,
    [Sticky.name]: Sticky,
    // EnterpriseList,
  },
  props: {
    planner: {
      type: Object,
      default: () => {
        return {}
      },
    },
    titleName: {
      type: Array,
      default: () => {
        return []
      },
    },
    recommendedList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  data() {
    return {
      active: 0,
      isFixed: false,
      offsetTop: 0,
      loading: false, // 显示加载过程的文案
      finished: false, // 加载完毕的文案
      error: false,
      pageNumber: 1,
      list: [],
      defaultState: {},
      count: 0,
      demandList: [
        { name: '公司注册', code: '' },
        { name: '印章服务', code: '' },
        { name: '地址变更', code: '' },
        { name: '公司注销', code: '' },
        { name: '续期服务', code: '' },
        { name: '其他服务', code: '' },
      ],
      demandActive: 0,
      secondaryLabel: [],
      calssActive: -1,
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
    // 获取三级分类

    chooes(idx) {
      this.list = []
      this.calssActive = idx
      this.activeCode = this.titleName[this.active].children[idx].ext1
      this.pageNumber = 1
      this.finished = false
      this.loading = true
      //   scrollTo(0, 800)
      this.selectTab()
    },
    price(price) {
      if (price % 1) {
        return price > 10000 ? (price / 10000).toFixed(1) : price
      } else {
        return parseInt(price > 10000 ? (price / 10000).toFixed(1) : price)
      }
    },
    onClick() {
      this.activeCode = this.titleName[this.active].type
      this.initialize()
      this.calssActive = -1
      this.secondaryLabel = []
      this.finished = false
    },
    scroll(e) {
      this.isFixed = e.isFixed
    },

    initialize(changeObj) {
      this.pageNumber = 1
      this.finished = false
      this.loading = true
      this.list = []
      this.onLoad()
    },
    onLoad() {
      // // 异步更新数据
      if (this.pageNumber === 1) {
        this.list = []
      }
      this.selectTab()
    },
    // 分类选择
    demandChooes(index, url, code) {
      this.demandActive = index
      if (url && this.isInApp) {
        const iOSRouter = {
          path: 'CPSCustomer:CPSCustomer/CPSCAllCategoryResultViewController///push/animation',
          parameter: {
            type: 1,
            classCode: code.split('#')[1],
          },
        }
        const androidRouter = {
          path: '/reform/flutter/classify_result',
          parameter: {
            trade: false,
            classCode: code.split('#')[1],
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouter)
        const androidRouterStr = JSON.stringify(androidRouter)
        this.$appFn.dggJumpRoute(
          {
            iOSRouter: iOSRouterStr,
            androidRouter: androidRouterStr,
          },
          (res) => {
            console.log(res)
          }
        )
      } else if (url === '/') {
        const planner = {
          mchUserId: this.planner.id,
          userName: this.planner.name,
          type: this.planner.type,
          msgParam: {},
          templateIds: '',
        }
        if (this.isInApp) {
          this.uPIM(planner)
        } else {
          this.uPIM(planner)
        }
      } else {
        window.location.href = url
      }
    },
    // onMore(id) {
    //   let base = ''
    //   DGG_SERVER_ENV === 'development' && (base = 'd')
    //   DGG_SERVER_ENV === 'release' && (base = 't')
    //   DGG_SERVER_ENV === 'production' && (base = '')
    //   if (this.isInApp) {
    //     const iOSRouters = {
    //       path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
    //       parameter: {
    //         routerPath: 'cpsc/goods/details/service',
    //         parameter: { productId: id },
    //       },
    //     }
    //     const androidRouters = {
    //       path: '/flutter/main',
    //       parameter: {
    //         routerPath: 'cpsc/goods/details/service',
    //         parameter: { productId: id },
    //       },
    //     }
    //     const iOSRouterStr = JSON.stringify(iOSRouters)
    //     const androidRouterStr = JSON.stringify(androidRouters)
    //     this.$appFn.dggJumpRoute({
    //       iOSRouter: iOSRouterStr,
    //       androidRouter: androidRouterStr,
    //     })
    //   } else {
    //     window.location.href = `https://${base}m.shupian.cn/detail?productId=${id}`
    //   }
    // },
    // 请求数据
    selectTab() {
      // 当前无数据不执行
      if (this.finished && !this.loading) return
      this.loading = true
      // 2、调用接口
      this.$axios
        .get(newSpreadApi.service_product_list, {
          params: {
            start: this.pageNumber,
            limit: '15',
            classCodes: this.activeCode || this.titleName[this.active].type,
            configFlg: 1,
          },
        })
        .then((res) => {
          // 调用回调函数处理数据
          const result = res.data.records
          if (res.code === 200 && result.length !== 0) {
            this.pageNumber++
            result.forEach((elem, index) => {
              this.list.push({
                code: index + 1,
                img:
                  elem.img.split(',')[0] ||
                  'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png',
                title: elem.title,
                label: elem.tabs || ['套餐优惠', '热销好品', '金牌团队'],
                currentPrice: elem.price,
                originalPrice: 0,
                url: '',
                desc: elem.desc,
                id: elem.id,
                sales: elem.saleNum,
                cycle: elem.handleCycleNumber,
              })
            })
            if (this.recommendedList) {
              this.list.splice(4, 0, {})
            }

            this.loading = false
            if (result.length < 15) {
              this.finished = true
            }
          } else {
            this.loading = false
            this.finished = true
          }
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
.tab-service-item {
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
  .enterprise-list {
    min-height: calc(100vh - 88px);
    .content {
      .content-list {
        .advertising-box {
          width: 100%;
          padding: 0 20px;
          margin-bottom: 20px;
          .advertising {
            width: 100%;
            border-radius: 24px;
            padding: 24px 20px 12px;
            background: #fff;
            .title {
              font-size: 30px;
              color: #222222;
              font-weight: 700;
              line-height: 35px;
            }
            .list-box {
              margin-top: 24px;
              .list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                align-items: center;

                width: 100%;
                > div {
                  margin-bottom: 12px;
                  width: 330px;
                  height: 70px;
                  font-size: 26px;
                  color: #222222;
                  background: #f5f5f5;
                  border-radius: 12px;
                  line-height: 70px;
                  text-align: center;
                }
                .item-active {
                  background: rgba(73, 116, 245, 0.1);
                  color: #4974f5;
                }
              }
            }
          }
        }
      }
    }
  }
  .sp-tabs__nav--complete {
    padding: 0px;
    padding-left: 0px;
  }
  ::v-deep.sp-tabs {
    // 最外层宽度
    .sp-tabs__wrap {
      // width: @spread-page-width;
      width: 100%;
      margin: 0 auto;
    }
  }
  .sp-tabs__wrap1 {
    background: transparent;
  }
  .sp-tabs__wrap2 {
    background: #fff;
  }
  ::v-deep.sp-tab {
    padding: 0;
    flex: none;
    margin-right: 40px;
  }
  .title {
    position: relative;
    &_name {
      position: relative;
      z-index: 2;
      line-height: 40px;
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
  ::v-deep.sp-tabs__nav--line {
    padding-left: 20px;
  }
  .sp-tab:first-child {
    padding-left: 20px;
  }
  ::v-deep.sp-tab--active {
    font-weight: bold;
    line-height: 32px;
    .sp-tab__text {
      font-size: 32px;
      color: #222222;
    }
  }
  ::v-deep.sp-tab {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
  }
  ::v-deep.sp-tabs__line {
    display: none;
    width: 60px;
    height: 12px;
    background: linear-gradient(90deg, rgba(73, 116, 245, 0.8), #dbe4fc);
    border-radius: 6px;
    top: 47px;
    left: 34px;
  }
  ::v-deep.sp-tab__text {
    font-size: 32px;
    color: #999999;
    z-index: 2;
  }
  ::v-deep.sp-tabs__wrap {
    margin-bottom: 11px;
  }
  // ::v-deep.sp-tabs__nav {
  //   width: 750px;
  //   padding: 0 20px;
  //   margin: 0 auto;
  // }
}
</style>
