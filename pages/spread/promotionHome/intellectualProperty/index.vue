<template>
  <div class="intellectual-property">
    <!-- S 头部和金刚区 -->
    <!-- <div class="top-background">
      <NavTop
        title="知识产权"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
     
    </div> -->
    <!-- E 头部和金刚区 -->
    <div class="head">
      <Header
        title="知识产权"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
      <Banner></Banner>
      <!-- <Nav :roll-nav="rollNav" class="nav"></Nav> -->
    </div>
    <!-- NavBar  s-->
    <Nav
      :roll-nav="rollNav"
      class="navs"
      :style="{ 'margin-top': marginTop + 'px' }"
    />
    <!-- NavBar  e-->
    <!-- 知产头条S -->
    <Headlines></Headlines>
    <!-- 知产头条E -->
    <!-- 新人大礼包S -->
    <Giftbag :list="GiftList"></Giftbag>
    <!-- 新人大礼包E -->
    <!-- 先服务后收费S -->
    <Firstservice :img-content="FirstList"></Firstservice>
    <!-- 先服务后收费S -->
    <!-- 特色服务S -->
    <FreeTool title="特色服务"></FreeTool>
    <!-- 特色服务E -->
    <!-- 经营必备S -->
    <ManagementMust />
    <!-- 经营必备E -->
    <!-- 补贴测算S -->
    <Subsidy></Subsidy>
    <!-- 补贴测算E -->
    <!-- 推荐商品S -->
    <Productlist></Productlist>
    <!-- 推荐商品E -->
    <!-- S 新人专属 -->
    <!-- <Exclusive
      v-if="proTitle.length > 0"
      :pro-title="proTitle"
      :img-content="imgContent"
    /> -->
    <!-- E 新人专属 -->

    <!--S 免费体验 薯片课程 -->
    <!-- <Choiceness :content="content" /> -->
    <!--E 免费体验 薯片课程-->

    <!-- S 列表 -->
    <!-- <IntellectualList :title-name="titleName" /> -->
    <!-- E 列表 -->

    <!-- START 规划师-->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" :md="fixedMd" />
    <!-- END 规划师-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defaultRes } from '@/assets/spread/promotionHome/intellectualProprty.js'
import { plannerApi, newSpreadApi } from '@/api/spread'
// import NavTop from '@/components/spread/common/NavTop.vue'
import Nav from '@/components/spread/common/Nav.vue'
import Header from '@/components/spread/common/NavTop.vue'
import Banner from '@/components/spread/promotionHome/internetHomePage/Banner.vue'
import Headlines from '@/components/spread/promotionHome/intellectualProperty/Headlines.vue'
import Giftbag from '@/components/spread/promotionHome/intellectualProperty/Giftbag.vue'
import Firstservice from '@/components/spread/promotionHome/intellectualProperty/Firstservice.vue'
import Subsidy from '@/components/spread/promotionHome/intellectualProperty/Subsidy.vue'
import Productlist from '@/components/spread/promotionHome/intellectualProperty/Productlist.vue'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
import FreeTool from '@/components/spread/promotionHome/enterpriseService/FreeTool.vue'
import ManagementMust from '@/components/spread/promotionHome/enterpriseService/ManagementMust.vue'
// import Exclusive from '@/components/spread/promotionHome/intellectualProperty/Exclusive.vue'
// import Choiceness from '@/components/spread/promotionHome/intellectualProperty/Choiceness.vue'
// import IntellectualList from '@/components/spread/promotionHome/intellectualProperty/IntellectualList.vue'

