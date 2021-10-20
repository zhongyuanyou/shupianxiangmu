<template>
  <div class="patent">
    <!-- 头部s -->
    <sp-sticky>
      <Header
        :bg-color="isFixed ? '#ffffff' : '#f5f5f5'"
        :search-color="isFixed ? '#f5f5f5' : '#ffffff'"
        path="/exchange_square/patent/selectionPage"
      ></Header>
    </sp-sticky>
    <!-- 头部E -->
    <!-- banner S -->
    <Banner></Banner>
    <!-- banner E -->
    <!-- 导航区 S -->
    <NavList></NavList>
    <!-- 导航区 E -->
    <!-- 广告区 S -->
    <Advertising></Advertising>
    <!-- 广告区 E -->
    <!-- 资源列表 S -->
    <ProductList @scroll="scroll"></ProductList>
    <!-- 资源列表 E -->
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import Header from '@/components/exchange_square/common/Header.vue'
import Banner from '@/components/exchange_square/common/Banner.vue'
import NavList from '@/components/exchange_square/common/NavList.vue'
import Advertising from '@/components/exchange_square/common/Advertising.vue'
import ProductList from '@/components/exchange_square/patent/ProductList.vue'
export default {
  components: {
    Header,
    Banner,
    NavList,
    Advertising,
    ProductList,
    [Sticky.name]: Sticky,
  },
  data() {
    return {
      isFixed: false,
    }
  },
  methods: {
    // 判断筛选框是否吸顶
    scroll(e) {
      this.isFixed = e.isFixed
    },
    searchFocus(e) {
      console.log(111)
    },
  },
}
</script>

<style lang="less" scoped>
.patent {
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}
</style>
