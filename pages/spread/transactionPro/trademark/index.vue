<template>
  <div class="trademark-page">
    <!-- 头部导航 -->
    <Header
      v-if="!isInApp"
      :title="pageTitle"
      :fixed="false"
      head-class="head-icon"
    >
      <template v-if="false" v-slot:right>
        <div class="city-btn" @click="chooseCity">
          <span class="city-btn-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.14rem" color="#232323"></my-icon>
        </div>
      </template>
    </Header>
    <!-- 金刚区 -->
    <NavBar class="nav-bar" :data="NavBtns" />
    <!-- banner区 -->
    <Banner class="my-banner" :data="images" />
    <!-- 表单区 -->
    <!-- <Form class="my-form" :data="FormMsg" /> -->
    <!-- 广告位 -->
    <!-- <ADList :data="ADList" class="ad-margin" /> -->
    <!-- 热门商标 -->
    <HotTrademark />
    <!-- 商标服务 -->
    <TrademarkService />
    <!-- 商标列表 -->
    <!-- <ProductList :planner="pagePlanner" /> -->
    <ProductList
      :data="goodListData"
      :good-list="goodList"
      :more="more"
      @swipeChange="swipeChange"
      @getMore="getMore"
    ></ProductList>
    <!-- 站位 -->
    <div class="box"></div>
    <!-- 底部按钮 -->
    <!-- <FixedBottom :planner="pagePlanner" :md="bottomMd" /> -->
    <BtnPlanner :planner="pagePlanner" :md="fixedMd" />
    <!-- START IM在线咨询-->
    <DggImCompany></DggImCompany>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { plannerApi } from '@/api/spread'

import Header from '~/components/common/head/header'
import NavBar from '~/components/spread/transactionPro/common/NavBar'
import Banner from '~/components/spread/transactionPro/common/Banner'
// import Form from '~/components/spread/transactionPro/common/Form'
// import ADList from '@/components/spread/transactionPro/common/ADList'
import HotTrademark from '~/components/spread/transactionPro/trademark/HotTrademark'
import TrademarkService from '~/components/spread/transactionPro/trademark/TrademarkService'
import ProductList from '@/components/spread/transactionPro/common/ProductList'
// import FixedBottom from '~/components/spread/transactionPro/common/FooterBottom'
import BtnPlanner from '@/components/spread/common/BtnPlanner'

import DggImCompany from '~/components/spread/DggImCompany'

