<template>
  <div class="page-content">
    <!-- S 头部-->
    <Header v-if="!isInApp" :title="pageTitle" />
    <!-- E 头部-->

    <!-- S Banner-->
    <Banner />
    <!-- E Banner-->

    <!-- S 表单-->
    <Form />
    <!-- E 表单-->

    <!-- S 热门办理业务-->
    <HotBusiness class="hot-business-margin" />
    <!-- E 热门办理业务-->

    <!-- S 热门办理业务-规划师-->
    <PlannerSwipe
      class="planner-swipe"
      :planners-data="[plannerList[0]]"
      :planners-common="{
        title: '',
        imName: '互联网资质热门办理业务_规划师咨询',
        telName: '互联网资质热门办理业务_规划师电话',
      }"
    />
    <!-- E 热门办理业务-规划师-->

    <!-- S 热门行业推荐-->
    <HotIndustryRecommend class="hot-industry-margin" />
    <!-- E 热门行业推荐-->

    <!-- S 常见问题-->
    <CommonQuestion class="" />
    <!-- E 常见问题-->

    <!-- S 免费咨询-->
    <ConsultTel
      title="有其他问题？免费咨询"
      tel="028-954310"
      md-name="其他问题_立即咨询"
    />
    <!-- E 免费咨询-->

    <!-- S 服务流程-->
    <ServiceProcess class="service-process-margin" />
    <!-- E 服务流程-->

    <!-- S 咨询规划师-->
    <PlannerSwipe
      :planners-data="plannerList"
      :planners-common="{
        title: '咨询规划师',
        imName: '互联网资质_咨询规划师_在线咨询',
        telName: '互联网资质_咨询规划师_拨打电话',
      }"
    />
    <!-- E 咨询规划师-->

    <!-- S 你可能还需要办理-->
    <PossibleHandle class="possible-margin" />
    <!-- E 你可能还需要办理-->

    <!-- S 有疑问-->
    <ConsultTel
      title="有疑问？千万企服规划师为您免费解答"
      tel="028-954310"
      md-name="互联网资质_还有疑问_立即咨询"
    />
    <!-- E 有疑问-->

    <!-- S 薯片找人-->
    <SPDescription />
    <!-- E 薯片找人-->

    <!-- S 固定底部-->
    <FixedBottom :planner="pagePlanner" :md="fixedBottomMd" />
    <!-- E 固定底部-->

    <!-- S IM在线咨询-->
    <DggImCompany></DggImCompany>
    <!-- E IM在线咨询-->

    <!-- S 表单提交成功提示框 -->
    <Dialog />
    <!-- E 表单提交成功提示框 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { spreadApi } from '@/api/spread'
import PageJson from '@/assets/spread/internetQualification.js'
import Header from '@/components/common/head/header'
import DggImCompany from '@/components/spread/DggImCompany'
import PlannerSwipe from '@/components/spread/common/PlannerSwipe'
import ConsultTel from '@/components/spread/common/ConsultTel'
import SPDescription from '@/components/spread/common/SPDescription'
import FixedBottom from '@/components/spread/common/FixedBottom'
import Dialog from '@/components/spread/common/Dialog'

import Form from '@/components/spread/internetQualification/Form'
import Banner from '@/components/spread/internetQualification/Banner'
import HotBusiness from '@/components/spread/internetQualification/HotBusiness'
import CommonQuestion from '@/components/spread/internetQualification/CommonQuestion'
import ServiceProcess from '@/components/spread/internetQualification/ServiceProcess'
import PossibleHandle from '@/components/spread/internetQualification/PossibleHandle'
import HotIndustryRecommend from '@/components/spread/internetQualification/HotIndustryRecommend'

