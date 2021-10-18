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
            ref="drop"
            :title="item"
            @open="tabChoose(index)"
          >
            <div v-if="tabActive === 0" class="type-list">
              <div
                v-for="(typeItem, typeIdx) in typeList"
                :key="typeIdx"
                :class="[
                  typeActive === typeIdx ? 'type-item-active' : 'type-item',
                ]"
                @click="typeChooes(typeIdx)"
              >
                {{ typeItem }}
              </div>
            </div>
            <div v-else-if="tabActive === 1" class="type-list">
              <div
                v-for="(levelItem, levelIdx) in levelList"
                :key="levelIdx"
                :class="[
                  levelActive === levelIdx ? 'type-item-active' : 'type-item',
                ]"
                @click="levelChooes(levelIdx)"
              >
                {{ levelItem }}
              </div>
            </div>
            <div v-else-if="tabActive === 2" class="price-list">
              <div class="content">
                <div class="title">价格区间(万)</div>
                <div class="interval">
                  <div class="inp-left">
                    <input
                      v-model="minPrice"
                      type="number"
                      maxlength="30"
                      placeholder="最小"
                    />
                  </div>
                  <div class="to">至</div>
                  <div class="inp-right">
                    <input
                      v-model="maxPrice"
                      type="number"
                      maxlength="30"
                      placeholder="最大"
                    />
                  </div>
                </div>
                <div class="price-item">
                  <div
                    v-for="(priceItem, priceIdx) in prictList"
                    :key="priceIdx"
                    :class="[priceActive === priceIdx ? 'item-active' : 'item']"
                    @click="priceChooes(priceIdx)"
                  >
                    {{ priceItem }}
                  </div>
                </div>
              </div>
              <div class="btn-box">
                <div class="reset">
                  <div class="icon-box">
                    <my-icon
                      name="icon_chongzhi"
                      size="0.40rem"
                      color="#1A1A1A"
                    ></my-icon>
                  </div>
                  <div class="name">重置</div>
                </div>
                <div class="confirm" @click="confirm(2)">确认</div>
              </div>
            </div>
            <div v-else-if="tabActive === 3" class="more-list">
              <div class="more-content">
                <div class="security">
                  <div class="security-title">安全许可证</div>
                  <div class="security-item">
                    <div
                      v-for="(security, securityIdx) in securityList"
                      :key="securityIdx"
                      :class="[
                        securityActive === securityIdx ? 'item-active' : 'item',
                      ]"
                      @click="securityChooes(securityIdx)"
                    >
                      {{ security }}
                    </div>
                  </div>
                </div>
                <div class="area-list">
                  <div class="area-title">
                    <div class="area">地区</div>
                    <div class="all" @click="allChooes">
                      <div
                        class="all-title"
                        :style="{ color: isAll ? '#4974F5' : '#1a1a1a' }"
                      >
                        全部
                      </div>
                      <div class="icon">
                        <my-icon
                          name="duoxuankuangjihuo"
                          size="0.28rem"
                          :color="isAll ? '#4974F5' : '#1a1a1a'"
                        ></my-icon>
                      </div>
                    </div>
                  </div>
                  <div class="area-box">
                    <div
                      v-for="(area, areaIdx) in areaList"
                      :key="areaIdx"
                      :class="[
                        areaActive.indexOf(areaIdx) !== -1
                          ? 'area-item-active'
                          : 'area-item',
                      ]"
                      @click="areaChooes(areaIdx)"
                    >
                      {{ area }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-box">
                <div class="reset">
                  <div class="icon-box">
                    <my-icon
                      name="icon_chongzhi"
                      size="0.40rem"
                      color="#1A1A1A"
                    ></my-icon>
                  </div>
                  <div class="name">重置</div>
                </div>
                <div class="confirm" @click="confirm(3)">确认</div>
              </div>
            </div>
            <div v-if="index === 4" class="sorting-list">
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
        <ProductCard v-for="i in 4" :key="i" type="ualification"></ProductCard>
      </sp-list>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List, Sticky } from '@chipspc/vant-dgg'
