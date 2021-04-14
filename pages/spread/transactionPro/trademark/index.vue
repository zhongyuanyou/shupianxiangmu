<template>
  <div class="trademark-page">
    <!-- 头部导航 -->
    <Header
      v-if="!isInApp"
      :title="pageTitle"
      :fixed="false"
      head-class="head-icon"
    >
      <template v-slot:right>
        <div class="city-btn" @click="chooseCity">
          <span class="city-btn-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.14rem" color="#232323"></my-icon>
        </div>
      </template>
    </Header>
    <!-- 金刚区 -->
    <NavBar class="nav-bar" :data="NavBtns" />
    <!-- banner区 -->
    <Banner class="my-banner" :data="images" />
    <!-- 表单区 -->
    <Form class="my-form" :data="FormMsg" />
    <!-- 广告位 -->
    <Advertising />
    <!-- 热门商标 -->
    <HotTrademark />
    <!-- 商标服务 -->
    <TrademarkService />
    <!-- 商标列表 -->
    <ProductList :planner="pagePlanner" />
    <!-- 站位 -->
    <div class="box"></div>
    <!-- 底部按钮 -->
    <FixedBottom :planner="pagePlanner" :md="bottomMd" />
    <!-- START IM在线咨询-->
    <!-- <DggImCompany></DggImCompany> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
import NavBar from '~/components/spread/transactionPro/common/NavBar'
import Banner from '~/components/spread/transactionPro/common/Banner'
import Form from '~/components/spread/transactionPro/common/Form'
import Advertising from '~/components/spread/transactionPro/trademark/Advertising'
import HotTrademark from '~/components/spread/transactionPro/trademark/HotTrademark'
import TrademarkService from '~/components/spread/transactionPro/trademark/TrademarkService'
import ProductList from '~/components/spread/transactionPro/trademark/ProductList'
import FixedBottom from '~/components/spread/transactionPro/common/FooterBottom'

// import DggImCompany from '~/components/spread/DggImCompany'

export default {
  components: {
    Header,
    NavBar,
    Banner,
    Form,
    Advertising,
    HotTrademark,
    TrademarkService,
    ProductList,
    // DggImCompany,
    FixedBottom,
  },

  data() {
    return {
      pageTitle: '商标交易',
      bottomMd: {
        telMd: {
          name: '商标交易聚合页_底部_电话联系',
          type: '售前',
        },
        imMd: {
          name: '商标交易聚合页_底部_在线咨询',
          type: '售前',
        },
      },
      NavBtns: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7fmckl476940000.png',
          text: '精品商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_精品商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bmgtxjry9j40000.png',
          text: '热门商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_热门商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/56cv6ghini80000.png',
          text: '特价商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_特价商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/41sjydgbrl20000.png',
          text: '新品商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_新品商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5h9ffxku1iw0000.png',
          text: '商标服务',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_商标服务',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7exm1hb66fo0000.png',
          text: '急售商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_急售商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3p1h9e99sw40000.png',
          text: '国际商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_国际商标',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bs8lt896m2o0000.png',
          text: '商标查询',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_商标查询',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bwyh3vl2mnc0000.png',
          text: '商标出售',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_商标出售',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fq08q9c462o0000.png',
          text: '其他商标',
          marketingImg: '',
          url: '',
          md: {
            type: '',
            name: '商标交易聚合页_其他商标',
          },
        },
      ],
      FormMsg: {
        title: '只需5秒 一键为您适配商标',
        // 我需要公司类型下拉
        needList: [
          '01类化学原料',
          '02类颜料油漆',
          '03类化妆日用',
          '04类燃料油脂',
          '05类医药药品',
          '06类五金金属',
          '07类机械设备',
          '08类手工器械',
          '09类电子电脑',
          '10类医疗器械',
          '11类家用电器',
          '12类运输工具',
          '13类军火烟火',
          '14类珠宝钟表',
          '15类乐器',
          '16类办公文具',
          '17类橡胶制品',
          '18类皮革箱包',
          '19类建筑材料',
          '20类家具',
          '21类厨房洁具',
          '22类绳网袋篷',
          '23类纺织纱线',
          '24类布料床单',
          '25类服装鞋帽',
          '26类花边配饰',
          '27类地毯席垫',
          '28类体育玩具',
          '29类食品鱼肉',
          '30类小食配料',
          '31类水果花木',
          '32类啤酒饮料',
          '33类酒',
          '34类烟草烟具',
          '35类广告贸易',
          '36类金融管理',
          '37类建筑修理',
          '38类通讯传媒',
          '39类运输旅行',
          '40类材料加工',
          '41类教育娱乐',
          '42类技术服务',
          '43列餐饮酒店',
          '44类医疗园艺',
          '45类法律',
        ],
        needTitle: '商标类型',
        cityList: [
          '全国',
          '重庆',
          '长沙',
          '武汉',
          '上海',
          '北京',
          '深圳',
          '广州',
          '成都',
          '杭州',
          '郑州',
          '佛山',
          '东莞',
          '宜昌',
          '石家庄',
          '河北',
          '北京海淀',
        ],
        buttonName: '立即获取',
        subInfo: ['价格透明', '信息安全', '专业保障'],
        type: 'sbjy', // 业态编码。固定几个业态编码。
        md: { pageName: '商标交易聚合页表单' },
      },
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '4000962540',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      images: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bzg562278t40000.jpg',
          md: {
            type: '',
            name: '商标交易聚合页_商标无忧注册',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/cvno719yvu80000.jpg',
          md: {
            type: '',
            name: '商标交易聚合页_商标授权使用',
          },
        },
      ],
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
  },
  methods: {
    chooseCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        window.spptMqMi.showPanel()
      }
    },
  },
  head() {
    return {
      title: '商标交易',
      script: [],
    }
  },
}
</script>

<style lang="less" scoped>
.trademark-page {
  background: #ffffff;
  width: @spread-page-width;
  margin: 0 auto;
  ::v-deep.my-head {
    box-shadow: 0 0 0 0;
  }
  .city-btn {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .city-btn-text {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }
  .nav-bar {
    margin-top: 16px;
    ::v-deep.my-component {
      padding: 24px 40px 32px;
    }
  }
  .my-banner {
    margin-top: 32px;
  }
  .my-form {
    margin-top: 64px;
  }
  .box {
    height: 148px;
  }
  ::v-deep.btn {
    display: none;
  }
  ::v-deep.my-component {
    padding-bottom: 0px;
  }
  ::v-deep.sp-bottombar {
    position: fixed;
    bottom: 0;
    z-index: 10;
  }
}
</style>
