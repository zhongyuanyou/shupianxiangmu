<template>
  <div class="internet">
    <!-- 头部 -->
    <div class="head">
      <Header
        title="IT互联网"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
      <Banner :images="banner"></Banner>
      <!-- <Nav :roll-nav="rollNav" class="nav"></Nav> -->
    </div>
    <!-- 金刚区 -->
    <!-- NavBar  s-->
    <NavBar :nav-list="navList"></NavBar>
    <!-- NavBar  e-->
    <!-- 活动专区 S -->
    <ActivityZone
      v-show="activityList.length"
      :activity-list="activityList"
    ></ActivityZone>
    <!-- 活动专区E -->
    <!--咨询广播区S  -->
    <Radio></Radio>
    <!-- 咨询广播区E -->
    <!-- 热销商品 S -->
    <HotSales :images="images" :img-list="hotSales"></HotSales>
    <!-- 热销商品 E -->
    <!-- 活动专区 S -->
    <Activity :activity-list="activities"></Activity>
    <!-- 活动专区 E -->
    <!-- 免费工具 S -->
    <FreeTool :tool-list="freeTool"></FreeTool>
    <!-- 免费工具 E -->
    <!-- 规划师立即咨询 S -->
    <Planner :planner="pagePlanner"></Planner>
    <!-- 规划师立即质询 E -->
    <!-- 新人红包 -->
    <!-- <GiftBag
      v-show="giftBagList.length"
      class="gift-bag"
      :gift-bag-list="giftBagList"
    ></GiftBag> -->
    <!-- 活动功能展示 -->
    <!-- <Advertising :advertising-list="advertisingList"></Advertising> -->
    <!-- 产品列表 -->
    <Recommended
      :title-name="titleName"
      :recommended-banner="recommendedBanner"
    ></Recommended>

    <!-- 规划师 -->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Nav from '@/components/spread/common/Nav.vue'
