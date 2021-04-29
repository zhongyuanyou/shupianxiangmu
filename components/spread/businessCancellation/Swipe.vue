<template>
  <div class="swipe">
    <sp-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
      <sp-swipe-item
        v-for="(item, i) of banners"
        :key="i"
        @click="jumpLink(item.url)"
      >
        <img :src="item.img" alt="" />
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
    banners: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // 页面跳转
    jumpLink(url) {
      this.$router.push(url)
    },
  },
}
</script>
<style lang="less" scoped>
.swipe {
  width: 100%;
  height: 392px;
}
.my-swipe,
.sp-swipe-item {
  z-index: 1;
  width: 100%;
  height: 392px;
  > img {
    width: 100%;
    height: 392px;
  }
}
</style>
