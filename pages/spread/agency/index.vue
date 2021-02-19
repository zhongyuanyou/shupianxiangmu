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
import { spread2Api } from '@/api/spread'
import dataResult from '@/assets/spread/agency.js'
import { recPlaner } from '@/api/spread/'
import getUserSign from '~/utils/fingerprint'
import { getPositonCity } from '@/utils/position'
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
      const res = await $axios.get(spread2Api.list, {
        params: { pageCode: type, locations: 'ad113205' },
      })
      // console.log(`Spread.Api 代理记账: ${res.code} - ${res.message}`)
      if (res.code === 200) {
        return {
          result: res,
        }
      } else if (res.code === 500) {
        return { result: resultData }
      }
    } catch (error) {
      // 请求出错也要保证页面正常显示
      return { result: resultData }
    }
  },
  data() {
    return {
      classCode: '',
      plannerData: [],
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
          planner: [],
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
          planner: [],
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
  created() {},
  mounted() {
    // 设置嵌入app时头部title
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '代理记账' }, () => {})
    }
    this.getPlanner('app-cpxqye-02') // 获取钻展规划师
    this.getPlanner('app-ghsdgye-01') // 获取规划师列表
    this.nums = this.result.data.nums
    this.classCode = this.result.data.adList[0].sortMaterialList[0].materialList[0].productDetail.parentClassCode
  },
  methods: {
    // 获取规划师列表
    async getPlanner(id) {
      // 获取用户唯一标识
      const deviceId = await getUserSign()
      this.cityData = await getPositonCity()
      const parentClassName = this.classCode.split(',')[1]
      this.$axios
        .get(recPlaner, {
          params: {
            limit: 10,
            page: 1,
            area: this.cityData.code === 200 ? this.cityData.code : '120100', // 区域编码
            deviceId, // 设备ID
            level_2_ID: parentClassName, // 二级产品分类   推广页广告位数据下的产品详情的parentClassCode "parentClassCode": "FL20201224136014,FL20201224136034,FL20201224136037",// "parentClassName": "工商/工商注册/有限公司注册",
            // login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型 必须
            sceneId: id, // 场景ID
            // user_id: this.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            // productId: this.proDetail.id, // 产品id 非必填
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.plannerData = res.data.records
            if (id === 'app-cpxqye-02') {
              this.plannerHandleData(this.plannerData, id)
            } else if (id === 'app-ghsdgye-01') {
              this.plannerHandleData(this.plannerData, id)
              this.productDetail(this.result.data.adList[0].sortMaterialList)
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

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
      if (data.length === 0) {
      } else {
        console.log(data)
        const servicelist = []
        data.forEach((item, index) => {
          const index1 =
            index < this.plannersList.length
              ? index
              : Math.floor(Math.random() * this.plannersList.length)
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
            detailsUrl: item.materialList[0].materialLink,
            bgimage: item.materialList[0].materialUrl,
            planner: this.plannersList[index1],
          }
          const serviceLabel = []
          item.materialList[0].productDetail.tags.forEach((item) => {
            if (item.tagType === 'PRO_SERVICE_TAG') {
              serviceLabel.push(item.tagName)
            } else if (item.tagType === 'PRO_SALES_TAG') {
              obj.salesTag = item.tagName
            }
          })
          obj.label = serviceLabel
          servicelist.push(obj)
        })
        this.servicelist = servicelist
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
    plannerHandleData(data, id) {
      // 规划师列表
      if (data.length !== 0) {
        const guiHuaShiList = []
        data.forEach((item) => {
          const obj = {
            id: item.userCenterId,
            avatarImg: item.portrait,
            name: item.userName,
            shuPianFen: item.point,
            serverNum: item.serveNum,
            telephone: item.phone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.userCenterNo,
            imgSrc: item.portrait,
            im: {
              id: item.userCenterId,
              name: item.userName,
              num: item.userCenterNo,
            },
          }
          guiHuaShiList.push(obj)
        })
        this.plannersList = guiHuaShiList
        if (id === 'app-cpxqye-02') {
          this.planner = this.plannersList[
            Math.floor(Math.random() * this.plannersList.length)
          ]
        }
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
