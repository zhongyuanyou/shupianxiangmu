<template>
  <div class="exchange-square">
    <sp-sticky>
      <Header
        style="height: 56px"
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
          <img :src="item.materialUrl" alt="" @click="jump(item)" />
        </sp-swipe-item>
      </sp-swipe>
      <!-- 金刚区 -->
      <NavList :nav-list="scrollNavList" />
      <!-- 服务 -->
      <Advertising
        :gg-lf-list="adLfList[0]"
        :gg-rg-list="adRgList"
      ></Advertising>
      <div class="resource">全部资源</div>
      <CompanyMenu
        :list="['Industry', 'Region', 'Price', 'More', 'Sortord']"
        :background="isFixed ? '#ffffff' : 'none'"
        :active="0"
        info="暂无搜索结果"
        @scrollEvent="scrollEvent"
      />
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, List, Sticky } from '@chipspc/vant-dgg'
// import CompanyGood from '@/components/exchange_square/CompanyGood.vue'
import { plannerApi, newSpreadApi } from '@/api/spread'
import Header from '@/components/exchange_square/common/Header.vue'
import NavList from '@/components/exchange_square/common/NavList.vue'
import CompanyMenu from '~/components/exchange_square/list/CompanyMenu.vue'
import Advertising from '@/components/exchange_square/common/Advertising.vue'
import jump from '@/mixins/jump'
export default {
  components: {
    CompanyMenu,
    [Swipe.name]: Swipe,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [SwipeItem.name]: SwipeItem,
    Header,
    NavList,
    Advertising,
    // CompanyGood,
  },
  mixins: [jump],
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
      scrollNavList: [],
      adLfList: [],
      adRgList: [],
      // 商品列表导航
      goodNavlist: [
        { name: '公司交易', code: 1, type: 1 },
        { name: '商标交易', code: 1, type: 1 },
        { name: '专利交易', code: 1, type: 1 },
        { name: '资质并购', code: 1, type: 1 },
      ],
      list: [],
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.windowScroll)
    this.getList()
  },
  methods: {
    onLoad() {
      this.finished = true
      this.loading = false
    },
    scrollEvent(e) {
      this.isFixed = e
    },
    getList() {
      this.$axios
        .get(newSpreadApi.list, {
          params: {
            locationCodes: 'zgsCpq1,zgsCpq2,gsBanner',
            navCodes: 'navTygcZgs',
            code: 'jy-sb',
          },
        })
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.scrollNavList = res.data.navs.navTygcZgs.reverse()

            res.data.adList.forEach((item) => {
              if (item.locationCode === 'zgsCpq1') {
                this.adLfList = this.getData(item.sortMaterialList)
                console.log(this.adLfList)
              } else if (item.locationCode === 'zgsCpq2') {
                this.adRgList = this.getData(item.sortMaterialList)
              } else if (item.locationCode === 'gsBanner') {
                this.swipeList = this.getData(item.sortMaterialList)
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getData(item) {
      const arr = []
      item.forEach((ele) => {
        arr.push(ele.materialList[0])
      })
      return arr
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
    padding: 34px 20px 6px;
    font-weight: bold;
    font-size: 32px;
    color: #222222;
  }
}
</style>
