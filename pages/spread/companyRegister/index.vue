<template>
  <div class="company-registry">
    <sp-top-nav-bar
      v-show="!isInApp"
      title="公司注册"
      fixed
      :placeholder="true"
      background="#FFFFFF"
      title-color="#1A1A1A"
      ellipsis
      @on-click-left="onClickLeft"
    >
      <div slot="left" class="nav-back">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </sp-top-nav-bar>
    <div class="banner-img">
      <sp-swipe :autoplay="3000" :show-indicators="false">
        <sp-swipe-item v-for="(image, index) in bannerImages" :key="index">
          <nuxt-link :to="{ name: image.url }">
            <sp-image :src="image.img" fit="cover"
          /></nuxt-link>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <div class="precontract">
      <Card />
    </div>
    <div class="introduction">
      <h5>服务介绍</h5>
      <RegisterList :list-count="listCount" :is-more="isMore" />
      <p v-show="listCount.length > 3" class="more">
        <a href="javascript:;">
          <span
            v-md-map
            v-md:webClick
            data-name="工商注册_服务介绍_展开更多"
            @click="onMore"
            >更多服务
            <my-icon
              :name="isMore ? 'tab_ic_all_s' : 'tab_ic_all_n'"
              size="13px"
              color="#555555"
            ></my-icon></span
        ></a>
      </p>
    </div>
    <div class="norm">
      <h5>办理标准</h5>
      <Standard />
    </div>
    <!-- S立即咨询 -->
    <div class="help">
      <ConsultTel
        :title="'有疑问？千万企服规划师为您免费解答'"
        :tel="'4000-962540'"
        button="免费咨询"
        md-type="售前"
        md-name="工商注册_还有疑问_立即咨询"
      />
    </div>
    <!-- E立即咨询 -->
    <!-- S注册公司准备工作-平台优势 -->
    <RegisterReady />
    <!-- E注册公司准备工作-平台优势 -->
    <!-- S咨询规划师 -->
    <div class="refer">
      <PlannerSwipe
        :planners-data="guiHuaShiList"
        :planners-common="plannersCommon"
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
          :data-name="`${item.name}`"
          @click="onService(item.url, index)"
        >
          <sp-image :src="item.img"
        /></a>
      </div>
    </div>
    <!-- E其他服务 -->
    <!-- S立即咨询 -->
    <div class="help">
      <ConsultTel
        :title="'有疑问？千万企服规划师为您免费解答'"
        :tel="'4000-962540'"
        button="免费咨询"
        md-type="售前"
        md-name="工商注册_还有疑问_立即咨询"
      />
      <SPDescription />
    </div>
    <!-- E立即咨询 -->
    <div class="foot">
      <FixedBottom :planner="planner" :md="fixedMd" />
    </div>
    <DggImCompany />
    <Dialog />
  </div>
