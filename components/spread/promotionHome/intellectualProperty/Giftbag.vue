<template>
  <div class="gift-bag">
    <h1>知识产权新人大礼包</h1>
    <div class="box">
      <div class="right">
        <img
          v-if="gift && gift.length > 0"
          class="first-img"
          :src="gift[0].img"
          alt=""
          @click="jump(gift[0].url)"
        />
        <div v-for="(item, index) in list" :key="index" class="div-box">
          <img :src="item.img" alt="" @click="jumpLink(item.url)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Giftbag',
  props: {
    gift: {
      type: Array,
      default: () => {
        return []
      },
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  mounted() {
    console.log(this.list)
  },
  methods: {
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.gift-bag {
  background: #fff;
  margin: 20px 20px 0 20px;
  padding: 18px 0 24px 20px;
  border-radius: 24px;
  > h1 {
    font-size: 32px;
    color: #222222;
    letter-spacing: 0;
  }
  > .box {
    margin-top: 16px;
    width: 100%;
    display: flex;
    > img {
      width: 168px;
      height: 120px;
    }
    .right::-webkit-scrollbar {
      display: none;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
    }
    > .right {
      // margin-left: 15px;
      // width: calc(100% - 185px);
      overflow-x: auto;
      height: 120px;
      display: flex;
      .div-box {
        width: 168px;
        height: 120px;
        margin-right: 15px;
        flex-shrink: 0;
        display: flex;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      > img {
        width: 168px;
        height: 120px;
      }
      .first-img {
        margin-right: 15px;
      }
    }
  }
}
</style>
