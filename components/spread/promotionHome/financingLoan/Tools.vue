<template>
  <div>
    <div class="my-component">
      <div v-for="(item, index) in list" :key="index" class="item">
        <div class="item-wrap-img">
          <img class="item-img" :src="item.img" />
        </div>
        <p class="item-title">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tools',
  data() {
    return {
      // list: [
      //   {
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/cyb9mn6k7lk0000.png',
      //     title: '额度评估',
      //     url: '',
      //   },
      //   {
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/76nvcmvpmlw0000.png',
      //     title: '贷款计算器',
      //     url: '',
      //   },
      //   {
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/6cb9xtrp8h80000.png',
      //     title: '智能贷款',
      //     url: '',
      //   },
      //   {
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/cjraco2vifc0000.png',
      //     title: '申请进度',
      //     url: '',
      //   },
      //   {
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/enxy8p7b2k00000.png',
      //     title: '我的贷款',
      //     url: '',
      //   },
      // ],
    }
  },
  computed: {
    list() {
      return this.$parent.toolList
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  background: #ffffff;
  border-radius: 24px;
  margin: 0px 20px;
  padding: 32px 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .item-wrap-img {
      width: 52px;
      height: 52px;
      margin-bottom: 16px;
      .item-img {
        width: 52px;
        height: 52px;
        display: flex;
      }
    }

    .item-title {
      font-size: 24px;
      font-weight: bold;
      color: #222222;
    }
  }
}
</style>
