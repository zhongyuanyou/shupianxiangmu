<template>
  <div class="enterprise-list">
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      offset="100"
      @load="onLoad"
    >
      <div class="content">
        <div
          class="content-list"
          v-for="(item, proKey) of list"
          :key="proKey"
          @click="onMore(item.url)"
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
            </div>
            <div
              v-show="item.currentPrice !== '' && item.currentPrice"
              class="region-price"
            >
              {{ item.currentPrice }}<span>元</span>
              <span
                v-show="item.originalPrice !== '' && item.originalPrice"
                class="original-price"
                >{{ item.originalPrice }}元</span
              >
            </div>
          </div>
        </div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import { chipSpread } from '@/api/spread'
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
      pageNumber: 1,
      list: [],
    }
  },
  mounted() {
    // 初始化推介数据
    // this.list = this.defaultList
    // this.initialize(this.changeState)
  },
  methods: {
    initialize(changeObj) {
      this.pageNumber = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    onLoad(e) {
      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      if (this.loading === true && this.finished === false) {
        this.selectTab(this.changeState)
      }
    },
    onMore(url) {
      if (url !== '') {
        window.location.href = url
      }
    },
    // 请求数据
    selectTab(item) {
      const api = '/service/nk/chipSpread/v1/productList.do'
      const cdn = 'https://dspmicrouag.shupian.cn/crisps-app-wap-bff-api'
      // const cdn = 'http://172.16.132.70:7001'
      const type = item.code
      // 2、调用接口
      this.loading = true
      this.$axios
        .get(cdn + api, {
          params: {
            pageNumber: this.pageNumber,
            pageSize: '15',
            classCodes: type,
          },
        })
        .then((res) => {
          // 调用回调函数处理数据
          const result = res.data.records
          if (res.code !== 200) {
            // this.list = this.defaultList
            this.loading = false
            this.finished = true
          }
          if (result.length !== 0 && res.code === 200) {
            this.pageNumber += 1
            result.filter((elem, index) => {
              this.list.push({
                code: index + 1,
                img:
                  'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
                title: elem.name,
                label: ['套餐优惠', '热销好品', '金牌团队'],
                currentPrice:
                  ((parseFloat(elem.referencePrice) / 10000) * 0.3).toFixed(2) +
                  '万',
                originalPrice:
                  (parseFloat(elem.referencePrice) / 10000).toFixed(2) + '万',
                url: '',
              })
            })
            if (result.length < 15) this.finished = true
          }
          this.loading = false
        })
        .catch((err) => {
          this.list = this.defaultList
          console.log(err)
        })
    },
  },
}
</script>

<style lang="less">
.enterprise-list {
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
        background: #b2b2b2;
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
            }
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
