<template>
  <div class="consulting-list">
    <div class="title-box">
      <div class="title">{{ consulting.name }}</div>
      <div class="show-more" @click="showMore">
        <div class="btn">查看更多</div>
        <div class="icon">
          <my-icon
            class="back-icon"
            name="youce"
            size="0.14rem"
            color="#999999"
            @click.native="goMore"
          ></my-icon>
        </div>
      </div>
    </div>
    <div class="list">
      <div
        v-for="(item, index) in consulting.list"
        :key="index"
        class="content"
        @click="jump(item)"
      >
        <div class="content-title">
          {{ item.title }}
        </div>
        <div class="content-author">{{ item.author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultingList',
  props: {
    consulting: {
      type: Object,
      default: () => {
        return {
          name: '公司交易',
          list: [
            {
              title:
                '山西房产科技有限公司房产科技有限公司山西房产科技有限公司房产科技有限公司山西房…',
              author: '吴镇宇 · 2021-06-24',
            },
            {
              title: '山西房产科技有限公司房产科技有限公司',
              author: '吴镇宇 · 2021-06-24',
            },
          ],
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
    showMore() {
      this.$router.push({
        path: '/exchange_square/transactionProcess/consulting',
        query: { title: this.consulting.name, code: '11111' },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.consulting-list {
  width: 100vw;
  padding: 12px 40px;
  margin-bottom: 20px;
  background: #fff;
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 0;
    border-bottom: 1px solid #f4f4f4;
    .title {
      font-size: 36px;
      color: #222222;
      line-height: 50px;
      font-weight: bold;
    }
    .show-more {
      display: flex;
      align-items: center;
      .btn {
        font-size: 22px;
        color: #999999;
        line-height: 44px;
        margin-right: 8px;
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .list {
    .content:first-child {
      border-bottom: 1px solid #f5f5f5;
    }
    .content {
      padding: 28px 0;
      .content-title {
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
}
</style>
