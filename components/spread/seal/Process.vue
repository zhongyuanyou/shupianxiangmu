<template>
  <div class="seal-process">
    <div class="seal-process-title">服务流程</div>
    <div class="seal-process-box">
      <div class="box-img">
        <div
          v-for="(item, index) of processOneImg"
          :key="index"
          class="box-img-item"
        >
          <img :src="index % 2 == 0 ? item.img : item" alt="" />
          <p class="box-img-item-text">{{ item.text }}</p>
        </div>
      </div>
      <div class="box-img box-two">
        <div
          v-for="(item, index) of processTwoImg"
          :key="index"
          class="box-img-item"
        >
          <img :src="index % 2 == 0 ? item.img : item" alt="" />
          <p class="box-img-item-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Process',
      // 服务流程图片及文案 1
      processOneImg: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/p31wtduw3lc000.png',
          text: '在线下单',
        },
        'https://cdn.shupian.cn/sp-pt/wap/images/34xhk0z5w880000.png',
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5x6xtku8nkw0000.png',
          text: '采集信息',
        },
        'https://cdn.shupian.cn/sp-pt/wap/images/34xhk0z5w880000.png',
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8bs6kflurk00000.png',
          text: '印章刻制',
        },
      ],
      processTwoImg: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/16tncaau3fcw000.png',
          text: '备案',
        },
        'https://cdn.shupian.cn/sp-pt/wap/images/34xhk0z5w880000.png',
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/eyo11ke446g0000.png',
          text: '送章上门',
        },
      ],
    }
  },
}
</script>

<style scoped lang="less">
.seal-process {
  margin: 64px 40px 31px;
  &-box {
    padding: 31px 0 0 32px;
    text-align: center;
  }
  &-title {
    font-size: 40px;
    line-height: 40px;
    font-weight: bold;
    color: #1a1a1a;
  }
}
.box-img {
  display: flex;
  margin-bottom: 58px;
  &-item {
    &-text {
      font-size: 28px;
      font-weight: bold;
      color: #222222;
      line-height: 1;
      margin-top: 17px;
    }
    &:nth-child(even) {
      > img {
        width: 43px;
        height: 24px;
        margin: 0 40px;
      }
    }
    > img {
      width: 120px;
      height: 120px;
    }
  }
}
.box-two {
  display: flex;
  justify-content: center;
}
</style>
