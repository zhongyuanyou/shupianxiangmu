<template>
  <div class="consult">
    <Title title="企服专家咨询" />
    <planner-swipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
    />
  </div>
</template>

<script>
import Title from '~/components/spread/businessCancellation/Title'
import PlannerSwipe from '~/components/spread/businessCancellation/PlannerSwipe'

export default {
  components: {
    Title,
    PlannerSwipe,
  },
  props: {
    plannersData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      plannersCommon: {
        title: '咨询规划师',
        imName: '工商注销_咨询规划师_在线咨询',
        telName: '工商注销_咨询规划师_拨打电话',
      },
    }
  },
}
</script>
<style lang="less" scoped>
.consult {
  padding: 33px 40px 32px;
}
.planner {
  margin-left: -40px;
  margin-top: -33px;
}
</style>
