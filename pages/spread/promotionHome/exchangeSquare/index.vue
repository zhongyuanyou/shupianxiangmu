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

export default {
  components: { Header, Nav, Activity, Banner, GiftBag, Transaction },
  //   async asyncData({ $axios }) {
  //     const url = 'http://172.16.132.70:7001/service/nk/chipSpread/v1/list.do'
  //     try {
  //       const res = await $axios.get(url, {
  //         params: {
  //           locationCodes: 'ad113215',
  //           navCode: 'nav100059',
  //           productCenterCode: 'TradingPlatform',
  //         },
  //       })
  //       if (res.code === 200) {
  //         return {
  //           result: res,
  //         }
  //       } else if (res.code === 500) {
  //         console.log(222)
  //       }
  //     } catch (error) {
  //       // 请求出错也要保证页面正常显示
  //       return { error }
  //     }
  //   },
  data() {
    return {
      rollNav: [
        {
          code: 1,
          name: '专利交易',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/hydg90tse6g000.png',
        },
        {
          code: 2,
          name: '公司交易',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/7bruwywz4180000.png',
        },
        {
          code: 3,
          name: '商标交易',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/2coipzbrfh7o000.png',
        },
        {
          code: 4,
          name: '资质服务',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/c3920lciads0000.png',
        },
        {
          code: 5,
          name: '免费咨询',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/62r574txu500000.png',
        },
        {
          code: 6,
          name: '交易排行榜',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/a05vlejyaw00000.png',
        },
        {
          code: 7,
          name: '独家资源',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/dotigsqsbeo0000.png',
        },
        {
          code: 8,
          name: '我要出售',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/1r6tu787vybk000.png',
        },
        {
          code: 9,
          name: '企知道',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/283jenvgpack000.png',
        },
        {
          code: 10,
          name: '全部交易',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/fhngcdfde0o0000.png',
        },
      ],
      activityList: [
        {
          code: 1,
          name: '超值代金券',
          image: 'https://cdn.shupian.cn/sp-pt/wap/images/9bx6gknv8wk0000.png',
          url: '',
        },
        {
          code: 2,
          name: '99元特价',
          image: 'https://cdn.shupian.cn/sp-pt/wap/images/8w63dgy0wu80000.png',
          url: '',
        },
        {
          code: 3,
          name: '限时秒杀',
          image: 'https://cdn.shupian.cn/sp-pt/wap/images/6832vy6dwmc0000.png',
          url: '',
        },
        {
          code: 4,
          name: '千万补贴',
          image: 'https://cdn.shupian.cn/sp-pt/wap/images/dnrhzcqyt9k0000.png',
          url: '',
        },
      ],
      swipeList: [
        {
          code: 1,
          title: '薯片新春福气献礼',
          describe: '限量3000份新人好礼 立即领取',
          bg: 'https://cdn.shupian.cn/sp-pt/wap/images/6th0ikipz4k0000.png',
        },
        {
          code: 2,
          title: '薯片新春福气献礼',
          describe: '限量3000份新人好礼 立即领取',
          bg: 'https://cdn.shupian.cn/sp-pt/wap/images/6th0ikipz4k0000.png',
        },
        {
          code: 3,
          title: '薯片新春福气献礼',
          describe: '限量3000份新人好礼 立即领取',
          bg: 'https://cdn.shupian.cn/sp-pt/wap/images/6th0ikipz4k0000.png',
        },
      ],
      giftBagList: [
        {
          code: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3bn8rm88ieo0000.png',
          label: '新人价',
          title: '天樽宝坊',
          price: '2000',
          url: '',
        },
        {
          code: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/395qixemsq60000.png',
          label: '新人价',
          title: '沁芳泉 QIN…',
          price: '1688',
          url: '',
        },
        {
          code: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5dd0jek3ne40000.png',
          label: '新人价',
          title: '町月小筑',
          price: '1888',
          url: '',
        },
      ],
    }
  },
  mounted() {
    try {
      if (JSON.stringify(this.resultData) !== '{}') {
        this.navDetail(this.result.data.navList)
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
        this.rollNav = navList
      }
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
