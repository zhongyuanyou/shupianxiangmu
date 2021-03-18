<template>
  <div class="exchange-square">
    <!-- 头部搜索 -->
    <div class="head"><Header title="交易广场" /></div>
    <!-- 金刚区 -->
    <Nav class="nav" :roll-nav="rollNav"></Nav>
    <!-- 活动区 -->
    <Activity :activity-list="activityList"></Activity>
    <!-- banner -->
    <Banner :swipe-list="swipeList"></Banner>
    <!-- 新人红包 -->
    <GiftBag :gift-bag-list="giftBagList"></GiftBag>
    <!-- 交易产品列表 -->
    <Transaction></Transaction>
  </div>
</template>

<script>
import Header from '@/components/spread/common/NavTop.vue'
import Nav from '@/components/spread/common/Nav.vue'
import Activity from '@/components/spread/promotionHome/exchangeSquare/Activity.vue'
import Banner from '@/components/spread/promotionHome/exchangeSquare/BannerSwipe.vue'
import GiftBag from '@/components/spread/promotionHome/exchangeSquare/GiftBag.vue'
import Transaction from '@/components/spread/promotionHome/exchangeSquare/Transaction.vue'
import { squareData } from '@/assets/spread/promotionHome/exchangeSquare.js'
import { chipSpread } from '@/api/spread'

export default {
  components: { Header, Nav, Activity, Banner, GiftBag, Transaction },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(chipSpread.list, {
        params: {
          locationCodes: 'ad113246,ad113244,ad113281',
          navCode: 'nav100059',
          productCenterCode: 'TradingPlatform',
        },
      })
      if (res.code === 200) {
        return {
          result: res,
        }
      } else if (res.code === 500) {
        return {
          result: squareData,
        }
      } else if (res.code === 404) {
        return {
          result: squareData,
        }
      }
    } catch (error) {
      // 请求出错也要保证页面正常显示
      return { error }
    }
  },
  data() {
    return {
      rollNav: [],
      activityList: [],
      swipeList: [],
      giftBagList: [],
    }
  },
  mounted() {
    try {
      if (JSON.stringify(this.resultData) !== '{}') {
        this.navDetail(this.result.data.navs.nav100059)
        this.getData(this.result.data.adList)
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 金刚区数据处理
    navDetail(data) {
      if (data.length === 0) {
      } else {
        const navList = []
        data.forEach((item, index) => {
          const obj = {
            code: index + 1,
            name: item.name,
            url: item.url,
            size: 'small',
            label: '',
            imageUrl: item.navigationImageUrl,
          }
          navList.push(obj)
        })
        this.rollNav = navList.reverse()
      }
    },
    // 处理数据
    getData(data) {
      data.forEach((item, index) => {
        // 活动标签广告位
        if (item.locationCode === 'ad113244') {
          const activity = []
          item.sortMaterialList.forEach((elem, idx) => {
            const obj = {
              code: idx + 1,
              name: elem.materialList[0].materialName.split('#')[1],
              image: elem.materialList[0].materialUrl,
              url: elem.materialList[0].materialLink,
            }
            activity.push(obj)
          })
          this.activityList = activity
        }
        // banner广告位
        if (item.locationCode === 'ad113281') {
          const swiper = []
          item.sortMaterialList.forEach((elem, idx) => {
            const obj = {
              code: idx + 1,
              title: '',
              describe: '',
              bg: elem.materialList[0].materialUrl,
            }
            swiper.push(obj)
          })
          this.swipeList = swiper
        }
        // 新人红包广告位
        if (item.locationCode === 'ad113246') {
          const giftBag = []
          item.sortMaterialList.forEach((elem, idx) => {
            const msg = elem.materialList[0].materialDescription.split('#')
            const obj = {
              code: idx + 1,
              img: elem.materialList[0].materialUrl,
              label: msg[0],
              title: elem.materialList[0].materialName.split('#')[1],
              price: msg[1],
              url: elem.materialList[0].materialLink,
            }
            giftBag.push(obj)
          })
          this.giftBagList = giftBag
        }
      })
    },
  },
  head() {
    return {
      title: '交易广场',
    }
  },
}
</script>

<style lang="less" scoped>
.exchange-square {
  width: 750px;
  margin: 0 auto;
  background: #f5f5f5;
  .head {
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/8un99iso7e40000.png');
    background-repeat: no-repeat;
    background-size: 100%, 100%;
    height: 399px;
  }
  .nav {
    margin-top: -277px;
  }
}
</style>
