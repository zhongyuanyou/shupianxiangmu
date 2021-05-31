<template>
  <div class="container_body">
    <div class="container" :class="showTitle === true ? 'header_bgc' : ''">
      <!-- Header Start -->
      <sp-sticky @scroll="handleScroll">
        <div
          class="container_header"
          :class="showTitle === true ? 'header_bgc' : ''"
        >
          <my-icon
            name="nav_ic_back"
            size="0.4rem"
            color="#FFFFFF"
            class="container_header_icon"
          ></my-icon>
          <div v-show="showTitle" class="container_header_title">
            {{ title }}
          </div>
        </div>
      </sp-sticky>
      <!-- Header End -->
      <!-- saleTop Start -->
      <div class="hotSaleTop">
        <div class="hotSaleTop_title">本月热销榜</div>
        <div class="hotSaleTop_span">
          <div class="hotSaleTop_span_top">TOP</div>
          <div class="hotSaleTop_span_text">每日更新</div>
        </div>
      </div>
      <!-- saleTop End -->
    </div>
    <sp-sticky :offset-top="44">
      <div class="container_items">
        <div v-for="(item, index) in itemArray" :key="index" class="items">
          <div
            class="items_item"
            :class="{ active: index === currentIndex }"
            @click="choose(index, item)"
          >
            <img :src="img" alt="" class="items_item_img" />
          </div>
          <p class="items_item_text">{{ item.name }}</p>
        </div>
      </div>
    </sp-sticky>
    <!-- 列表数据 start -->
    <div class="container_list">
      <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getHotList"
        >
          <div v-for="(item, index) in list" :key="index" class="list_item">
            <div class="list_item_left">
              <img :src="item.img" alt="" />
            </div>
            <div class="list_item_right">
              <div class="title" @click="goDetail(item.id)">
                {{ item.title }}
              </div>
              <div class="tabs" @click="goDetail(item.id)">
                <span v-for="(itemItem, i) in item.tabs" :key="i">{{
                  itemItem
                }}</span>
              </div>
              <div class="desc" @click="goDetail(item.id)">{{ item.desc }}</div>
              <div class="bottom">
                <div class="price">{{ item.price }}<span>元</span></div>
                <div class="sales_num">销量 {{ item.saleNum }}</div>
              </div>
            </div>
          </div>
        </sp-list>
      </sp-pull-refresh>
    </div>
  </div>
</template>
<script>
// import Header from '@/components/common/head/header'

import { mapState } from 'vuex'
import { Sticky, PullRefresh, List } from '@chipspc/vant-dgg'
import imHandle from '@/mixins/imHandle'
import { financingApi, plannerApi, newSpreadApi } from '@/api/spread'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV

export default {
  name: 'Index',
  mixins: [imHandle],
  components: {
    // Header,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },

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
    this.getHotList()
  },
  methods: {
    init() {
      this.getPagePlanner('app-ghsdgye-02')
      // 查询广告位分类列表数据
      if (this.$route.query.code) {
        this.code = this.$route.query.code
        this.findList()
      }
      if (this.isInApp) {
        this.$appFn.dggGetUserInfo((res) => {
          const { code, data } = res || {}
          if (code !== 200) {
            this.$appFn.dggLogin((loginRes) => {})
          } else {
            this.$appFn.dggOpenIM(
              {
                name: this.pagePlanner.name,
                userId: this.pagePlanner.id,
                userType: this.pagePlanner.type,
              },
              (res) => {
                const { code } = res || {}
                if (code !== 200)
                  this.$xToast.show({
                    message: `联系失败`,
                    duration: 1000,
                    forbidClick: true,
                    icon: 'toast_ic_remind',
                  })
              }
            )
          }
        })
      }
    },
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
      } else {
        this.$xToast.show(res.message)
      }
    },
    // 获取推荐规划师
    async getPagePlanner(scene) {
      const device = await this.$getFinger().then((res) => {
        return res
      })
      let areaCode = '510100' // 站点code
      // 站点code
      if (this.isInApp) {
        this.$appFn.dggCityCode((res) => {
          areaCode = res.data.adCode
        })
      } else {
        areaCode = this.currentCity.code
      }
      try {
        this.$axios
          .post(
            plannerApi.plannerReferrals,
            {
              login_name: '',
              deviceId: device, // 设备标识
              area: areaCode || '510100', // 站点code
              user_id: '',
              productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
              sceneId: scene, // 场景id
              level_2_ID: '', // 二级code
              platform: 'app',
              productId: '', //
              thirdTypeCodes: '', // 三级code
              firstTypeCode: 'FL20210425164307', // 一级code
            },
            {
              headers: {
                sysCode: 'cloud-recomd-api',
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            if (res.code === 200 && res.data.length > 0) {
              this.pagePlanner = {
                id: res.data[0].mchUserId,
                name: res.data[0].userName,
                type: res.data[0].type,
                jobNum: res.data[0].userCenterNo,
                telephone: res.data[0].phone,
                imgSrc: res.data[0].imgaes,
              }
              console.log('this.pagePlanner', this.pagePlanner)
            } else {
              this.$xToast.show({
                message: `已提交，我们会尽快联系您`,
                duration: 3000,
                forbidClick: true,
                icon: 'toast_ic_remind',
              })
            }
          })
      } catch (error) {
        console.log('plannerApi.plannerReferrals error：', error.message)
      }
    },
    // 获取热榜列表数据
    async getHotList(code) {
      if (code) {
        this.params.classCodes = code
      }

      const url = newSpreadApi.service_product_list
      const params = this.params
      const res = await this.$axios.get(url, { params })
      if (res.code === 200) {
        this.list = this.list.concat(res.data.records)
        this.loading = false
        this.params.start++
        console.log('this.page', this.params.start)
        if (this.params.start > Math.ceil(res.data.total / res.data.pageSize)) {
          this.finished = true
        }
      } else {
        this.loading = false
        this.finished = true
      }
    },
    handleScroll(e) {
      this.showTitle = e.isFixed
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    choose(index, item) {
      this.start = 1
      this.currentIndex = index
      this.getHotList(item.ext1)
    },
    // 跳详情
    goDetail(id) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      window.location.href = `https://${base}m.shupian.cn/detail?productId=${id}`
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
.container_body {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 400px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/bjaz4tc4ihs0000.png')
      no-repeat;
    background-size: 100%;
    &_header {
      height: 88px;
      width: 100%;
      .flexMixin();
      justify-content: center;
      position: relative;
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
        top: 143px;
        margin-left: @marginLeft+20px;
        color: #ffffff;
      }
      &_span {
        .flexMixin();
        position: absolute;
        top: 242px;
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
        color: #222222;
        line-height: 37px;
        font: bold 26px/37px @font-medium;
        margin-top: 10px;
      }
    }
    .items:nth-of-type(1) {
      margin-left: 0;
      text-align: center;
    }
  }
  .container_list {
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
        > img {
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
            max-width: 92px;
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
