<template>
  <div class="good-list">
    <sp-tabs
      v-model="active"
      class="labels"
      :animated="false"
      title-active-color="#222222"
      :swipe-threshold="nav.length - 1"
      title-inactive-color="#555555"
      :offset-top="offsetTop"
      :background="isFixed ? fixedColor : bgColor"
      @scroll="scroll"
      @click="onClick()"
    >
      <sp-tab v-for="(item, itemKey) of nav" :key="itemKey" :title="item.name">
        <template #title>
          <div class="title">
            <span class="title_name">{{ item.name }}</span>
            <span v-show="active === itemKey" class="title_tag"></span>
          </div>
        </template>
        <div
          v-show="classList && classList.length"
          class="labels"
          :style="{
            paddingTop: isFixed ? '10px' : '',
            top: isFixed ? top - 1 + 'px' : '',
          }"
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
            <TrademarkGood v-show="active == 1" :list="list"></TrademarkGood>
            <CompanyGood
              v-show="active == 0 || active == 2 || active == 3"
              :list="list"
              :active="active"
            ></CompanyGood>
          </sp-list>
        </div>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List, Sticky, Loading } from '@chipspc/vant-dgg'
import CompanyGood from '@/components/exchange_square/CompanyGood.vue'
import TrademarkGood from '@/components/exchange_square/TrademarkGood.vue'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Sticky.name]: Sticky,
    [Loading.name]: Loading,
    CompanyGood,
    TrademarkGood,
    // Waterfall,
  },
  props: {
    // 滚动导航
    nav: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      list: [
        {
          name: '大庆****建筑装饰工程有限责任公司',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****建',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
      ], // 商品数据
      active: 0,
      offsetTop: 0,
      isFixed: false,
      fixedColor: '#ffffff',
      bgColor: '#f5f5f5',
      // secondaryLabel: ['全部', '免费维护', '极速交付', '多方案维护'],
      loading: false,
      finished: false,
      error: false,
      max: 2,
      pageNumber: 1,
      classActive: -1,
      top: 0,
      classArr: '',
      classCode: '',
      activeCode: '',
      num: 1,
      classList: [{ name: '推荐' }],
    }
  },
  methods: {
    scroll(e) {
      this.$nextTick(() => {
        this.isFixed = e.isFixed
      })
    },
    chooesClass(i) {
      this.$xToast.showLoading({ message: '加载中...' })
      this.activeCode = this.titleName[this.active].children[i].ext1
      this.pageNumber = 1
      this.classActive = i
      this.finished = false
      this.list = []
      this.selectTab()
    },
    onClick() {
      //   this.$xToast.showLoading({ message: '加载中...' })
      //   this.pageNumber = 1
      //   this.classActive = -1
      //   this.classList = this.titleName[this.active].children
      //   this.activeCode = this.titleName[this.active].type
      //   this.initialize()
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
        // this.list = []
      }
      this.selectTab()
    },
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
    selectTab() {
      //   this.list = this.list.concat(this.list)
    },
  },
}
</script>

<style lang="less" scoped>
.good-list {
  width: 100%;
  margin-top: 7px;
  ::v-deep.sp-tabs__nav {
    margin: 0 auto;
  }

  ::v-deep.sp-tabs__nav--line {
    padding-left: 20px;
    padding-bottom: 0;
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
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 99;
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
  .list-box {
    min-height: calc(100vh - 88px);
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
