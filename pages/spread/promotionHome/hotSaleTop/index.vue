<template>
  <div class="container_body">
    <div
      class="container"
      :class="showTitle === true ? 'header_bgc' : ''"
      :style="isInApp ? 'height:200px' : ''"
    >
      <!-- Header Start -->
      <sp-sticky @scroll="handleScroll">
        <!-- <Header
          :title="scrollTop > 160 ? title : ''"
          :class="scrollTop > 160 ? 'head_active' : ''"
        /> -->
        <div
          class="container_header"
          :class="showTitle === true ? 'header_bgc' : ''"
          :style="
            isInApp && appType === 'Android'
              ? 'padding-top:20px;height:64px'
              : isInApp && appType === 'IOS'
              ? 'height:90px'
              : ''
          "
        >
          <!--  :style="isInApp ? 'padding-top:20px;height:64px' : ''" -->
          <my-icon
            name="nav_ic_back"
            size="0.4rem"
            color="#FFFFFF"
            class="container_header_icon"
            @click.native="goBack"
          ></my-icon>
          <div v-show="showTitle" class="container_header_title">
            {{ title }}
          </div>
        </div>
      </sp-sticky>
      <!-- Header End -->
      <!-- saleTop Start -->
      <div class="hotSaleTop">
        <div class="hotSaleTop_title" :style="isInApp ? 'top:96.5px' : ''">
          本月热销榜
        </div>
        <div class="hotSaleTop_span" :style="isInApp ? 'top:151px' : ''">
          <div class="hotSaleTop_span_top">TOP</div>
          <div class="hotSaleTop_span_text">每日更新</div>
        </div>
      </div>
      <!-- saleTop End -->
    </div>
    <sp-sticky
      v-if="itemArray.length > 1"
      :offset-top="
        isInApp && appType === 'Android'
          ? 64
          : isInApp && appType === 'IOS'
          ? 90
          : 42
      "
    >
      <div
        class="container_items"
        :class="scrollTop > 160 ? 'scroll_active' : ''"
      >
        <div v-for="(item, index) in itemArray" :key="index" class="items">
          <div
            class="items_item"
            :class="{ active: index === currentIndex }"
            @click="choose(index, item)"
          >
            <img :src="img" alt="" class="items_item_img" />
          </div>
          <p
            class="items_item_text"
            :class="{ pactive: index === currentIndex }"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </sp-sticky>
    <!-- 列表数据 start -->
    <div class="container_list">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getHotList"
      >
        <div v-for="(item, index) in list" :key="index" class="list_item">
          <div class="list_item_left">
            <img
              :src="index < 3 ? tags[index] : tags[3]"
              alt=""
              class="tag"
              :class="index > 2 ? 'tag_more_three' : ''"
            />
            <div :class="index > 2 ? 'div_more_three' : ''">
              {{ index + 1 }}
            </div>
            <img :src="item.img" alt="" />
          </div>
          <div class="list_item_right">
            <div class="title" @click="goDetail(item.id)">
              {{ item.title }}
            </div>
            <div class="tabs" @click="goDetail(item.id)">
              <span v-for="(itemItem, i) in item.tabs.slice(0, 3)" :key="i">{{
                itemItem
              }}</span>
            </div>
            <div class="desc" @click="goDetail(item)">{{ item.desc }}</div>
            <div class="bottom">
              <div class="price">{{ item.price }}<span>元</span></div>
              <div class="sales_num">销量 {{ item.saleNum }}</div>
            </div>
          </div>
        </div>
      </sp-list>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Sticky, PullRefresh, List } from '@chipspc/vant-dgg'
import imHandle from '@/mixins/imHandle'
import { newSpreadApi } from '@/api/spread'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV

