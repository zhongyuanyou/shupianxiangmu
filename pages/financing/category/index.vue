<template>
  <div class="category">
    <!--S 头部-->
    <div
      class="category_header"
      :style="{
        height: isInApp ? '110px' : '',
        paddingTop: isInApp ? '64px' : '',
        paddingBottom: isInApp ? '32px' : '',
      }"
    >
      <div v-if="!isApplets" class="icon" @click="back">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a" />
      </div>
      <div class="category_header_con" @click="goSearch">
        <my-icon name="sear_ic_sear" size="0.28rem" color="#999" />
        <div class="input_con">请输入搜索内容</div>
      </div>
    </div>
    <!--E 头部-->
    <!--S 内容区-->
    <div class="category_con" :style="{ paddingTop: isInApp ? '105px' : '' }">
      <!--S 侧边栏区域-->
      <aside ref="l_list" class="category_con_lf">
        <ul>
          <li
            v-for="(item, index) in categoryList"
            ref="l_item"
            :key="index"
            class="category_con_lf_item"
            :style="{
              backgroundColor: TabNavList == index ? '#f5f5f5' : '#fff',
            }"
            @click="handleClick(index)"
          >
            <i v-if="index === TabNavList - 1" class="circular"></i>
            <i v-if="index === TabNavList - 1" class="circular1"></i>
            <div v-show="TabNavList == index" class="line"></div>
            <span>{{ item.title }}</span>
            <i v-if="index === TabNavList + 1" class="radio"></i>
            <i v-if="index === TabNavList + 1" class="radio1"></i>
          </li>
          <li class="category_con_lf_item"></li>
        </ul>
      </aside>
      <!--S 侧边栏区域-->
      <!--S 二级分类区域-->
      <section ref="r_list" class="category_con_rt">
        <div>
          <!-- <div ref="good" class="proList swiper" style="padding-top: 0">
            <div class="swiper_con">
              <swiper
                ref="mySwiper"
                class="my-swipe"
                :autoplay="true"
                :options="swiperOptions"
                @click-slide="handleClickSlide"
              >
                <swiper-slide v-for="(item, index) of req" :key="index">
                  <sp-image fit="cover" class="swipe_img" :src="item" />
                </swiper-slide>
                <div slot="pagination" class="swiper-pagination"></div>
              </swiper>
            </div>
          </div> -->
          <div
            v-for="(item, index) in categoryList"
            :key="index"
            ref="good"
            class="proList"
          >
            <div class="title">{{ item.title }}</div>
            <div
              :class="['item_con', { hidden_child: item.name == '为您推荐' }]"
              :style="{
                justifyContent:
                  item.title === '大家都在用' ? ' space-around' : '',
              }"
            >
              <div
                v-for="(cItem, cIndex) in item.product"
                v-show="isApplets ? cItem.name != '资质交易' : true"
                :key="cIndex"
                :class="
                  item.title === '大家都在用' ? 'icon-box' : 'item_con_child'
                "
                @click="handleItem(cItem, item.title, item.url)"
              >
                <div v-if="item.title === '大家都在用'">
                  <div class="icon-img">
                    <img :src="cItem.icon" alt="" />
                  </div>
                  <div class="icon-title">{{ cItem.title }}</div>
                </div>

                <div v-else>{{ cItem.title }}</div>
              </div>
            </div>
          </div>
          <div class="bot"></div>
        </div>
      </section>
      <!--E 二级分类区域-->
    </div>
    <Loading-center v-show="loading" />
    <!--E 内容区-->
    <!-- <client-only>
      <openApp />
    </client-only> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Better from 'better-scroll'
