<template>
  <div class="product-list">
    <div v-if="showTitle" class="title">全部资源</div>
    <sp-sticky :offset-top="fiexdHeight" @scroll="scroll">
      <div
        class="tabs"
        :style="{
          background: isFixed || fixed ? '#fff' : '',
          borderTop: isFixed ? '0.5px solid #f5f5f5' : '',
          borderTop: fixed ? '' : '',
        }"
      >
        <sp-dropdown-menu>
          <sp-dropdown-item
            ref="type"
            :title="tabList[0]"
            :title-class="
              tabList[0] !== '类型' ? 'sp-dropdown-menu__title--active' : ''
            "
          >
            <div class="type-list">
              <div
                v-for="(type, idx) in typeList"
                :key="idx"
                :class="[typeActive === idx ? 'type_item-active' : 'type_item']"
                @click="chooseType(idx, type)"
              >
                {{ type.name }}
              </div>
            </div>
          </sp-dropdown-item>
          <sp-dropdown-item
            ref="class"
            :title="tabList[1]"
            :title-class="
              tabList[1] !== '分类' ? 'sp-dropdown-menu__title--active' : ''
            "
          >
            <div class="class-list">
              <div
                v-for="(classItem, classIdx) in classList"
                :key="classIdx"
                :class="[
                  classActive === classIdx ? 'class-item-active' : 'class-item',
                ]"
                @click="chooseClass(classIdx, classItem)"
              >
                {{ classItem.name }}
              </div>
            </div>
          </sp-dropdown-item>
          <sp-dropdown-item
            ref="price"
            :title="tabList[2]"
            :title-class="
              tabList[2] !== '价格' ? 'sp-dropdown-menu__title--active' : ''
            "
          >
            <div class="class-list">
              <div
                v-for="(priceItem, priceIdx) in priceList"
                :key="priceIdx"
                :class="[
                  priceIdx === priceActive ? 'class-item-active' : 'class-item',
                ]"
                @click="choosePrice(priceIdx, priceItem)"
              >
                {{ priceItem.name }}
              </div>
            </div>
          </sp-dropdown-item>
          <sp-dropdown-item
            ref="state"
            :title="tabList[3]"
            :title-class="
              tabList[3] !== '状态' ? 'sp-dropdown-menu__title--active' : ''
            "
          >
            <div class="sorting-list">
              <div
                v-for="(stateItem, stateIdx) in stateList"
                :key="stateIdx"
                @click="chooseState(stateIdx, stateItem)"
              >
                <div
                  :class="[stateActive === stateIdx ? 'sort-active ' : 'sort']"
                >
                  {{ stateItem.name }}
                </div>
                <div v-show="stateActive === stateIdx" class="check-icon">
                  <my-icon
                    class="icon"
                    name="tab_ic_check"
                    size="0.32rem"
                    color="#4974F5"
                  ></my-icon>
                </div>
              </div>
            </div>
          </sp-dropdown-item>
          <sp-dropdown-item
            ref="sort"
            :title="tabList[4]"
            :title-class="
              tabList[4] !== '排序' ? 'sp-dropdown-menu__title--active' : ''
            "
          >
            <div class="sorting-list">
              <div
                v-for="(sortItem, sortIdx) in sortList"
                :key="sortIdx"
                @click="chooseSort(sortIdx, sortItem)"
              >
                <div
                  :class="[sortActive === sortIdx ? 'sort-active ' : 'sort']"
                >
                  {{ sortItem.name }}
                </div>
                <div v-show="sortActive === sortIdx" class="check-icon">
                  <my-icon
                    class="icon"
                    name="tab_ic_check"
                    size="0.32rem"
                    color="#4974F5"
                  ></my-icon>
                </div>
              </div>
            </div>
          </sp-dropdown-item>
        </sp-dropdown-menu>
      </div>
    </sp-sticky>
    <div class="list" :style="{ marginTop: fixed ? '10px' : '' }">
      <sp-list
        v-model="loading"
        :finished="finished"
        :finished-text="productList.length ? '没有更多了' : ''"
        @load="onLoad"
      >
        <sp-skeleton
          :loading="productList.length === 0 && loading"
          title
          :row="8"
        >
          <div>
            <ProductCard
              v-for="(pro, proIdx) in productList"
              :key="proIdx"
              :product="pro"
              type="patent"
            ></ProductCard>
          </div>
        </sp-skeleton>
        <div
          v-if="productList.length === 0 && !loading && finished"
          class="default-img"
        >
          <DefaultImg info="没有相关内容"></DefaultImg>
        </div>
      </sp-list>
    </div>
  </div>
</template>

