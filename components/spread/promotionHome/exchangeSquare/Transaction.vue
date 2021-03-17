<template>
  <div class="transaction">
    <sp-tabs
      v-model="active"
      sticky
      title-active-color="#222222"
      title-inactive-color="#999999"
      offset-top="1.28rem"
      :background="isFixed === true ? fixedColor : bgColor"
      @scroll="scroll"
    >
      <sp-tab v-for="(item, index) of productList" :key="index">
        <template #title>
          <div class="title">
            <span>{{ item.title }}</span>
          </div>
        </template>
        <!-- 二级分类 -->
        <!-- <div class="secondary-label">
          <div class="labels">
            <ul>
              <li
                v-for="(item, index) in labels"
                :key="index"
                :class="index === isActive ? 'choose' : 'nochoose'"
                @click="change(index)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="labels-icon">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/s5owvahe3ls000.png"
              alt=""
            />
          </div>
        </div> -->
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="product-box">
            <ul>
              <li
                v-for="(product, productcode) in item.product"
                v-show="productcode < max"
                :key="productcode"
              >
                <a :href="product.url">
                  <span class="product-title">{{ product.title }}</span>
                  <div class="label-box">
                    <span
                      v-if="product.activeTag && product.activeTag !== ''"
                      class="activeTag"
                      >{{ product.activeTag }}</span
                    >
                    <div class="product-labels">
                      <span
                        v-for="(label, labelCode) in product.list"
                        v-show="index < 3"
                        :key="labelCode"
                        >{{ label }}</span
                      >
                    </div>
                  </div>
                  <span class="product-describe">{{ product.describe }}</span>
                  <div class="price-box">
                    <img
                      v-show="product.saleImg && product.saleImg !== ''"
                      :src="product.saleImg"
                      alt=""
                    />
                    <div class="price">
                      <span>{{ product.price }}</span>
                      <span>元</span>
                    </div>
                    <span class="original-price">{{
                      product.originalPrice
                    }}</span>
                  </div>
                  <div class="product-image">
                    <ul>
                      <li
                        v-for="(imgs, imgCode) in product.images"
                        :key="imgCode"
                      >
                        <img :src="imgs" alt="" />
                      </li>
                    </ul></div
                ></a>
              </li>
            </ul>
          </div>
        </sp-list>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
