<template>
  <div class="exchange-square">
    <!-- 头部搜索 -->
    <div class="head">
      <Header
        title="交易广场"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
      <Nav
        class="nav"
        :roll-nav="rollNav"
        :style="{ 'margin-top': marginTop + 'px' }"
      ></Nav>
    </div>
    <!-- 金刚区 -->

    <!-- 活动区 -->
    <Activity :activity-list="activityList"></Activity>
    <!-- banner -->
    <Banner :swipe-list="swipeList"></Banner>
    <!-- 新人红包 -->
    <GiftBag :gift-bag-list="giftBagList" :gift-bag-msg="giftBagMsg"></GiftBag>
    <!-- 交易产品列表 -->
    <TabServiceItem :title-name="titleName" @change="onChange">
    </TabServiceItem>

    <!-- START 规划师-->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" :md="fixedMd" />
    <!-- END 规划师-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/spread/common/NavTop.vue'
import Nav from '@/components/spread/common/Nav.vue'
import Activity from '@/components/spread/promotionHome/exchangeSquare/Activity.vue'
import Banner from '@/components/spread/promotionHome/exchangeSquare/BannerSwipe.vue'
import GiftBag from '@/components/spread/promotionHome/exchangeSquare/GiftBag.vue'
import TabServiceItem from '@/components/spread/promotionHome/exchangeSquare/TabServiceItem.vue'
import { squareData } from '@/assets/spread/promotionHome/exchangeSquare.js'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
import { newSpreadApi, plannerApi } from '~/api/spread'
// import { resultData } from '~/assets/spread/licence'

export default {
  components: {
    Header,
    Nav,
    Activity,
    Banner,
    GiftBag,
    BtnPlanner,
    TabServiceItem,
  },
  async asyncData({ $axios }) {
    const url = 'http://172.16.133.68:7002/service/nk/newChipSpread/v1/list.do'
    try {
      const res = await $axios.get(newSpreadApi.list, {
        params: {
          locationCodes: 'ad113246,ad113244,ad113281',
          navCodes: 'nav100059',
          code: 'CRISPS-C-JYGC',
        },
      })

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
      giftBagMsg: {},
      placeholder: '请输入关键字',
      // 当前列表状态
      changeState: {
        code: '',
        name: '',
      },
      defaultList: [],
      // 列表导航
      titleName: [
        {
          code: 1,
          type: 1,
          name: '商标交易',
        },
      ],
      marginTop: 0,
      // 页面规划师
      pagePlanner: {},

      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '资产交易页规划师展位点击',
          type: '售前',
        },
      },
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
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    if (process.client) {
      // 请求
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  mounted() {
    // @--神策埋点-浏览事件-只执行一次
    window.spptMd.spptTrackRow('pageview', {
      name: `推广交易广场聚合页浏览`,
      track_code: 'SPTG000002',
    })
    // @--神策埋点-浏览事件-只执行一次
    window.spptMd.spptTrackRow('p_plannerBoothVisit', {
      name: `推荐规划师浏览`,
      track_code: 'SPTG000006',
      recommend_number: '',
      planner_number: this.pagePlanner.jobNum,
      planner_name: this.pagePlanner.name,
    })
    try {
      if (JSON.stringify(this.result.data) !== '{}') {
        const dictCode = [
          'CONDITION-JY-ZZ',
          'CONDITION-JY-ZY',
          'CONDITION-JY-GS',
          'CONDITION-JY-SB',
        ]
        const titleList = []
        this.result.data.classList.forEach((item, index) => {
          const obj = {
            name: item.name,
            code: item.ext1,
            dictCode: dictCode[index] || '',
          }
          titleList.push(obj)
        })
        this.titleName = titleList
        // this.changeState = this.titleName[0]
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
    onChange(changeObj) {
      // this.changeState = changeObj
      // console.log(this.$refs.enterprise.initialize())
      // this.$refs.enterprise.initialize(changeObj)
      // if (obj.type === 1) {
      //   this.list = defaultList
      // }
    },
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
              url: elem.materialList[0].materialLink,
            }
            swiper.push(obj)
          })
          this.swipeList = swiper
        }
        // 新人红包广告位
        if (item.locationCode === 'ad113246') {
          const giftBagMsg = { name: '', giftBagList: [] }
          giftBagMsg.name = item.locationName
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
          giftBagMsg.giftBagList = giftBag
          this.giftBagMsg = giftBagMsg
        }
      })
    },
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
      // const url =
      //   'https://tspmicrouag.shupian.cn/cloud-recomd-api/nk/recommendInfo/plannerRecom.do'
      try {
        this.$axios
          .post(
            plannerApi.plannerReferrals,
            {
              login_name: '',
              deviceId: device, // 设备标识
              area: areaCode || '510100', // 站点code
              user_id: '',
              productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
              sceneId: scene, // 场景id
              level_2_ID: '', // 二级code
              platform: 'app',
              productId: '', //
              thirdTypeCodes: '', // 三级code
              firstTypeCode: 'FL20201224136341', // 一级code
            },
            {
              headers: {
                sysCode: 'cloud-recomd-api',
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
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
            // @--神策埋点-浏览事件-只执行一次
            window.spptMd.spptTrackRow('p_plannerBoothVisit', {
              name: `资产交易页规划师展位曝光`,
              track_code: this.isInApp ? 'SPP001130' : 'SPW000129',
              recommend_number: '',
              planner_number: this.pagePlanner.jobNum,
              planner_name: this.pagePlanner.name,
            })
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
    background: url('https://cdn.shupian.cn/sp-pt/wap/images/8un99iso7e40000.png')
      no-repeat;
    background-size: cover;
    margin-bottom: 20px;
  }
  .nav {
    // margin-top: -270px;
  }
}
</style>
