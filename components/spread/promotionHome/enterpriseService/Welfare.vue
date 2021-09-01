<template>
  <div class="welfare">
    <div class="welfare-box">
      <div class="title">福利专区</div>
      <div class="content-box">
        <div
          v-for="(item, index) in welfareList"
          :key="index"
          class="item"
          @click="jump(index)"
        >
          <img
            :src="`${item.img}?x-oss-process=image/resize,m_fill,w_329,h_134,limit_0`"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    welfareList: {
      type: Array,
      default: () => {
        return [
          {
            title: '千万补贴',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/b00y6jdgvkk0000.png',
          },
          {
            title: '限时秒杀',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/2i046mnvvho0000.png',
          },
          {
            title: '99专区',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/9h3rtpcbul80000.png',
          },
          {
            title: '新客专享',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/9aim02xnqp00000.png',
          },
        ]
      },
    },
  },
  methods: {
    jump(idx) {
      console.log(idx)
    },
  },
}
</script>

<style lang="less" scoped>
.welfare {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  .welfare-box {
    width: 100%;
    padding: 18px 20px 22px;
    background: #fff;
    border-radius: 24px;
    .title {
      font-size: 32px;
      color: #222222;
      font-weight: 700;
      line-height: 45px;
    }
    .content-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 20px;
      .item {
        width: 329px;
        height: 134px;
        display: flex;
        border-radius: 12px;
        margin-bottom: 10px;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }
      }
    }
  }
}
</style>
