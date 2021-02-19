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

import { spread2Api, recPlaner } from '~/api/spread'

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
          // 待改
          // locations: 'ad113211',
          locations: 'ad113205',
        },
      })
      // 待改
      if (res.code === 300) {
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
      // 底部规划师备用数据
      planner: {},
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
      // this.plannerHandle(this.resultData)
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

    // 请求规划师
    async getPlanner(getObj) {
      this.cityData = await this.$getPositonCity()
      console.log('this.cityData', this.cityData)
      // 获取用户唯一标识
      const deviceId = await this.$getFinger()
      // deviceId = '0022ef1a-f685-469a-93a8-5409892207a2'
      console.log('deviceId', deviceId)
      return new Promise((resolve, reject) => {
        this.$axios
          .get(recPlaner, {
            params: {
              limit: getObj.limit || 10,
              page: 1,
              area:
                this.cityData.code === 200 ? this.cityData.data.code : '510000', // 区域编码
              deviceId, // 设备ID
              level_2_ID: getObj.level_2_ID || '', // 二级产品分类   推广页广告位数据下的产品详情的parentClassCode "parentClassCode": "FL20201224136014,FL20201224136034,FL20201224136037",// "parentClassName": "工商/工商注册/有限公司注册",
              // login_name: null, // 规划师ID(选填)
              productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型 必须 产品类型	（交易：FL20201116000003，服务：FL20201116000002）写死
              sceneId: getObj.sceneId || 'app-ghsdgye-01', // 场景ID
              // user_id: this.$cookies.get('userId'), // 用户ID(选填)
              platform: 'app', // 平台（app,m,pc）
              // productId: this.proDetail.id, // 产品id 非必填pp"
              // "productId":"607991482841724751"
              productId: getObj.productId || '',
            },
          })
          .then((res) => {
            if (res.code === 200) {
              resolve(res.data.records)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },

    // 业务介绍数据处理
    serviceList(data) {
      const listAll = data.adList[0].sortMaterialList
      if (listAll.length === 0) return

      // 待改
      const levelId = listAll[0].materialList[0].productDetail.parentClassCode.split(
        ','
      )[1]
      // 根据id查询钻展规划师
      const plannerObj = {
        limit: 3,
        level_2_ID: levelId,
        sceneId: 'app-cpxqye-02',
        productId: data.adList[0].locationId,
      }
      this.plannerHandle(plannerObj)
      // -------

      // 根据id请求列表轮播规划师并绑定列表  // 待改
      const getObj = { level_2_ID: levelId }
      this.getPlanner(getObj).then((plannersRes) => {
        console.log(plannersRes)
        const dataList = listAll.map((item, index) => {
          // 获取随机下标，当lables长度不够时
          const subscript = `${
            index < this.lables.length
              ? index
              : Math.floor(Math.random() * this.lables.length)
          }`
          const list = item.materialList[0].productDetail
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
              { content: '在线咨询', num: list.operating.actualViews || 6439 },
              { content: '累计成交', num: list.operating.defaultSales || 4932 },
              { content: '成功案例', num: list.operating.actualSales || 4930 },
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
            // 待改
            const subPlanner =
              plannersRes[
                `${
                  index < plannersRes.length
                    ? index
                    : Math.floor(Math.random() * data.planlerList.length)
                }`
              ]
            serviceObj.planner.id = subPlanner.userCenterId
            serviceObj.planner.name = subPlanner.userName
            serviceObj.planner.jobNum = subPlanner.userCenterNo
            serviceObj.planner.telephone = subPlanner.phone
            serviceObj.planner.imgSrc = subPlanner.portrait
            console.log(serviceObj.planner)
          } else {
            return false
          }
          return serviceObj
        })
        const hasFalse = dataList.indexOf(false)
        if (hasFalse === -1) {
          this.serviceListData = dataList
        }

        // 待改
        // 规划师轮播列表
        if (plannersRes.length > 0) {
          const plannersList = plannersRes.map((item) => {
            return {
              id: item.userCenterId,
              name: item.userName,
              jobNum: item.userCenterNo,
              telephone: item.phone,
              avatarImg: item.portrait,

              shuPianFen: item.point,
              serverNum: item.serveNum,
              labels: ['工商注册', '财税咨询', '税务筹划'],
              type: '金牌规划师',
            }
          })
          this.plannersData = plannersList
        }
      })
      // ------
    },
    // 规划师数据处理
    async plannerHandle(data) {
      await this.getPlanner(data).then((res) => {
        if (res.length > 0) {
          this.planner = res[0] && {
            id: res[0].userCenterId,
            name: res[0].userName,
            jobNum: res[0].userCenterNo,
            telephone: res[0].phone,
            imgSrc: res[0].portrait,
          }
        }
      })
      // if (data.planlerList.length > 0) {
      // const plannersList = data.planlerList.map((item) => {
      //   const obj = {
      //     id: item.userCentreId,
      //     name: item.realName,
      //     jobNum: item.loginName,
      //     telephone: item.userPhone,
      //     avatarImg: item.userHeadUrl,
      //     shuPianFen: 11,
      //     serverNum: 250,
      //     labels: ['工商注册', '财税咨询', '税务筹划'],
      //     type: '金牌规划师',
      //   }
      //   return obj
      // })
      // this.plannersData = plannersList
      // this.planner = plannersList[0]
      // }
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
