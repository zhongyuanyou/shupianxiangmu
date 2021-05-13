<template>
  <div class="tab-service-item">
    <sp-tabs
      v-model="active"
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
        <!-- <slot name="list"></slot> -->
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
                v-for="(item, proKey) of list"
                :key="proKey"
                class="content-list"
                @click="onMore(item.id)"
              >
                <div class="imge"><img :src="item.img" alt="" /></div>
                <div class="region">
                  <div class="region-content">
                    <p class="region-title">{{ item.title }}</p>
                    <label>
                      <!-- <span
                        v-for="(labels, labelKey) of item.label"
                        :key="labelKey"
                      >
                        {{ labels }}
                      </span> -->
                      <span>{{ item.label }}</span>
                    </label>
                    <div class="region-explain">{{ item.desc }}</div>
                  </div>
                  <div
                    v-show="item.currentPrice !== '' && item.currentPrice"
                    class="region-price"
                  >
                    {{ item.currentPrice }}<span>元</span>
                    <!--              <span-->
                    <!--                v-show="item.originalPrice !== '' && item.originalPrice"-->
                    <!--                class="original-price"-->
                    <!--                >{{ item.originalPrice }}元</span-->
                    <!--              >-->
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
import { Toast, Tab, Tabs, List } from '@chipspc/vant-dgg'
// import EnterpriseList from '@/components/spread/promotionHome/common/EnterpriseList'
import { newSpreadApi } from '@/api/spread'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'TabServiceItem',
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    // EnterpriseList,
  },
  props: {
    titleName: {
      type: Array,
      default: () => {
        return [
          {
            code: 1,
            type: 1,
            name: '工商服务',
          },
          {
            code: 2,
            type: 1,
            name: '会计服务',
          },
          {
            code: 3,
            type: 1,
            name: '知识服务',
          },
          {
            code: 4,
            type: 1,
            name: '资质服务',
          },
        ]
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
      this.offsetTop = this.appInfo.statusBarHeight + 56 + 'px'
    } else {
      this.offsetTop = 58 + 'px'
    }
  },
  methods: {
    onClick() {
      console.log(this.titleName, 789456)
      // console.log(this.active)
      // this.$emit('change', this.titleName[name])
      this.list = []
      this.initialize()
    },
    scroll(e) {
      this.isFixed = e.isFixed
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
    onMore(id) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      window.location.href = `https://${base}m.shupian.cn/detail?productId=${id}`
    },
    // 请求数据
    selectTab(item) {
      this.loading = true
      // 当前无数据不执行
      if (this.finished && !this.loading) return
      const type = this.titleName[this.active].dictCode
      const obj = {
        start: this.pageNumber,
        limit: '15',
        classCodes: this.titleName[this.active].code,
        dictCode: this.titleName[this.active].dictCode,
      }
      // naem: this.titleName[this.active].name,
      console.log(obj, '请求数据')
      // 2、调用接口
      this.$axios
        .get(newSpreadApi.trade_product_list, {
          params: obj,
        })
        .then((res) => {
          console.log(res, 456)
          // 调用回调函数处理数据
          const result = res.data.records
          if (res.code !== 200) {
            this.loading = false
            this.finished = true
          }
          if (res.code === 200 && result.length !== 0) {
            console.log(res.data.pageNumber === 1, 264684)
            if (res.data.pageNumber === 1) {
              this.list = []
            }
            ++this.pageNumber
            result.forEach((elem, index) => {
              this.list.push({
                code: index + 1,
                img:
                  elem.img.split(',')[1] ||
                  'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png',
                title: elem.title,
                label: elem.field ? elem.field.join(' | ') : '',
                // label: elem.tabs || ['套餐优惠', '热销好品', '金牌团队'],
                currentPrice: elem.price,
                originalPrice: 0,
                url: '',
                desc: elem.desc,
                id: elem.id,
              })
            })
            this.loading = false
            if (result.length < 14) this.finished = true

            return
          }
          this.loading = false
          this.error = true
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
  .enterprise-list {
    min-height: 1224px;
    padding-left: 20px;
    .content {
      .content-list {
        display: flex;
        width: 710px;
        min-height: 276px;
        padding: 28px 20px;
        background: #ffffff;
        border-radius: 24px;
        margin: 0 20px 20px 0;
        .imge {
          width: 220px;
          height: 220px;
          // background: #b2b2b2;
          border-radius: 12px;
          margin-right: 32px;
          img {
            width: 220px;
            height: 220px;
          }
        }
        .region {
          &-content {
            min-height: 150px;
            .region-title {
              margin-bottom: 20px;
              font-size: 32px;
              font-family: PingFang;
              font-weight: bold;
              color: #222222;
              line-height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
            label {
              display: flex;
              span {
                // background: #f0f2f5;
                // border-radius: 4px;
                font-size: 20px;
                font-weight: 400;
                // color: #5c7499;
                color: #222;
                line-height: 32px;
                margin-right: 8px;
                // padding: 4px 6px;
                // max-width: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .region-explain {
              margin-top: 20px;
              height: 22px;
              font-size: 22px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #222;
              line-height: 22px;
              .textOverflow(1);
              width: 100%;
            }
          }
          &-price {
            // height: 30px;
            font-size: 36px;
            font-weight: bold;
            color: #ec5330;
            padding-top: 28px;
            > span {
              height: 20px;
              font-size: 22px;
              font-weight: bold;
              color: #ec5330;
              line-height: 20px;
            }
            .original-price {
              font-size: 22px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 22px;
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
      width: @spread-page-width;
      margin: 0 auto;
      // padding-left: 20px;
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
      font-family: PingFangSC-Regular, PingFang SC;
      color: #222222;
    }
  }
  ::v-deep.sp-tab {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
  }
  ::v-deep.sp-tabs__line {
    width: 60px;
    height: 12px;
    background: linear-gradient(90deg, rgba(73, 116, 245, 0.8), #dbe4fc);
    border-radius: 6px;
    top: 47px;
    left: 34px;
  }
  ::v-deep.sp-tab__text {
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
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
