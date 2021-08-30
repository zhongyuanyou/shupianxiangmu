<template>
  <div>
    <div class="my-component">
      <div v-for="(item, index) in list" :key="index" class="item">
        <div class="item-wrap-img">
          <img class="item-img" :src="item.img" />
        </div>
        <p class="item-title">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tools',
  data() {
    return {}
  },
  computed: {
    list() {
      return this.$parent.toolList
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  background: #ffffff;
  border-radius: 24px;
  margin: 0px 20px;
  padding: 40px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .item-wrap-img {
      width: 52px;
      height: 52px;
      margin-bottom: 16px;
      .item-img {
        width: 52px;
        height: 52px;
        display: flex;
      }
    }

    .item-title {
      font-size: 24px;
      //   font-weight: bold;
      color: #222222;
    }
  }
}
</style>
