<template>
  <div>
    <!-- <a
      ref="goodItem"
      v-md-map
      v-md:p_commodityClick
      data-name="推荐公司点击"
      data-track_code="SPTG000005"
      :data-commodity_type="good.compantType"
      :data-commodity_number="good.companyId"
      :data-commodity_name="good.companyName"
      :data-n_now_price="good.transferPrice"
      @click="jump(good.id)"
      class="my-component"
    > -->
    <a ref="goodItem" class="my-component" @click="jump(good.id)">
      <!-- S 左侧商品图片 -->
      <div class="item-img"><img :src="data.industryImg" /></div>
      <!-- E 左侧商品图片 -->

      <!-- S 右侧商品信息 -->
      <div class="item-content">
        <p class="item-title">{{ data.name }}</p>
        <div class="item-tabs">
          <!-- <span
            v-for="(item, index) in data.tabs"
            :key="index"
            class="item-tab"
          >
            {{ item }}
          </span> -->
          <span class="item-tab">{{ data.tabs }}</span>
        </div>
        <div class="item-notes">
          <span class="item-note">
            {{ data.notes }}
            <!-- <label v-if="index != data.notes.length - 1">|</label> -->
          </span>
        </div>
        <p class="item-price">
          <span class="item-price-num">{{ data.price }}</span>
          <span class="item-price-unit">元</span>
        </p>
        <div class="item-divide"></div>
        <div v-if="false" class="item-recommend">
          <img
            class="item-recommend-img"
            src="https://cdn.shupian.cn/sp-pt/wap/images/e8pqebimcbs0000.png"
          />
          <span class="item-recommend-text">{{ data.recommendText }}</span>
        </div>
      </div>
      <!-- E 右侧商品信息 -->
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'GoodItem',
  props: {
    good: {
      type: Object,
      default: () => {
        return {
          img: '',
          name: '成都科技有限公司有限公司有限 公司有限公司', // 商品名称
          // 有背景色的标签tab，每个页面有单独的标签列表，随机取几个传进来
          tabs: [
            '店铺干净',
            '1对1服务',
            '免手续',
            '免手续',
            '免手续',
            '免手续',
          ],
          // 商品注意点，以 | 字符分隔的注意，接口字段值
          notes: [
            '贸易类',
            '一般纳税人',
            '3年以上',
            '500万',
            '500万',
            '500万',
            '500万',
          ],
          price: '11350', // 商品价格
          recommendText: '卖家急售，店铺干净，无负债', // 商品推荐语
          industryName: '电子贸易', // 商品所在行业
          industryImg:
            'https://cdn.shupian.cn/sp-pt/wap/images/6avifb7k81o0000.png', // 商品所在行业的图片
        }
      },
    },
  },
  data() {
    return {
      // @--有背景色的标签tabs列表
      slogans: [
        '优质公司',
        '公司干净',
        '无债权债务',
        '无不良记录',
        '附带商标',
        '卖家急售',
        '一般纳税人',
        '正常报税',
        '干净无异常',
        '热门公司',
        '有户有网',
        '热门行业',
        '新公司',
        '资料齐全',
        '可随时交易',
        '热销商品',
        '签署出售协议',
        '自带商标',
        '急售商品 ',
        '特价商品   ',
        '陪同交易',
        '超高性价',
        '明码标价',
      ],

      // @--滚动方向和坐标
      scrollAction: { x: 'undefined', y: 'undefined' },
      scrollDirection: '', // 向上、向下、向左、向右

      // @--该组件是否已经埋过点了
      isMd: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    data() {
      // 处理传进的数据
      const obj = this.good
      const item = {
        industryImg:
          obj.img.split(',')[1] ||
          'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png',
        // industryName: obj.companyIndustryName,
        recommendText: this.getArrayItems(this.slogans, 3).join(','),
        price: obj.price,
        name: obj.title,
        tabs: obj.field ? obj.field.join(' | ') : '',
        // tabs:
        //   obj.tabs.length !== 0
        //     ? obj.tabs
        //     : this.getArrayItems(this.slogans, 3),
        notes: obj.desc,
        id: obj.id,
      }
      //   switch (obj.companyIndustryName) {
      //     case '电子贸易': {
      //       item.industryImg = 'https://img10.dgg.cn/pt06/wap/8501dnyiae40000.png'
      //       break
      //     }
      //     case '科技信息': {
      //       item.industryImg = 'https://img10.dgg.cn/pt06/wap/eb0b1yellgg0000.png'
      //       break
      //     }
      //     case '教育培训': {
      //       item.industryImg = 'https://img10.dgg.cn/pt06/wap/bas2zdj518w0000.png'
      //       break
      //     }
      //     case '广告传媒': {
      //       item.industryImg = 'https://img10.dgg.cn/pt06/wap/39l64c4kujc0000.png'
      //       break
      //     }
      //     case '餐饮美容': {
      //       item.industryImg = 'https://img10.dgg.cn/pt06/wap/734jysfyke00000.png'
      //       break
      //     }
      //     case '公司交易': {
      //       item.industryImg = 'https://img10.dgg.cn/pt06/wap/7sj0p2oe7000000.png'
      //       break
      //     }
      //     case '公司转让': {
      //       item.industryImg = 'https://img10.dgg.cn/pt06/wap/fcyegzq87o00000.png'
      //       break
      //     }
      //     default: {
      //       // 当没有行业对应图片时，随机从三张默认图里抽一张作为行业图片
      //       const images = [
      //         'https://img10.dgg.cn/pt06/wap/7iswdcpn8jc0000.png',
      //         'https://img10.dgg.cn/pt06/wap/7mgxtxioehw0000.png',
      //         'https://img10.dgg.cn/pt06/wap/3ejz3vwjiks0000.png',
      //       ]
      //       const num = Math.floor(Math.random() * 3)
      //       item.industryImg = images[num]
      //     }
      //   }
      return item
    },
  },
  mounted() {
    try {
      window.addEventListener('scroll', this.scrollMd) // 监听滚动
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 跳转详情
    jump(id) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      if (this.isInApp) {
        const iOSRouters = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: id, classCode: 'FL20201224136319' },
          },
        }
        const androidRouters = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: id, classCode: 'FL20201224136319' },
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouters)
        const androidRouterStr = JSON.stringify(androidRouters)
        this.$appFn.dggJumpRoute({
          iOSRouter: iOSRouterStr,
          androidRouter: androidRouterStr,
        })
      } else {
        window.location.href = `https://${base}m.shupian.cn/detail/transactionDetails?type=FL20201224136319&productId=${id}`
      }
    },
    // @--随机生成三条数据
    getArrayItems(recent, num) {
      const temparray = []
      for (const index in recent) {
        temparray.push(recent[index])
      }
      const returnarray = []
      for (let i = 0; i < num; i++) {
        if (temparray.length > 0) {
          const arrIndex = Math.floor(Math.random() * temparray.length)
          returnarray[i] = temparray[arrIndex]
          temparray.splice(arrIndex, 1)
        } else {
          break
        }
      }
      return returnarray
    },

    // @--滚动浏览埋点
    // 商品已经在页面可视区显示是，手动埋点
    // scrollMd(event) {
    //   this.scrollFunc()
    //   if (this.scrollDirection === 'down') {
    //     // 页面向下滚动要做的事情
    //     const clientHeight = document.documentElement.clientHeight
    //     const eleTop = this.$refs.goodItem.getBoundingClientRect().top
    //     const goodHeight = this.$refs.goodItem.getBoundingClientRect().height
    //     if (
    //       !this.isMd &&
    //       eleTop > 0 &&
    //       clientHeight - eleTop > goodHeight + 50
    //     ) {
    //       console.log(clientHeight - eleTop)
    //       // 当元素最顶部 距离小于 页面最顶部时
    //       // 进行一次埋点
    //       window.spptMd.spptTrackRow('p_commodityVisit', {
    //         name: `推荐商品浏览`,
    //         track_code: 'SPTG000004',
    //         commodity_type: this.good.compantType, // 商品类型
    //         commodity_number: this.good.companyId, // 商品编号
    //         commodity_name: this.good.companyName, // 商品名称
    //         n_now_price: this.good.transferPrice, // 商品售价
    //       })
    //       this.isMd = true
    //       this.$emit('update:isMd', true)
    //     }
    //   } else if (this.scrollDirection === 'up') {
    //     // 页面向上滚动要做的事情
    //     // console.log('up')
    //     this.isMd = false
    //   }
    // },
    // 滚动时判断滚动方向：向上、向下、向左、向右
    scrollFunc() {
      if (typeof this.scrollAction.x === 'undefined') {
        this.scrollAction.x = window.pageXOffset
        this.scrollAction.y = window.pageYOffset
      }
      const diffX = this.scrollAction.x - window.pageXOffset
      const diffY = this.scrollAction.y - window.pageYOffset
      if (diffX < 0) {
        // Scroll right
        this.scrollDirection = 'right'
      } else if (diffX > 0) {
        // Scroll left
        this.scrollDirection = 'left'
      } else if (diffY < 0) {
        // Scroll down
        this.scrollDirection = 'down'
      } else if (diffY > 0) {
        // Scroll up
        this.scrollDirection = 'up'
      } else {
        // First scroll event
      }
      this.scrollAction.x = window.pageXOffset
      this.scrollAction.y = window.pageYOffset
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  border-radius: 24px;
  padding: 28px 20px;
  margin-top: 20px;
  .item-img {
    flex-shrink: 0;
    width: 230px;
    height: 230px;
    margin-right: 32px;
    border-radius: 4px;
    > img {
      width: 220px;
      height: 220px;
      border-radius: 4px;
    }
  }
  .item-content {
    flex-shrink: 0;
    width: 418px;
    // display: inline-block;
    min-height: 220px;
    position: relative;
    .item-title {
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 42px;
      width: 100%;
      font-family: PingFang SC;
      max-height: 82px;
      // min-height: 82px;
      font-family: PingFang SC;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      .textOverflow(2);
    }
    .item-tabs {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .item-tab {
        font-size: 22px;
        font-weight: 400;
        color: #222;
        // color: #5c7499;
        // // line-height: 22px;
        // max-width: 120px;
        // height: 32px;
        // background: #f0f2f5;
        // border-radius: 4px;
        // display: flex;
        // justify-content: center;
        // padding: 0px 10px 0px 8px;
        // margin-right: 12px;
        // margin-bottom: 6px;
        .textOverflow(1);
      }
    }
    .item-notes {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 22px;
      .textOverflow(1);
      //   white-space: nowrap;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      .item-note {
        font-size: 22px;
        font-weight: 400;
        color: #222222;
        line-height: 22px;
      }
    }
    .item-price {
      font-size: 22px;
      font-weight: 400;
      color: #ec5330;
      line-height: 36px;
      position: absolute;
      bottom: 0px;
      .item-price-num {
        font-size: 36px;
        line-height: 36px;
        font-weight: bold;
      }
    }
    .item-divide {
      height: 1px;
    }
    .item-recommend {
      display: flex;
      align-items: center;
      .item-recommend-img {
        width: 28px;
        height: 28px;
        margin-right: 12px;
        img {
          width: 28px;
          height: 28px;
        }
      }

      .item-recommend-text {
        font-size: 22px;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 22px;
        display: flex;
      }
    }
  }
}
</style>
