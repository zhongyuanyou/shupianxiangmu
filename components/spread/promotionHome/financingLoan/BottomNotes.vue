<template>
  <div>
    <div class="my-component">
      <div v-for="(item, index) in list" :key="index" class="item">
        <span class="item-img">
          <img :src="item.img" />
        </span>
        <span class="item-title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNotes',
  data() {
    return {
      list: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2pbk31dyaqk0000.png',
          title: '1对1服务',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9djkjt89vmk0000.png',
          title: '合法合规',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/49hwrsbnxwc0000.png',
          title: '快速放款',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9dn8nlgelj40000.png',
          title: '申请便捷',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .item {
    display: flex;
    .item-img {
      width: 24px;
      height: 24px;
      display: flex;
      margin-right: 8px;
      img {
        width: 24px;
        height: 24px;
      }
    }

    .item-title {
      font-size: 24px;
      font-weight: 400;
      color: #cccccc;
      line-height: 24px;
    }
  }
}
</style>
