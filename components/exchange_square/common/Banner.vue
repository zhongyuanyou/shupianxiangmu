<template>
  <div class="banner">
    <div class="swipe-box">
      <sp-swipe
        class="my-swipe"
        :autoplay="5000"
        :show-indicators="bannerList.length > 1"
        indicator-color="white"
      >
        <sp-swipe-item v-for="(item, index) in bannerList" :key="index">
          <div class="img-box" @click="jump(item)">
            <img
              :src="`${
                item && item.materialUrl
              }?x-oss-process=image/resize,m_fill,w_710,h_240,limit_0`"
              alt=""
            />
          </div>
        </sp-swipe-item>
      </sp-swipe>
    </div>
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
  methods: {
    jump(item) {
      console.log(item)
    },
  },
}
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  padding: 0 20px;
  margin-top: 10px;
  height: 240px;
  .swipe-box {
    width: 100%;
    height: 100%;
    .my-swipe {
      width: 100%;
      height: 100%;
      background: #357dff;
      border-radius: 24px;
      .img-box {
        width: 100%;
        height: 100%;
        border-radius: 24px;
        > img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 24px;
        }
      }
    }
  }
}
</style>
