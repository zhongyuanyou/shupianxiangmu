<template>
  <div class="product-list">
    <sp-list
      v-model="loading"
      :finished="finished"
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
      productList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6at0si4uxz80000.png', // 商品图片
          title: '这是两行列表标题这是列表标题这是列表标题', // 商品名称
          desc: '这是描述信息，默认展示一行', // 商品描述
          label: ['月利息低至0.35%', '贷款期限最长24期'], // 商品标签
          price: '100', // 最高可贷金额
          classCodeLevel: '', // 商品的一级分类
          classCode: '', // 商品分类
          id: '', // 商品id
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6at0si4uxz80000.png', // 商品图片
          title: '这是单行列表标题', // 商品名称
          desc: '这是描述信息，默认展示一行', // 商品描述
          label: ['月利息低至0.35%', '贷款期限最长24期'], // 商品标签
          price: '100', // 最高可贷金额
          classCodeLevel: '', // 商品的一级分类
          classCode: '', // 商品分类
          id: '', // 商品id
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6at0si4uxz80000.png', // 商品图片
          title: '这是两行列表标题这是列表标题这是列表标题', // 商品名称
          desc: '这是描述信息，默认展示一行', // 商品描述
          label: ['月利息低至0.35%', '贷款期限最长24期'], // 商品标签
          price: '100', // 最高可贷金额
          classCodeLevel: '', // 商品的一级分类
          classCode: '', // 商品分类
          id: '', // 商品id
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6at0si4uxz80000.png', // 商品图片
          title: '这是两行列表标题这是列表标题这是列表标题', // 商品名称
          desc: '这是描述信息，默认展示一行', // 商品描述
          label: ['月利息低至0.35%', '贷款期限最长24期'], // 商品标签
          price: '100', // 最高可贷金额
          classCodeLevel: '', // 商品的一级分类
          classCode: '', // 商品分类
          id: '', // 商品id
        },
      ],
      loading: false,
      finished: false,
    }
  },
  methods: {
    onLoad() {
      console.log('请求数据')
      this.finished = true
    },
  },
}
</script>
<style lang="less" scoped>
.product-list {
  width: 100%;
}
</style>
