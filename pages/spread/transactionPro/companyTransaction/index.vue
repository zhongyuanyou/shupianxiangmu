<template>
  <div class="page-content">
    <!-- START 头部Header-->
    <Header
      ref="header"
      :title="pageTitle"
      :fixed="true"
      head-class="head-icon"
    >
      <template v-if="false" v-slot:right>
        <span class="my-customize-header" @click="choiceCity">
          <span class="my-customize-header-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.18rem" color="#cccccc"></my-icon>
        </span>
      </template>
    </Header>
    <!-- END   头部Header-->

    <!-- START 导航部-金刚区-->
    <!-- <NavBtns class="nav-btn-margin" /> -->
    <NavBar class="nav-btn-margin" :data="dataList" />
    <!-- END   导航部-金刚区-->

    <!-- START 轮播Banner-->
    <Banner class="banner-margin" :data="imageBanner" />

    <!-- END   轮播Banner-->

    <!-- START 表单-->
    <!-- <Form /> -->
    <!-- <Form class="laowu-form" :data="cardName" /> -->
    <!-- END   表单-->

    <!-- START 热门行业-->
    <HotIndustry :hot-industry="hotIndustry" class="banner-margin" />
    <!-- END   热门行业-->

    <!-- START 附带资产类型-->
    <WithAssetsType :assets-list="assetsList" class="with-assets-type-margin" />
    <!-- END   附带资产类型-->

    <!-- START 推荐公司-->
    <RecommendCompany :tab-list="tabList" />
    <!-- END   推荐公司-->

    <!-- START 规划师-->
    <BtnPlanner
      v-if="pagePlanner"
      ref="plannerIM"
      :planner="pagePlanner"
      :md="fixedMd"
    />
    <!-- END 规划师-->

    <!-- START IM在线咨询-->
    <!-- <DggImCompany></DggImCompany> -->
    <!-- END IM在线咨询-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { plannerApi, chipSpread } from '@/api/spread'
import Header from '@/components/common/head/header'
// import DggImCompany from '@/components/spread/DggImCompany'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
import NavBar from '@/components/spread/transactionPro/common/NavBar.vue'
import Banner from '@/components/spread/transactionPro/common/Banner.vue'
// import Form from '~/components/spread/transactionPro/common/Form'
import HotIndustry from '@/components/spread/transactionPro/companyTransaction/HotIndustry.vue'
import WithAssetsType from '@/components/spread/transactionPro/companyTransaction/WithAssetsType.vue'
import RecommendCompany from '@/components/spread/transactionPro/companyTransaction/RecommendCompany.vue'

