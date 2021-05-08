<template>
  <div class="enterprise-service">
    <!-- S 头部和金刚区 -->
    <div class="top-background">
      <NavTop
        title="企业服务"
        :disabled="true"
        :placeholder="placeholder"
        @clickInputHandle="clickInputHandle"
      />
      <Nav
        :roll-nav="rollNav"
        class="navs"
        :style="{ 'margin-top': marginTop + 'px' }"
      />
    </div>
    <!-- E 头部和金刚区 -->

    <!--S 广告区 -->
    <Advertising
      :gift="gift"
      :pro-discounts="proDiscounts"
      :introduce="introduce"
    />
    <!--E 广告区 -->

    <!-- S 列表 -->
    <TabServiceItem :title-name="titleName" @change="onChange">
      <template v-slot:list>
        <!-- <KnowledgeList /> -->
        <EnterpriseList
          ref="enterprise"
          :default-list="defaultList"
          :change-state="changeState"
        />
      </template>
    </TabServiceItem>
    <!-- E 列表 -->

    <!-- START 规划师-->
    <BtnPlanner :planner="pagePlanner" :md="fixedMd" />
    <!-- END 规划师-->

    <!-- START IM在线咨询-->
    <DggImCompany></DggImCompany>
    <!-- END IM在线咨询-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defaultRes } from '@/assets/spread/promotionHome/enterpriseService.js'
import { chipSpread, plannerApi } from '@/api/spread'

