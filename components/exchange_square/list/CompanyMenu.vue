<template>
  <div class="dropdown-list">
    <sp-sticky v-if="list.length !== 0" :offset-top="top" @scroll="scrollEvent">
      <sp-dropdown-menu
        v-if="isAlive"
        active-color="#4974f5"
        :style="{ background: background }"
      >
        <component
          :is="item"
          v-for="item in list"
          :key="item.id"
          :type-obj="typeObj"
          :class-obj="classObj"
          :price-list="priceList"
          :state-list="stateList"
          :sort-list="sortList"
          :more-list="moreList"
          :region-list="regionList"
          :category-obj="categoryObj"
          :combination-obj="combinationObj"
          @activeItem="getFilterHandle"
        />
      </sp-dropdown-menu>
    </sp-sticky>

    <!-- 列表 -->
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <TrademarkGood v-show="active == 1" :list="productList" />
      <CompanyGood
        v-show="active == 0 || active == 2 || active == 3"
        :list="productList"
        :active="0"
      />
      <DefaultImg
        v-if="!loading && productList.length === 0"
        :info="info"
      ></DefaultImg>
    </sp-list>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List, Sticky } from '@chipspc/vant-dgg'
import CompanyGood from '@/components/exchange_square/CompanyGood.vue'
import { newSpreadApi } from '@/api/spread'
import { isArray } from '~/utils/check-types'
import TrademarkGood from '@/components/exchange_square/TrademarkGood.vue'
import DefaultImg from '@/components/common/DefaultImg.vue'
export default {
  components: {
    DefaultImg,
    Industry: () => import('./Industry.vue'), // 行业
    Region: () => import('./Region.vue'), // 地区
    Price: () => import('./Price.vue'), // 价格
    Sortord: () => import('./Sortord.vue'), // 排序
    More: () => import('./More.vue'), //  更多
    Category: () => import('./Category.vue'), //  分类
    Classify: () => import('./Classify.vue'), //  类型
    State: () => import('./State.vue'), //  状态
    Type: () => import('./Type.vue'), //  类型
    Combination: () => import('./Combination.vue'), // 组合
    [List.name]: List,
    [Sticky.name]: Sticky,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    TrademarkGood,
    CompanyGood,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
      default: 0,
    },
    info: {
      type: String,
      default: '没有找到相关结果，换个关键词试试吧',
    },
    background: {
      type: String,
      default: 'none',
    },
    top: {
      type: Number,
      default: 56,
    },
  },
  data() {
    return {
      loading: true,
      finished: false,
      isAlive: true,
      isEmpty: false,
      classCode: '',
      pageNum: 1,
      stateList: [], // 状态
      classObj: {}, // 行业
      priceList: [], // 价格
      typeObj: {}, // 类型
      sortList: [], // 排序 //
      moreList: [], // 更多 //
      regionList: [], // 地区
      categoryObj: {}, // 分类
      combinationObj: {}, // 组合
      productList: [], // 商品列表
      params: {
        classCode: '',
        dictCode: '',
        fieldList: [],
        limit: 10,
        needTypes: 1,
        searchKey: '',
        start: 1,
        statusList: ['PRO_STATUS_LOCKED', 'PRO_STATUS_PUT_AWAY'],
      },
    }
  },
  watch: {
    active() {
      this.pageNum = 1
      this.productList = []
      this.getType()
      this.isAlive = false
      this.$nextTick(() => (this.isAlive = true))
    },
    // 筛选
    'params.searchKey': {
      handler() {
        this.pageNum = 1
        this.productList = []
        this.getProductList()
      },
    },
  },
  mounted() {
    this.getType()
  },

  methods: {
    // 触底加载
    onLoad() {
      console.log('触底了.........')
      if (this.finished && !this.loading) return
      if (this.isEmpty) {
        this.loading = false
        return
      }
      if (this.pageNum !== 1) {
        this.getProductList()
      }
    },
    // 筛选
    getFilterHandle(data, name) {
      // 分类 ， 组合, 状态
      if (
        ['Csategory', 'Combination', 'Industry', 'State', 'Type'].includes(name)
      ) {
        // 清除
        this.params.fieldList = this.params.fieldList.filter(
          (item) => item.fieldCode !== data.fieldCode
        )
        if (data.fieldValue[0] !== '不限') {
          this.params.fieldList.push(data)
        }
      }
      // 地区
      if (name === 'Region') {
        this.params.fieldList = this.params.fieldList.filter(
          (item) => item.fieldCode !== data.fieldCode
        )
        if (data.fieldValue && data.fieldValue.length)
          this.params.fieldList.push(data)
      }
      // 价格
      if (name === 'Price') {
        this.params.platformPriceEnd = data.platformPriceEnd
        this.params.platformPriceStart = data.platformPriceStart
      }
      // 更多
      if (name === 'More') {
        // 字符
        this.params.nameLengthStart = data.nameLengthEnd
        this.params.nameLengthStart = data.nameLengthStart
        data.emitArr.forEach((ele) => {
          this.params.fieldList = this.params.fieldList.filter(
            (item) => item.fieldCode === ele.fieldCode
          )
        })
        data.emitArr.forEach((item) => {
          if (item.fieldValue) this.params.fieldList.push(item)
        })
        // this.params.fieldLis = this.params.fieldList.concat(data.emitArr)
      }
      // 排序
      if (name === 'Sortrd') {
        // 排序
        this.params.sortBy = data.sortBy
      }
      this.pageNum = 1
      this.productList = []
      this.getProductList()
    },
    scrollEvent(e) {
      this.$emit('scrollEvent', e.isFixed)
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
            res.data.forEach((element) => {
              if (element.name === '公司' && this.active === 0) {
                this.classCode = element
              }
              if (element.name === '商标' && this.active === 1) {
                this.classCode = element
              }
              if (element.name === '专利' && this.active === 2) {
                this.classCode = element
              }
            })
            this.getProductList()
            this.loading = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 获取产品列表
    getProductList() {
      this.loading = true
      this.isEmpty = false
      this.params.classCode = this.classCode.ext4
      this.params.dictCode = this.classCode.code
      this.params.start = this.pageNum
      this.$axios.post(newSpreadApi.product_list, this.params).then((res) => {
        if (res.code === 200) {
          this.loading = false
          if (this.pageNum === 1) {
            res.data.filters.forEach((item, index) => {
              if (item.name === '状态') {
                this.stateList = item.children
              } else if (item.name === '行业') {
                this.classObj = item
              } else if (item.name === '价格') {
                this.priceList = item.children
              } else if (item.name === '排序') {
                this.sortList = item.children
              } else if (item.name === '更多') {
                this.moreList = item.children
              } else if (item.name === '地区') {
                this.setRegionList(item.children)
              } else if (item.name === '分类') {
                this.categoryObj = item
              } else if (item.name === '组合') {
                this.combinationObj = item
              } else if (item.name === '类型') {
                this.typeObj = item
              }
            })
            this.productList = res.data.goods.records || []
          } else if (this.params.dictCode === 'CONDITION-JY-SB') {
            this.productList = this.getWaterfall(
              this.productList,
              res.data.goods.records
            )
          } else {
            this.productList.push(...(res.data.goods?.records || []))
          }
          const list = res.data.goods.records || []
          // 为空时
          if (list.length === 0) {
            this.isEmpty = true
            this.finished = false
          }
          // 数据不满足10条时
          if (list.length !== 0 && list.length < 10) {
            this.loading = false
            this.finished = true
          }
          this.productList.forEach((item) => {
            item.fieldList.forEach((ele) => {
              // 注册区域
              if (ele.fieldCode === 'registration_area')
                item.registration_area = ele.fieldValueCn
              // 实缴资本
              if (ele.fieldCode === 'paid_in_capital')
                item.paid_in_capital = ele.fieldValueCn
              // 经营时间
              if (ele.fieldCode === 'business_age_limit')
                item.business_age_limit = ele.fieldValueCn
              // 纳税类型
              if (ele.fieldCode === 'taxpayer_type')
                item.taxpayer_type = ele.fieldValueCn
              // 注册资本
              if (ele.fieldCode === 'registered_capital')
                item.registered_capital = ele.fieldValueCn
              // 所属行业
              if (ele.fieldCode === 'company_industry')
                item.company_industry = ele.fieldValueCn
              // 申请日期
              if (ele.fieldCode === 'date_of_application')
                item.date_of_application = ele.fieldValueCn
              // 到期日期
              if (ele.fieldCode === 'expire_date')
                item.expire_date = ele.fieldValueCn
              // 专利状态
              if (ele.fieldCode === 'patent_status')
                item.patent_status = ele.fieldValueCn
              // 专利到期
              if (ele.fieldCode === 'validity_of_certificate')
                item.validity_of_certificate = ele.fieldValueCn
              // 专利类型
              if (ele.fieldCode === 'patent_type')
                item.patent_type = ele.fieldValueCn
            })
          })
          // 自加
          this.pageNum++
        } else {
          this.loading = false
          this.finished = true
        }
      })
    },
    // 处理地区
    setRegionList(list) {
      list.forEach((item) => {
        item.text = item.name
        item.id = item.code
        if (isArray(item.children)) {
          item.children.forEach((obj) => {
            obj.text = obj.name
            obj.id = obj.code
            if (isArray(obj.children)) {
              obj.children.forEach((data) => {
                data.text = data.name
                data.id = data.code
                data.show = false
              })
              obj.children.unshift({ text: '不限', id: 0, show: true })
            }
          })
          item.children.unshift({
            text: '不限',
            id: 0,
            children: [
              {
                text: '不限',
                id: 0,
                show: true,
              },
            ],
          })
        }
      })
      this.regionList = list
    },
    // 商标数据转换
    getWaterfall(originalData = [], newData = []) {
      // originalData 原有数据 newData 需要新增数据
      let data
      const odata = originalData
      const ndata = newData
      if (originalData.length === 0) {
        data = ndata
      } else {
        const olength = odata.length
        const nlength = ndata.length
        const obefore = odata.slice(0, Math.ceil(olength / 2))
        const oafter = odata.slice(Math.ceil(olength / 2), olength)
        const nbefore = ndata.slice(0, Math.ceil(nlength / 2))
        const nafter = ndata.slice(Math.ceil(nlength / 2), nlength)
        data = [...obefore, ...nbefore, ...oafter, ...nafter]
      }
      return data
    },
  },
}
</script>

<style lang="less" scoped>
.sp-dropdown-menu__title--active {
  color: #4974f5;
  font-weight: bold;
}
::v-deep .sp-dropdown-menu__title {
  max-width: 160px;
}
::v-deep .sp-dropdown-menu__bar {
  box-shadow: none;
}
</style>