<script>
import {
  DropdownMenu,
  DropdownItem,
  List,
  Sticky,
  Skeleton,
} from '@chipspc/vant-dgg'
import ProductCard from '@/components/exchange_square/common/ProductCard.vue'
import { newSpreadApi } from '@/api/spread'
import DefaultImg from '@/components/common/DefaultImg.vue'
export default {
  name: 'PatentProductList',
  components: {
    ProductCard,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    [Sticky.name]: Sticky,
    DefaultImg,
    [Skeleton.name]: Skeleton,
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    fiexdHeight: {
      type: [String, Number],
      default: 56,
    },
    searchVal: {
      type: [String, Number],
      default: '',
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      tabList: ['类型', '分类', '价格', '状态', '排序'],
      typeList: [], // 类型分类
      classList: [], // 分类列表
      classListCode: '',
      priceList: [], // 价格列表
      stateList: [], // 状态列表
      sortList: [], // 排序列表
      tabActive: 0, // 筛选栏选中下标
      typeActive: 0, // 类型选中下标
      classActive: 0, // 分类选中下标
      priceActive: 0, // 价格选择下标
      sortActive: 0, // 排序选中下标
      stateActive: 0, // 状态选中下标
      isFixed: false, // 是否吸顶
      pageNum: 1, // 请求页数
      productList: [], // 商品列表
      params: {
        classCode: '',
        dictCode: '',
        fieldList: [],
        limit: 10,
        needTypes: 1,
        searchKey: '',
        start: 1,
        sortBy: 1,
        statusList: ['PRO_STATUS_LOCKED', 'PRO_STATUS_PUT_AWAY'],
      },
    }
  },
  watch: {
    searchVal(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.params.start = 1
        this.productList = []
        this.finished = false
        this.params.searchKey = newVal
        this.getProductList()
      }
    },
  },
  created() {
    this.getType()
  },
  methods: {
    onLoad() {
      if (this.params.start !== 1) {
        this.getProductList()
      }
    },
    // 获取筛选分类
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
              if (element.name === '专利') {
                this.classCode = element
                this.params.classCode = this.classCode.ext4
                this.params.dictCode = this.classCode.code
                this.getProductList()
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取产品列表
    getProductList() {
      if (this.finished) return
      this.$axios
        .post(newSpreadApi.product_list, this.params)
        .then((res) => {
          if (res.code === 200) {
            if (this.pageNum === 1) {
              res.data.filters.forEach((item, index) => {
                if (item.name === '状态') {
                  this.stateList = item.children
                } else if (item.name === '行业') {
                  this.classList = item.children
                  this.classListCode = item.ext1
                } else if (item.name === '价格') {
                  this.priceList = item.children
                } else if (item.name === '类型') {
                  this.typeList = item.children
                } else if (item.name === '排序') {
                  this.sortList = item.children
                }
              })
            }
            res.data.goods.records.forEach((ele) => {
              let industry = ''
              let application = ''
              let certificate = ''
              let status = ''
              let type = ''
              ele.fieldList.forEach((field) => {
                if (field.fieldCode === 'patent_industry') {
                  industry = field.fieldValueCn
                }
                if (field.fieldCode === 'patent_date_of_application') {
                  application = field.fieldValueCn
                }
                if (field.fieldCode === 'validity_of_certificate') {
                  certificate = field.fieldValueCn
                }
                if (field.fieldCode === 'patent_status') {
                  status = field.fieldValueCn
                }
                if (field.fieldCode === 'patent_type') {
                  type = field.fieldValueCn
                }
              })
              ele.patentIndustryValue = industry
              ele.applicationValue = application
              ele.certificateValue = certificate
              ele.statusValue = status
              ele.typeValue = type
              this.productList.push(ele)
            })
            if (res.data.goods.records.length < 10) {
              this.finished = true
            }
            this.params.start++
            this.loading = false
          } else {
            this.finished = true
          }
        })
        .catch((err) => {
          console.log(err)
          this.finished = true
        })
    },

    // 类型选择
    chooseType(idx, item) {
      this.$emit('chooseType')
      this.typeActive = idx
      this.$refs.type.toggle()
      this.params.start = 1
      this.productList = []
      this.finished = false
      if (idx !== 0) {
        this.tabList[0] = this.typeList[idx].name
        const objValue = {}
        this.params.fieldList.forEach((res, index) => {
          if (res.fieldCode === 'patent_type') {
            this.params.fieldList.splice(index, 1)
          }
        })
        objValue.fieldCode = item.ext1
        objValue.fieldValue = [item.ext2]
        objValue.matchType = 'MATCH_TYPE_MULTI'
        this.params.fieldList.push(objValue)
        this.getProductList()
      } else {
        this.tabList[0] = '类型'

        if (this.params.fieldList.length === 1) {
          this.params.fieldList = []
        } else {
          this.params.fieldList.forEach((res, index) => {
            if (res.fieldCode === 'patent_industry') {
              this.params.fieldList.splice(index, 1)
            }
          })
        }
        this.getProductList()
      }
    },

    // 分类选项
    chooseClass(idx, item) {
      this.$emit('chooseClass')
      this.$refs.class.toggle()
      this.classActive = idx
      this.finished = false
      this.productList = []
      this.params.start = 1
      if (idx !== 0) {
        this.tabList[1] = this.classList[idx].name
        this.params.fieldList.forEach((res, index) => {
          if (res.fieldCode === this.classListCode) {
            this.params.fieldList.splice(index, 1)
          }
        })
        const objValue = {}
        objValue.fieldCode = this.classListCode
        objValue.fieldValue = [item.name]
        objValue.matchType = 'MATCH_TYPE_MULTI'
        this.params.fieldList.push(objValue)
        this.getProductList()
      } else {
        this.tabList[1] = '分类'
        if (this.params.fieldList.length === 1) {
          this.params.fieldList = []
        } else {
          this.params.fieldList.forEach((res, index) => {
            if (res.fieldCode === this.classListCode) {
              this.params.fieldList.splice(index, 1)
            }
          })
        }
        this.getProductList()
      }
    },
    // 价格选择
    choosePrice(idx, item) {
      this.finished = false
      this.$refs.price.toggle()
      this.$emit('choosePrice')
      this.priceActive = idx
      if (idx !== 0) {
        this.tabList[2] = this.priceList[idx].name
        this.productList = []
        this.params.start = 1
        this.params.platformPriceEnd = item.ext2.split('-')[1] * 1
        this.params.platformPriceStart = item.ext2.split('-')[0] * 1
        this.getProductList()
      } else {
        this.params.start = 1
        this.params.platformPriceEnd = ''
        this.params.platformPriceStart = ''
        this.tabList[2] = '价格'
        this.getProductList()
      }
    },
    // 状态
    chooseState(index, item) {
      console.log(item)
      this.$refs.state.toggle()
      this.finished = false
      this.productList = []
      this.params.start = 1
      this.stateActive = index
      this.$emit('chooseState')
      if (index !== 0) {
        this.params.fieldList.forEach((ele, idx) => {
          if (ele.fieldCode === item.ext1) {
            this.params.fieldList.splice(idx, 1)
          }
        })
        const objValue = {}
        objValue.fieldCode = item.ext1
        objValue.fieldValue = [item.ext2]
        objValue.matchType = 'MATCH_TYPE_MULTI'
        this.params.fieldList.push(objValue)
        this.getProductList()
        this.tabList[3] = this.stateList[index].name
      } else {
        this.tabList[3] = '状态'
        if (this.params.fieldList.length === 1) {
          this.params.fieldList = []
        } else {
          this.params.fieldList.forEach((res, index) => {
            if (res.fieldCode === item.ext1) {
              this.params.fieldList.splice(index, 1)
            }
          })
        }
        this.getProductList()
      }
    },
    // 排序选择
    chooseSort(index, item) {
      console.log(item)
      this.$refs.sort.toggle()
      this.finished = false
      this.productList = []
      this.params.start = 1
      this.sortActive = index
      this.$emit('chooseSort')

      if (index !== 0) {
        this.tabList[4] = this.sortList[index].name
        this.params.sortBy = index + 1
        this.getProductList()
      } else {
        this.params.sortBy = 1
        this.tabList[4] = '排序'
        this.getProductList()
      }
    },
    // 判断是否吸顶
    scroll(e) {
      this.isFixed = e.isFixed
      this.$emit('scroll', e)
    },
  },
}
</script>

