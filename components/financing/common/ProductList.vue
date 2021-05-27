<template>
  <div class="product-list">
    <sp-list
      v-model="loading"
      :finished="finished"
      :offset="200"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ProductItem
        v-for="(item, index) in productList"
        :key="index"
        :item="item"
      ></ProductItem>
    </sp-list>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import ProductItem from './ProductItem'

export default {
  components: {
    ProductItem,
    [List.name]: List,
  },
  props: {},
  data() {
    return {
      productList: [],
      loading: false,
      finished: false,
      start: 1,
    }
  },
  methods: {
    onLoad() {
      if (this.finished) return
      this.loading = true
      const url =
        'http://127.0.0.1:7001/service/nk/newChipSpread/v1/service_product_list.do'
      this.$axios
        .get(url, {
          params: {
            classCodes: 'FL20210425164558',
            start: this.start,
            limit: 15,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.start++
            this.loading = false
            res.data.records.forEach((ele) => {
              this.productList.push(ele)
            })
          }
          if (res.data.records.length < 15) {
            this.finished = true
            this.loading = false
          }
        })
    },
  },
}
</script>
<style lang="less" scoped>
.product-list {
  width: 100%;
}
</style>
