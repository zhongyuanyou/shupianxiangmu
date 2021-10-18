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
import { spreadApi } from '@/api/spread'
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
      consultingList: [],
      pageNumber: 1,
    }
  },
  created() {
    this.info = this.$route.query
    this.title = this.info.title
  },
  mounted() {},
  methods: {
    onLoad() {
      this.getList()
    },
    getList() {
      if (this.finished) return
      this.$axios
        .get(spreadApi.knowledge_list, {
          params: {
            limit: 10,
            categoryCode: this.info.code,
            page: this.pageNumber,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.pageNumber++
            if (res.data.rows && res.data.rows.length > 0) {
              if (this.page === 1) {
                this.consultingList = res.data.rows
              } else {
                res.data.rows.forEach((item) => {
                  this.consultingList.push(item)
                })
              }
              if (res.data.rows.length < 10) {
                this.finished = true
              }
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
  .list {
    height: calc(100vh - 88px - 36px);
  }
}
</style>
