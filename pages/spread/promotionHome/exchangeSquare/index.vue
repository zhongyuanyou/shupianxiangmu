<template>
  <div class="exchange-square">
    <Header title="交易广场" />
    <sp-swipe class="banner" :autoplay="3000" indicator-color="white">
      <sp-swipe-item v-for="(item, index) in swipeList" :key="index">
        <img :src="item.bg" alt="" />
      </sp-swipe-item>
    </sp-swipe>
    <NavBar></NavBar>
    <ScrollNav :roll-nav="scrollNavList"></ScrollNav>
    <GoodsList :nav="goodNavlist"></GoodsList>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import Header from '@/components/exchange_square/common/Header.vue'
import NavBar from '@/components/spread/promotionHome/internetHomePage/NavBar.vue'
import ScrollNav from '@/components/spread/common/Nav.vue'
import GoodsList from '@/components/exchange_square/common/GoodsList.vue'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    Header,
    NavBar,
    ScrollNav,
    GoodsList,
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
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
.exchange-square {
  width: 750px;
  margin: 0 auto;
  background: #f5f5f5;
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
}
</style>
