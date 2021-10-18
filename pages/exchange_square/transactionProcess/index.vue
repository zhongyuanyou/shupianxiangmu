<template>
  <div class="transaction-process">
    <!-- 头部 S -->
    <Header title="查看买卖流程"></Header>
    <!-- 头部 E -->
    <!-- banner S -->
    <Banner></Banner>
    <!-- banner E -->
    <!-- 买卖流程列表  s-->
    <ConsultingList :consulting="company"></ConsultingList>
    <ConsultingList :consulting="trademark"></ConsultingList>
    <ConsultingList :consulting="patent"></ConsultingList>
    <ConsultingList :consulting="qualification"></ConsultingList>
    <!-- 买卖流程列表  e-->
  </div>
</template>

<script>
import Header from '@/components/common/head/header.vue'
import Banner from '@/components/exchange_square/transactionProcess/Banner.vue'
import ConsultingList from '@/components/exchange_square/transactionProcess/ConsultingList.vue'
export default {
  components: {
    Header,
    Banner,
    ConsultingList,
  },
  data() {
    return {
      company: {
        name: '公司交易',
        list: [
          {
            title:
              '山西房产科技有限公司房产科技有限公司山西房产科技有限公司房产科技有限公司山西房…',
            author: '吴镇宇 · 2021-06-24',
          },
          {
            title: '山西房产科技有限公司房产科技有限公司',
            author: '吴镇宇 · 2021-06-24',
          },
        ],
      },
      trademark: {
        name: '商标交易',
        list: [
          {
            title:
              '山西房产科技有限公司房产科技有限公司山西房产科技有限公司房产科技有限公司山西房…',
            author: '吴镇宇 · 2021-06-24',
          },
          {
            title: '山西房产科技有限公司房产科技有限公司',
            author: '吴镇宇 · 2021-06-24',
          },
        ],
      },
      patent: {
        name: '专利交易',
        list: [
          {
            title:
              '山西房产科技有限公司房产科技有限公司山西房产科技有限公司房产科技有限公司山西房…',
            author: '吴镇宇 · 2021-06-24',
          },
          {
            title: '山西房产科技有限公司房产科技有限公司',
            author: '吴镇宇 · 2021-06-24',
          },
        ],
      },
      qualification: {
        name: '资质并购',
        list: [
          {
            title:
              '山西房产科技有限公司房产科技有限公司山西房产科技有限公司房产科技有限公司山西房…',
            author: '吴镇宇 · 2021-06-24',
          },
          {
            title: '山西房产科技有限公司房产科技有限公司',
            author: '吴镇宇 · 2021-06-24',
          },
        ],
      },
    }
  },
}
</script>

<style lang="less" scoped>
.transaction-process {
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
  ::v-deep.my-head {
    box-shadow: none;
  }
  padding-bottom: 64px;
}
</style>
