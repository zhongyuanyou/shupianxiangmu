<template>
  <div class="goods-list">
    <div v-for="(item, i) of list" :key="i" class="box">
      <div class="name">
        <div class="address">{{ item.registration_area }}</div>
        <div class="title">{{ item.name }}</div>
      </div>
      <div class="tag">
        <div v-for="(tagItem, tagIndex) of item.salesGoodsTags" :key="tagIndex">
          {{ tagItem }}
        </div>
      </div>
      <div class="price">
        <div class="left">
          <b>{{ item.referencePrice }}</b
          ><span>元</span>
        </div>
        <div class="right">
          <span>查看详情</span>
          <my-icon name="list_ic_next" size="0.22rem" color="#4974f5"></my-icon>
        </div>
      </div>
      <div v-show="active === 0" class="foot">
        <div class="list">
          <p>经营时间</p>
          <p>{{ item.business_age_limit || '-' }}</p>
        </div>
        <div class="list">
          <p>纳税类型</p>
          <p>{{ item.taxpayer_type || '-' }}</p>
        </div>
        <div class="list">
          <p>注册资本</p>
          <p>{{ item.registered_capital || '-' }}</p>
        </div>
        <div class="list">
          <p>所属行业</p>
          <p>{{ item.company_industry || '-' }}</p>
        </div>
      </div>
      <div v-show="active === 2" class="foot">
        <div class="list">
          <p>行业</p>
          <p>{{ item.company_industry }}</p>
        </div>
        <div class="list">
          <p>申请日期</p>
          <p>{{ item.date_of_application }}</p>
        </div>
        <div class="list">
          <p>有效期至</p>
          <p>{{ item.validity_of_certificate }}</p>
        </div>
        <div class="list">
          <p>专利状态</p>
          <p>{{ item.patent_status }}</p>
        </div>
      </div>
      <div v-show="active === 3" cdalass="foot">
        <div class="list">
          <p>转让方式</p>
          <p>{{ item.time }}</p>
        </div>
        <div class="list">
          <p>到期日期</p>
          <p>{{ item.expire_date }}</p>
        </div>
        <div class="list">
          <p>注册资本</p>
          <p>{{ item.registered_capital }}</p>
        </div>
        <div class="list">
          <p>安全许可证</p>
          <p>{{ item.industry }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      > .address {
        font-size: 20px;
        color: #4974f5;
        letter-spacing: 0;
        text-align: center;
        line-height: 32px;
        height: 32px;
        padding: 0 6px;
        background: #f2f5ff;
        border: 1px solid #4974f5;
        border-radius: 4px;
      }
      > .title {
        font-size: 32px;
        color: #222222;
        line-height: 44px;
        font-weight: bold;
        margin-left: 8px;
      }
    }
    > .tag {
      margin-top: 10px;
      height: 30px;
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
        align-items: center;
        width: 60%;
        > span {
          font-size: 22px;
        }
      }
      > .right {
        width: 40%;
        padding-left: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        > span {
          display: block;
          font-size: 22px;
          color: #4974f5;
          letter-spacing: 0;
          margin-right: 8px;
        }
        ::v-deep.spiconfont-list_ic_next {
          padding-top: 5px;
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
