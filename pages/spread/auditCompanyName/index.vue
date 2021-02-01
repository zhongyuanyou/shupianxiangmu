<template>
  <div class="audit-company-name">
    <!-- s 头部导航 -->
    <Header v-show="!isInApp" :title="title">
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
    <!-- e 头部导航 -->
    <div class="audit-company-name__centenr">
      <!-- s banner -->
      <Banner :imglist="imgList"></Banner>
      <!-- e banner -->
      <!-- s 表单 -->
      <AuditCompanyNameFrom :total="auditNums" />
      <!-- e 表单 -->
    </div>

    <!-- s 公司起名禁忌列表 -->
    <AuditCompanyNameTaboo :audittaboo="auditTaboo" />
    <!-- e 公司起名禁忌列表 -->
    <!-- s 规划师 -->
    <PlannerSwipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
      md-type="new"
    />
    <!-- e 规划师 -->
    <DggImCompany />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PlannerSwipe from '@/components/spread/auditCompanyName/PlannerSwipe'
import AuditCompanyNameFrom from '@/components/spread/auditCompanyName/AuditCompanyNameFrom'
import Header from '@/components/common/head/header'
import AuditCompanyNameTaboo from '@/components/spread/auditCompanyName/AuditCompanyNameTaboo'
import DggImCompany from '@/components/spread/DggImCompany'
import Banner from '@/components/spread/auditCompanyName/AuditCompanyNameBanner'

import { planlerList, nums } from '@/assets/spread/auditComopanyName'
import { spreadApi } from '@/api/spread'

export default {
  name: 'Index',
  components: {
    DggImCompany,
    Header,
    AuditCompanyNameFrom,
    AuditCompanyNameTaboo,
    PlannerSwipe,
    Banner,
  },
  props: {},

  // 服务端渲染请求数据
  async asyncData({ $axios }) {
    const type = 'extendAuthName'

    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      // 如果请求成功 把请求到的数据返回 否则把defaultRes的假数据返回
      if (res.code === 200) {
        return { resultData: res.data }
      }
      // 如果请求报错 把defaultRes的假数据返回
    } catch (error) {
      console.log(error)
      return {
        resultData: null,
      }
    }
  },

  data() {
    return {
      title: '免费核名',
      /** 轮播规划师数据 */
      plannersData: [],
      plannersCommon: {
        title: '咨询规划师',
        imName: '核名_咨询规划师_在线咨询',
        telName: '核名_咨询规划师_拨打电话',
      },
      // 起名禁忌数据
      auditTaboo: {
        title: '公司起名，这些禁忌不能犯',
        taboo: [
          {
            id: 1,
            img: 'https://cdn.shupian.cn/sp-pt/wap/4o0wkcazz0o0000.png',
            details: '与其他公司重名',
          },
          {
            id: 2,
            img: 'https://cdn.shupian.cn/sp-pt/wap/3wj2bt56z380000.png',
            details: '触犯驰名商标',
          },
          {
            id: 3,
            img: 'https://cdn.shupian.cn/sp-pt/wap/ektzb2275kg0000.png',
            details: '与知名公司混淆',
          },
          {
            id: 4,
            img: 'https://cdn.shupian.cn/sp-pt/wap/8sg9dbf7ehw0000.png',
            details: '使用地区名及简称',
          },
          {
            id: 5,
            img: 'https://cdn.shupian.cn/sp-pt/wap/74lv2m747zw0000.png',
            details: '使用繁体/数字/英文',
          },
          {
            id: 6,
            img: 'https://cdn.shupian.cn/sp-pt/wap/8swye3g0wmc0000.png',
            details: '使用行业通用词',
          },
          {
            id: 7,
            img: 'https://cdn.shupian.cn/sp-pt/wap/86hkftm3wqs0000.png',
            details: '使用名人字号',
          },
          {
            id: 8,
            img: 'https://cdn.shupian.cn/sp-pt/wap/csc4z9bnyiw000.png',
            details: '带有宗教色彩',
          },
        ],
      },
      // banner 背景图
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/591qqekl2f40000.png',
        },
      ],
      // 核名数据
      auditNums: {},
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {},
  created() {},
  mounted() {
    try {
      this.plannerHandle(this.resultData.planlerList)
      this.toAdiut(this.resultData.nums)
    } catch (error) {
      console.log(error)
      this.toAdiut(nums)
      this.plannerHandle(planlerList)
    }

    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '免费核名' }, () => {})
    }
  },
  methods: {
    /** 规划师数据处理 */
    plannerHandle(data) {
      if (data.length !== 0) {
        const guihuashiList = []
        data.forEach((item, i) => {
          const obj = {
            id: item.userCentreId,
            type: '金牌规划师',
            imgSrc: item.userHeadUrl,
            avatarImg: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 11,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.userPhoneloginName,
          }
          guihuashiList.push(obj)
        })
        this.plannersData = guihuashiList
        this.planner = guihuashiList[0]
      } else {
        return this.plannersData
      }
    },
    /** 处理核名数据 */
    toAdiut(data) {
      this.auditNums = {
        auditNameSum: (data.todayNum || 0)
          .toString()
          .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
        addUpAuditNameSum: (data.totalNum || 0)
          .toString()
          .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
      }
    },
    back() {
      // 返回上一页
      console.log(window.history.length)
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
  },
  head() {
    return {
      title: '免费核名',
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
.audit-company-name {
  width: 750px;
  margin: 0 auto;
  position: relative;
  background-color: #ffffff;
  &__centenr {
    height: 900px;
    position: relative;
  }
  ::v-deep .fixed-head {
    .my-head {
      width: 750px;
      left: 50%;
      margin-left: -375px;
      .slot-left {
        left: 32px;
      }
    }
  }
}
</style>