export default {
  name: 'Index',
  components: {
    Header,
    Banner,
    // Form,
    HotIndustry,
    WithAssetsType,
    RecommendCompany,
    BtnPlanner,
    // DggImCompany,
    NavBar,
  },
  async asyncData({ $axios }) {
    const locations = 'ad113298,ad113297,ad113296,ad113295'
    const navCode = 'nav100072'
    const url = 'http://172.16.133.68:7002/service/nk/newChipSpread/v1/list.do'
    // chipSpread.list
    try {
      const res = await $axios.get(chipSpread.list, {
        params: {
          locationCodes: locations,
          navCodes: navCode,
          code: 'CRISPS-C-GSJY',
        },
      })
      if (res.code === 200) {
        return {
          resultData: res.data,
        }
      }
      return {
        resultData: [],
      }
    } catch (error) {
      return {
        resultData: [],
      }
    }
  },
  data() {
    return {
      pageTitle: '公司交易',
      // 页面规划师
      hotIndustry: [],
      pagePlanner: {},
      assetsList: [],
      assetsTop: [],
      assetsBottom: [],
      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '公司交易聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
      dataList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7016kj24ig80000.png',
          text: '科技信息',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '公司交易聚合页_科技信息',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3t3d2v50wh40000.png',
          text: '电子贸易',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5nxy60t3ws40000.png',
          text: '广告传媒',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/btrdq3woqmg0000.png',
          text: '餐饮美容',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/cq53947ri680000.png',
          text: '教育培训',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8qxck4s2ths0000.png',
          text: '独家公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7eepdyi865o0000.png',
          text: '急售公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5fyvsexbkk80000.png',
          text: '特价公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/627j38quyds0000.png',
          text: '优质公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ayznk0l5egk0000.png',
          text: '出售公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
      ],

      // 轮播banner
      imageBanner: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/787oq80qehk0000.png',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/eso9k9cjzzk0000.png',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
      ],

      // 表单
      cardName: {
        title: '公司转让通道 立即预约',
        buttonName: '立即获取',
        subInfo: ['价格透明', '信息安全', '官方保障'],
        type: 'zhgszr', // 业态编码。固定几个业态编码。
        md: { pageName: '公司交易聚合页' },
      },
      // tab标签
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity.name || '成都',
      isInApp: (state) => state.app.isInApp,
    }),
    tabList() {
      const tabs = []
      this.resultData.classList &&
        this.resultData.classList.forEach((item) => {
          const obj = { name: item.name, type: item.ext1, goodList: [] }
          tabs.push(obj)
        })
      return tabs
    },
  },
  created() {
    if (process.client) {
      // 请求
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  mounted() {
    this.getNav(this.resultData.navs.nav100072)
    this.getAd('ad113295')
    this.getAd('ad113296')
    this.getAd('ad113297')
    this.getAd('ad113298')

    // @--神策埋点-浏览事件-只执行一次
    window.spptMd.spptTrackRow('pageview', {
      name: `推广公司交易聚合页浏览`,
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

    // @--判断页面是否在app里打开
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: this.pageTitle }, () => {})
    }
  },
  methods: {
    getNav(nav) {
      console.log(nav, 46)
      const navs = []
      nav.forEach((elem) => {
        const obj = {
          sort: elem.sort,
          img: elem.navigationImageUrl,
          text: elem.name,
          marketingImg: '',
          url: elem.url,
          description: elem.description,
          execution: elem.executionParameters,
          md: {
            type: '',
            name: `专利交易聚合页_金刚区_${elem.name}`,
          },
        }
        navs.push(obj)
      })
      this.dataList = navs
      this.dataList.sort((a, b) => {
        return a.sort - b.sort
      })
    },
    getAd(code) {
      const data = this.resultData.adList
      const assets = []
      if (code === 'ad113295') {
        const banner = []
        data.forEach((item) => {
          if (item.locationCode === code) {
            item.sortMaterialList.forEach((elem, idx) => {
              const obj = {
                url: elem.materialList[0].materialLink,
                img: elem.materialList[0].materialUrl,
                iosUrl: elem.materialList[0].iosLink,
                wapUrl: elem.materialList[0].wapLink,
                androidUrl: elem.materialList[0].androidLink,
                description: elem.materialList[0].materialDescription || '',
                execution: elem.materialList[0].executeParam || '',
                md: {
                  type: '',
                  name: '',
                },
              }
              banner.push(obj)
            })
            this.imageBanner = banner
          }
        })
      }
      if (code === 'ad113296') {
        const hot = []
        data.forEach((item) => {
          if (item.locationCode === code) {
            item.sortMaterialList.forEach((elem, idx) => {
              const obj = {
                url: elem.materialList[0].materialLink,
                img: elem.materialList[0].materialUrl,
                title: '',
                desc: '',
                iosUrl: elem.materialList[0].iosLink,
                wapUrl: elem.materialList[0].wapLink,
                androidUrl: elem.materialList[0].androidLink,
                description: elem.materialList[0].materialDescription || '',
                execution: elem.materialList[0].executeParam || '',
              }
              hot.push(obj)
            })
            this.hotIndustry = hot
          }
        })
      }
      if (code === 'ad113297') {
        const pro = []
        data.forEach((item) => {
          if (item.locationCode === code) {
            item.sortMaterialList.forEach((elem, idx) => {
              const obj = {
                img: elem.materialList[0].materialUrl,
                title: '',
                desc: '',
                marketingImg: '',
                url: elem.materialList[0].materialLink,
                iosUrl: elem.materialList[0].iosLink,
                wapUrl: elem.materialList[0].wapLink,
                androidUrl: elem.materialList[0].androidLink,
                imgWidth: 331,
                imgHeight: 172,
                description: elem.materialList[0].materialDescription || '',
                execution: elem.materialList[0].executeParam || '',
              }
              pro.push(obj)
            })
            this.assetsTop = pro
          }
        })
      }
      if (code === 'ad113298') {
        const pro = []
        data.forEach((item) => {
          if (item.locationCode === code) {
            item.sortMaterialList.forEach((elem, idx) => {
              const obj = {
                img: elem.materialList[0].materialUrl,
                title: '',
                desc: '',
                marketingImg: '',
                url: elem.materialList[0].materialLink,
                iosUrl: elem.materialList[0].iosLink,
                wapUrl: elem.materialList[0].wapLink,
                androidUrl: elem.materialList[0].androidLink,
                imgWidth: 215,
                imgHeight: 205,
                description: elem.materialList[0].materialDescription || '',
                execution: elem.materialList[0].executeParam || '',
              }
              pro.push(obj)
            })
            this.assetsBottom = pro
          }
        })
      }
      const list = this.assetsTop.concat(this.assetsBottom)
      this.assetsList = list
    },
    // @--跳转
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    jumpLink(url, description, execution) {
      // app跳转 待改
      try {
        if (this.isInApp && execution.split(':')[0] === 'appFilter') {
          const code =
            url.split('?')[1].split('=')[1].split('&')[0] || 'FL20201224136341'
          const lastObj = `{"classCode":"${code}","field":{"${
            execution.split(':')[1] || ''
          }":"${description}"}}`
          const jsonObj = JSON.parse(lastObj)
          this.$appFn.dggProperty(jsonObj, (res) => {})
          return
        }
      } catch (error) {
        console.log(error)
      }

      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
          return
        }
      }
      this.$refs.plannerIM.onlineConsult()
    },

    // @--获取规划师
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
              productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
              sceneId: scene, // 场景id
              level_2_ID: 'FL20201224136319', // 二级code
              platform: 'app',
              productId: '', //
              thirdTypeCodes: '', // 三级code
              firstTypeCode: 'FL20210809166627', // 一级code
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
  },
  head() {
    return {
      title: '公司交易',
    }
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  background: #f5f5f5;
  // 自定义头部组件右侧样式
  .my-customize-header {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .my-customize-header-text {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }

  // @--页面各板块上下间距
  .nav-btn-margin {
    padding-top: 20px;
  }
  .banner-margin {
    margin: 20px auto;
  }
  .with-assets-type-margin {
    // margin-bottom: 32px;
  }

  // @--穿透修改样式
  ::v-deep .my-sp-bottombar {
    z-index: 100;
  }
  ::v-deep .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
}
</style>
