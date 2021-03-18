<template>
  <div class="internet">
    <!-- 头部 -->
    <div class="head"><Header title="IT互联网" /></div>
    <!-- 金刚区 -->
    <Nav :roll-nav="rollNav" class="nav"></Nav>
    <!-- 新人红包 -->
    <GiftBag
      v-show="giftBagList.length"
      class="gift-bag"
      :gift-bag-list="giftBagList"
    ></GiftBag>
    <!-- 活动功能展示 -->
    <Advertising :advertising-list="advertisingList"></Advertising>
    <!-- 产品列表 -->
    <Recommended></Recommended>
  </div>
</template>

<script>
import Nav from '@/components/spread/common/Nav.vue'
import Header from '@/components/spread/common/NavTop.vue'
import GiftBag from '@/components/spread/promotionHome/internetHomePage/GiftBag.vue'
import Advertising from '@/components/spread/promotionHome/internetHomePage/Advertising.vue'
import Recommended from '@/components/spread/promotionHome/internetHomePage/Recommended.vue'
import { chipSpread } from '@/api/spread'
export default {
  components: {
    Header,
    Nav,
    GiftBag,
    Advertising,
    Recommended,
  },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(chipSpread.list, {
        params: {
          locationCodes:
            'ad113267,ad113229,ad113270,ad113271,ad113272,ad113274,ad113280',
          navCodes: 'nav100061',
          productCenterCode: 'Internet',
        },
      })
      if (res.code === 200) {
        console.log(res)
        return {
          result: res,
        }
      } else if (res.code === 500) {
        console.log(222)
      }
    } catch (error) {
      // 请求出错也要保证页面正常显示

      return { error }
    }
  },
  data() {
    return {
      rollNav: [
        {
          code: 1,
          name: '网站定制',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/a95v0th86vc0000.png',
        },
        {
          code: 2,
          name: '品牌设计',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/11ilq5lopx0w000.png',
        },
        {
          code: 3,
          name: '模板建站',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/7xn38kj61ss0000.png',
        },
        {
          code: 4,
          name: '电商运营',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/b4xa2dqxmjc0000.png',
        },
        {
          code: 5,
          name: '网站设计',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/a705899vta80000.png',
        },
        {
          code: 6,
          name: '99元购',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/eb1mofs1h9k0000.png',
        },
        {
          code: 7,
          name: '小程序开发',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/5u9p6h954t40000.png',
        },
        {
          code: 8,
          name: '营销推广',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/7a4cm4ztd7s0000.png',
        },
        {
          code: 9,
          name: '云服务',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/b2251vhvizk0000.png',
        },
        {
          code: 10,
          name: '全部服务',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/fhngcdfde0o0000.png',
        },
      ],
      giftBagList: [
        {
          code: 1,
          headImage:
            'https://cdn.shupian.cn/sp-pt/wap/images/5p96k2nhcbk0000.png',
          label: '新人礼',
          title: '有限公司注册',
          price: '0元',
          url: 'https://www.baidu.com/',
        },
        {
          code: 2,
          headImage:
            'https://cdn.shupian.cn/sp-pt/wap/images/3q9xm3k8tti0000.png',
          label: '新人礼',
          title: '一般纳税人一般纳税人',
          price: '1元/月',
          url: 'https://www.baidu.com/',
        },
        {
          code: 3,
          headImage:
            'https://cdn.shupian.cn/sp-pt/wap/images/5lqtjec7rm40000.png',
          label: '新人礼',
          title: '服务代金券',
          price: '600元',
          url: 'https://www.baidu.com/',
        },
      ],
      advertisingList: {
        limitedTime: {
          title: '限时秒杀',
          describe: '爆款低价',
          product: [
            {
              code: 1,
              imgUrl:
                'https://cdn.shupian.cn/sp-pt/wap/images/apcyreeb5fc0000.png',
              label: '7.8折',
              name: '公司注册',
              url: '',
            },
            {
              code: 2,
              imgUrl:
                'https://cdn.shupian.cn/sp-pt/wap/images/8zkd9rx0ofg0000.png',
              label: '5.9折',
              name: '印章办理',
              url: '',
            },
          ],
        },
        live: {
          title: '企服直播',
          describe: '无门槛 新用户专享',
          product: [
            {
              code: 1,
              url: '',
              imgUrl:
                'https://cdn.shupian.cn/sp-pt/wap/images/bs87fvzhfj40000.png',
            },
          ],
        },
        freeTrial: {
          title: '免费试用',
          describe: '0元体验 名额有限',
          product: [
            {
              code: 1,
              imgUrl:
                'https://cdn.shupian.cn/sp-pt/wap/images/28w72vpghji8000.png',
              label: '先到先得',
              name: '公司核名',
              url: '',
            },
            {
              code: 2,
              imgUrl:
                'https://cdn.shupian.cn/sp-pt/wap/images/adl42ccahqw0000.png',
              label: '先到先得',
              name: '商标查询',
              url: '',
            },
          ],
        },
        course: {
          title: '薯片课程',
          describe: '优质课程 创业首选',
          product: [
            {
              code: 1,
              imgUrl:
                'https://cdn.shupian.cn/sp-pt/wap/images/a9jhw70ccbc0000.png',
              label: '',
              name: '权威推荐',
              url: '',
            },
            {
              code: 2,
              imgUrl:
                'https://cdn.shupian.cn/sp-pt/wap/images/e5pl0mu08fk0000.png',
              label: '',
              name: '创业首选',
              url: '',
            },
          ],
        },
      },
    }
  },

  mounted() {
    try {
      if (JSON.stringify(this.resultData) !== '{}') {
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    getMsg() {},

    // 跳转判断
    openIM(url) {
      if (url) {
        window.location.href = url
      } else {
        const guiHuaShi = this.planner
        this.$root.$emit(
          'openIMM',
          guiHuaShi.id,
          guiHuaShi.name || '',
          guiHuaShi.jobNum || '',
          guiHuaShi.imgSrc || ''
        )
      }
    },
    // 金刚区数据处
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
      title: '互联网交易',
    }
  },
}
</script>

<style lang="less" scoped>
.internet {
  margin: 0 auto;
  width: 750px;
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
  .gift-bag {
    margin-top: 20px;
  }
}
</style>