export default {
  name: 'Index',
  components: {
    // Header,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  mixins: [imHandle],
  data() {
    return {
      placeholder: '头部',
      title: '本月热销榜',
      showTitle: false,
      loading: false,
      finished: false,
      refreshing: false,
      currentIndex: 0,
      itemArray: [],
      list: [],
      params: {
        classCodes: '',
        start: 1,
        limit: 15,
        orderTypes: 'SALES_SORT',
      },
      pagePlanner: {},
      code: '',
      img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
      tags: [
        'https://cdn.shupian.cn/sp-pt/wap/8ayrce9irt80000.png',
        'https://cdn.shupian.cn/sp-pt/wap/7a7qefqoqkw0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/64j9lhn7x4w0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/7i5iyj5xqnk0000.png',
      ],
      scrollTop: 0,
      appType: '',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    this.init()
    this.appType = this.isAndroidOrIOS()
  },
  methods: {
    init() {
      // 查询广告位分类列表数据
      if (this.$route.query.code) {
        this.code = this.$route.query.code
        this.findList()
      }
    },
    // 获取列表
    async findList() {
      const url = newSpreadApi.list
      const params = {
        locationCodes: '',
        navCodes: '',
        code: this.code,
      }
      const res = await this.$axios.get(url, { params })
      if (res.code === 200) {
        res.data.classList.forEach((item) => {
          this.itemArray.push(item)
        })
        this.getHotList(this.itemArray[0].ext1)
      } else {
        this.$xToast.show(res.message)
      }
    },
    handleScroll(e) {
      this.showTitle = e.isFixed
      this.scrollTop = e.scrollTop
      // console.log(this.scrollTop)
      // this.scrollTop > 160 ? (this.title = '本月热销榜') : (this.title = '')
    },
    onRefresh() {
      // 清空列表数据
      // this.list = []
      // this.finished = false
      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.params.start = 1
      // this.getHotList()
    },
    choose(index, item) {
      this.params.start = 1
      this.list = []
      this.getHotList(item.ext1)
      this.currentIndex = index
    },
    // 获取热榜列表数据
    async getHotList(code) {
      if (!code) {
        this.finished = true
        console.log('请求数据')
        return
      }
      this.params.classCodes = code
      const url = newSpreadApi.service_product_list
      const params = this.params
      const res = await this.$axios.get(url, { params })
      if (res.code === 200) {
        this.list = this.list.concat(res.data.records)
        this.loading = false
        this.params.start++
        if (this.params.start > Math.ceil(res.data.total / res.data.pageSize)) {
          this.finished = true
        }
      } else {
        this.loading = false
        this.finished = true
      }
    },
    // 跳详情
    goDetail(product) {
      if (this.isInApp) {
        const iOSRouters = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId: product.id },
          },
        }
        const androidRouters = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
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
        let base = ''
        DGG_SERVER_ENV === 'development' && (base = 'd')
        DGG_SERVER_ENV === 'release' && (base = 't')
        DGG_SERVER_ENV === 'production' && (base = '')
        let code = this.product.classCodeLevel
          ? this.product.classCodeLevel.split(',')
          : []
        code = code.length > 0 ? code[0] : ''
        window.location.href = `https://${base}m.shupian.cn/detail?productId=${product.id}&classCodeOne=${code}`
      }
    },
    // 返回 上一级
    goBack() {
      // 返回上一页
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },

    // 监听页面滚动时间
    scrollHandle() {},

    // @--判断页面所在设备的系统
    isAndroidOrIOS() {
      const ua = navigator.userAgent
      const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
      const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

      if (isAndroid) {
        this.userAgent = 'Android'
        console.log('安卓系统')
        return 'Android'
      }
      if (isiOS) {
        this.userAgent = 'IOS'
        console.log('IOS系统')
        return 'IOS'
      }
      console.log(ua)
    },
  },
}
</script>
<style lang="less">
@paddingLeft: 20px;
@marginLeft: 20px;
@font-medium:pingfangsc-medium, PingFang SC;
@font-regular: PingFangSC-Regular, PingFang SC;
.backGround(@url) {
  background: url(@url);
  background-size: 100% 100%;
}
.flexMixin {
  display: flex;
  align-items: center;
}
.flexStart {
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
}
.textoverflow (@line) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @line;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.padding {
  padding: 0 20px;
}
.header_bgc {
  background: #4974f5 !important;
}
.active {
  background: url('https://cdn.shupian.cn/sp-pt/wap/ebl77wjvmqo0000.png') !important;
  background-size: 100% 100% !important;
}
.my-head {
  box-shadow: none !important;
  background: transparent !important;
  .title {
    color: #ffffff !important;
  }
  .slot-left {
    .back-icon {
      color: #ffffff !important;
    }
  }
}
.head_active {
  background-color: #4974f5;
}
.container_body {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 400px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/bjaz4tc4ihs0000.png')
      no-repeat;
    background-size: 100% 100%;
    &_header {
      height: 88px;
      width: 100%;
      .flexMixin();
      justify-content: center;
      position: relative;
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
      &_icon {
        margin-left: @marginLeft+12px;
        position: absolute;
        left: 0;
      }
      &_title {
        color: #ffffff;
        font: bold 36px/36px @font-medium;
      }
    }
    .hotSaleTop {
      &_title {
        height: 87px;
        font: bold 62px/87px @font-medium;
        position: absolute;
        top: 153px;
        margin-left: @marginLeft+20px;
        color: #ffffff;
      }
      &_span {
        .flexMixin();
        position: absolute;
        top: 262px;
        margin-left: @marginLeft+20px;
        &_top {
          color: #ffffff;
          font: 400 26px/37px @font-regular;
          padding: 6px 18px;
          background: #4974f5;
          border: 1px solid #4974f5;
          border-radius: 4px 0px 0px 4px;
        }
        &_text {
          color: #ffffff;
          font: 400 26px/37px @font-regular;
          padding: 6px 20px;
          border: 1px solid #4974f5;
          border-radius: 4px 0px 0px 4px;
        }
      }
    }
  }
  .scroll_active {
    padding: 24px 0 20px 20px !important;
  }
  .container_items {
    .flexStart();
    padding: 40px 0 32px 32px;
    background: #f5f5f5;
    .items {
      margin: 0 24px;
      &_item {
        text-align: center;
        height: 88px;
        width: 88px;
        border-radius: 50%;
        .backGround('https://cdn.shupian.cn/sp-pt/wap/ckef12zrbpk0000.png');
        .flexMixin();
        justify-content: center;
        margin: 0 auto;
        > img {
          display: block;
          width: 40px;
          height: 40px;
        }
      }
      > p {
        height: 37px;
        color: #555555;
        line-height: 37px;
        font: 400 26px/37px @font-medium;
        margin-top: 10px;
      }
      .pactive {
        font: bold 26px/37px @font-medium;
        color: #4974f5;
      }
    }
    .items:nth-of-type(1) {
      margin-left: 0;
      text-align: center;
    }
  }
  .container_list {
    background: #f5f5f5;
    .list_item {
      height: 248px;
      background: #ffffff;
      border-radius: 24px;
      margin: 0 20px;
      padding: 24px;
      display: flex;
      margin-bottom: 20px;
      overflow: hidden;

      .list_item_left {
        margin-right: 28px;
        position: relative;
        .tag {
          width: 48px;
          height: 70px;
          position: absolute;
          top: -24px;
          left: 0;
        }
        .tag_more_three {
          position: absolute;
          top: -24px;
          left: 0;
          height: 49px;
          width: 49px;
        }
        > div {
          color: #ffffff;
          font: 400 18px @font-regular;
          position: absolute;
          left: 0;
          top: 0;
          width: 48px;
          text-align: center;
        }
        .div_more_three {
          height: 48px;
          line-height: 48px;
          color: #222222;
          top: -24px;
        }
        // div:nth-of-type(n > 3) {
        //   color: #ffffff;
        //   font: 400 18px @font-regular;
        //   position: absolute;
        //   left: 0;
        //   top: -24px;
        //   width: 48px;
        //   height: 49px;
        //   text-align: center;
        // }
        > img:nth-of-type(2) {
          width: 200px;
          height: 200px;
          background: #d8d8d8;
          border-radius: 16px;
          display: block;
        }
      }
      .list_item_right {
        .title {
          .textoverflow(1);
          height: 45px;
          color: #222222;
          font: bold 32px/45px @font-medium;
          margin-bottom: 12px;
        }
        .tabs {
          height: 28px;
          .flexMixin();
          margin-bottom: 12px;
          > span {
            padding: 4px 6px;
            margin-right: 8px;
            font: 400 20px @font-regular;
            color: #5c7499;
            background-color: #f0f2f5;
            border-radius: 4px;
            .textoverflow(1);
          }
        }
        .desc {
          .textoverflow(1);
          font: 400 22px/30px @font-regular;
          height: 30px;
          color: #222222;
          margin-bottom: 23px;
        }
        .bottom {
          height: 50px;
          .flexMixin();
          justify-content: space-between;
          width: 434px;
          .price {
            height: 50px;
            color: #ec5330;
            font: bold 36px/50px @font-medium;
            > span {
              height: 30px;
              font-size: 22px;
              color: #ec5330;
              font: bold 22px/30px @font-medium;
            }
          }
          .sales_num {
            height: 30px;
            color: #999999;
            font: 400 22px/30px @font-regular;
          }
        }
      }
    }
  }
}
</style>
