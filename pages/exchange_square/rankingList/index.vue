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
          <div class="btn" @click="goMore('热门上新', 'CRISPS-C-JYPHB-RMSX')">
            查看更多
          </div>
          <div class="icon">
            <my-icon
              class="back-icon"
              name="youce"
              size="0.14rem"
              color="#999999"
              @click.native="goMore('热门上新', 'CRISPS-C-JYPHB-RMSX')"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ProductCard
          v-for="(hot, index) in productList.hot"
          :key="index"
          :product="hot"
          type="monthly"
        ></ProductCard>
      </div>
      <div class="title-box">
        <div class="title">低价捡漏</div>
        <div class="more-box">
          <div class="btn" @click="goMore('底价捡漏', 'CRISPS-C-DJJLB')">
            查看更多
          </div>
          <div class="icon">
            <my-icon
              class="back-icon"
              name="youce"
              size="0.14rem"
              color="#999999"
              @click.native="goMore('底价捡漏', 'CRISPS-C-DJJLB')"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ProductCard
          v-for="(price, index) in productList.price"
          :key="index"
          :product="price"
          type="monthly"
        ></ProductCard>
      </div>
      <div class="title-box">
        <div class="title">高人气</div>
        <div class="more-box">
          <div class="btn" @click="goMore('高人气', 'CRISPS-C-SCRQB')">
            查看更多
          </div>
          <div class="icon">
            <my-icon
              class="back-icon"
              name="youce"
              size="0.14rem"
              color="#999999"
              @click.native="goMore('高人气', 'CRISPS-C-SCRQB')"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ProductCard
          v-for="(collection, index) in productList.collection"
          :key="index"
          :product="collection"
          type="monthly"
        ></ProductCard>
      </div>
      <div class="title-box">
        <div class="title">高热搜</div>
        <div class="more-box">
          <div class="btn" @click="goMore('高热搜', 'CRISPS-C-SPRSB')">
            查看更多
          </div>
          <div class="icon">
            <my-icon
              class="back-icon"
              name="youce"
              size="0.14rem"
              color="#999999"
              @click.native="goMore('高热搜', 'CRISPS-C-SPRSB')"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ProductCard
          v-for="(goods, index) in productList.goods"
          :key="index"
          :product="goods"
          type="monthly"
        ></ProductCard>
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
    goMore(type, codes) {
      this.$router.push({
        path: '/exchange_square/rankingList/list',
        query: { title: type, code: codes },
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
    getField(item, type) {
      let key = ''
      item.forEach((ele) => {
        if (ele.fieldCode === type) {
          key = ele.fieldValueCn
        }
      })
      if (type === 'registered_capital') {
        if (key < 500000) {
          return '50万以下'
        } else if (key < 1000000) {
          return '50-100万'
        } else if (key < 5000000) {
          return '100-500万'
        } else if (key < 10000000) {
          return '500-1000万'
        } else {
          return '1000万以上'
        }
      } else if (type === 'business_age_limit') {
        if (key === '') return '-'
        if (key < 1) return '1年以下'
        if (key >= 1 && key < 3) return '1-3年'
        if (key >= 3 && key < 5) return '3-5年'
        if (key >= 5) return '5年以上'
      } else {
        return key
      }
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
            res.data.hot.forEach((item, index) => {
              item.areaValue = this.getField(
                item.fieldList,
                'registration_area'
              ) // 注册区域
              item.ageLimitValue = this.getField(
                item.fieldList,
                'business_age_limit'
              ) // 经营时间
              item.taxpayerTypeValue = this.getField(
                item.fieldList,
                'taxpayer_type'
              ) // 纳税类型
              item.capitalValue = this.getField(
                item.fieldList,
                'registered_capital'
              ) // 注册资本
              item.industryValue = this.getField(
                item.fieldList,
                'company_industry'
              ) // 所属行业
            })
            res.data.price.forEach((item, index) => {
              item.areaValue = this.getField(
                item.fieldList,
                'registration_area'
              ) // 注册区域
              item.ageLimitValue = this.getField(
                item.fieldList,
                'business_age_limit'
              ) //
              item.taxpayerTypeValue = this.getField(
                item.fieldList,
                'taxpayer_type'
              )
              item.capitalValue = this.getField(
                item.fieldList,
                'registered_capital'
              )
              item.industryValue = this.getField(
                item.fieldList,
                'company_industry'
              )
            })
            res.data.collection.forEach((item, index) => {
              item.areaValue = this.getField(
                item.fieldList,
                'registration_area'
              ) // 注册区域
              item.ageLimitValue = this.getField(
                item.fieldList,
                'business_age_limit'
              ) //
              item.taxpayerTypeValue = this.getField(
                item.fieldList,
                'taxpayer_type'
              )
              item.capitalValue = this.getField(
                item.fieldList,
                'registered_capital'
              )
              item.industryValue = this.getField(
                item.fieldList,
                'company_industry'
              )
            })
            res.data.goods.forEach((item, index) => {
              item.areaValue = this.getField(
                item.fieldList,
                'registration_area'
              ) // 注册区域
              item.ageLimitValue = this.getField(
                item.fieldList,
                'business_age_limit'
              ) //
              item.taxpayerTypeValue = this.getField(
                item.fieldList,
                'taxpayer_type'
              )
              item.capitalValue = this.getField(
                item.fieldList,
                'registered_capital'
              )
              item.industryValue = this.getField(
                item.fieldList,
                'company_industry'
              )
            })
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
