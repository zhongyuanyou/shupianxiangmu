<template>
  <div class="internet">
    <!-- 头部 -->
    <div class="head">
      <Header title="IT互联网" />
      <Nav :roll-nav="rollNav" class="nav"></Nav>
    </div>
    <!-- 金刚区 -->

    <!-- 新人红包 -->
    <GiftBag
      v-show="giftBagList.length"
      class="gift-bag"
      :gift-bag-list="giftBagList"
    ></GiftBag>
    <!-- 活动功能展示 -->
    <Advertising :advertising-list="advertisingList"></Advertising>
    <!-- 产品列表 -->
    <Recommended></Recommended>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '@/components/spread/common/Nav.vue'
import Header from '@/components/spread/common/NavTop.vue'
import GiftBag from '@/components/spread/promotionHome/internetHomePage/GiftBag.vue'
import Advertising from '@/components/spread/promotionHome/internetHomePage/Advertising.vue'
import Recommended from '@/components/spread/promotionHome/internetHomePage/Recommended.vue'
import { chipSpread } from '@/api/spread'
import { internetData } from '@/assets/spread/promotionHome/internetHomePage.js'

export default {
  components: {
    Header,
    Nav,
    GiftBag,
    Advertising,
    Recommended,
  },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(chipSpread.list, {
        params: {
          locationCodes:
            'ad113267,ad113229,ad113270,ad113271,ad113272,ad113274,ad113280',
          navCodes: 'nav100061',
          productCenterCode: 'Internet',
        },
      })

      if (res.code === 200) {
        console.log('请求成功')
        return {
          result: res,
        }
      }
      console.log('请求失败')
      return {
        result: internetData,
      }
    } catch (error) {
      console.log('请求错误')
      // 请求出错也要保证页面正常显示
      return {
        result: internetData,
      }
    }
  },
  data() {
    return {
      // marginTop: -120,
      rollNav: [],
      giftBagList: [],
      advertisingList: {
        limitedTime: {
          title: '限时秒杀',
          describe: '爆款低价',
          product: [],
        },
        live: {
          title: '企服直播',
          describe: '无门槛 新用户专享',
          product: [],
        },
        freeTrial: {
          title: '免费试用',
          describe: '0元体验 名额有限',
          product: [],
        },
        course: {
          title: '薯片课程',
          describe: '优质课程 创业首选',
          product: [],
        },
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    try {
      if (JSON.stringify(this.resultData) !== '{}') {
        this.navDetail(this.result.data.navs.nav100061)
        if (this.result.data.adList.length > 0) {
          this.getData(this.result.data.adList)
        } else {
          this.getData(internetData.data.adList)
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 跳转判断
    openIM(url) {
      if (url) {
        window.location.href = url
      } else {
        const guiHuaShi = this.planner
        this.$root.$emit(
          'openIMM',
          guiHuaShi.id,
          guiHuaShi.name || '',
          guiHuaShi.jobNum || '',
          guiHuaShi.imgSrc || ''
        )
      }
    },
    // 金刚区数据处
    navDetail(data) {
      if (data.length === 0) {
      } else {
        const navList = []
        data.forEach((item, index) => {
          const obj = {
            code: index + 1,
            name: item.name,
            url: item.url,
            size: 'small',
            label: '',
            imageUrl: item.navigationImageUrl,
          }
          navList.push(obj)
        })
        this.rollNav = navList.reverse()
      }
    },
    // 新人红包数据处理
    getData(data) {
      data.forEach((item, idx) => {
        if (item.locationCode === 'ad113229') {
          const bagList = []
          item.sortMaterialList.forEach((elem, index) => {
            const msg = elem.materialList[0].materialDescription.split('#')
            const obj = {
              code: index + 1,
              headImage: elem.materialList[0].materialUrl,
              label: msg[0],
              title: elem.materialList[0].materialName.split('#')[1],
              price: msg[1],
              url: elem.materialList[0].materialLink,
            }
            bagList.push(obj)
          })
          this.giftBagList = bagList
        }
        if (item.locationCode === 'ad113280') {
          const seckill = []
          item.sortMaterialList.forEach((elem, index) => {
            const obj = {
              code: index + 1,
              imgUrl: elem.materialList[0].materialUrl,
              label: elem.materialList[0].materialDescription,
              name: elem.materialList[0].materialName,
              url: elem.materialList[0].materialLink,
            }
            seckill.push(obj)
          })
          this.advertisingList.limitedTime.product = seckill
        }
        if (item.locationCode === 'ad113271') {
          const live = []
          item.sortMaterialList.forEach((elem, index) => {
            const obj = {
              code: index + 1,
              url: elem.materialList[0].materialLink,
              imgUrl: elem.materialList[0].materialUrl,
            }
            live.push(obj)
          })
          this.advertisingList.live.product = live
        }
        if (item.locationCode === 'ad113272') {
          const freeTrial = []
          item.sortMaterialList.forEach((elem, index) => {
            const obj = {
              code: index + 1,
              imgUrl: elem.materialList[0].materialUrl,
              label: elem.materialList[0].materialDescription,
              name: elem.materialList[0].materialName.split('#')[1],
              url: elem.materialList[0].materialLink,
            }
            freeTrial.push(obj)
          })
          this.advertisingList.freeTrial.product = freeTrial
        }
        if (item.locationCode === 'ad113274') {
          const course = []
          item.sortMaterialList.forEach((elem, index) => {
            const obj = {
              code: index + 1,
              imgUrl: elem.materialList[0].materialUrl,
              label: elem.materialList[0].materialDescription,
              name: elem.materialList[0].materialName.split('#')[1],
              url: elem.materialList[0].materialLink,
            }
            course.push(obj)
          })
          this.advertisingList.course.product = course
        }
      })
    },
  },
  head() {
    return {
      title: '互联网交易',
    }
  },
}
</script>

<style lang="less" scoped>
.internet {
  margin: 0 auto;
  width: 750px;
  background: #f5f5f5;
  .head {
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/8un99iso7e40000.png');
    background-repeat: no-repeat;
    background-size: 100%, 100%;
  }
  .nav {
    // margin-top: -270px;
  }
  .gift-bag {
    margin-top: 20px;
  }
}
</style>
