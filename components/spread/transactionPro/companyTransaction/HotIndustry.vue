<template>
  <div>
    <div class="my-component">
      <div class="title">热门行业</div>
      <div class="content">
        <a
          v-for="(item, index) in hotIndustry"
          :key="index"
          class="item"
          :class="index > 2 ? 'item-no-margin' : ''"
          :style="{ backgroundImage: `url(${item.img})` }"
          @click="jumpLink(item.url, item.description, item.execution)"
        >
          <p class="item-title">{{ item.title }}</p>
          <p class="item-desc">{{ item.desc }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotIndustry',
  props: {
    hotIndustry: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/cpp9g1qgodc0000.png',
          title: '科技信息',
          desc: '精选热门',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8beaoar79pk0000.png',
          title: '电子贸易',
          desc: '性价首选',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7rvae8wpmpw0000.png',
          title: '广告传媒',
          desc: '用心甄选',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/dnhkv7no5eo0000.png',
          title: '教育培训',
          desc: '人气推荐',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3bhu9wogvpc0000.png',
          title: '餐饮美容',
          desc: '严选商品',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2t50oct5pig0000.png',
          title: '物业地产',
          desc: '爆款热销',
          url: '',
        },
      ],
    }
  },
  methods: {
    jumpLink(url, description, execution) {
      // if (url) {
      //   if (url.indexOf('http') > -1) {
      //     window.location.href = url
      //     return
      //   }
      // }
      this.$parent.jumpLink(url, description, execution)
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(@spread-page-width - 40px);
  margin: 0 auto;
  padding: 24px 21px;
  background: #ffffff;
  border-radius: 24px;
  .title {
    line-height: 32px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 24px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 215px;
      height: 130px;
      background-repeat: no-repeat;
      background-size: cover;
      padding-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 16px;
      border: 0.5px solid rgba(205, 205, 205, 0.5);
      border-radius: 8px;
      .item-title {
        flex: none;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 28px;
        margin-bottom: 9px;
      }
      .item-desc {
        flex: none;
        font-size: 22px;
        font-weight: 400;
        color: #555555;
        line-height: 22px;
      }
    }
    .item-no-margin {
      margin-bottom: 0px;
    }
  }
}
</style>
