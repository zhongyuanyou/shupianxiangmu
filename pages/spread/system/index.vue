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
        :planners-data="PlannerSwipe"
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
      :tel="'400-962540'"
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
import { spreadApi } from '@/api/spread'
import { dataResult } from '@/assets/spread/system.js'

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
      const res = await $axios.get(spreadApi.list, {
        params: {
          pageCode: type,
        },
      })
      if (res.code === 200) {
        return {
          resultData: res.data,
        }
      }
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
      PlannerSwipe: [
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
          titleLabel: null,
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '1402',
          defaultSales: '992',
          actualSales: '992',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2x7bai1rkvy0000.png',
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
            text: ['公司成立3月以上', '有营业执照'],
          },
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
    // const param = {
    //   platform_type: 'wap端', // 平台类型：App，H5，Web
    //   app_name: '薯片wap端', // 应用名称
    //   product_line: 'wap端体系认证推广页',
    //   current_url: location.href,
    //   referrer: document.referrer,
    // }
    // window.sensors.registerPage(param) // 设置公共属性
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '体系认证' }, () => {})
      console.log('dsdad')
    }
    // 处理后台数据
    try {
      if (JSON.stringify(this.resultData) !== '{}') {
        this.serverList(this.resultData || [])
        this.plannerData(this.resultData.planlerList || [])
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
    // 处理后台列表数据
    serverList(data) {
      const listAll = data.adList[0].sortMaterialList || []
      if (listAll.length !== 0) {
        this.serviceList = listAll.map((eleme, index) => {
          // 随机下标
          const subscript = `${
            index < this.labels.length
              ? index
              : Math.floor(Math.random() * this.labels.length)
          }`
          const titleList = eleme.materialList[0].productDetail
          const obj = {
            title: titleList.operating.showName,
            titleContent: titleList.operating.slogan,
            actualViews: titleList.operating.actualViews,
            defaultSales: titleList.operating.defaultSales,
            actualSales: titleList.operating.actualSales,
            price: titleList.referencePrice,
            // bgImg: '',
            labelsType: 'row',
            rowLabels: {
              icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
              text: this.labels[subscript],
            },
            planner: {
              id: '66475',
              name: '钟霞',
              jobNum: '38798340',
              telephone: '13730634929',
              imgSrc:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            },
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
            obj.planner.id = subPlanner.userCentreId
            obj.planner.name = subPlanner.realName
            obj.planner.jobNum = subPlanner.loginName
            obj.planner.telephone = subPlanner.userPhone
            obj.planner.imgSrc = subPlanner.userHeadUrl
          }
          return obj
        })
      }
    },
    // 处理后台规划师数据
    plannerData(data) {
      if (data.length !== 0) {
        this.planner = data[0] && {
          id: data[0].userCentreId,
          name: data[0].realName,
          jobNum: data[0].loginName,
          telephone: data[0].userPhone,
          imgSrc: data[0].userHeadUrl,
        }
        // 规划师轮播列表
        this.PlannerSwipe = data.map((item) => {
          return {
            id: item.userCentreId,
            avatarImg: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 22,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.loginName,
          }
        })
      }
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
