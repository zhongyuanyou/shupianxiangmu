<template>
  <div class="goods-list">
    <div v-for="(item, i) of list" :key="i" class="box" @click="jump(item)">
      <div class="name">
        <template v-if="active === 0">
          <div v-if="item.registration_area" class="address">
            {{ item.registration_area.split(',')[0] }}
          </div>
        </template>
        <template v-if="active === 2">
          <div v-if="item.patent_type" class="address">
            {{ item.patent_type }}
          </div>
        </template>
        <div class="title">{{ item.name }}</div>
      </div>
      <div class="tag">
        <div
          v-for="(tagItem, tagIndex) of item.sellLabel.slice(0, 3)"
          :key="tagIndex"
        >
          {{ tagItem }}
        </div>
      </div>
      <div class="price">
        <div class="left">
          <b>{{ setPrice(item.referencePrice) }}</b
          ><span>{{ item.referencePrice > 9999 ? '万' : '元' }}</span>
        </div>
        <div class="right">
          <span>查看详情</span>
          <my-icon name="list_ic_next" size="0.20rem" color="#4974f5"></my-icon>
        </div>
      </div>
      <div v-show="active === 0" class="foot">
        <div class="list">
          <p>经营年限</p>
          <p>{{ item.business_age_limit | filterYear }}</p>
        </div>
        <div class="list">
          <p>纳税类型</p>
          <p>{{ item.taxpayer_type || '-' }}</p>
        </div>
        <div class="list">
          <p>注册资本</p>
          <p>{{ Number(item.registered_capital) | filterMoney }}</p>
        </div>
        <div class="list">
          <p>所属行业</p>
          <p>{{ item.company_industry || '-' }}</p>
        </div>
      </div>
      <div v-show="active === 2" class="foot">
        <div class="list">
          <p>行业</p>
          <p>{{ item.patent_industry || '-' }}</p>
        </div>
        <div class="list">
          <p>申请日期</p>
          <p>{{ item.patent_date_of_application || '-' }}</p>
        </div>
        <div class="list">
          <p>有效期至</p>
          <p>{{ item.validity_of_certificate || '-' }}</p>
        </div>
        <div class="list">
          <p>专利状态</p>
          <p>{{ item.patent_status || '-' }}</p>
        </div>
      </div>
      <div v-show="active === 3" cdalass="foot">
        <div class="list">
          <p>转让方式</p>
          <p>{{ item.time }}</p>
        </div>
        <div class="list">
          <p>到期日期</p>
          <p>{{ item.expire_date || '-' }}</p>
        </div>
        <div class="list">
          <p>注册资本</p>
          <p>{{ item.registered_capital || '-' }}</p>
        </div>
        <div class="list">
          <p>安全许可证</p>
          <p>{{ item.industry || '-' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { price } from '@/utils/spread/exchange-square'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default {
  filters: {
    filterMoney(money) {
      if (money) {
        if (money < 500000) {
          return '50万以下'
        } else if (money < 1000000) {
          return '50-100万'
        } else if (money < 5000000) {
          return '100-500万'
        } else if (money < 10000000) {
          return '500-1000万'
        } else {
          return '1000万以上'
        }
      } else {
        return '-'
      }
    },
    filterYear(year) {
      if (year === '') return '-'
      if (year < 1) return '1年以下'
      if (year >= 1 && year < 3) return '1-3年'
      if (year >= 3 && year < 5) return '3-5年'
      if (year >= 5) return '5年以上'
    },
  },
  props: {
    active: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    setPrice(data) {
      return price(data)
    },
    jump(item) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      if (item.classCode === 'FL20201224136341') {
        window.location.href = `https://${base}m.shupian.cn/detail/transaction/patent?productId=${item.id}`
      } else if (item.classCode === 'FL20201224136319') {
        window.location.href = `https://${base}m.shupian.cn/detail/transaction/company?productId=${item.id}`
      }
    },
  },
}
</script>

<style lang="less" scoped>
.goods-list {
  margin: 10px 20px 0 20px;
  .box {
    background: #fff;
    padding: 24px 20px 34px 20px;
    border-radius: 24px;
    margin-bottom: 20px;
    > .name {
      display: flex;
      align-items: center;
      font-weight: bold;
      > .address {
        font-size: 20px;
        color: #4974f5;
        letter-spacing: 0;
        text-align: center;
        padding: 2px 6px;
        background: #f2f5ff;
        border: 1px solid #4974f5;
        border-radius: 4px;
        flex-shrink: 0;
      }
      > .title {
        font-size: 32px;
        color: #222222;
        line-height: 44px;
        font-weight: bold;
        margin-left: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    > .tag {
      margin-top: 10px;
      max-height: 28px;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      > div {
        background: #f0f2f5;
        border-radius: 4px;
        padding: 0 6px;
        height: 28px;
        line-height: 28px;
        font-size: 20px;
        color: #5c7499;
        margin-left: 8px;
      }
      > div:first-child {
        margin-left: 0;
      }
    }
    > .price {
      margin-top: 16px;
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #f4f4f4;
      padding-bottom: 23px;
      > .left {
        font-size: 36px;
        color: #ec5330;
        display: flex;
        align-items: baseline;
        width: 60%;
        > span {
          margin-left: 4px;
          font-size: 22px;
        }
      }
      > .right {
        width: 40%;
        padding-left: 10px;
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        > span {
          display: block;
          font-size: 22px;
          color: #4974f5;
          letter-spacing: 0;
          margin-right: 8px;
        }
        ::v-deep.spiconfont-list_ic_next {
          padding-top: 4px;
        }
      }
    }
    > .foot {
      display: flex;
      padding-top: 28px;
      > .list {
        border-left: 1px solid #f4f4f4;
        width: 25%;
        padding-left: 25px;
        > p:first-child {
          font-size: 22px;
          color: #999999;
          letter-spacing: 0;
        }
        > p:last-child {
          font-size: 28px;
          color: #222222;
          letter-spacing: 0;
          margin-top: 10px;
          width: 137px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      > .list:first-child {
        padding-left: 0;
        border-left: none;
      }
    }
  }
}
</style>
