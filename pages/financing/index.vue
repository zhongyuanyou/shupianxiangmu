<template>
  <div class="page-content">
    <!-- S 头部Header -->
    <div class="header-bg" :class="isInApp ? 'header-inapp-bg' : ''">
      <Header
        title="企业助贷"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
      <div class="header-content">
        <h1 class="header-title">薯片借钱 · 安全放心</h1>
        <p class="header-desc">钱好还人情难还，借钱这里更方便</p>
      </div>
    </div>
    <!-- E 头部Header -->
    <!-- 一键贷款表单S  -->
    <Borrowing></Borrowing>
    <!-- 一键贷款表单E-->
    <!-- S 金刚区 -->
    <NavBar :nav-list="rollNav"></NavBar>
    <!-- <Nav
      v-show="rollNav.length > 0"
      :roll-nav="rollNav"
      class="nav"
      :class="isInApp ? 'nav_top' : ''"
    ></Nav> -->
    <!-- E 金刚区 -->

    <!-- S 工具 -->
    <Tools v-if="true" class="tools" />
    <!-- E 工具 -->

    <!-- 广告展示 S -->
    <Advertising :ad-list="activities"></Advertising>
    <!-- 广告展示 E -->
    <!-- 活动展示 S -->
    <Activity :activity-list="projectList"></Activity>
    <!-- 活动展示 E -->
    <!-- S 我要借款 -->
    <!-- <Loan /> -->
    <!-- E 我要借款 -->

    <!-- S 新人专属礼包 -->
    <!-- <NewcomerPack class="newcomer-pack" /> -->
    <!-- E 新人专属礼包 -->

    <!-- S 点我咨询和资讯直播 -->
    <!-- <Live /> -->
    <!-- E 点我咨询和资讯直播 -->

    <!-- S 活动 -->
    <!-- <Activities class="activities" /> -->
    <!-- E 活动 -->

    <!-- S 轮播咨询 -->
    <Notice />
    <!-- E 轮播咨询 -->

    <!-- S 产品推荐列表 -->
    <!-- <ProductList /> -->
    <FinancingList :title-name="titleName" />
    <!-- E 产品推荐列表 -->

    <!-- S 底部注释 -->
    <BottomNotes class="bottom-notes" />
    <!-- E 底部注释 -->

    <!-- START 规划师-->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" :md="fixedMd" />
    <!-- END 规划师-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from '@chipspc/vant-dgg'
