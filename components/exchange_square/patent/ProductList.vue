<template>
  <div class="product-list">
    <div class="title">全部资源</div>
    <sp-sticky :offset-top="56" @scroll="scroll">
      <div
        class="tabs"
        :style="{
          background: isFixed ? '#fff' : '',
          borderTop: isFixed ? '0.5px solid #f5f5f5' : '',
        }"
      >
        <sp-dropdown-menu>
          <sp-dropdown-item
            :title="tabList[0]"
            active-color="#4974F5"
            :title-class="
              tabList[0] !== '类型' ? 'sp-dropdown-menu__title--active' : ''
            "
          >
            <div class="type-list">
              <div
                v-for="(type, idx) in typeList"
                :key="idx"
                :class="[typeActive === idx ? 'type_item-active' : 'type_item']"
                @click="chooseType(idx)"
              >
                {{ type.name }}
              </div>
            </div>
          </sp-dropdown-item>
          <sp-dropdown-item :title="tabList[1]">
            <div class="class-list">
              <div
                v-for="(classItem, classIdx) in classList"
                :key="classIdx"
                :class="[
                  classActive === classIdx ? 'class-item-active' : 'class-item',
                ]"
                @click="chooseClass(classIdx)"
              >
                {{ classItem.name }}
              </div>
            </div>
          </sp-dropdown-item>
          <sp-dropdown-item :title="tabList[2]">
            <div class="class-list">
              <div
                v-for="(priceItem, priceIdx) in priceList"
                :key="priceIdx"
                :class="[
                  priceActive === priceIdx ? 'class-item-active' : 'class-item',
                ]"
                @click="choosePrice(priceIdx)"
              >
                {{ priceItem.name }}
              </div>
            </div>
          </sp-dropdown-item>
          <sp-dropdown-item :title="tabList[3]">
            <div class="sorting-list">
              <div
                v-for="(stateItem, stateIdx) in stateList"
                :key="stateIdx"
                @click="chooseState(stateIdx)"
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
          <sp-dropdown-item :title="tabList[4]">
            <div class="sorting-list">
              <div
                v-for="(sortItem, sortIdx) in sortList"
                :key="sortIdx"
                @click="chooseSort(sortIdx)"
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
    <div class="list">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ProductCard
          v-for="(pro, proIdx) in productList"
          :key="proIdx"
          :product="pro"
          type="patent"
        ></ProductCard>
      </sp-list>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List, Sticky } from '@chipspc/vant-dgg'
import ProductCard from '@/components/exchange_square/common/ProductCard.vue'
import { newSpreadApi } from '@/api/spread'
export default {
  name: 'PatentProductList',
  components: {
    ProductCard,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    [Sticky.name]: Sticky,
  },
  data() {
    return {
      loading: false,
      finished: false,
      tabList: ['类型', '分类', '价格', '状态', '排序'],
      typeList: [], // 类型分类
      classList: [], // 分类列表
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
    }
  },
  created() {
    this.getType()
  },
  methods: {
    onLoad() {},
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
            if (this.pageNum === 1) {
              res.data.filters.forEach((item, index) => {
                if (item.name === '状态') {
                  this.stateList = item.children
                } else if (item.name === '行业') {
                  this.classList = item.children
                } else if (item.name === '价格') {
                  this.priceList = item.children
                } else if (item.name === '类型') {
                  this.typeList = item.children
                } else if (item.name === '排序') {
                  this.sortList = item.children
                }
              })
              this.productList = res.data.goods.records
            } else {
              res.data.goods.records.forEach((ele) => {
                this.productList.push(ele)
              })
            }
            if (res.data.goodes.records.length < 10) {
              this.finished = true
            }
            this.pageNum++
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
    chooseType(idx) {
      this.$emit('chooseType')
      this.typeActive = idx
      if (idx !== 0) {
        this.tabList[this.tabActive] = this.typeList[idx].name
      } else {
        this.tabList[this.tabActive] = '类型'
      }
    },

    // 分类选项
    chooseClass(idx) {
      this.$emit('chooseClass')
      this.classActive = idx
      if (idx !== 0) {
        this.tabList[this.tabActive] = this.classList[idx].name
      } else {
        this.tabList[this.tabActive] = '分类'
      }
    },
    // 价格选择
    choosePrice(idx) {
      this.$emit('choosePrice')
      this.priceActive = idx
      if (idx !== 0) {
        this.tabList[this.tabActive] = this.priceList[idx].name
      } else {
        this.tabList[this.tabActive] = '价格'
      }
    },
    // 排序选择
    chooseState(index) {
      this.stateActive = index
      this.$emit('chooseState')
      console.log(index)
      if (index !== 0) {
        this.tabList[this.tabActive] = this.stateList[index].name
      } else {
        this.tabList[this.tabActive] = '状态'
      }
    },
    // 排序选择
    chooseSort(index) {
      this.sortActive = index
      this.$emit('chooseSort')

      if (index !== 0) {
        this.tabList[this.tabActive] = this.sortList[index].name
      } else {
        this.tabList[this.tabActive] = '排序'
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
      color: #222222;
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
