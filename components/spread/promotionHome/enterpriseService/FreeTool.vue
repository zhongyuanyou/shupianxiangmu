<template>
  <div class="free-tool">
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="tool-box">
        <div
          v-for="(tool, index) in toolList"
          :key="index"
          class="tool"
          @click="jump(tool.url)"
        >
          <div class="img-box"><img :src="tool.img" alt="" /></div>
          <div class="name">{{ tool.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toolList: {
      type: Array,
      default: () => {
        return [
          {
            name: '公司查询',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/6lgcjtdt6wc0000.png',
            url: '',
          },
          {
            name: '企业核名',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/4j2q6ef3ira0000.png',
            url: '',
          },
          {
            name: '报税服务',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/6lgcjtdt6wc0000.png',
            url: '',
          },
          {
            name: '资质证书',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/62ikq7s3n5g0000.png',
            url: '',
          },
          {
            name: '风险信息',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/62ikq7s3n5g0000.png',
            url: '',
          },
        ]
      },
    },
    title: {
      type: String,
      default: '免费工具查询',
    },
  },
  methods: {
    jump(url) {
      if (url.indexOf('http') !== -1) {
        window.location.href = url
      }
    },
  },
}
</script>

<style lang="less" scoped>
.free-tool {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  .content {
    padding: 18px 0px 20px 20px;
    background: #fff;
    border-radius: 24px;
    .title {
      font-size: 32px;
      color: #222222;
      line-height: 45px;
      font-weight: bold;
    }
    .tool-box::-webkit-scrollbar {
      display: none;
    }
    .tool-box {
      margin-top: 33px;
      display: flex;
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      .tool {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 24px;

        .img-box {
          width: 74px;
          height: 74px;
          display: flex;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          width: 120px;
          font-size: 24px;
          color: #222222;
          text-align: center;
          line-height: 32px;
          margin-top: 17px;
        }
      }
    }
  }
}
</style>
