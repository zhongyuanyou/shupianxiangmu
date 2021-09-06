<template>
  <div class="welfare">
    <div class="welfare-box">
      <div class="title">福利专区</div>
      <div class="content-box">
        <div
          v-for="(item, index) in welfareList"
          :key="index"
          class="item"
          @click="jump(item.url)"
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
            url: '',
            img: '',
          },
        ]
      },
    },
  },
  methods: {
    jump(url) {
      this.$parent.jumpLink(url)
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
