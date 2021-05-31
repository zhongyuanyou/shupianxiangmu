<template>
  <div class="banner">
    <sp-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="#4974F5"
      :show-indicators="imgList.length > 1"
    >
      <sp-swipe-item v-for="(item, idx) in imgList" :key="idx"
        ><img :src="item.img" alt=""
      /></sp-swipe-item>
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
    imgList: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/2oggsns53y80000.png',
            url: '', // 外链
            iosUrl: '', // 内链接ios
            adrUrl: '', // 内链安卓链接
            wapUrl: '', // wap内链
          },
        ]
      },
    },
  },
}
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  height: 278px;
  padding: 32px 40px;
  background: #fff;
  .my-swipe .sp-swipe-item {
    font-size: 20px;
    height: 214px;
    text-align: center;
    border-radius: 12px;
    background: #dddddd;
    > img {
      width: 100%;
      height: 100%;
      //   object-fit: cover;
    }
  }
}
</style>
