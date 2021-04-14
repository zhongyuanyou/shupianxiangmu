<template>
  <div>
    <div class="my-component">
      <a
        v-for="(item, index) in data"
        :key="index"
        v-md-map
        v-md:webClick
        :data-name="item.md.name"
        class="item"
        :class="index > 4 ? 'item-no-margin' : ''"
        @click="jumpLink(item.url.item.text)"
      >
        <div
          class="item-img-big"
          :class="index > -1 ? 'item-img-small' : 'item-img-big'"
        >
          <img :src="item.img" />
        </div>
        <div class="item-text">{{ item.text }}</div>
        <div v-if="item.marketingImg" class="item-marketing">
          <img :src="item.marketingImg" />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/axroobu5a740000.png',
            text: '热门公司',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '资质交易聚合页_总包资质',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/fg2ksxx000o0000.png',
            text: '优质公司',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/8jhr24e0irw000.png',
            text: '特价公司',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/1zjw4j2cor34000.png',
            text: '精品公司',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/1887y4q19x9c000.png',
            text: '人气公司',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/7ry6zqnzmtg0000.png',
            text: '科技信息',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/5fly9lt75bs0000.png',
            text: '电子贸易',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/6ral3star6s0000.png',
            text: '广告传媒',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/4dn7hmjqqcq0000.png',
            text: '教育培训',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/44l5cj3uoxk0000.png',
            text: '出售公司',
            marketingImg: '',
            url: '',
            md: {
              type: '',
              name: '',
            },
          },
        ]
      },
    },
  },
  methods: {
    // 跳转链接-IM规划师
    jumpLink(url, code) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.open(url)
          // window.open(`${url}?code=${code}`)
        } else {
          this.$router.push(url)
        }
      } else {
        // IM美恰客服
        window.spptMqMi.showPanel()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  // width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 710px;
  padding: 40px 25px;
  background: #ffffff;
  border-radius: 24px;
  margin: 0 auto;
  .item {
    width: 104px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    .item-img-big {
      flex: none;
      width: 104px;
      height: 72px;
      margin-bottom: 24px;
      img {
        display: flex;
        width: 104px;
        height: 72px;
      }
    }
    .item-img-small {
      flex: none;
      width: 50px;
      height: 50px;
      margin-bottom: 20px;
      img {
        display: flex;
        width: 50px;
        height: 50px;
      }
    }
    .item-text {
      flex: none;
      font-size: 24px;
      font-weight: bold;
      color: #222222;
      white-space: nowrap;
      line-height: 24px;
    }
    .item-marketing {
      width: auto;
      height: 24px;
      position: absolute;
      top: -12px;
      right: 0px;
    }
  }
  .item:not(:first-child) {
    margin-left: 20px;
  }
  .item:nth-child(6) {
    margin-left: 0px;
  }
  .item-no-margin {
    margin-bottom: 0px;
  }
}
</style>
