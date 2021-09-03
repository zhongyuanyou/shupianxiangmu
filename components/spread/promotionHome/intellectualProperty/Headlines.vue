<template>
  <div class="headlines">
    <img
      src="https://cdn.shupian.cn/sp-pt/wap/images/d0ritn7wp740000.png"
      alt=""
    />
    <div class="swipe-box">
      <sp-swipe
        class="my-swipe"
        :autoplay="5000"
        :show-indicators="false"
        style="height: 18px"
        vertical
        lazy-render
      >
        <sp-swipe-item v-for="(item, index) in swipeList" :key="index">
          <div class="advertising" @click="jump(item)">{{ item.title }}</div>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <my-icon
      size="0.24rem"
      name="order_ic_listnext"
      style="margin-left: auto"
      color="#CCCCCC"
    />
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import { spreadApi } from '@/api/spread'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      swipeList: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        limit: 10,
        categoryCode: 'con100079',
        page: 1,
      }
      this.$axios.get(spreadApi.knowledge_list, { params }).then((res) => {
        this.swipeList = res.data.rows
      })
    },
    jump(item) {
      this.$router.push({
        path: '/spread/promotionHome/knowledgeDetails',
        query: {
          code: item.id,
          indexValue: item.indexValue,
          categoryCode: item.categoryCode,
          knowledgeCode: 'con100079',
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.headlines {
  height: 80px;
  margin: 20px 20px 0 20px;
  background: #fff;
  padding: 0 24px 0 20px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  > img {
    width: 126px;
    object-fit: cover;
  }
  .swipe-box {
    width: 560px;
    height: 36px;
    // line-height: 36px;
    display: inline-block;
    padding-top: 3px;
    margin: 0 32px 0 16px;
    .my-swipe .sp-swipe-item {
      height: 100%;
      width: 100%;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
    }
    .advertising {
      font-size: 24px;
      color: #222222;
      width: 100%;
      height: 36px;

      .textOverflow(1);
    }
  }
  > .content {
    margin-left: 41px;
    font-size: 24px;
    color: #222222;
    width: calc(100% - 180px);
  }
}
</style>
