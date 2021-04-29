<template>
  <div class="advertising">
    <a
      v-for="(item, index) in advertising"
      :key="index"
      v-md-map
      v-md:webClick
      :data-name="`商标交易聚合页_${item.name}`"
      href="javascript:;"
      @click="
        () => {
          $parent.jumpLink(item.url)
        }
      "
    >
      <img :src="item.img" alt="" />
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      advertising: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/c8w39clg7go0000.jpg',
          url: '',
          name: '授权商标',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/e5vqunicu000000.jpg',
          url: '',
          name: '热销商标',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.advertising {
  width: 100%;
  padding: 0 40px;
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a {
    display: block;
    width: 327px;
    height: 124px;
    border: 1px solid rgba(205, 205, 205, 0.5);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    position: relative;
    > img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
}
</style>
