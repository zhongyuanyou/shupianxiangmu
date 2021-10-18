<template>
  <div class="ranking-list">
    <!-- 头部S -->
    <Header title="查看排行榜"></Header>
    <!-- 头部E -->
    <!-- 排行榜 S -->
    <Monthly></Monthly>
    <!-- 排行榜 E -->
    <div class="list">
      <div class="title-box">
        <div class="title">热门上新</div>
        <div class="more-box">
          <div class="btn" @click="goMore('热门上新')">查看更多</div>
          <div class="icon">
            <my-icon
              class="back-icon"
              name="youce"
              size="0.14rem"
              color="#999999"
              @click.native="goMore('热门上新')"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ProductCard v-for="i in 3" :key="i" type="monthly"></ProductCard>
      </div>
      <div class="title-box">
        <div class="title">底价捡漏</div>
        <div class="more-box">
          <div class="btn" @click="goMore('底价捡漏')">查看更多</div>
          <div class="icon">
            <my-icon
              class="back-icon"
              name="youce"
              size="0.14rem"
              color="#999999"
              @click.native="goMore('底价捡漏')"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ProductCard v-for="i in 3" :key="i" type="monthly"></ProductCard>
      </div>
      <div class="title-box">
        <div class="title">高人气</div>
        <div class="more-box">
          <div class="btn" @click="goMore('高人气')">查看更多</div>
          <div class="icon">
            <my-icon
              class="back-icon"
              name="youce"
              size="0.14rem"
              color="#999999"
              @click.native="goMore('高人气')"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ProductCard v-for="i in 3" :key="i" type="monthly"></ProductCard>
      </div>
      <div class="title-box">
        <div class="title">高热搜</div>
        <div class="more-box">
          <div class="btn" @click="goMore('高热搜')">查看更多</div>
          <div class="icon">
            <my-icon
              class="back-icon"
              name="youce"
              size="0.14rem"
              color="#999999"
              @click.native="goMore('高热搜')"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ProductCard v-for="i in 3" :key="i" type="monthly"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/head/header.vue'
import Monthly from '@/components/exchange_square/rankingList/Monthly.vue'
import ProductCard from '@/components/exchange_square/common/ProductCard.vue'
export default {
  name: 'rankingList',
  components: {
    Header,
    Monthly,
    ProductCard,
  },
  methods: {
    goMore(type) {
      this.$router.push({
        path: '/exchange_square/rankingList/list',
        query: { title: type, code: '1111' },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.ranking-list {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  .list {
    padding-bottom: 60px;
    ::v-deep.card {
      border: 1px solid #dddddd;
    }
    .title-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      margin: 48px 0 20px;
      .title {
        font-size: 36px;
        color: #222222;
        font-weight: bold;
      }
      .more-box {
        display: flex;
        align-items: center;
        .btn {
          font-size: 22px;
          color: #999999;
          line-height: 44px;
        }
        .icon {
          line-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
