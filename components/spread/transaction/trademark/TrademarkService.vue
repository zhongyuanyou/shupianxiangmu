<template>
  <div class="trademark-service">
    <span class="trademark-service-title">商标服务</span>
    <div class="trademark-service-content">
      <div class="trademark-service-content-left">
        <a
          v-md-map
          v-md:p_IMClick
          :data-name="`商标交易聚合页_商标服务_${TrademarkService[0].name}_在线咨询`"
          href="javascript:;"
          @click="chat(TrademarkService[0].url)"
          ><img :src="TrademarkService[0].img" alt=""
        /></a>
      </div>
      <div class="trademark-service-content-right">
        <a
          v-md-map
          v-md:p_IMClick
          :data-name="`商标交易聚合页_商标服务_${TrademarkService[1].name}_在线咨询`"
          href="javascript:;"
          @click="chat(TrademarkService[1].url)"
          ><img :src="TrademarkService[1].img" alt=""
        /></a>
        <a
          v-md-map
          v-md:p_IMClick
          :data-name="`商标交易聚合页_商标服务_${TrademarkService[2].name}_在线咨询`"
          href="javascript:;"
          @click="chat(TrademarkService[2].url)"
          ><img :src="TrademarkService[2].img" alt=""
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TrademarkService: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9fdf4f6ag0k0000.jpg',
          url: '',
          name: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ayfnw0im9740000.jpg',
          url: '',
          name: '商标信息变更',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8eqt8sxee380000.jpg',
          url: '',
          name: '商标异议处理',
        },
      ],
    }
  },
  methods: {
    chat(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>
<style lang="less" scoped>
.trademark-service {
  width: 100%;
  margin-top: 63px;
  padding: 0 40px;
  margin-bottom: 26px;
  .trademark-service-title {
    display: block;
    font-size: 40px;
    line-height: 39px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  .trademark-service-content {
    margin-top: 31px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .trademark-service-content-left {
      width: 327px;
      height: 286px;
      > a {
        display: block;
        width: 327px;
        height: 286px;
        border-radius: 8px;
        position: relative;
        > img {
          width: 327px;
          height: 286px;
          border-radius: 8px;
          position: absolute;
        }
      }
    }
    .trademark-service-content-right {
      width: 327px;
      height: 286px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > a {
        display: block;
        width: 327px;
        height: 135px;
        border-radius: 8px;
        position: relative;
        > img {
          width: 327px;
          height: 135px;
          border-radius: 8px;
          position: absolute;
        }
      }
    }
  }
}
</style>
