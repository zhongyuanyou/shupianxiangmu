<template>
  <div class="enterprise-service">
    <!-- S 头部和金刚区 -->
    <div class="top-background">
      <NavTop
        title="企业服务"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
      <Banner v-show="bannerTop.length" :images="bannerTop"></Banner>
    </div>
    <!-- E 头部和金刚区 -->
    <NavBars
      :roll-nav="rollNav"
      class="navs"
      :style="{ 'margin-top': marginTop + 'px' }"
    />
    <!-- 福利专区 S -->
    <Welfare v-show="welfareList.length" :welfare-list="welfareList" />
    <!-- banner区 S -->
    <BannerSwiper v-show="bannerBottom.length" :images="bannerBottom" />
    <!-- 免费工具 S -->
    <FreeTool v-show="toolList.length" :tool-list="toolList" />
    <!-- 经营必备 S -->
    <ManagementMust
      v-show="bottomList.length"
      :top-list="topList"
      :bottom-list="bottomList"
    />
    <!-- S 列表 -->
    <TabServiceItem
      :title-name="titleName"
      :recommended-list="recommendedList"
      @change="onChange"
    >
    </TabServiceItem>
    <!-- E 列表 -->

    <!-- START 规划师-->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" :md="fixedMd" />
    <!-- END 规划师-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defaultRes } from '@/assets/spread/promotionHome/enterpriseService.js'
