<template>
  <div class="exchange-square">
    <sp-sticky>
      <Header
        title="找商标"
        placeholder="请输入关键词"
        :bg-color="isFixed ? '#ffffff' : '#f5f5f5'"
        :search-color="isFixed ? '#f5f5f5' : '#ffffff'"
        path="/exchange_square/lookRrand/selectionPage"
      />
    </sp-sticky>
    <div style="overflow-y: auto">
      <sp-swipe class="banner" :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(item, index) in swipeList" :key="index">
          <img :src="item.materialUrl" alt="" @click="jump(item)" />
        </sp-swipe-item>
      </sp-swipe>
      <!-- 金刚区 -->
      <NavBar :nav-list="scrollNavList" />
      <!-- 服务 -->
      <div class="serve">
        <div class="right">
          <img
            v-for="(img, index) in adLfList"
            :key="index"
            :src="img.materialUrl"
            @click="jump(img)"
          />
        </div>
      </div>
      <div class="resource">全部资源</div>
      <CompanyMenu
        ref="CompanyMenu"
        :active="1"
        :list="['Category', 'Combination', 'Price', 'More', 'Sortord']"
        :on-load="onLoad"
        :background="isFixed ? '#ffffff' : 'none'"
        @getList="getList"
        @scrollEvent="scrollEvent"
      />
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, List, Sticky } from '@chipspc/vant-dgg'
import { plannerApi, newSpreadApi } from '@/api/spread'
import Header from '@/components/exchange_square/common/Header.vue'
import NavBar from '@/components/exchange_square/common/NavList.vue'
import CompanyMenu from '~/components/exchange_square/list/CompanyMenu.vue'
import jump from '@/mixins/jump'
export default {
  components: {
    CompanyMenu,
    [Swipe.name]: Swipe,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [SwipeItem.name]: SwipeItem,
    Header,
    NavBar,
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
      pageNum: 0,
      loading: false,
      finished: false,
      // 滚动金刚区
      scrollNavList: [],
      // 商品列表导航
      goodNavlist: [
        { name: '公司交易', code: 1, type: 1 },
        { name: '商标交易', code: 1, type: 1 },
        { name: '专利交易', code: 1, type: 1 },
        { name: '资质并购', code: 1, type: 1 },
      ],
      list: [], // 商品数据
    }
  },
  mounted() {
    this.getAdList()
  },
  methods: {
    onLoad() {
      console.log('触底了')
      this.loading = false
    },
    scrollEvent(e) {
      this.isFixed = e
    },
    getList(list) {
      console.error(list)
      this.list = list
    },
    getAdList() {
      this.$axios
        .get(newSpreadApi.list, {
          params: {
            locationCodes: 'zsbCpq,sbBanner',
            navCodes: 'navTygcZsb',
            code: 'jy-sb',
          },
        })
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.scrollNavList = res.data.navs.navTygcZsb.reverse()

            res.data.adList.forEach((item) => {
              if (item.locationCode === 'zsbCpq') {
                this.adLfList = this.getData(item.sortMaterialList)
                console.log(this.adLfList)
              } else if (item.locationCode === 'sbBanner') {
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
    .right {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      img {
        width: 350px;
        height: 140px;
        display: block;
        margin-right: 10px;
        margin-bottom: 10px;
      }
      img:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
  .resource {
    padding: 22px 20px 32px;
    font-weight: bold;
    font-size: 32px;
    color: #222222;
  }
}
</style>