import { Swipe, SwipeItem, Image } from '@chipspc/vant-dgg'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { financingApi } from '@/api/spread'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import adJumpHandle from '~/mixins/adJumpHandle'
import 'swiper/swiper-bundle.css'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'Index',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    LoadingCenter,
    // eslint-disable-next-line vue/no-unused-components
    Swiper,
    // eslint-disable-next-line vue/no-unused-components
    SwiperSlide,
  },
  mixins: [adJumpHandle],
  data() {
    return {
      keywords: '',
      categoryList: [], // 产品分类
      recommendData: [], // 广告数据
      req: [
        'https://img.yzcdn.cn/vant/cat.jpeg',
        'https://img.yzcdn.cn/vant/cat.jpeg',
      ],
      arr: [0], // 高度集合
      scrollY: 0,
      TabNavList: 0, // 左右联动取值
      flag: true,
      categoryData: [], // 当前点击的分类相关数据
      loading: false,
      swiperOptions: {
        autoplay: true,
        initialSlide: 0,
        speed: 400,
        direction: 'horizontal',
        paginationClickable: true,
        mousewheelControl: true,
        passiveListeners: false, // 用来提升swiper在移动设备的中的scroll表现（Passive Event Listeners），但是会和e.preventDefault冲突，所以有时候你需要关掉它。
        touchAngle: 30, // 允许触发拖动的角度值。默认45度，即使触摸方向不是完全水平也能拖动slide。
        threshold: 12,
      },
      code: '',
      locationCode: '',
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity,
      isApplets: (state) => state.app.isApplets,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    this.code = this.$route.query.code
    this.locationCode = this.$route.query.locationCode
    this.getCategoryList()
  },
  methods: {
    _initScroll() {
      // 初始化滚动事件
      this.left = new Better(this.$refs.l_list, {
        click: true,
        probeType: 3,
      })
      this.rgt = new Better(this.$refs.r_list, {
        probeType: 3,
        click: true,
      })
      this.rgt.on('scroll', (res) => {
        if (this.flag) {
          this.scrollY = Math.abs(res.y) + 100
          for (let i = 0; i < this.arr.length; i++) {
            if (this.scrollY > this.arr[i] && this.scrollY < this.arr[i + 1]) {
              this.TabNavList = i // 左右联动取值
              // document.getElementById(this.TabNavList).scrollIntoView()
              this.left.scrollToElement(
                this.$refs.l_list,
                100,
                0,
                this.TabNavList * 62
              )
            }
          }
        }
      })
    },
    _getHeight() {
      // 集合右侧内容模块高度
      const rightItems = this.$refs.r_list.getElementsByClassName('proList')
      setTimeout(() => {
        // 根据betterScroll定义滚动
        if (rightItems && rightItems.length > 0) {
          let height = 0
          // this.arr.push(height)
          for (let i = 0; i < rightItems.length; i++) {
            const item = rightItems[i]
            height += item.clientHeight
            this.arr.push(height)
          }
        }
      }, 600)
    },
    handleClick(index) {
      this.flag = false
      this.TabNavList = index // 左右联动取值
      this.rgt.scrollToElement(this.$refs.good[index], 100, 0, 0)
      setTimeout(() => {
        this.flag = true
      }, 100)
    },
    async getCategoryList() {
      this.loading = true
      // 获取产品分类集合
      try {
        const url =
          'http://127.0.0.1:7001/service/nk/financing/v1/product_list.do'
        // financingApi.productList
        await this.$axios
          .get(financingApi.productList, {
            params: { code: this.locationCode, adCode: this.code },
          })
          .then((res) => {
            this.categoryList = res.data.records
          })
        this.loading = false
        this.$nextTick(() => {
          this._initScroll()
          this._getHeight()
        })
      } catch (err) {
        this.loading = false
      }
    },
    handleItem(product, title, url) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      if (this.isInApp) {
        const iOSRouters = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath:
              title !== '大家都在用'
                ? 'cpsc/goods/details/service'
                : 'cpsc/goods/service/list',
            parameter: { productId: product.id },
          },
        }
        const androidRouters = {
          path: '/flutter/main',
          parameter: {
            routerPath:
              title !== '大家都在用'
                ? 'cpsc/goods/details/service'
                : 'cpsc/goods/service/list',
            parameter: { productId: product.id },
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouters)
        const androidRouterStr = JSON.stringify(androidRouters)
        this.$appFn.dggJumpRoute({
          iOSRouter: iOSRouterStr,
          androidRouter: androidRouterStr,
        })
      } else {
        let code = this.product.classCodeLevel
          ? this.product.classCodeLevel.split(',')
          : []
        code = code.length > 0 ? code[0] : ''
        window.location.href =
          title !== '大家都在用'
            ? `https://${base}m.shupian.cn/detail?productId=${product.id}&classCodeOne=${code}`
            : `https://${base}m.shupian.cn/search/searchgoods`
      }
    },
    back() {
      this.$router.back()
    },
    goSearch() {
      if (this.isInApp) {
        const iOSRouters = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/search/page',
          },
        }
        const androidRouters = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cpsc/search/page',
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouters)
        const androidRouterStr = JSON.stringify(androidRouters)
        this.$appFn.dggJumpRoute({
          iOSRouter: iOSRouterStr,
          androidRouter: androidRouterStr,
        })
      } else {
        let base = ''
        DGG_SERVER_ENV === 'development' && (base = 'd')
        DGG_SERVER_ENV === 'release' && (base = 't')
        DGG_SERVER_ENV === 'production' && (base = '')
        window.location.href = `https://${base}m.shupian.cn/search`
      }
    },
    handleClickSlide(index) {
      this.adJumpHandleMixin(this.recommendData[index].materialList[0])
    },
  },
  head() {
    return {
      title: '全部分类',
      meta: [{ name: 'spptmd-track_code', content: 'SPW000010' }],
    }
  },
}
</script>

