<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <headerSearch @searchValue="handleSearch" />
    <!-- 筛选 -->
    <CompanyMenu
      :list="['Category', 'Combination', 'Price', 'Sortord']"
      :top="44"
      :active="1"
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
      searchKey: '',
    }
  },
  methods: {
    handleSearch(val) {
      this.searchKey = val
      if (this.$route.query.searchKey === val) return
      this.$router.replace(
        `/exchange_square/lookRrand/selectionPage?searchKey=${val}`
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
  background: #f5f5f5;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
::v-deep .dropdown-list {
  flex: 1;
  overflow-y: auto;
}
</style>
