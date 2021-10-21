<template>
  <div class="exchange-square">
    <sp-sticky>
      <Header
        title="找公司"
        placeholder="请输入关键词"
        :bg-color="isFixed ? '#ffffff' : '#f5f5f5'"
        :search-color="isFixed ? '#f5f5f5' : '#ffffff'"
        path="/exchange_square/lookCompany/selectionPage"
      />
    </sp-sticky>
    <div style="overflow-y: auto">
      <sp-swipe class="banner" :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(item, index) in swipeList" :key="index">
          <img :src="item.bg" alt="" />
        </sp-swipe-item>
      </sp-swipe>
      <!-- 金刚区 -->
      <NavBar />
      <!-- 服务 -->
      <div class="serve">
        <div class="left">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/9ehu61fsmhc0000.jpeg"
            alt=""
          />
        </div>
        <div class="right">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/578ax9goa0g0000.jpeg"
            alt=""
          />
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/7cb5095apvs0000.jpeg"
            alt=""
          />
        </div>
      </div>
      <div class="resource">全部资源</div>
      <sp-sticky :offset-top="56" @scroll="scrollEvent">
        <CompanyMenu
          :list="['Industry', 'Region', 'Price', 'More', 'Sortord']"
          :style="{ background: isFixed ? '#ffffff' : 'none' }"
          :top="48"
          :active="0"
        />
      </sp-sticky>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, List, Sticky } from '@chipspc/vant-dgg'
// import CompanyGood from '@/components/exchange_square/CompanyGood.vue'
import Header from '@/components/exchange_square/common/Header.vue'
import NavBar from '@/components/spread/promotionHome/internetHomePage/NavBar.vue'
import CompanyMenu from '~/components/exchange_square/list/CompanyMenu.vue'
export default {
  components: {
    CompanyMenu,
    [Swipe.name]: Swipe,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [SwipeItem.name]: SwipeItem,
    Header,
    NavBar,
    // CompanyGood,
  },
  async asyncData({ $axios }) {},
  data() {
    return {
      // 头部banner
      swipeList: [
        {
          bg: 'https://cdn.shupian.cn/sp/cms/9tue3h5ei1w0000.png',
          code: 1,
          describe: '',
          title: '',
        },
      ],
      bgColor: '',
      isFixed: false,
      searchColor: '',
      loading: false,
      finished: false,
      // 滚动金刚区
      scrollNavList: [
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
        {
          name: '我要出售',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/6ml7ssha0nc0000.png',
          size: 'small',
        },
      ],
      // 商品列表导航
      goodNavlist: [
        { name: '公司交易', code: 1, type: 1 },
        { name: '商标交易', code: 1, type: 1 },
        { name: '专利交易', code: 1, type: 1 },
        { name: '资质并购', code: 1, type: 1 },
      ],
      list: [
        {
          name: '大庆****建筑装饰工程有限责任公司',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****建',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
        {
          name: '大庆****',
          address: '黑龙江',
          tag: ['安全交易', '1对1服务'],
          price: '123321',
          time: '五年以上',
          type: '小规模纳税',
          capital: '500万以上',
          industry: '电子贸易',
          img: 'https://cdn.shupian.cn/1633671933000_eba8e1ec-2d40-4c90-9602-19dc5543bfef.jpg',
          slogan: '餐饮｜已下证',
        },
      ], // 商品数据
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    onLoad() {
      this.finished = true
      this.loading = false
    },
    scrollEvent(e) {
      this.isFixed = e.isFixed
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .sp-dropdown-menu__bar {
  background: none;
}
.exchange-square {
  width: 750px;
  margin: 0 auto;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .banner {
    margin: 10px 20px 0 20px;
    img {
      width: 710px;
      height: 240px;
    }
  }
  ::v-deep.nav-bar {
    .nav-content {
      background: none;
    }
  }
  .serve {
    padding: 0 20px;
    display: flex;
    .left,
    img {
      width: 355px;
      height: 290px;
    }
    .right {
      margin-left: 10px;
      img {
        width: 335px;
        height: 140px;
        &:last-child {
          margin-top: 10px;
        }
      }
    }
  }
  .resource {
    padding: 32px 20px;
    font-weight: bold;
    font-size: 32px;
    color: #222222;
  }
}
</style>
