<template>
  <div class="notice">
    <div class="img-box">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/ft7dl6ygxtk0000.png"
        alt=""
      />
    </div>
    <div class="line"></div>
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
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV

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
      base: '',
      clasCode: '',
    }
  },
  mounted() {
    this.getKnowledgeCode()
    switch (DGG_SERVER_ENV) {
      case 'development':
        this.base = 'd'
        this.clasCode = ''
        break
      case 'release':
        this.base = 't'
        this.clasCode = 'bdsp100240'
        break
      case 'production':
        this.base = ''
        this.clasCode = 'bdsp100104'
        break
    }
  },
  methods: {
    // 跳转必懂详情
    jump(item) {
      window.location.href = `https://${this.base}m.shupian.cn/known/detail/article?id=${item}`
    },
    // 获取必懂分类id
    getKnowledgeCode() {
      this.$axios.get(financingApi.knowledge_code).then((res) => {
        res.data.forEach((item) => {
          if (item.code === this.clasCode) {
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
  height: 80px;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 18px 25px 18px 20px;
  margin-bottom: 20px;
  .img-box {
    width: 126px;
    height: 33px;
    display: flex;
    > img {
      width: 100%;
    }
  }
  .line {
    width: 1px;
    height: 24px;
    background: #f4f4f4;
    margin: 0 20px;
  }
  .swipe-box {
    width: 360px;
    height: 33px;
    // line-height: 36px;
    display: inline-block;
    padding-top: 3px;
    margin: 0 32px 0 16px;
    .my-swipe .sp-swipe-item {
      height: 100%;
      width: 100%;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
    }
    .advertising {
      width: 100%;
      height: 36px;
      line-height: 36px;
      .textOverflow(1);
    }
  }
  .jump-box {
    margin-left: auto;
    .img-box;
    width: 8px;
    height: 14px;
  }
}
</style>
