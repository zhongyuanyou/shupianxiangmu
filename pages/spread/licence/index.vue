<template>
  <div class="licence-content">
    <!-- S 头部导航 -->
    <Header v-show="!isInApp" :title="title">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- E 头部导航 -->
    <!-- E 轮播图 -->
    <Banner :img-list="imgList" />
    <!-- E 轮播图 -->
    <!-- S 表单 -->
    <Form />
    <!-- E 表单 -->
    <!-- S 选择办理类型 -->
    <HandleType :type-list="typeList" />
    <!-- E 选择办理类型 -->
    <!-- S 许可证常见的办理问题 -->
    <Question :planner="plannerOne" />
    <!-- E 许可证常见的办理问题 -->
    <!-- S 为什么选择薯片平台 -->
    <Select />
    <!-- E 为什么选择薯片平台 -->
    <!-- S 咨询规划师 -->
    <Planner :planners-data="plannerList" />
    <!-- E 咨询规划师 -->
    <!-- S 您可能还需要办理 -->
    <Need />
    <!-- E 您可能还需要办理 -->
    <ConsultTel :title="titles" :tel="tel" :md-name="mdName" />
    <!-- S 薯片找人 -->
    <SPDescription />
    <!-- E 薯片找人 -->
    <!-- S 底部 -->
    <FixedBottom :planner="plannerOne" :md="fixedMd" />
    <!-- E 底部 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
import Banner from '@/components/spread/licence/Banner'
import Form from '@/components/spread/licence/Form'
import HandleType from '@/components/spread/licence/HandleType'
import Question from '@/components/spread/licence/Question'
import Select from '@/components/spread/licence/Select'
import Planner from '@/components/spread/licence/Planner'
import Need from '@/components/spread/licence/Need'
import ConsultTel from '~/components/spread/common/ConsultTel'
import SPDescription from '~/components/spread/common/SPDescription'
import FixedBottom from '~/components/spread/common/FixedBottom'
import DggImCompany from '~/components/spread/DggImCompany'
import { spreadApi } from '~/api/spread'
import { resultData, typeList } from '@/assets/spread/licence.js'

export default {
  components: {
    Header, // 头部
    Banner, // 轮播
    Form, // 表单
    HandleType, // 办理类型
    Question, // 常见问题
    Select, // 选择原因
    Planner, // 咨询规划师
    Need, // 可能还需要办理
    ConsultTel, //  立即咨询
    SPDescription, //  薯片找人
    FixedBottom, //  底部推荐按钮
    DggImCompany, // IM弹框
  },
  async asyncData({ $axios }) {
    const result = resultData
    const type = 'extendLicence'
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      if (res.code === 200) {
        return {
          result: res,
        }
      } else {
        return { result }
      }
    } catch (error) {
      console.log('error', error)
      // 请求出错也要保证页面正常显示
      return { result }
    }
  },
  data() {
    return {
      title: '许可证办理',
      titles: '还有疑问？企服专家为您免费解答',
      tel: '4000-962540', // 电话号码
      mdName: '许可证办理服务_免费咨询',
      // 埋点
      fixedMd: {
        telMd: {
          name: '许可证办理_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '许可证办理_钻石展位_在线咨询',
          type: '售前',
        },
      },
      // 推荐规划师
      plannerOne: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://tenant-assets.meiqiausercontent.com/avatars/16984/5uyI/HqRHeYKk3pkWUn04xfOB.jpg',
      },
      plannerLsit: [
        {
          id: 1,
          type: '金牌规划师',
          avatarImg:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          name: '李劲',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 18402858698,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7887200447257313280',
            name: '李劲',
            num: '108862',
          },
        },
      ],
      // 轮播列表
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/h806qfpu5yg000.png',
        },
      ],
      typeList: [],
      standardList: [
        {
          standard: '有相应场所',
          flow: '有相应设备等',
        },
        {
          standard: '符合食品安全标准',
          flow: '有标准工艺流程',
        },
        {
          standard: '有规范名称',
          flow: '有5名专职人员',
        },
        {
          standard: '注册资金200万',
          flow: '有经营场所',
        },
        {
          standard: '有贮存场所',
          flow: '有相应管理制度',
        },
        {
          standard: '依法设立的组织',
          flow: '有2名相关技术人员',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {},
  created() {
    this.typeList = typeList
    this.getProductDetail(this.result.data.adList[0].sortMaterialList || [])
  },
  mounted() {
    // this.typeList = typeList
    // this.standardList = standardList
  },
  methods: {
    // 头部返回
    back() {
      // 返回上一页
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
    //  获取办理类型数据
    getProductDetail(data) {
      this.getPlanlerList(this.result.data.planlerList || [])
      if (data.length) {
        const productList = []
        data.forEach((item, index) => {
          const res = item.materialList[0].productDetail
          const obj = {
            referencePrice: res.referencePrice,
            operating: {
              showName: res.operating.showName,
              slogan: res.operating.slogan,
              actualViews: res.operating.actualViews,
              defaultSales: res.operating.defaultSales,
              actualSales: res.operating.actualSales,
              standard: this.standardList[index].standard,
              flow: this.standardList[index].flow,
              planner: this.plannerList[
                `${
                  index < this.plannerList.length
                    ? index
                    : Math.floor(Math.random() * this.plannerList.length)
                }`
              ],
            },
          }
          productList.push(obj)
        })
        this.typeList = productList
        console.log('this.typeList: ', this.typeList)
      }
    },
    // 获取规划师数据
    getPlanlerList(data) {
      if (data.length) {
        const planlers = []
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
            imgSrc: item.userHeadUrl,
          }
          planlers.push(obj)
        })
        this.plannerList = planlers
        this.plannerOne = this.plannerList[0]
      } else {
        return this.plannerOne
      }
    },
  },
  head() {
    return {
      title: '许可证办理',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.licence-content {
  background: #ffffff;
  height: 100%;
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  ::v-deep .fixed-head {
    .my-head {
      width: 750px;
      left: 50%;
      margin-left: -375px;
    }
  }
}
::v-deep .sp-bottombar-info__sign {
  display: flex;
  align-items: center;
}
::v-deep .cousulttel-title[data-v-024b2072] {
  margin: 29px 0 31px 0;
  text-align: left;
}
::v-deep .back_icon {
  margin-left: 40px;
}
</style>
