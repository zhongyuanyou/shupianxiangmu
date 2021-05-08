<template>
  <div class="patent">
    <!-- S头部Header -->
    <Header
      v-if="!isInApp"
      ref="header"
      :title="pageTitle"
      :fixed="false"
      head-class="head-icon"
    >
      <template v-if="false" v-slot:right>
        <span class="my-customize-header" @click="choiceCity">
          <span class="my-customize-header-text">{{
            currentCity.name || '成都'
          }}</span>
          <my-icon name="sear_ic_open" size="0.18rem" color="#cccccc"></my-icon>
        </span>
      </template>
    </Header>
    <!-- E头部Header -->
    <!-- S导航部-金刚区-->
    <NavBar class="nav-btn-margin" :data="dataList" />
    <!-- E导航部-金刚区-->
    <!-- S轮播图 -->
    <Banner class="laowu-banner" :data="imageBanner" />
    <!-- E轮播图 -->
    <!-- S表单 -->
    <!-- <Form class="laowu-form" :data="cardName" /> -->
    <!-- E表单 -->
    <!-- S推荐专利 热门行业 专利转让分类-->
    <Advertising :page-planner="pagePlanner" />
    <!-- E推荐专利 热门行业 专利转让分类 -->
    <!-- S列表 -->
    <ProductList
      :data="dataNavBar"
      :good-list="goodList"
      :more="more"
      @getMore="getMore"
      @swipeChange="swipeChange"
    />
    <!-- E列表 -->
    <!-- S底部咨询 -->
    <!-- <FooterBottom :planner="pagePlanner" :md="fixedMd" /> -->
    <BtnPlanner :planner="pagePlanner" :md="fixedMd" />
    <!-- E底部咨询 -->
    <!-- S IM在线咨询-->
    <DggImCompany />
    <!-- E IM在线咨询-->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { plannerApi } from '~/api/spread'

