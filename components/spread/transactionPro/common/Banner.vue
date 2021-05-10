<template>
  <div>
    <div class="my-component">
      <sp-swipe class="banner-swipe" :loop="true" autoplay="5000">
        <sp-swipe-item v-for="(item, index) in data" :key="index">
          <sp-image
            v-md-map
            v-md:webClick
            :data-name="item.md.name"
            fit="cover"
            :src="item.img"
            @click="onUrl(item.url)"
          />
        </sp-swipe-item>
      </sp-swipe>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image } from '@chipspc/vant-dgg'
export default {
  name: 'Banner',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/f7ijmltazq00000.png',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/5x2uvrt99dw0000.png',
            md: {
              type: '',
              name: '',
            },
          },
        ]
      },
    },
  },
  data() {
    return {
      current: 0, // banner下标
    }
  },
  methods: {
    // 跳转链接-IM规划师
    onUrl(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 710px;
  // height: 228px;
  // height: 180px;
  margin: 0 auto;
  .banner-swipe {
    // height: 228px;
    // width: 710px;
    height: 180px;
    border-radius: 24px;
    ::v-deep .sp-swipe__indicator--active {
      background: #ffffff;
    }
    .sp-image {
      // width: 710px;
      height: 180px;
    }
  }
}
</style>
