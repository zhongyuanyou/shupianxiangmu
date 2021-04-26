<template>
  <div class="knowledge-list">
    <sp-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      :finished-text="finishedText"
      error-text=""
      @load="onLoad"
    >
      <div class="content">
        <div v-for="(item, proKey) of list" :key="proKey">
          <div class="content-list">
            <div class="imge"><img :src="item.img" alt="" /></div>
            <p class="title">{{ item.title }}</p>
            <label>
              <span v-for="(labels, labelKey) of item.label" :key="labelKey">
                {{ labels }}
              </span>
            </label>
            <div
              v-show="item.currentPrice !== '' && item.currentPrice"
              class="price"
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
  name: 'KnowledgeList',
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
        ]
      },
    },
    // changeState: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       code: 'FL20201224136019',
    //       name: '许可证',
    //       type: 0,
    //     }
    //   },
    // },
  },
  data() {
    return {
      loading: false, // 显示加载过程的文案
      finished: false, // 加载完毕的文案
      finishedText: '没有更多数据啦',
      error: false,
      pageNumber: 1,
      list: [],
      changeState: {
        code: 'FL20201224136019',
        name: '许可证',
        type: 0,
      },
    }
  },
  mounted() {
    // 初始化推介数据
    // this.list = this.defaultList
    // this.initialize(changeState)
  },
  methods: {
    initialize(changeObj) {
      this.changeState = changeObj
      console.log(this.changeState, '子组件')
      this.pageNumber = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.selectTab()
    },
    onLoad(e) {
      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.list.length === 0 && (this.pageNumber = 1)
      this.selectTab(this.changeState)
    },
    onMore(url) {
      if (url !== '') {
        window.location.href = url
      }
    },
    // 请求数据
    selectTab(item) {
      // 当前无数据不执行
      if (this.finished && !this.loading) return
      const api = '/service/nk/chipSpread/v1/productList.do'
      const cdn = 'https://dspmicrouag.shupian.cn/crisps-app-wap-bff-api'
      // const cdn = 'http://172.16.132.70:7001'
      const type = item.code
      // 2、调用接口
      // this.loading = true
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
            ++this.pageNumber
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
            this.loading = false
            if (result.length < 15) {
              this.finishedText = '没有更多了'
              this.finished = true
            }
            return
          }
          this.loading = false
          this.error = true
          this.list = this.defaultList
        })
        .catch((err) => {
          this.list = this.defaultList
          this.loading = false
          this.error = true
          this.error = true
          console.log(err)
        })
    },
  },
}
</script>

<style lang="less">
.knowledge-list {
  min-height: 1224px;
  padding-left: 20px;
  .content {
    display: flex;
    flex-wrap: wrap;
    .content-list {
      width: 345px;
      min-height: 592px;
      padding: 20px 20px 32px 20px;
      background: #ffffff;
      border-radius: 24px;
      margin: 0 20px 20px 0;
      position: relative;
      .imge {
        width: 305px;
        height: 305px;
        background: #b2b2b2;
        border-radius: 12px;
        img {
          width: 305px;
          height: 305px;
        }
      }

      .title {
        //   height: 31px;
        font-size: 32px;
        font-family: PingFang;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
        margin: 20px 0;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 60px;
        span {
          // width: 92px;
          height: 28px;
          background: #f0f2f5;
          border-radius: 4px;

          font-size: 20px;
          font-weight: 400;
          color: #5c7499;
          line-height: 32px;
        }
      }
      .price {
        height: 30px;
        line-height: 30px;
        font-size: 36px;
        font-weight: bold;
        color: #ec5330;
        // margin-top: 28px;
        position: absolute;
        bottom: 32px;
        left: 20px;
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
</style>
