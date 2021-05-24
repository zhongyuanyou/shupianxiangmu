<template>
  <div class="notice">
    <div class="img-box">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/fji7e1g3vns0000.png"
        alt=""
      />
    </div>
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
          <div class="advertising" @click="jump(item.id)">{{ item.title }}</div>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <div class="jump-box">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/adfky9869k80000.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import { financingApi } from '@/api/spread'

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  //   props: {
  //     swipeList: {
  //       type: Array,
  //       default: () => {
  //         return [
  //           '1文读懂贷款利息的计算标准',
  //           '2文读懂贷款利息的计算标准',
  //           '3文读懂贷款利息的计算标准文读懂贷款利息的计算标准',
  //         ]
  //       },
  //     },
  //   },
  data() {
    return {
      swipeList: [],
    }
  },
  mounted() {
    this.getKnowledgeCode()
  },
  methods: {
    // 跳转必懂详情
    jump(item) {
      console.log(item)
    },
    // 获取必懂分类id
    getKnowledgeCode() {
      this.$axios.get(financingApi.knowledge_code).then((res) => {
        res.data.forEach((item) => {
          if (item.name === '融资') {
            const code = item.id
            this.$axios
              .post(
                financingApi.knowledge_list,
                {
                  categorIds: [code],
                  orderBy: 'applaudCount=desc',
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    terminalCode: 'COMDIC_TERMINAL_APP',
                    platformCode: 'COMDIC_PLATFORM_CRISPS',
                  },
                }
              )
              .then((res) => {
                console.log(res)
                res.data.rows.forEach((txt) => {
                  const obj = {
                    id: txt.id,
                    title: txt.title,
                  }
                  this.swipeList.push(obj)
                })
              })
          }
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.notice {
  margin: 0 auto;
  width: 710px;
  height: 72px;
  background: #e7e7e7;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 18px 32px 18px 20px;
  .img-box {
    width: 32px;
    height: 32px;
    font-size: 0;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .swipe-box {
    width: 560px;
    height: 36px;
    margin: 0 32px 0 16px;
    .my-swipe .sp-swipe-item {
      height: 100%;
      width: 100%;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 32px;
    }
    .advertising {
      width: 100%;
      height: 100%;
      .textOverflow(1);
    }
  }
  .jump-box {
    .img-box;
    width: 8px;
    height: 14px;
  }
}
</style>
