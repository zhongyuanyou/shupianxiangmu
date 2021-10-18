<template>
  <div class="ceramics">
    <div class="ceramics-top">
      <div v-for="i in 2" :key="i">
        <img src="" alt="" @click="jump(i)" />
      </div>
    </div>
    <div class="ceramics-bottom">
      <div v-for="i in 4" :key="i">
        <img src="" alt="" @click="jump(i)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ceramics',
  methods: {
    jump(i) {
      console.log(i)
    },
  },
}
</script>

<style lang="less" scoped>
.ceramics {
  margin-bottom: 40px;
  .ceramics-top {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    > div {
      flex-shrink: 0;
      width: 350px;
      height: 140px;
      border-radius: 16px;
      background: #9cc0f4;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        display: block;
      }
    }
  }
  .ceramics-bottom::-webkit-scrollbar {
    display: none;
  }
  .ceramics-bottom {
    margin-top: 10px;
    width: 100%;
    padding: 0 0 0 20px;
    overflow-y: hidden;
    overflow-x: scroll;
    display: flex;
    align-items: center;
    > div {
      width: 208px;
      height: 150px;
      border-radius: 16px;
      background: #7eb0fa;
      margin-right: 15px;
      flex-shrink: 0;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
  }
}
</style>
