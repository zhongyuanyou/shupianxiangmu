<template>
  <div class="enterprise">
    <!-- 头部 -->
    <Head title="有抵押贷款"></Head>
    <!-- Banner -->
    <Banner></Banner>
    <!-- 产品列表 -->
    <ProductList></ProductList>
    <!--贷款工具-->
    <LoanTool :tool-msg="toolMsg"></LoanTool>
    <!-- 底部展示 -->
    <div class="bottom-show">薯片助贷服务，让更多人生活更美好</div>
    <!-- 规划师占位 -->
    <BtnPlanner :planner="planner"></BtnPlanner>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  data() {
    return {
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      toolMsg: {
        title: '贷款计算器',
        desc: '神器在手，算遍所有',
      },
    }
  },
  head() {
    return {
      title: '有抵押贷款',
    }
  },
}
</script>

<style lang="less" scoped>
.enterprise {
  width: 750px;
  margin: 0 auto;
  background: #f5f5f5;
  ::v-deep.my-head {
    width: @spread-page-width;
    position: fixed;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
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
