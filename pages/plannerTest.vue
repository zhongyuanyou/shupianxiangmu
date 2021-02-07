<template>
  <div>
    <p>code:{{ cityData.code }},name:{{ cityData.name }}</p>
    <button @click="getPlanner">getPlanner</button>
  </div>
</template>

<script>
import { recPlaner } from '@/api/spread/'
import getUserSign from '~/utils/fingerprint'
import { getPositonCity } from '@/utils/position'
export default {
  data() {
    return {
      cityData: {
        code: 500,
      },
    }
  },
  methods: {
    async getPlanner() {
      // 获取用户唯一标识
      const deviceId = await getUserSign()
      console.log('deviceId', deviceId)
      this.cityData = await getPositonCity()
      console.log('cityData', this.cityData)
      this.$axios
        .get(recPlaner, {
          params: {
            limit: 10,
            page: 1,
            area: this.cityData.code === 200 ? this.cityData.code : '120100', // 区域编码
            deviceId, // 设备ID
            level_2_ID: 'FL20201224136034', // 二级产品分类   推广页广告位数据下的产品详情的parentClassCode "parentClassCode": "FL20201224136014,FL20201224136034,FL20201224136037",// "parentClassName": "工商/工商注册/有限公司注册",
            // login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型 必须
            sceneId: 'app-cpxqye-01', // 场景ID
            // user_id: this.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            // productId: this.proDetail.id, // 产品id 非必填
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
  },
}
</script>

<style></style>
