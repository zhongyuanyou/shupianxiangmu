<template>
  <div class="banner">
    <sp-swipe
      class="my-swipe"
      :autoplay="5000"
      :show-indicators="bannerList.length > 1"
      indicator-color="white"
    >
      <sp-swipe-item>
        <div class="img-box" @click="jump"><img src="" alt="" /></div>
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
        return []
      },
    },
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
      background: #4974f5;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
