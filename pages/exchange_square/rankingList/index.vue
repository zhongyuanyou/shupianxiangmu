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
        <div class="title">低价捡漏</div>
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
import { newSpreadApi } from '@/api/spread'
export default {
  components: {
    Header,
    Monthly,
    ProductCard,
  },
  data() {
    return {
      typeList: [],
      productList: '',
      type: '',
    }
  },
  created() {},
  mounted() {
    this.getTypeList()
  },
  methods: {
    goMore(type) {
      this.$router.push({
        path: '/exchange_square/rankingList/list',
        query: { title: type, code: '1111' },
      })
    },
    getTypeList() {
      this.$axios
        .get(newSpreadApi.list, {
          params: {
            locationCodes: '',
            navCodes: '',
            code: 'CRISPS-C-JYPHB',
          },
        })
        .then((res) => {
          if (res.code === 200) {
            res.data.classList.forEach((item) => {
              const obj = {
                title: item.ext1,
                code: item.code,
                ids: item.ext2 && item.ext2.split(','),
                children: item.children,
              }
              this.typeList.push(obj)
            })
            this.getProductList()
            console.log(this.typeList)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProductList() {
      this.$axios
        .post(newSpreadApi.ranking_list, {
          ids: {
            hot: this.typeList[0].ids,
            price: this.typeList[1].ids,
            collection: this.typeList[2].ids,
            goods: this.typeList[3].ids,
          },
        })
        .then((res) => {
          if (res.code === 200) {
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
