<template>
  <div class="law">
    <!-- 头部导航 -->
    <div class="head">
      <Header title="法律服务" :is-black="true" :default-color="0"></Header>
      <div class="head-content">
        <ul>
          <li v-for="(item, index) in headContent" :key="index">
            <a :href="item.url">
              <img :src="item.img" alt="" />
              <span class="title">{{ item.title }}</span>
              <span class="describe">{{ item.describe }}</span></a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- 金刚区 -->
    <Nav :roll-nav="rollNav" class="nav"></Nav>
    <!-- banner -->
    <Banner :swipe-list="swipeList" v-if="swipeList.length !== 0"></Banner>
    <!-- vip礼包 -->
    <GiftBag :gift-list="giftList" v-if="giftList.length !== 0"></GiftBag>
    <!-- 律师直播 -->
    <LawyerLive :lawyer-live="lawyerLive" />
    <!-- 推荐律师 -->
    <RecommendLaw
      :recommend-list="recommendLaw"
      :recommend-law-nav="recommendLawNav"
    ></RecommendLaw>
    <!-- 法律服务 -->
    <LawService></LawService>
    <!-- 推荐律师列表 -->
    <RecommendList
      :recommend-list="recommendList"
      :service-list="serviceList"
    ></RecommendList>
    <!-- 占位符 -->
    <!-- <div class="box"></div> -->
    <!-- 底部导航
    <Bottom ref="bottom"></Bottom>
    <div class="iphone-box" v-show="iphoneBox"></div> -->
  </div>
</template>

