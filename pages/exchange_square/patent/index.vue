<template>
  <div class="patent">
    <!-- 头部s -->
    <Header></Header>
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
  </div>
</template>

<script>
import Header from '@/components/exchange_square/common/Header.vue'
import Banner from '@/components/exchange_square/common/Banner.vue'
import NavList from '@/components/exchange_square/common/NavList.vue'
import Advertising from '@/components/exchange_square/common/Advertising.vue'
export default {
  components: { Header, Banner, NavList, Advertising },
}
</script>

<style lang="less" scoped>
.patent {
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
