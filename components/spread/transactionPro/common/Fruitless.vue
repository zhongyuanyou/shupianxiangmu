<template>
  <div class="fruitless" :style="{ backgroundColor: bgColor }">
    <div class="no-data">
      <sp-image class="no-data__icon" fit="cover" :src="img" />
      <!-- <template> -->
      <div class="no-data__descript">{{ prompt }}</div>
      <div
        :class="isTrigger ? 'is-trigger' : 'no-data__tip'"
        @click="onTrigger"
      >
        {{ trigger }}
      </div>
      <!-- </template> -->
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from '@chipspc/vant-dgg'
export default {
  name: 'Fruitless',
  components: {
    [VanImage.name]: VanImage,
  },
  props: {
    /**
     * @ -- 图片状态地址
     * 网络慢 https://cdn.shupian.cn/sp-pt/wap/5mro94p1khw0000.png
     * 无搜索结果 https://cdn.shupian.cn/sp-pt/wap/images/9cxcgh1a0t80000.png
     *
     */
    img: {
      type: String,
      default: 'https://cdn.shupian.cn/sp-pt/wap/images/9cxcgh1a0t80000.png',
    },
    // 显示状态
    prompt: {
      type: String,
      default: '抱歉,未找到相关结果',
    },
    // 触发事件的提示语
    // 使用场景：需点击提示语触发事件时使用
    trigger: {
      type: String,
      default: '',
    },
    // 是否为可触发事件状态
    isTrigger: {
      type: Boolean,
      default: false,
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: '#fff',
    },
  },
  methods: {
    // @ --触发事件
    onTrigger() {
      this.$emit('onTrigger')
    },
  },
}
</script>

<style lang="less" scoped>
.fruitless {
  min-height: 1000px;
  height: auto;
  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__icon {
      width: 340px;
      height: 340px;
      margin-top: 176px;
    }
    &__descript {
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-top: 24px;
    }
    &__tip {
      font-size: 24px;
      font-weight: 400;
      color: #cdcdcd;
      line-height: 28px;
      margin-top: 32px;
    }
    // 触发事件状态
    ::v-deep.is-trigger {
      font-weight: 400;
      line-height: 28px;
      margin-top: 32px;
      color: #4974f5;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
    }
  }
}
</style>
