<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <headerSearch @searchValue="(val) => ($refs.menu.params.searchKey = val)" />
    <!-- 筛选 -->
    <CompanyMenu
      ref="menu"
      :top="44"
      :list="['Industry', 'Region', 'Price', 'More', 'Sortord']"
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
    }
  },
  methods: {
    onLoad() {
      this.finished = true
    },
    search() {},
  },
}
</script>

<style lang="less" scoped>
.selection-page {
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
}
</style>
