<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <headerSearch @searchValue="(val) => ($refs.menu.params.searchKey = val)" />
    <!-- 筛选 -->
    <CompanyMenu
      ref="menu"
      :list="['Category', 'Classify', 'Price', 'More', 'Sortord']"
      :top="44"
      :active="1"
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
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.selection-page {
  background: #f5f5f5;
  min-height: 100vh;
}
</style>
