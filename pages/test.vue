<template>
  <div class="main">
    <sp-button @click="login">游客登录</sp-button>
    <sp-button @click="chat">im 聊天</sp-button>
    <sp-button @click="getPlanner">获取规划师</sp-button>
    <p>定位数据:{{ cityData.data.code || '无' }}</p>
    <div>
      规划师数据
      <p v-for="item in planners" :key="item.userCenterId">
        {{ item.userName }}
      </p>
    </div>
    <!-- <dggImCompany></dggImCompany> -->
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import dggImCompany from '@/components/spread/imNew'
import { recPlaner } from '@/api/spread/'
export default {
  components: {
    // dggImCompany,
    [Button.name]: Button,
  },
  data() {
    return {
      cityData: {
        code: 500,
        data: {},
      },
      planners: [],
    }
  },
  mounted() {
    // this.getList()
    // this.getUsers()
    this.getPlanner()
  },
  methods: {
    getUsers() {
      this.$axios
        .post(
          'https://spmicrouag.shupian.cn/merchant-center-manager/yk/merchant/user/v1/get_mch_settled_info_list_two.do',
          {
            mchUserIds: ['596130226279193979', '758743117435920144'],
          },
          {
            headers: {
              'x-auth-token': '840035544732569499',
            },
          }
        )
        .then((res) => {
          console.log('用户信息', res)
        })
        .catch((err) => {
          console.log('用户信息', err)
        })
    },
    getList() {
      this.$axios.get(
        'https://dspmicrouag.shupian.cn/crisps-app-wap-bff-api/service/nk/spread2/v1/list.do',
        {
          params: {
            pageCode: 'extendBussineHome',
            locations: 'ad113205',
          },
        }
      )
    },
    login() {
      this.$axios
        .post(
          'http://dspmicrouag.shupian.cn/crispsimapi/api/v1/imserver/msg_user/reg_visitor.do',
          {
            sysCode: 'crisps-app',
            cilentToken: this.setCode(),
          }
        )
        .then((res) => {
          console.log('res')
          this.$cookies.set('userId', res.data.imUserId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 99999, // 过期时间
          })
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    setCode() {
      const timeStamp = new Date().getTime()
      return Math.ceil(timeStamp * Math.random(1, 3) * 1e4).toString(16)
      // return Math.ceil(timeStamp + Math.random() * 1e12).toString(16)
    },
    async getPlanner() {
      this.cityData = await this.$getPositonCity()
      console.log('this.cityData', this.cityData)
      // 获取用户唯一标识
      let deviceId = await this.$getFinger()
      console.log('deviceId', deviceId)
      deviceId = '0022ef1a-f685-469a-93a8-5409892207a2'
      // console.log('deviceId', deviceId)
      this.$axios
        .get(recPlaner, {
          params: {
            limit: 10,
            page: 1,
            area:
              this.cityData.code === 200 ? this.cityData.data.code : '510000', // 区域编码
            deviceId, // 设备ID
            level_2_ID: 'FL20201211090003', // 二级产品分类   推广页广告位数据下的产品详情的parentClassCode "parentClassCode": "FL20201224136014,FL20201224136034,FL20201224136037",// "parentClassName": "工商/工商注册/有限公司注册",
            // login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型 必须 产品类型	（交易：FL20201116000003，服务：FL20201116000002）写死
            sceneId: 'app-ghsdgye-01', // 场景ID
            // user_id: this.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            // productId: this.proDetail.id, // 产品id 非必填pp"
            // "productId":"607991482841724751"
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.planners = res.data.records
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    chat() {
      this.$root.$emit(
        'openNewIMM',
        '7659559901430190080',
        '何翔',
        '48159462',
        'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png'
      )
    },
  },
}
</script>

<style></style>
