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
      <template v-slot:right>
        <span class="my-customize-header" @click="choiceCity">
          <span class="my-customize-header-text">{{ currentCity }}</span>
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
    <Form class="laowu-form" :data="cardName" />
    <!-- E表单 -->

    <!-- S推荐专利 热门行业 专利转让分类-->
    <Advertising :page-planner="pagePlanner" />
    <!-- E推荐专利 热门行业 专利转让分类 -->

    <!-- S列表 -->
    <ProductList
      :data="dataNavBar"
      :good-list="goodList"
      :more="more"
      @selectTab="selectTab"
      @getMore="getMore"
      @swipeChange="swipeChange"
    />
    <!-- E列表 -->

    <!-- S底部咨询 -->
    <FooterBottom :planner="pagePlanner" :md="fixedMd" />
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
import NavBar from '~/components/spread/transaction/common/NavBar'
import Banner from '~/components/spread/transaction/common/Banner'
import Form from '~/components/spread/transaction/common/Form'
import ProductList from '~/components/spread/transaction/common/ProductList'
import Advertising from '~/components/spread/transaction/patent/Advertising'
import FooterBottom from '~/components/spread/transaction/common/FooterBottom'
import DggImCompany from '~/components/spread/DggImCompany'
export default {
  name: 'Index',
  components: {
    DggImCompany,
    Header,
    NavBar,
    Banner,
    Form,
    ProductList,
    Advertising,
    FooterBottom,
  },
  data() {
    return {
      pageTitle: '专利交易',
      // 导航金刚区
      dataList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ds5k78o62w80000.png',
          text: '发明专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_金刚区_发明专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2fash08kuxz4000.png',
          text: '实用新型专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_金刚区_实用新型专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/uu84dykkqsw000.png',
          text: '设计专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_金刚区_设计专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9x7xbu411280000.png',
          text: '精选专利',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '专利交易聚合页_精选专利',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/69h85fp1c0g0000.png',
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
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/54q7m9eaits0000.jpg',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9be47ctsu4w0000.jpg',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5ylf4rhztr80000.jpg',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/adksug9df8w0000.png',
          md: {
            type: '',
            name: '',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4xln8f1dbwo0000.jpg',
          md: {
            type: '',
            name: '',
          },
        },
      ],
      // 表单
      cardName: {
        title: '只需5秒 一键为您适配专利',
        // 我需要公司类型下拉
        needList: ['发明专利', '实用新型专利', '外观设计专利'],
        needTitle: '专利类型',
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
        marks: [
          '医学医疗',
          '交通运输',
          '教育器械',
          '工业机械',
          '电子电器',
          '新型能源',
          '家居用品',
          '食品保健',
        ],
        planner: {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '028-954310',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
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
      pagePlanner: {
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
          name: '专利交易聚合页_底部展位_拨打电话',
          type: '售前',
        },
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
      pageObj: {},
      // 当前页
      pageNum: 1,
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
  mounted() {
    // @--判断页面是否在app里打开
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: this.pageTitle }, () => {})
    }

    // 请求后台
    this.getPagePlanner()
    this.selectTab({ type: 'patentStatuse=1', index: 0 })
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
        window.spptMqMi.showPanel()
      }
    },
    // 请求列表参数
    selectTab(item) {
      console.log(item)
      this.pageObj = item
      const api = '/xdy-portal-product-api/patent/list?'
      const cdn = 'https://microuag.dgg188.cn'
      const type = item.type
      if (item.index < 3) {
        this.more.noMore = false
        this.pageNum = 1
        this.goodList = []
      } else {
        this.pageNum++
      }
      // 2、调用接口
      this.more.loading = true
      this.$axios
        .get(cdn + api + type + '&pageSize=10' + '&pageNum=' + this.pageNum)
        .then((res) => {
          // 调用回调函数处理数据
          const result = res.data.list
          if (result.length < 10) {
            this.more.noMore = true
          }
          if (result.length > 0 && res.code === 'SYS_0000') {
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
              this.more.loading = false
            })
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
        const obj = { type: this.pageObj.type, index: 5 }
        this.selectTab(obj)
      }
    },
    // 轮播切换触发
    swipeChange(item) {
      const obj = { type: item.type, index: 1 }
      this.selectTab(obj)
    },
    async getPagePlanner() {
      try {
        const res = await this.$axios.get(`${plannerApi.planner}`)
        console.log('plannerApi.planner succes:', res.code + '--' + res.message)
        if (res.code === 200) {
          this.pagePlanner = this.dataNavBar.planner = {
            id: res.data.list[0].userCentreId,
            name: res.data.list[0].realName,
            jobNum: res.data.list[0].loginName,
            telephone: res.data.list[0].userPhone,
            imgSrc: res.data.list[0].userHeadUrl,
          }
        }
      } catch (error) {
        console.log('plannerApi.planner error：', error.message)
      }
    },
  },
  head() {
    return {
      title: '专利交易',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
        {
          src: '/js/dgg-md-sdk-conf.js',
          ssr: false,
          type: 'text/javascript',
          charset: 'utf-8',
        },
        {
          src: 'https://ptcdn.dgg.cn/md/dgg-md-sdk.min.js',
          ssr: false,
          type: 'text/javascript',
          charset: 'utf-8',
        },
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
    margin-top: 24px;
  }
  .laowu-banner {
    margin-top: 64px;
  }
  .patent-card {
    position: relative;
    margin-top: 64px;
  }
  .laowu-form {
    margin-top: 64px;
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
