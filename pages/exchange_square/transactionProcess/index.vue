<template>
  <div class="transaction-process">
    <!-- 头部 S -->
    <Header title="查看买卖流程"></Header>
    <!-- 头部 E -->
    <!-- banner S -->
    <Banner></Banner>
    <!-- banner E -->
    <!-- 买卖流程列表  s-->
    <ConsultingList
      v-if="company && company.list && company.list.length"
      :consulting="company"
    ></ConsultingList>
    <ConsultingList
      v-if="trademark && trademark.list && trademark.list.length"
      :consulting="trademark"
    ></ConsultingList>
    <ConsultingList
      v-if="patent && patent.list && patent.list.length"
      :consulting="patent"
    ></ConsultingList>
    <ConsultingList
      v-if="qualification && qualification.list && qualification.list.length"
      :consulting="qualification"
    ></ConsultingList>
    <!-- 买卖流程列表  e-->
  </div>
</template>

<script>
import Header from '@/components/common/head/header.vue'
import Banner from '@/components/exchange_square/transactionProcess/Banner.vue'
import ConsultingList from '@/components/exchange_square/transactionProcess/ConsultingList.vue'
import { spreadApi } from '@/api/spread'
export default {
  components: {
    Header,
    Banner,
    ConsultingList,
  },
  data() {
    return {
      company: {},
      trademark: {},
      patent: {},
      qualification: {},
    }
  },
  mounted() {
    this.classifyList()
  },
  methods: {
    async classifyList() {
      this.qualification = await this.articleQuery('ConditionJyZzbg') // 资质并购
      this.patent = await this.articleQuery('ConditionJyZl') // 专利交易
      this.trademark = await this.articleQuery('ConditionJySb') // 商标交易
      this.company = await this.articleQuery('ConditionJyGs') // 公司交易
    },
    articleQuery(code) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(spreadApi.knowledge_list, {
            params: {
              limit: 2,
              categoryCode: code,
              page: 1,
            },
          })
          .then((res) => {
            if (res.code === 200) {
              if (res.data.rows && res.data.rows.length > 0) {
                resolve(this.manageList(res.data.rows, code))
              }
              return
            }
            resolve([])
          })
      }).catch((res) => {})
    },
    // 处理不同类型数据
    manageList(Arr, codes) {
      let title = ''
      if (codes === 'ConditionJyZzbg') {
        title = '资质并购'
      } else if (codes === 'ConditionJyZl') {
        title = '专利交易'
      } else if (codes === 'ConditionJySb') {
        title = '商标交易'
      } else if (codes === 'ConditionJyGs') {
        title = '公司交易'
      }
      const listObj = {
        titles: title,
        code: codes,
        list: Arr,
      }
      // this.typeList.push(listObj)
      return listObj
    },
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
