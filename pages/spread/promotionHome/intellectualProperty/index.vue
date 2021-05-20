<template>
  <div class="intellectual-property">
    <!-- S 头部和金刚区 -->
    <div class="top-background">
      <NavTop
        title="知识产权"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
      <Nav
        :roll-nav="rollNav"
        class="navs"
        :style="{ 'margin-top': marginTop + 'px' }"
      />
    </div>
    <!-- E 头部和金刚区 -->

    <!-- S 新人专属 -->
    <Exclusive
      v-if="proTitle.length > 0"
      :pro-title="proTitle"
      :img-content="imgContent"
    />
    <!-- E 新人专属 -->

    <!--S 免费体验 薯片课程 -->
    <Choiceness :content="content" />
    <!--E 免费体验 薯片课程-->

    <!-- S 列表 -->
    <IntellectualList :title-name="titleName" />
    <!-- <TabServiceItem :title-name="titleName" @change="onChange">
      <template v-slot:list>
        <KnowledgeList ref="intellectual" :default-list="defaultList" />
      </template>
    </TabServiceItem> -->
    <!-- E 列表 -->

    <!-- START 规划师-->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" :md="fixedMd" />
    <!-- END 规划师-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defaultRes } from '@/assets/spread/promotionHome/intellectualProprty.js'
import { plannerApi, newSpreadApi } from '@/api/spread'