export default {
  name: 'IntellectualProperty',
  components: {
    // NavTop,
    // Exclusive,
    // Choiceness,
    // IntellectualList,
    Productlist,
    Subsidy,
    ManagementMust,
    FreeTool,
    Firstservice,
    Giftbag,
    Headlines,
    Nav,
    Header,
    Banner,
    BtnPlanner,
  },
  async asyncData({ $axios }) {
    const locationCodes = 'ad113236,ad113279,ad113265,ad113277,ad100046'
    const navCodes = 'nav100060'
    const code = 'CRISPS-C-ZSCQ'
    const dataRes = defaultRes
    try {
      const res = await $axios.get(newSpreadApi.list, {
        params: {
          locationCodes,
          navCodes,
          code,
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
        // resultData: dataRes.data,
      }
    } catch (error) {
      console.log('请求错误')
      return {
        // resultData: dataRes.data,
      }
    }
  },
  data() {
    return {
      placeholder: '请输入关键字',
      marginTop: 0,
      // 金刚区
      // rollNav: [],
      // 新人专属
      proTitle: [
        {
          title: '[企业必备] 商标注...',
          price: 488,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/19k5aeu2fsdc000.png',
          url: '',
        },
        {
          title: '[企业必备] 商标注...',
          price: 199,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/np4823u4b1c000.png',
          url: '',
        },
      ],
      // 广告说明
      imgContent: [
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/84tta2vzooc0000.png',
          title: '先服务后收费',
          assistantTitle: '',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/co9djdht52g0000.png',
          title: '千万补贴',
          assistantTitle: '精选好服务',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/2cxu5ow9hmhw000.png',
          title: '政府补贴',
          assistantTitle: '政策解析',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/e0b8ph3n46o0000.png',
          title: '快速通道',
          assistantTitle: '加急办理',
        },
      ],
      // 体验 课程
      content: {
        experience: {
          imgVal: [
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/images/efrhylhffbs0000.png',
              title: '免费体验',
              imgNmae: '商标查询',
              label: '限时免费',
              url: '',
            },
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/images/8jn8qjulfvs0000.png',
              title: '',
              imgNmae: '版权服务',
              label: '限时免费',
              url: '',
            },
          ],
        },
        curriculum: {
          imgVal: [
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/images/efrhylhffbs0000.png',
              title: '薯片课程',
              imgNmae: '商标案件如...',
              label: '包办包过',
              url: '',
            },
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/images/8jn8qjulfvs0000.png',
              title: '',
              imgNmae: '高企认定政...',
              label: '包办包过',
              url: '',
            },
          ],
        },
      },
      // 列表导航
      titleName: [
        // {
        // code: 1,
        // type: 'FL20210425163778',
        // name: '热门服务',
        // },
      ],
      // 当前列表状态
      changeState: {
        code: 'FL20201224136019',
        name: '许可证',
        type: 0,
      },
      // 默认的推介列表列表
      defaultList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '15645',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 699,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '商标查询',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '商标注册',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4234scxtivw0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
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
      navList1: [
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
        {
          title: '营销推广',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/2m2m7l2drfs0000.png',
          url: '',
        },
      ], // nav列表
      GiftList: [
        'https://cdn.shupian.cn/sp-pt/wap/images/g9sw5ghb43c0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/3pkag12g860000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/1qmfmok1whnk000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/1qmfmok1whnk000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/1qmfmok1whnk000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/1qmfmok1whnk000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/1qmfmok1whnk000.png',
      ], // 新人大礼包
      FirstList: [
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/2jezar5e5jq0000.png',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/3892wl2nxli0000.png',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/83d724tlfgs0000.png',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/ber28clfpf40000.png',
        },
      ], // 先服务后收费
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
    // 初始化数据
    // this.onChange({ type: 1 })
    // 处理后台数据
    const resData = this.resultData
    try {
      if (JSON.stringify(resData) !== '{}') {
        this.navList(resData.navs.nav100060 || [])
        this.productClassData(resData.classList || [])
        resData.adList.filter((elem) => {
          if (elem.locationCode === 'ad113236') {
            this.proTitleData(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113279') {
            this.imgContentData(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113265') {
            this.experience(elem.sortMaterialList)
          }
          if (elem.locationCode === (this.isInApp ? 'ad100046' : 'ad113277')) {
            this.curriculum(elem.sortMaterialList)
          }
        })
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
      this.$refs.intellectual.initialize(changeObj)
    },
    // 金刚区导航栏
    navList(data) {
      if (data.length !== 0) {
        this.rollNav = data.map((elem, index) => {
          return {
            sort: elem.sort,
            code: index,
            name: elem.name,
            url: elem.url,
            size: 'small',
            label: '',
            imageUrl: elem.navigationImageUrl,
            description: elem.description || '',
            execution: elem.executionParameters || '',
          }
        })
        // this.rollNav.reverse()
        this.rollNav.sort((a, b) => {
          return a.sort - b.sort
        })
      }
    },
    // 新人专属
    proTitleData(data) {
      if (data.length !== 0) {
        this.proTitle = data.map((elem, index) => {
          const data = elem.materialList[0]
          return {
            title: data.materialName.split('#')[1] || '',
            price: parseInt(data.materialDescription.split('#')[0]),
            label: data.materialDescription.split('#')[1],
            count: data.materialDescription.split('#')[2],
            img: data.materialUrl,
            url: data.materialLink,
          }
        })
      }
    },
    // 广告说明
    imgContentData(data) {
      if (data.length !== 0) {
        this.imgContent = data.map((elem, index) => {
          const data = elem.materialList[0]
          return {
            bgImg: data.materialUrl,
            title: data.materialName.split('#')[1] || '',
            assistantTitle: data.materialDescription,
            url: data.materialLink,
          }
        })
      }
    },
    // 体验 课程
    experience(data) {
      if (data.length !== 0) {
        this.content.experience.imgVal = data.map((elem, index) => {
          const data = elem.materialList[0]
          return {
            img: data.materialUrl,
            title: data.materialName.split('#')[1],
            imgNmae: data.materialDescription.split('#')[0],
            label: data.materialDescription.split('#')[1],
            url: data.materialLink || '',
          }
        })
      }
    },
    curriculum(data) {
      if (data.length !== 0) {
        this.content.curriculum.imgVal = data.map((elem, index) => {
          const data = elem.materialList[0]
          return {
            img: data.materialUrl,
            title: data.materialName.split('#')[1],
            imgNmae: data.materialDescription.split('#')[0],
            label: data.materialDescription.split('#')[1],
            url: data.materialLink || '',
          }
        })
      }
    },

    // 列表导航
    productClassData(data) {
      console.log(1344, data)
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
              firstTypeCode: 'FL20210425164319', // 一级code
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
      // if (name === '全部服务') {
      //   this.$router.push('/financing/category')
      //   return
      // }
      // app跳转
      try {
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
        // 产品列表路由
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
      title: '知识产权',
    }
  },
}
</script>

<style lang="less">
.intellectual-property {
  width: @spread-page-width;
  background: #f5f5f5;
  margin: 0 auto;
  .head {
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/8un99iso7e40000.png');
    background-repeat: no-repeat;
    background-size: 100%, 100%;
  }
  .top-background {
    // background: linear-gradient(0deg, #f5f5f5, #4974f5);
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
