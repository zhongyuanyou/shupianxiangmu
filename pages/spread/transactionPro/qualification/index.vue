<template>
  <div class="page-content">
    <!--START 头部Header-->
    <Header
      v-if="!isInApp"
      ref="header"
      :title="pageTitle"
      :fixed="false"
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
    <Form :data="formData" class="" />
    <!--END   表单-->

    <ADList class="ad-margin" />
    <!--START 优质资质-->
    <GoodQualification class="good-qua-margin" />
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
    <BtnPlanner :planner="pagePlanner" :md="fixedMd" />
    <!--END   固定底部-->

    <!--START IM在线咨询-->
    <DggImCompany></DggImCompany>
    <!--END   IM在线咨询-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/common/head/header'
import DggImCompany from '@/components/spread/DggImCompany'
import BtnPlanner from '@/components/spread/transactionPro/common/BtnPlanner'

import NavBar from '@/components/spread/transactionPro/common/NavBar.vue'
import Banner from '@/components/spread/transactionPro/common/Banner'
import Form from '@/components/spread/transactionPro/common/Form'
import ProductList from '@/components/spread/transactionPro/common/ProductList'

import GoodQualification from '@/components/spread/transactionPro/qualification/GoodQualification'
import ADList from '@/components/spread/transactionPro/common/ADList'

export default {
  name: 'Index',
  components: {
    Header,
    NavBar,
    Banner,
    Form,
    ProductList,
    DggImCompany,
    BtnPlanner,
    GoodQualification,
    ADList,
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
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },

      // @--S 埋点数据
      fixedMd: {
        imMd: {
          name: '资质交易聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },

      // @--S 推荐公司板块
      params: {
        page: 1,
        limit: 10,
        type: 0,
      },
      // 选项卡、规划师
      goodListData: {
        tabBtnList: [
          { name: '推荐资质', type: 0 },
          { name: '热卖资质', type: 9 },
          { name: '急售', type: 1 },
        ],
        marks: ['特级', '一级', '二级', '三级'],
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
    this.getGoodList(this.params)
  },
  mounted() {
    // @--判断页面是否在app里打开
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: this.pageTitle }, () => {})
    }
  },
  methods: {
    // @--跳转
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    // 跳转链接-IM规划师
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        // const planner = this.pagePlanner
        // this.$root.$emit(
        //   'openIMM',
        //   planner.id,
        //   planner.name || '',
        //   planner.jobNum || '',
        //   planner.imgSrc || ''
        // )
        window.spptMqMi.showPanel()
      }
    },

    // @--S 推荐公司板块
    // 获取商品列表
    getGoodList({ type = 0, page = 1, limit = 10 }) {
      this.more.loading = true
      // 1、处理参数和接口
      const param = `?type=${type}&page=${page}&limit=${limit}`
      const api = '/xdy-portal-product-api/aptitude/getRelatedRecommendations'
      const cdn = 'https://microuag.dgg188.cn'
      // 2、调用接口
      this.$axios
        .get(cdn + api + param)
        .then((res) => {
          this.more.loading = false
          // 1、获取商品后，处理商品数据
          const data = res.data.list || []
          if (res.code === 200 && res.data.list.length > 0) {
            data.forEach((obj) => {
              // 进行类型图片处理：截取数组第一个值得第一个字段
              let type = ''
              const index = obj.aptitudes[0].name.indexOf('-')
              if (index > -1) {
                type = obj.aptitudes[0].name.slice(0, index)
              } else {
                type = obj.aptitudes[0].name
              }
              let img = ''
              switch (type) {
                case '施工总承包': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/dmw1eqwpz5c0000.png'
                  break
                }
                case '施工专业承包': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/fnrnbp54bm00000.png'
                  break
                }
                case '其他资质': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/7k86445axyw0000.png'
                  break
                }
                case '勘察': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/8q40o2nqbmo0000.png'
                  break
                }
                case '施工劳务': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/43iipcpfwm20000.png'
                  break
                }
                case '工程设计': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/2p0q0971ccw0000.png'
                  break
                }
                case '房地产开发': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/d1hxxmkv5kg0000.png'
                  break
                }
                case '招标代理': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/22k7vyj0zy80000.png'
                  break
                }
                case '监理': {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/7g003aqqas00000.png'
                  break
                }
                default: {
                  img =
                    'https://cdn.shupian.cn/sp-pt/wap/images/2zqf2fldtmk0000.png'
                }
              }

              // 全部数据处理
              const item = {
                img,
                industryName: '',
                price: Number(obj.capital),
                name: obj.comName,
                tabs: this.getArrayItems(this.slogans, 3),
                notes: [
                  obj.cityName,
                  obj.endYear,
                  obj.safety === '1' ? '有安全许可证' : null,
                ],
              }
              this.goodList.push(item)
            })
            // 2、当展示的商品列表和商品总条数相等时，显示'无更多数据啦'
            if (this.goodList.length === res.data.total) {
              this.more.noMore = true
            }
          }
        })
        .catch((err) => {
          console.log(err)
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
      this.params.page = 1
      this.params.type = option.type
      this.getGoodList(this.params)
    },
    // 获取更多按钮
    getMore() {
      this.params.page++
      this.getGoodList(this.params)
    },
    // @--E   推荐公司板块
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
    margin-top: 20px;
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
