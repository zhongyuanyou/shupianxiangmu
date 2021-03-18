<template>
  <div class="recommended">
    <sp-tabs
      v-model="active"
      sticky
      title-active-color="#222222"
      title-inactive-color="#555555"
      offset-top="1.28rem"
      :background="isFixed === true ? fixedColor : bgColor"
      @scroll="scroll"
    >
      <sp-tab v-for="(item, index) of product" :key="index">
        <template #title>
          <div class="title">
            <span>{{ item.title }}</span>
            <span>{{ item.describe }}</span>
          </div>
        </template>
        <!-- 二级分类 -->
        <!-- <div class="secondary-label">
          <ul>
            <li v-for="(item, index) in secondaryLabel" :key="index">
              {{ item }}
            </li>
          </ul>
        </div> -->
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="product-list">
            <div
              v-for="(list, listcode) in item.list"
              v-show="listcode < max"
              :key="listcode"
              class="product"
            >
              <div class="img-box"><img :src="list.imageUrl" alt="" /></div>
              <div class="product-title-box">
                <span
                  v-if="list.activeTag || list.activeTag !== ''"
                  class="title-tag"
                  >{{ list.activeTag }}</span
                >
                <span
                  class="product-title"
                  :style="{ marginLeft: list.activeTag !== '' ? '12px' : 0 }"
                  >{{ list.title }}</span
                >
              </div>
              <div class="product-field-box">
                <!-- 活动标签 -->
                <span
                  v-if="list.saleTage && list.saleTage !== ''"
                  class="sale-tag"
                  >{{ list.saleTage }}</span
                >
                <!-- 评分 -->
                <span
                  v-if="list.score && list.score !== '' && list.saleTage === ''"
                  class="score"
                  >{{ list.score }}分</span
                >
                <div
                  v-if="
                    (list.saleTage && list.saleTage !== '') ||
                    (list.score && list.score !== '')
                  "
                  class="line"
                ></div>
                <!-- 销量 -->
                <span class="sales">月销量{{ list.sales }}</span>
              </div>
              <div class="product-label-box">
                <ul>
                  <li
                    v-for="(label, labelcode) in list.labels"
                    v-show="labelcode < 3"
                    :key="labelcode"
                  >
                    {{ label }}
                  </li>
                </ul>
              </div>
              <div class="price-btn-box">
                <div class="price-box">
                  <span class="price">{{ list.price }} </span>
                  <span>元 起</span>
                </div>
                <a class="btn" href="javascript:;">立即购买</a>
              </div>
            </div>
          </div>
        </sp-list>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
