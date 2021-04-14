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
    <!-- <NavBtns class="nav-btn-margin" /> -->
    <NavBar class="nav-btn-margin" :data="dataList" />
    <!-- END   导航部-金刚区-->

    <!-- START 轮播Banner-->
    <Banner class="banner-margin" :data="imageBanner" />

    <!-- END   轮播Banner-->

    <!-- START 表单-->
    <!-- <Form /> -->
    <Form class="laowu-form" :data="cardName" />
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

import NavBar from '@/components/spread/transactionPro/common/NavBar'
import Banner from '@/components/spread/transactionPro/common/Banner'
import Form from '~/components/spread/transactionPro/common/Form'
import HotIndustry from '@/components/spread/transactionPro/companyTransaction/HotIndustry'
import WithAssetsType from '@/components/spread/transactionPro/companyTransaction/WithAssetsType'
import RecommendCompany from '@/components/spread/transactionPro/companyTransaction/RecommendCompany'

export default {
  name: 'Index',
  components: {
    Header,
    Banner,
    Form,
    HotIndustry,
    WithAssetsType,
    RecommendCompany,
    FixedBottom,
    DggImCompany,
    NavBar,
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
      }, // 页面规划师y

      dataList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7ry6zqnzmtg0000.png',
          text: '热门公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '公司交易聚合页_总包资质',
          },
        },

        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fg2ksxx000o0000.png',
          text: '优质公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },

        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8jhr24e0irw000.png',
          text: '特价公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1zjw4j2cor34000.png',
          text: '精品公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1887y4q19x9c000.png',
          text: '人气公司',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7ry6zqnzmtg0000.png',
          text: '科技信息',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5fly9lt75bs0000.png',
          text: '电子贸易',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6ral3star6s0000.png',
          text: '广告传媒',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4dn7hmjqqcq0000.png',
          text: '教育培训',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/44l5cj3uoxk0000.png',
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
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/f7ijmltazq00000.png',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5x2uvrt99dw0000.png',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
      ],

      // 表单
      cardName: {
        title: '只需5秒 一键为您适配专利',
        buttonName: '立即获取',
        subInfo: ['价格透明', '信息安全', '官方保障'],
        type: 'zhgszr', // 业态编码。固定几个业态编码。
        md: { pageName: '公司交易聚合页' },
      },
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
        if (url.indexOf('http') > -1) {
          window.open(url)
          // window.open(`${url}?code=${code}`)
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
    margin-top: 20px;
  }
  .banner-margin {
    margin: 20px auto;
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
