<template>
  <div class="page-content">
    <!-- S 头部Header-->
    <Header v-if="!isInApp" title="工商首页">
      <template v-slot:right>
        <span class="my-customize-header" @click="choiceCity">
          <span class="my-customize-header-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.18rem" color="#232323"></my-icon>
        </span>
      </template>
    </Header>
    <!-- E 头部Header-->

    <!-- S 轮播图-->
    <Banner :images="images" />
    <!-- E 轮播图-->

    <!-- S 导航-->
    <Nav />
    <!-- E 导航-->

    <!-- S 热销专区-->
    <HotSale />
    <!-- E 热销专区-->

    <!-- S 快速查询-->
    <Form />
    <!-- E 快速查询-->

    <!-- S 初创必备-->
    <StartupEssential />
    <!-- E 初创必备-->

    <!-- S 经营必备-->
    <BusinessEssential />
    <!-- E 经营必备-->

    <!-- S 实用工具-->
    <Utilities />
    <!-- E 实用工具-->

    <!-- S 企服规划师-->
    <PlannerSwipe
      :planners-data="plannerList"
      :planners-common="plannerListMd"
    />
    <!-- E 企服规划师-->

    <!-- S 平台优势-->
    <PlatformAdvantage />
    <!-- E 平台优势-->

    <!-- S 薯片找人-->
    <SPDescription />
    <!-- E 薯片找人-->

    <!-- S 固定底部-->
    <FooterBottom :planner="pagePlanner" :md="fixedBottomMd" />
    <!-- E 固定底部-->

    <!-- S IM在线咨询-->
    <DggImCompany></DggImCompany>
    <!-- E IM在线咨询-->

    <!-- S 表单提交成功-->
    <Dialog />
    <!-- E 表单提交成功-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { spreadApi } from '@/api/spread'
import PageJson from '@/assets/spread/home.js'
import Header from '@/components/common/head/header'
import DggImCompany from '@/components/spread/DggImCompany'
import Dialog from '@/components/spread/common/Dialog'
import SPDescription from '@/components/spread/common/SPDescription'

import Banner from '@/components/spread/home/Banner'
import Nav from '@/components/spread/home/Nav'
import HotSale from '@/components/spread/home/HotSale'
import StartupEssential from '@/components/spread/home/StartupEssential'
import BusinessEssential from '@/components/spread/home/BusinessEssential'
import Utilities from '@/components/spread/home/Utilities'
import PlatformAdvantage from '@/components/spread/home/PlatformAdvantage'
import FooterBottom from '@/components/spread/home/FooterBottom'
import Form from '@/components/spread/home/Form1'
import PlannerSwipe from '@/components/spread/home/PlannerSwipe'

export default {
  name: 'Index',
  components: {
    Banner,
    Header,
    Nav,
    HotSale,
    StartupEssential,
    BusinessEssential,
    Utilities,
    PlatformAdvantage,
    SPDescription,
    FooterBottom,
    Form,
    PlannerSwipe,
    DggImCompany,
    Dialog,
  },
  async asyncData({ $axios }) {
    const type = 'extendBussineHome'
    // 默认数据：当请求code不为200时，都使用默认数据保证页面正常显示
    const defaultResultData = PageJson.defaultResultData
    try {
      const res = await $axios.get(`${spreadApi.list}?pageCode=${type}`)
      console.log('spreadApi.list success：', res.code + '--' + res.message)
      if (res.code === 200) {
        return {
          resultData: res,
        }
      } else {
        return {
          resultData: defaultResultData,
        }
      }
    } catch (error) {
      console.log('spreadApi.list error：', error.message)
      // 请求出错也要保证页面正常显示
      return {
        resultData: defaultResultData,
      }
    }
  },
  data() {
    return {
      pageTitle: '工商首页',
      images: ['https://cdn.shupian.cn/sp-pt/wap/images/1orfon5hb1ds000.jpg'],

      // @--规划师
      plannerList: [
        {
          id: '7862495547640840192',
          avatarImg: '',
          name: '张毅',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
      ], // 规划师列表
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      }, // 页面规划师

      // @--埋点数据
      plannerListMd: {
        title: '企服规划师',
        imName: '',
        telName: '',
      },
      fixedBottomMd: {
        telMd: {
          name: '工商聚合页_底部_电话联系',
        },
        imMd: {
          name: '工商聚合页_底部_在线咨询',
          type: '售前',
        },
      },

      // @--广告位数据
      hotSaleProductList: PageJson.hotSaleProductList,
      startupEssentialProductList: PageJson.startupEssentialProductList,
      businessEssentialProductList: PageJson.businessEssentialProductList,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity.name || '成都',
    }),
  },
  created() {
    this.adHandleData(this.resultData.data.adList || [])
    this.plannerHandleData(this.resultData.data.planlerList || [])
  },
  mounted() {
    // @--判断页面是否在app里打开
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: this.pageTitle }, () => {})
    }
  },
  methods: {
    // @--跳转
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    // 跳转链接-IM规划师
    jumpLink(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.open(url)
        } else {
          this.$router.push(url)
        }
      } else {
        // IM美恰客服
        window.spptMqMi.showPanel()
      }
    },

    // @--处理页面数据
    // 处理广告位数据
    adHandleData(data) {
      if (data.length === 0) return
      data.forEach((adItem, adIndex) => {
        adItem.sortMaterialList.forEach((item, index) => {
          const referencePrice =
            item.materialList[0].productDetail.referencePrice
          if (referencePrice) {
            switch (adIndex) {
              // 热销专区
              case 0: {
                this.hotSaleProductList[index].price = referencePrice
                break
              }
              // 初创必备
              case 1: {
                this.startupEssentialProductList[index].price = referencePrice
                break
              }
              // 经营必备
              case 2: {
                this.businessEssentialProductList[index].price = referencePrice
                break
              }
            }
          }
        })
      })
    },
    // 处理规划师数据
    plannerHandleData(data) {
      if (data.length === 0) return
      // 默认第一个为页面规划师
      this.pagePlanner = {
        id: data[0].userCentreId,
        name: data[0].realName,
        jobNum: data[0].loginName,
        telephone: data[0].userPhone,
        imgSrc: data[0].userHeadUrl,
      }

      // 规划师列表
      const plannerList = []
      data.forEach((item) => {
        const obj = {
          id: item.userCentreId,
          avatarImg: item.userHeadUrl,
          name: item.realName,
          shuPianFen: 11,
          serverNum: 250,
          telephone: item.userPhone,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: item.loginName,
        }
        plannerList.push(obj)
      })
      this.plannerList = plannerList
    },
  },
  head() {
    return {
      title: '工商首页',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
          ssr: false,
          type: 'text/javascript',
          charset: 'utf-8',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;

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

  // @--穿透修改样式
  ::v-deep .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
}
</style>
