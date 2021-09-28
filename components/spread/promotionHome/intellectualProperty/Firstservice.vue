<template>
  <div class="advertising">
    <div
      v-for="(item, pro) of imgContent"
      :key="pro"
      class="advertising-list"
      @click="onMore(item.url)"
    >
      <img :src="item.bgImg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Firstservice',
  props: {
    imgContent: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    onMore(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.advertising {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .advertising-list {
    margin-left: 13px;
    height: 120px;
    display: flex;
  }
  .advertising-list:first-child {
    margin-left: 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
