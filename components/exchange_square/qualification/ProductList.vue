<template>
  <div class="product-list">
    <div class="title">全部资源</div>
    <sp-sticky :offset-top="56" @scroll="scroll">
      <div
        class="tabs"
        :style="{
          background: isFixed ? '#fff' : '',
          borderTop: isFixed ? '0.5px solid #f5f5f5' : '',
        }"
      >
        <sp-dropdown-menu>
          <sp-dropdown-item
            v-for="(item, index) in tabList"
            :key="index"
            :title="item"
            @open="tabChoose(index)"
          >
          </sp-dropdown-item>
        </sp-dropdown-menu>
      </div>
    </sp-sticky>
    <div class="list">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ProductCard v-for="i in 4" :key="i" type="ualification"></ProductCard>
        <div class="entrust">
          <div class="entrust-title">考虑资质并购？我们可以帮你</div>
          <div class="entrust-desc">在线估价，委托，专属顾问攻略一条龙服务</div>
        </div>
      </sp-list>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List, Sticky } from '@chipspc/vant-dgg'
import ProductCard from '@/components/exchange_square/common/ProductCard.vue'
export default {
  name: 'ProductList',
  components: {
    ProductCard,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    [Sticky.name]: Sticky,
  },
  data() {
    return {
      loading: false,
      finished: false,
      isFixed: false,
      tabList: ['类别', '等级', '地区', '更多'],
    }
  },
  methods: {
    // 判断是否吸顶
    scroll(e) {
      this.isFixed = e.isFixed
      this.$emit('scroll', e)
    },
    tabChoose(idx) {
      this.tabActive = idx
    }, // 导航选择
  },
}
</script>
<style lang="less" scoped>
.product-list {
  width: 100vw;
  .title {
    width: 100%;
    padding: 0 20px;
    font-size: 32px;
    color: #222222;
    font-weight: bold;
    line-height: 44px;
  }
  .list {
    .entrust {
      padding: 40px 40px 20px 40px;
      .entrust-title {
        width: 100%;
        font-size: 40px;
        color: #000000;
        text-align: center;
        font-weight: bold;
      }
      .entrust-desc {
        width: 100%;
        margin-top: 12px;
        font-size: 28px;
        color: #999999;
        text-align: center;
      }
    }
  }
  ::v-deep.sp-dropdown-menu__bar {
    box-shadow: none;
    height: 88px;
    background: transparent;
    padding: 0 40px;
    .sp-dropdown-menu__item {
      flex-shrink: 0;
      flex: none;
      width: 145px;
      margin-right: 25px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .sp-dropdown-menu__title {
      max-width: 128px;
    }
    .sp-ellipsis {
      font-size: 28px;
      color: #222222;
    }
  }
}
</style>
