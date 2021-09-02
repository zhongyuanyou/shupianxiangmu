<template>
  <div class="activity-zone">
    <div class="activity-box">
      <div
        v-for="(item, index) in activityList"
        :key="index"
        class="img-box"
        @click="jump(item.url)"
      >
        <img
          :src="`${item.img}?x-oss-process=image/resize,m_fill,w_142,h_176,limit_0`"
          alt=""
          srcset=""
        />
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
            title: '千万补贴',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/a6tjd4ebt3c0000.png',
          },
          {
            title: '99特卖',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/3juppfioq9k0000.png',
          },
          {
            title: '领券中心',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/ez8xrfjxie00000.png',
          },
          {
            title: '客户评价',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/2ka6fqimt5c0000.png',
          },
          {
            title: '域名检索',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/8j7ec4nsq6o0000.png',
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
.activity-zone {
  width: 100%;
  padding: 0 20px;
  height: 176px;
  margin-top: 20px;
  margin-bottom: 20px;
  .activity-box {
    width: 100%;
    border-radius: 24px;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    .img-box {
      width: 142px;
      height: 176px;
      > img {
        width: 142px;
        height: 176px;
      }
    }
  }
}
</style>
