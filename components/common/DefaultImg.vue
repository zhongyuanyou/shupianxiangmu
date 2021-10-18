<template>
  <div class="default-img">
    <img src="https://img10.dgg.cn/pt03/wap/cmxakdtkqxs0000.png" alt="" />
    <div class="info">{{ info }}</div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
      default: '没有找到相关结果，换个关键词试试吧',
    },
  },
}
</script>

<style lang="less" scoped>
.default-img {
  margin-top: 52px;
  text-align: center;
  img {
    width: 340px;
    height: 340px;
  }
  .info {
    margin-top: 24px;
    font-weight: bold;
    font-size: 30px;
    color: #222222;
    text-align: center;
  }
}
</style>
