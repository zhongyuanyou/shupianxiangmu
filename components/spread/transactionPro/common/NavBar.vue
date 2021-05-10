<template>
  <div>
    <div class="my-component">
      <a
        v-for="(item, index) in data"
        :key="index"
        v-md-map
        v-md:webClick
        class="item"
        :class="index > 4 ? 'item-no-margin' : ''"
        @click="jumpLink(item.url, item.text)"
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
        return []
      },
    },
  },
  methods: {
    // 跳转链接-IM规划师
    jumpLink(url, code) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
        }
      }
      //  else {
      //   // IM美恰客服
      //   // window.spptMqMi.showPanel()
      //   this.$parent.jumpLink(url)
      // }
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
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
      // font-weight: bold;
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