export default {
  components: { [Tab.name]: Tab, [Tabs.name]: Tabs, [List.name]: List },
  props: {
    productList: {
      type: Array,
      default: () => {
        return [
          {
            code: 1,
            title: '商标交易',
            product: [
              {
                title: 'PLRDFT商标',
                score: '5.0',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP1', '可领优惠券'],
                activeTag: '限时秒杀',
                describe:
                  '主要用于钟表首饰，该商标所在品牌曾获得2020年最佳商标品…',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/5c5u31iw2q80000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/273oivwd7des000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/6g23fvxtrjw0000.png',
                ],
                url: '',
              },
              {
                title: '天樽宝坊商标',
                score: '4.9',
                sales: '折',
                activeTag: '',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['可领优惠券', '4人拼团免费拿'],
                describe:
                  '该商标适用于环保/科技公司，适用范围广，商标高端大气上档次',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/apuw85lj2ao0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/81yilbjil6s0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dwe7bren17k0000.png',
                ],
                url: '',
              },
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
            ],
          },
          {
            code: 2,
            title: '公司交易',
            product: [
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
            ],
          },
          {
            code: 3,
            title: '专利交易',
            product: [
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
            ],
          },
          {
            code: 4,
            title: '资质交易',
            product: [
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
              },
              {
                title: '青稞乐园商标',
                score: '3.9',
                sales: '折',
                activeTag: '千万补贴',
                saleImg:
                  'https://cdn.shupian.cn/sp-pt/wap/images/2dmktflkbxc0000.png',
                list: ['人气商标排行榜TOP3', '8折优惠'],
                describe:
                  '该商标属于第18类商标，包含旅行箱、钱包、手提包、皮带等商品',
                originalPrice: '998元',
                price: '698',
                images: [
                  'https://cdn.shupian.cn/sp-pt/wap/images/e3bd49hdl6g0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/dv444eenu3c0000.png',
                  'https://cdn.shupian.cn/sp-pt/wap/images/7jgtavtu8eo0000.png',
                ],
                url: '',
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
      loading: false,
      finished: false,
      max: 3,
      active: '',
      isActive: 0,
      labels: [
        '科技行业',
        '电子贸易',
        '教育培训',
        '金融投资',
        '中介服务',
        '教育培训',
        '金融投资',
        '中介服务',
        '中介服务',
        '教育培训',
        '金融投资',
        '中介服务',
      ],
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
    change(index) {
      this.isActive = index
      console.log(this.isActive)
    },
  },
}
</script>
<style lang="less" scoped>
.transaction {
  width: 100%;
  margin-top: 11px;
  .secondary-label {
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    .labels {
      width: 710px;
      height: 56px;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        display: none;
      }
      > ul {
        width: 710px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        > li:not(:first-child) {
          margin-left: 10px;
        }
        .choose {
          color: #4974f5;
        }
        .nochoose {
          color: #555555;
        }
        > li {
          flex-shrink: 0;
          width: 134px;
          height: 56px;
          background: #ffffff;
          border-radius: 8px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #555555;
          line-height: 56px;
          text-align: center;
        }
      }
    }

    .labels-icon {
      position: absolute;
      width: 71px;
      height: 56px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      top: 0;
      > img {
        font-size: 0;
        width: 30px;
        height: 30px;
      }
    }
  }
  ::v-deep.sp-tab {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
  }
  ::v-deep.sp-tabs__line {
    width: 60px;
    height: 12px;
    background-color: transparent;
    background-image: linear-gradient(to right, #4974f5, transparent);
    top: 48px;
    left: 16px;
  }
  ::v-deep.sp-tab__text {
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: bold;
  }
  ::v-deep.sp-tabs__wrap {
    margin-bottom: 11px;
  }
  ::v-deep.sp-tabs__nav {
    width: 750px;
    padding: 0 20px;
    margin: 0 auto;
  }
  .product-box {
    width: 100%;
    padding: 0 20px;
    > ul {
      width: 100%;
      > li:not(:first-child) {
        margin-top: 20px;
      }
      > li {
        width: 100%;
        height: 389px;
        background: #ffffff;
        border-radius: 24px;
        padding: 24px 21px;
        > a {
          .product-title {
            display: block;
            font-size: 32px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            line-height: 32px;
            color: #222222;
          }
          .label-box {
            margin-top: 16px;
            display: flex;
            align-items: center;
            .activeTag {
              display: block;
              width: 92px;
              height: 28px;
              background: #f15241;
              border-radius: 4px;
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #ffffff;
              line-height: 30px;
              text-align: center;
              margin-right: 8px;
            }
            .product-labels {
              display: flex;
              align-items: center;
              > span {
                height: 28px;
                background: #fdeded;
                border-radius: 4px;
                display: block;
                font-size: 20px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: bold;
                color: #f1524e;
                line-height: 24px;
                text-align: center;
                padding: 4px 6px;
              }
              > span:not(:first-child) {
                margin-left: 8px;
              }
            }
          }
          .product-describe {
            display: block;
            height: 22px;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #555555;
            line-height: 26px;
            margin-top: 16px;
            .textOverflow(1);
          }
          .price-box {
            display: flex;
            align-items: center;
            margin-top: 23px;
            > img {
              width: 32px;
              height: 32px;
              margin-right: 8px;
            }
            > span {
              display: block;
            }
            .price {
              display: flex;

              > span:first-child {
                display: inline-block;
                font-size: 36px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: bold;
                color: #ec5330;
                line-height: 36px;
              }
              > span:last-child {
                display: inline-block;
                font-size: 22px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: bold;
                color: #ec5330;
                line-height: 22px;
                margin-left: 2px;
                margin-top: 10px;
              }
            }
            .original-price {
              display: block;
              font-size: 22px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: #999999;
              line-height: 22px;
              margin-left: 16px;
              margin-top: 5px;
            }
          }
          .product-image {
            margin-top: 24px;
            width: 100%;
            > ul {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              > li {
                width: 212px;
                height: 147px;
                > img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
