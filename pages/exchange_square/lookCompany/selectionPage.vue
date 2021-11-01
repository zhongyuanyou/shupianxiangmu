<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <headerSearch @searchValue="handleSearch" />
    <!-- 筛选 -->
    <CompanyMenu
      :top="44"
      :list="['Industry', 'Region', 'Price', 'More', 'Sortord']"
      :search-key="searchKey"
    />
  </div>
</template>

<script>
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
import headerSearch from '@/components/common/head/headerSearch.vue'
import CompanyMenu from '~/components/exchange_square/list/CompanyMenu.vue'
export default {
  components: {
    CompanyMenu,
    headerSearch,
    [Tab.name]: Tab,
    [List.name]: List,
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      loading: false,
      finished: false,
      searchKey: '',
    }
  },
  methods: {
    onLoad() {
      this.finished = true
    },
    handleSearch(val) {
      this.searchKey = val
      if (this.$route.query.searchKey === val) return
      this.$router.replace(
        `/exchange_square/lookCompany/selectionPage?searchKey=${val}`
      )
    },
  },
}
</script>

<style lang="less" scoped>
.selection-page {
  background: #f5f5f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
}
::v-deep .dropdown-list {
  flex: 1;
  overflow-y: auto;
}
</style>
