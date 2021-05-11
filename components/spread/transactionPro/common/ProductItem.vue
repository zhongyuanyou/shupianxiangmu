<template>
  <div>
    <div ref="goodItem" @click="jump(data.id)" class="my-component">
      <!-- S 左侧商品图片 -->
      <div class="item-img"><img :src="data.img" /></div>
      <!-- E 左侧商品图片 -->

      <!-- S 右侧商品信息 -->
      <div class="item-content">
        <p class="item-title">{{ data.name }}</p>
        <div class="item-tabs">
          <span
            v-for="(item, index) in data.tabs"
            :key="index"
            class="item-tab"
          >
            {{ item }}
          </span>
        </div>
        <div class="item-notes">
          <span class="item-note">
            {{ data.notes }}
            <!-- <label v-if="index != data.notes.length - 1">|</label> -->
          </span>
        </div>
        <p class="item-price">
          <span class="item-price-num">{{
            data.price >= 10000 ? `${data.price / 10000}` : data.price
          }}</span>
          <span v-if="!(data.price >= 10000)" class="item-price-unit">元</span>
          <span v-if="data.price >= 10000" class="item-price-unit">万元</span>
        </p>
        <div class="item-divide"></div>
      </div>
      <!-- E 右侧商品信息 -->
    </div>
  </div>
</template>

<script>
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'GoodItem',
  props: {
    good: {
      type: Object,
      default: () => {
        return {
          // !!! 必传字段
          img: '', // 商品左侧图片
          price: '', // 商品价格
          name: '', // 公司显示名称（有*号）
          tabs: [], // 有背景色的标签tab，每个页面有单独的标签列表，随机取几个传进来
          notes: [], // 以 | 字符分隔的注意，接口字段值
        }
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    data() {
      return JSON.parse(JSON.stringify(this.good))
    },
  },
  methods: {
    jump(id) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      window.location.href = `https://${base}m.shupian.cn/detail/transactionDetails?type=FL20201224136319&productId=${id}`
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  border-radius: 24px;
  padding: 28px 20px;
  .item-img {
    flex: none;
    width: 220px;
    height: 220px;
    margin-right: 32px;
    border-radius: 4px;
    img {
      width: 220px;
      height: 220px;
      border-radius: 4px;
    }
  }
  .item-content {
    flex: none;
    width: 418px;
    .item-title {
      min-height: 84px;
      max-height: 84px;
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 42px;
      font-family: PingFang SC;
    }
    .item-tabs {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .item-tab {
        font-size: 22px;
        font-weight: 400;
        color: #5c7499;
        // line-height: 22px;
        height: 32px;
        background: #f0f2f5;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        padding: 0px 10px 0px 8px;
        margin-right: 12px;
        margin-bottom: 6px;
      }
    }
    .item-notes {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .item-note {
        font-size: 22px;
        font-weight: 400;
        color: #222222;
        line-height: 22px;
      }
    }
    .item-price {
      font-size: 22px;
      font-weight: 400;
      color: #ec5330;
      line-height: 36px;
      .item-price-num {
        font-size: 36px;
        line-height: 36px;

        font-weight: bold;
      }
    }
    .item-divide {
      height: 1px;
    }
    .item-recommend {
      display: flex;
      align-items: center;
      .item-recommend-img {
        width: 28px;
        height: 28px;
        margin-right: 12px;
        img {
          width: 28px;
          height: 28px;
        }
      }

      .item-recommend-text {
        font-size: 22px;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 22px;
        display: flex;
      }
    }
  }
}
</style>
