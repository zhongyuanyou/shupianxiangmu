<template>
  <div class="system">
    <!-- S 头部分 -->
    <Header v-show="!isInApp" :title="TopTitle">
      <template #left>
        <div @click="onClickLeft">
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- E 头部分 -->

    <!-- S banner轮播 -->
    <BannerSwipe :banner-images="bannerImages" />
    <!-- E banner轮播 -->

    <!-- S 表单 -->
    <Card :card-title="'体系认证 费用测算'" />
    <!-- E 表单 -->

    <!-- S 列表 -->
    <ServiceIntroduced
      class="system-list"
      :service-list="serviceList"
      :service-title="serviceTitle"
      :page-title="'体系认证'"
    />
    <!-- E 列表 -->

    <!-- S 侧边导航 -->
    <SidebarNavbar />
    <!-- E 侧边导航 -->

    <!-- S 立即咨询 -->
    <ConsultPhone :title="'有疑问？千万企服专家为您免费解答'" />
    <!-- E 立即咨询 -->

    <!-- S 认证好处 -->
    <Benefit />
    <!-- E 认证好处 -->

    <!-- S咨询规划师 -->
    <div class="refer">
      <PlannerSwipe
        :planners-data="plannerSwipe"
        :planners-common="plannersCommon"
        md-type="new"
      ></PlannerSwipe>
    </div>
    <!-- E咨询规划师 -->

    <!-- S其他服务 -->
    <div class="service">
      <h5>您可能还需要其他服务</h5>
      <div class="serice-item">
        <a
          v-for="(item, index) of sericeImg"
          :key="index"
          v-md-map
          v-md:webClick
          data-type="精选专利"
          :data-name="item.name"
          @click="onService(item.url)"
        >
          <div class="serice-cotent">
            <p>{{ item.title[0] }}</p>
            <p class="serice-cotent_title">{{ item.title[1] }}</p>
          </div>
          <sp-image :src="item.img"></sp-image>
        </a>
      </div>
    </div>
    <!-- E其他服务 -->

    <!-- S免费咨询 -->
    <ConsultTel
      :title="'有疑问？千万企服规划师为您免费解答'"
      :tel="'028-954310'"
      button="免费咨询"
      md-type="售前"
      md-name="体系认证_还有疑问_立即咨询"
    />
    <Chips />
    <!-- S免费咨询 -->

    <!-- S底部咨询 -->
    <FixedBottom :planner="planner" :md="fixedMd" md-type="new" />
    <!-- E底部咨询 -->
    <DggImCompany />
  </div>
</template>
<script>
import { Image } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { spread2Api, recPlaner } from '@/api/spread'
import { dataResult } from '@/assets/spread/system2.js'

import Header from '@/components/common/head/header'
import BannerSwipe from '@/components/spread/system/BannerSwiper'
import Card from '@/components/spread/system/Card'
import ServiceIntroduced from '@/components/spread/common/ServiceIntroduced.vue'
import SidebarNavbar from '@/components/spread/system/SidebarNavbar'
import ConsultPhone from '@/components/spread/system/ConsultPhone'
import Benefit from '@/components/spread/system/Benefit'
import PlannerSwipe from '@/components/spread/common/PlannerSwipe'
import ConsultTel from '@/components/spread/common/ConsultTel'
import Chips from '@/components/spread/common/SPDescription'
import FixedBottom from '@/components/spread/common/FixedBottom'
import DggImCompany from '@/components/spread/DggImCompany'

