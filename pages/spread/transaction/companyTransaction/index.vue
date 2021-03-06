<template>
  <div class="page-content">
    <!-- START 头部Header-->
    <Header
      v-if="!isInApp"
      ref="header"
      :title="pageTitle"
      :fixed="false"
      head-class="head-icon"
    >
      <template v-slot:right>
        <span class="my-customize-header" @click="choiceCity">
          <span class="my-customize-header-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.18rem" color="#cccccc"></my-icon>
        </span>
      </template>
    </Header>
    <!-- END   头部Header-->

    <!-- START 导航部-金刚区-->
    <NavBtns class="nav-btn-margin" />
    <!-- END   导航部-金刚区-->

    <!-- START 轮播Banner-->
    <Banner class="banner-margin" />
    <!-- END   轮播Banner-->

    <!-- START 表单-->
    <Form />
    <!-- END   表单-->

    <!-- START 热门行业-->
    <HotIndustry class="banner-margin" />
    <!-- END   热门行业-->

    <!-- START 附带资产类型-->
    <WithAssetsType class="with-assets-type-margin" />
    <!-- END   附带资产类型-->

    <!-- START 推荐公司-->
    <RecommendCompany />
    <!-- END   推荐公司-->

    <!-- START 固定底部-->
    <FixedBottom
      v-md-map
      v-md:p_plannerBoothClick
      data-name="推荐规划师点击"
      data-track_code="SPTG000007"
      data-recommend_number=""
      :data-planner_number="pagePlanner.jobNum"
      :data-planner_name="pagePlanner.name"
      :planner="pagePlanner"
    />
    <!-- END 固定底部-->

    <!-- START IM在线咨询-->
    <DggImCompany></DggImCompany>
    <!-- END IM在线咨询-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { plannerApi } from '@/api/spread'
import Header from '@/components/common/head/header'
import DggImCompany from '@/components/spread/DggImCompany'
import FixedBottom from '@/components/spread/common/FixedBottom'

import NavBtns from '@/components/spread/transaction/companyTransaction/NavBtns'
import Banner from '@/components/spread/transaction/companyTransaction/Banner'
import Form from '@/components/spread/transaction/companyTransaction/Form'
import HotIndustry from '@/components/spread/transaction/companyTransaction/HotIndustry'
import WithAssetsType from '@/components/spread/transaction/companyTransaction/WithAssetsType'
import RecommendCompany from '@/components/spread/transaction/companyTransaction/RecommendCompany'

export default {
  name: 'Index',
  components: {
    Header,
    NavBtns,
    Banner,
    Form,
    HotIndustry,
    WithAssetsType,
    RecommendCompany,
    FixedBottom,
    DggImCompany,
  },
  data() {
    return {
      pageTitle: '公司交易',
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      }, // 页面规划师
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
  created() {
    this.getPagePlanner()
  },
  mounted() {
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
    // @--跳转
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
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

    // @--获取规划师
    async getPagePlanner() {
      try {
        const res = await this.$axios.get(`${plannerApi.planner}`)
        if (res.code === 200) {
          this.pagePlanner = {
            id: res.data.list[0].userCentreId,
            name: res.data.list[0].realName,
            jobNum: res.data.list[0].loginName,
            telephone: res.data.list[0].userPhone,
            imgSrc: res.data.list[0].userHeadUrl,
          }
        }
      } catch (error) {
        console.log('plannerApi.planner error：', error.message)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  background: #ffffff;
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
    margin-top: 24px;
  }
  .banner-margin {
    margin: 64px auto;
  }
  .with-assets-type-margin {
    margin-bottom: 32px;
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
