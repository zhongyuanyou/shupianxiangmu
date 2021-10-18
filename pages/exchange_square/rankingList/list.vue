<template>
  <div class="list">
    <!-- 头部 S -->
    <Header :title="title"></Header>
    <!-- 头部 E -->
    <!-- banner S -->
    <div class="banner-box">
      <div class="tab-bar">
        <div class="tabs">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            class="tab"
            @click="tabChooes(index)"
          >
            {{ item }}
          </div>
        </div>
        <div :class="['line', `line${tabActve + 1}`]"></div>
      </div>
      <div class="hot-img">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/2w5uh72o72a0000.png"
          alt=""
        />
      </div>
    </div>
    <!-- banner E -->
    <!-- 商品列表 S -->
    <div class="product-list">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ProductCard v-for="i in 10" :key="i" type="ualification"></ProductCard>
      </sp-list>
    </div>
    <!-- 商品列表 E -->
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header.vue'
import ProductCard from '@/components/exchange_square/common/ProductCard.vue'
export default {
  components: {
    Header,
    [List.name]: List,
    ProductCard,
  },
  data() {
    return {
      title: '热门上新',
      tabList: ['公司', '商标', '专利', '资质'],
      tabActve: 0,
      loading: false,
      finished: false,
      info: '',
    }
  },
  created() {
    this.info = this.$route.query
    this.title = this.info.title
  },
  methods: {
    onLoad() {},
    tabChooes(idx) {
      this.tabActve = idx
    },
  },
}
</script>

<style lang="less" scoped>
.list {
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
  .banner-box {
    margin-top: 1px;
    width: 100%;
    height: 404px;
    padding-top: 47px;
    background-image: linear-gradient(
      67deg,
      #d52527 0%,
      rgba(213, 40, 41, 0.76) 48%,
      rgba(213, 43, 43, 0.4) 100%,
      rgba(213, 43, 43, 0.4) 100%
    );
    position: relative;
    .hot-img {
      width: 168px;
      height: 194px;
      position: absolute;
      bottom: 34px;
      right: 40px;
      font-size: 0;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .tab-bar {
      width: 100%;
      padding: 0 93px;
      position: relative;
      .tabs {
        display: flex;
        align-items: center;
        width: 100%;
        .tab {
          font-size: 32px;
          color: #ffffff;
          font-weight: bold;
          margin-right: 100px;
          width: 64px;
        }
        .tab:last-child {
          margin-right: 0;
        }
      }
      .line {
        position: absolute;
        width: 36px;
        height: 6px;
        background: #ffffff;
        border-radius: 3px;
        bottom: -16px;
        transition: all 0.5s;
      }
      .line1 {
        left: 106px;
      }
      .line2 {
        left: 272px;
      }
      .line3 {
        left: 434px;
      }
      .line4 {
        left: 598px;
      }
    }
  }
  .product-list {
    width: 100%;
    margin-top: 20px;
    padding-bottom: 40px;
  }
}
</style>
