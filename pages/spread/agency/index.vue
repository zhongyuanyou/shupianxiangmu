<template>
  <div ref="agencyPage" class="agency">
    <!-- s 头部导航 -->
    <Header v-if="!isInApp" :title="title">
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
    <!-- s Banner -->
    <Banner :imglist="imgList" />
    <!-- e Banner -->
    <!-- s form表单 -->
    <Form :nums="nums" />
    <!-- e form表单 -->
    <!-- s 服务介绍 -->
    <Service :servicelist="servicelist" />
    <!-- e 服务介绍 -->
    <!-- s 服务内容 -->
    <ServiceContent />
    <!-- e 服务内容 -->
    <!-- s 服务流程 -->
    <Process />
    <!-- e 服务流程 -->
    <!-- s 为什么选择薯片平台-->
    <Choose />
    <!-- e 为什么选择薯片平台-->
    <!-- s 咨询规划师 -->
    <Planners :planners-data="plannersList" :planners-common="plannersTitle" />
    <!-- e 咨询规划师 -->
    <!-- s 可能需要 -->
    <Need />
    <!-- e 可能需要 -->

    <!-- s 底部导航 -->
    <Bottom :planner="planner" :md="fixedMd" />
    <!-- e 底部导航 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/common/head/header'
import Banner from '@/components/spread/agency/Banner'
import Form from '@/components/spread/agency/Form'
import Service from '@/components/spread/agency/Service'
import ServiceContent from '@/components/spread/agency/Servicecontent'
import Process from '@/components/spread/agency/Process'
import Choose from '@/components/spread/agency/Choose'
import Planners from '@/components/spread/common/PlannerSwipe'
import Bottom from '@/components/spread/common/FixedBottom'
import Need from '@/components/spread/agency/Need'
import dggImCompany from '@/components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'
import dataResult from '@/assets/spread/agency.js'
export default {
  components: {
    Header,
    Banner,
    Form,
    Service,
    ServiceContent,
    Process,
    Choose,
    Planners,
    Need,
    Bottom,
    dggImCompany,
    // Dialog,
  },
  async asyncData({ $axios }) {
    const type = 'extendAccount'
    const resultData = dataResult
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      // console.log(`Spread.Api 代理记账: ${res.code} - ${res.message}`)
      if (res.code === 200) {
        return {
          result: res,
        }
      } else {
        return { result: resultData }
      }
    } catch (error) {
      // 请求出错也要保证页面正常显示
      return { result: resultData }
    }
  },
  data() {
    return {
      labels: [
        {
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f7ec4mvmvrk0000.png',
          label: '资深会计',
        },
        {
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f7ec4mvmvrk0000.png',
          label: '直连税务系统',
        },
        {
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f7ec4mvmvrk0000.png',
          label: '档案严格保密',
        },
      ],
      title: '代理记账',
      plannersTitle: {
        title: '咨询规划师',
        imName: '代理记账咨询规划师_在线咨询',
        telName: '代理记账咨询规划师_拨打电话',
      },
      serviceBg: [
        'https://cdn.shupian.cn/sp-pt/wap/images/98njyijmjzg0000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/g9qto371i600000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/3nw97vec94s0000.jpg',
      ],
      nums: {
        totalNum: 640116,
        todayNum: 123,
      },
      planner: {
        id: '7887200447257313280',
        name: '李劲',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      // 轮播列表
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/dshrn46ces00000.jpg',
        },
      ],
      // 服务介绍列表
      servicelist: [
        {
          id: '',
          actualViews: '7295',
          defaultSales: '5173',
          actualSales: '5173',
          price: '2288',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/98njyijmjzg0000.jpg',
          planner: {
            id: '',
            name: '',
            jobNum: '',
            telephone: '',
            imgSrc: '',
            avatarImg: '',
          },
          plannerName: '',
        },
        {
          id: '',
          actualViews: '983',
          defaultSales: '642',
          actualSales: '642',
          price: '1500',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/g9qto371i600000.jpg',
          planner: '',
          plannerName: '',
        },
        {
          id: '',
          actualViews: '1275',
          defaultSales: '937',
          actualSales: '937',
          price: '6988',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/3nw97vec94s0000.jpg',
          planner: '',
          plannerName: '',
        },
      ],
      // 规划师列表

      plannersList: [
        {
          id: 1,
          type: '金牌规划师',
          avatarImg:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          name: '李劲',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 18402858698,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7887200447257313280',
            name: '李劲',
            num: '108862',
          },
        },
      ],
      // 埋点
      fixedMd: {
        telMd: {
          name: '代理记账_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '代理记账_钻石展位_在线咨询',
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
  created() {
    this.productDetail(this.result.data.adList[0].sortMaterialList)
    this.nums = this.result.data.nums
    if (this.result.data.planlerList !== 0) {
      this.plannerHandleData(this.result.data.planlerList || [])
    }
  },
  mounted() {
    // 设置嵌入app时头部title
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '代理记账' }, () => {})
    }
  },
  methods: {
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
    // 商品数据处理
    productDetail(data) {
      this.plannerHandleData(this.result.data.planlerList || [])
      if (data.length === 0) {
      } else {
        const fuWuList = []
        data.forEach((item, index) => {
          const obj = {
            id: item.materialList[0].productDetail.id,
            productName: item.materialList[0].productDetail.operating.showName,
            productDescribe:
              item.materialList[0].productDetail.operating.productDescribe,
            actualViews:
              item.materialList[0].productDetail.operating.actualViews,
            defaultSales:
              item.materialList[0].productDetail.operating.defaultSales,
            actualSales:
              item.materialList[0].productDetail.operating.actualSales,
            price: item.materialList[0].productDetail.referencePrice,
            bgimage: this.serviceBg[index],
            planner: this.plannersList[
              `${
                index < this.plannersList.length
                  ? index
                  : Math.floor(Math.random() * this.plannersList.length)
              }`
            ],
            plannerName: item.materialList[0].productDetail.operating.showName,
            labels: this.labels,
          }
          fuWuList.push(obj)
        })
        this.servicelist = fuWuList
      }
    },
    // 跳转判断
    openIM(url) {
      if (url) {
        window.location.href = url
      } else {
        const guiHuaShi = this.planner
        this.$root.$emit(
          'openIMM',
          guiHuaShi.id,
          guiHuaShi.name || '',
          guiHuaShi.jobNum || '',
          guiHuaShi.imgSrc || ''
        )
      }
    },
    // 规划师处理
    plannerHandleData(data) {
      // 规划师列表
      if (data.length !== 0) {
        const guiHuaShiList = []
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
            imgSrc: item.userHeadUrl,
          }
          guiHuaShiList.push(obj)
        })
        this.plannersList = guiHuaShiList
        // 转站规划师
        this.planner = this.plannersList[0]
      } else {
        return this.planner
      }
    },
  },
  head() {
    return {
      title: '代理记账',
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
.agency {
  width: @spread-page-width;
  background: #ffffff;
  margin: 0 auto;
  ::v-deep.my-sp-bottom-bar {
    z-index: 1;
  }
  ::v-deep.my-head {
    width: @spread-page-width;
    position: fixed;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
  }

  .back_icon {
    margin-left: 40px;
  }
}
</style>
