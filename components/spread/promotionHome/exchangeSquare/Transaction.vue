<template>
  <div class="transaction">
    <sp-tabs
      v-model="active"
      sticky
      title-active-color="#222222"
      title-inactive-color="#999999"
      :offset-top="offsetTop"
      :background="isFixed === true ? fixedColor : bgColor"
      @scroll="scroll"
    >
      <div class="list">
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
              <!-- <ul v-if="item.title === '商标交易'">
                <li
                  v-for="(product, productcode) in item.product"
                  v-show="productcode < max"
                  :key="productcode"
                >
                  <a href="javascript:;">
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
              </ul> -->
              <ProductItem :product="item.product"></ProductItem>
            </div>
          </sp-list>
        </sp-tab>
      </div>
    </sp-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
import ProductItem from '@/components/spread/promotionHome/exchangeSquare/ProductItem'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    ProductItem,
  },
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
                code: 1,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '成都****有限责任公司成都****有限责任公司',
                labels: [
                  { code: 1, label: '精选资质TOP1', type: 'saleTag' },
                  { code: 2, label: '公司干净无异常', type: 'tag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                ],
                descride: '电子贸易｜1-5年｜100W-500W',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 500,
                originalPrice: 998,
                priceUnit: '元',
              },
              {
                code: 2,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '成都****有限责任公司成都****有限责任公司',
                labels: [
                  { code: 1, label: '限时秒杀', type: 'sactiveTag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                  { code: 2, label: '公司干净无异常', type: 'tag' },
                ],
                descride: '电子贸易 | 一般纳税人 | 1-5年',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 499.9,
                originalPrice: 998,
                priceUnit: '元',
              },
              {
                code: 3,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '成都****有限责任公司',
                labels: [
                  { code: 1, label: '可领优惠券', type: 'saleTag' },
                  { code: 2, label: '公司干净无异常', type: 'tag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                ],
                descride: '一般纳税人 | 1-5年 | 100W-500W',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 499,
                originalPrice: 998,
                priceUnit: '元',
              },
              {
                code: 4,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '成都****有限责任公司成都****有限责任公司',
                labels: [
                  { code: 1, label: '千万补贴', type: 'sactiveTag' },
                  { code: 2, label: '9折优惠', type: 'saleTag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                ],
                descride: '电子贸易｜一般纳税人｜1-5年｜100W-…',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 500,
                originalPrice: 998,
                priceUnit: '元',
              },
            ],
          },
          {
            code: 3,
            title: '专利交易',
            product: [
              {
                code: 1,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '一种用于预处理农作一种用于预处理农作…',
                labels: [
                  { code: 1, label: '精选资质TOP1', type: 'saleTag' },
                  { code: 2, label: '支持当面交易', type: 'tag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                ],
                descride: '发明专利｜包装印刷｜已下证',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 30,
                originalPrice: 35,
                priceUnit: '万元',
              },
              {
                code: 2,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '一种用于预处理农作…一种用于预处理农作…',
                labels: [
                  { code: 1, label: '限时秒杀', type: 'sactiveTag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                  { code: 2, label: '支持当面交易', type: 'tag' },
                ],
                descride: '发明专利｜包装印刷｜已下证',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 11.3,
                originalPrice: 12.5,
                priceUnit: '万元',
              },
              {
                code: 3,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '一种用于预处理农作',
                labels: [
                  { code: 1, label: '可领优惠券', type: 'saleTag' },
                  { code: 2, label: '支持当面交易', type: 'tag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                ],
                descride: '发明专利｜包装印刷｜已下证',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 2.54,
                originalPrice: 3,
                priceUnit: '万元',
              },
              {
                code: 4,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '一种用于预处理农作一种用于预处理农作…',
                labels: [
                  { code: 1, label: '千万补贴', type: 'sactiveTag' },
                  { code: 2, label: '9折优惠', type: 'saleTag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                ],
                descride: '发明专利｜包装印刷｜已下证',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 1.3,
                originalPrice: 1.5,
                priceUnit: '万元',
              },
            ],
          },
          {
            code: 4,
            title: '资质交易',
            product: [
              {
                code: 1,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '房建市政公路三级+四专三级',
                labels: [
                  { code: 1, label: '精选资质TOP1', type: 'saleTag' },
                  { code: 2, label: '可线下', type: 'tag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                ],
                descride: '施工总承包三级标准资质｜带安许｜500…',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 33,
                originalPrice: 34,
                priceUnit: '万元',
              },
              {
                code: 2,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '房建市政公路三级+四专三级房建市政公路三级+四专…',
                labels: [
                  { code: 1, label: '限时秒杀', type: 'sactiveTag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                  { code: 2, label: '可线下', type: 'tag' },
                ],
                descride: '带安许｜500万-1000万',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 33.3,
                originalPrice: 34,
                priceUnit: '万元',
              },
              {
                code: 3,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '房建市政公路三级+四专三级房建市政公路三级+四专…',
                labels: [
                  { code: 1, label: '可领优惠券', type: 'saleTag' },
                  { code: 2, label: '可线下', type: 'tag' },
                  { code: 2, label: '热门行业', type: 'tag' },
                ],
                descride: '施工总承包三级标准资质｜带安许',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 33.99,
                originalPrice: 34,
                priceUnit: '万元',
              },
              {
                code: 4,
                img: 'https://cdn.shupian.cn/sp-pt/wap/images/680am47b74k0000.png',
                title: '房建市政公路三级+四专三级房建市政公路三级+四专…',
                labels: [
                  { code: 1, label: '千万补贴', type: 'sactiveTag' },
                  { code: 2, label: '9折优惠', type: 'saleTag' },
                  { code: 2, label: '可线下', type: 'tag' },
                ],
                descride: '施工总承包三级标准资质｜带安许｜500…',
                discountTag:
                  'https://cdn.shupian.cn/sp-pt/wap/images/4vykkg0vo480000.png',
                salePrice: 33,
                originalPrice: 34,
                priceUnit: '万元',
              },
            ],
          },
        ]
      },
    },
  },
  data() {
    return {
      offsetTop: 0,
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
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  watch: {
    isFixed(newval, oldval) {
      this.isFixed = newval
    },
  },
  mounted() {
    if (this.isInApp) {
      this.offsetTop = this.appInfo.statusBarHeight + 58 + 'px'
    } else {
      this.offsetTop = 58 + 'px'
    }
  },
  methods: {
    scroll(e) {
      this.isFixed = e.isFixed
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.max = this.max + 15
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
    },
  },
}
</script>
<style lang="less" scoped>
.transaction {
  width: 100%;
  margin-top: 11px;
  .list {
    min-height: 1000px;
  }
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
    // background-image: linear-gradient(to right, #4974f5, transparent);
    background: linear-gradient(90deg, rgba(73, 116, 245, 0.8), #dbe4fc);
    top: 48px;
    left: 16px;
  }
  ::v-deep.sp-tab__text {
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }
  ::v-deep.sp-tab--active {
    font-weight: bold;
    line-height: 32px;
    .sp-tab__text {
      font-weight: bold;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #222222;
    }
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
