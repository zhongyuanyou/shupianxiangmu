<template>
  <div>
    <div class="my-component">
      <div class="content">
        <div
          v-for="(item, index) in data"
          :key="index"
          v-md-map
          v-md:webClick
          :data-name="item.md.name"
          class="item"
          :style="{
            backgroundImage: `url(${item.img})`,
          }"
          @click="jumpLink(item.url)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ADList',
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/aay11bxjq4c0000.png',
          url: '',
          md: {
            name: '资质交易聚合页_优质资质',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ftnq9knapiw0000.png',
          url: '',
          md: {
            name: '资质交易聚合页_热销资质',
          },
        },
      ],
    }
  },
  methods: {
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(@spread-page-width - 80px);
  margin: 0 auto;
  .content {
    display: flex;
    justify-content: space-between;
    .item {
      flex: none;
      background-repeat: no-repeat;
      background-size: cover;
      width: 327px;
      height: 124px;

      border: 1px solid rgba(205, 205, 205, 0.4);
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
    }
  }
}
</style>
