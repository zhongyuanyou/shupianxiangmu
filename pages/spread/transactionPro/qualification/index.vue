<template>
  <div class="page-content">
    <!--START 头部Header-->
    <Header
      ref="header"
      :title="pageTitle"
      :fixed="true"
      head-class="head-icon"
    >
      <template v-if="false" v-slot:right>
        <span class="my-customize-header" @click="choiceCity">
          <span class="my-customize-header-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.18rem" color="#232323"></my-icon>
        </span>
      </template>
    </Header>
    <!--END   头部Header-->

    <!--START 导航部-金刚区-->
    <NavBar :data="navBarList" class="nav-margin"></NavBar>
    <!--END   导航部-金刚区-->

    <!--START 轮播Banner-->
    <Banner :data="bannerList" class="banner-margin" />
    <!--END   轮播Banner-->

    <!--START 表单-->
    <!-- <Form :data="formData" class="" /> -->
    <!--END   表单-->

    <!-- <ADList class="ad-margin" /> -->
    <!--START 优质资质-->
    <GoodQualification :data="lification" class="good-qua-margin" />
    <!--END   优质资质-->

    <!--START 推荐公司-->
    <ProductList
      :data="goodListData"
      :good-list="goodList"
      :more="more"
      @swipeChange="swipeChange"
      @getMore="getMore"
    ></ProductList>
    <!--END   推荐公司-->

    <!--START 固定底部-->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" :md="fixedMd" />
    <!--END   固定底部-->

    <!--START IM在线咨询-->
    <!-- <DggImCompany></DggImCompany> -->
    <!--END   IM在线咨询-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defaultRes } from '@/assets/spread/promotionHome/enterpriseService.js'
import { chipSpread, plannerApi, newSpreadApi } from '~/api/spread'

import Header from '@/components/common/head/header'
// import DggImCompany from '@/components/spread/DggImCompany'
import BtnPlanner from '@/components/spread/common/BtnPlanner'

import NavBar from '@/components/spread/transactionPro/common/NavBar.vue'
import Banner from '@/components/spread/transactionPro/common/Banner'
// import Form from '@/components/spread/transactionPro/common/Form'
import ProductList from '@/components/spread/transactionPro/common/ProductList'

import GoodQualification from '@/components/spread/transactionPro/qualification/GoodQualification.vue'
// import ADList from '@/components/spread/transactionPro/common/ADList'