import NavTop from '@/components/spread/common/NavTop.vue'
import Nav from '@/components/spread/common/Nav.vue'
import Advertising from '@/components/spread/promotionHome/enterpriseService/Advertising.vue'
import TabServiceItem from '@/components/spread/promotionHome/intellectualProperty/TabServiceItem'
import EnterpriseList from '@/components/spread/promotionHome/enterpriseService/EnterpriseList.vue'
import DggImCompany from '@/components/spread/DggImCompany'
import BtnPlanner from '@/components/spread/common/BtnPlanner'
// import { resultData } from '~/assets/spread/licence'
export default {
  name: 'Index',
  components: {
    NavTop,
    Nav,
    Advertising,
    TabServiceItem,
    EnterpriseList,
    BtnPlanner,
    DggImCompany,
  },
  async asyncData({ $axios }) {
    // const url = 'http://172.16.132.70:7001/service/nk/chipSpread/v1/list.do'
    const url =
      'https://dspmicrouag.shupian.cn/crisps-app-wap-bff-api/service/nk/chipSpread/v1/list.do'
    // const url =
    //   'https://dspmicrouag.shupian.cn/crisps-app-wap-bff-api/service/nk/chipSpread/v1/productList.do'

    // const locations = 'ad113250,ad113252,ad113257'
    const locations = 'ad113257,ad113252,ad113250,ad113227'
    const code = 'nav100057'
    const centerCode = 'EnterpriseService'
    const dataRes = defaultRes
    try {
      // const res = await $axios.get(`${url}?locationCodes=${locations}`)
      const res = await $axios.get(chipSpread.list, {
        params: {
          locationCodes: locations,
          navCodes: code,
          productCenterCode: centerCode,
        },
      })

      console.log(res.message)
      if (res.code === 200) {
        console.log('请求成功')
        return {
          resultData: res.data,
        }
      }
      console.log('请求失败')
      return {
        resultData: dataRes.data,
      }
    } catch (error) {
      console.log('请求错误')
      return {
        resultData: dataRes.data,
      }
    }
  },
  data() {
    return {
      placeholder: '请输入关键字',
      marginTop: 0,
      // 金刚区
      rollNav: [
        {
          code: 1,
          name: '工商注册',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/cu9kh73va4w0000.png',
        },
        {
          code: 2,
          name: '会计代理',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/c4r8cofo75s0000.png',
        },
        {
          code: 3,
          name: '体系认证',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/9sizx8f8ci00000.png',
        },
        {
          code: 4,
          name: '资质代理',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/dyl3l55czhk0000.png',
        },
        {
          code: 5,
          name: '许可认证',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/1j2x4qgvydcw000.png',
        },
        {
          code: 6,
          name: '商标服务',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/dywcwlwqnug0000.png',
        },
        {
          code: 7,
          name: '专利服务',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/eordltosl4g0000.png',
        },
        {
          code: 8,
          name: '版权服务',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/5w867cjf4bw0000.png',
        },
        {
          code: 9,
          name: '税务筹划',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/8fhelvvilbo0000.png',
        },
        {
          code: 10,
          name: '工商变',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/a3vhpizf97c0000.png',
        },
      ],
      // 新人专属
      gift: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/oqnu6gqeojk000.png',
          url: '',
          title: '有限公司注册',
          price: '0元',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/13ue2gpa99mo000.png',
          url: '',
          title: '一般纳税人…',
          price: '1元/月',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/b9s8062zh1s0000.png',
          url: '',
          title: '服务代金券',
          price: '600元',
        },
      ],
      // 直播补贴
      proDiscounts: [
        {
          proTitle: '企服直播',
          subheading: '行业大牛助力企业',
          label: '直播中',
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/g3rg0424lp40000.png',
          url: '',
        },
        {
          proTitle: '1000万补贴',
          subheading: '万款服务全补贴',
          label: '优惠放送',
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/3s76r4rbngc0000.png',
          url: '',
        },
      ],
      // 活动广告位
      introduce: [
        {
          title: '99元团',
          subheading: '品质拼团',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2hzc75qqmue0000.png',
          url: '',
        },
        {
          title: '先服务后收费',
          subheading: '平台担保放心购',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7qxwt6b084w0000.png',
          url: '',
        },
        {
          title: '领券中心',
          subheading: '服务销冠',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/doh8spl2kkg0000.png',
          url: '',
        },
        {
          title: '帮找服务',
          subheading: '免费高效',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/hpselpo4ug0000.png',
          url: '',
        },
      ],
      // 列表导航
      titleName: [
        {
          code: 1,
          type: 1,
          name: '为你推荐',
        },
        {
          code: 2,
          type: 1,
          name: '工商服务',
        },
        {
          code: 3,
          type: 1,
          name: '会计服务',
        },
        {
          code: 4,
          type: 1,
          name: '知识服务',
        },
        {
          code: 5,
          type: 1,
          name: '资质服务',
        },
      ],
      // 当前列表状态
      changeState: {
        code: 'FL20201224136019',
        name: '许可证',
        type: 0,
      },
      // 列表内容
      list: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/73qu49p91yo0000.png',
          title: '有限公司注册',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 688,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/721d5dhixbs0000.png',
          title: '小规模纳税人代理记账',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 3488,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/apelb5m4i480000.png',
          title: '软件著作权登记',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 128,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/c1qak3027wg0000.png',
          title: '商标撤三申请',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 200,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/73qu49p91yo0000.png',
          title: '个人社保代缴',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 130,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5g5au0sc1980000.png',
          title: '食品流通许可证',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 1800,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fqw0olyy1k80000.png',
          title: '公积金开户',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 108,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9dkqr2mwrvo0000.png',
          title: '企业认证',
          label: ['套餐优惠', '热销好评', '金牌团队'],
          price: 688,
        },
      ],
      // 默认列表数据集
      defaultList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '商标查询',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '商标注册',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4234scxtivw0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '',
        },
      ],
      // 页面规划师
      pagePlanner: {},
      // 底部规划师埋点
      fixedMd: {
        imMd: {
          name: '公司交易聚合页_底部展位_在线咨询',
          type: '售前',
        },
      },
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    if (process.client) {
      // 请求
      this.getPagePlanner('app-ghsdgye-02')
    }
  },
  mounted() {
    // 初始化数据
    // this.onChange({ type: 1 })
    // 处理后台数据
    const resData = this.resultData
    console.log(resData)
    try {
      if (JSON.stringify(resData) !== '{}') {
        // 导航
        this.navList(resData.navs.nav100057 || [])
        // this.productTitle(resData.productClassList || [])
        resData.adList.filter((elem) => {
          if (elem.locationCode === 'ad113250') {
            this.giftData(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113252') {
            this.proDiscountsData(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113257') {
            this.introduceData(elem.sortMaterialList)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 搜索
    clickInputHandle(e) {
      window.location.href = 'https://m.shupian.cn/search/'
      console.log(this.$router)
    },
    // 请求数据
    onChange(changeObj) {
      this.changeState = changeObj
      // console.log(this.$refs.enterprise.initialize())
      this.$refs.enterprise.initialize(changeObj)
      // if (obj.type === 1) {
      //   this.list = defaultList
      // }
    },
    // 金刚区导航栏
    navList(data) {
      if (data.length !== 0) {
        this.rollNav = data.map((elem, index) => {
          return {
            code: elem.sort,
            name: elem.name,
            url: elem.url,
            // url: '',
            size: 'small',
            label: '',
            imageUrl: elem.navigationImageUrl,
          }
        })
        this.rollNav.reverse()
        // console.log(this.rollNav)
      }
    },

    // 薯片推广企业服务新人专属礼页面
    giftData(data) {
      if (data.length !== 0) {
        this.gift = data.map((elem) => {
          return {
            img: elem.materialList[0].materialUrl,
            url: '',
            title: elem.materialList[0].materialDescription.split(',')[0],
            price: elem.materialList[0].materialDescription.split(',')[1],
          }
        })
      } else {
        this.gift = []
      }
    },
    // 直播 补贴
    proDiscountsData(data) {
      this.proDiscountsData = data.map((elem, index) => {
        const labelData = ['直播中', '优惠放送']
        return {
          proTitle: elem.materialList[0].materialDescription.split(',')[0],
          subheading: elem.materialList[0].materialDescription.split(',')[1],
          label: labelData[index] || '',
          bgImg: elem.materialList[0].materialUrl,
          url: '',
        }
      })
    },
    // 活动广告位
    introduceData(data) {
      if (data.length !== 0) {
        this.introduce = data.map((elem, index) => {
          return {
            title: elem.materialList[0].materialDescription.split(',')[0],
            subheading: elem.materialList[0].materialDescription.split(',')[1],
            img: elem.materialList[0].materialUrl,
            url: '',
          }
        })
      }
    },

    // 列表导航
    productTitle(data) {
      if (data.length !== 0) {
        this.changeState = {
          type: 0,
          code: data[0].code,
          name: data[0].name,
        }
        // this.onChange(this.changeState)
        // this.$refs.enterprise.initialize(this.changeState)
        // 初始化请求数据
        this.titleName = data.map((elem, index) => {
          return {
            type: index,
            code: elem.code,
            name: elem.name,
          }
        })
      }
    },
    // 推介规划师
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
              firstTypeCode: 'FL20210425163708', // 一级code
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
                id: res.data[0].userCentreId,
                name: res.data[0].userName,
                jobNum: res.data[0].userCenterNo,
                telephone: res.data[0].phone,
                imgSrc: res.data[0].imgaes,
              }
            }
          })
      } catch (error) {
        console.log('plannerApi.plannerReferrals error：', error.message)
      }
    },
  },
  head() {
    return {
      title: '企业服务',
    }
  },
}
</script>

<style lang="less">
.enterprise-service {
  width: @spread-page-width;
  background: #f5f5f5;
  margin: 0 auto;
  .top-background {
    // height: 450px;
    background: url(https://cdn.shupian.cn/sp-pt/wap/images/apakh2k9z3c0000.png)
      no-repeat;
    background-size: cover;
    margin-bottom: 20px;
  }
  .navs {
    position: relative;
  }
}
</style>
