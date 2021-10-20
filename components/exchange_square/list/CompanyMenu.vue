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
      <TrademarkGood :list="productList" />
      <DefaultImg v-if="productList.length === 0"></DefaultImg>
    </sp-list>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List, Sticky } from '@chipspc/vant-dgg'
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
      loading: false,
      finished: false,
      isAlive: true,
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
    onLoad() {
      console.log('触底了.........')
      if (this.finished && !this.loading) return
      if (this.pageNum !== 1) {
        this.getProductList()
      }
    },
    getFilterHandle(data, name) {
      console.log(data, name)
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
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取产品列表
    getProductList() {
      this.loading = true
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
            this.loading = false
            if (this.pageNum === 1) {
              res.data.filters.forEach((item, index) => {
                console.log(1212313123)
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
            } else {
              this.productList.push(...res.data.goods.records)
            }
            this.pageNum++
            if (res.data.goodes.records.length < 10) {
              this.loading = false
              this.finished = true
            }
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
