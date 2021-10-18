<template>
  <div class="consulting-item">
    <div class="item" @click="jump()">
      <div class="title">{{ consulting.title }}</div>
      <div class="content-author">{{ consulting.author }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultingItem',
  props: {
    consulting: {
      type: Object,
      default: () => {
        return {
          title:
            '山西房产科技有限公司房产科技有限公司山西房产科技有限公司房产科技有限公司山西房…',
          author: '吴镇宇 · 2021-06-24',
        }
      },
    },
  },
  methods: {
    jump() {
      this.$router.push({
        path: '/exchange_square/transactionProcess/consultingDetail',
        query: { id: '111', code: '11111' },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.consulting-item {
  width: 100%;
  padding: 0 40px;
  .item {
    padding: 28px 0;
    border-top: 1px solid #f4f4f4;
    .title {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 32px;
      color: #222222;
      line-height: 44px;
      max-height: 88px;
      font-weight: bold;
    }
    .content-author {
      margin-top: 20px;
      font-size: 24px;
      color: #999999;
      line-height: 24px;
    }
  }
}
</style>
