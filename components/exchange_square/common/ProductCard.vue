<template>
  <div class="product-card">
    <div class="card">
      <div class="title-box">
        <div v-if="type === 'monthly' && product.areaValue" class="title-tag">
          {{ product.areaValue && product.areaValue.split(',')[0] }}
        </div>
        <div v-if="type === 'patent' && product.typeValue" class="title-tag">
          {{ product.typeValue }}
        </div>

        <div class="title">{{ product.name }}</div>
      </div>
      <div class="label-box">
        <div
          v-for="(tag, tagIdx) in product.sellLabel"
          :key="tagIdx"
          class="label"
        >
          {{ tag }}
        </div>
      </div>
      <div class="price-box">
        <div class="price">
          <div class="num">{{ setPrice(product.referencePrice) }}</div>
          <div class="unit">
            {{ product.referencePrice > 9999 ? '万' : '元' }}
          </div>
        </div>
        <div class="details" @click="jump">
          <div class="btn">查看详情</div>
          <div class="icon">
            <my-icon
              class="youce-icon"
              name="youce"
              size="0.18rem"
              color="#4974F5"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div v-if="type === 'patent'" class="msg-box">
        <div>
          <div class="msg-title">行业分类</div>
          <div class="msg-content">
            {{ product.patentIndustryValue || '-' }}
          </div>
        </div>
        <div>
          <div class="msg-title">申请日期</div>
          <div class="msg-content">{{ product.applicationValue || '-' }}</div>
        </div>
        <div>
          <div class="msg-title">有限期至</div>
          <div class="msg-content">{{ product.certificateValue || '-' }}</div>
        </div>
        <div>
          <div class="msg-title">专利状态</div>
          <div class="msg-content">{{ product.statusValue || '-' }}</div>
        </div>
      </div>
      <!-- <div v-if="type === 'ualification'" class="msg-box">
        <div>
          <div class="msg-title">到期时间</div>
          <div class="msg-content">2025年</div>
        </div>
        <div>
          <div class="msg-title">转让方式</div>
          <div class="msg-content">整转</div>
        </div>
        <div>
          <div class="msg-title">注册资本</div>
          <div class="msg-content">1000万...</div>
        </div>
        <div>
          <div class="msg-title">地区</div>
          <div class="msg-content">四川</div>
        </div>
      </div> -->
      <div v-if="type === 'monthly'" class="msg-box">
        <div>
          <div class="msg-title">经营时间</div>
          <div class="msg-content">{{ product.ageLimitValue || '-' }}</div>
        </div>
        <div>
          <div class="msg-title">纳税类型</div>
          <div class="msg-content">{{ product.taxpayerTypeValue || '-' }}</div>
        </div>
        <div>
          <div class="msg-title">注册资本</div>
          <div class="msg-content">{{ product.capitalValue || '-' }}</div>
        </div>
        <div>
          <div class="msg-title">所属行业</div>
          <div class="msg-content">{{ product.industryValue || '-' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { price } from '@/utils/spread/exchange-square'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  name: 'ProductCard',
  props: {
    type: {
      type: String,
      default: 'patent',
    },
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  methods: {
    setPrice(item) {
      return price(item)
    },
    jump() {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      window.location.href = `https://${base}m.shupian.cn/detail/transactionDetails?classCodeOne=${this.product.classCode}&productId=${this.product.id}`
    },
  },
}
</script>

<style lang="less" scoped>
.product-card {
  width: 100%;
  margin-bottom: 20px;
  padding: 0 20px;
  .card {
    width: 100%;
    padding: 26px 20px 34px;
    background: #fff;
    border-radius: 24px;
    .title-box {
      display: flex;
      align-items: center;
      .title-tag {
        padding: 0 8px;
        height: 32px;
        background: #f2f5ff;
        border: 1px solid #4974f5;
        border-radius: 4px;
        font-size: 20px;
        color: #4974f5;
        text-align: center;
        line-height: 32px;
        font-weight: 700;
        flex-shrink: 0;
      }
      .title {
        font-size: 32px;
        color: #222222;
        line-height: 44px;
        font-weight: 700;
        margin-left: 8px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .label-box {
      height: 28px;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      margin-top: 16px;
      .label {
        background: #f0f2f5;
        border-radius: 4px;
        height: 28px;
        padding: 0 6px;
        font-size: 20px;
        color: #5c7499;
        line-height: 28px;
        margin-right: 8px;
      }
    }
    .price-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      .price {
        display: flex;
        align-items: center;
        .num {
          font-size: 36px;
          color: #ec5330;
          line-height: 50px;
          font-weight: 700;
        }
        .unit {
          margin-left: 2px;
          font-size: 22px;
          color: #ec5330;
          font-weight: 700;
        }
      }
      .details {
        display: flex;
        align-items: center;
        .btn {
          font-size: 22px;
          color: #4974f5;
          line-height: 30px;
        }
        .icon {
          margin-left: 13px;
          display: flex;
        }
      }
    }
    .line {
      height: 1px;
      width: 100%;
      background-color: #f5f5f5;
      margin-top: 16px;
    }
    .msg-box {
      margin-top: 28px;
      width: 100%;
      height: 80px;
      padding: 4px 0 6px;
      display: flex;
      > div:first-child {
        padding-left: 0;
      }
      > div {
        padding-left: 20px;
        margin-right: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;

        .msg-title {
          font-size: 22px;
          color: #999999;
          width: 137px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
        }
        .msg-content {
          width: 137px;
          font-size: 28px;
          color: #222222;
          line-height: 40px;
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      > div:not(:first-child) {
        border-left: 1px solid #f4f4f4;
      }
    }
  }
}
</style>
