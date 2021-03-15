<template>
  <div class="banner">
    <sp-swipe class="my-swipe" :autoplay="3000" indicator-color="#547CF8">
      <sp-swipe-item
        v-for="item in swipeList"
        :key="item.code"
        :style="{ backgroundImage: 'url(' + item.bg + ')' }"
      >
        <!-- <span class="title">{{ item.title }}</span>
        <span class="describe">{{ item.describe }}</span> -->
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
    swipeList: {
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
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  border-radius: 24px;
  .my-swipe .sp-swipe-item {
    width: 100%;
    height: 160px;
    border-radius: 24px;
    background-repeat: no-repeat;
    background-position: 0px -3px;
    background-size: 100% 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .title {
      display: block;
      height: 36px;
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #4974f5;
      line-height: 36px;
    }
    .describe {
      display: block;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bold;
      color: #999999;
      line-height: 24px;
      margin-top: 16px;
    }
  }
  ::v-deep.sp-swipe__indicators {
    bottom: 8px;
  }
  ::v-deep.sp-swipe__indicator {
    background: #dee0e2;
  }
}
</style>
