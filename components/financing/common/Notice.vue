<template>
  <div class="notice">
    <div class="img-box">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/9k4g0n3bgoc0000.png?x-oss-process=image/resize,m_fill,w_32,h_32,limit_0"
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
        this.clasCode = 'bdsp100216'
        break
      case 'production':
        this.base = ''
        this.clasCode = 'bdsp100102'
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
  height: 72px;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 0 32px 0 20px;
  .img-box {
    width: 32px;
    height: 32px;
    margin-top: 4px;
    display: flex;
    font-size: 0;
    > img {
      width: 100%;
      height: 100%;
    }
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
      width: 100%;
      height: 36px;
      line-height: 36px;
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
