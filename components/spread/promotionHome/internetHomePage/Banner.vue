<template>
  <div class="banner-box">
    <sp-swipe :autoplay="10000">
      <sp-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.img" @click="jump(image.url)" />
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
    images: {
      type: Array,
      default: () => {
        return [{ img: '', url: '' }]
      },
    },
  },
  methods: {
    jump(url) {
      if (url.indexOf('http') !== -1) {
        window.location.href = url
      }
    },
  },
}
</script>

<style lang="less" scoped>
.banner-box {
  width: 100%;
  height: 252px;
  background: url('https://cdn.shupian.cn/sp-pt/wap/images/fqj7ix7wm4w0000.png?x-oss-process=image/resize,m_fill,w_750,h_252,limit_0');
  background-size: 100% 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
  padding: 10px 20px 2px;
  margin-bottom: 20px;
  ::v-deep.sp-swipe {
    width: 100%;
    height: 240px;
    border-radius: 24px;
  }
  ::v-deep.sp-swipe-item {
    height: 240px;
    border-radius: 24px;
    > img {
      width: 100%;
      height: 240px;
      border-radius: 24px;
    }
  }
  ::v-deep.sp-swipe__indicator {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.4);
  }
  ::v-deep.sp-swipe__indicator--active {
    background: #fff;
  }
}
</style>
