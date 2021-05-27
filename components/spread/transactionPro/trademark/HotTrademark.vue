<template>
  <div class="hot-trademark">
    <span class="hot-trademark-title">热门商标</span>
    <div class="hot-trademark-content">
      <a
        v-for="(item, index) in trademarkHot"
        :key="index"
        v-md-map
        v-md:webClick
        :data-name="`商标交易聚合页_热门商标_${item.name}`"
        href="javascript:;"
        @click="jumpLink(item.url, item.description, item.execution)"
        ><img :src="item.img" alt=""
      /></a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trademarkHot: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/10mhf9bggcq8000.jpg',
            url: '',
            name: '第03类化妆日用',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/blnijqibtxs0000.jpg',
            url: '',
            name: '第05类医药药品',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/crj3x70vv0o0000.jpg',
            url: '',
            name: '第11类家用电器',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/92ihdvtmr1o0000.jpg',
            url: '',
            name: '第18类皮革箱包',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/bywj1i8uge00000.jpg',
            url: '',
            name: '第25类服装鞋帽',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/2clxcnzlduqs000.jpg',
            url: '',
            name: '第29类食品行业',
          },
        ]
      },
    },
  },
  methods: {
    jumpLink(url, description, execution) {
      this.$parent.jumpLink(url, description, execution)
    },
  },
}
</script>

<style lang="less" scoped>
.hot-trademark {
  margin: 0 20px;
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px;
  .hot-trademark-title {
    display: block;
    font-size: 32px;
    line-height: 33px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  .hot-trademark-content {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    > a {
      display: block;
      width: 215px;
      height: 130px;
      border: 1px solid rgba(205, 205, 205, 0.3);
      border-radius: 8px;
      display: flex;
      &:nth-child(3) ~ a {
        margin-top: 12px;
      }
      > img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
  }
}
</style>