export default {
  name: 'Recommended',
  components: { [Tab.name]: Tab, [Tabs.name]: Tabs, [List.name]: List },
  props: {
    product: {
      type: Array,
      default: () => {
        return [
          {
            title: '推荐',
            describe: '猜你喜欢',
            list: [
              {
                code: 1,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/5swgfx9bv0w0000.png',
                title: '商品名称商品名称…',
                score: '',
                saleTage: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 2,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                title: '商品名称商品名称',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 3,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/oj7zb1uxhi8000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 4,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 5,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '商品名称商品',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
            ],
          },
          {
            title: '电商运营',
            describe: '品质保障',
            list: [
              {
                code: 4,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 5,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '商品名称商品',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
            ],
          },
          {
            title: '营销推广',
            describe: '品质保障',
            list: [
              {
                code: 1,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/5swgfx9bv0w0000.png',
                title: '商品名称商品名称…',
                score: '5.0',
                saleTage: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 2,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                title: '商品名称商品名称',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
            ],
          },
          {
            title: '小程序建设',
            describe: '品质保障',
            list: [
              {
                code: 2,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/adwjgxcjzc80000.png',
                title: '商品名称商品名称',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 3,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/oj7zb1uxhi8000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
              {
                code: 4,
                imageUrl:
                  'https://cdn.shupian.cn/sp-pt/wap/images/dwbvvb27alc0000.png',
                title: '商品名称商品名',
                score: '',
                activeTag: '',
                sales: '1200',
                labels: ['套餐优惠', '热销好评', '金牌团队'],
                price: '688',
              },
            ],
          },
        ]
      },
    },
  },
  data() {
    return {
      fixedColor: '#ffffff',
      bgColor: '#f5f5f5',
      isFixed: false,
      active: '',
      secondaryLabel: ['全部', '免费维护', '极速交付', '多方案维护'],
      loading: false,
      finished: false,
      max: 2,
    }
  },
  watch: {
    isFixed(newval, oldval) {
      this.isFixed = newval
    },
  },
  methods: {
    scroll(e) {
      this.isFixed = e.isFixed
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.max = this.max + 3
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.max > 6) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>

<style lang="less" scoped>
.recommended {
  width: 100%;
  margin-top: 27px;
  ::v-deep.sp-tabs__nav {
    width: 750px;
    margin: 0 auto;
  }

  ::v-deep.sp-tab__text {
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: bold;
  }

  ::v-deep.sp-tabs__line {
    width: 60px;
    height: 12px;
    background-color: transparent;
    background-image: linear-gradient(to right, #4974f5, transparent);
    top: 32px;
  }
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    > span:last-child {
      height: 22px;
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bold;
      color: #999999;
      line-height: 22px;
      margin-top: 16px;
    }
  }
  .secondary-label {
    > ul {
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 11px;
      > li {
        width: 164px;
        height: 56px;
        background: #ffffff;
        border-radius: 8px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: bold;
        color: #555555;
        text-align: center;
        line-height: 56px;
      }
    }
  }
  .product-list {
    padding: 0 20px;
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    .product:nth-child(even) {
      margin-left: 19px;
    }
    .product {
      width: 345px;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      height: 100%;
      border-radius: 24px;
      padding: 20px 20px 24px;
      .img-box {
        width: 305px;
        height: 305px;
        background: linear-gradient(
          178deg,
          #46494d 0%,
          #797d83 0%,
          #414347 100%
        );
        border-radius: 12px;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }
      }
      .product-title-box {
        display: flex;
        margin-top: 16px;
        .title-tag {
          display: inline-block;
          width: 52px;
          height: 32px;
          background: #ec5330;
          border-radius: 4px;
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          line-height: 36px;
        }
        .product-title {
          display: block;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 40px;
          .textOverflow(2);
        }
      }

      .product-field-box {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .sale-tag {
          display: block;
          width: 52px;
          height: 32px;
          background: #ec5330;
          border-radius: 4px;
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 36px;
        }
        .score {
          display: block;
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #fdb032;
        }
        .line {
          width: 1px;
          height: 20px;
          background: #cdcdcd;
          margin: 0 12px;
        }
        .sales {
          display: block;
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #555555;
        }
      }
      .product-label-box {
        margin-top: 20px;
        > ul {
          display: flex;
          align-items: center;
          > li {
            width: 92px;
            height: 28px;
            background: #f0f2f5;
            border-radius: 4px;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #5c7499;
            line-height: 34px;
            text-align: center;
          }
          > li:not(:first-child) {
            margin-left: 8px;
          }
        }
      }
      .price-btn-box {
        margin-top: 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-box {
          display: flex;

          .price {
            display: block;
            font-size: 36px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ec5330;
            line-height: 36px;
          }
          > span:last-child {
            display: block;
            font-size: 22px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ec5330;
            line-height: 36px;
            margin-left: 2px;
            margin-top: 3px;
          }
        }
        .btn {
          display: block;
          width: 120px;
          height: 48px;
          background: rgba(73, 116, 245, 0.1);
          border-radius: 8px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #4974f5;
          line-height: 52px;
          text-align: center;
        }
      }
    }
    > div:nth-child(2) ~ div {
      margin-top: 20px;
    }
  }
}
</style>
