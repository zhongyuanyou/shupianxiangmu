<template>
  <div class="enterprise-list">
    <sp-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      finished-text="没有更多了"
      error-text=""
      offset="100"
      @load="onLoad"
    >
      <div class="content">
        <div
          v-for="(item, proKey) of list"
          :key="proKey"
          class="content-list"
          @click="onMore(item)"
        >
          <div class="imge"><img :src="item.img" alt="" /></div>
          <div class="region">
            <div class="region-content">
              <p class="region-title">{{ item.title }}</p>
              <label>
                <span v-for="(labels, labelKey) of item.label" :key="labelKey">
                  {{ labels }}
                </span>
              </label>
              <div class="region-explain">{{ item.desc }}</div>
            </div>
            <div
              v-show="item.currentPrice !== '' && item.currentPrice"
              class="region-price"
            >
              {{ item.currentPrice }}<span>元</span>
              <!--              <span-->
              <!--                v-show="item.originalPrice !== '' && item.originalPrice"-->
              <!--                class="original-price"-->
              <!--                >{{ item.originalPrice }}元</span-->
              <!--              >-->
            </div>
          </div>
        </div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import { newSpreadApi } from '@/api/spread'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'EnterpriseList',
  components: {
    [List.name]: List,
  },
  props: {
    defaultList: {
      type: Array,
      default: () => {
        return [
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
        ]
      },
    },
    changeState: {
      type: Object,
      default: () => {
        return {
          code: 'FL20201224136019',
          name: '许可证',
          type: 0,
        }
      },
    },
  },
  data() {
    return {
      loading: false, // 显示加载过程的文案
      finished: false, // 加载完毕的文案
      error: false,
      pageNumber: 1,
      list: [],
      defaultState: {},
      count: 0,
    }
  },
  mounted() {
    // 初始化推介数据
    // this.list = this.defaultList
    // this.initialize(this.changeState)
    this.defaultState = this.changeState
  },
  methods: {
    initialize(changeObj) {
      this.pageNumber = 1
      this.finished = false
      this.loading = true
      this.defaultState = changeObj
      this.selectTab()
      // this.onLoad(changeObj)
    },
    onLoad(changeObj) {
      // // 异步更新数据
      if (this.pageNumber === 1) {
        this.list = []
      }
      // if (this.loading) return
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.defaultState = this.changeState
      // this.list.length === 0 && (this.pageNumber = 1)
      this.selectTab()
    },
    onMore(product) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      let code = this.product.classCodeLevel
        ? this.product.classCodeLevel.split(',')
        : []
      code = code.length > 0 ? code[0] : ''
      window.location.href = `https://${base}m.shupian.cn/detail?productId=${product.id}&classCodeOne=${code}`
    },
    // 请求数据
    selectTab(item) {
      console.log(this.defaultState, '请求数据')
      this.loading = true
      // 当前无数据不执行
      if (this.finished && !this.loading) return
      const type = this.defaultState.type
      // 2、调用接口
      this.$axios
        .get(newSpreadApi.service_product_list, {
          params: {
            start: this.pageNumber,
            limit: '4',
            classCodes: type,
          },
        })
        .then((res) => {
          console.log(res, 456)
          // 调用回调函数处理数据
          const result = res.data.records
          if (res.code !== 200) {
            // this.list = this.defaultList
            this.loading = false
            this.finished = true
          }
          if (res.code === 200 && result.length !== 0) {
            // if (res.data.pageNumber === 1) {
            //   // console.log(res.data.pageNumber, this.defaultState, 1564)
            //   this.list = []
            // }
            ++this.pageNumber
            result.forEach((elem, index) => {
              this.list.push({
                code: index + 1,
                img:
                  elem.img.split(',')[1] ||
                  'https://cdn.shupian.cn/crisps-product-packing%3Asell_goods%3A840087290498569750%3Apic%3ACOMDIC_TERMINAL_APP_1619769745000_kefu_1599649695799_oop68.png',
                title: elem.title,
                label: elem.tabs || ['套餐优惠', '热销好品', '金牌团队'],
                currentPrice: elem.price,
                originalPrice: 0,
                url: '',
                desc: elem.desc,
                id: elem.id,
              })
            })
            this.loading = false
            if (result.length < 4) this.finished = true

            return
          }
          this.loading = false
          this.error = true
          // this.list = this.defaultList
        })
        .catch((err) => {
          // this.list = this.defaultList
          this.loading = false
          this.finished = true
          this.error = true
          console.log(err)
        })
    },
  },
}
</script>

<style lang="less">
.enterprise-list {
  min-height: 1224px;
  padding-left: 20px;
  .content {
    .content-list {
      display: flex;
      width: 710px;
      min-height: 276px;
      padding: 28px 20px;
      background: #ffffff;
      border-radius: 24px;
      margin: 0 20px 20px 0;
      .imge {
        width: 220px;
        height: 220px;
        // background: #b2b2b2;
        border-radius: 12px;
        margin-right: 32px;
        img {
          width: 220px;
          height: 220px;
        }
      }
      .region {
        &-content {
          min-height: 150px;
          .region-title {
            margin-bottom: 20px;
            font-size: 32px;
            font-family: PingFang;
            font-weight: bold;
            color: #222222;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          label {
            display: flex;
            span {
              background: #f0f2f5;
              border-radius: 4px;
              font-size: 20px;
              font-weight: 400;
              color: #5c7499;
              line-height: 32px;
              margin-right: 8px;
              padding: 4px 6px;
              max-width: 120px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .region-explain {
            margin-top: 20px;
            height: 22px;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222;
            line-height: 22px;
            .textOverflow(1);
            width: 100%;
          }
        }
        &-price {
          // height: 30px;
          font-size: 36px;
          font-weight: bold;
          color: #ec5330;
          padding-top: 28px;
          > span {
            height: 20px;
            font-size: 22px;
            font-weight: bold;
            color: #ec5330;
            line-height: 20px;
          }
          .original-price {
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