import Header from '@/components/spread/common/NavTop.vue'
import Banner from '@/components/spread/promotionHome/internetHomePage/Banner.vue'
import NavBar from '@/components/spread/promotionHome/internetHomePage/NavBar.vue'
import ActivityZone from '@/components/spread/promotionHome/internetHomePage/ActivityZone.vue'
import Radio from '@/components/spread/promotionHome/internetHomePage/Radio.vue'
import HotSales from '@/components/spread/promotionHome/internetHomePage/HotSales.vue'
import Activity from '@/components/spread/promotionHome/internetHomePage/Activity.vue'
import FreeTool from '@/components/spread/promotionHome/internetHomePage/FreeTool.vue'
import Planner from '@/components/spread/promotionHome/internetHomePage/Planner.vue'
// import GiftBag from '@/components/spread/promotionHome/internetHomePage/GiftBag.vue'
// import Advertising from '@/components/spread/promotionHome/internetHomePage/Advertising.vue'
import Recommended from '~/components/spread/promotionHome/internetHomePage/RecommendedList.vue'
import { plannerApi, newSpreadApi } from '@/api/spread'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  components: {
    Header,
    Banner,
    NavBar,
    ActivityZone,
    Radio,
    HotSales,
    Activity,
    FreeTool,
    Planner,
    // Nav,
    // GiftBag,
    // Advertising,
    Recommended,
    BtnPlanner,
  },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(newSpreadApi.list, {
        params: {
          //  locationCodes:
          //   'ad113267,ad113270,ad113272,ad113271,ad100042,ad113274,ad100045,  ad113229,ad113270,ad113271,ad113272,ad113274,ad113280',
          locationCodes:
            'ad100086,ad100087,ad100088,ad100089,ad100090,ad100091,ad100107',
          navCodes: 'nav100061',
          code: 'CRISPS-HLW',
        },
      })

      if (res.code === 200) {
        console.log('请求成功')
        return {
          result: res,
        }
      }
      console.log('请求失败')
      // return {
      //   result: internetData,
      // }
    } catch (error) {
      console.log('请求错误')
      // 请求出错也要保证页面正常显示
      // return {
      //   result: internetData,
      // }
    }
  },
  data() {
    return {
      placeholder: '请输入关键字',
      // marginTop: -120,
      banner: [], // banner
      navList: [
        {
          title: '小程序',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/g8as29uy5e00000.png',
          url: '',
        },
        {
          title: '电商运营',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/9w68yknwru00000.png',
          url: '',
        },
        {
          title: '网站建设',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f1l4zlbscns0000.png',
          url: '',
        },
        {
          title: '营销推广',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/2m2m7l2drfs0000.png',
          url: '',
        },
        {
          title: '定制开发',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/7ratpz2wb1w0000.png',
          url: '',
        },
      ],
      titleName: [
        // {
        //   code: 'FL20210425163778',
        //   type: 'FL20210425163778',
        //   name: '推荐',
        //   describe: '猜你喜欢',
        // },
      ],
      // 页面规划师
      pagePlanner: {},
      activityList: [], // 活动区1
      images: {}, // 热销商品1
      hotSales: [], // 热销商品列表
      activities: [], // 活动区2
      freeTool: [], // 免费工具
      recommendedBanner: [],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  created() {
    if (process.client) {
      // 请求
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  mounted() {
    try {
      if (JSON.stringify(this.result) !== '{}') {
        this.navDetail(this.result.data.navs.nav100061)
        this.productClassData(this.result.data.classList || [])
        if (this.result.data.adList.length > 0) {
          this.getData(this.result.data.adList)
        } else {
          // this.getData(internetData.data.adList)
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 搜索
    clickInputHandle(e) {
      if (this.isInApp) {
        const iOSRouter = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/search/page',
          },
        }
        const androidRouter = {
          path: '/common/android/SingleWeb',
          parameter: {
            routerPath: 'cpsc/search/page',
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouter)
        const androidRouterStr = JSON.stringify(androidRouter)
        this.$appFn.dggJumpRoute(
          {
            iOSRouter: iOSRouterStr,
            androidRouter: androidRouterStr,
          },
          (res) => {
            console.log(res)
          }
        )
        return
      }
      window.location.href = 'https://m.shupian.cn/search/'
    },
    // 金刚区数据处
    navDetail(data) {
      console.log(data)
      if (data.length !== 0) {
        const navList = []
        data.forEach((item, index) => {
          const obj = {
            title: item.name,
            url: item.url,
            icon: item.navigationImageUrl,
          }
          navList.push(obj)
        })

        this.navList = navList
        this.navList.reverse()
      }
    },
    // 产品分类
    productClassData(data) {
      if (data.length === 0) return
      // const classArr = []
      data.forEach((item, index) => {
        this.titleName.push({
          type: item.ext1,
          code: item.ext1,
          name: item.name,
          children: item.children,
        })
      })
      // this.titleName = classArr
    },
    getData(data) {
      data.forEach((item, idx) => {
        // 头部banner
        if (item.locationCode === 'ad100086') {
          const bagList = []
          item.sortMaterialList.forEach((elem, index) => {
            const obj = {
              url: elem.materialList[0].materialLink,
              img: elem.materialList[0].materialUrl,
            }
            bagList.push(obj)
          })
          this.banner = bagList
        }
        // 活动专区1
        if (item.locationCode === 'ad100087') {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              img: resObj.materialUrl,
              url: resObj.materialLink,
            }
            this.activityList.push(obj)
          })
        }
        // 热销商品
        if (item.locationCode === 'ad100088') {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              img: resObj.materialUrl,
              url: resObj.materialLink,
            }
            this.images = obj
          })
        }
        if (item.locationCode === 'ad100089') {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              img: resObj.materialUrl,
              url: resObj.materialLink,
            }
            this.hotSales.push(obj)
          })
        }
        if (item.locationCode === 'ad100090') {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              img: resObj.materialUrl,
              url: resObj.materialLink,
            }
            this.activities.push(obj)
          })
        }
        if (item.locationCode === 'ad100091') {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              name: resObj.materialName.split('-')[2],
              img: resObj.materialUrl,
              url: resObj.materialLink,
            }
            this.freeTool.push(obj)
          })
        }
        if (item.locationCode === 'ad100107') {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              img: resObj.materialUrl,
              url: resObj.materialLink,
            }
            this.recommendedBanner.push(obj)
          })
        }
      })
    },
    // 推介规划师
    async getPagePlanner(scene) {
      const device = await this.$getFinger().then((res) => {
        return res
      })
      let areaCode = '510100' // 站点code
      // 站点code
      if (this.isInApp) {
        this.$appFn.dggCityCode((res) => {
          areaCode = res.data.adCode
        })
      } else {
        areaCode = this.currentCity.code
      }
      try {
        this.$axios
          .post(
            plannerApi.plannerReferrals,
            {
              login_name: '',
              deviceId: device, // 设备标识
              area: areaCode || '510100', // 站点code
              user_id: '',
              productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
              sceneId: scene, // 场景id
              level_2_ID: '', // 二级code
              platform: 'app',
              productId: '', //
              thirdTypeCodes: '', // 三级code
              firstTypeCode: 'FL20210425164016', // 一级code
            },
            {
              headers: {
                sysCode: 'cloud-recomd-api',
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            console.log(res, '调用规划师')
            if (res.code === 200 && res.data.length > 0) {
              this.pagePlanner = {
                id: res.data[0].mchUserId,
                name: res.data[0].userName,
                type: res.data[0].type,
                jobNum: res.data[0].userCenterNo,
                telephone: res.data[0].phone,
                imgSrc: res.data[0].imgaes,
              }
            }
          })
      } catch (error) {
        console.log('plannerApi.plannerReferrals error：', error.message)
      }
    },
    jumpLink(url, description, execution) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')

      // app跳转
      try {
        // 直播跳转
        if (url === 'app直播') {
          if (!this.isInApp) {
            this.openApp()
          } else {
            const iOSRouter = {
              path: 'CPSCustomer:CPSCustomer/CPSTabBarViewController///push/animation',
              parameter: {
                selectedIndex: '3',
              },
            }
            const androidRouter = {
              path: '/main/android/main',
              parameter: {
                selectedIndex: 3,
              },
            }
            const iOSRouterStr = JSON.stringify(iOSRouter)
            const androidRouterStr = JSON.stringify(androidRouter)
            this.$appFn.dggJumpRoute(
              {
                iOSRouter: iOSRouterStr,
                androidRouter: androidRouterStr,
              },
              (res) => {
                console.log(res)
              }
            )
          }
          return
        }
        // 更多路由
        if (this.isInApp && execution.split(':')[0] === 'appRouterPath') {
          const iOSRouter = {
            path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
            parameter: {
              routerPath: execution.split(':')[1] || 'cpsc/classify/page',
            },
          }
          const androidRouter = {
            path: '/common/android/SingleWeb',
            parameter: {
              routerPath: execution.split(':')[1] || 'cpsc/classify/page',
            },
          }
          const iOSRouterStr = JSON.stringify(iOSRouter)
          const androidRouterStr = JSON.stringify(androidRouter)
          this.$appFn.dggJumpRoute(
            {
              iOSRouter: iOSRouterStr,
              androidRouter: androidRouterStr,
            },
            (res) => {
              console.log(res)
            }
          )
          return
        }
        // 详情页
        if (this.isInApp && execution.split(':')[0] === 'appServiceDetails') {
          const iOSRouters = {
            path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
            parameter: {
              routerPath: execution.split(':')[1],
              parameter: { productId: description },
            },
          }
          const androidRouters = {
            path: '/flutter/main',
            parameter: {
              routerPath: execution.split(':')[1],
              parameter: { productId: description },
            },
          }
          const iOSRouterStr = JSON.stringify(iOSRouters)
          const androidRouterStr = JSON.stringify(androidRouters)
          this.$appFn.dggJumpRoute({
            iOSRouter: iOSRouterStr,
            androidRouter: androidRouterStr,
          })
          return
        }
        // 分类列表
        if (this.isInApp && execution.split(':')[0] === 'appFilter') {
          const code =
            url.split('?')[1].split('=')[1].split('&')[0] || 'FL20201224136341'
          const lastObj = `{"classCode":"${code}","field":{"${
            execution.split(':')[1] || ''
          }":"${description}"}}`
          const jsonObj = JSON.parse(lastObj)
          console.log(lastObj, execution.split(':')[0])
          this.$appFn.dggProperty(jsonObj, (res) => {})
          return
        }
      } catch (error) {
        console.log(error)
      }
      if (url) {
        if (url.indexOf('/spread/') > -1) {
          this.$router.push(url)
          return
        }
        if (url.indexOf('http') > -1) {
          window.location.href = url
          return
        }
      }
      this.$refs.plannerIM.onlineConsult()
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
  }
  .nav {
    // margin-top: -270px;
  }
  .gift-bag {
    margin-top: 20px;
  }
}
</style>
