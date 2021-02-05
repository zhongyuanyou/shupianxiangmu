<template>
  <div>
    <div class="my-component">
      <div class="title">初创必备</div>
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
          <div class="product-title">
            {{ product.title }}
            <img
              v-if="product.id == 1"
              class="product-label"
              src="https://cdn.shupian.cn/sp-pt/wap/images/fy2fjzy9vg80000.png"
            />
          </div>
          <div class="product-desc">{{ product.desc }}</div>

          <div v-if="product.id != 5" class="product-price-position">
            <div class="middle-transition">
              <span class="product-price">{{ product.price }}</span>
              <span class="product-price-suffix">元起</span>
            </div>
          </div>
          <div v-if="product.id == 5" class="product-price-position">
            <div class="middle-transition">
              <img
                class="product-label"
                src="https://cdn.shupian.cn/sp-pt/wap/images/2l84k31ypjs0000.png"
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartupEssential',
  computed: {
    productList() {
      return this.$parent.startupEssentialProductList
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .product-item {
      flex: none;
      background-size: cover;
      border-radius: 8px;
      box-sizing: border-box;
      margin-bottom: 12px;
      position: relative;

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
      .product-label {
        width: 44px;
        height: 24px;
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
    }
  }
}
</style>
