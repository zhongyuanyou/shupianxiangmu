<template>
  <div>
    <div class="my-component">
      <div class="title">实用工具</div>
      <div class="tools">
        <a
          v-for="item in list"
          :key="item.id"
          class="tool"
          href="javascript:void(0);"
          @click="jumpLink(item.url)"
        >
          <img class="tool-img" :src="item.img" />
          <p class="tool-name">{{ item.name }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShiYong',
  data() {
    return {
      list: [
        {
          id: 1,
          name: '免费核名',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/dzwkf02u3vc0000.png',
          imgWidth: 225,
          imgHeight: 348,
          url: '/spread/auditCompanyName',
        },
        {
          id: 2,
          name: '注册公司标准',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/378pqy54zuq0000.png',
          imgWidth: 225,
          imgHeight: 348,
          url: '/spread/companyRegistrationStandards',
        },
        {
          id: 3,
          name: '税筹方案',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4wb4vrnwjo80000.png',
          imgWidth: 225,
          imgHeight: 348,
          url: '/spread/tax',
        },
        {
          id: 4,
          name: '法律咨询',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1e1guwl1gz28000.png',
          imgWidth: 225,
          imgHeight: 348,
          url: '',
        },
      ], // 工具列表
    }
  },
  methods: {
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: 30px 0;
  font-family: PingFang SC;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .tools {
    display: flex;
    justify-content: space-between;

    .tool {
      flex: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tool-img {
        width: 48px;
        height: 48px;
        margin-bottom: 12px;
      }
      .tool-name {
        font-size: 28px;
        font-weight: bold;
        color: #222222;
      }
    }
  }
}
</style>
