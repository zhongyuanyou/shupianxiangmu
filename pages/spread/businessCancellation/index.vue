<template>
  <div class="page-content">
    <!-- 头部 -->
    <Header v-show="!isInApp" title="工商注销">
      <template #left>
        <div @click="back">
          <Icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1a1a1a"
          />
        </div>
      </template>
    </Header>
    <!-- 轮播图区域 -->
    <Swipe :banners="banners" />
    <!-- 预约区域 -->
    <Appointment />
    <!-- 影响 -->
    <Influence />
    <!-- 业务介绍 -->
    <Introduce :service-list="serviceListData" />
    <!-- 注销资料 -->
    <Material />
    <!-- 服务流程 -->
    <Process />
    <!-- 咨询规划师 -->
    <Consult :planners-data="plannersData" />
    <!-- 还需办理 -->
    <Need />
    <!-- 薯片找人 -->
    <Chips />
    <!-- 固定底部-->
    <FixedBottom :planner="planner" md-type="new" :md="fixedMd" />
    <!-- im组件 -->
    <DggImCompany />
  </div>
</template>
<script>
import { mapState } from 'vuex'

import {
  plannersData,
  serviceListData,
  planner,
} from '~/assets/spread/businessCancellation.js'

import Swipe from '~/components/spread/businessCancellation/Swipe'
import Appointment from '~/components/spread/businessCancellation/Appointment'
import Influence from '~/components/spread/businessCancellation/Influence'
import Introduce from '~/components/spread/businessCancellation/Introduce'
import Material from '~/components/spread/businessCancellation/Material'
import Process from '~/components/spread/businessCancellation/Process'
import Consult from '~/components/spread/businessCancellation/Consult'
import Need from '~/components/spread/businessCancellation/Need'
import DggImCompany from '~/components/spread/DggImCompany'
import Header from '~/components/common/head/header'
import Icon from '~/components/common/myIcon/MyIcon'
import Chips from '~/components/spread/common/SPDescription'
import FixedBottom from '~/components/spread/common/FixedBottom'

import { spread2Api } from '~/api/spread'