</template>
<script>
import {
  TopNavBar,
  NavSearch,
  Icon,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
  Sticky,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import Dialog from '@/components/spread/common/Dialog'

// import { foundApi } from '~/api'
import { dataResult } from '@/assets/spread/companyRegister'
import Card from '@/components/spread/companyRegister/Card.vue'
import RegisterList from '~/components/spread/companyRegister/RegisterList'
import Standard from '@/components/spread/companyRegister/Standard'
import RegisterReady from '@/components/spread/companyRegister/RegisterReady'
import FixedBottom from '@/components/spread/common/FixedBottom'
import PlannerSwipe from '@/components/spread/common/PlannerSwipe'
import ConsultTel from '@/components/spread/common/ConsultTel'
import SPDescription from '@/components/spread/common/SPDescription'
import DggImCompany from '@/components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'
export default {
  name: 'Index',
  components: {
    Dialog,
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Image.name]: Image,
    RegisterReady,
    Card,
    RegisterList,
    Standard,
    ConsultTel,
    SPDescription,
    PlannerSwipe,
    DggImCompany,
    FixedBottom,
  },
  async asyncData({ $axios }) {
    const type = 'extendBussineReg'
    const defaultRes = dataResult
    try {
      const res = await $axios.get(spreadApi.list, {
        params: {
          pageCode: type,
        },
      })
      if (res.code === 200) {
        return {
          resultData: res,
        }
      } else {
        return {
          resultData: defaultRes,
        }
      }
    } catch (error) {
      console.log('error', error)
      return { resultData: defaultRes }
    }
  },
  data() {
    return {
      isMore: false,
      bannerImages: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/92ccqbb36mg0000.jpg',
        },
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/fzcndei5exs0000.jpg',
        },
      ],
      // 其他服务
      sericeImg: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/f67zabgy4w00000.png',
          name: '工商注册_你可能还需要其他服务_税务筹划',
          url: '/spread/tax',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/7mdee1enz8s0000.png',
          name: '工商注册_你可能还需要其他服务_代理记账',
          url: '/spread/agency',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/86kmcgq4i1s0000.png',
          name: '工商注册_你可能还需要其他服务_其他服务',
          url: '',
        },
      ],
      // 规划师轮播列表
      guiHuaShiList: [
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
      plannersCommon: {
        title: '咨询规划师',
        imName: '工商注册_咨询规划师_在线咨询',
        telName: '工商注册_咨询规划师_电话',
      },
      // 列表
      listCount: [
        {
          pric: 4000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/a0761uxgsiw0000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
        {
          pric: 5000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/kbpgoqhkn58000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
        {
          pric: 7000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/v5qbb7umt7k000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
        {
          pric: 7000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2d721lqgmtz4000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
      ],
      imgPlanner: [
        { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/a0761uxgsiw0000.png' },
        { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/kbpgoqhkn58000.png' },
        { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/v5qbb7umt7k000.png' },
        { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2d721lqgmtz4000.png' },
        { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/9odvjxumogs0000.png' },
        { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/d8yaj7dckgw0000.png' },
      ],
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      // 底部规划师埋点
      fixedMd: {
        telMd: {
          name: '工商注册_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '工商注册_钻石展位_在线咨询',
          type: '售前',
        },
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      // appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    // const param = {
    //   platform_type: 'wap端', // 平台类型：App，H5，Web
    //   app_name: '薯片wap端', // 应用名称
    //   product_line: 'wap端工商注册推广页',
    //   current_url: location.href,
    //   referrer: document.referrer,
    // }
    // window.sensors.registerPage(param) // 设置公共属性
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '工商注册' }, () => {})
      console.log('dsdad')
    }
    // 请求调用后台方法
    try {
      if (JSON.stringify(this.resultData.data) !== '{}') {
        this.ListCount(this.resultData.data || [])
        this.plannerData(this.resultData.data.planlerList || [])
      }
    } catch (error) {
      console.log(error)
    }
  },
  destroyed() {
    this.$appFn.dggHideNav((res) => {})
  },
  methods: {
    // listCout列表数据处理
    ListCount(data) {
      const listAll = data.adList[0].sortMaterialList || []
      if (listAll.length !== 0) {
        const listCount = []
        listAll.forEach((elem, index) => {
          const valueObj = elem.materialList[0].productDetail
          const obj = {
            pric: valueObj.referencePrice,
            bgImg: this.imgPlanner[
              index < this.imgPlanner.length
                ? index
                : Math.floor(Math.random() * this.imgPlanner.length)
            ].bgImg,
            operating: valueObj.operating,
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
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
            obj.id = subPlanner.userCentreId
            obj.name = subPlanner.realName
            obj.jobNum = subPlanner.loginName
            obj.telephone = subPlanner.userPhone
            obj.imgSrc = subPlanner.userHeadUrl
          }
          listCount.push(obj)
        })
        this.listCount = listCount
      }
    },
    // 规划师数据
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
          }
          guiHuaShiList.push(obj)
        })
        this.guiHuaShiList = guiHuaShiList
      }
    },
    onClickLeft() {
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
    onMore() {
      this.isMore ? (this.isMore = false) : (this.isMore = true)
    },
    onService(url, index) {
      if (url !== '') {
        window.location.href = url
      } else {
        this.$root.$emit(
          'openIMM',
          this.listCount[index].id,
          this.listCount[index].name,
          this.listCount[index].jobNum,
          this.listCount[index].imgSrc
        )
      }
    },
  },

  head() {
    return {
      title: '工商注册-公司注册',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
          ssr: false,
          type: 'text/javascript',
          charset: 'utf-8',
        },
        // {
        //   src: '/js/spread/companyRegister-md-config.js',
        // },
        // {
        //   src: 'https://ptcdn.dgg.cn/md/dgg-md-sdk.min.js',
        // },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.company-registry {
  width: @spread-page-width;
  margin: 0 auto;
  position: relative;
  font-family: PingFang SC;
  background: #ffffff;
  .banner-img {
    ::v-deep .sp-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 392px;
      text-align: center;
      img {
        width: 100%;
        height: 392px;
      }
    }
  }
  .introduction,
  .norm,
  .service {
    padding: 24px 42px 0 38px;
    h5 {
      font-size: 40px;
      margin-bottom: 32px;
      height: 40px;
      line-height: 40px;
    }
  }
  .norm {
    padding: 64px 42px 0 38px;
    h5 {
      margin-bottom: 32px;
    }
  }
  .introduction {
    padding-top: 56px;
    h5 {
      margin-bottom: 32px;
    }
    .more {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: #555555;
      line-height: 44px;
      padding: 12px 0 0 0;
      span {
        color: #555555;
      }
    }
  }
  .service {
    padding-top: 20px;
    margin: 0 auto;
    .serice-item {
      margin: 0 auto;
      width: 670px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      a {
        width: 207px;
        height: 187px !important;
        background: #ffffff;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
        ::v-deep.sp-image {
          width: 208px;
          height: 188px;
        }
      }
    }
  }
  .help {
    ::v-deep.cousulttel-title {
      text-align: left;
    }
  }
  .refer {
    .planner {
      padding-top: 6px;
    }
  }
  // 头部导航
  ::v-deep.sp-top-nav-bar--fixed {
    position: fixed;
    top: 0;
    left: 50%;
    margin-left: -(@spread-page-width / 2);
    width: @spread-page-width;
  }
}
</style>
