<template>
  <div>
    5654
    <waterfall :col="8" :data="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]">
      <template>
        <div
          class="pr pbImgBox"
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
          :key="index"
        >
          <img :src="'images/' + item + '.jpg'" alt="加载错误" />
          <span class="textOver">夏热防暑误区热点公众号首图</span>
        </div>
      </template>
    </waterfall>
  </div>
</template>

<script>
import { waterfall } from 'vue-waterfall2'
export default {
  components: { waterfall },
}
</script>

<style lang="less" scoped></style>
