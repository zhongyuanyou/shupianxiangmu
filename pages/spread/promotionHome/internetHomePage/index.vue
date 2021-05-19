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

    <!-- 新人红包 --><template>
      <div class="recommended">
        <sp-tabs
          v-model="active"
          sticky
          title-active-color="#222222"
          :swipe-threshold="titleName.length - 1"
          title-inactive-color="#555555"
          :offset-top="offsetTop"
          :background="isFixed === true ? fixedColor : bgColor"
          @scroll="scroll"
          @click="onClick()"
        >
          <sp-tab v-for="(item, itemKey) of titleName" :key="itemKey">
            <template #title>
              <div class="title">
                <span>{{ item.name }}</span>
                <span :class="active === itemKey ? 'span--active' : ''">{{
                  item.describe
                }}</span>
              </div>
            </template>
            <!-- 二级分类 -->
            <!-- <div class="secondary-label">
          <ul>
            <li v-for="(item, index) in secondaryLabel" :key="index">
              {{ item }}
            </li>
          </ul>
        </div> -->
            <sp-list
              v-model="loading"
              :finished="finished"
              :error.sync="error"
              finished-text="没有更多了"
              error-text=""
              @load="onLoad"
            >
              <div class="product-box">
                <div v-if="oddList.length > 0" class="product-odd">
                  <product
                    v-for="(proItem, proKey) of oddList"
                    :key="proKey"
                    class="product-item"
                    :product="proItem"
                  />
                </div>
                <div class="product-event">
                  <!-- 待改跳转 -->
                  <div
                    v-show="active === 0"
                    class="hot-product"
                    @click="jumpLink('https://www.baidu.com/')"
                  >
                    <img
                      src="https://cdn.shupian.cn/sp-pt/wap/images/5a270klvc280000.png"
                      alt=""
                    />
                  </div>
                  <product
                    v-for="(proItem, proKey) of eventList"
                    :key="proKey"
                    class="product-item"
                    :product="proItem"
                  />
                </div>
              </div>
            </sp-list>
          </sp-tab>
        </sp-tabs>
      </div>
    </template>

    <script>
      import { mapState } from 'vuex'
      import { Tab, Tabs, List } from '@chipspc/vant-dgg'
      // import Waterfall from 'vue-waterfall2'
      import product from '@/components/spread/promotionHome/internetHomePage/Product'
      import { newSpreadApi } from '@/api/spread'
      export default {
        name: 'Recommended',
        components: {
          [Tab.name]: Tab,
          [Tabs.name]: Tabs,
          [List.name]: List,
          product,
          // Waterfall,
        },
        props: {
          product: {
            type: Array,
            default: () => {
              return [
                {
                  title: '推荐',
                  describe: '猜你喜欢',
                  list: [
                    {
                      code: 1,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/5swgfx9bv0w0000.png',
                      title: '商品名称商品名称…',
                      score: '',
                      saleTage: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                    {
                      code: 2,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                      title: '商品名称商品名称',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                    {
                      code: 3,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/oj7zb1uxhi8000.png',
                      title: '商品名称商品名',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                    {
                      code: 4,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                      title: '商品名称商品名',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                    {
                      code: 5,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                      title: '商品名称商品',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                  ],
                },
                {
                  title: '电商运营',
                  describe: '品质保障',
                  list: [
                    {
                      code: 4,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                      title: '商品名称商品名',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                    {
                      code: 5,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                      title: '商品名称商品',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                  ],
                },
                {
                  title: '营销推广',
                  describe: '品质保障',
                  list: [
                    {
                      code: 1,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/5swgfx9bv0w0000.png',
                      title: '商品名称商品名称…',
                      score: '5.0',
                      saleTage: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                    {
                      code: 2,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                      title: '商品名称商品名称',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                  ],
                },
                {
                  title: '小程序建设',
                  describe: '品质保障',
                  list: [
                    {
                      code: 2,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                      title: '商品名称商品名称',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                    {
                      code: 3,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/oj7zb1uxhi8000.png',
                      title: '商品名称商品名',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                    {
                      code: 4,
                      imageUrl:
                        'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                      title: '商品名称商品名',
                      score: '',
                      activeTag: '',
                      sales: '1200',
                      labels: ['套餐优惠', '热销好评', '金牌团队'],
                      price: '688',
                    },
                  ],
                },
              ]
            },
          },
          titleName: {
            type: Array,
            default: () => {
              return [
                {
                  code: 1,
                  type: 1,
                  name: '推荐',
                  describe: '猜你喜欢',
                },
                {
                  code: 'FL20210425163778',
                  type: 'FL20210425163778',
                  name: '电商运营',
                  describe: '品质保障',
                },
                {
                  code: 3,
                  type: 1,
                  name: '营销推广',
                  describe: '品质保障',
                },
                {
                  code: 4,
                  type: 1,
                  name: '小程序建设',
                  describe: '品质保障',
                },
              ]
            },
          },
        },
        data() {
          return {
            active: 0,
            offsetTop: 0,
            isFixed: false,
            fixedColor: '#ffffff',
            bgColor: '#f5f5f5',
            // secondaryLabel: ['全部', '免费维护', '极速交付', '多方案维护'],
            loading: false,
            finished: false,
            list: [],
            oddList: [],
            eventList: [],
            error: false,
            max: 2,
          }
        },
        computed: {
          ...mapState({
            isInApp: (state) => state.app.isInApp,
            appInfo: (state) => state.app.appInfo, // app信息
          }),
        },
        watch: {
          isFixed(newval, oldval) {
            this.isFixed = newval
          },
        },
        mounted() {
          if (this.isInApp) {
            this.offsetTop = this.appInfo.statusBarHeight + 57 + 'px'
          } else {
            this.offsetTop = 57 + 'px'
          }
        },
        methods: {
          scroll(e) {
            this.isFixed = e.isFixed
          },
          onClick() {
            this.initialize()
          },
          initialize(changeObj) {
            this.pageNumber = 1
            this.finished = false
            this.loading = true
            this.onLoad()
          },
          onLoad() {
            // // 异步更新数据
            if (this.pageNumber === 1) {
              this.oddList = []
              this.eventList = []
            }
            this.selectTab()
          },
          jumpLink(url) {
            this.$parent.jumpLink(url)
          },
          // 请求数据
          selectTab(item) {
            // 当前无数据不执行
            if (this.finished && !this.loading) return
            this.loading = true
            const type = this.titleName[this.active].type
            const obj = {
              start: this.pageNumber,
              limit: '4',
              classCodes: type,
              naem: this.titleName[this.active].name,
            }
            // 2、调用接口
            this.$axios
              .get(newSpreadApi.service_product_list, {
                params: {
                  start: this.pageNumber,
                  limit: '14',
                  classCodes: type,
                },
              })
              .then((res) => {
                // 调用回调函数处理数据
                const result = res.data.records
                if (res.code === 200 && result.length !== 0) {
                  if (res.data.pageNumber === 1) {
                    this.list = []
                  }
                  ++this.pageNumber
                  result.forEach((elem, index) => {
                    const obj = {
                      code: index + 1,
                      imageUrl:
                        elem.img ||
                        'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png',
                      title: elem.title,
                      labels: elem.tabs || ['套餐优惠', '热销好品', '金牌团队'],
                      price: elem.price,
                      sales: elem.saleNum || 0,
                      activeTag: '', // 活动标签
                      url: '',
                      // desc: elem.desc, // 说明
                      id: elem.id,
                    }
                    if (index % 2 === 0) {
                      this.oddList.push(obj)
                    } else {
                      this.eventList.push(obj)
                    }
                  })
                  this.loading = false
                  if (result.length < 13) this.finished = true

                  return
                }
                this.loading = false
                this.finished = true
              })
              .catch((err) => {
                this.loading = false
                this.finished = true
                this.error = true
                console.log(err)
              })
          },
        },
      }
    </script>

    <style lang="less" scoped>
      .recommended {
        width: 100%;
        margin-top: 27px;
        ::v-deep.sp-tabs__nav {
          margin: 0 auto;
        }

        ::v-deep.sp-tabs__nav--line {
          padding-left: 20px;
        }
        ::v-deep.sp-tab {
          padding: 0 32px;
          .sp-tab__text {
            font-size: 32px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
          }
        }

        ::v-deep.sp-tabs__line {
          width: 60px;
          height: 12px;
          background-color: transparent;
          background-image: linear-gradient(to right, #4974f5, transparent);
          top: 32px;
          display: none;
        }
        ::v-deep.sp-tab--active {
          // line-height: 32px;
          .sp-tab__text {
            // font-size: 32px;
            font-weight: bold;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #222222;
          }
        }
        .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          > span:last-child {
            // height: 22px;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 22px;
            margin-top: 10px;
          }
          > .span--active {
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 32px !important;
            background: #4974f5;
            border-radius: 16px;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff !important;
            line-height: 33px;
          }
        }

        .secondary-label {
          > ul {
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 11px;
            > li {
              width: 164px;
              height: 56px;
              background: #ffffff;
              border-radius: 8px;
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: #555555;
              text-align: center;
              line-height: 56px;
            }
          }
        }
        .product-box {
          margin-top: 32px;
          width: 100%;
          display: flex;
          min-height: 1000px;
          .product-box {
            width: 50%;
            padding-left: 20px;
          }
          .product-odd {
            padding-left: 20px;
          }
          .product-event {
            padding-left: 20px;
          }
          .hot-product {
            width: 345px;
            height: 518px;
            background: #ffffff;
            border-radius: 24px;
            img {
              width: 345px;
              height: 518px;
            }
          }
        }
        ::v-deep.sp-tab--active {
          // line-height: 32px;
          .sp-tab__text {
            // font-size: 32px;
            font-weight: bold;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #222222;
          }
        }
      }
    </style>

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
import Recommended from '@/components/spread/promotionHome/internetHomePage/Recommended.vue'
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
          code: 'CRISPS-C-QYFW',
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
        {
          code: 'FL20210425163778',
          type: 'FL20210425163778',
          name: '推荐',
          describe: '猜你喜欢',
        },
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
    console.log(this.result, 456)
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
      if (data.length === 0) {
      } else {
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
        this.rollNav = navList.reverse()
        // this.rollNav.sort((a, b) => {
        //   return a.sort - b.sort
        // })
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
          describe: '优质选购',
        })
      })
      // this.titleName = classArr
      console.log(this.titleName, 78979)
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
          console.log(item.sortMaterialList, 123456)
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