import { plannerApi, newSpreadApi } from '@/api/spread'
import NavBar from '@/components/financing/common/NavBar.vue'
import Header from '@/components/spread/common/NavTop.vue'
import Advertising from '@/components/financing/common/Advertising.vue'
import Activity from '@/components/financing/common/Activity.vue'
// import Activities from '@/components/spread/promotionHome/financingLoan/Activities.vue'
// import Live from '@/components/spread/promotionHome/financingLoan/Live.vue'
// import Loan from '@/components/spread/promotionHome/financingLoan/Loan.vue'
// import NewcomerPack from '@/components/spread/promotionHome/financingLoan/NewcomerPack.vue'
import Tools from '@/components/spread/promotionHome/financingLoan/Tools.vue'
import Notice from '@/components/financing/common/Notice.vue'
import FinancingList from '@/components/spread/promotionHome/financingLoan/FinancingList.vue'
import BottomNotes from '@/components/spread/promotionHome/financingLoan/BottomNotes.vue'
import BtnPlanner from '@/components/spread/common/BtnPlanner.vue'
import Borrowing from '@/components/financing/common/Borrowing.vue'
import openappChips from '~/mixins/openappChips'
import imHandle from '@/mixins/imHandle'
import isLogin from '@/mixins/isLogin'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'Index',
  components: {
    [Toast.name]: Toast,
    Header,
    NavBar,
    Advertising,
    Activity,
    // Activities,
    // Live,
    // Loan,
    // NewcomerPack,
    Tools,
    FinancingList,
    Notice,
    BottomNotes,
    BtnPlanner,
    Borrowing,
  },
  mixins: [imHandle, isLogin, openappChips],
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(`${newSpreadApi.list}`, {
        // const res = await $axios.get(url, {
        params: {
          //   locationCodes:
          //     'ad113242,ad113239,ad100048,ad113237,ad113234,ad100050',
          locationCodes: 'ad100092,ad100093,ad100094',
          navCodes: 'nav100058',
          code: 'CRISPS-C-RZDK',
        },
      })
      console.log(
        'chipSpread.list FinancingLoan success：',
        res.code + '--' + res.message
      )
      if (res.code === 200) {
        return {
          resultData: res,
        }
      } else {
        return {
          // resultData: null,
        }
      }
    } catch (error) {
      console.log('chipSpread.list error：', error.message)
      // 请求出错也要保证页面正常显示
      return {
        // resultData: null,
      }
    }
  },
  data() {
    return {
      placeholder: '请输入关键字',
      // 默认数据
      rollNav: [],
      toolList: [], // 工具列表
      // 我要借贷
      loans: {},
      // 列表导航
      titleName: [
        // {
        //   code: 1,
        //   type: 'FL20210425163778',
        //   name: '精选贷款',
        // },
      ],
      // 页面规划师
      pagePlanner: {},
      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '知识产权聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
      activities: [], // 活动数据列表
      projectList: [], // 专题列表
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    // 请求出错也要保证页面正常显示：使用默认数据
    try {
      if (JSON.stringify(this.resultData) !== '{}') {
        this.productClassData(this.resultData.data.classList || [])
        this.handleNavData(this.resultData.data.navs)
        this.handleAdData(this.resultData.data.adList)
      }
    } catch (error) {
      console.log(error)
    }
  },
  created() {
    if (process.client) {
      // 请求
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  methods: {
    // 搜索
    clickInputHandle(e) {
      console.log(this.$router)
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
      } else {
        window.location.href = 'https://m.shupian.cn/search/'
      }
    },
    // 处理导航数据
    handleNavData(navsData) {
      if (!navsData) return
      const navArr = navsData.nav100058 || []
      const rollNav = []
      navArr.forEach((item, index) => {
        rollNav.push({
          title: item.name,
          url: item.url,
          icon: item.navigationImageUrl,
        })
      })
      // rollNav.reverse()
      this.rollNav = rollNav
      this.rollNav.reverse()
      const toolArr = navsData.nav100063 || []
      toolArr.forEach((item, index) => {
        this.toolList[navArr.length - 1 - index].name = item.name
        this.toolList[navArr.length - 1 - index].url = item.url
        this.toolList[navArr.length - 1 - index].img = item.navigationImageUrl
      })
    },
    // 处理广告位数据：页面有多个广告位置
    handleAdData(adData) {
      if (!adData || !(adData.length > 0)) return
      adData.forEach((item, index) => {
        switch (item.locationCode) {
          // 活动广告位
          case 'ad100092': {
            item.sortMaterialList.forEach((elem, idx) => {
              const tool = elem.materialList[0]
              const obj = {
                title: tool.materialName.split('-')[2],
                img: tool.materialUrl,
                url: tool.materialLink,
              }
              this.toolList.push(obj)
            })
            break
          }

          // 新人礼包广告位
          case 'ad100093': {
            item.sortMaterialList.forEach((elem, idx) => {
              const activity = elem.materialList[0]
              const obj = {
                title: activity.materialName.split('-')[2],
                tag: activity.materialDescription.split('#')[0],
                slogan: activity.materialDescription.split('#')[1],
                img: activity.materialUrl,
                url: activity.materialLink,
                type: activity.executeParam,
              }
              this.activities.push(obj)
            })
            console.log(this.activities)
            break
          }
          // 新人礼包广告位
          case 'ad100094': {
            item.sortMaterialList.forEach((elem, idx) => {
              const projec = elem.materialList[0]

              const obj = {
                title: projec.materialName.split('-')[2],
                img: projec.materialUrl,
                url: projec.materialLink,
              }
              this.projectList.push(obj)
            })
            break
          }
        }
      })
    },
    // 列表导航
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
              firstTypeCode: 'FL20210425164558', // 一级code
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
    jumpLink(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
        } else {
          this.$refs.plannerIM.onlineConsult()
        }
      }
    },
    jumpLink2(url, title) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
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
      if (title === '点我咨询' && this.isInApp) {
        const iOSRouter = {
          path: 'CPSCustomer:CPSCustomer/CPSBaseWebViewController///push/animation',
          parameter: {
            urlstr: url,
            isHideNav: 1,
          },
        }
        const androidRouter = {
          path: '/common/android/SingleWeb',
          parameter: {
            urlstr: url,
            isHideNav: 1,
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
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
          return
        }
      }
      this.$refs.plannerIM.onlineConsult()
    },
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  height: auto;
  background: #f5f5f5;
  margin: 0 auto;
  .header-inapp-bg {
    width: 100%;
    background-color: #4974f5;
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/ejkedv574qw0000.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 500px;
    background-position: 0 48px;
  }
  .header-bg {
    width: 100%;
    height: 500px;
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/ejkedv574qw0000.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .header-content {
      margin-left: 38px;
      margin-top: 90px;
      .header-title {
        font-size: 48px;
        font-weight: 600;
        color: #ffffff;
        line-height: 48px;
        margin-bottom: 20px;
      }

      .header-desc {
        font-size: 26px;
        font-weight: 400;
        color: #ffffff;
        line-height: 26px;
      }
    }
  }
  .nav {
    margin-top: -112px;
  }
  .nav_top {
    margin-top: -76px;
  }
  .tools {
    margin-top: 18px;
    margin-bottom: 20px;
  }
  .newcomer-pack {
    margin: 20px 0;
  }
  .activities {
    margin-top: 16px;
    margin-bottom: 32px;
  }
  .bottom-notes {
    margin-top: 40px;
    padding-bottom: 60px;
  }
}
</style>