<script>
import Header from '@/components/spread/common/NavTop.vue'
import Nav from '@/components/spread/common/Nav.vue'
import Banner from '@/components/spread/promotionHome/law/BannerSwipe.vue'
import GiftBag from '@/components/spread/promotionHome/law/GiftBag.vue'
import RecommendLaw from '@/components/spread/promotionHome/law/RecommendLaw.vue'
import LawService from '@/components/spread/promotionHome/law/LawService.vue'
import RecommendList from '@/components/spread/promotionHome/law/RecommendList.vue'
import LawyerLive from '@/components/spread/promotionHome/law/LawyerLive'
import { chipSpread } from '@/api/spread'
import defaultList from '@/assets/spread/promotionHome/law.js'
// import Bottom from '@/components/spread/common/FixedBottom.vue'
export default {
  components: {
    Header,
    Nav,
    Banner,
    GiftBag,
    RecommendLaw,
    LawService,
    RecommendList,
    LawyerLive,
    // Bottom,
  },
  async asyncData({ $axios }) {
    // const url = 'http://172.16.132.70:7001/service/nk/chipSpread/v1/list.do'
    try {
      const res = await $axios.get(chipSpread.list, {
        params: {
          locationCodes: 'ad113248,ad113249,ad113251,ad113254',
          navCodes: 'nav100062,nav100055',
          productCenterCode: 'LawService',
        },
      })
      if (res.code === 200) {
        return {
          result: res,
        }
      } else if (res.code === 500) {
        return { result: defaultList }
      }
    } catch (error) {
      // 请求出错也要保证页面正常显示
      console.log(error)
      return {
        result: defaultList,
      }
    }
  },
  data() {
    return {
      iphoneBox: true,
      productClassID: '',
      // 相关服务信息
      serviceList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
          title: '一对一法律咨询',
          desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
          currentPrice: '5900',
          originalPrice: '20000',
          saleNum: '5200',
          tabs: ['专业律师团队', '高效沟通', '全流程监管'],
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
          title: '一对一法律咨询',
          desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
          currentPrice: '5900',
          originalPrice: '20000',
          saleNum: '5200',
          tabs: ['专业律师团队', '高效沟通', '全流程监管'],
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
          title: '一对一法律咨询',
          desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
          currentPrice: '5900',
          originalPrice: '20000',
          saleNum: '5200',
          tabs: ['专业律师团队', '高效沟通', '全流程监管'],
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
          title: '一对一法律咨询',
          desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
          currentPrice: '5900',
          originalPrice: '20000',
          saleNum: '5200',
          tabs: ['专业律师团队', '高效沟通', '全流程监管'],
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
          title: '一对一法律咨询',
          desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
          currentPrice: '5900',
          originalPrice: '20000',
          saleNum: '5200',
          tabs: ['专业律师团队', '高效沟通', '全流程监管'],
          url: '',
        },
      ],
      headContent: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/qmkiiunr39c000.png',
          title: '极速咨询',
          describe: '60秒律师响应',
        },
        {
          code: 2,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/65g44iboxro0000.png',
          title: '找律师',
          describe: '按领域按专业',
        },
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3r33hg31nao0000.png',
          title: '案件委托',
          describe: '先服务后收费',
        },
      ],
      rollNav: [
        {
          code: 1,
          name: '免费咨询',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/91yu473xe5o0000.png',
        },
        {
          code: 2,
          name: '极速咨询',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/4vgoqr939400000.png',
        },
        {
          code: 3,
          name: '交通事故',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/lw5ctvoaj40000.png',
        },
        {
          code: 4,
          name: '劳动工伤',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/2jx80w6xlcq0000.png',
        },
        {
          code: 5,
          name: '房产纠纷',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/dh6v8iulkhc0000.png',
        },
        {
          code: 6,
          name: '债务中心',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/1gg0km65q9y8000.png',
        },
        {
          code: 7,
          name: '刑事辩护',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/12ffvyelurb4000.png',
        },
        {
          code: 8,
          name: '预约律师',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/awws0g6zqeo0000.png',
        },
        {
          code: 9,
          name: '福利中心',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/1mu1ipxulqn4000.png',
        },
        {
          code: 10,
          name: '全部服务',
          url: 'https://www.baidu.com/',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/fhngcdfde0o0000.png',
        },
      ],
      swipeList: [
        {
          code: 1,
          //   title: '薯片新春福气献礼',
          //   describe: '限量3000份新人好礼 立即领取',
          bg: 'https://cdn.shupian.cn/sp-pt/wap/images/9808jn3cwls0000.png',
        },
        {
          code: 2,
          //   title: '薯片新春福气献礼',
          //   describe: '限量3000份新人好礼 立即领取',
          bg: 'https://cdn.shupian.cn/sp-pt/wap/images/9808jn3cwls0000.png',
        },
        {
          code: 3,
          //   title: '薯片新春福气献礼',
          //   describe: '限量3000份新人好礼 立即领取',
          bg: 'https://cdn.shupian.cn/sp-pt/wap/images/9808jn3cwls0000.png',
        },
      ],
      giftList: {
        giftImg: 'https://cdn.shupian.cn/sp-pt/wap/images/dtabg6r28000000.png',
        product: [
          {
            code: 1,
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/f9qmp6g3nsw0000.png',
            label: '在现咨询',
            title: '云端律师',
            url: '',
          },
          {
            code: 2,
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/cjt89bnylu00000.png',
            label: '',
            title: '限诉讼代理',
            url: '',
          },
          {
            code: 3,
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/cjt89bnylu00000.png',
            label: '',
            title: '限诉讼代理',
            url: '',
          },
        ],
      },
      // 直播
      lawyerLive: [
        {
          code: 1,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/202n6vub74jk000.png',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/b5fhtb9i43k0000.png',
          url: '',
          name: '杜小雪',
          info: '顶律网首席律师',
          introduce: '专家律师直播讲解刑事辩护、交通',
        },
        {
          code: 2,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/bwrbr63moio0000.png',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/a4bf74ekxzc000.png',
          url: '',
          name: '杜小雪',
          info: '顶律网首席律师',
          introduce: '专家律师直播讲解刑事辩护、交通',
        },
        {
          code: 3,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/202n6vub74jk000.png',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/b5fhtb9i43k0000.png',
          url: '',
          name: '杜小雪',
          info: '顶律网首席律师',
          introduce: '专家律师直播讲解刑事辩护、交通',
        },
      ],
      // 推荐律师
      recommendLawNav: [
        { code: 1, title: '婚姻家庭' },
        { code: 2, title: '劳动仲裁' },
        { code: 3, title: '债务债权' },
        { code: 4, title: '刑事辩护' },
      ],
      recommendLaw: [
        {
          code: 1,
          name: '官律师',
          position: '主任律师',
          label: '婚姻家事、劳动仲裁',
          headImg:
            'https://cdn.shupian.cn/sp-pt/wap/images/2740j23iwfvo000.png',
        },
        {
          code: 2,
          name: '官律师',
          position: '主任律师',
          label: '婚姻家事、劳动仲裁',
          headImg:
            'https://cdn.shupian.cn/sp-pt/wap/images/emcczqcyd600000.png',
        },
        {
          code: 3,
          name: '官律师',
          position: '主任律师',
          label: '婚姻家事、劳动仲裁',
          headImg:
            'https://cdn.shupian.cn/sp-pt/wap/images/fdeuawutlr40000.png',
        },
        {
          code: 4,
          name: '官律师',
          position: '主任律师',
          label: '婚姻家事、劳动仲裁',
          headImg:
            'https://cdn.shupian.cn/sp-pt/wap/images/8lo0glw5k5s0000.png',
        },
      ],
      // 律师列表
      recommendList: [
        // { code: 1, title: '推荐律师' },
        { code: 2, title: '热门服务' },
        // { code: 3, title: '文章阅读' },
      ],
    }
  },
  created() {
    this.getProductList(1, 15, 'FL20201224136113')
  },
  mounted() {
    try {
      if (JSON.stringify(this.resultData) !== '{}') {
        this.navDetail(this.result.data.navs)
        this.getSwiper(this.result.data.adList, 'ad113248')
        this.getSwiper(this.result.data.adList, 'ad113249')
        this.getLiveList(this.result.data.adList, 'ad113251')
        this.getLawyerList(this.result.data.adList, 'ad113254')
        this.productClassID = this.result.data.productClassList[2].code
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    getProductList(page, limit, id) {
      const url =
        'http://dspmicrouag.shupian.cn/crisps-app-wap-bff-api/service/nk/chipSpread/v1/productList.do'
      this.$axios
        .get(url, {
          params: {
            pageNumber: page,
            pageSize: limit,
            classCodes: id,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            console.log('p1')
            const serviceList = []
            res.data.records.forEach((item, index) => {
              const tag = []
              item.tags.forEach((elem, idx) => {
                tag.push(elem.name)
              })
              const obj = {
                code: index + 1,
                img:
                  'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
                title: item.name,
                desc: item.productDescription,
                currentPrice:
                  ((parseFloat(item.referencePrice) / 10000) * 0.3).toFixed(2) +
                  '万',
                originalPrice:
                  (parseFloat(item.referencePrice) / 10000).toFixed(2) + '万',
                saleNum: '',
                tabs: tag,
                url: '',
              }
              serviceList.push(obj)
            })
            this.serviceList = serviceList
          } else {
            console.log('p2')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // // 判断是否是手机系统底部适配
    // getUserAgent() {
    //   const ua = navigator.userAgent.toLowerCase()
    //   if (ua.indexOf('android') !== -1) {
    //     this.iphoneBox = false
    //   } else if (ua.indexOf('iphone') !== -1) {
    //     this.$refs.bottom.$el.style = 'bottom:11px'
    //     this.iphoneBox = true
    //   }
    // },
    // 功能导航处理

    // 金刚区数据处理
    navDetail(data) {
      if (data.length === 0) {
      } else {
        const navList = []
        const headNav = []
        data.nav100055.sort((a, b) => {
          return a.sort - b.sort
        })
        data.nav100055.forEach((item, index) => {
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
        data.nav100062.sort((a, b) => {
          return b.sort - a.sort
        })
        data.nav100062.forEach((item, index) => {
          const obj = {
            code: 1,
            url: '',
            img: item.navigationImageUrl,
            title: item.name,
            describe: item.description,
          }
          headNav.push(obj)
        })
        this.headContent = headNav
      }
    },
    // 直播列表
    getLiveList(data, code) {
      const liveList = []
      if (code === 'ad113251') {
        // 律师直播数据处理
        data.forEach((item, idx) => {
          if (item.locationCode === 'ad113251') {
            item.sortMaterialList.forEach((elem, idx) => {
              const lawyer = elem.materialList[0].materialDescription.split('#')
              const obj = {
                code: idx + 1,
                bgImg: elem.materialList[0].materialUrl,
                img: lawyer[2],
                url: elem.materialList[0].materialLink,
                name: lawyer[0],
                info: lawyer[1],
                introduce: elem.materialList[0].materialName,
              }
              liveList.push(obj)
            })
            this.lawyerLive = liveList
          }
        })
      }
    },
    // 推荐规划师列表
    getLawyerList(data, code) {
      const recommendLaw = []

      // 律师直播数据处理
      data.forEach((item, idx) => {
        if (item.locationCode === 'ad113254') {
          item.sortMaterialList.forEach((elem, idx) => {
            const lawyerMsg = elem.materialList[0].materialDescription.split(
              '#'
            )
            const obj = {
              code: idx + 1,
              name: elem.materialList[0].materialName,
              position: lawyerMsg[0],
              label: lawyerMsg[1],
              headImg: elem.materialList[0].materialUrl,
            }
            recommendLaw.push(obj)
          })
          this.recommendLaw = recommendLaw
        }
      })
    },
    // 新人红包+banner
    getSwiper(data, code) {
      data.forEach((item, idx) => {
        const swiper = []
        const product = []
        // 如果code嘛匹配执行后面逻辑,banner数据处理
        if (item.locationCode === 'ad113248') {
          item.sortMaterialList[0].materialList.forEach((elem, index) => {
            const obj = {
              code: index + 1,
              bg: elem.materialUrl,
            }
            swiper.push(obj)
          })
          this.swipeList = swiper
        } else if (item.locationCode === 'ad113249') {
          // 新人红包数据处理
          item.sortMaterialList.forEach((elem, index) => {
            const obj = {
              code: index + 1,
              img: elem.materialList[0].materialUrl,
              label: elem.materialList[0].materialDescription,
              title: elem.materialList[0].materialName,
              url: elem.materialList[0].materialLink,
            }
            product.push(obj)
          })
          this.giftList[product] = product
        }
      })
    },
  },
  head() {
    return {
      title: '法律服务',
    }
  },
}
</script>

<style lang="less" scoped>
.law {
  width: 750px;
  background: #f5f5f5;
  margin: 0 auto;

  .head-content {
    width: 100%;
    padding: 20px;
    > ul {
      display: flex;
      align-items: center;
      justify-content: space-around;
      > li {
        > a {
          display: flex;
          flex-direction: column;
          align-items: center;
          > img {
            width: 134px;
            height: 92px;
          }
          .title {
            display: block;
            font-size: 26px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 30px;
            margin: 14px 10px;
          }
          .describe {
            display: block;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #555555;
            line-height: 24px;
          }
        }
      }
    }
  }
  .nav {
    margin-top: 20px;
  }
  .box {
    width: 100%;
    height: 148px;
  }
  .iphone-box {
    width: 100%;
    height: 24px;
    background: #ffffff;
    position: fixed;
    bottom: 0px;
    right: 0px;
    left: 0px;
    z-index: 10;
  }
}
</style>
