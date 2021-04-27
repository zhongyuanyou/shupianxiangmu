<template>
  <div class="process">
    <div class="process-title">服务流程</div>
    <img :src="img" alt="" />
    <ul class="process-text">
      <li v-for="item of service" :key="item.id" class="process-text-item">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Process',
  data() {
    return {
      img: 'https://cdn.shupian.cn/sp-pt/wap/images/7aptu6pdfk40000.jpg',
      // 服务流程
      service: [
        { text: '公司调研', id: 'gsdy' },
        { text: '合作洽谈', id: 'hzqt' },
        { text: '出具方案', id: 'cjfa' },
        { text: '签订合同', id: 'qdht' },
      ],
    }
  },
}
</script>

<style scoped lang="less">
.process {
  width: @spread-page-width;
  height: 255px;
  padding: 30px 0 0;
  &-title {
    margin: 0 0 15px 40px;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  img {
    width: @spread-page-width;
  }
  &-text {
    display: flex;
    font-family: PingFang SC;
    justify-content: space-around;
    font-size: 28px;
    &-item {
      font-weight: 400;
      color: #333333;
    }
  }
}
</style>
