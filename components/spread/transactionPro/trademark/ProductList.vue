<template>
  <div>
    <div class="my-component">
      <TabCurve
        ref="tabCurveRef"
        v-model="currentItem"
        class="tab-curve"
        :offset-top="searchDomHeight"
        :tab-list="tabBtnList"
        :need-fixed="true"
        :right="0.54"
        name-field="name"
        @selectTabHandle="selectTabHandle"
      ></TabCurve>

      <sp-swipe
        ref="recomRef"
        class="my-swipe"
        :show-indicators="false"
        @change="onChange"
      >
        <sp-swipe-item v-for="(item, index) in tabBtnList" :key="index">
          <div v-show="index === currentItem">
            <!-- START 推荐内容滚动区 -->
            <div
              class="scroll-recommend"
              @touchstart="preventTouch"
              @touchmove="preventTouch"
            >
              <div class="marks">
                <a
                  v-for="(mark, markIndex) in marks"
                  :key="markIndex"
                  v-md-map
                  v-md:webClick
                  :data-name="`商标交易聚合页_${item.name}_${mark}`"
                  class="mark"
                  href="javascript:;"
                  @click="jumpLink('')"
                >
                  {{ mark }}
                </a>
              </div>
            </div>
            <!-- END 推荐内容滚动区 -->

            <!-- START 推荐商品列表 -->
            <div ref="goodList" class="goods-list">
              <GoodItem
                v-for="(product, goodIndex) in good"
                :key="goodIndex"
                :good="product"
              />
              <!-- v-show="goodIndex > num - 1 ? false : true" -->
            </div>
            <!-- END   推荐商品列表 -->
          </div>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <!-- <a v-if="good.length > num" href="javascript:;" @click="showMore"
      >查看更多</a
    >
    <span v-else>没有更多了</span> -->
  </div>
</template>

