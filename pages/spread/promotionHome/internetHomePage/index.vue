<template>
  <div class="internet">
    <!-- 头部 -->
    <div class="head">
      <Header
        title="IT互联网"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
      <Nav :roll-nav="rollNav" class="nav"></Nav>
    </div>
    <!-- 金刚区 -->

    <!-- 新人红包 -->
    <GiftBag
      v-show="giftBagList.length"
      class="gift-bag"
      :gift-bag-list="giftBagList"
    ></GiftBag>
    <!-- 活动功能展示 -->
    <Advertising :advertising-list="advertisingList"></Advertising>
    <!-- 产品列表 -->
    <Recommended :title-name="titleName"></Recommended>

    <!-- 规划师 -->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '@/components/spread/common/Nav.vue'
import Header from '@/components/spread/common/NavTop.vue'
import GiftBag from '@/components/spread/promotionHome/internetHomePage/GiftBag.vue'
import Advertising from '@/components/spread/promotionHome/internetHomePage/Advertising.vue'
import Recommended from '~/components/spread/promotionHome/internetHomePage/RecommendedList.vue'
import { plannerApi, newSpreadApi } from '@/api/spread'
import { internetData } from '@/assets/spread/promotionHome/internetHomePage.js'
import BtnPlanner from '@/components/spread/common/BtnPlanner'

export default {
  components: {
    Header,
    Nav,
    GiftBag,
    Advertising,
    Recommended,
    BtnPlanner,
  },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(newSpreadApi.list, {
        params: {
          //  locationCodes:
          //   'ad113267,ad113270,ad113272,ad113271,ad100042,ad113274,ad100045,  ad113229,ad113270,ad113271,ad113272,ad113274,ad113280',
          locationCodes:
            'ad113229,ad113270,ad113272,ad113271,ad100042,ad113274,ad100045',
          navCodes: 'nav100061',
          code: 'CRISPS-HLW',
        },
      })

      if (res.code === 200) {
        console.log('请求成功')
        return {
          result: res,
        }
      }
      console.log('请求失败')
      // return {
      //   result: internetData,
      // }
    } catch (error) {
      console.log('请求错误')
      // 请求出错也要保证页面正常显示
      // return {
      //   result: internetData,
      // }
    }
  },
  data() {
    return {
      placeholder: '请输入关键字',
      // marginTop: -120,
      rollNav: [],
      giftBagList: [{}],
      advertisingList: {
        limitedTime: {
          title: '限时秒杀1',
          describe: '爆款低价1',
          imgUrl: '',
          label: '',
          url: '',
        },
        live: {
          title: '企服直播1',
          describe: '无门槛 新用户专享1',
          product: [],
        },
        freeTrial: {
          title: '免费试用1',
          describe: '0元体验 名额有限1',
          product: [],
        },
        course: {
          title: '薯片课程1',
          describe: '优质课程 创业首选1',
          product: [],
        },
      },
      titleName: [
        // {
        //   code: 'FL20210425163778',
        //   type: 'FL20210425163778',
        //   name: '推荐',
        //   describe: '猜你喜欢',
        // },
      ],
      // 页面规划师
      pagePlanner: {},
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  created() {
    if (process.client) {
      // 请求
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  mounted() {
    try {
      if (JSON.stringify(this.result) !== '{}') {
        this.navDetail(this.result.data.navs.nav100061)
        this.productClassData(this.result.data.classList || [])
        if (this.result.data.adList.length > 0) {
          this.getData(this.result.data.adList)
        } else {
          // this.getData(internetData.data.adList)
        }
      }
    } catch (error) {
      console.log(error)
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
    // 金刚区数据处
    navDetail(data) {
      if (data.length !== 0) {
        const navList = []
        data.forEach((item, index) => {
          const obj = {
            code: index + 1,
            sort: item.sort,
            name: item.name,
            url: item.url,
            size: 'small',
            label: '',
            imageUrl: item.navigationImageUrl,
          }
          navList.push(obj)
        })
        // this.rollNav = navList.reverse()
        this.rollNav = navList
        this.rollNav.sort((a, b) => {
          return a.sort - b.sort
        })
      }
    },
    // 产品分类
    productClassData(data) {
      if (data.length === 0) return
      // const classArr = []
      data.forEach((item, index) => {
        this.titleName.push({
          type: item.ext1,
          code: item.ext1,
          name: item.name,
          describe: item.ext2 || '优质选购',
        })
      })
      // this.titleName = classArr
    },
    getData(data) {
      data.forEach((item, idx) => {
        // 新人红包数据处理
        if (item.locationCode === 'ad113229') {
          const bagList = []
          item.sortMaterialList.forEach((elem, index) => {
            const msg = elem.materialList[0].materialDescription.split('#')
            const obj = {
              // maxTitle: elem.materialList[0].materialName.split('#')[1],
              code: index + 1,
              headImage: elem.materialList[0].materialUrl,
              // label: msg[0],
              // title: elem.materialList[0].materialName.split('#')[1],
              title: msg[0],
              price: msg[1],
              url: elem.materialList[0].materialLink,
            }
            bagList.push(obj)
          })
          this.giftBagList = bagList
        }
        if (item.locationCode === 'ad113270') {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              title: resObj.materialDescription.split('#')[0] || '',
              describe: resObj.materialDescription.split('#')[1] || '',
              imgUrl: resObj.materialUrl,
              label: resObj.materialName.split('#')[1] || '',
              url: resObj.materialLink,
            }
            this.advertisingList.limitedTime = obj
          })
        }
        if (item.locationCode === (this.isInApp ? 'ad100042' : 'ad113271')) {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              title: resObj.materialDescription.split('#')[0] || '',
              describe: resObj.materialDescription.split('#')[1] || '',
              imgUrl: resObj.materialUrl,
              label: resObj.materialName.split('#')[1] || '',
              url: resObj.materialLink,
            }
            this.advertisingList.live = obj
          })
        }
        if (item.locationCode === 'ad113272') {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              title: resObj.materialDescription.split('#')[0] || '',
              describe: resObj.materialDescription.split('#')[1] || '',
              imgUrl: resObj.materialUrl,
              label: resObj.materialName.split('#')[1] || '',
              url: resObj.materialLink,
            }
            this.advertisingList.freeTrial = obj
          })
        }
        if (item.locationCode === (this.isInApp ? 'ad100045' : 'ad113274')) {
          item.sortMaterialList.forEach((elem, index) => {
            const resObj = elem.materialList[0]
            const obj = {
              code: index,
              title: resObj.materialDescription.split('#')[0] || '',
              describe: resObj.materialDescription.split('#')[1] || '',
              imgUrl: resObj.materialUrl,
              label: resObj.materialName.split('#')[1] || '',
              url: resObj.materialLink,
            }
            this.advertisingList.course = obj
          })
        }
      })
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
              firstTypeCode: 'FL20210425164016', // 一级code
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
      title: '互联网交易',
    }
  },
}
</script>

<style lang="less" scoped>
.internet {
  margin: 0 auto;
  width: 750px;
  background: #f5f5f5;
  .head {
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/8un99iso7e40000.png');
    background-repeat: no-repeat;
    background-size: 100%, 100%;
  }
  .nav {
    // margin-top: -270px;
  }
  .gift-bag {
    margin-top: 20px;
  }
}
</style>
