<template>
  <div>
    <div class="my-component">
      <div class="item">
        <div class="item-wrap-img">
          <img :src="product.img" alt="" />
        </div>
        <div class="item-content">
          <h1 class="item-title">{{ product.title }}</h1>
          <div class="item-tabs">
            <span
              v-for="(tab, index) in product.tabs"
              v-show="index < 3"
              :key="index"
              class="item-tab"
              >{{ tab }}</span
            >
          </div>
          <p class="item-desc">{{ product.desc }}</p>
          <p class="item-price">
            <span class="item-price-current">{{ product.currentPrice }}</span>
            <span class="item-price-current-unit">元</span>
            <!-- <span class="item-price-original">{{ product.originalPrice }}</span>
            <span class="item-price-original-unit">元</span> -->
          </p>
          <div class="separate-line"></div>
          <div class="item-sales">
            <span class="item-sales-icon">销</span>
            <span class="item-sales-text">销量</span>
            <span class="item-sales-num">{{ product.saleNum }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          img: '',
          title: '一对一法律咨询',
          desc: '即时提供专业法律解析，提供相应法律法规支持，提供法律解决途径',
          currentPrice: '5900',
          originalPrice: '20000',
          saleNum: '5200',
          tabs: ['专业律师团队', '高效沟通', '全流程监管'],
        }
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  .item {
    display: flex;
    width: 100%;
    padding: 28px 20px;
    margin-bottom: 20px;
    border-radius: 24px;
    background: #ffffff;
    .item-wrap-img {
      flex: none;
      width: 240px;
      height: 240px;
      background: #d8d8d8;
      border-radius: 8px;
      margin-right: 24px;
      > img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .item-content {
      //   display: flex;
      //   flex-direction: column;
      //   align-items: flex-start;
      //   justify-content: space-between;
      flex: 1;
      .item-title {
        height: 44px;
        font-size: 32px;
        font-weight: bold;
        color: #222222;
        line-height: 48px;
        margin-bottom: 18px;
        .textOverflow(1);
      }
      .item-tabs {
        display: flex;
        margin-bottom: 20px;
        width: 100%;
        .item-tab {
          font-size: 22px;
          font-weight: 400;
          color: #5f779c;
          line-height: 30px;
          padding: 0 4px;
          margin-right: 8px;
          background: #eff3f6;
          border-radius: 4px;
          .textOverflow(1);
        }
      }
      .item-desc {
        width: 350px;
        font-size: 22px;
        font-weight: 400;
        color: #222222;
        line-height: 30px;
        word-wrap: break-word;
        word-break: break-all;
        margin-bottom: 24px;
        .textOverflow(2);
      }

      .item-price {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;

        .item-price-current {
          font-size: 36px;
          font-weight: bold;
          color: #ea5735;
          margin-right: 2px;
        }
        .item-price-current-unit {
          font-size: 22px;
          font-weight: bold;
          color: #ea5735;
          margin-right: 18px;
        }
        .item-price-original {
          font-size: 22px;
          font-weight: 400;
          color: #999999;
          text-decoration: line-through;
          margin-right: 2px;
        }
        .item-price-original-unit {
          font-size: 22px;
          font-weight: 400;
          color: #999999;
        }
      }

      .separate-line {
        width: 100%;
        height: 2px;
        background: #f4f4f4;
        margin-top: 12px;
        margin-bottom: 14px;
      }
      .item-sales {
        display: flex;
        align-items: center;
        height: 32px;
        line-height: 32px;
        .item-sales-icon {
          width: 28px;
          height: 28px;
          line-height: 28px;
          font-size: 22px;
          background: #ffbb42;
          border-radius: 4px;
          color: #fff;
          text-align: center;
        }
        .item-sales-text {
          font-size: 22px;
          font-weight: 400;
          color: #999999;
          margin-right: 2px;
          margin-left: 8px;
        }
        .item-sales-num {
          font-size: 22px;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
}
</style>
