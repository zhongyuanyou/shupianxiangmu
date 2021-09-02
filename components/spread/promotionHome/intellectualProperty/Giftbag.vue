<template>
  <div class="gift-bag">
    <h1>知识产权新人大礼包</h1>
    <div class="box">
      <img v-if="list && list.length > 0" :src="list[0]" alt="" />
      <view class="right">
        <img
          v-for="(item, index) in list.slice(1, 50)"
          :key="index"
          :src="item"
          alt=""
        />
      </view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Giftbag',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
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
    > .right {
      margin-left: 15px;
      width: calc(100% - 185px);
      overflow-x: auto;
      height: 120px;
      display: flex;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      ::-webkit-scrollbar {
        display: none;
      }
      > img {
        width: 168px;
        height: 120px;
        margin-right: 15px;
        flex-shrink: 0;
      }
    }
  }
}
</style>
