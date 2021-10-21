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
        <div v-if="cardType !== 'trademark'">
          <ProductCard
            v-for="(pro, proIdx) in productList"
            :key="proIdx"
            :product="pro"
            :type="cardType"
          ></ProductCard>
        </div>
        <div v-else>
          <TrademarkGood :list="productList"></TrademarkGood>
        </div>
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
import TrademarkGood from '@/components/exchange_square/TrademarkGood.vue'
export default {
  components: {
    Header,
    [List.name]: List,
    [Sticky.name]: Sticky,
    ProductCard,
    TrademarkGood,
  },
  data() {
    return {
      title: '热门上新',
      tabList: [],
      tabActve: 0, // tab选中下标
      loading: false,
      finished: false,
      info: '', // 传入参数
      productList: [], // 产品列表
      cardType: 'monthly', // 商品card分类
    }
  },
  created() {
    this.info = this.$route.query
    this.title = this.info.title
  },
  mounted() {
    this.getType()
  },
  methods: {
    onLoad() {},
    tabChooes(item, idx) {
      this.tabActve = idx
      this.finished = false
      window.scrollTo(0, 0)
      if (idx === 0) {
        this.cardType = 'monthly'
      } else if (idx === 1) {
        this.cardType = 'patent'
      } else if (idx === 2) {
        this.cardType = 'trademark'
      }
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
      } else {
        return key
      }
    },
    getProductList(code) {
      if (this.finished) return
      this.$axios
        .post(newSpreadApi.ranking_list, {
          ids: { list: code },
        })
        .then((res) => {
          if (res.code === 200) {
            this.loading = false
            this.finished = true
            if (this.cardType !== 'trademark') {
              res.data.list.forEach((item, index) => {
                item.areaValue = this.getField(
                  item.fieldList,
                  'registration_area'
                ) // 公司交易注册区域
                item.ageLimitValue = this.getField(
                  item.fieldList,
                  'business_age_limit'
                ) // 公司交易经营时间
                item.taxpayerTypeValue = this.getField(
                  item.fieldList,
                  'taxpayer_type'
                ) // 公司交易纳税类型
                item.capitalValue = this.getField(
                  item.fieldList,
                  'registered_capital'
                ) // 公司交易注册资本
                item.industryValue = this.getField(
                  item.fieldList,
                  'company_industry'
                ) // 公司交易所属行业
                item.patentIndustryValue = this.getField(
                  item.fieldList,
                  'patent_industry'
                ) // 专利行业分类
                item.applicationValue = this.getField(
                  item.fieldList,
                  'patent_date_of_application'
                ) // 专利申请日期
                item.certificateValue = this.getField(
                  item.fieldList,
                  'validity_of_certificate'
                ) // 专利有效期
                item.statusValue = this.getField(
                  item.fieldList,
                  'patent_status'
                ) // 专利状态
                item.typeValue = this.getField(item.fieldList, 'patent_type') // 专利类别
              })

              this.productList = res.data.list
            } else {
              res.data.list.forEach((item, index) => {
                const image = this.getField(item.fieldList, 'logo_image')
                item.tag = item.sellLabel
                item.price = item.referencePrice
                item.goodsImg =
                  image ||
                  'https://cdn.shupian.cn/1621252424000_%E5%95%86%E6%A0%87%403x.png'
              })
              this.productList = res.data.list
            }
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
        justify-content: space-between;
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
        left: 356px;
      }
      .line3 {
        left: 610px;
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
