<template>
  <div>
    <sp-sticky :offset-top="top" @scroll="scrollEvent">
      <sp-dropdown-menu v-if="isAlive" :style="{ background: background }">
        <component
          :is="item"
          v-for="item in list"
          :key="item.id"
          :type-list="typeList"
          :class-list="classList"
          :price-list="priceList"
          :state-list="stateList"
          :sort-list="sortList"
          :more-list="moreList"
          :region-list="regionList"
          :category-list="categoryList"
          :combination-list="combinationList"
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
        :list="list"
        :active="0"
      />
      <DefaultImg v-if="productList && productList.length === 0"></DefaultImg>
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
      classList: [], // 行业
      priceList: [], // 价格
      typeList: [], // 类型
      sortList: [], // 排序
      moreList: [], // 更多
      regionList: [], // 地区
      categoryList: [], // 分类
      combinationList: [], // 组合
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
      this.getType()
      this.isAlive = false
      this.$nextTick(() => (this.isAlive = true))
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
      console.log(data, name)
      this.productList = []
      // 分类 ， 组合
      if (name === 'Csategory' || name === 'Combination') {
        if (this.params.fieldList.length === 0) {
          this.params.fieldList.push(data)
        }
        if (data.fieldValue[0] === '不限') {
          this.params.fieldList.forEach((t, index) => {
            if (t.fieldCode === data.fieldCode) {
              this.params.fieldList.splice(index, 1)
            }
          })
        } else {
          this.params.fieldList.forEach((t, index) => {
            if (t.fieldCode === data.fieldCode) {
              this.params.fieldList[index] = data
            } else {
              this.params.fieldList.push(data)
            }
          })
        }
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
        // 年限
        if (this.params.fieldList.length === 0) {
          this.params.fieldList.push(data.emitData)
        }
        if (!data.emitData.fieldValue.end) {
          this.params.fieldList.forEach((t, index) => {
            if (t.fieldCode === data.emitData.fieldCode) {
              this.params.fieldList.splice(index, 1)
            }
          })
        } else {
          this.params.fieldList.forEach((t, index) => {
            if (t.fieldCode === data.emitData.fieldCode) {
              this.params.fieldList[index] = data.emitData
            } else {
              this.params.fieldList.push(data.emitData)
            }
          })
        }
      }
      // 排序
      if (name === 'Sortrd') {
        // 排序
        this.params.sortBy = data.sortBy
      }
      this.pageNum = 1
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
              console.log('element', element)
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
                this.classList = item.children
              } else if (item.name === '价格') {
                this.priceList = item.children
              } else if (item.name === '类型') {
                console.error(this.typeList)
                this.typeList = item.children
              } else if (item.name === '排序') {
                this.sortList = item.children
              } else if (item.name === '更多') {
                this.moreList = item.children
              } else if (item.name === '地区') {
                this.setRegionList(item.children)
              } else if (item.name === '分类') {
                this.categoryList = item.children
              } else if (item.name === '组合') {
                this.combinationList = item.children
              }
            })
            this.productList = res.data.goods.records
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
          }
          // 数据不满足10条时
          if (list.length !== 0 && list.length < 10) {
            this.loading = false
            this.finished = true
          }
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
      console.log(list)
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
::v-deep .sp-dropdown-menu__title {
  max-width: 160px;
}
::v-deep .sp-dropdown-menu__bar {
  box-shadow: none;
}
</style>
