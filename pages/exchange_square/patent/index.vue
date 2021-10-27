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
    <Banner v-show="bannerList.length" :banner-list="bannerList"></Banner>
    <!-- banner E -->
    <!-- 导航区 S -->
    <NavList :nav-list="navList"></NavList>
    <!-- 导航区 E -->
    <!-- 广告区 S -->
    <Advertising :ad-lf-list="adLfList[0]" :ad-rg-list="adRgList"></Advertising>
    <!-- 广告区 E -->
    <!-- 资源列表 S -->
    <div
      :style="{
        marginTop: '17px',
      }"
    >
      <ProductList info="暂无搜索结果" @scroll="scroll"></ProductList>
    </div>

    <!-- 资源列表 E -->
    <!-- <BtnPlanner :planner="pagePlanner"></BtnPlanner> -->
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import { plannerApi, newSpreadApi } from '@/api/spread'
import Header from '@/components/exchange_square/common/Header.vue'
import Banner from '@/components/exchange_square/common/Banner.vue'
import NavList from '@/components/exchange_square/common/NavList.vue'
import Advertising from '@/components/exchange_square/common/Advertising.vue'
import ProductList from '@/components/exchange_square/patent/ProductList.vue'

// import BtnPlanner from '@/components/spread/common/BtnPlanner.vue'
export default {
  components: {
    Header,
    Banner,
    NavList,
    Advertising,
    ProductList,
    [Sticky.name]: Sticky,
    // BtnPlanner,
  },

  data() {
    return {
      isFixed: false,
      resultData: '',
      navList: [],
      adLfList: [],
      adRgList: [],
      bannerList: [],
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios
        .get(newSpreadApi.list, {
          params: {
            locationCodes: 'zzlCpq1,zzlCpq2,zlBanner',
            navCodes: 'navTygcZzl',
            code: 'jy-sb',
          },
        })
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.navList = res.data.navs.navTygcZzl.reverse()

            res.data.adList.forEach((item) => {
              if (item.locationCode === 'zzlCpq1') {
                this.adLfList = this.getData(item.sortMaterialList)
              } else if (item.locationCode === 'zzlCpq2') {
                this.adRgList = this.getData(item.sortMaterialList)
              } else if (item.locationCode === 'zlBanner') {
                this.bannerList = this.getData(item.sortMaterialList)
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getData(item) {
      const arr = []
      item.forEach((ele) => {
        arr.push(ele.materialList[0])
      })
      return arr
    },

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