import ProductCard from '@/components/exchange_square/common/ProductCard.vue'
export default {
  name: 'ProductList',
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
      isFixed: false,
      tabList: ['类别', '等级', '价格', '更多', '排序'],
      typeList: [
        '不限',
        '总包资质',
        '专包资质',
        '设计资质',
        '监理资质',
        '劳务资质',
      ],
      prictList: [
        '不限',
        '5万以下',
        '5-10万',
        '10-15万',
        '20-50万',
        '50万以上',
      ],
      levelList: ['不限', '特级', '一级', '二级', '三级', '四级'],
      securityList: ['不限', '有', '无'],
      areaList: [
        '不限',
        '北京',
        '安徽',
        '福建',
        '甘肃',
        '广东',
        '广西',
        '贵州',
      ],
      sortList: ['综合', '最新发布', '价格从低到高', '价格从高到低'],
      sortActive: 0, // 排序选中下标
      tabActive: 0,
      typeActive: -1, // 类别选中下标
      levelActive: -1, // 等级选中下标
      priceActive: -1, // 价格下标
      securityActive: -1,
      areaActive: [],
      isAll: false, // 地区全选
      minPrice: '',
      maxPrice: '',
    }
  },
  watch: {
    areaActive(newVal) {
      if (
        (newVal.length !== this.areaList.length - 1) &
        (newVal.indexOf(0) === -1)
      ) {
        this.isAll = false
      } else if (newVal.indexOf(0) === -1) {
        this.isAll = true
      }
    },
  },
  methods: {
    onLoad() {},
    // 判断是否吸顶
    scroll(e) {
      this.isFixed = e.isFixed
      this.$emit('scroll', e)
    },
    tabChoose(idx) {
      this.tabActive = idx
      console.log(this.tabActive)
    }, // 导航选择
    // 类别选择
    typeChooes(idx) {
      this.typeActive = idx
    },
    // 等级选择
    levelChooes(idx) {
      this.levelActive = idx
    },
    // 金额选择
    priceChooes(idx) {
      this.priceActive = idx
    },
    // 价格确认
    confirm(num) {
      console.log(this.$refs.drop)
      this.$refs.drop[num].toggle()
    },
    // 城市选择
    areaChooes(idx) {
      if (idx === 0) {
        this.areaActive = []
        this.areaActive.push(idx)
        this.isAll = false
      } else if (idx !== 0) {
        if (this.areaActive.indexOf(idx) === -1) {
          this.areaActive.indexOf(0) !== -1 &&
            this.areaActive.splice(this.areaActive.indexOf(0), 1)
          this.areaActive.push(idx)
        } else {
          this.areaActive.splice(this.areaActive.indexOf(idx), 1)
        }
      }
      // 排序选择
    },
    // 排序选择
    chooseSort(index) {
      this.sortActive = index
      this.$emit('chooseSort')
      this.tabList[this.tabActive] = this.sortList[index]
    },
    // 全选
    allChooes() {
      if (!this.isAll) {
        this.isAll = true
        this.areaActive = []
        this.areaList.forEach((item, index) => {
          index !== 0 && this.areaActive.push(index)
        })
      } else {
        this.isAll = false
        this.areaActive = []
      }
    },
  },
}
</script>
<style lang="less" scoped>
.product-list {
  width: 100vw;
  .title {
    width: 100%;
    padding: 0 20px;
    font-size: 32px;
    color: #222222;
    font-weight: bold;
    line-height: 44px;
  }
  .type-list {
    padding: 56px 16px 56px 40px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    > div {
      width: 206px;
      height: 64px;
      border-radius: 4px;
      text-align: center;
      font-size: 24px;
      margin-right: 24px;
      margin-bottom: 24px;
      padding: 20px 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .type-item {
      color: #222222;
      background: #f8f8f8;
    }
    .type-item-active {
      background: #f2f5ff;
      color: #4974f5;
    }
  }
  .price-list {
    .content {
      padding: 56px 40px;
      background: #fff;
      .title {
        font-size: 36px;
        color: #1a1a1a;
        line-height: 36px;
        font-weight: bold;
      }
      .interval {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 40px;
        > div {
          width: 320px;
          height: 96px;
          border-bottom: 1px solid #f5f5f5;
          padding: 31px 32px;

          > input {
            display: block;
            width: 100%;
            height: 100%;
            border: none;
            font-size: 34px;
            color: #222222;
            text-align: center;
          }
          > input::-webkit-input-placeholder {
            color: #cccccc;
            font-weight: 700;
          }
        }
        .to {
          padding: 0;
          font-size: 28px;
          color: #222222;
          text-align: center;
          line-height: 28px;
          margin: 0 1px;
          border: none;
          width: 28px;
          line-height: 96px;
        }
      }
      .price-item {
        margin-top: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        > div {
          width: 149.5px;
          height: 64px;
          border-radius: 4px;
          margin-right: 24px;
          margin-bottom: 24px;
          padding: 20px 8px;
          text-align: center;
          font-size: 24px;
        }
        > div:nth-child(4n) {
          margin-right: 0;
        }
        .item {
          background: #f8f8f8;
          color: #222222;
        }
        .item-active {
          color: #4974f5;
          background: #ecf1fe;
        }
      }
    }
    .btn-box {
      width: 100%;
      padding: 32px 40px;
      display: flex;
      align-items: center;
      border-top: 1px solid #f5f5f5;
      .reset {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        .icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .name {
          font-size: 24px;
          color: #1a1a1a;
          margin-top: 12px;
        }
      }
      .confirm {
        margin-left: 44px;
        flex: 1;
        height: 96px;
        background: #4974f5;
        border-radius: 8px;
        font-size: 32px;
        color: #ffffff;
        text-align: center;
        line-height: 96px;
        font-weight: bold;
      }
    }
  }
  .more-list {
    .more-content {
      padding: 56px 40px;
      .security {
        width: 100%;
        .security-title {
          font-size: 36px;
          color: #1a1a1a;
          font-weight: 700;
        }
        .security-item {
          margin-top: 32px;
          display: flex;
          align-items: center;
          > div {
            margin-right: 24px;
            width: 206.61px;
            height: 64px;
            padding: 0px 8px;
            line-height: 64px;
            border-radius: 4px;
            font-size: 24px;
            text-align: center;
          }
          .item {
            color: #222222;
            background: #f8f8f8;
          }
          .item-active {
            color: #4974f5;
            background: #ecf1fe;
          }
          > div:last-child {
            margin-right: 0;
          }
        }
      }
      .area-list {
        margin-top: 56px;
        .area-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .area {
            font-size: 36px;
            color: #1a1a1a;
            font-weight: bold;
          }
          .all {
            display: flex;
            align-items: center;
            .all-title {
              font-size: 26px;
              line-height: 26px;
            }
            .icon {
              height: 26px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 12px;
            }
          }
        }
        .area-box {
          margin-top: 40px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          > div {
            width: 149.5px;
            height: 64px;
            border-radius: 4px;
            margin-bottom: 24px;
            margin-right: 24px;
            text-align: center;
            padding: 20px 8px;
            font-size: 24px;
          }
          .area-item {
            color: #222222;
            background: #f8f8f8;
          }
          .area-item-active {
            color: #4974f5;
            background: #ecf1fe;
          }
          > div:nth-child(4n) {
            margin-right: 0;
          }
        }
      }
    }
    .btn-box {
      width: 100%;
      padding: 32px 40px;
      display: flex;
      align-items: center;
      border-top: 1px solid #f5f5f5;
      .reset {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        .icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .name {
          font-size: 24px;
          color: #1a1a1a;
          margin-top: 12px;
        }
      }
      .confirm {
        margin-left: 44px;
        flex: 1;
        height: 96px;
        background: #4974f5;
        border-radius: 8px;
        font-size: 32px;
        color: #ffffff;
        text-align: center;
        line-height: 96px;
        font-weight: bold;
      }
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
  .list {
    .entrust {
      padding: 40px 40px 20px 40px;
      .entrust-title {
        width: 100%;
        font-size: 40px;
        color: #000000;
        text-align: center;
        font-weight: bold;
      }
      .entrust-desc {
        width: 100%;
        margin-top: 12px;
        font-size: 28px;
        color: #999999;
        text-align: center;
      }
    }
  }
  ::v-deep.sp-dropdown-menu__bar {
    box-shadow: none;
    height: 88px;
    background: transparent;
    padding: 0 18px;
    .sp-dropdown-menu__item {
      flex-shrink: 0;
      flex: none;
      width: 140px;
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
}
</style>
