<template>
  <div class="banner-swipe">
    <div class="banner-box">
      <sp-swipe :autoplay="3000" class="sp-swipe">
        <sp-swipe-item
          v-for="(image, index) in images"
          :key="index"
          class="sp-swipe-item"
        >
          <div class="img" @click="jump(image.url)">
            <img
              :src="`${image.img}?x-oss-process=image/resize,m_fill,w_710,h_160,limit_0`"
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
    images: {
      type: Array,
      default: () => {
        return [
          {
            img: '',
            url: '',
          },
        ]
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
.banner-swipe {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  .banner-box {
    width: 100%;
    border-radius: 24px;
    height: 160px;
    .sp-swipe {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      .sp-swipe-item {
        width: 100%;
        height: 100%;
        border-radius: 24px;
        display: flex;
        .img {
          width: 100%;
          height: 160px;
          > img {
            width: 100%;
          }
        }
      }
    }
  }
  ::v-deep.sp-swipe__indicator {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.4);
  }
  ::v-deep.sp-swipe__indicators {
    bottom: 12px;
  }
  ::v-deep.sp-swipe__indicator--active {
    background: #fff;
  }
}
</style>
