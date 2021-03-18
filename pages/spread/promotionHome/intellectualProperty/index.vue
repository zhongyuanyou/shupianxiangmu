<template>
  <div class="intellectual-property">
    <!-- S 头部和金刚区 -->
    <div class="top-background">
      <NavTop title="知识产权" @searchKeydownHandle="searchKeydownHandle" />
      <Nav :roll-nav="rollNav" class="navs" />
    </div>
    <!-- E 头部和金刚区 -->

    <!-- S 新人专属 -->
    <Exclusive :pro-title="proTitle" :img-content="imgContent" />
    <!-- E 新人专属 -->

    <!--S 免费体验 薯片课程 -->
    <Choiceness :content="content" />
    <!--E 免费体验 薯片课程-->

    <!-- S 列表 -->
    <TabServiceItem :title-name="titleName" @change="onChange">
      <template v-slot:list>
        <KnowledgeList ref="intellectual" :default-list="defaultList" />
      </template>
    </TabServiceItem>
    <!-- E 列表 -->
  </div>
</template>

<script>
import { defaultRes } from '@/assets/spread/promotionHome/intellectualProprty.js'
import { chipSpread } from '@/api/spread'

import NavTop from '@/components/spread/common/NavTop'
import Nav from '@/components/spread/common/Nav'
import Exclusive from '@/components/spread/promotionHome/intellectualProperty/Exclusive'
import Choiceness from '@/components/spread/promotionHome/intellectualProperty/Choiceness'
import TabServiceItem from '@/components/spread/promotionHome/intellectualProperty/TabServiceItem'
import KnowledgeList from '@/components/spread/promotionHome/intellectualProperty/KnowledgeList'
export default {
  name: 'IntellectualProperty',
  components: {
    NavTop,
    Exclusive,
    Choiceness,
    TabServiceItem,
    KnowledgeList,
    Nav,
  },
  async asyncData({ $axios }) {
    // const url = 'http://172.16.132.70:7001/service/nk/chipSpread/v1/list.do'
    const locations = 'ad113279,ad113277,ad113265,ad113236,ad113235,ad113224'
    const code = 'nav100060'
    const centerCode = 'IntellectualProperty'
    const dataRes = defaultRes
    try {
      const res = await $axios.get(chipSpread.list, {
        params: {
          locationCodes: locations,
          navCodes: code,
          productCenterCode: centerCode,
        },
      })
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
      console.log('请求错误', error)
      return {
        resultData: dataRes.data,
      }
    }
  },
  data() {
    return {
      // 金刚区
      rollNav: [
        {
          code: 1,
          name: '商标注册',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/5cr9u33ml600000.png',
        },
        {
          code: 2,
          name: '专利申请',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/11ilq5lopx0w000.png',
        },
        {
          code: 3,
          name: '模板建站',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/dwy0w0z6k1c0000.png',
        },
        {
          code: 4,
          name: '国际商标注册',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/ersf9xyup880000.png',
        },
        {
          code: 5,
          name: '商标维权',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/4n2bre5pb760000.png',
        },
        {
          code: 6,
          name: '商标变更',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/d17z33159zk0000.png',
        },
        {
          code: 7,
          name: '版权设计',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/eva77z0w6xs0000.png',
        },
        {
          code: 8,
          name: '高企认定',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/etof55jpw6o0000.png',
        },
        {
          code: 9,
          name: '项目审报',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/e76lj960syo0000.png',
        },
        {
          code: 10,
          name: '全部服务',
          url: 'https://www.baidu.com/',
          size: 'small',
          label: '',
          imageUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/fhngcdfde0o0000.png',
        },
      ],
      // 新人专属
      proTitle: [
        {
          title: '[企业必备] 商标注...',
          price: 488,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/19k5aeu2fsdc000.png',
          url: '',
        },
        {
          title: '[企业必备] 商标注...',
          price: 488,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/np4823u4b1c000.png',
          url: '',
        },
      ],
      // 广告说明
      imgContent: [
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/84tta2vzooc0000.png',
          title: '先服务后收费',
          assistantTitle: '',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/co9djdht52g0000.png',
          title: '千万补贴',
          assistantTitle: '精选好服务',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/2cxu5ow9hmhw000.png',
          title: '政府补贴',
          assistantTitle: '政策解析',
        },
        {
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/e0b8ph3n46o0000.png',
          title: '快速通道',
          assistantTitle: '加急办理',
        },
      ],
      // 体验 课程
      content: {
        experience: {
          title: '免费体验',
          imgVal: [
            {
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/efrhylhffbs0000.png',
              imgNmae: '商标查询',
            },
            {
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/8jn8qjulfvs0000.png',
              imgNmae: '版权服务',
            },
          ],
        },
        curriculum: {
          title: '薯片课程',
          imgVal: [
            {
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/efrhylhffbs0000.png',
              imgNmae: '商标案件如...',
            },
            {
              img:
                'https://cdn.shupian.cn/sp-pt/wap/images/8jn8qjulfvs0000.png',
              imgNmae: '高企认定政...',
            },
          ],
        },
      },

      // 列表导航
      titleName: [
        {
          code: 1,
          type: 1,
          name: '为你推介',
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
      // 默认的推介列表列表
      defaultList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: '688',
          originalPrice: '2000',
          url: '15645',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 699,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '商标查询',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '商标注册',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4234scxtivw0000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
          title: '高企认定高企 认定高企认定高企...',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
          title: '高企认定',
          label: ['套餐优惠', '热销好品', '金牌团队'],
          currentPrice: 688,
          originalPrice: '2000',
          url: '',
        },
      ],
    }
  },
  mounted() {
    // 初始化数据
    // this.onChange({ type: 1 })
    // 处理后台数据
    const resData = this.resultData
    try {
      if (JSON.stringify(resData) !== '{}') {
        this.navList(resData.navs.nav100060 || [])
        this.productTitle(resData.productClassList || [])
        resData.adList.filter((elem) => {
          if (elem.locationCode === 'ad113236') {
            this.proTitleData(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113279') {
            this.imgContentData(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113265') {
            this.experience(elem.sortMaterialList)
          }
          if (elem.locationCode === 'ad113277') {
            this.curriculum(elem.sortMaterialList)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 搜索
    searchKeydownHandle(e) {
      console.log(e)
    },
    // 请求数据
    onChange(changeObj) {
      // this.changeState = changeObj
      this.$refs.intellectual.initialize(changeObj)
    },
    // 金刚区导航栏
    navList(data) {
      if (data.length !== 0) {
        this.rollNav = data.map((elem, index) => {
          return {
            code: elem.sort,
            name: elem.name,
            url: elem.url,
            size: 'small',
            label: '',
            imageUrl: elem.navigationImageUrl,
          }
        })
      }
    },
    // 新人专属
    proTitleData(data) {
      if (data.length !== 0) {
        this.proTitle = data.map((elem, index) => {
          return {
            title: elem.materialList[0].materialName,
            price: parseInt(
              elem.materialList[0].materialDescription.split('#')[0]
            ),
            label: elem.materialList[0].materialDescription.split('#')[1],
            count: elem.materialList[0].materialDescription.split('#')[2],
            img: elem.materialList[0].materialUrl,
            url: '',
          }
        })
      }
    },
    // 广告说明
    imgContentData(data) {
      if (data.length !== 0) {
        this.imgContent = data.map((elem, index) => {
          return {
            bgImg: elem.materialList[0].materialUrl,
            title: elem.materialList[0].materialName,
            assistantTitle: elem.materialList[0].materialDescription,
          }
        })
      }
    },
    // 体验 课程
    experience(data) {
      if (data.length !== 0) {
        this.content.experience.imgVal = data.map((elem, index) => {
          return {
            img: elem.materialList[0].materialUrl,
            imgNmae: elem.materialList[0].materialDescription.split('#')[0],
            label: elem.materialList[0].materialDescription.split('#')[1],
            url: '',
          }
        })
      }
    },
    curriculum(data) {
      if (data.length !== 0) {
        this.content.curriculum.imgVal = data.map((elem, index) => {
          return {
            img: elem.materialList[0].materialUrl,
            imgNmae: elem.materialList[0].materialDescription.split('#')[0],
            label: elem.materialList[0].materialDescription.split('#')[1],
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
        // this.$refs.intellectual.initialize(this.changeState)

        // 初始化请求数据
        this.titleName = data.map((elem, index) => {
          return {
            type: index,
            code: elem.code,
            name: elem.name,
          }
        })
        // if (this.$refs.intellectual !== undefined) {
        this.$refs.intellectual.initialize(this.changeState)
        // }

        // this.onChange(this.changeState)
      }
    },
  },
  head() {
    return {
      title: '知识产权',
    }
  },
}
</script>

<style lang="less">
.intellectual-property {
  width: @spread-page-width;
  background: #f5f5f5;
  margin: 0 auto;
  .top-background {
    height: 344px;
    // background: linear-gradient(0deg, #f5f5f5, #4974f5);
    background: url(https://cdn.shupian.cn/sp-pt/wap/images/apakh2k9z3c0000.png);
    margin-bottom: 113px;
  }
  .navs {
    position: relative;
  }
}
</style>