export default {
  name: 'InternetQualification',
  components: {
    Header,
    Form,
    Banner,
    HotBusiness,
    PlannerSwipe,
    CommonQuestion,
    ServiceProcess,
    PossibleHandle,
    ConsultTel,
    SPDescription,
    FixedBottom,
    DggImCompany,
    HotIndustryRecommend,
    Dialog,
  },
  async asyncData({ $axios }) {
    const type = 'extendNetWorkQualifications'
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
      pageTitle: '互联网资质',

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
          imgSrc: '',
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
      fixedBottomMd: {
        telMd: {
          name: '互联网资质_钻石展位_拨打电话',
        },
        imMd: {
          name: '互联网资质_钻石展位_在线咨询',
          type: '售前',
        },
      },

      // @--广告位数据：两个广告位
      // 热门办理业务列表
      hotBusinessList: PageJson.hotBusinessList,
      // 热门行业推荐列表
      hotIndustryRecommendList: PageJson.hotIndustryRecommendList,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  async created() {
    await this.plannerHandleData(this.resultData.data.planlerList || [])
    this.adHandleData(this.resultData.data.adList || [])
  },
  mounted() {
    // @--判断页面是否在app里打开
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: this.pageTitle }, () => {})
    }
  },
  methods: {
    // @--跳转
    // 跳转链接-IM规划师
    jumpLink(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.open(url)
        } else {
          this.$router.push(url)
        }
      } else {
        const planner = this.pagePlanner
        this.$root.$emit(
          'openIMM',
          planner.id,
          planner.name || '',
          planner.jobNum || '',
          planner.imgSrc || ''
        )
      }
    },

    // @--处理页面数据
    // 处理广告位数据
    adHandleData(data) {
      if (data.length === 0) return
      data.forEach((adItem, adIndex) => {
        switch (adIndex) {
          case 0: {
            adItem.sortMaterialList.forEach((item, index) => {
              this.hotBusinessList[index].title =
                item.materialList[0].productDetail.operating.showName

              this.hotBusinessList[index].desc =
                item.materialList[0].productDetail.operating.productDescribe

              this.hotBusinessList[index].price =
                item.materialList[0].productDetail.referencePrice
            })
            break
          }
          case 1: {
            // 热门行业推荐
            // 将值全部取出
            adItem.sortMaterialList.forEach((item, index) => {
              this.hotIndustryRecommendList[index].title =
                item.materialList[0].productDetail.operating.showName

              this.hotIndustryRecommendList[index].titleContent =
                item.materialList[0].productDetail.operating.productDescribe

              this.hotIndustryRecommendList[index].actualViews =
                item.materialList[0].productDetail.operating.actualViews

              this.hotIndustryRecommendList[index].defaultSales =
                item.materialList[0].productDetail.operating.defaultSales

              this.hotIndustryRecommendList[index].actualSales =
                item.materialList[0].productDetail.operating.actualSales

              this.hotIndustryRecommendList[index].price =
                item.materialList[0].productDetail.referencePrice

              // 从规划师列表随机取个规划师
              const num = Math.floor(Math.random() * this.plannerList.length)
              this.hotIndustryRecommendList[index].planner =
                this.plannerList[num]
            })
            break
          }
        }
      })
    },
    // 处理规划师数据
    plannerHandleData(data) {
      if (data.length === 0) return
      // 随机取一个为页面规划师
      const num = Math.floor(Math.random() * data.length)
      this.pagePlanner = {
        id: data[num].userCentreId,
        name: data[num].realName,
        jobNum: data[num].loginName,
        telephone: data[num].userPhone,
        imgSrc: data[num].userHeadUrl,
      }

      // 规划师列表
      const plannerList = []
      data.forEach((item) => {
        const obj = {
          id: item.userCentreId,
          name: item.realName,
          jobNum: item.loginName,
          telephone: item.userPhone,
          imgSrc: item.userHeadUrl,
          avatarImg: item.userHeadUrl,
          shuPianFen: 11,
          serverNum: 250,
          labels: ['工商注册', '财税咨询', '税务筹划'],
        }
        plannerList.push(obj)
      })
      this.plannerList = plannerList
    },
  },
  head() {
    return {
      title: '互联网资质',
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

  .hot-business-margin {
    margin-top: 32px;
  }

  .hot-industry-margin {
    margin-top: 24px;
    margin-bottom: 64px;
  }
  .service-process-margin {
    margin-top: 28px;
  }

  .possible-margin {
    margin-top: 24px;
  }

  // @--穿透更改样式
  ::v-deep .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
  .planner-swipe {
  }
  ::v-deep .planner-right {
    width: 0;
  }

  ::v-deep .planner {
    height: auto;
  }
}
</style>