<style lang="less" scoped>
.product-list {
  .list {
    .default-img {
      padding-bottom: 30px;
    }
  }
  .title {
    font-size: 32px;
    color: #222222;
    font-weight: bold;
    line-height: 44px;
    margin-bottom: 6px;
    padding: 0 20px;
  }
  .sp-dropdown-menu__title--active {
    color: #4974f5;
    font-weight: 700;
  }
  ::v-deep.sp-dropdown-menu__bar {
    box-shadow: none;
    height: 88px;
    background: transparent;
    // padding: 0 40px;
    padding: 0 18px;
    .sp-dropdown-menu__item {
      flex-shrink: 0;
      flex: none;
      width: 140px;
      //   margin-right: 25px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .sp-dropdown-menu__title {
      max-width: 120px;
    }
    .sp-ellipsis {
      font-size: 28px;
      //   color: #222222;
    }
  }
  .tabs {
    .type-list {
      padding: 56px 20px 56px 40px;
      background: #fff;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      > div {
        margin-right: 23px;
        margin-bottom: 24px;
        width: 149.5px;
        height: 64px;
        border-radius: 4px;
        font-size: 24px;
        line-height: 64px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 16px;
      }
      .type_item {
        background: #f8f8f8;
        color: #222222;
      }
      .type_item-active {
        color: #4974f5;
        background: rgba(73, 116, 245, 0.1);
      }
    }
    .class-list {
      padding: 56px 20px 56px 40px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background: #fff;
      > div {
        padding: 20px 8px;
        width: 206px;
        height: 64px;
        line-height: 24px;
        text-align: center;
        margin-right: 24px;
        margin-bottom: 24px;
        font-size: 24px;
        border-radius: 4px;
      }
      .class-item {
        color: #222222;
        background: #f8f8f8;
      }
      .class-item-active {
        color: #4974f5;
        background: rgba(73, 116, 245, 0.1);
      }
    }
    .sorting-list {
      padding: 32px 0 40px;
      > div {
        width: 100%;
        height: 84px;
        padding: 28px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sort {
          width: 600px;
          line-height: 28px;
          font-size: 28px;
          color: #222222;
        }
        .sort-active {
          width: 600px;
          line-height: 28px;
          font-size: 28px;
          color: #4974f5;
        }
        .check-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
