<template>
  <div>
    <div class="my-component">
      <div class="header">
        <span class="header-title">新人专属礼</span>
        <button class="header-btn" @click="() => $parent.jumpLink(list[0].url)">
          更多<my-icon name="list_ic_next" size="0.14rem"></my-icon>
        </button>
      </div>
      <div class="content">
        <!-- <div class="content-left">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/bxe8tldrtk00000.png"
          />
        </div> -->
        <div class="content-right">
          <div
            v-for="(item, itemKey) in list"
            :key="itemKey"
            :style="{ backgroundImage: 'url(' + item.img + ')' }"
            class="content-right-item"
            @click="() => $parent.jumpLink2(item.url)"
          >
            <div v-if="itemKey > 0">
              <div class="content-right-item-img">
                <!-- <img :src="item.img" /> -->
              </div>
              <div class="content-right-item-title">{{ item.title }}</div>
              <div class="content-right-item-desc">{{ item.desc }}</div>
            </div>
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
  height: 340px;
  border-radius: 24px;
  margin: 0px 20px;
  padding: 18px 20px 26px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    .header-title {
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 44px;
    }
    .header-btn {
      font-size: 22px;
      font-weight: bold;
      color: #555555;
      line-height: 22px;
      background-color: #fff;
      line-height: 44px;
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
        // background: #ffffff;
        border-radius: 8px;
        border: 1px solid #f4f4f4;
        background-size: 100%;
        padding: 10px;
        margin-right: 10px;
        .content-right-item-img {
          width: 140px;
          height: 140px;
          // background-color: #f4f4f4;
          img {
            width: 140px;
            height: 140px;
          }
        }
        .content-right-item-title {
          font-size: 22px;
          font-weight: bold;
          color: #222222;
          line-height: 30px;
          margin: 12px 0 4px 0;
          .textOverflow(1);
        }
        .content-right-item-desc {
          font-size: 20px;
          font-weight: 400;
          color: #ec5330;
          line-height: 30px;
          .textOverflow(1);
        }
      }
      .content-right-item:first-child {
        border: 0px;
      }
    }
  }
}
</style>
