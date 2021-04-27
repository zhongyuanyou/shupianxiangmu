<template>
  <div>
    <div v-if="!isCompanyTransactionPage" ref="goodItem" class="my-component">
      <div class="item-img"><img :src="data.imageUri" /></div>
      <div class="item-content">
        <p class="item-title">{{ data.trademarkName }}</p>
        <div class="item-tabs">
          <span v-for="(item, index) in tabs" :key="index" class="item-tab">
            {{ item }}
          </span>
        </div>
        <div class="item-notes">
          <span class="item-note">
            {{ `${data.firstCategoryId}类-${data.firstCategoryName}` }}
          </span>
        </div>
        <p class="item-price">
          <span class="item-price-num">{{ data.sellPrice }}</span>
          <span class="item-price-unit">元</span>
        </p>
        <div class="item-divide"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodItem',
  props: {
    good: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      // @-- 页面滚动方向和位置
      scrollAction: { x: 'undefined', y: 'undefined' },
      scrollDirection: '',
      // @-- 商品浏览埋点规则：页面向下滚动且该商品显示时，进行商品浏览埋点。页面向上滚动时不埋点。再次向下滚动，又进行埋点。
      isMd: false,
      // @-- 是否是公司交易聚合页
      isCompanyTransactionPage: false,
      tabs: ['品质商标', '即买即用'],
    }
  },
  computed: {
    data() {
      // 处理数据
      const obj = this.good
      const item = JSON.parse(JSON.stringify(obj))
      return item
    },
  },
  // created() {
  //   // 根据路由判断是否是公司交易聚合页
  //   if (this.$route.path.indexOf('companyTransaction') > 0) {
  //     this.isCompanyTransactionPage = true
  //   } else {
  //     this.isCompanyTransactionPage = false
  //   }
  // },
  mounted() {
    // 只有公司交易聚合页有商品浏览埋点
    if (this.isCompanyTransactionPage) {
      try {
        window.addEventListener('scroll', this.scrollMd) // 监听滚动
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 40px 0px 20px 0px;
  .item-img {
    flex: none;
    width: 190px;
    height: 190px;
    margin-right: 28px;
    img {
      width: 190px;
      height: 190px;
    }
  }
  .item-content {
    flex: none;
    width: calc(100% - 200px);
    .item-title {
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 32px;
    }
    .item-tabs {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;
      .item-tab {
        font-size: 22px;
        font-weight: 400;
        color: #5c7499;
        line-height: 22px;
        height: 32px;
        background: #f0f2f5;
        border-radius: 4px;
        display: flex;
        padding: 6px 8px;
        margin-right: 12px;
        margin-bottom: 6px;
      }
    }
    .item-notes {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .item-note {
        font-size: 22px;
        font-weight: 400;
        color: #222222;
        line-height: 22px;
      }
    }
    .item-price {
      font-size: 22px;
      font-weight: 400;
      color: #ec5330;
      line-height: 36px;
      .item-price-num {
        font-size: 36px;
        line-height: 36px;
      }
    }
    .item-divide {
      height: 1px;
    }
    .item-recommend {
      display: flex;
      align-items: center;
      .item-recommend-img {
        width: 28px;
        height: 28px;
        margin-right: 12px;
        img {
          width: 28px;
          height: 28px;
        }
      }

      .item-recommend-text {
        font-size: 22px;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 22px;
        display: flex;
      }
    }
  }
}
</style>
