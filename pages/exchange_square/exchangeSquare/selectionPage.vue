<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <headerSearch />
    <!-- tabs -->
    <!-- <sp-sticky offset-top="44"> -->
    <div class="tabs">
      <sp-tabs v-model="active">
        <sp-tab
          v-for="(item, index) in tabList"
          :key="index"
          :title="item"
          :name="index"
        >
        </sp-tab>
      </sp-tabs>
    </div>
    <CompanyMenu :top="93" :active="active" :list="companyList" />
    <!-- </sp-sticky> -->
  </div>
</template>

<script>
import { Tab, Tabs, List, Sticky } from '@chipspc/vant-dgg'
import CompanyMenu from '~/components/exchange_square/list/CompanyMenu.vue'
import headerSearch from '@/components/common/head/headerSearch.vue'
export default {
  components: {
    headerSearch,
    [Tab.name]: Tab,
    [List.name]: List,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    CompanyMenu,
  },
  data() {
    return {
      loading: false,
      finished: false,
      companyList: ['Industry', 'Region', 'Price', 'More', 'Sortord'],
      active: 0,
      tabList: ['公司交易', '商标交易', '专利交易'],
      typeName: {
        0: '公司',
        1: '商标',
        2: '专利',
      },
    }
  },
  watch: {
    active() {
      if (this.active === 0) {
        this.companyList = ['Industry', 'Region', 'Price', 'More', 'Sortord']
      }
      if (this.active === 1) {
        this.companyList = [
          'Category',
          'Combination',
          'Price',
          'More',
          'Sortord',
        ]
      }
      if (this.active === 2) {
        this.companyList = ['State', 'Industry', 'Classify', 'Price', 'Sortord']
      }
    },
  },

  methods: {
    onLoad() {},
  },
}
</script>

<style lang="less" scoped>
.selection-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  overflow: hidden;
}
.tabs {
  margin-top: 10px;
  ::v-deep .sp-tabs__line {
    width: 28px;
    height: 6px;
    background: #4974f5;
    border-radius: 3px;
  }
  ::v-deep .sp-tab--active {
    font-weight: bold;
    color: #222222 !important;
  }
  ::v-deep .sp-tab {
    color: #999999;
    font-size: 30px;
  }
}
::v-deep .dropdown-list {
  flex: 1;
  overflow-y: auto;
}
</style>
