<template>
  <div class="company">
    <!-- 头部内容 start -->
    <Header v-show="!isInApp" title="公司注册标准">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1a1a1a"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- 头部内容 end -->
    <!-- banner start -->
    <div class="banner">
      <sp-swipe :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="item of banner" :key="item.id">
          <img :src="item.img" />
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <!-- banner end -->
    <!-- 选择公司类型 start -->
    <Type v-if="info.length" :data="info" />
    <!-- 选择公司类型 end -->
    <!-- 电话咨询 start -->
    <ConsultTel
      :tel="400 + '-' + 962540"
      title="还有疑问？企服专家为您免费解答"
      class="consult"
      md-name="公司注册标准_疑问咨询"
    />
    <!-- 电话咨询 end -->
    <!-- 规划师 start -->
    <Planner :planners-common="plannersCommon" :planners-data="plannersData" />
    <!-- 规划师 end -->
    <!-- im start -->
    <DggImCompany />
    <!-- im end -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import {
  planlerList,
  info,
} from '@/assets/spread/companyRegistrationStandards.js'
import DggImCompany from '@/components/spread/DggImCompany'
import Planner from '@/components/spread/companyRegistrationStandards/Planner'
import Type from '@/components/spread/companyRegistrationStandards/Type'
import ConsultTel from '@/components/spread/common/ConsultTel'
import Header from '~/components/common/head/header'
import MyIcon from '@/components/common/myIcon/MyIcon'

import { spreadApi } from '@/api/spread'

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    DggImCompany,
    ConsultTel,
    Planner,
    Header,
    MyIcon,
    Type,
  },
  props: {},
  /** 异步请求 */
  async asyncData({ $axios }) {
    const type = 'extendBussineWithdraw'
    const defaultData = planlerList
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      if (res.code === 200) {
        return { resultData: res.data }
      }
      return { resultData: defaultData }
    } catch (error) {
      return { resultData: defaultData }
    }
  },
  data() {
    return {
      // 公司注册标准的文字内容
      info: [],
      // 规划师
      plannersData: [],
      plannersCommon: {
        title: '咨询规划师',
        imName: '核名_咨询规划师_在线咨询',
        telName: '核名_咨询规划师_拨打电话',
      },
      // banner
      banner: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2fyx09tup3wg000.jpg',
          id: 'banner_1',
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
  created() {},
  mounted() {
    this.assignment()
    this.setAppTitle()
    try {
      this.plannerHandle(this.resultData.planlerList)
    } catch (error) {
      this.plannerHandle(planlerList)
    }
  },
  methods: {
    /** 将json赋值给变量 */
    assignment() {
      this.info = info
    },
    /** 设置app标题 */
    setAppTitle() {
      if (this.isInApp) {
        this.$appFn.dggSetTitle({ title: '公司注册标准' }, () => {})
      }
    },
    /** 将异步数据修改成需要的样子 */
    plannerHandle(data) {
      if (data.length !== 0) {
        const plannerList = []
        data.map((item, i) => {
          const obj = {
            id: item.userCentreId,
            type: '金牌规划师',
            imgSrc: item.userHeadUrl,
            avatarImg: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 11,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.userPhoneloginName,
          }
          plannerList.push(obj)
        })
        this.plannersData = plannerList
      }
    },
    /** 返回上一页 */
    back() {
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
  },
  head() {
    return {
      title: '公司注册标准',
    }
  },
}
</script>
<style lang="less" scoped>
.company {
  width: 100%;
  max-width: @spread-page-width;
  font-family: PingFang SC;
  padding-bottom: 224px;
  background: #fff;
  margin: 0 auto;
  .back_icon {
    margin-left: 40px;
  }
  ::v-deep.cousulttel-content {
    box-shadow: 0px 8px 12px 0px rgba(73, 116, 245, 0.15);
  }
  ::v-deep.fixed-head {
    .my-head {
      width: @spread-page-width;
      left: 50%;
      margin-left: -(@spread-page-width / 2);
    }
  }
}
.banner {
  width: 100%;
  margin-bottom: 45px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .input_ic_open {
    position: absolute;
    right: 0;
  }
}
.consult {
  ::v-deep.cousulttel-title {
    text-align: left;
  }
}
</style>