<style lang="less" scoped>
.category {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &_header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 128px;
    background: #ffffff;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    z-index: 6;
    .icon {
      height: 128px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
    }
    &_con {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      width: 606px;
      margin-left: auto;
      //   flex: 1;
      height: 96px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      padding: 0 24px;
      .input_con {
        width: 100%;
        height: 92px;
        border: none;
        font-size: 30px;
        color: #1a1a1a;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        padding-left: 15px;
      }
    }
  }
  &_con {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding-top: 128px;
    overflow: hidden;
    position: relative;
    display: flex;
    &_lf {
      display: block;
      width: 180px;
      background: #fff;
      overflow: hidden;
      position: relative;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
      &_item {
        height: 124px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        background: #fff;
        text-align: center;
        line-height: 124px;
        position: relative;
        .textOverflow(1);
        > .radio {
          background: #f5f5f5;
          width: 143px;
          height: 124px;
          position: absolute;
          display: block;
          z-index: 1;
          top: 0;
          left: 0;
        }
        > .radio1 {
          border-top-right-radius: 20px;
          background: #fff;
          width: 143px;
          height: 124px;
          position: absolute;
          display: block;
          z-index: 2;
          top: 0;
          left: 0;
        }
        > .circular {
          background: #f5f5f5;
          width: 143px;
          height: 124px;
          position: absolute;
          display: block;
          z-index: 1;
          top: 0;
          left: 0;
        }
        > .circular1 {
          border-bottom-right-radius: 20px;

          background: #fff;
          width: 143px;
          height: 124px;
          position: absolute;
          display: block;
          z-index: 2;
          top: 0;
          left: 0;
        }
        > span {
          position: relative;
          z-index: 5;
        }
      }
      .line {
        width: 6px;
        height: 40px;
        background-color: #4974f5;
        border-radius: 0 3px 3px 0;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -20px;
      }
    }
    &_rt {
      display: block;
      overflow: hidden;
      background: #f5f5f5;
      position: relative;
      width: calc(100vw - 200px);
      padding: 0 20px;
      padding-top: 20px;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      .bot {
        width: 100%;
        height: 120px;
      }
      .swiper {
        height: 180px;
        width: 100%;
        overflow: hidden;
        border-radius: 8px;
        padding-top: 0;
        &_con {
          padding-top: 16px;
          overflow: hidden;
          border-radius: 8px;
        }
      }
      .my-swipe .swiper-slide {
        color: #fff;
        text-align: center;
        background-color: #f8f8f8;
        height: 180px;
        border-radius: 8px;
        overflow: hidden;
        ::v-deep .sp-image__img {
          border-radius: 8px;
        }
        .swipe_img {
          width: 100%;
          height: 164px;
        }
      }

      .proList {
        background: #fff;
        padding: 26px 0 32px 20px;
        margin-top: 20px;
        border-radius: 8px;
        .title {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
        }
        .item_con {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
          &_child {
            background: #efeff4;
            border-radius: 4px;
            line-height: 60px;
            margin: 32px 32px 0 0;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            padding: 0 21px;
            height: 60px;
            max-width: 100%;
            .textOverflow(1);
          }
          .icon-box {
            display: flex;
            align-items: center;
            width: 150px;

            margin-top: 40px;
            .icon-img {
              width: 88px;
              height: 88px;
              border-radius: 36px;
              font-size: 0;
              margin: 0 auto;
              > img {
                width: 100%;
                height: 100%;
                border-radius: 40px;
              }
            }
            .icon-title {
              width: 150px;
              text-align: center;
              margin-top: 20px;
              font-size: 24px;
              line-height: 24px;
              overflow: hidden;
            }
          }
        }
        .hidden_child {
          height: 184px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
