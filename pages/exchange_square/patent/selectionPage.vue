<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <sp-sticky>
      <headerSearch @searchValue="search" />
    </sp-sticky>

    <ProductList
      :show-title="false"
      fiexd-height="44"
      :search-val="searchVal"
      :fixed="true"
    />
  </div>
</template>

<script>
import { Tab, Tabs, List, Sticky } from '@chipspc/vant-dgg'
import headerSearch from '@/components/common/head/headerSearch.vue'
import ProductList from '@/components/exchange_square/patent/ProductList.vue'
export default {
  components: {
    headerSearch,
    [Tab.name]: Tab,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [Tabs.name]: Tabs,
    ProductList,
  },
  data() {
    return {
      loading: false,
      finished: false,
      searchVal: '',
    }
  },
  methods: {
    onLoad() {
      this.finished = true
    },
    search(val) {
      this.searchVal = val
      if (this.$route.query.searchKey === val) return
      this.$router.replace(
        `/exchange_square/patent/selectionPage?searchKey=${val}`
      )
    },
  },
}
</script>

<style lang="less" scoped>
.selection-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}
</style>
