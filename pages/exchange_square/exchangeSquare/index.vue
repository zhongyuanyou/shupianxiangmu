<template>
  <div class="exchange-square">
    <sp-sticky offset-top="0">
      <Header
        style="height: 56px"
        title="交易广场"
        placeholder="公司转让"
        disabled="true"
        :bg-color="isFixed ? '#ffffff' : '#f5f5f5'"
        :search-color="isFixed ? '#f5f5f5' : '#ffffff'"
        path="/exchange_square/exchangeSquare/selectionPage"
      />
    </sp-sticky>
    <sp-swipe class="banner" :autoplay="3000" indicator-color="white">
      <sp-swipe-item v-for="(item, index) in swipeList" :key="index">
        <img :src="item.materialUrl" alt="" @click="jump(item)" />
      </sp-swipe-item>
    </sp-swipe>
    <NavBar :nav-list="navList"></NavBar>
    <ScrollNav :roll-nav="scrollNavList"></ScrollNav>
    <GoodsList :nav="goodNavlist" @scroll="scroll"></GoodsList>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Sticky } from '@chipspc/vant-dgg'
import Header from '@/components/exchange_square/common/Header.vue'
import NavBar from '@/components/spread/promotionHome/internetHomePage/NavBar.vue'
import ScrollNav from '@/components/spread/common/Nav.vue'
import GoodsList from '@/components/exchange_square/common/GoodsList.vue'
import { newSpreadApi } from '@/api/spread'
import jump from '@/mixins/jump'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sticky.name]: Sticky,
    Header,
    NavBar,
    ScrollNav,
    GoodsList,
  },
  mixins: [jump],
  data() {
    return {
      // 头部banner
      swipeList: [
        {
          bg: 'https://cdn.shupian.cn/sp/cms/9tue3h5ei1w0000.png',
          code: 1,
          describe: '',
          title: '',
        },
      ],
      isFixed: false,
      // 滚动金刚区
      scrollNavList: [],
      navList: [],
      // 商品列表导航
      goodNavlist: [
        { name: '公司交易', code: 1, type: 1 },
        { name: '商标交易', code: 1, type: 1 },
        { name: '专利交易', code: 1, type: 1 },
      ],
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
  },
  created() {},
  mounted() {
    this.getAdList()
  },
  methods: {
    getAdList() {
      this.$axios
        .get(newSpreadApi.list, {
          params: {
            locationCodes: 'jyBanner',
            navCodes: 'navJygc1,navJygc2',
            code: 'jy-sb',
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.scrollNavList = res.data.navs.navJygc2.reverse()
            this.navList = res.data.navs.navJygc1.reverse().slice(0, 4)
            res.data.adList.forEach((item) => {
              if (item.locationCode === 'jyBanner') {
                this.swipeList = this.getData(item.sortMaterialList)
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    scroll(e) {
      this.isFixed = e.isFixed
    },
    getData(item) {
      const arr = []
      item.forEach((ele) => {
        arr.push(ele.materialList[0])
      })
      return arr
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .goods-list {
  margin: 0 0.2rem;
}
::v-deep .trademark-good {
  padding-top: 0;
}
.exchange-square {
  width: 750px;
  margin: 0 auto;
  min-height: 100vh;
  background: #f5f5f5;
  .banner {
    margin: 10px 20px 0 20px;
    img {
      width: 710px;
      height: 240px;
    }
  }
  ::v-deep.nav-bar {
    .nav-content {
      background: none;
    }
  }
}
</style>
