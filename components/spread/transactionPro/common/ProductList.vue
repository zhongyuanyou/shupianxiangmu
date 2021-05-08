<template>
  <div>
    <div class="my-component">
      <!-- S 半圆选项菜单 -->
      <TabCurve
        ref="tabCurveRef"
        v-model="currentItem"
        class="tab-curve"
        bg-color="#f5f5f5"
        :offset-top="searchDomHeight"
        :tab-list="data.tabBtnList"
        :need-fixed="true"
        :right="0.54"
        name-field="name"
        @selectTabHandle="selectTabHandle"
      ></TabCurve>
      <!-- E 半圆选项菜单 -->

      <!-- S 商品列表 -->
      <sp-swipe
        ref="recomRef"
        class="my-swipe"
        :show-indicators="false"
        @change="onSwipeChange"
      >
        <sp-swipe-item v-for="(item, index) in data.tabBtnList" :key="index">
          <div v-show="index === currentItem">
            <!-- S 推荐选项卡滚动区 -->
            <div
              class="scroll-recommend"
              @touchstart="preventTouch"
              @touchmove="preventTouch"
            >
              <div class="marks">
                <a
                  v-for="(mark, markIndex) in data.marks"
                  :key="markIndex"
                  v-md-map
                  v-md:webClick
                  :data-name="`${data.md.pageName}-${item.name}-${mark}`"
                  class="mark"
                  href="javascript:;"
                  @click="jumpLink('')"
                >
                  {{ mark }}
                </a>
              </div>
            </div>
            <!-- E 推荐内容滚动区 -->

            <!-- S 推荐商品列表 -->
            <div ref="goodList" class="goods-list">
              <!-- S 空屏骨架 -->
              <sp-skeleton
                v-for="val in 10"
                :key="val + 'a'"
                avatar-shape="square"
                avatar-size="2.4rem"
                title
                title-width="100%"
                avatar
                :row="3"
                :row-width="['80%', '70%', '50%']"
                :loading="goodList.length > 0 ? false : true"
              >
              </sp-skeleton>
              <!-- E 空屏骨架 -->

              <GoodItem
                v-for="(good, goodIndex) in goodList"
                :key="goodIndex"
                class="good-item-margin"
                :good="good"
              />
            </div>
            <!-- E 推荐商品列表 -->

            <!-- S 商品加载提示 -->
            <sp-loading
              v-show="more.loading"
              size="0.24rem"
              color="#999999"
              text-size="0.24rem"
            >
              加载中...
            </sp-loading>
            <!-- E 商品加载提示 -->
          </div>
        </sp-swipe-item>
      </sp-swipe>
      <!-- E 商品列表 -->

      <!-- S 查看更多按钮 -->
      <div v-if="!more.noMore" class="btn" @click="getMore">
        <a>查看更多</a>
      </div>
      <!-- E 查看更多按钮 -->

      <!-- S 无更多数据 -->
      <div v-if="more.noMore" class="no-more-data">无更多数据啦</div>
      <!-- E 无更多数据 -->
    </div>
  </div>
</template>

<script>
import { Swipe, swipeItem, Skeleton, Loading } from '@chipspc/vant-dgg'
import TabCurve from '~/components/spread/transactionPro/common/TabCurve.vue'
import adJumpHandle from '~/mixins/adJumpHandle'
import GoodItem from '~/components/spread/transactionPro/common/ProductItem'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Skeleton.name]: Skeleton,
    [Loading.name]: Loading,
    TabCurve,
    GoodItem,
  },
  mixins: [adJumpHandle],
  props: {
    // 其余数据
    data: {
      type: Object,
      default: () => {
        return {
          // 半圆选项菜单列表
          tabBtnList: [
            { name: '推荐公司', type: 0 },
            { name: '热卖公司', type: 9 },
            { name: '降价急售', type: 1 },
          ],
          // 推荐选项卡列表滚动区
          marks: [
            '空壳公司',
            '实体公司',
            '小规模',
            '高新技术',
            '有限公司',
            '降价',
            '带商标',
            '带专利',
            '无经营',
            '发票',
          ],
          planner: {
            id: '7862495547640840192',
            name: '张毅',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc: '',
          },
          // 埋点数据
          md: {
            pageName: '',
          },
        }
      },
    },
    // 商品列表
    goodList: {
      type: Array,
      default: () => {
        return [
          {
            // 必传字段
            img: '', // 商品左侧显示图片
            price: '', // 商品价格
            name: '', // 公司显示名称（有*号）
            tabs: [], // 有背景色的标签tab，每个页面有单独的标签列表，随机取几个传进来
            notes: [], // 以 | 字符分隔的注意，接口字段值
          },
        ]
      },
    },
    // 商品列表-更多数据
    more: {
      type: Object,
      default: () => {
        return {
          loading: false, // 加载更多按钮点击时，显示的loading加载
          noMore: false, // 无更多加载数据
        }
      },
    },
  },
  data() {
    return {
      currentItem: 0, // 默认tabs选中第一个
      searchDomHeight: 0, // 选项卡吸顶时与顶部的距离
    }
  },
  methods: {
    // @--抛出事件方法
    // 选项卡选择某项：切换轮播，显示不同内容
    selectTabHandle(item) {
      this.$refs.recomRef.swipeTo(item.index) // 会触发onSwipeChange
      this.$emit('selectTab', item)
    },
    // 轮播切换swipeTo时触发
    onSwipeChange(index) {
      this.currentItem = index
      this.$emit('swipeChange', this.data.tabBtnList[index])
    },
    // 点击'加载更多'按钮
    getMore() {
      this.$emit('getMore')
    },

    // @--其他
    // 阻止冒泡
    preventTouch(e) {
      e.stopImmediatePropagation()
    },
    // 跳转链接
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        window.spptMqMi.showPanel()
      }
    },
  },
}
</script>

<style scoped lang="less">
.my-component {
  width: 100%;
  padding-bottom: 164px;
  .tab-curve::after {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background: #f4f4f4;
    margin-top: 1px;
  }

  .my-swipe {
    .scroll-recommend {
      width: 100%;
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        display: none;
      }
      .marks {
        width: 100%;
        display: flex;
        padding-left: 40px;

        .mark {
          flex: none;
          height: 68px;
          background: #ffffff;
          border-radius: 8px;
          font-size: 26px;
          line-height: 68px;
          font-weight: 400;
          color: #555555;
          padding: 0 20px;
          margin-right: 12px;
        }
      }
    }
    .goods-list {
      position: relative;
      width: 710px;
      margin: 0 auto;
      border-radius: 24px;
      .good-item-margin {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }

  .btn {
    margin: 10px auto;
    width: calc(100% - 80px);
    height: 0.88rem;
    background: #ebf2ff;
    opacity: 0.7;
    border-radius: 0.08rem;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.28rem;
    font-weight: 700;
    color: #387cee;
  }

  .no-more-data {
    font-size: 30px;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
    margin-top: 20px;
  }

  // @--穿透更改样式
  ::v-deep .sp-skeleton {
    padding: 32px 0;
  }
  ::v-deep .sp-skeleton__content {
    padding-top: 0;
  }

  ::v-deep .sp-sticky--fixed {
    width: @spread-page-width;
    margin: 0 auto;
  }
  ::v-deep .sp-loading {
    text-align: center;
    margin: 20px 0;
  }
}
</style>
