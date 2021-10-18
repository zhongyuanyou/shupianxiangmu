<template>
  <div class="qualification">
    <sp-sticky>
      <!-- 头部S -->
      <Header
        :bg-color="isFixed ? '#ffffff' : '#f5f5f5'"
        :search-color="isFixed ? '#f5f5f5' : '#ffffff'"
        title="找资质"
      ></Header>
      <!-- 头部E -->
    </sp-sticky>
    <!-- banner S -->
    <Banner></Banner>
    <!-- banner E -->
    <!-- 金刚区 S -->
    <NavList></NavList>
    <!-- 金刚区 E -->
    <!-- 瓷片区 S-->
    <Ceramics></Ceramics>
    <!-- 瓷片区 E -->
    <!-- 资源列表 S -->
    <ProductList @scroll="scroll"></ProductList>
    <!-- 资源列表 S -->
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import Header from '@/components/exchange_square/common/Header.vue'
import Banner from '@/components/exchange_square/common/Banner.vue'
import NavList from '@/components/exchange_square/common/NavList.vue'
import Ceramics from '@/components/exchange_square/qualification/Ceramics.vue'
import ProductList from '@/components/exchange_square/qualification/ProductList.vue'
export default {
  name: 'Qualification',
  components: {
    Header,
    [Sticky.name]: Sticky,
    Banner,
    NavList,
    Ceramics,
    ProductList,
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
  },
}
</script>

<style lang="less" scoped>
.qualification {
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
