<template>
  <div class="good-list">
    <sp-sticky offset-top="56" @scroll="scroll">
      <sp-tabs
        v-model="active"
        :animated="false"
        title-active-color="#222222"
        :swipe-threshold="nav.length - 1"
        title-inactive-color="#555555"
        :background="isFixed ? fixedColor : bgColor"
        @scroll="scroll"
        @click="onClick()"
      >
        <sp-tab
          v-for="(item, itemKey) of nav"
          :key="itemKey"
          :title="item.name"
        >
          <template #title>
            <div class="title">
              <span class="title_name">{{ item.name }}</span>
              <span v-show="active === itemKey" class="title_tag"></span>
            </div>
          </template>
        </sp-tab>
      </sp-tabs>
    </sp-sticky>
    <CompanyMenu info="暂无搜索结果" :active="active" />
  </div>
</template>

<script>
import { Tab, Tabs, List, Sticky, Loading } from '@chipspc/vant-dgg'
import CompanyMenu from '~/components/exchange_square/list/CompanyMenu.vue'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Sticky.name]: Sticky,
    [Loading.name]: Loading,
    CompanyMenu,
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
      list: [], // 商品数据
      active: 0,
      offsetTop: 100,
      isFixed: false,
      fixedColor: '#ffffff',
      bgColor: '#f5f5f5',
      max: 2,
      pageNumber: 1,
    }
  },
  methods: {
    scroll(e) {
      this.$nextTick(() => {
        this.isFixed = e.isFixed
        this.$emit('scroll', e)
      })
    },

    onClick() {
      this.pageNumber = 1
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
    padding: 0 0 20px;
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