export default {
  name: 'Index',
  components: {
    [Image.name]: Image,
    Header,
    BannerSwipe,
    Card,
    ServiceIntroduced,
    SidebarNavbar,
    ConsultPhone,
    Benefit,
    PlannerSwipe,
    ConsultTel,
    Chips,
    FixedBottom,
    DggImCompany,
  },
  async asyncData({ $axios }) {
    const type = 'extendSysAuth'
    const defaultRes = dataResult
    try {
      const res = await $axios.get(spread2Api.list, {
        params: {
          pageCode: type,
          // 待改
          // locations:'ad113212',
          locations: 'ad113205',
        },
      })
      if (res.code === 200) {
        console.log(res.message)
        return {
          resultData: res.data,
        }
      }
      console.log('请求失败')
      return {
        resultData: defaultRes,
      }
    } catch (error) {
      console.log(error)
      return { resultData: defaultRes }
    }
  },
  data() {
    return {
      TopTitle: '体系认证',
      bannerImages: [
        {
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/8bf1vma8vqk0000.png',
        },
        {
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/262wx64wap28000.png',
        },
      ],
      // 规划师
      plannerSwipe: [
        {
          id: '7862495547640840192',
          avatarImg:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          name: '张毅',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
      ],
      // 规划师埋点
      plannersCommon: {
        title: '咨询规划师',
        imName: '工商注册_咨询规划师_在线咨询',
        telName: '工商注册_咨询规划师_电话',
      },
      // 底部规划师埋点
      fixedMd: {
        telMd: {
          name: '体系认证_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '体系认证_钻石展位_在线咨询',
          type: '售前',
        },
      },
      // 服务列表
      serviceList: [
        {
          title: '基本开户',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '402',
          defaultSales: '192',
          actualSales: '193',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2x7bai1rkvy0000.png',
          label: ['免费核验', '3天拿证', '一对一服务'], // 标签
          salesTag: '特价优惠', // 活动标签
          activityTag: '热门商品', // 右上角标签
          detailsUrl: '', // 详情页链接
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
        },
      ],
      serviceTitle: '服务介绍',
      // 服务列表标签
      labels: [
        ['公司成立3月以上', '有营业执照'],
        ['有效资质证明', '临时场所清单'],
        ['法律地位证明', '管理体系成文信息'],
        ['完成一次内部审核', '前置体系运行3个月'],
        ['组织机构代码证', '接受准则清单'],
        ['组织介绍人员情况', '管理体系成文信息'],
      ],
      // 服务列表标签样式+背景图
      labelStyle: {
        icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
        style: 'row',
        title: '服务介绍',
      },
      // 底部规划师
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      // 其他服务
      sericeImg: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2a9jjyy6esis000.png',
          // img: '',
          name: '体系认证_还需要办理_许可证办理',
          url: '/spread/licence',
          title: ['许可证办理', '快速通道办理'],
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/91z7vr0iihc0000.png',
          name: '体系认证_还需要办理_工商注销',
          url: '/spread/businessCancellation',
          title: ['工商注销', '免进黑名单'],
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2a9jjyy6esis000.png',
          name: '体系认证_还需要办理_工商变更',
          url: '/spread/businessChange',
          title: ['工商变更', '避免高额罚款'],
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/cn7slg6km080000.png',
          name: '体系认证_还需要办理_互联网资质',
          url: '/spread/internetQualification',
          title: ['互联网资质', '互联网企业必备'],
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/g8uiqh64iu80000.png',
          name: '体系认证_还需要办理_代理记账',
          url: '/spread/agency',
          title: ['代理记账', '灵活制定节税方案'],
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ece46ht1ha80000.png',
          name: '体系认证_还需要办理_银行服务',
          url: '/spread/bankService',
          title: ['银行服务', '银行业务一站解决'],
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
    }),
  },
  mounted() {
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '体系认证' }, () => {})
      console.log('dsdad')
    }
    // 处理后台数据
    try {
      if (JSON.stringify(this.resultData) !== '{}') {
        this.serverList(this.resultData || [])
        // this.plannerData(this.resultData.planlerList || [])
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    onClickLeft() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((_res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },

    // 封装请求规划师
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
              level_2_ID: getObj.level_2_ID, // 二级产品分类   推广页广告位数据下的产品详情的parentClassCode "parentClassCode": "FL20201224136014,FL20201224136034,FL20201224136037",// "parentClassName": "工商/工商注册/有限公司注册",
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

    // 处理后台列表数据
    serverList(data) {
      const listAll = data.adList[0].sortMaterialList || []
      if (listAll.length !== 0) {
        const levelId =
          listAll[0].materialList[0].productDetail.parentClassCode.split(',')[1]
        // 根据id查询钻展规划师
        const plannerObj = {
          limit: 3,
          level_2_ID: levelId,
          sceneId: 'app-cpxqye-02',
          productId: data.adList[0].locationId,
        }
        this.plannerData(plannerObj)

        // 根据id请求列表轮播规划师并绑定列表
        const getObj = { level_2_ID: levelId }
        this.getPlanner(getObj).then((plannersRes) => {
          this.serviceList = listAll.map((eleme, index) => {
            // 随机下标
            const subscript = `${
              index < this.labels.length
                ? index
                : Math.floor(Math.random() * this.labels.length)
            }`
            const valueObj = eleme.materialList[0].productDetail
            const obj = {
              title: valueObj.operating.showName,
              titleContent: valueObj.operating.slogan,
              actualViews: valueObj.operating.actualViews,
              defaultSales: valueObj.operating.defaultSales,
              actualSales: valueObj.operating.actualSales,
              price: valueObj.referencePrice,
              bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2x7bai1rkvy0000.png',
              label: ['免费核验', '3天拿证', '一对一服务'], // 服务标签
              salesTag: '特价优惠', // 销售标签
              activityTag: '热门商品', // 右上角标签
              detailsUrl: '', // 详情页链接
              planner: {
                id: '66475',
                name: '钟霞',
                jobNum: '38798340',
                telephone: '13730634929',
                imgSrc:
                  'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
              },
            }
            // 判断标签类型
            if (valueObj.tags.length !== 0) {
              valueObj.tags.filter((elem) => {
                if (elem.tagType === 'PRO_SERVICE_TAG') {
                  // 服务标签
                  obj.label.push(elem.tagName)
                }
                if (elem.tagType === 'PRO_ACTIVITY_TAG') {
                  // 右上角标签
                  obj.activityTag = elem.tagName
                }
                if (elem.tagType === 'PRO_SALES_TAG') {
                  // 销售标签
                  obj.salesTag = elem.tagName
                }
              })
            }
            // 列表对应规划师
            if (data.planlerList.length > 0) {
              const subPlanner =
                plannersRes[
                  `${
                    index < data.planlerList.length
                      ? index
                      : Math.floor(Math.random() * data.planlerList.length)
                  }`
                ]
              obj.planner.id = subPlanner.userCentreId
              obj.planner.name = subPlanner.userName
              obj.planner.jobNum = subPlanner.userCenterNo
              obj.planner.telephone = subPlanner.phone
              obj.planner.imgSrc = subPlanner.portrait
            }
            return obj
          })

          // 规划师轮播列表
          if (plannersRes !== 0) {
            this.plannerSwipe = plannersRes.map((item) => {
              return {
                id: item.userCenterId,
                name: item.userName,
                jobNum: item.userCenterNo,
                telephone: item.phone,
                avatarImg: item.portrait,

                shuPianFen: item.point,
                serverNum: item.serveNum,
                labels: ['工商注册', '财税咨询', '税务筹划'],
              }
            })
          }
        })
      }
    },
    // 处理后台规划师数据
    async plannerData(data) {
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
    },
    // 其他服务的跳转判断
    onService(url) {
      if (url !== '') {
        this.$router.push({
          path: `${url}`,
        })
      } else {
        this.$root.$emit(
          'openIMM',
          this.planner.id,
          this.planner.name,
          this.planner.jobNum,
          this.planner.imgSrc
        )
      }
    },
  },
  head() {
    return {
      title: '体系认证',
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
.system {
  width: @spread-page-width;
  margin: 0 auto;
  position: relative;
  font-family: PingFang SC;
  background-color: #ffffff;
  ::v-deep .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
  // 列表
  // ::v-deep.system-list {
  //   .serviceList-content {
  //     background: url(https://cdn.shupian.cn/sp-pt/wap/1pyws4fkw79c000.png)
  //       no-repeat;
  //     background-size: 101%;
  //     background-position-x: -1px;
  //   }
  //   .show-more-btn {
  //     border: none;
  //     margin: 0 auto;
  //     padding: 0px;
  //     height: 26px;
  //     margin-top: 20px;
  //     line-height: 26px;
  //   }
  // }
  // 其他服务
  .service {
    padding-top: 22px;
    margin: 0 auto;
    h5 {
      font-size: 40px;
      margin-bottom: 32px;
      margin-left: 40px;
      height: 40px;
      line-height: 40px;
    }
    .serice-item {
      margin: 0 auto;
      width: 670px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      a {
        position: relative;
        width: 207px;
        height: 187px !important;
        background: #ffffff;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
        ::v-deep.sp-image {
          width: 208px;
          height: 188px;
        }
        .serice-cotent {
          position: absolute;
          z-index: 3;
          width: 208px;
          height: 188px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 27px;
          padding: 24px 0 0 24px;
          &_title {
            font-size: 22px;
            font-weight: 400;
            color: #999999;
            line-height: 30px;
            padding-top: 8px;
          }
        }
      }
      a:first-child {
        margin-bottom: 24px;
      }
    }
  }
  // 立即咨询title
  ::v-deep.cousulttel-title {
    text-align: left;
  }
}
</style>
