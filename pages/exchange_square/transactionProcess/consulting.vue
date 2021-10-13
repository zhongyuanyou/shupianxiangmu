<template>
  <div class="consulting">
    <!-- 头部 S-->
    <Header :title="title"></Header>
    <div class="list">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ConsultingItem
          v-for="(item, index) in consultingList"
          :key="index"
          :consulting="item"
        ></ConsultingItem>
      </sp-list>
    </div>
    <!-- 头部 E -->
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header.vue'
import ConsultingItem from '@/components/exchange_square/transactionProcess/ConsultingItem.vue'
export default {
  name: 'Consulting',
  components: {
    Header,
    [List.name]: List,
    ConsultingItem,
  },
  data() {
    return {
      title: '公司交易',
      loading: false,
      finished: false,
      info: '',
      consultingList: [
        {
          title:
            '山西房产科技有限公司房产科技有限公司山西房产科技有限公司房产科技有限公司山西房…',
          author: '吴镇宇 · 2021-06-24',
        },
        {
          title: '山西房产科技有限公司房产科技有限公司山西',
          author: '吴镇宇 · 2021-06-24',
        },
        {
          title:
            '山西房产科技有限公司房产科技有限公司山西房产科技有限公司房产科技有限公司山西房…',
          author: '吴镇宇 · 2021-06-24',
        },
        {
          title: '山西房产科技有限公司房产科技有限公司山西',
          author: '吴镇宇 · 2021-06-24',
        },
      ],
    }
  },
  created() {
    this.info = this.$route.query
    this.title = this.info.title
  },
  methods: {
    onLoad() {},
  },
}
</script>

<style lang="less" scoped>
.consulting {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding-bottom: 36px;
  ::v-deep.my-head {
    box-shadow: none;
  }
}
</style>