export default {
  components: {
    Header,
    NavBar,
    Banner,
    // Form,
    // ADList,
    HotTrademark,
    TrademarkService,
    ProductList,
    BtnPlanner,
    DggImCompany,
    // FixedBottom,
  },

  data() {
    return {
      pageTitle: '商标交易',
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '商标交易聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
      NavBtns: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3v8zphmmlyc0000.png',
          text: '精品商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_精品商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/40f59dhj5pg0000.png',
          text: '热门商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_热门商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/citewdawylk0000.png',
          text: '特价商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_特价商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9totr7jo7x80000.png',
          text: '新品商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_新品商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2so335ov8n20000.png',
          text: '商标服务',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_商标服务',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7exm1hb66fo0000.png',
          text: '急售商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_急售商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3p1h9e99sw40000.png',
          text: '国际商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_国际商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bs8lt896m2o0000.png',
          text: '商标查询',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_商标查询',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bwyh3vl2mnc0000.png',
          text: '商标出售',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_商标出售',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fq08q9c462o0000.png',
          text: '其他商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_其他商标',
          },
        },
      ],
      FormMsg: {
        title: '海量精品商标  免费为您推荐',
        buttonName: '立即获取',
        subInfo: ['价格透明', '信息安全', '专业保障'],
        type: 'sbjy', // 业态编码。固定几个业态编码。
        md: { pageName: '商标交易聚合页表单' },
      },
      images: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8tsmiv55cgk0000.png',
          md: {
            type: '',
            name: '商标交易聚合页_商标无忧注册',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bleczr4x81c0000.png',
          md: {
            type: '',
            name: '商标交易聚合页_商标授权使用',
          },
        },
      ],

      ADList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/c8w39clg7go0000.jpg',
          url: '',
          md: {
            name: '商标交易聚合页_优质资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/e5vqunicu000000.jpg',
          url: '',
          md: {
            name: '商标交易聚合页_热销资质',
          },
        },
      ],
      // 选项卡、规划师
      goodListData: {
        tabBtnList: [
          { name: '推荐商标', type: 0 },
          { name: '优质商标', type: 1 },
          { name: '特价急售', type: 2 },
        ],
        marks: [
          '化妆日用',
          '医药药品',
          '家用电器',
          '皮革箱包',
          '服装鞋帽',
          '食品行页',
        ],
        planner: {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
          imgSrc: '',
        },
        md: {
          pageName: '资质交易聚合页',
        },
      },
      // 商品列表
      goodList: [],
      // 加载更多loading
      more: {
        loading: false,
        noMore: false,
      },

      params: {
        dictionaryCode: 'C-SY-RMJY-GG', // 查询数据字典的code
        findType: 0, // 查询类型：0：初始查询广告+数据字典+推荐商品  1：查询广告+推荐商品 2：只查推荐商品
        userId: '', // 用户id
        deviceId: '', // 设备ID（用户唯一标识） 0022ef1a-f685-469a-93a8-5409892207a2
        areaCode: '', // 区域编码
        sceneId: 'app-mainye-01', // 场景ID
        maxsize: 100, // 要求推荐产品的数量
        platform: 'APP', // 平台（app,m,pc）
        formatId: '', // 产品类别
        locationCode: '', // 查询广告的位置code
        type: 0, // 当前选项卡
      },
      pageNum: 1, // 当前页

      recommendedList: [], // 推荐商标列表
      highQualityList: [], // 优质商标列表
      specialOfferList: [], // 特价急售商标列表
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity.name || '成都',
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {},
  mounted() {
    // @--判断页面是否在app里打开
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: this.pageTitle }, () => {})
    }
    this.getGoodList()
    this.getPagePlanner('app-ghsdgye-02')
  },
  methods: {
    // 根据接口获取商品列表
    getGoodList() {
      this.loading = true
      const api = '/xdy-portal-product-api/trademark/recommend'
      const cdn = 'https://microuag.dgg188.cn'
      this.more.loading = true
      this.$axios
        .get(cdn + api)
        .then((res) => {
          this.loading = false
          if (res.code === 'SYS_0000') {
            this.more.loading = false
            // 获取商品后，处理商品数据
            this.goodList = res.data
            this.processData(this.goodList)
            this.switchHandle()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 处理数据
    processData(data) {
      const recommended = []
      const highQuality = []
      const specialOffer = []
      const reg = /^[\u4E00-\u9FA5]{1,3}$/
      const rg = /^[\u4E00-\u9FA5]{1,3}\s[a-zA-Z]{1,8}$/
      const englishRg = /^[a-zA-Z]{1,8}$/
      data.forEach((item, index) => {
        const resObj = {
          img: item.imageUri, // 商品左侧图片
          price: item.sellPrice, // 商品价格
          name: item.firstCategoryName, // 公司显示名称（有*号）
          tabs: ['品质商标', '即买即用'], // 有背景色的标签tab，每个页面有单独的标签列表，随机取几个传进来
          notes: [`${item.firstCategoryId}类-${item.firstCategoryName}`], // 以 | 字符分隔的注意，接口字段值
        }
        if (
          item.firstCategoryName === '化妆日用' ||
          item.firstCategoryName === '医药药品' ||
          item.firstCategoryName === '家用电器' ||
          item.firstCategoryName === '服装鞋帽' ||
          item.firstCategoryName === '皮革箱包' ||
          item.firstCategoryName === '食品鱼肉'
        ) {
          recommended.push(resObj)
        }
        if (
          reg.test(item.trademarkName) ||
          rg.test(item.trademarkName) ||
          englishRg.test(item.trademarkName)
        ) {
          highQuality.push(resObj)
        }
        if (item.sellPrice < 20000) {
          specialOffer.push(resObj)
        }
      })
      this.recommendedList = recommended
      this.highQualityList = highQuality
      this.specialOfferList = specialOffer
      if (this.goodList.length < 10) {
        this.more.noMore = true
      }
    },
    swipeChange(item) {
      this.params.type = item.type
      this.pageNum = 1
      // this.getGoodList()
      this.switchHandle()
    },
    switchHandle() {
      const sub = this.params.type
      if (sub === 0) this.goodList = this.recommendedList
      if (sub === 1) this.goodList = this.highQualityList
      if (sub === 2) this.goodList = this.specialOfferList
    },
    chooseCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    // 获取更多
    getMore() {
      this.pageNum++
      this.getGoodList()
    },
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        window.spptMqMi.showPanel()
      }
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
              firstTypeCode: 'FL20201224136273', // 一级code
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
              this.pagePlanner = this.dataNavBar.planner = {
                id: res.data[0].userCentreId,
                name: res.data[0].userName,
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
    // async getPagePlanner() {
    //   try {
    //     const res = await this.$axios.get(`${plannerApi.planner}`)
    //     if (res.code === 200) {
    //       this.pagePlanner = {
    //         id: res.data.list[0].userCentreId,
    //         name: res.data.list[0].realName,
    //         jobNum: res.data.list[0].loginName,
    //         telephone: res.data.list[0].userPhone,
    //         imgSrc: res.data.list[0].userHeadUrl,
    //       }
    //     }
    //   } catch (error) {
    //     console.log('plannerApi.planner error：', error.message)
    //   }
    // },
  },
  head() {
    return {
      title: '商标交易',
      script: [],
    }
  },
}
</script>

<style lang="less" scoped>
.trademark-page {
  background: #ffffff;
  width: @spread-page-width;
  margin: 0 auto;
  background: #f5f5f5;
  ::v-deep.my-head {
    box-shadow: 0 0 0 0;
  }
  .city-btn {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .city-btn-text {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }
  .nav-bar {
    padding-top: 16px;
    ::v-deep.my-component {
      padding: 24px 40px 32px;
    }
  }
  .my-banner {
    margin: 20px auto;
  }
  .ad-margin {
    margin-top: 18px;
    margin-bottom: 20px;
  }
  .my-form {
    // margin-top: 64px;
  }
  .box {
    height: 148px;
  }
  ::v-deep.btn {
    display: none;
  }
  ::v-deep.my-component {
    padding-bottom: 0px;
  }
  ::v-deep.sp-bottombar {
    position: fixed;
    bottom: 0;
    z-index: 10;
  }
}
</style>
