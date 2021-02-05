<template>
  <div class="bankService">
    <!-- 头部导航 -->
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

    <!-- banner图 -->
    <Banner :imglist="imgList" />
    <!-- 表单 -->
    <From />
    <!-- 服务列表 -->
    <Service :service-list="serviceList" :service-title="serviceTitle">
    </Service>
    <!-- 为什么选择薯片平台 -->
    <Choose />
    <!-- 咨询规划师  -->
    <Planner
      :planners-data="plannersList"
      :planners-common="plannersTitle"
      :page-title="title"
      md-type="new"
    />
    <!-- 您可能还需要办理 -->
    <Need />
    <!-- 底部导航 -->

    <Bottom :planner="planner" md-type="new" :md="fixedMd" />
    <!-- im对话框 -->
    <dgg-im-company></dgg-im-company>
    <!-- 提交成功弹出提示框 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/common/head/header'
import Banner from '@/components/spread/bankService/BannerSwipe'
import From from '@/components/spread/bankService/Form'
import Service from '@/components/spread/common/ServiceIntroduced'
import Choose from '@/components/spread/bankService/Choose'
import Planner from '@/components/spread/common/PlannerSwipe'
import Need from '@/components/spread/bankService/MayNeed'
import Bottom from '@/components/spread/common/FixedBottom'
import dggImCompany from '@/components/spread/DggImCompany'
import { spread2Api } from '@/api/spread'
import dataResult from '@/assets/spread/bankService.js'
export default {
  components: {
    Header,
    Banner,
    From,
    Service,
    Choose,
    Planner,
    Need,
    Bottom,
    dggImCompany,
  },
  async asyncData({ $axios }) {
    const result = dataResult
    const type = 'extendBankServer'
    const location = 'ad113205'
    try {
      const res = await $axios.get(spread2Api.list, {
        params: { pageCode: type, locations: location },
      })
      if (res.code === 200) {
        console.log(res)
        return {
          result: res,
        }
      } else {
        return {
          result,
        }
      }
    } catch (error) {
      console.log('error', error)
      return { result }
    }
  },
  data() {
    return {
      title: '银行服务',
      serviceTitle: '银行服务介绍',
      // banner图列表
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3g7zzv8ntk80000.jpg',
        },
        {
          code: 2,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1o0vmlzd6ef4000.jpg',
        },
      ],
      // 服务列表
      serviceList: [
        {
          title: '基本开户',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '1402',
          defaultSales: '992',
          actualSales: '992',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'col',
          rowLabels: {
            title: '注意事项',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
            content: [
              '要求法人到场面核，需要全体股东身份证原件',
              '合作银行不同，所需资料及流程不同',
            ],
          },
        },
        {
          title: '一般户开户',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '632',
          defaultSales: '421',
          actualSales: '416',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'col',
          rowLabels: {
            title: '所需资料',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
            content: ['营业执照正副本原件，三章', '法人、经办人身份证原件'],
          },
        },
        {
          title: '银行销户',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '152',
          defaultSales: '108',
          actualSales: '108',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'col',
          rowLabels: {
            title: '所需资料',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
            content: [
              '由法人代表及直接出具销户报告',
              '各种未使用的重要空白票据及结算凭证',
            ],
          },
        },
      ],
      // 服务列表标签
      lables: [
        {
          title: '注意事项',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
          content: [
            '要求法人到场面核，需要全体股东身份证原件',
            '合作银行不同，所需资料及流程不同',
          ],
        },
        {
          title: '所需资料',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
          content: ['营业执照正副本原件，三章', '法人、经办人身份证原件'],
        },
        {
          title: '所需资料',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
          content: [
            '由法人代表及直接出具销户报告',
            '各种未使用的重要空白票据及结算凭证',
          ],
        },
      ],
      // 规划师title
      plannersTitle: {
        title: '咨询规划师',
        imName: '银行服务咨询规划师_在线咨询',
        telName: '银行服务咨询规划师_拨打电话',
      },
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
      // 底部规划师
      planner: {
        id: '7862495547640840192',
        name: '李劲',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      fixedMd: {
        telMd: {
          name: '银行服务_钻石展位_拔打电话',
          type: '售前',
        },
        imMd: {
          name: '银行服务_钻石展位_在线咨询',
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
    this.planner = this.plannersList[0]
    this.plannerHandleData(this.result.data.planlerList || [])
  },
  mounted() {
    // 设置嵌入app时头部title
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '银行服务' }, () => {})
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
    // 跳转判断
    openIM(url) {
      if (url) {
        window.location.href = url
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
    // 处理服务列表数据
    productDetail(data) {
      const vm = this
      this.plannerHandleData(this.result.data.planlerList || [])
      if (data.length === 0) {
      } else {
        const serviceList = []
        data.forEach((item, index) => {
          const obj = {
            id: item.materialList[0].productId,
            title: item.materialList[0].productDetail.name,
            titleLabel:
              'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
            titleContent:
              item.materialList[0].productDetail.operating.productDescribe,
            actualViews:
              item.materialList[0].productDetail.operating.actualViews,
            defaultSales:
              item.materialList[0].productDetail.operating.defaultSales,
            actualSales:
              item.materialList[0].productDetail.operating.actualSales,
            price: item.materialList[0].productDetail.referencePrice,
            detailsUrl: item.materialList[0].materialLink,
            // bgImg: item.materialList[0].materialUrl,
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
            planner: this.plannersList[
              `${
                index < this.plannersList.length
                  ? index
                  : Math.floor(Math.random() * this.plannersList.length)
              }`
            ],
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
          serviceList.push(obj)
        })
        this.serviceList = serviceList
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
            type: '金牌规划师',
            avatarImg: item.userHeadUrl,
            imgSrc: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 11,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.loginName,
          }
          guiHuaShiList.push(obj)
        })
        this.plannersList = guiHuaShiList
        this.planner = this.plannersList[0]
      } else {
        return this.plannersList
      }
    },
  },
  head() {
    return {
      title: '银行服务',
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
.bankService {
  width: @spread-page-width;
  position: relative;
  background: #ffffff;
  margin: 0 auto;
  ::v-deep.my-head {
    width: @spread-page-width;
    position: fixed;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
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
  ::v-deep.my-sp-bottom-bar {
    z-index: 2;
  }
  .back_icon {
    margin-left: 40px;
  }
  // // 隐藏服务列表第三个热销标签
  // ::v-deep.serviceList {
  //   > div:nth-child(4) {
  //     .serviceList-content-head {
  //       .serviceList-content-head-title {
  //         > img {
  //           display: none;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
