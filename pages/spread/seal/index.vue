<template>
  <div class="seal">
    <!--  头部  -->
    <Header v-show="!isInApp" :title="headTitle">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!--  头部  -->
    <!--  轮播/表单  -->
    <banner></banner>
    <!--  轮播/表单  -->
    <!--  刻章服务  -->
    <seal-serve></seal-serve>
    <!--  刻章服务  -->
    <!--  立即咨询  -->
    <consult-tel
      :tel="consultTel"
      md-name="专业刻章服务_免费咨询"
      title=""
      button="免费咨询"
    ></consult-tel>
    <!--  立即咨询  -->
    <!--  服务介绍  -->
    <service-introduced
      :service-list="serviceList"
      :service-title="serviceTitle"
    ></service-introduced>
    <!--  服务介绍  -->
    <!--  规划师  -->
    <planner-swipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
    ></planner-swipe>
    <!--  规划师  -->
    <!--  服务流程  -->
    <process></process>
    <!--  服务流程  -->
    <!--  平台优势  -->
    <goods></goods>
    <!--  平台优势  -->
    <!--  可能需要  -->
    <maby></maby>
    <!--  可能需要  -->
    <!--  立即咨询  -->
    <consult-tel
      :tel="consultTel"
      md-name="印章服务_疑问咨询"
      title="还有疑问？企服专家为您免费解答"
    ></consult-tel>
    <!--  立即咨询  -->
    <!--  薯片找人  -->
    <sp-description></sp-description>
    <!--  薯片找人  -->
    <!--  底部咨询  -->
    <fixedBottom :md="fixedMd" :planner="fixedBottomData"></fixedBottom>
    <!--  底部咨询  -->
    <!--  IM  -->
    <dgg-im-company></dgg-im-company>
    <!--  IM  -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
import banner from '~/components/spread/seal/Banner'
import sealServe from '~/components/spread/seal/SealServe'
import consultTel from '~/components/spread/common/ConsultTel'
import plannerSwipe from '~/components/spread/common/PlannerSwipe'
import process from '~/components/spread/seal/Process'
import serviceIntroduced from '~/components/spread/common/ServiceIntroduced'
import goods from '~/components/spread/seal/Goods'
import maby from '~/components/spread/seal/Maby'
import spDescription from '~/components/spread/common/SPDescription'
import fixedBottom from '~/components/spread/common/FixedBottom'
import dggImCompany from '~/components/spread/DggImCompany'
import { spread2Api } from '~/api/spread'
import { adList, planlerList } from '~/assets/spread/seal.js'