export default {
  name: 'Index',
  components: {
    Header,
    NavBar,
    Banner,
    // Form,
    ProductList,
    // DggImCompany,
    BtnPlanner,
    GoodQualification,
    // ADList,
  },
  async asyncData({ $axios }) {
    const locations = 'ad113292,ad113293,ad113294'
    const navCode = 'nav100074'
    // const centerCode = 'EnterpriseService'
    const dataRes = defaultRes
    try {
      // const res = await $axios.get(`${url}?locationCodes=${locations}`)
      const res = await $axios.get(chipSpread.list, {
        params: {
          locationCodes: locations,
          navCodes: navCode,
          code: 'CRISPS-C-LWZZ',
          // productCenterCode: centerCode,
        },
      })
      if (res.code === 200) {
        console.log('请求成功')
        return {
          resultData: res.data,
        }
      }
      console.log('请求失败')
      // return {
      //   resultData: dataRes.data,
      // }
    } catch (error) {
      console.log('请求错误')
      // return {
      //   resultData: dataRes.data,
      // }
    }
  },
  data() {
    return {
      pageTitle: '劳务资质',
      // @--页面板块数据
      // 导航金刚区数据
      navBarList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/c91zxekp1c00000.png',
          text: '总包资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_总包资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2ukxm1nuc840000.png',
          text: '专包资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_专包资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/cawnujakriw0000.png',
          text: '设计资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_设计资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/26zino9ks1es000.png',
          text: '环卫资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_环卫资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6p39wrpg9fc0000.png',
          text: '协助资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_协助资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4b33uv0jmm80000.png',
          text: '安防资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_安防资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/33gjpjr1jvs0000.png',
          text: '建筑资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_建筑资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2ra3tjqmee40000.png',
          text: '劳务资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_劳务资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/573f3jmt2pw0000.png',
          text: '资质出售',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_资质出售',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2lsvgq2szg4000.png',
          text: '其他资质',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_其他资质',
          },
        },
      ],
      // 轮播图数据
      bannerList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2oqs0r2zfbo000.png',
          url: '',
          md: {
            name: '资质交易聚合页_全类目资质转让',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2ahwvzklivr4000.png',
          url: '',
          md: {
            name: '资质交易聚合页_资质转让就上薯片',
          },
        },
      ],
      // 优质资质
      lification: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3ia3ajzw8xo0000.png',
          imgWidth: 327,
          imgHeight: 145,
          url: '',
          md: {
            name: '资质交易聚合页_建筑工程',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2gxgo9h7eyi0000.png',
          imgWidth: 327,
          imgHeight: 145,
          url: '',
          md: {
            name: '资质交易聚合页_公路工程',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1uqbozuf4u74000.png',
          imgWidth: 213,
          imgHeight: 146,
          url: '',
          md: {
            name: '资质交易聚合页_地基基础',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/xx9gz37ikxc000.png',
          imgWidth: 213,
          imgHeight: 146,
          url: '',
          md: {
            name: '资质交易聚合页_消防设施',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/15rjalmh0ag0000.png',
          imgWidth: 213,
          imgHeight: 146,
          url: '',
          md: {
            name: '资质交易聚合页_公路路面',
          },
        },
      ],
      // 表单数据
      formData: {
        title: '只需5秒 一键进行资质匹配',
        buttonName: '免费查找资质资源',
        subInfo: ['涵盖面广', '便利快捷', '服务优质'],
        md: {
          pageName: '资质交易聚合页',
        },
        type: 'zzzr',
      },
      // 推荐规划师
      pagePlanner: {},

      // @--S 埋点数据
      fixedMd: {
        imMd: {
          name: '资质交易聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
      firstScreen: '',
      // @--S 推荐公司板块
      params: {
        start: 1,
        limit: 10,
        classCode: 0,
        dictCode: 'CONDITION-JY-ZZ',
      },
      // 选项卡、规划师
      goodListData: {
        tabBtnList: [
          { name: '推荐资质', type: 0 },
          { name: '热卖资质', type: 9 },
          { name: '急售', type: 1 },
        ],
        // marks: ['特级', '一级', '二级', '三级'],
        planner: {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
          imgSrc: '',
        },
        md: {
          pageName: '资质交易聚合页',
        },
      },
      // 商品列表
      goodList: [],
      // 商品特性
      slogans: [
        '优质资质',
        '特价资质',
        '新上资质',
        '热卖资质',
        '急售资质',
        '价格透明',
        '交易保障',
        '售后保障',
        '品牌担保',
        '真实有效',
      ],
      // 加载更多loading
      more: {
        loading: false,
        noMore: false,
      },
      // @--E 推荐公司板块
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity.name || '成都',
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    if (process.client) {
      const tabs = []
      this.resultData.classList &&
        this.resultData.classList.forEach((item) => {
          const obj = { name: item.name, type: item.ext1 }
          tabs.push(obj)
        })
      this.goodListData.tabBtnList = tabs
      // 请求
      this.params.classCode = this.goodListData.tabBtnList[0].type
    }
  },
  mounted() {
    // @--神策埋点-浏览事件-只执行一次
    window.spptMd.spptTrackRow('pageview', {
      name: `推广资质交易聚合页浏览`,
      track_code: 'SPTG000002',
    })
    // @--神策埋点-浏览事件-只执行一次
    window.spptMd.spptTrackRow('p_plannerBoothVisit', {
      name: `推荐规划师浏览`,
      track_code: 'SPTG000006',
      recommend_number: '',
      planner_number: this.pagePlanner.jobNum,
      planner_name: this.pagePlanner.name,
    })
    this.getGoodList(this.params)
    // @--判断页面是否在app里打开
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: this.pageTitle }, () => {})
    }
    this.getPagePlanner('app-ghsdgye-02')

    const resData = this.resultData
    try {
      if (JSON.stringify(resData) !== '{}') {
        // 导航
        this.navList(resData.navs.nav100074 || [])
        // this.productTitle(resData.productClassList || [])
        resData.adList.filter((elem) => {
          // 轮播
          if (elem.locationCode === 'ad113292') {
            this.bannerListData(elem.sortMaterialList)
          }
          // 优质资质2
          if (elem.locationCode === 'ad113294') {
            this.lification = []
            const sizeData = {
              imgWidth: 213,
              imgHeight: 146,
            }
            this.lificationData(elem.sortMaterialList, sizeData)
          }
          // 优质资质
          if (elem.locationCode === 'ad113293') {
            const sizeData = {
              imgWidth: 327,
              imgHeight: 145,
            }
            this.lificationData(elem.sortMaterialList, sizeData)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // @--跳转
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    // 金刚区导航栏
    navList(data) {
      if (data.length !== 0) {
        this.navBarList = data.map((elem, index) => {
          return {
            sort: elem.sort,
            img: elem.navigationImageUrl,
            text: elem.name,
            marketingImg: '',
            url: elem.url,
            md: {
              type: '',
              name: `专利交易聚合页_金刚区_${elem.name}`,
            },
          }
        })
        this.navBarList.sort((a, b) => {
          return a.sort - b.sort
        })
      }
    },
    // 轮播
    bannerListData(data) {
      if (data.length !== 0) {
        this.bannerList = data.map((elem, index) => {
          return {
            img: elem.materialList[0].materialUrl,
            url: elem.materialList[0].materialLink,
            name: elem.materialList[0].name,
            md: {
              name: `资质交易聚合页_${elem.materialList[0].name}`,
            },
          }
        })
      }
    },
    lificationData(data, sizeData) {
      if (data.length !== 0) {
        data.map((elem, index) => {
          const obj = {
            img: elem.materialList[0].materialUrl,
            imgWidth: sizeData.imgWidth,
            imgHeight: sizeData.imgHeight,
            url: elem.materialList[0].materialLink,
            name: elem.materialList[0].name,
            md: {
              name: `资质交易聚合页_${elem.materialList[0].name}`,
            },
          }
          this.lification.push(obj)
        })
      }
    },
    // 跳转链接-IM规划师
    jumpLink(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
          return
        }
      }
      this.$refs.plannerIM.onlineConsult()
    },

    // @--S 推荐公司板块
    // 获取商品列表
    getGoodList(param) {
      this.more.loading = true
      // 1、处理参数和接口
      const url =
        'http://172.16.133.128:7001/service/nk/newChipSpread/v1/trade_product_list.do'
      // 2、调用接口
      // newSpreadApi.trade_product_list
      this.$axios
        .get(newSpreadApi.trade_product_list, { params: param })
        .then((res) => {
          this.more.loading = false
          // 1、获取商品后，处理商品数据
          const data = res.data.records || []
          if (res.code === 200 && res.data.records.length > 0) {
            data.forEach((obj) => {
              // 进行类型图片处理：截取数组第一个值得第一个字段
              const type = obj.id.substring(-1, 1)
              const img =
                'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png'

              // 全部数据处理
              const item = {
                img: obj.img.split(',')[1] || img,
                industryName: '',
                price: Number(obj.price),
                name: obj.title,
                tabs: obj.field ? obj.field.join(' | ') : '',
                // tabs:
                //   obj.tabs.length !== 0
                //     ? obj.tabs
                //     : this.getArrayItems(this.slogans, 3),
                notes: obj.desc,
                id: obj.id,
              }
              this.goodList.push(item)
            })
            // 2、当展示的商品列表和商品总条数相等时，显示'无更多数据啦'
            if (this.goodList.length === res.data.total) {
              this.more.loading = false
              this.more.noMore = true
            }
            return
          }
          this.more.loading = false
          this.more.noMore = true
        })
        .catch((err) => {
          console.log(err)
          this.more.loading = false
          this.more.noMore = true
        })
    },
    // 随机生成三条数据
    getArrayItems(recent, num) {
      const temparray = []
      for (const index in recent) {
        temparray.push(recent[index])
      }
      const returnarray = []
      for (let i = 0; i < num; i++) {
        if (temparray.length > 0) {
          const arrIndex = Math.floor(Math.random() * temparray.length)
          returnarray[i] = temparray[arrIndex]
          temparray.splice(arrIndex, 1)
        } else {
          break
        }
      }
      return returnarray
    },
    // swipe当前项改变时
    swipeChange(option) {
      this.goodList = []
      this.params.start = 1
      this.params.classCode = option.type
      this.more.noMore = false
      this.getGoodList(this.params)
    },
    // 获取更多按钮
    getMore() {
      this.params.start++
      this.getGoodList(this.params)
    },
    // 推挤规划师
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
      // const url =
      //   'https://tspmicrouag.shupian.cn/cloud-recomd-api/nk/recommendInfo/plannerRecom.do'
      try {
        this.$axios
          .post(
            plannerApi.plannerReferrals,
            {
              login_name: '',
              deviceId: device, // 设备标识
              area: areaCode || '510100', // 站点code
              user_id: '',
              productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
              sceneId: scene, // 场景id
              level_2_ID: '', // 二级code
              platform: 'app',
              productId: '', //
              thirdTypeCodes: '', // 三级code
              firstTypeCode: 'FL20201224136348', // 一级code
            },
            {
              headers: {
                sysCode: 'cloud-recomd-api',
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
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
  },
  head() {
    return {
      title: '劳务资质',
    }
  },
}
</script>

<style scoped lang="less">
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  background: #f5f5f5;

  // 自定义头部组件右侧样式
  .my-customize-header {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .my-customize-header-text {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }

  // 各个板块的上下边距
  .nav-margin {
    padding-top: 20px;
  }
  .banner-margin {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .ad-margin {
    margin-top: 18px;
    margin-bottom: 20px;
  }
  .good-qua-margin {
    // margin-top: 64px;
    // margin-bottom: 32px;
  }

  // 样式穿透
  /deep/ .my-head {
    box-shadow: none;
  }
}
</style>
