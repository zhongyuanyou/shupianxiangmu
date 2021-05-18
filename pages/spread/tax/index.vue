<template>
  <div class="tax">
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
    <banner :today-num="todayNum"></banner>
    <!--  轮播/表单  -->
    <!--  服务  -->
    <serve :serve-data="serveData"></serve>
    <!--  服务  -->
    <!--  咨询  -->
    <conrult></conrult>
    <!--  咨询  -->
    <!--  优势  -->
    <good></good>
    <!--  优势  -->
    <!--  服务流程  -->
    <process></process>
    <!--  服务流程  -->
    <!--  规划师  -->
    <planner-swipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
    ></planner-swipe>
    <!--  规划师  -->
    <!--  可能需要  -->
    <maby></maby>
    <!--  可能需要  -->
    <!--  立即咨询  -->
    <consult-tel
      :tel="consultTel"
      :title="consultTitle"
      md-name="对代理记账还有疑问_立即咨询"
    ></consult-tel>
    <!--  立即咨询  -->
    <!--  薯片找人  -->
    <sp-description></sp-description>
    <!--  薯片找人  -->
    <!--  底部  -->
    <fixed-bottom :planner="fixedBottomData" :md="fixedMd"></fixed-bottom>
    <!--  底部  -->
    <!--  IM  -->
    <dgg-im-company></dgg-im-company>
    <!--  IM  -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
import banner from '~/components/spread/tax/Banner'
import serve from '~/components/spread/tax/Serve'
import conrult from '~/components/spread/tax/Conrult'
import good from '~/components/spread/tax/Good'
import process from '~/components/spread/tax/Process'
import plannerSwipe from '~/components/spread/common/PlannerSwipe'
import maby from '~/components/spread/tax/Maby'
import dggImCompany from '~/components/spread/DggImCompany'
import spDescription from '~/components/spread/common/SPDescription'
import fixedBottom from '~/components/spread/common/FixedBottom'
import consultTel from '~/components/spread/common/ConsultTel'
import { spread2Api } from '@/api/spread'
import { adList, planlerList } from '~/assets/spread/tax.js'

export default {
  name: 'TaxVue',
  components: {
    Header,
    banner,
    serve,
    conrult,
    good,
    process,
    plannerSwipe,
    maby,
    dggImCompany,
    spDescription,
    fixedBottom,
    consultTel,
  },
  // 服务端渲染请求数据
  async asyncData({ $axios }) {
    const type = 'extendTaxPlanning'
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
      headTitle: '税务筹划',
      plannersData: [],
      plannersCommon: {
        title: '咨询规划师',
        imName: '税务筹划_咨询规划师_在线咨询',
        telName: '税务筹划_咨询规划师_拨打电话',
      },
      fixedBottomData: {},
      fixedMd: {
        telMd: {
          name: '税务筹划_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '税务筹划_钻石展位_在线咨询',
          type: '售前',
        },
      },
      consultTitle: '对于代理记账还有疑问？企服专家为您免费解答',
      consultTel: '4000-962540',
      serveData: [],
      // 请求失败的备用数据
      planlerList: '',
      adList: '',
      todayNum: 118,
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
      this.$appFn.dggSetTitle({ title: '税务筹划' }, () => {})
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
          showName:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .operating.showName,
          slogan:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .operating.slogan,
          num1: this.adList[0].sortMaterialList[i].materialList[0].productDetail
            .operating.actualViews,
          num2: this.adList[0].sortMaterialList[i].materialList[0].productDetail
            .operating.defaultSales,
          num3: this.adList[0].sortMaterialList[i].materialList[0].productDetail
            .operating.actualSales,
          price:
            this.adList[0].sortMaterialList[i].materialList[0].productDetail
              .referencePrice,
          detailsUrl:
            this.adList[0].sortMaterialList[i].materialList[0].materialLink,
          productName: '增值税筹划',
          planner: {
            person: this.planlerList[i % this.planlerList.length].userHeadUrl,
            id: this.planlerList[i % this.planlerList.length].userCentreId,
            name: this.planlerList[i % this.planlerList.length].realName,
            jobNum: this.planlerList[i % this.planlerList.length].loginName,
            phone: this.planlerList[i % this.planlerList.length].userPhone,
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
        this.serveData.push(obj)
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
    // 这个页面统一调用IM时的信息
    openIm() {
      this.$root.$emit(
        'openIMM',
        this.planlerList[0].userCentreId,
        this.planlerList[0].realName,
        this.planlerList[0].loginName,
        this.planlerList[0].userHeadUrl
      )
    },
  },
  head() {
    return {
      title: '税务筹划',
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

<style scoped lang="less">
//::v-deep iframe {
//  display: none !important;
//}
.tax {
  background: #ffffff;
  width: @spread-page-width;
  margin: 0 auto;
  .back_icon {
    margin-left: 40px;
  }
}

::v-deep .my-head {
  width: @spread-page-width !important;
  left: auto !important;
}
</style>
