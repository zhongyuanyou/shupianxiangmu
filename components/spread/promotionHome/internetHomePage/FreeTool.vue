<template>
  <div class="free-tool">
    <div class="content">
      <div class="title">免费工具查询</div>
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
            name: '域名检索',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/6lgcjtdt6wc0000.png',
            url: '',
          },
          {
            name: '云服务器',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/4j2q6ef3ira0000.png',
            url: '',
          },
          { name: '云建站', img: '', url: '' },
          {
            name: '虚拟主机',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/62ikq7s3n5g0000.png',
            url: '',
          },
        ]
      },
    },
  },
  methods: {
    jump(url) {
      console.log(url)
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
  margin-top: 20px;
  .content {
    padding: 18px 20px 32px;
    background: #fff;
    border-radius: 24px;
    .title {
      font-size: 32px;
      color: #222222;
      line-height: 45px;
      font-weight: bold;
    }
    .tool-box {
      margin-top: 33px;
      display: flex;
      justify-content: space-around;
      .tool {
        display: flex;
        flex-direction: column;
        align-items: center;
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