<script>
import { Swipe, swipeItem, Skeleton } from '@chipspc/vant-dgg'
import TabCurve from '~/components/common/tab/TabCurve'
import adJumpHandle from '~/mixins/adJumpHandle'
import GoodItem from '~/components/spread/transaction/trademark/ProductItem'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Skeleton.name]: Skeleton,
    TabCurve,
    GoodItem,
  },
  mixins: [adJumpHandle],
  props: {
    planner: {
      type: Object,
      default: () => {
        return {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
          imgSrc: '',
        }
      },
    },
  },
  data() {
    return {
      tabBtnList: [
        { name: '推荐商标', type: 0 },
        { name: '优质商标', type: 1 },
        { name: '特价急售', type: 2 },
      ],
      marks: [
        '化妆日用',
        '医药药品',
        '家用电器',
        '皮革箱包',
        '服装鞋帽',
        '食品行页',
      ],
      tabBtn: [], // 对象有goodsList字段是商品列表
      loading: false, // 加载按钮，调接口时为true
      currentItem: 0, // 默认tabs选中第一个
      searchDomHeight: 0, // 选项卡吸顶时与顶部的距离
      params: {
        dictionaryCode: 'C-SY-RMJY-GG', // 查询数据字典的code
        findType: 0, // 查询类型：0：初始查询广告+数据字典+推荐商品  1：查询广告+推荐商品 2：只查推荐商品
        userId: '', // 用户id
        deviceId: '', // 设备ID（用户唯一标识） 0022ef1a-f685-469a-93a8-5409892207a2
        areaCode: '', // 区域编码
        sceneId: 'app-mainye-01', // 场景ID
        maxsize: 100, // 要求推荐产品的数量
        platform: 'APP', // 平台（app,m,pc）
        formatId: '', // 产品类别
        locationCode: '', // 查询广告的位置code
      },
      goodList: [],
      scrollAction: { x: 'undefined', y: 'undefined' },
      scrollDirection: '',
      recommendedList: [], // 推荐商标列表
      highQualityList: [], // 优质商标列表
      specialOfferList: [], // 特价急售商标列表
      good: [],
    }
  },
  computed: {
    cityCode() {
      return this.$store.state.city.currentCity.code
    },
  },
  created() {
    if (process.client) {
      this.getGoodList()
    }
  },

  methods: {
    // 加载更多
    // showMore() {
    //   this.num = this.num + 10
    // },
    // 滚动加载更多
    handleScroll() {
      if (
        this.tabBtn.length &&
        this.tabBtn[this.currentItem].goodsList.length &&
        !this.loading &&
        !this.tabBtn[this.currentItem].noMore
      ) {
        const pageScrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop // 滚动条距离顶部的位置
        const pageScrollHeight = document.body.scrollHeight // 页面文档的总高度
        const pageClientHeight = window.innerHeight // 窗口文档显示区域的高度
        // 监听页面是否滚动到底部加载更多数据
        if (Math.ceil(pageScrollTop + pageClientHeight) >= pageScrollHeight) {
          this.loading = true
          this.tabBtn[this.currentItem].page += 1
          this.params.findType = 2
          this.getGoodList({})
        }
      }
    },
    // 选项卡选择某项：切换轮播，显示不同内容
    selectTabHandle({ index, type }) {
      this.goodList = []
      this.$refs.recomRef.swipeTo(index)
    },
    // 切换轮播时触发
    onChange(index) {
      this.switchHandle(index)
      this.currentItem = index
    },
    switchHandle(index) {
      if (this.tabBtnList[index].type === 0) {
        this.good = this.recommendedList
      } else if (this.tabBtnList[index].type === 1) {
        this.good = this.highQualityList
      } else if (this.tabBtnList[index].type === 2) {
        this.good = this.specialOfferList
      }
    },
    preventTouch(e) {
      e.stopImmediatePropagation() // 阻止冒泡
    },
    // 根据接口获取商品列表
    getGoodList() {
      this.loading = true
      this.$axios
        .get(
          'https://microuag.dgg188.cn/xdy-portal-product-api/trademark/recommend'
        )
        .then((res) => {
          this.loading = false
          if (res.code === 'SYS_0000') {
            // 获取商品后，处理商品数据
            this.goodList = res.data
            this.processData(this.goodList)
            this.switchHandle(0)
          }
        })
    },
    // 处理数据
    processData(data) {
      const recommended = []
      const highQuality = []
      const specialOffer = []
      const reg = /^[\u4E00-\u9FA5]{1,3}$/
      const rg = /^[\u4E00-\u9FA5]{1,3}\s[a-zA-Z]{1,8}$/
      const englishRg = /^[a-zA-Z]{1,8}$/
      data.forEach((item, index) => {
        if (
          item.firstCategoryName === '化妆日用' ||
          item.firstCategoryName === '医药药品' ||
          item.firstCategoryName === '家用电器' ||
          item.firstCategoryName === '服装鞋帽' ||
          item.firstCategoryName === '皮革箱包' ||
          item.firstCategoryName === '食品鱼肉'
        ) {
          recommended.push(item)
        }
        if (
          reg.test(item.trademarkName) ||
          rg.test(item.trademarkName) ||
          englishRg.test(item.trademarkName)
        ) {
          highQuality.push(item)
        }
        if (item.sellPrice < 20000) {
          specialOffer.push(item)
        }
      })
      this.recommendedList = recommended
      this.highQualityList = highQuality
      this.specialOfferList = specialOffer
    },
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
@skeleton-row-margin-top: 0;

.my-component {
  width: 100%;
  padding-bottom: 164px;
  > a {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 88px;
    background: #ebf2ff;
    opacity: 0.7;
    border-radius: 8px;
    line-height: 88px;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: #387cee;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  > span {
    display: block;
    font-size: 30px;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .btn {
    margin: 0 auto;
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
}
.scroll-recommend {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 80px;
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
      background: #f8f8f8;
      border-radius: 4px;
      font-size: 26px;
      line-height: 68px;
      font-weight: 400;
      color: #222222;
      padding: 0 20px;
      margin-right: 24px;
    }
  }
}
.tab-curve::after {
  display: block;
  content: '';
  width: 100%;
  height: 1px;
  background: #f4f4f4;
  margin-bottom: 24px;
  margin-top: 12px;
}

.goods-list {
  position: relative;
  width: 100%;
  padding: 0 40px;
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    img {
      width: 340px;
      height: 340px;
    }
    > p {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
.my-swipe {
  ::v-deep.sp-skeleton {
    padding: 32px 0;
  }
  ::v-deep.sp-skeleton__content {
    padding-top: 0;
  }
}
::v-deep.sp-sticky--fixed {
  width: @spread-page-width;
  margin: 0 auto;
}
</style>
