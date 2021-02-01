<template>
  <div class="banner">
    <!--    第一层-->
    <div class="banner-top">
      <sp-swipe :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(image, index) in images" :key="index">
          <a href="javascript:;">
            <img :src="image" class="banner-top-img" />
          </a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <Form />
    <!--    第二层-->
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import Form from '@/components/spread/tax/Form'

export default {
  name: 'BannerVue',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    Form,
  },
  data() {
    return {
      // 轮播图片
      images: [
        'https://cdn.shupian.cn/sp-pt/wap/dfzrgpsj6e80000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/1591o9av6ye8000.jpg',
      ],
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: inherit;
}
.banner {
  &-top {
    width: @spread-page-width;
    height: 392px;
    margin-bottom: -81px;

    &-img {
      width: @spread-page-width;
      height: 392px;
    }
  }
}
</style>
