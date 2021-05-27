<template>
  <div>
    <div class="my-component">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="() => $parent.jumpLink2(item.url)"
      >
        <div class="item-title">{{ item.title }}</div>
        <div class="item-desc">{{ item.desc }}</div>
        <div class="item-img">
          <img :src="item.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Activities',
  data() {
    return {
      // list: [
      //   {
      //     title: '签到有礼',
      //     desc: '天天领福利',
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/a1nyy8rq0fc0000.png',
      //     url: '',
      //   },
      //   {
      //     title: '领券中心',
      //     desc: '省钱券包',
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/bvcj0w07g000000.png',
      //     url: '',
      //   },
      //   {
      //     title: '点我抽奖',
      //     desc: '现金红包待领',
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/dahfjspspsw0000.png',
      //     url: '',
      //   },
      //   {
      //     title: '有奖问答',
      //     desc: '涨知识享豪礼',
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/89fka9m5m3o0000.png',
      //     url: '',
      //   },
      // ],
    }
  },
  computed: {
    list() {
      return this.$parent.activityList
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  .item {
    width: 170px;
    height: 140px;
    background: #ffffff;
    border-radius: 14px;
    padding: 24px 20px;
    position: relative;

    .item-title {
      font-size: 26px;
      font-weight: bold;
      color: #222222;
      line-height: 26px;
      margin-bottom: 8px;
    }

    .item-desc {
      width: 170px;
      font-size: 22px;
      font-weight: bold;
      color: #999999;
      line-height: 26px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }

    .item-img {
      width: 32px;
      height: 32px;
      position: absolute;
      right: 12px;
      bottom: 12px;
      img {
        display: flex;
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