export default {
  name: 'Idnex',
  components: {
    Header,
    banner,
    sealServe,
    consultTel,
    plannerSwipe,
    process,
    serviceIntroduced,
    goods,
    maby,
    spDescription,
    fixedBottom,
    dggImCompany,
  },
  // 服务端渲染请求数据
  async asyncData({ $axios }) {
    const type = 'extendSealEngraving'
    const location = 'ad113205'
    try {
      const res = await $axios.get(spread2Api.list, {
        params: {
          pageCode: type,
          locations: location,
        },
      })
      if (res.code === 200) {
        return {
          result: res.data,
        }
      }
    } catch (error) {
      console.log('error', error)
      return {
        result: '',
      }
    }
  },
  data() {
    return {
      headTitle: '印章刻制',
      consultTel: '028-954310',
      plannersData: [],
      plannersCommon: {
        title: '咨询规划师',
        imName: '印章服务_咨询规划师_在线咨询',
        telName: '印章服务_咨询规划师_拨打电话',
      },
      // 服务列表
      serviceList: [],
      pageTitle: '印章刻制',
      serviceTitle: '服务介绍',
      fixedBottomData: {},
      fixedMd: {
        telMd: {
          name: '印章服务_钻石展位_拔打电话',
          type: '售前',
        },
        imMd: {
          name: '印章服务_钻石展位_在线咨询',
          type: '售前',
        },
      },
      // 请求失败的备用数据
      planlerList: '',
      adList: '',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    this.adList = adList
    this.planlerList = planlerList
    // 请求回来的数据替代本地
    if (this.result !== '' && this.result !== undefined) {
      if (
        this.result.planlerList !== undefined &&
        this.result.planlerList.length !== 0
      ) {
        this.planlerList = this.result.planlerList
      }
      if (this.result.adList !== undefined && this.result.adList.length !== 0) {
        this.adList = this.result.adList
      }
      if (this.result.nums !== undefined && this.result.nums.length !== 0) {
        this.todayNum = this.result.nums.todayNum
      }
    }
    this.getPlannersData()
    this.getServeData()
    this.getfixedBottomData()
  },
  mounted() {
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '印章刻制' }, () => {})
    }
  },
  methods: {
    // 头部返回
    back() {
      // 返回上一页
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },
    // 服务模块数据处理
    getServeData() {
      const length = this.adList[0].sortMaterialList.length
      for (let i = 0; i < length; i++) {
        const obj = {
          title:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .name,
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/7vjh29crwc00000.png',
          titleContent:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .operating.productDescribe,
          actualViews:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .operating.actualViews,
          defaultSales:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .operating.defaultSales,
          actualSales:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .operating.actualSales,
          price:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .referencePrice,
          detailsUrl:
            this.adList[0].sortMaterialList[i].materialList[0].materialLink,
          // bgImg: this.adList[0].sortMaterialList[i].materialList[0].materialUrl,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/8jllc0prmmw0000.jpg',
          planner: {
            id: this.planlerList[i % this.planlerList.length].userCentreId,
            name: this.planlerList[i % this.planlerList.length].realName,
            jobNum: this.planlerList[i % this.planlerList.length].loginName,
            telephone: this.planlerList[i % this.planlerList.length].userPhone,
            imgSrc: this.planlerList[i % this.planlerList.length].userHeadUrl,
          },
        }
        const serviceLabel = []
        this.adList[0].sortMaterialList[
          i
        ].materialList[0].productDetail.tags.forEach((item) => {
          if (item.tagType === 'PRO_SERVICE_TAG') {
            serviceLabel.push(item.tagName)
          } else if (item.tagType === 'PRO_SALES_TAG') {
            obj.salesTag = item.tagName
          }
        })
        obj.label = serviceLabel
        this.serviceList.push(obj)
      }
    },
    // 规划师模块数据处理
    getPlannersData() {
      const length = this.planlerList.length
      for (let i = 0; i < length; i++) {
        const obj = {
          id: this.planlerList[i].userCentreId,
          type: '金牌规划师',
          avatarImg: this.planlerList[i].userHeadUrl,
          name: this.planlerList[i].realName,
          shuPianFen: 138,
          serverNum: 258,
          telephone: this.planlerList[i].userPhone,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: this.planlerList[i].loginName,
        }
        this.plannersData.push(obj)
      }
    },
    // 底部模块数据处理
    getfixedBottomData() {
      this.fixedBottomData = {
        id: this.planlerList[0].userCentreId,
        name: this.planlerList[0].realName,
        jobNum: this.planlerList[0].loginName,
        telephone: this.planlerList[0].userPhone,
        imgSrc: this.planlerList[0].userHeadUrl,
      }
    },
  },
  head() {
    return {
      title: '印章刻制',
      meta: [
        {
          name: 'keywords',
          content: '专利转让网,专利转让平台,优质专利,专利交易,顶呱呱交易平台',
        },
        {
          name: 'description',
          content:
            '顶呱呱交易平台，提供特价专利转让、精品专利交易、专利买卖出售服务。百万海量专利资源在线选购，即买即用，专业的专利买卖平台就上顶呱呱，安全放心！',
        },
      ],
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
//::v-deep iframe {
//  display: none !important;
//}
.seal {
  background: #ffffff;
  width: @spread-page-width;
  margin: 0 auto;
  .back_icon {
    margin-left: 40px;
  }
  ::v-deep .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
}

// 服务组件字体颜色
::v-deep .serviceList-content-head-title > span {
  color: #ffffff !important;
}

::v-deep .serviceList-content-head > span {
  color: #cccccc !important;
}

//咨询外边距
::v-deep .cousulttel-title {
  margin: 0 0 24px;
}

//咨询内边距
::v-deep .cousulttel {
  padding-bottom: 0;
}

//轮播规划师组件圆角
::v-deep .planner-content-item-shadow {
  border-radius: 8px;
}

// 规划师组件上边距
::v-deep .planner {
  padding-top: 64px;
}
</style>