export default {
  components: {
    Header,
    Swipe,
    Appointment,
    Influence,
    Introduce,
    Material,
    Process,
    Consult,
    Need,
    Chips,
    FixedBottom,
    DggImCompany,
    Icon,
  },
  async asyncData({ $axios }) {
    const type = 'extendBussineWithdraw'
    try {
      const res = await $axios.get(spread2Api.list, {
        params: {
          pageCode: type,
          locations: 'ad113205',
        },
      })
      // 待
      if (res.code === 200) {
        console.log('请求成功')
        return { resultData: res.data }
      }
      console.log('请求错误')
      return { resultData: null }
    } catch (error) {
      return { resultData: null }
    }
  },
  data() {
    return {
      // 轮播规划师备用数据
      plannersData: [],
      // 底部规划师备用数据
      planner: {},
      // 业务介绍备用数据
      serviceListData: [],
      // 轮播图数据
      banners: [
        {
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/8beijb7x3aw0000.png',
        },
      ],
      // 服务列表标签
      lables: [
        ['快至30个工作日', '成功率高，省心省钱'],
        ['快至30个工作日', '流程手续正规化'],
        ['快至30个工作日', '专业团队申请，快速高效'],
        ['快至30个工作日', '流程透明化，节点清晰可查'],
      ],
      // 固定底部数据
      fixedMd: {
        telMd: {
          name: '工商注销_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '工商注销_钻石展位_在线咨询',
          type: '售前',
        },
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    this.initializedData()
    this.setPageTitle()
    // 处理数据，若后台数据格式有误，则抛出错误，不覆盖备用数据
    try {
      this.serviceList(this.resultData)
      this.plannerHandle(this.resultData)
    } catch (err) {}
  },
  methods: {
    // 返回上一页
    back() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      }
      this.$router.back()
    },
    // 若在App中设置标题
    setPageTitle() {
      if (this.isInApp) {
        this.$appFn.dggSetTitle({ title: '工商注销' }, () => {})
      }
    },
    // 初始化备用数据
    initializedData() {
      this.plannersData = plannersData
      this.planner = planner
      this.serviceListData = serviceListData
    },
    // 业务介绍数据处理
    serviceList(data) {
      const listAll = data.adList[0].sortMaterialList
      if (listAll.length === 0) return
      const dataList = listAll.map((item, index) => {
        // 获取随机下标，当lables长度不够时
        const subscript = `${
          index < this.lables.length
            ? index
            : Math.floor(Math.random() * this.lables.length)
        }`
        const list = item.materialList[0].productDetail
        console.log(list, 646546)
        const serviceObj = {
          title: list.operating.showName,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/d4ynsvxsx9c0000.png',
          url: item.materialList[0].materialLink,
          // titlelable: 'https://cdn.shupian.cn/sp-pt/wap/fr83o22hz3s0000.png',
          // titlelable: '限时优惠',
          serviceTag: [], // 服务标签
          activityTag: '', // 活动标签
          salesTag: '', // 销售标签
          titleContent: list.operating.slogan,
          lowerPrice: list.referencePrice,
          // tags: this.lables[subscript],
          number: [
            { content: '在线咨询', num: list.operating.actualViews },
            { content: '累计成交', num: list.operating.defaultSales },
            { content: '成功案例', num: list.operating.actualSales },
          ],
          planner: {
            id: '66475',
            name: '钟霞',
            jobNum: '38798340',
            telephone: '13730634929',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.gw_defult/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
        }
        // 判断标签类型
        // console.log(list, 646546)
        if (list.tags.length !== 0) {
          console.log(1111)
          list.tags.filter((item) => {
            if (item.tagType === 'PRO_SERVICE_TAG') {
              // 服务标签
              serviceObj.serviceTag.push(item.tagName)
            }
            if (item.tagType === 'PRO_ACTIVITY_TAG') {
              // 活动标签
              serviceObj.activityTag = item.tagName
              console.log(item.tagName)
            }
            if (item.tagType === 'PRO_SALES_TAG') {
              // 销售标签
              serviceObj.salesTag = item.tagName
            }
          })
        }
        if (data.planlerList.length > 0) {
          const subPlanner =
            data.planlerList[
              `${
                index < data.planlerList.length
                  ? index
                  : Math.floor(Math.random() * data.planlerList.length)
              }`
            ]
          serviceObj.planner.id = subPlanner.userCentreId
          serviceObj.planner.name = subPlanner.realName
          serviceObj.planner.jobNum = subPlanner.loginName
          serviceObj.planner.telephone = subPlanner.userPhone
          serviceObj.planner.imgSrc = subPlanner.userHeadUrl
        } else {
          return false
        }
        return serviceObj
      })
      const hasFalse = dataList.indexOf(false)
      if (hasFalse === -1) {
        this.serviceListData = dataList
      }
    },
    // 规划师数据处理
    plannerHandle(data) {
      if (data.planlerList.length > 0) {
        const plannersList = data.planlerList.map((item) => {
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
            jobNum: item.loginName,
          }
          return obj
        })
        this.plannersData = plannersList
        this.planner = plannersList[0]
      }
    },
  },
  head() {
    return {
      title: '工商注销',
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
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  background-color: #fff;
}
.back_icon {
  margin-left: 40px;
}

::v-deep .sp-bottombar-info__sign {
  display: flex;
  align-items: center;
}
::v-deep .cousulttel-content-left-number {
  margin-top: -7px;
}
::v-deep .cousulttel-content-left-text {
  margin-right: 16px;
}
::v-deep .fixed-head {
  .my-head {
    width: 750px;
    left: 50%;
    margin-left: -375px;
  }
}
::v-deep .sp-bottombar {
  z-index: 99;
}
</style>