import Header from '~/components/common/head/header'
import NavBar from '~/components/spread/transactionPro/common/NavBar'
import Banner from '~/components/spread/transactionPro/common/Banner'
// import Form from '~/components/spread/transactionPro/common/Form'
import ProductList from '~/components/spread/transactionPro/common/ProductList'
import Advertising from '~/components/spread/transactionPro/patent/Advertising'
// import FooterBottom from '~/components/spread/transactionPro/common/FooterBottom'
import BtnPlanner from '~/components/spread/common/BtnPlanner'
import DggImCompany from '~/components/spread/DggImCompany'
export default {
  name: 'Index',
  components: {
    DggImCompany,
    Header,
    NavBar,
    Banner,
    // Form,
    ProductList,
    Advertising,
    // FooterBottom,
    BtnPlanner,
  },
  data() {
    return {
      pageTitle: '专利交易',
      // 导航金刚区
      dataList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8ixby4ouz9c0000.png',
          text: '发明专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_金刚区_发明专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2irczoxzo1m0000.png',
          text: '实用新型专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_金刚区_实用新型专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/d789v2nhd8w0000.png',
          text: '设计专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_金刚区_设计专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/175xyyc8xhy8000.png',
          text: '精选专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_精选专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1dcyv5h20y00000.png',
          text: '独家专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_独家专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/68xq1avlsy40000.png',
          text: '个人专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_个人专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1yaybk6npmbk000.png',
          text: '公司专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_公司专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/flq552cmstc0000.png',
          text: '国际专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '资质交易聚合页_国际专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8usq0qh2ql00000.png',
          text: '专利出售',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_专利出售',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bx3ex86qe8g0000.png',
          text: '专利服务',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_专利服务',
          },
        },
      ],
      // 轮播
      imageBanner: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9ztbm1lgoso0000.png',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ef92o7m2a140000.png',
          url: '',
          md: {
            type: '',
            name: '',
          },
        },
      ],
      // 表单
      cardName: {
        title: '免费查找专利  一键解决专利难题',
        buttonName: '立即获取',
        subInfo: ['价格透明', '信息安全', '官方保障'],
        type: 'zljy', // 业态编码。固定几个业态编码。
        md: { pageName: '专利交易聚合页' },
      },
      // 列表导航
      dataNavBar: {
        tabBtnList: [
          { name: '热销专利', type: 'patentStatuse=1' },
          { name: '精选专利', type: 'patentType=2' },
          { name: '特价专利', type: 'priceUpper=5000' },
        ],
        // marks: [
        //   '医学医疗',
        //   '交通运输',
        //   '教育器械',
        //   '工业机械',
        //   '电子电器',
        //   '新型能源',
        //   '家居用品',
        //   '食品保健',
        // ],
        planner: {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '4000962540',
          imgSrc:
            'https://cdn.shupian.cn/6b36906ec8c649a5aaee0bb274f6daeb1618991541795.jpeg',
        },
        md: {
          pageName: '专利交易聚合页',
        },
      },
      // 列表内容
      goodList: [],
      // 更多提示
      more: {
        loading: false, // 加载更多按钮点击时，显示的loading加载
        noMore: false, // 无更多加载数据
      },
      // 推荐规划师：默认数据
      pagePlanner: {},
      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '专利交易聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
      listImg: [
        'https://cdn.shupian.cn/sp-pt/wap/dqo0727zrvk0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/amsvmdllujk0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/cs4dlk7fo800000.jpg',
      ],
      // 当前分类下标
      params: { type: 'patentStatuse=1', index: 0 },
      // 当前页
      pageNum: 1,
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    if (process.client) {
      // 请求
      this.getGoodList()
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  mounted() {
    // @--判断页面是否在app里打开
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: this.pageTitle }, () => {})
    }
  },
  methods: {
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        // 待改
        window.spptMqMi.showPanel()
      }
    },
    // 请求列表参数
    getGoodList() {
      this.more.loading = true
      const api = '/xdy-portal-product-api/patent/list'
      const cdn = 'https://microuag.dgg188.cn'
      const params = `?${this.params.type}&pageSize=10&pageNum=${this.pageNum}`
      // 2、调用接口
      this.$axios
        .get(cdn + api + params)
        .then((res) => {
          // 调用回调函数处理数据
          const result = res.data.list || []
          if (result.length > 0 && res.code === 'SYS_0000') {
            this.more.loading = false
            result.forEach((elem) => {
              const tabs = [
                '人气商品',
                '严选商品',
                '优质专利',
                '卖家急售',
                '热门行业',
                '资料齐全',
                '可随时交易',
                '热销商品',
                '签署出售协议',
                '陪同交易',
                '超高性价',
                '明码标价',
                '性价首选',
                '有效专利',
                '已授权',
                '授权专利',
                '热门专利',
              ]
              const random = parseInt(Math.random() * (tabs.length - 3) + 3)
              const obj = {
                img: this.listImg[elem.patentType - 1], // 商品本身的图片
                industryName: '电子贸易', // 行业名称（会根据行业名称显示相应的行业图片）
                price: elem.transferDiscountPrice, // 商品价格
                name: elem.patentName, // 公司显示名称（有*号）
                tabs: [
                  `${tabs[random] || '人气产品'}`,
                  `${tabs[random + 1] || '资料齐全'}`,
                  `${tabs[random + 2] || '高咨询'}`,
                ], // 有背景色的标签tab，每个页面有单独的标签列表，随机取几个传进来
                notes: [], // 以 | 字符分隔的注意，接口字段值
              }
              if (elem.patentTypeName) {
                obj.notes.push(elem.patentTypeName)
              }
              if (elem.patentStatusName) {
                obj.notes.push(elem.patentStatusName)
              }
              this.goodList.push(obj)
            })
            if (result.length < 10) {
              this.more.noMore = true
            }
            console.log(this.goodList)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMore() {
      if (this.more.noMore) {
        return false
      } else {
        this.pageNum++
        this.params = { type: this.params.type, index: 5 }
        this.getGoodList()
      }
    },
    // 轮播切换触发
    swipeChange(item) {
      this.goodList = []
      this.pageNum = 1
      this.params = { type: item.type, index: 1 }
      this.getGoodList()
    },
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
              firstTypeCode: 'FL20201224136341', // 一级code
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
              this.pagePlanner = this.dataNavBar.planner = {
                id: res.data[0].userCentreId,
                name: res.data[0].userName,
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
      title: '专利交易',
      script: [
        // {
        //   src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        // },
        // {
        //   src: '/js/dgg-md-sdk-conf.js',
        //   ssr: false,
        //   type: 'text/javascript',
        //   charset: 'utf-8',
        // },
        // {
        //   src: 'https://ptcdn.dgg.cn/md/dgg-md-sdk.min.js',
        //   ssr: false,
        //   type: 'text/javascript',
        //   charset: 'utf-8',
        // },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.patent {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  background: #f5f5f5;
  // 自定义头部组件右侧样式
  /deep/.my-head {
    font-size: 0.24rem;
    box-shadow: 0px 0px 0px 0px #f4f4f4;
    background-color: #ffffff;
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
  }
  .nav-btn-margin {
    padding-top: 24px;
  }
  .laowu-banner {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .patent-card {
    position: relative;
  }
  // 列表组件样式
  /deep/.my-component {
    .item-title {
      line-height: 42px;
    }
  }

  /deep/.my-sp-bottom-bar {
    z-index: 100;
  }
}
</style>
