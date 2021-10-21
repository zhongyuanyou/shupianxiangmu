<template>
  <div class="selection-page">
    <!-- 搜索 -->
    <headerSearch />
    <!-- tabs -->
    <div class="tabs">
      <sp-tabs v-model="active">
        <sp-tab
          v-for="(item, index) in tabList"
          :key="index"
          :title="item"
          :name="index"
        >
        </sp-tab>
        <CompanyMenu :active="active" :list="companyList" />
      </sp-tabs>
    </div>
    <div class="lable-list">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-if="list.length !== 0">
          <TrademarkGood v-show="active == 1" :list="list"></TrademarkGood>
          <CompanyGood
            v-show="active == 0 || active == 2 || active == 3"
            :list="list"
            :active="active"
          ></CompanyGood>
        </div>
        <DefaultImg v-else />
      </sp-list>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
import CompanyGood from '@/components/exchange_square/CompanyGood.vue'
import DefaultImg from '@/components/common/DefaultImg.vue'
import TrademarkGood from '@/components/exchange_square/TrademarkGood.vue'
import CompanyMenu from '~/components/exchange_square/list/CompanyMenu.vue'
import headerSearch from '@/components/common/head/headerSearch.vue'
import { newSpreadApi } from '@/api/spread'
export default {
  components: {
    CompanyGood,
    headerSearch,
    DefaultImg,
    TrademarkGood,
    [Tab.name]: Tab,
    [List.name]: List,
    [Tabs.name]: Tabs,
    CompanyMenu,
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
      ], // 商品数据
      loading: false,
      finished: false,
      companyList: ['Industry', 'Region', 'Price', 'More', 'Sortord'],
      active: 0,
<<<<<<< HEAD
      tabList: ['公司交易', '商标交易', '专利交易', '资质并购'],
      typeList: [],
      typeName: {
        0: '公司',
        1: '商标',
        2: '专利',
        3: '资质',
      },
      classCode: {},
=======
      tabList: ['公司交易', '商标交易', '专利交易'],
>>>>>>> 5cbc21c7b560879b8cd1f2dfeeebabd857f04b33
    }
  },
  watch: {
    active() {
      if (this.active === 0) {
        this.companyList = ['Industry', 'Region', 'Price', 'More', 'Sortord']
      }
      if (this.active === 1) {
        this.companyList = [
          'Category',
          'Combination',
          'Price',
          'More',
          'Sortord',
        ]
      }
      if (this.active === 2) {
        this.companyList = ['Classify', 'Industry', 'Price', 'State', 'Sortord']
      }
      this.typeChange()
    },
  },
  created() {
    this.getType()
  },
  methods: {
    onLoad() {
      // this.finished = true
    },
    typeChange() {
      this.typeList.forEach((element) => {
        if (element.name === this.typeName[this.active]) {
          this.classCode = element
          // this.params.classCode = this.classCode.ext4
          // this.params.dictCode = this.classCode.code
          this.getProductList()
        }
      })
    },
    getProductList() {
      if (this.finished) return
      this.$axios
        .post(newSpreadApi.product_list, {
          classCode: this.classCode.ext4,
          dictCode: this.classCode.code,
          fieldList: [],
          limit: 10,
          needTypes: 1,
          searchKey: '',
          start: this.pageNum,
          statusList: ['PRO_STATUS_LOCKED', 'PRO_STATUS_PUT_AWAY'],
        })
        .then((res) => {
          if (res.code === 200) {
            // console.log(res.data.goods.records)
            this.list = res.data.goods?.records || []
            this.list.forEach((item) => {
              item.fieldList.forEach((ele) => {
                // 注册区域
                if (ele.fieldCode === 'registration_area')
                  item.registration_area = ele.fieldValue
                // 实缴资本
                if (ele.fieldCode === 'paid_in_capital')
                  item.paid_in_capital = ele.fieldValue
                // 经营时间
                if (ele.fieldCode === 'business_age_limit')
                  item.business_age_limit = ele.fieldValue
                // 纳税类型
                if (ele.fieldCode === 'taxpayer_type')
                  item.taxpayer_type = ele.fieldValue
                // 注册资本
                if (ele.fieldCode === 'registered_capital')
                  item.registered_capital = ele.fieldValue
                // 所属行业
                if (ele.fieldCode === 'company_industry')
                  item.company_industry = ele.fieldValue
              })
            })
            // if (this.pageNum === 1) {
            //   res.data.filters.forEach((item, index) => {
            //     if (item.name === '状态') {
            //       this.stateList = item.children
            //     } else if (item.name === '行业') {
            //       this.classList = item.children
            //     } else if (item.name === '价格') {
            //       this.priceList = item.children
            //     } else if (item.name === '类型') {
            //       this.typeList = item.children
            //     } else if (item.name === '排序') {
            //       this.sortList = item.children
            //     }
            //   })
            //   this.productList = res.data.goods.records
            // } else {
            //   res.data.goods.records.forEach((ele) => {
            //     this.productList.push(ele)
            //   })
            // }
            // if (res.data.goodes.records.length < 10) {
            //   this.finished = true
            // }
            // this.pageNum++
          } else {
            this.finished = true
          }
          this.$xToast.hideLoading()
        })
        .catch((err) => {
          console.log(err)
          this.finished = true
        })
    },
    getType() {
      this.$axios
        .get(newSpreadApi.type_list, {
          params: {
            code: 'CONDITION-JY',
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.typeList = res.data
            this.typeChange()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    search(value) {
      console.log(25555)
      console.log(value)
    },
  },
}
</script>

<style lang="less" scoped>
.selection-page {
  height: 100vh;
  display: flex;
  background: #f5f5f5;
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
