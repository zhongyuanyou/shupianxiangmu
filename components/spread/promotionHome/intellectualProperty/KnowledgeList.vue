<template>
  <div class="knowledge-list">
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
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
            <div v-show="item.price !== '' && item.price" class="price">
              {{ item.price }}<span>元</span>
            </div>
          </div>
        </div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
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
            price: '688',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
            title: '高企认定高企 认定高企认定高企...',
            label: ['套餐优惠', '热销好品', '金牌团队'],
            price: 699,
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
            title: '商标查询',
            label: ['套餐优惠', '热销好品', '金牌团队'],
            price: 688,
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
            title: '商标注册',
            label: ['套餐优惠', '热销好品', '金牌团队'],
            price: 688,
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/4234scxtivw0000.png',
            title: '高企认定高企 认定高企认定高企...',
            label: ['套餐优惠', '热销好品', '金牌团队'],
            price: 688,
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
            title: '高企认定高企 认定高企认定高企...',
            label: ['套餐优惠', '热销好品', '金牌团队'],
            price: 688,
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/ce1od1ainhc0000.png',
            title: '高企认定',
            label: ['套餐优惠', '热销好品', '金牌团队'],
            price: 688,
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/79lmibooz5s000.png',
            title: '高企认定',
            label: ['套餐优惠', '热销好品', '金牌团队'],
            price: 688,
          },
        ]
      },
    },
    dataList: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      loading: false, // 显示加载过程的文案
      finished: false, // 加载完毕的文案
      list: [],
    }
  },
  mounted() {
    // 初始化推介数据
    this.list = this.defaultList
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 4) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>

<style lang="less">
.knowledge-list {
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
      }
    }
  }
}
</style>
