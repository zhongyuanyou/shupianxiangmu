<template>
  <div class="monthly">
    <div class="monthly-box">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="jump(item)"
      >
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
        <div class="img-box"><img :src="item.img" alt="" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Monthly',
  data() {
    return {
      list: [
        {
          title: '热门上新榜',
          desc: '新上品源 先睹为快',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5qpy8gejixo0000.png',
          url: '',
        },
        {
          title: '低价捡漏榜',
          desc: '超低价格更优惠',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/f5j3e15h3zk0000.png',
          url: '',
        },
        {
          title: '收藏人气榜',
          desc: '高人气必看商品',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/d9vq0bd4igw0000.png',
          url: '',
        },
        {
          title: '商品热搜榜',
          desc: '超多商品大家都在搜',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4ywvt0wepzw0000.png',
          url: '',
        },
      ],
    }
  },
  methods: {
    jump(item) {
      console.log(item.url)
    },
  },
}
</script>

<style lang="less" scoped>
.monthly {
  width: 100%;
  padding: 20px;
  .monthly-box {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    > div {
      width: 347px;
      height: 160px;
      background: #ffffff;
      border: 1px solid #f3f3f3;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      margin-right: 16px;
      margin-bottom: 16px;
      position: relative;
      padding-top: 32px;
      padding-left: 24px;
      .title {
        font-size: 30px;
        color: #222222;
        font-weight: bold;
      }
      .desc {
        margin-top: 12px;
        font-size: 22px;
        color: #999999;
        opacity: 0.6;
      }
      .img-box {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 88px;
        height: 73px;
        font-size: 0;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    > div:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
