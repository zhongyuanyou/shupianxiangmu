<template>
  <div class="activity">
    <div class="content">
      <div
        v-for="(item, index) in activityList"
        :key="index"
        class="msg"
        @click="jump(item.url)"
      >
        <img :src="item.img" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activityList: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/fm1n5pmto6g0000.png',
            title: '活动专区',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/f5qc57urq2w0000.png',
            title: '资质专区',
            url: '',
          },
        ]
      },
    },
  },
  methods: {
    jump(url) {
      if (url.indexOf('http') !== -1) {
        window.location.href = url
      }
    },
  },
}
</script>

<style lang="less" scoped>
.activity {
  width: 100%;
  height: 300px;
  padding: 0 20px;
  margin-top: 20px;
  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .msg {
      width: 347px;
      height: 300px;
      background: #ffffff;
      border-radius: 24px;
      display: flex;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 24px;
      }
    }
  }
}
</style>
