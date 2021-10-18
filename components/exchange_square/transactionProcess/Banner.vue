<template>
  <div class="banner">
    <sp-swipe
      class="my-swipe"
      :autoplay="5000"
      :show-indicators="bannerList.length > 1"
      indicator-color="white"
    >
      <sp-swipe-item v-for="(item, index) in bannerList" :key="index">
        <div class="img-box" @click="jump"><img :src="item.img" alt="" /></div>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  props: {
    bannerList: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/4mjyjc1ofo80000.png',
          },
        ]
      },
    },
  },
  methods: {
    jump() {},
  },
}
</script>
<style lang="less" scoped>
.banner {
  width: 100vw;
  height: 326px;
  .my-swipe {
    width: 100%;
    height: 100%;
    .img-box {
      width: 100%;
      height: 100%;
      font-size: 0;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
