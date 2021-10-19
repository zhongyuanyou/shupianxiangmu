<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <headerSearch />
    <!-- 筛选 -->
    <CompanyMenu
      :list="['Category', 'Classify', 'Price', 'State', 'Sortord']"
    />
    <div class="lable-list">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-if="list.length !== 0">
          <TrademarkGood :list="list" :active="0"></TrademarkGood>
        </div>
        <DefaultImg v-else />
      </sp-list>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
import TrademarkGood from '@/components/exchange_square/TrademarkGood.vue'
import DefaultImg from '@/components/common/DefaultImg.vue'
import headerSearch from '@/components/common/head/headerSearch.vue'
import CompanyMenu from '~/components/exchange_square/list/CompanyMenu.vue'
export default {
  components: {
    TrademarkGood,
    CompanyMenu,
    headerSearch,
    DefaultImg,
    [Tab.name]: Tab,
    [List.name]: List,
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      list: [
        {
          name: '大庆****建筑装饰工程有限责任公司',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****建',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
      ], // 商品数据
      loading: false,
      finished: false,
    }
  },
  methods: {
    onLoad() {
      this.finished = true
    },
  },
}
</script>

<style lang="less" scoped>
.selection-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .lable-list {
    overflow-y: auto;
    flex: 1;
  }
}
.tabs {
  margin-top: 10px;
  ::v-deep .sp-tabs__line {
    width: 28px;
    height: 6px;
    background: #4974f5;
    border-radius: 3px;
  }
  ::v-deep .sp-tab--active {
    font-weight: bold;
    color: #222222 !important;
  }
  ::v-deep .sp-tab {
    color: #999999;
    font-size: 30px;
  }
}
</style>
