<template>
  <div class="list">
    <!-- 头部 S -->
    <Header :title="title"></Header>
    <!-- 头部 E -->
    <!-- banner S -->
    <sp-sticky :offset-top="44">
      <div class="banner-box">
        <div class="banner">
          <div class="tab-bar">
            <div class="tabs">
              <div
                v-for="(item, index) in tabList"
                :key="index"
                class="tab"
                @click="tabChooes(item, index)"
              >
                {{ item.title }}
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
          <div class="msg-box">
            <div class="msg-title">今日<br />热门商品</div>
            <div class="desc">按发布时间计算</div>
          </div>
        </div>
      </div>
    </sp-sticky>
    <!-- banner E -->
    <!-- 商品列表 S -->
    <div class="product-list">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ProductCard
          v-for="(pro, proIdx) in productList.list"
          :key="proIdx"
          :type="cardType"
        ></ProductCard>
      </sp-list>
    </div>
    <!-- 商品列表 E -->
  </div>
</template>

<script>
import { List, Sticky } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header.vue'
import ProductCard from '@/components/exchange_square/common/ProductCard.vue'
import { newSpreadApi } from '@/api/spread'
export default {
  components: {
    Header,
    [List.name]: List,
    [Sticky.name]: Sticky,
    ProductCard,
  },
  data() {
    return {
      title: '热门上新',
      tabList: [],
      tabActve: 0,
      loading: false,
      finished: false,
      info: '',
      code: '',
      productList: [],
      cardType: 'patent',
    }
  },
  created() {
    this.info = this.$route.query
    this.title = this.info.title
    console.log(this.info)
  },
  mounted() {
    this.getType()
  },
  methods: {
    onLoad() {},
    tabChooes(item, idx) {
      this.tabActve = idx
      this.finished = false
      this.getProductList(item.ids)
    },
    getType() {
      this.$axios
        .get(newSpreadApi.list, {
          params: {
            locationCodes: '',
            navCodes: '',
            code: this.info.code,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            res.data.classList.forEach((item) => {
              const obj = {
                title: item.name,
                code: item.code,
                ids: item.ext2 && item.ext2.split(','),
                children: item.children,
              }
              this.tabList.push(obj)
            })
            this.getProductList(this.tabList[0].ids)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProductList(code) {
      if (this.finished) return
      this.$axios
        .post(newSpreadApi.ranking_list, {
          ids: { list: code },
        })
        .then((res) => {
          if (res.code === 200) {
            this.finished = true
            this.productList = res.data
            console.log(this.productList)
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
.list {
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
  .banner-box {
    margin-top: 1px;
    width: 100%;
    height: 404px;

    background: url('https://cdn.shupian.cn/sp-pt/wap/images/f9wg22n846o0000.png');
    background-size: 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
    position: relative;
    .banner {
      padding-top: 47px;
      width: 100%;
      height: 100%;
      position: absolute;
      background-image: linear-gradient(
        67deg,
        #d52527 0%,
        rgba(213, 40, 41, 0.76) 48%,
        rgba(213, 43, 43, 0.4) 100%,
        rgba(213, 43, 43, 0.4) 100%
      );
    }
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
    .msg-box {
      position: absolute;
      left: 48px;
      bottom: 56px;
      .msg-title {
        font-size: 62px;
        color: #ffffff;
        line-height: 80px;
        font-weight: bold;
      }
      .desc {
        margin-top: 13px;
        color: #ffffff;
        line-height: 26px;
        font-size: 26px;
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
