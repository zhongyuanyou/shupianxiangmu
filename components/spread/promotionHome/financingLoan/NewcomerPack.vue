<template>
  <div>
    <div class="my-component">
      <div class="header">
        <span class="header-title">新人专属礼</span>
        <button class="header-btn">更多></button>
      </div>
      <div class="content" @click="() => $parent.toast()">
        <div class="content-left">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/bxe8tldrtk00000.png"
          />
        </div>
        <div class="content-right">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="content-right-item"
          >
            <div class="content-right-item-img">
              <img :src="item.img" />
            </div>
            <div class="content-right-item-title">{{ item.title }}</div>
            <div class="content-right-item-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewcomerPack',
  data() {
    return {
      // list: [
      //   {
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/g5x72ibmgj40000.png',
      //     title: '测额度得红包',
      //     desc: '最高得888元',
      //   },
      //   {
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/alx5rih2hw00000.png',
      //     title: '限时抢券',
      //     desc: '抢7天免息券',
      //   },
      //   {
      //     img: 'https://cdn.shupian.cn/sp-pt/wap/images/7097zqzjqa80000.png',
      //     title: '贷即得',
      //     desc: '年利率7%起',
      //   },
      // ],
    }
  },
  computed: {
    list() {
      return this.$parent.newcomerPackList
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  background: #ffffff;
  border-radius: 24px;
  margin: 0px 20px;
  padding: 24px 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    .header-title {
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 32px;
    }
    .header-btn {
      font-size: 22px;
      font-weight: bold;
      color: #555555;
      line-height: 22px;
      background-color: #fff;
    }
  }

  .content {
    display: flex;
    .content-left {
      width: 160px;
      height: 234px;
      margin-right: 8px;
      img {
        width: 160px;
        height: 234px;
      }
    }
    .content-right {
      display: flex;
      .content-right-item {
        width: 160px;
        height: 234px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid rgba(205, 205, 205, 0.5);

        padding: 10px;
        margin-right: 10px;
        .content-right-item-img {
          width: 140px;
          height: 140px;
          background-color: #f4f4f4;
          img {
            width: 140px;
            height: 140px;
          }
        }
        .content-right-item-title {
          font-size: 22px;
          font-weight: bold;
          color: #222222;
          line-height: 22px;
          margin: 12px 0;
        }
        .content-right-item-desc {
          font-size: 22px;
          font-weight: bold;
          color: #ec5330;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
