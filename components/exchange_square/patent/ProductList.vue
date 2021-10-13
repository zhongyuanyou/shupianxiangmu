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
            v-for="(item, index) in tabList"
            :key="index"
            :title="item"
            @open="tabChoose(index)"
          >
            <div v-if="index === 0" class="type-list">
              <div
                v-for="(type, idx) in typeList"
                :key="idx"
                :class="[typeActive === idx ? 'type_item-active' : 'type_item']"
                @click="chooseType(idx)"
              >
                {{ type }}
              </div>
            </div>
            <div v-if="index === 1" class="class-list">
              <div
                v-for="(classItem, classIdx) in classList"
                :key="classIdx"
                :class="[
                  classActive === classIdx ? 'class-item-active' : 'class-item',
                ]"
                @click="chooseClass(classIdx)"
              >
                {{ classItem }}
              </div>
            </div>
            <div v-if="index === 2" class="class-list">
              <div
                v-for="(priceItem, priceIdx) in priceList"
                :key="priceIdx"
                :class="[
                  priceActive === priceIdx ? 'class-item-active' : 'class-item',
                ]"
                @click="choosePrice(priceIdx)"
              >
                {{ priceItem }}
              </div>
            </div>
            <div v-if="index === 3" class="sorting-list">
              <div
                v-for="(sortItem, sortIdx) in sortList"
                :key="sortIdx"
                @click="chooseSort(sortIdx)"
              >
                <div
                  :class="[sortActive === sortIdx ? 'sort-active ' : 'sort']"
                >
                  {{ sortItem }}
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
        <ProductCard v-for="i in 10" :key="i" type="patent"></ProductCard>
      </sp-list>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List, Sticky } from '@chipspc/vant-dgg'
import ProductCard from '@/components/exchange_square/common/ProductCard.vue'
export default {
  name: 'patent-product-list',
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
      tabList: ['类型', '分类', '价格', '排序'],
      typeList: [
        '不限',
        '发明专利',
        '实用新型',
        '发明专利',
        '实用新型',
        '发明专利',
        '实用新型',
        '发明专利',
        '实用新型',
        '发明专利',
        '实用新型实用新型实用新型',
      ],
      classList: [
        '不限',
        '01-化工原料',
        '02-颜料油漆',
        '01-化工原料',
        '02-颜料油漆',
        '01-化工原料',
        '02-颜料油漆',
        '01-化工原料',
        '02-颜料油漆',
        '01-化工原料',
        '02-颜料油漆',
      ],
      priceList: [
        '不限',
        '3000元以下',
        '3000元-1万',
        '1万-3万',
        '3万-5万',
        '5万以上',
      ],
      sortList: ['综合', '最新发布', '价格从低到高', '价格从高到低'],
      tabActive: -1,
      typeActive: -1, // 类型选中下标
      classActive: -1, // 分类选中下标
      priceActive: -1, // 价格选择下标
      sortActive: 0, // 排序选中下标
      isFixed: false, // 是否吸顶
    }
  },
  methods: {
    onLoad() {},
    tabChoose(idx) {
      this.tabActive = idx
    },
    close() {
      console.log(51414)
    },
    // 类型选择
    chooseType(idx) {
      this.$emit('chooseType')
      this.typeActive = idx
      this.tabList[this.tabActive] = this.typeList[idx]
    },

    // 分类选项
    chooseClass(idx) {
      this.$emit('chooseClass')
      this.classActive = idx
      this.tabList[this.tabActive] = this.classList[idx]
    },
    // 价格选择
    choosePrice(idx) {
      this.$emit('choosePrice')
      this.priceActive = idx
      this.tabList[this.tabActive] = this.priceList[idx]
    },
    // 排序选择
    chooseSort(index) {
      this.sortActive = index
      this.$emit('chooseSort')
      this.tabList[this.tabActive] = this.sortList[index]
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
  ::v-deep.sp-dropdown-menu__bar {
    box-shadow: none;
    height: 88px;
    background: transparent;
    padding: 0 40px;
    .sp-dropdown-menu__item {
      flex-shrink: 0;
      flex: none;
      width: 145px;
      margin-right: 25px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .sp-dropdown-menu__title {
      max-width: 128px;
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
