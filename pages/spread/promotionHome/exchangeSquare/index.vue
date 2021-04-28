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
          navCodes: 'nav100059',
          productCenterCode: 'TradingPlatform',
        },
      })
      console.log(res, 123123)
      if (res.code === 200) {
        console.log('请求成功')
        return {
          result: res,
        }
      }
      console.log('请求失败')
      return {
        result: squareData,
      }
    } catch (error) {
      console.log('请求出错')
      // 请求出错也要保证页面正常显示
      return { result: squareData }
    }
  },
  data() {
    return {
      rollNav: [],
      activityList: [
        {
          code: 1,
          image: 'https://cdn.shupian.cn/sp/cms/ez8a9vi6jyo0000.png',
          name: '超值代金券',
          url: '0',
        },
        {
          code: 2,
          image: 'https://cdn.shupian.cn/sp/cms/ee3l9js9h3k0000.png',
          name: '99元特价',
          url: '0',
        },
        {
          code: 3,
          image: 'https://cdn.shupian.cn/sp/cms/6mh3bw3bc5w0000.png',
          name: '限时秒杀',
          url: '0',
        },
        {
          code: 4,
          image: 'https://cdn.shupian.cn/sp/cms/fqbhxgoujgo0000.png',
          name: '千万补贴',
          url: '0',
        },
      ],
      swipeList: [
        {
          bg: 'https://cdn.shupian.cn/sp/cms/a56pxqsy0jc0000.png',
          code: 1,
          describe: '',
          title: '',
        },
      ],
      giftBagList: [
        {
          code: 1,
          img: 'https://cdn.shupian.cn/sp/cms/btuw373z9wg0000.png',
          label: '新人价',
          price: '2000元',
          title: '天樽宝坊',
          url: '0',
        },
        {
          code: 2,
          img: 'https://cdn.shupian.cn/sp/cms/es7krnjb70w0000.png',
          label: '新人价',
          price: '1688元',
          title: '沁芳泉',
          url: '0',
        },
        {
          code: 3,
          img: 'https://cdn.shupian.cn/sp/cms/ac3oij17knc0000.png',
          label: '新人价',
          price: '1888元',
          title: '町月小筑',
          url: '0',
        },
      ],
    }
  },
  mounted() {
    try {
      if (JSON.stringify(this.result.data) !== '{}') {
        this.navDetail(this.result.data.navs.nav100059)
        if (this.result.data.adList.length > 0) {
          this.getData(this.result.data.adList)
        }
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
          console.log(this.activityList)
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
          console.log(this.giftBagList, 465)
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
    margin-top: -270px;
  }
}
</style>
