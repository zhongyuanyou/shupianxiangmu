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

    <!-- S 表单 -->
    <div class="precontract">
      <Card />
    </div>
    <!-- E 表单 -->

    <!-- S 列表 -->
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
            ></my-icon>
          </span>
        </a>
      </p>
    </div>
    <!-- E 列表 -->

    <div class="norm">
      <h5>办理标准</h5>
      <Standard />
    </div>
    <!-- S立即咨询 -->
    <div class="help">
      <ConsultTel
        :title="'有疑问？千万企服规划师为您免费解答'"
        :tel="'028-954310'"
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
        :planners-data="plannerSwipe"
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
          <div class="serice-cotent">
            <p>{{ item.title[0] }}</p>
            <p class="serice-cotent_title">{{ item.title[1] }}</p>
            <p class="serice-cotent_title">{{ item.title[2] }}</p>
          </div>
          <sp-image :src="item.img"
        /></a>
      </div>
    </div>
    <!-- E其他服务 -->
    <!-- S立即咨询 -->
    <div class="help">
      <ConsultTel
        :title="'有疑问？千万企服规划师为您免费解答'"
        :tel="'028-954310'"
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
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import Dialog from '@/components/spread/common/Dialog'

// import { foundApi } from '~/api'
import { spreadApi, spread2Api, recPlaner } from '@/api/spread'
import { dataResult } from '@/assets/spread/companyRegister2'

