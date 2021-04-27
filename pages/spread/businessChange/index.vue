<template>
  <div class="businesschange">
    <!-- s 头部分 -->
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
    <!-- e 头部分 -->
    <!-- s banner轮播 -->
    <BannerSwipe :imglist="imgList" />
    <!-- e banner轮播 -->
    <!-- s form表单 -->
    <Form />
    <!-- e form表单 -->
    <!-- s 公司不变更，风险有多大 -->
    <Risk />
    <!-- e 公司不变更，风险有多大 -->
    <!-- s 变更服务介绍 -->
    <ServiceIntroduced :servicelist="servicelist" />
    <!-- e 变更服务介绍 -->
    <!-- s 服务流程 -->
    <ServiceProcess />
    <!-- e 服务流程 -->
    <!-- s 规划师 -->
    <Planners :planners-data="plannersList" :planners-common="plannersTitle" />
    <!-- e 规划师 -->
    <!-- s 可能需要办理 -->
    <Need />
    <!-- e 可能需要办理 -->
    <!-- s 底部导航 -->
    <Bottom :planner="planner" :md="fixedMd" />
    <!-- e 底部导航 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/common/head/header'
import BannerSwipe from '@/components/spread/businessChange/BannerSwipe'
import Form from '@/components/spread/businessChange/Form'
import Risk from '@/components/spread/businessChange/Risk'
import ServiceIntroduced from '@/components/spread/businessChange/ServiceIntroduced'
import ServiceProcess from '@/components/spread/businessChange/ServiceProcess'
import Planners from '@/components/spread/common/PlannerSwipe'
import Need from '@/components/spread/businessChange/Need'
import Bottom from '@/components/spread/common/FixedBottom'
import dggImCompany from '@/components/spread/DggImCompany'
import { spread2Api } from '@/api/spread'
import dataResult from '@/assets/spread/businessChange.js'
import { recPlaner } from '@/api/spread/'
import getUserSign from '~/utils/fingerprint'
import { getPositonCity } from '@/utils/position'
export default {
  components: {
    Header,
    BannerSwipe,
    Form,
    Risk,
    ServiceIntroduced,
    ServiceProcess,
    Planners,
    Need,
    Bottom,
    dggImCompany,
  },
  async asyncData({ $axios }) {
    const result = dataResult
    const type = 'extendBussineChange'
    const location = 'ad113205'
    try {
      const res = await $axios.get(spread2Api.list, {
        params: { pageCode: type, locations: location },
      })
      // console.log(`Spread.Api 工商变更 : ${res.code} - ${res.message}`)
      if (res.code === 200) {
        return {
          result: res,
        }
      } else {
        return { result }
      }
    } catch (error) {
      console.log('error', error)
      // 请求出错也要保证页面正常显示
      return { result }
    }
  },
  data() {
    return {
      classCode: '',
      title: '工商变更',
      plannersTitle: {
        title: '咨询规划师',
        imName: '工商变更咨询规划师_在线咨询',
        telName: '工商变更咨询规划师_拨打电话',
      },
      planner: {
        id: '7862495547640840192',
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
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2mnnuo078ew0000.jpg',
        },
        {
          code: 2,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/eqvnfyw0u6o0000.jpg',
        },
      ],
      serviceBG: [
        'https://cdn.shupian.cn/sp-pt/wap/images/5uwyafh2j1g0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/althqxxyow00000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/6bd02flvql80000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/a7m299uz5bc0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/ep6v5p1eork0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/9818rtvq5c80000.png',
      ],
      // 服务列表
      servicelist: [
        {
          id: '',
          actualViews: '18万',
          defaultSales: '17万',
          actualSales: '17万',
          price: '488',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/5uwyafh2j1g0000.png',
          planner: {},
          plannerName: '',
        },
        {
          id: '',
          actualViews: '15万',
          defaultSales: '14万',
          actualSales: '14万',
          price: '488',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/althqxxyow00000.png',
          planner: {},
        },
        {
          id: '',
          actualViews: '2万',
          defaultSales: '2万',
          actualSales: '2万',
          price: '600',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/6bd02flvql80000.png',
          planner: {},
        },
        {
          id: '',
          actualViews: '1万',
          defaultSales: '1万',
          actualSales: '1万',
          price: '600',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/a7m299uz5bc0000.png',
          planner: {},
        },
        {
          id: '',
          actualViews: '7万',
          defaultSales: '6万',
          actualSales: '6万',
          price: '600',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/ep6v5p1eork0000.png',
          planner: {},
        },
        {
          id: '',
          actualViews: '6万',
          defaultSales: '6万',
          actualSales: '6万',
          price: '600',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/9818rtvq5c80000.png',
          planner: {},
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
          name: '工商变更_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '工商变更_钻石展位_在线咨询',
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
    this.nums = this.result.data.nums
  },
  mounted() {
    // 设置app中导航title
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '工商变更' }, () => {})
    }
    this.getPlanner('app-cpxqye-02') // 获取钻展规划师
    this.getPlanner('app-ghsdgye-01') // 获取规划师列表
    this.classCode = this.result.data.adList[0].sortMaterialList[0].materialList[0].productDetail.parentClassCode // 获取分类code码
  },
  methods: {
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
    productDetail(data) {
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
            productLabels: this.labels,
            price: item.materialList[0].productDetail.referencePrice,
            detailsUrl: item.materialList[0].materialLink,
            // bgimage: item.materialList[0].materialUrl,
            bgimage:
              'https://cdn.shupian.cn/sp-pt/wap/images/er1q9gbfbjs0000.jpg',
            planner: this.plannersList[
              `${
                index < this.plannersList.length
                  ? index
                  : Math.floor(Math.random() * this.plannersList.length)
              }`
            ],
            plannerName: item.materialList[0].productDetail.operating.showName,
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
          fuWuList.push(obj)
        })
        this.servicelist = fuWuList
      }
    },

    // 跳转判断
    openIM(url) {
      if (url) {
        this.$router.push(url)
        // window.location.href = url
      } else {
        const planner = this.planner
        this.$root.$emit(
          'openIMM',
          planner.id,
          planner.name || '',
          planner.jobNum || '',
          planner.imgSrc || ''
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
      title: '工商变更',
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
.businesschange {
  background: #ffffff;
  width: @spread-page-width;
  margin: 0 auto;
  ::v-deep.my-sp-bottom-bar {
    z-index: 2;
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
  ::v-deep.sp-popup--round {
    width: 750px;
    left: 50%;
    margin-left: -375px;
  }
  ::v-deep.sp-overlay {
    width: 750px;
    left: 50%;
    margin-left: -375px;
  }
}
</style>
