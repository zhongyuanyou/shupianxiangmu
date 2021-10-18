<template>
  <div class="ceramics">
    <div class="ceramics-top">
      <div v-for="(item, idx) in topList" :key="idx">
        <img :src="item" alt="" @click="jump(i)" />
      </div>
    </div>
    <div class="ceramics-bottom">
      <div v-for="(item, idx) in bottomList" :key="idx">
        <img :src="item" alt="" @click="jump(i)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ceramics',
  props: {
    topList: {
      type: Array,
      default: () => {
        return [
          'https://cdn.shupian.cn/sp-pt/wap/images/f5b38wxl1co0000.png',
          'https://cdn.shupian.cn/sp-pt/wap/images/eklp4yrcny00000.png',
        ]
      },
    },
    bottomList: {
      type: Array,
      default: () => {
        return [
          'https://cdn.shupian.cn/sp-pt/wap/images/69glyp93bbs0000.png',
          'https://cdn.shupian.cn/sp-pt/wap/images/3132xq34xuq0000.png',
          'https://cdn.shupian.cn/sp-pt/wap/images/19i1cfsiqh5s000.png',
          'https://cdn.shupian.cn/sp-pt/wap/images/3mr6ubl9wb40000.png',
        ]
      },
    },
  },
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
      margin-right: 15px;
      flex-shrink: 0;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
    }
  }
}
</style>
