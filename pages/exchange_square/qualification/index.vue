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
    <NavList :nav-list="navList"></NavList>
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
      navList: [
        {
          title: '施工总承包',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/g0u00rgzma80000.png',
        },
        {
          title: '专业承包',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/8f1bi7paqzs0000.png',
        },
        {
          title: '设计资质',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/envralac4o00000.png',
        },
        {
          title: '监理资质',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/12yda3usuaa8000.png',
        },
        {
          title: '劳务资质',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/6t43nz0bvg80000.png',
        },
        {
          title: '招标代理资质',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/25oge5yvryio000.png',
        },
        {
          title: '造价资质',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/7vxtwj2bb7g0000.png',
        },
        {
          title: '测绘资质',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/38jdivuhmo60000.png',
        },
        {
          title: '勘察资质',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/57afax73unk0000.png',
        },
        {
          title: '房地产资质',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/1fwy5sojo5og000.png',
        },
      ],
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