import NavTop from '@/components/spread/common/NavTop'
import Nav from '@/components/spread/common/Nav'
import Exclusive from '@/components/spread/promotionHome/intellectualProperty/Exclusive.vue'
import Choiceness from '@/components/spread/promotionHome/intellectualProperty/Choiceness.vue'
import IntellectualList from '@/components/spread/promotionHome/intellectualProperty/IntellectualList'
// import TabServiceItem from '@/components/spread/promotionHome/intellectualProperty/TabServiceItem'
// import KnowledgeList from '@/components/spread/promotionHome/intellectualProperty/KnowledgeList.vue'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
export default {
  name: 'IntellectualProperty',
  components: {
    NavTop,
    Nav,
    Exclusive,
    Choiceness,
    IntellectualList,
    // TabServiceItem,
    // KnowledgeList,
    BtnPlanner,
  },
  async asyncData({ $axios }) {
    // const locations = 'ad113279,ad113277,ad113265,ad113236,ad113235,ad113224'
    const locationCodes = 'ad113236,ad113279,ad113265,ad113277,ad100046'
    const navCodes = 'nav100060'
    const code = 'CRISPS-C-ZSCQ'
    const dataRes = defaultRes
    try {
      const res = await $axios.get(newSpreadApi.list, {
        params: {
          locationCodes,
          navCodes,
          code,
        },
      })
      if (res.code === 200) {
        console.log('请求成功')
        return {
          resultData: res.data,
        }
      }
      console.log('请求失败')
      return {
        // resultData: dataRes.data,
      }
    } catch (error) {
      console.log('请求错误')
      return {
        // resultData: dataRes.data,
      }
    }
  },
  data() {
    return {
      placeholder: '请输入关键字',
      marginTop: 0,
      // 金刚区
      rollNav: [
        {
          code: 1,
          name: '商标注册',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/5cr9u33ml600000.png',
        },
        {
          code: 2,
          name: '专利申请',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/11ilq5lopx0w000.png',
        },
        {
          code: 3,
          name: '模板建站',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/dwy0w0z6k1c0000.png',
        },
        {
          code: 4,
          name: '国际商标注册',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/ersf9xyup880000.png',
        },
        {
          code: 5,
          name: '商标维权',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/4n2bre5pb760000.png',
        },
        {
          code: 6,
          name: '商标变更',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/d17z33159zk0000.png',
        },
        {
          code: 7,
          name: '版权设计',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/eva77z0w6xs0000.png',
        },
        {
          code: 8,
          name: '高企认定',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/etof55jpw6o0000.png',
        },
        {
          code: 9,
          name: '项目审报',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/e76lj960syo0000.png',
        },
        {
          code: 10,
          name: '全部服务',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/fhngcdfde0o0000.png',
        },
      ],
      // 新人专属
      proTitle: [
        {
          title: '[企业必备] 商标注...',
          price: 488,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/19k5aeu2fsdc000.png',
          url: '',
        },
        {
          title: '[企业必备] 商标注...',
          price: 199,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/np4823u4b1c000.png',
          url: '',
        },
      ],
      // 广告说明
      imgContent: [
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/84tta2vzooc0000.png',
          title: '先服务后收费',
          assistantTitle: '',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/co9djdht52g0000.png',
          title: '千万补贴',
          assistantTitle: '精选好服务',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/2cxu5ow9hmhw000.png',
          title: '政府补贴',
          assistantTitle: '政策解析',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/e0b8ph3n46o0000.png',
          title: '快速通道',
          assistantTitle: '加急办理',
        },
      ],
      // 体验 课程
      content: {
        experience: {
          imgVal: [
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/images/efrhylhffbs0000.png',
              title: '免费体验',
              imgNmae: '商标查询',
              label: '限时免费',
              url: '',
            },
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/images/8jn8qjulfvs0000.png',
              title: '',
              imgNmae: '版权服务',
              label: '限时免费',
              url: '',
            },
          ],
        },
        curriculum: {
          imgVal: [
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/images/efrhylhffbs0000.png',
              title: '薯片课程',
              imgNmae: '商标案件如...',
              label: '包办包过',
              url: '',
            },
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/images/8jn8qjulfvs0000.png',
              title: '',
              imgNmae: '高企认定政...',
              label: '包办包过',
              url: '',
            },
          ],
        },
      },
      // 列表导航
      titleName: [
        {
          code: 1,
          type: 'FL20210425163778',
          name: '热门服务',
        },
      ],
      // 当前列表状态
      changeState: {
        code: 'FL20201224136019',
        name: '许可证',
        type: 0,
      },
      // 默认的推介列表列表
      defaultList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '15645',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 699,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '商标查询',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '商标注册',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4234scxtivw0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
      ],
      // 页面规划师
      pagePlanner: {},
      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '知识产权聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    // 初始化数据
    // this.onChange({ type: 1 })
    // 处理后台数据
    const resData = this.resultData
    try {
      if (JSON.stringify(resData) !== '{}') {
        this.navList(resData.navs.nav100060 || [])
        this.productClassData(resData.classList || [])
        resData.adList.filter((elem) => {
          if (elem.locationCode === 'ad113236') {
            this.proTitleData(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113279') {
            this.imgContentData(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113265') {
            this.experience(elem.sortMaterialList)
          }
          if (elem.locationCode === (this.isInApp ? 'ad100046' : 'ad113277')) {
            this.curriculum(elem.sortMaterialList)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  created() {
    if (process.client) {
      // 请求
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  methods: {
    // 搜索
    clickInputHandle(e) {
      console.log(this.$router)
      if (this.isInApp) {
        const iOSRouter = {
          path: 'CPSCustomer:CPSCustomer/CPSBaseWebViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/search/page',
          },
        }
        const androidRouter = {
          path: '/common/android/SingleWeb',
          parameter: {
            routerPath: 'cpsc/search/page',
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouter)
        const androidRouterStr = JSON.stringify(androidRouter)
        this.$appFn.dggJumpRoute(
          {
            iOSRouter: iOSRouterStr,
            androidRouter: androidRouterStr,
          },
          (res) => {
            console.log(res)
          }
        )
        return
      }
      window.location.href = 'https://m.shupian.cn/search/'
    },
    // 请求数据
    onChange(changeObj) {
      this.$refs.intellectual.initialize(changeObj)
    },
    // 金刚区导航栏
    navList(data) {
      data.sort((a, b) => {
        return a.sort - b.sort
      })
      if (data.length !== 0) {
        this.rollNav = data.map((elem, index) => {
          return {
            sort: elem.sort,
            code: index,
            name: elem.name,
            url: elem.url,
            size: 'small',
            label: '',
            imageUrl: elem.navigationImageUrl,
          }
        })
        // this.rollNav.reverse()
        this.rollNav.sort((a, b) => {
          return a.sort - b.sort
        })
      }
    },
    // 新人专属
    proTitleData(data) {
      if (data.length !== 0) {
        this.proTitle = data.map((elem, index) => {
          const data = elem.materialList[0]
          return {
            title: data.materialName.split('#')[1] || '',
            price: parseInt(data.materialDescription.split('#')[0]),
            label: data.materialDescription.split('#')[1],
            count: data.materialDescription.split('#')[2],
            img: data.materialUrl,
            url: data.materialLink,
          }
        })
      }
    },
    // 广告说明
    imgContentData(data) {
      if (data.length !== 0) {
        this.imgContent = data.map((elem, index) => {
          const data = elem.materialList[0]
          return {
            bgImg: data.materialUrl,
            title: data.materialName.split('#')[1] || '',
            assistantTitle: data.materialDescription,
            url: data.materialLink,
          }
        })
      }
    },
    // 体验 课程
    experience(data) {
      if (data.length !== 0) {
        this.content.experience.imgVal = data.map((elem, index) => {
          const data = elem.materialList[0]
          return {
            img: data.materialUrl,
            title: data.materialName.split('#')[1],
            imgNmae: data.materialDescription.split('#')[0],
            label: data.materialDescription.split('#')[1],
            url: data.materialLink || '',
          }
        })
      }
    },
    curriculum(data) {
      if (data.length !== 0) {
        this.content.curriculum.imgVal = data.map((elem, index) => {
          const data = elem.materialList[0]
          return {
            img: data.materialUrl,
            title: data.materialName.split('#')[1],
            imgNmae: data.materialDescription.split('#')[0],
            label: data.materialDescription.split('#')[1],
            url: data.materialLink || '',
          }
        })
        console.log(this.content, 4561)
      }
    },

    // 列表导航
    productClassData(data) {
      console.log(1344, data)
      if (data.length === 0) return
      // const classArr = []
      data.forEach((item, index) => {
        this.titleName.push({
          type: item.ext1,
          code: item.ext1,
          name: item.name,
        })
      })
      // this.titleName = classArr
    },
    // 推介规划师
    async getPagePlanner(scene) {
      const device = await this.$getFinger().then((res) => {
        return res
      })
      let areaCode = '510100' // 站点code
      // 站点code
      if (this.isInApp) {
        this.$appFn.dggCityCode((res) => {
          areaCode = res.data.adCode
        })
      } else {
        areaCode = this.currentCity.code
      }
      try {
        this.$axios
          .post(
            plannerApi.plannerReferrals,
            {
              login_name: '',
              deviceId: device, // 设备标识
              area: areaCode || '510100', // 站点code
              user_id: '',
              productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
              sceneId: scene, // 场景id
              level_2_ID: '', // 二级code
              platform: 'app',
              productId: '', //
              thirdTypeCodes: '', // 三级code
              firstTypeCode: 'FL20210425163708', // 一级code
            },
            {
              headers: {
                sysCode: 'cloud-recomd-api',
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            console.log(res, '调用规划师')
            if (res.code === 200 && res.data.length > 0) {
              this.pagePlanner = {
                id: res.data[0].mchUserId,
                name: res.data[0].userName,
                type: res.data[0].type,
                jobNum: res.data[0].userCenterNo,
                telephone: res.data[0].phone,
                imgSrc: res.data[0].imgaes,
              }
            }
          })
      } catch (error) {
        console.log('plannerApi.plannerReferrals error：', error.message)
      }
    },
    jumpLink(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
          return
        }
      }
      this.$refs.plannerIM.onlineConsult()
    },
  },
  head() {
    return {
      title: '知识产权',
    }
  },
}
</script>

<style lang="less">
.intellectual-property {
  width: @spread-page-width;
  background: #f5f5f5;
  margin: 0 auto;
  .top-background {
    // background: linear-gradient(0deg, #f5f5f5, #4974f5);
    background: url(https://cdn.shupian.cn/sp-pt/wap/images/apakh2k9z3c0000.png)
      no-repeat;
    background-size: cover;
    margin-bottom: 20px;
  }
  .navs {
    position: relative;
  }
}
</style>
