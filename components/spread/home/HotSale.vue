<template>
  <div>
    <div class="my-component">
      <div class="title">热销专区</div>
      <div class="product">
        <a
          v-for="product in productList"
          :key="product.id"
          class="product-item"
          :style="{
            backgroundImage: 'url(' + product.img + ')',
            width: product.imgWidth / 100 + 'rem',
            height: product.imgHeight / 100 + 'rem',
          }"
          href="javascript:void(0);"
          @click="jumpLink(product.url)"
        >
          <div class="product-title">{{ product.title }}</div>
          <div class="product-desc">{{ product.desc }}</div>
          <div
            v-if="product.id != 5"
            class="product-price-position"
            :style="{ top: product.id == 1 ? `${150 / 2}px` : 'none' }"
          >
            <div class="middle-transition">
              <span class="product-price">{{ product.price }}</span>
              <span class="product-price-suffix">元起</span>
            </div>
          </div>

          <div
            v-if="product.id == 5"
            class="product-price-position product-price"
          >
            <span class="product-text">免费核查</span>
            <img
              class="product-icon"
              src="https://cdn.shupian.cn/sp-pt/wap/images/f93gtyh1xvs0000.png"
            />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSale',
  computed: {
    productList() {
      return this.$parent.hotSaleProductList
    },
  },
  methods: {
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: 30px 0;
  font-family: PingFang SC;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .product {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    height: 348px;
    .product-item {
      flex: none;
      background-size: cover;
      border-radius: 8px;
      box-sizing: border-box;
      position: relative;
      border: 1px solid rgba(205, 205, 205, 0.3);
      height: 22px;

      .product-title {
        width: 100%;
        margin-top: 22px;
        padding: 0 10px 0 20px;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 48px;
        // 超出省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .product-desc {
        width: 100%;
        margin-top: 2px;
        padding: 0 10px 0 20px;
        font-size: 20px;
        font-weight: 400;
        color: #555555;
        line-height: 26px;
      }

      .middle-transition {
        display: flex;
        align-items: flex-end;
        span {
          display: block;
        }
      }
      .product-price-position {
        position: absolute;
        left: 20px;
        bottom: 15px;
      }
      .product-price {
        font-size: 28px;
        line-height: 28px;
        font-weight: bold;
        color: #ec5330;
      }
      .product-price-suffix {
        font-size: 20px;
        line-height: 24px;
        color: #ec5330;
      }
      .product-text {
        font-size: 22px;
      }
      .product-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