import { plannerApi, newSpreadApi } from '@/api/spread'
import NavTop from '@/components/spread/common/NavTop.vue'
import Banner from '@/components/spread/promotionHome/internetHomePage/Banner.vue'
// import Nav from '@/components/spread/common/Nav.vue'
import NavBars from '@/components/spread/promotionHome/enterpriseService/NavBars.vue'
import Welfare from '@/components/spread/promotionHome/enterpriseService/Welfare.vue'
import BannerSwiper from '@/components/spread/promotionHome/enterpriseService/BannerSwiper.vue'
import FreeTool from '@/components/spread/promotionHome/enterpriseService/FreeTool.vue'
import ManagementMust from '@/components/spread/promotionHome/enterpriseService/ManagementMust.vue'
// import Advertising from '@/components/spread/promotionHome/enterpriseService/Advertising.vue'
import TabServiceItem from '@/components/spread/promotionHome/common/TabServiceItem.vue'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
export default {
  name: 'Index',
  components: {
    NavTop,
    Banner,
    NavBars,
    Welfare,
    BannerSwiper,
    FreeTool,
    ManagementMust,
    // Nav,
    // Advertising,
    TabServiceItem,
    BtnPlanner,
  },
  async asyncData({ $axios }) {
    const locations =
      'ad100080,ad100081,ad100082,ad100083,ad100084,ad100085,ad100108'
    const code = 'nav100057'
    const centerCode = 'CRISPS-C-QYFW'
    const dataRes = defaultRes
    try {
      const res = await $axios.get(newSpreadApi.list, {
        params: {
          locationCodes: locations,
          navCodes: code,
          code: centerCode,
        },
      })
      if (res.code === 200) {
        console.log('请求成功')
        return {
          resultData: res.data,
        }
      }
      console.log('请求失败')
      return {
        resultData: dataRes.data,
      }
    } catch (error) {
      console.log('请求错误')
      return {
        resultData: dataRes.data,
      }
    }
  },
  data() {
    return {
      placeholder: '请输入关键字',
      marginTop: 0,
      // 金刚区
      rollNav: [],
      // 列表导航
      titleName: [
        {
          code: 1,
          type: 1,
          name: '为你推荐',
        },
      ],
      // 当前列表状态
      changeState: {
        code: 'FL20201224136019',
        name: '许可证',
        type: 0,
      },
      // 列表内容
      list: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/73qu49p91yo0000.png',
          title: '有限公司注册',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 688,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/721d5dhixbs0000.png',
          title: '小规模纳税人代理记账',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 3488,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/apelb5m4i480000.png',
          title: '软件著作权登记',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 128,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/c1qak3027wg0000.png',
          title: '商标撤三申请',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 200,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/73qu49p91yo0000.png',
          title: '个人社保代缴',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 130,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5g5au0sc1980000.png',
          title: '食品流通许可证',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 1800,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fqw0olyy1k80000.png',
          title: '公积金开户',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 108,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9dkqr2mwrvo0000.png',
          title: '企业认证',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 688,
        },
      ],
      // 默认列表数据集
      defaultList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '商标查询',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '商标注册',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4234scxtivw0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
      ],
      // 页面规划师
      pagePlanner: {},
      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '企业服务聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
      bannerTop: [], // 头部banner
      welfareList: [], // 福利专区
      bannerBottom: [], // banner
      toolList: [], // 免费工具
      topList: [], // 经营必备top
      bottomList: [], // 经营必备bottom
      recommendedList: [],
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
      name: `推广企业服务聚合页浏览`,
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
    // 初始化数据
    // this.onChange({ type: 1 })
    // 处理后台数据
    const resData = this.resultData
    try {
      if (JSON.stringify(resData) !== '{}') {
        // 导航
        this.navList(resData.navs.nav100057 || [])
        this.productClassData(resData.classList || [])
        resData.adList.filter((elem) => {
          if (elem.locationCode === 'ad100080') {
            this.getBanner(elem.sortMaterialList, 'ad100080')
          }
          if (elem.locationCode === 'ad100081') {
            this.getWelfare(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad100082') {
            this.getBanner(elem.sortMaterialList, 'ad100082')
          }
          if (elem.locationCode === 'ad100083') {
            this.getFreeTool(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad100084') {
            this.getBusiness(elem.sortMaterialList, 'ad100084')
          }
          if (elem.locationCode === 'ad100085') {
            this.getBusiness(elem.sortMaterialList, 'ad100085')
          }
          if (elem.locationCode === 'ad100108') {
            this.getRecommendedList(elem.sortMaterialList)
          }
        })
      }
    } catch (error) {
      console.log(error)
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
        return
      }
      window.location.href = 'https://m.shupian.cn/search/'
    },
    // 请求数据
    onChange(changeObj) {
      this.changeState = changeObj
      // console.log(this.$refs.enterprise.initialize())
      this.$refs.enterprise.initialize(changeObj)
      // if (obj.type === 1) {
      //   this.list = defaultList
      // }
    },
    // 金刚区导航栏
    navList(data) {
      if (data.length !== 0) {
        this.rollNav = data.map((elem, index) => {
          return {
            code: elem.sort,
            name: elem.name,
            url: elem.url,
            // url: '',
            size: 'small',
            label: '',
            imageUrl: elem.navigationImageUrl,
          }
        })
        this.rollNav.reverse()
      }
    },
    // banner广告位
    getBanner(data, code) {
      if (data.length !== 0) {
        if (code === 'ad100080') {
          this.bannerTop = data.map((elem, index) => {
            return {
              img: elem.materialList[0].materialUrl,
              url: elem.materialList[0].materialLink,
            }
          })
        }
        if (code === 'ad100082') {
          this.bannerBottom = data.map((elem, index) => {
            return {
              img: elem.materialList[0].materialUrl,
              url: elem.materialList[0].materialLink,
            }
          })
        }
      } else {
        this.bannerBottom = []
        this.bannerTop = []
      }
    },
    // 福利专区
    getWelfare(data) {
      if (data.length !== 0) {
        this.welfareList = data.map((elem, index) => {
          return {
            img: elem.materialList[0].materialUrl,
            url: elem.materialList[0].materialLink,
          }
        })
      } else {
        this.welfareList = []
      }
    },
    // 免费查询工具
    getFreeTool(data) {
      if (data.length !== 0) {
        this.toolList = data.map((elem, index) => {
          return {
            img: elem.materialList[0].materialUrl,
            url: elem.materialList[0].materialLink,
            name: elem.materialList[0].materialName.split('-')[2],
          }
        })
      } else {
        this.toolList = []
      }
    },
    // 经营必备
    getBusiness(data, code) {
      if (data.length !== 0) {
        if (code === 'ad100084') {
          this.topList = data.map((elem, index) => {
            return {
              img: elem.materialList[0].materialUrl,
              url: elem.materialList[0].materialLink,
            }
          })
        }
        if (code === 'ad100085') {
          this.bottomList = data.map((elem, index) => {
            return {
              img: elem.materialList[0].materialUrl,
              url: elem.materialList[0].materialLink,
            }
          })
        }
      } else {
        this.topList = []
        this.bottomList = []
      }
    },
    getRecommendedList(data) {
      if (data.length !== 0) {
        this.recommendedList = data.map((elem, index) => {
          return {
            img: elem.materialList[0].materialUrl,
            url: elem.materialList[0].materialLink,
            name: elem.materialList[0].materialName.split('-')[2],
            title: elem.materialList[0].materialDescription,
          }
        })
      } else {
        this.recommendedList = []
      }
    },
    // 产品分类
    productClassData(data) {
      if (data.length === 0) return
      this.changeState = {
        type: data[0].ext1,
        code: data[0].ext1,
        name: data[0].name,
      }

      const classArr = []
      data.forEach((item, index) => {
        classArr.push({
          type: item.ext1,
          code: item.ext1,
          name: item.name,
          children: item.children,
        })
      })
      this.titleName = classArr
      console.log(this.titleName)
    },

    // 列表导航
    productTitle(data) {
      if (data.length !== 0) {
        this.changeState = {
          type: 0,
          code: data[0].code,
          name: data[0].name,
        }
        // this.onChange(this.changeState)
        // this.$refs.enterprise.initialize(this.changeState)
        // 初始化请求数据
        this.titleName = data.map((elem, index) => {
          return {
            type: index,
            code: elem.code,
            name: elem.name,
          }
        })
      }
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
              firstTypeCode: 'FL20210425163708', // 一级code
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
      title: '企业服务',
    }
  },
}
</script>

<style lang="less">
.enterprise-service {
  width: @spread-page-width;
  background: #f5f5f5;
  margin: 0 auto;
  .top-background {
    // height: 450px;
    background: url(https://cdn.shupian.cn/sp-pt/wap/images/apakh2k9z3c0000.png)
      no-repeat;
    background-size: cover;
    margin-bottom: 20px;
  }
  .navs {
    position: relative;
  }
}
</style>
