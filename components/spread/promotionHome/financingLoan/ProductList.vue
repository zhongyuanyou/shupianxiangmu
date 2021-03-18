<template>
  <div>
    <div class="my-component">
      <sp-tabs
        v-model="activeTabIndex"
        sticky
        title-active-color="#222222"
        title-inactive-color="#555555"
        offset-top="1.28rem"
        background="#f5f5f5"
      >
        <sp-tab v-for="(item, index) of tabList" :key="index">
          <!-- S 自定义选项显示-->
          <template #title>
            <div class="tab-title">
              <span>{{ item.tabTitle }}</span>
            </div>
          </template>
          <!-- E 自定义选项显示-->

          <!-- S 产品列表-->
          <sp-list
            v-model="isLoading"
            :finished="isNoMoreData"
            finished-text=""
            class="list-content"
            @load="getMoreData"
          >
            <ProductItem
              v-for="(product, index) in item.productList"
              :key="index"
              :product="product"
            ></ProductItem>
          </sp-list>
          <!-- E 产品列表-->
        </sp-tab>
      </sp-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
import ProductItem from '@/components/spread/promotionHome/financingLoan/ProductItem.vue'
import { chipSpread } from '~/api/spread'

export default {
  name: 'Products',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    ProductItem,
  },
  data() {
    return {
      // @-- 分页
      pageNumber: 1,
      pageSize: 15,

      // @-- 滚动触底后加载更多数据
      isLoading: false, // 是否加载
      isNoMoreData: false, // 是否无更多数据

      // @-- 选项卡
      // 选项卡列表：每个选项包含自身的产品列表
      tabList: [
        {
          tabTitle: '精选贷款',
          productList: [
            {
              title: '社保贷',
              desc: '手续简单，审批快',
              price: 100000,
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/ffstsanrd2w0000.png',
              url: '',
              labels: ['月利率低至0.35%', '贷款期限最长24期'],
            },
            {
              title: '房产贷',
              desc: '手续简单，审批快',
              price: 1000000,
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/1is1vs26hzmo000.png',
              url: '',
              labels: ['月利率低至0.35%', '贷款期限最长24期'],
            },
            {
              title: '抵押贷',
              desc: '手续简单，审批快',
              price: 10000000,
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/2c2r7yl5vesk000.png',
              url: '',
              labels: ['月利率低至0.35%', '贷款期限最长24期'],
            },
            {
              title: '信用贷',
              desc: '手续简单，审批快',
              price: 1000,
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/bi7cv8pjm7s0000.png',
              url: '',
              labels: ['月利率低至0.35%', '贷款期限最长24期'],
            },
          ],
        },
      ],
      activeTabIndex: '',
    }
  },
  created() {},
  mounted() {
    // this.getProductData()
  },
  methods: {
    // 滚动触底后，调用接口获取更多数据
    getMoreData() {
      if (this.isNoMoreData) return
      this.pageNumber++
      // this.getProductData()
      this.isLoading = false

      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.tabList[0].productList.push({
      //       title: '社保贷' + ++this.tabList[0].productList.length,
      //       desc: '手续简单，审批快',
      //       price: 1000,
      //       img: 'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
      //       url: '',
      //       labels: ['月利率低至0.35%', '贷款期限最长24期'],
      //     })
      //   }
      //   this.isLoading = false
      //   if (this.tabList[0].productList.length > 15) {
      //     this.isNoMoreData = true
      //   }
      // }, 2000)
    },
    async getProductData() {
      if (this.isNoMoreData) return
      // const url =
      //   'http://172.16.132.70:7001/service/nk/chipSpread/v1/productList.do'
      try {
        const res = await this.$axios.get(`${chipSpread.list}`, {
          // const res = await this.$axios.get(url, {
          params: {
            classCodes: 'FL20201224136207',
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
          },
        })
        this.isLoading = false
        if (res.code === 200) {
          const arr = res.data.records
          for (let i = 0; i < arr.length; i++) {
            // 处理产品标签
            const labels = []
            arr.forEach((item, index) => {
              if (index < 3) {
                labels.push(item.name)
              }
            })
            // 处理产品基础信息
            this.tabList[0].productList.push({
              title: arr[i].name,
              desc: arr[i].productDescription,
              price: arr[i].referencePrice,
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/6671aj4ro3g0000.png',
              url: '',
              labels,
            })

            // 显示无更多数据
            if (this.tabList[0].productList.length > this.totalCount) {
              this.isNoMoreData = true
            }
          }
        }
      } catch (error) {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  .tab-title {
    font-size: 32px;
    font-weight: bold;
    color: #222222;
    line-height: 36px;
  }
  .list-content {
    margin: 0 20px;
  }

  // 设置整个tabs的高度
  ::v-deep.sp-tabs__wrap {
    padding: 0 20px;
    height: 96px;
  }
  // 让tab从做到右显示且不自适应宽度，不居中显示
  ::v-deep.sp-tab {
    flex: none;
    justify-content: flex-start;
    margin-right: 40px;
    padding: 0;
  }
  // 隐藏选择后的提示线
  ::v-deep.sp-tabs__line {
    display: none;
  }

  // 当tabs滚动置顶时，将背景色改成白色
  ::v-deep.sp-tabs__nav--line {
    background-color: transparent !important;
  }
  ::v-deep.sp-sticky--fixed {
    background-color: #fff;
  }
}
</style>
