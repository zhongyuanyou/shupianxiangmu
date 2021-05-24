<template>
  <div class="page-content">
    <!-- S 头部Header -->
    <div class="header-bg">
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

    <!-- S 金刚区 -->
    <Nav :roll-nav="rollNav" class="nav"></Nav>
    <!-- E 金刚区 -->

    <!-- S 工具 -->
    <Tools v-if="false" class="tools" />
    <!-- E 工具 -->

    <!-- S 我要借款 -->
    <Loan />
    <!-- E 我要借款 -->

    <!-- S 新人专属礼包 -->
    <NewcomerPack class="newcomer-pack" />
    <!-- E 新人专属礼包 -->

    <!-- S 点我咨询和资讯直播 -->
    <Live />
    <!-- E 点我咨询和资讯直播 -->

    <!-- S 活动 -->
    <Activities class="activities" />
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
import Nav from '@/components/spread/common/Nav.vue'
import Header from '@/components/spread/common/NavTop.vue'
import Activities from '@/components/spread/promotionHome/financingLoan/Activities.vue'
import Live from '@/components/spread/promotionHome/financingLoan/Live.vue'
import Loan from '@/components/spread/promotionHome/financingLoan/Loan.vue'
import NewcomerPack from '@/components/spread/promotionHome/financingLoan/NewcomerPack.vue'
import Tools from '@/components/spread/promotionHome/financingLoan/Tools.vue'
import Notice from '@/components/financing/common/Notice'
import FinancingList from '@/components/spread/promotionHome/financingLoan/FinancingList'
import BottomNotes from '@/components/spread/promotionHome/financingLoan/BottomNotes.vue'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
export default {
  name: 'Index',
  mixins: ['imHandle'],
  components: {
    [Toast.name]: Toast,
    Header,
    Nav,
    Activities,
    Live,
    Loan,
    NewcomerPack,
    Tools,
    FinancingList,
    Notice,
    BottomNotes,
    BtnPlanner,
  },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(`${newSpreadApi.list}`, {
        // const res = await $axios.get(url, {
        params: {
          locationCodes:
            'ad113242,ad113239,ad100048,ad113237,ad113234,ad100050',
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
      rollNav: [
        {
          code: 1,
          name: '企业贷',
          url: '',
          label: '',
          size: 'big',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/fs3c25ztbk80000.png',
        },
        {
          code: 2,
          name: '有抵押贷',
          url: '',
          label: '',
          size: 'big',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/4wwtf6yr0m80000.png',
        },
        {
          code: 3,
          name: '无抵押贷',
          url: '',
          label: '',
          size: 'big',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/8v4ibhewj300000.png',
        },
        {
          code: 4,
          name: '我有车',
          url: '',
          label: '',
          size: 'big',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/2wzb1t4y4640000.png',
        },
        {
          code: 5,
          name: '我有房',
          url: '',
          label: '',
          size: 'big',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/2vhkegwaogk0000.png',
        },
        {
          code: 6,
          name: '大额借款',
          url: '',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/204jg9dseeo000.png',
        },
        {
          code: 7,
          name: '快速借钱',
          url: '',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/1ic9r4qxwdsw000.png',
        },
        {
          code: 8,
          name: '信用贷款',
          url: '',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6a280h75tbk0000.png',
        },
        {
          code: 9,
          name: '免费咨询',
          url: '',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/dl1corse37s0000.png',
        },
        {
          code: 10,
          name: '全部',
          url: '',
          label: '',
          size: 'small',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/5mym0kibchg000.png',
        },
      ],
      activityList: [
        {
          title: '签到有礼',
          desc: '天天领福利',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/a1nyy8rq0fc0000.png',
          url: '',
        },
        {
          title: '领券中心',
          desc: '省钱券包',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bvcj0w07g000000.png',
          url: '',
        },
        {
          title: '点我抽奖',
          desc: '现金红包待领',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/dahfjspspsw0000.png',
          url: '',
        },
        {
          title: '有奖问答',
          desc: '涨知识享豪礼',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/89fka9m5m3o0000.png',
          url: '',
        },
      ],
      liveList: [
        {
          title: '点我咨询',
          desc: '一键咨询全贷款业务',
          label: '先服务后收费',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9szxp9wdiio0000.png',
          url: '',
        },
        {
          title: '资讯直播',
          desc: '精彩直播 等你来找',
          label: '直播中',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bz3o6gdyrug0000.png',
          url: '',
        },
      ],
      newcomerPackList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/g5x72ibmgj40000.png',
          title: '测额度得红包',
          desc: '最高得888元',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/alx5rih2hw00000.png',
          title: '限时抢券',
          desc: '抢7天免息券',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7097zqzjqa80000.png',
          title: '贷即得',
          desc: '年利率7%起',
          url: '',
        },
        {},
      ],
      toolList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/cyb9mn6k7lk0000.png',
          title: '额度评估',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/76nvcmvpmlw0000.png',
          title: '贷款计算器',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6cb9xtrp8h80000.png',
          title: '智能贷款',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/cjraco2vifc0000.png',
          title: '申请进度',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/enxy8p7b2k00000.png',
          title: '我的贷款',
          url: '',
        },
      ],
      // 我要借贷
      loans: {},
      // 列表导航
      titleName: [
        {
          code: 1,
          type: 'FL20210425163778',
          name: '精选贷款',
        },
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
          path: 'CPSCustomer:CPSCustomer/CPSBaseWebViewController///push/animation',
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
    toast() {
      Toast('功能正在建设中，敬请期待')
    },
    // 处理导航数据
    handleNavData(navsData) {
      if (!navsData) return
      const navArr = navsData.nav100058 || []
      const rollNav = []
      navArr.forEach((item, index) => {
        // this.rollNav[navArr.length - 1 - index].name = item.name
        // this.rollNav[navArr.length - 1 - index].url = item.url
        // this.rollNav[navArr.length - 1 - index].imageUrl =
        //   item.navigationImageUrl

        rollNav.push({
          sort: item.sort,
          code: index + 1,
          name: item.name,
          url: item.url,
          label: '',
          size: index + 1 > navArr.length / 2 ? 'big' : 'small',
          imageUrl: item.navigationImageUrl,
        })
      })
      // rollNav.reverse()
      this.rollNav = rollNav
      this.rollNav.sort((a, b) => {
        return a.sort - b.sort
      })
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
          case 'ad113242': {
            const list = item.sortMaterialList
            for (let i = 0; i < list.length; i++) {
              const title = list[i].materialList[0].materialName.split('#')[1]
              this.activityList[i].title = title
              this.activityList[i].desc =
                list[i].materialList[0].materialDescription
              this.activityList[i].img = list[i].materialList[0].materialUrl
              this.activityList[i].url = list[i].materialList[0].materialLink
            }
            break
          }
          // 资讯直播广告位
          case this.isInApp ? 'ad100048' : 'ad113239': {
            // const splitArr = item.locationName.split('#')
            const list = item.sortMaterialList[0].materialList[0]
            const index = 1

            this.liveList[index].title = list.materialDescription.split('#')[0]
            this.liveList[index].label = list.materialName.split('#')[1] || ''

            this.liveList[index].desc = list.materialDescription.split('#')[1]
            this.liveList[index].img = list.materialUrl
            this.liveList[index].url = list.materialLink
            break
          }
          // 点我咨询广告位
          case 'ad113237': {
            // const splitArr = item.locationName.split('#')
            const list = item.sortMaterialList[0].materialList[0]
            const index = 0

            this.liveList[index].title = list.materialDescription.split('#')[0]
            this.liveList[index].label = list.materialName.split('#')[1] || ''

            this.liveList[index].desc = list.materialDescription.split('#')[1]
            this.liveList[index].img = list.materialUrl
            this.liveList[index].url = list.materialLink
            break
          }
          // 新人礼包广告位
          case 'ad113234': {
            const list = item.sortMaterialList
            for (let i = 0; i < list.length; i++) {
              const title =
                list[i].materialList[0].materialName.split('#')[1] || ''
              console.log(title)
              this.newcomerPackList[i].title = title
              this.newcomerPackList[i].desc =
                list[i].materialList[0].materialDescription
              this.newcomerPackList[i].img = list[i].materialList[0].materialUrl
              this.newcomerPackList[i].url =
                list[i].materialList[0].materialLink
            }
            break
          }
          // 广告图
          case 'ad100050': {
            const list = item.sortMaterialList[0].materialList[0]
            const obj = {
              image: list.materialUrl || '',
              url: list.materialLink,
            }
            this.loans = obj
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
  .header-bg {
    width: 100%;
    height: 420px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/images/bmjxoxb7fq80000.png')
      no-repeat;
    background-size: 100% 100%;

    .header-content {
      margin-left: 38px;
      margin-top: 50px;

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
    margin-top: -70px;
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
    margin-bottom: 20px;
  }
  .bottom-notes {
    margin-top: 40px;
    padding-bottom: 60px;
  }
}
</style>
