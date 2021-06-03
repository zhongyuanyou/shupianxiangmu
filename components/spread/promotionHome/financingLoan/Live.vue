<template>
  <div v-if="list.length > 0">
    <div class="my-component">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="() => $parent.jumpLink2(item.url, item.title)"
      >
        <div class="item-title">
          <span class="item-title-text">{{ item.title }}</span>
          <span v-if="item.label !== ''" class="item-title-label">
            <span v-if="index === 1" class="living-margin">
              <span class="living-icon">
                <span class="living-bar living-bar1"></span>
                <span class="living-bar living-bar2"></span>
                <span class="living-bar living-bar3"></span>
              </span>
            </span>
            {{ item.label }}
          </span>
        </div>
        <div class="item-desc">{{ item.desc }}</div>
        <div class="item-img">
          <img :src="item.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Live',
  data() {
    return {
      // list: [
      //   {
      //     title: '点我咨询',
      //     desc: '一键咨询全贷款业务',
      //     label: '先服务后收费',
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/9szxp9wdiio0000.png',
      //     url: '',
      //   },
      //   {
      //     title: '资讯直播',
      //     desc: '精彩直播 等你来找',
      //     label: '直播中',
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/bz3o6gdyrug0000.png',
      //     url: '',
      //   },
      // ],
    }
  },
  computed: {
    list() {
      return this.$parent.liveList
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  .item {
    flex: none;
    width: 347px;
    height: 322px;
    background: #ffffff;
    border-radius: 24px;
    padding: 24px 20px 20px 20px;
    .item-title {
      display: flex;
      align-items: center;
      .item-title-text {
        font-size: 32px;
        font-weight: bold;
        color: #222222;
        line-height: 34px;
        margin-right: 8px;
      }

      .item-title-label {
        display: flex;
        align-content: center;
        // height: 32px;
        padding: 0px 6px;
        border-radius: 4px;
        border: 1px solid #ec5330;
        font-size: 20px;
        font-weight: bold;
        color: #ec5330;
        margin-top: -4px;
        .living-margin {
          margin-right: 4px;
        }
      }
    }

    .item-desc {
      font-size: 26px;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
      margin-top: 12px;
      margin-bottom: 16px;
    }

    .item-img {
      width: 306px;
      height: 180px;
      border-radius: 12px;
      img {
        width: 306px;
        height: 180px;
      }
    }

    // 直播动态图标
    .living-icon {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 16px;
      height: 16px;
      margin-top: 6px;
      .living-bar {
        padding: 0 1px;
        background-color: #ec5330;
        animation-name: living-bar;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
        animation-timing-function: linear;
      }
      .living-bar1 {
        animation-delay: 0.2s;
      }
      .living-bar2 {
        animation-delay: 0s;
      }
      .living-bar3 {
        animation-delay: 0.4s;
      }
      @keyframes living-bar {
        from {
          height: 16px;
        }
        to {
          height: 6px;
        }
      }
    }
  }
}
</style>
