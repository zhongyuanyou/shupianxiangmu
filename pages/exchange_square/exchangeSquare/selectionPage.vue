<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <headerSearch
      ref="search"
      :carriage="true"
      :default-search-key="defaultSearchKey"
      @searchValue="handleSearch"
      @clearDefaultSearchKey="defaultSearchKey = ''"
    />
    <!-- tabs -->
    <!-- <sp-sticky offset-top="44"> -->
    <div class="tabs">
      <sp-tabs v-model="active">
        <sp-tab
          v-for="item in tabList"
          :key="item.key"
          :title="item.label"
          :name="item.key"
        >
        </sp-tab>
      </sp-tabs>
    </div>
    <CompanyMenu
      ref="menu"
      :top="88"
      :active="active"
      :list="companyList"
      :default-search-key="defaultSearchKey"
      :search-key="searchKey"
    />
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
      defaultSearchKey: '公司转让',
      finished: false,
      companyList: ['Industry', 'Region', 'Price', 'More', 'Sortord'],
      active: 0,
      tabList: [
        { label: '公司交易', key: 0 },
        { label: '专利交易', key: 2 },
        { label: '商标交易', key: 1 },
      ],
      searchKey: '',
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
          // 'More',
          'Sortord',
        ]
      }
      if (this.active === 2) {
        this.companyList = ['Type', 'Industry', 'State', 'Price', 'Sortord']
      }
      this.$refs.menu.params = {
        classCode: '',
        dictCode: '',
        fieldList: [],
        limit: 10,
        needTypes: 1,
        searchKey: this.$refs.search.value,
        start: 1,
        statusList: ['PRO_STATUS_LOCKED', 'PRO_STATUS_PUT_AWAY'],
      }
    },
  },

  methods: {
    onLoad() {},
    handleSearch(val) {
      this.searchKey = val
      if (this.$route.query.searchKey === val) return
      this.$router.replace(
        `/exchange_square/exchangeSquare/selectionPage?searchKey=${val}`
      )
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .sp-tab {
  line-height: normal;
}
.selection-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
.tabs {
  ::v-deep .sp-tabs__line {
    width: 28px;
    height: 6px;
    background: #4974f5;
    border-radius: 3px;
    position: absolute;
    bottom: 35px;
    left: 0;
    z-index: 1;
    width: 28px;
    height: 6px;
    background-color: #4974f5;
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