import Card from '@/components/spread/companyRegister/Card.vue'
import RegisterList from '~/components/spread/companyRegister/RegisterList'
import Standard from '@/components/spread/companyRegister/Standard'
import RegisterReady from '@/components/spread/companyRegister/RegisterReady'
import FixedBottom from '@/components/spread/common/FixedBottom'
import PlannerSwipe from '@/components/spread/common/PlannerSwipe'
import ConsultTel from '@/components/spread/common/ConsultTel'
import SPDescription from '@/components/spread/common/SPDescription'
import DggImCompany from '@/components/spread/DggImCompany'
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
      const res = await $axios.get(spread2Api.list, {
        params: {
          pageCode: type,
          locations: 'ad113205',
        },
      })
      if (res.code === 200) {
        console.log(res.message)
        return {
          resultData: res,
        }
      }
      console.log('请求失败')
      return {
        resultData: defaultRes,
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
          // img: 'https://cdn.shupian.cn/sp-pt/wap/f67zabgy4w00000.png',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ctlpg6iiio00000.png',
          name: '工商注册_你可能还需要其他服务_税务筹划',
          url: '/spread/tax',
          title: ['税务筹划', '各大服务包', '随心选择'],
        },
        {
          // img: 'https://cdn.shupian.cn/sp-pt/wap/7mdee1enz8s0000.png',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/731gw63toz40000.png',
          name: '工商注册_你可能还需要其他服务_代理记账',
          url: '/spread/agency',
          title: ['代理记账', '各大服务包', '随心选择'],
        },
        {
          // img: 'https://cdn.shupian.cn/sp-pt/wap/86kmcgq4i1s0000.png',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ece46ht1ha80000.png',
          name: '工商注册_你可能还需要其他服务_其他服务',
          url: '',
          title: ['其他服务', '一站服务', '省时高效'],
        },
      ],
      // 规划师轮播列表
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
      plannersCommon: {
        title: '咨询规划师',
        imName: '工商注册_咨询规划师_在线咨询',
        telName: '工商注册_咨询规划师_电话',
      },
      // 列表
      listCount: [],
      imgPlanner: [
        // { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/a0761uxgsiw0000.png' },
        // { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/kbpgoqhkn58000.png' },
        // { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/v5qbb7umt7k000.png' },
        // { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2d721lqgmtz4000.png' },
        // { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/9odvjxumogs0000.png' },
        // { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/d8yaj7dckgw0000.png' },
        { bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2x7bai1rkvy0000.png' },
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
      // 城市
      cityData: {
        code: 500,
        data: {},
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
        // this.plannerData(this.resultData.data.planlerList || [])
        // this.plannerData(this.resultData.data.planlerList || [])
      }
    } catch (error) {
      console.log(error)
    }
  },
  destroyed() {
    this.$appFn.dggHideNav((res) => {})
  },
  methods: {
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

    // listCout列表和规划师轮播数据处理
    ListCount(data) {
      const listAll = data.adList[0].sortMaterialList || []
      const title = [
        '有限责任公司',
        '个体注册',
        '分公司注册',
        '外资企业注册',
        '合作企业注册',
        '股份公司注册',
      ]
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
          // 列表数据
          const listCount = listAll.map((elem, index) => {
            const valueObj = elem.materialList[0].productDetail
            const obj = {
              pric: valueObj.referencePrice,
              bgImg:
                this.imgPlanner[
                  index < this.imgPlanner.length
                    ? index
                    : Math.floor(Math.random() * this.imgPlanner.length)
                ].bgImg,
              // title: title[index],
              title: valueObj.productDescription,
              url: elem.materialList[0].materialLink,
              serviceTag: [], // 服务标签
              activityTag: '', // 右上角标签
              salesTag: '', // 销售标签
              operating: {
                actualViews: valueObj.operating.actualViews || 6439,
                defaultSales: valueObj.operating.defaultSales || 4932,
                actualSales: valueObj.operating.actualSales || 4930,
              },
              id: '7862495547640840192',
              name: '李劲',
              jobNum: '107547',
              telephone: '18402858698',
              imgSrc:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            }
            // 判断标签类型
            if (valueObj.tags.length !== 0) {
              valueObj.tags.filter((elem) => {
                if (elem.tagType === 'PRO_SERVICE_TAG') {
                  // 服务标签
                  obj.serviceTag.push(elem.tagName)
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
            if (plannersRes.length > 0) {
              const subPlanner =
                plannersRes[
                  `${
                    index < data.planlerList.length
                      ? index
                      : Math.floor(Math.random() * data.planlerList.length)
                  }`
                ]
              obj.id = subPlanner.userCenterId
              obj.name = subPlanner.userName
              obj.jobNum = subPlanner.userCenterNo
              obj.telephone = subPlanner.phone
              obj.imgSrc = subPlanner.portrait
            }

            //   obj.id = subPlanner.userCentreId
            //   obj.name = subPlanner.realName
            //   obj.jobNum = subPlanner.loginName
            //   obj.telephone = subPlanner.userPhone
            //   obj.imgSrc = subPlanner.userHeadUrl

            return obj
          })
          this.listCount = listCount

          // 规划师轮播列表
          if (plannersRes.length > 0) {
            const plannerSwipe = plannersRes.map((item) => {
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
            this.plannerSwipe = plannerSwipe
          }
        })
      }
    },
    // 规划师数据
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
      // if (data.length !== 0) {
      //   this.planner = data[0] && {
      //     id: data[0].userCentreId,
      //     name: data[0].realName,
      //     jobNum: data[0].loginName,
      //     telephone: data[0].userPhone,
      //     imgSrc: data[0].userHeadUrl,
      //   }
      // // 规划师轮播列表
      // const plannerSwipe = data.map((item) => {
      //   const obj = {
      //     id: item.userCentreId,
      //     avatarImg: item.userHeadUrl,
      //     name: item.realName,
      //     shuPianFen: 11,
      //     serverNum: 250,
      //     telephone: item.userPhone,
      //     labels: ['工商注册', '财税咨询', '税务筹划'],
      //     jobNum: item.loginName,
      //   }
      //   plannerSwipe.push(obj)
      // })
      // this.plannerSwipe = plannerSwipe
      // }
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
      line-height: 26px;
      position: relative;
      margin-top: -6px;
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
            line-height: 22px;
            padding-top: 16px;
          }
          &_title:last-child {
            padding-top: 8px;
          }
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
