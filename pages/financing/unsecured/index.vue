<template>
  <div class="enterprise">
    <!-- 头部 -->
    <Head title="无抵押贷款"></Head>
    <!-- Banner -->
    <Banner></Banner>
    <!-- 产品列表 -->
    <ProductList></ProductList>
    <!--贷款工具-->
    <LoanTool :tool-msg="toolMsg"></LoanTool>
    <!-- 底部展示 -->
    <div class="bottom-show">薯片助贷服务，让更多人生活更美好</div>
    <!-- 规划师占位 -->
    <BtnPlanner ref="plannerIM" :planner="pagePlanner" :md="fixedMd" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { plannerApi } from '@/api/spread'
import Head from '@/components/financing/common/Header'
import Banner from '@/components/financing/common/Banner'
import ProductList from '@/components/financing/common/ProductList'
import LoanTool from '@/components/financing/common/LoanTool'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
export default {
  components: {
    Head,
    Banner,
    ProductList,
    LoanTool,
    BtnPlanner,
  },
  data() {
    return {
      // 页面规划师
      pagePlanner: {},
      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '知识产权聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
      toolMsg: {
        title: '额度评估',
        desc: '测测您的信用额度',
        icon: 'https://cdn.shupian.cn/sp-pt/wap/images/lf5jywbwdxc000.png',
        path: '/financing/creditEvaluation',
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
    }),
  },
  created() {
    if (process.client) {
      // 请求
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  methods: {
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
              firstTypeCode: 'FL20210425164558', // 一级code
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
  },
  head() {
    return {
      title: '无抵押贷款',
    }
  },
}
</script>

<style lang="less" scoped>
.enterprise {
  width: 750px;
  margin: 0 auto;
  background: #f5f5f5;
  height: 100%;
  ::v-deep.my-head {
    width: @spread-page-width !important;
    position: fixed !important;
    left: 50% !important;
    margin-left: calc(-@spread-page-width / 2) !important;
    box-shadow: none !important;
  }
  .bottom-show {
    width: 100%;
    height: 106px;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #cccccc;
    line-height: 106px;
    text-align: center;
  }
}
</style>
