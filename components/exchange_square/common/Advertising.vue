<template>
  <div class="advertising">
    <div class="ad-left" @click="jump(adLfList)">
      <img
        :src="`${adLfList.img}?x-oss-process=image/resize,m_fill,w_335,h_290,limit_0`"
        alt=""
      />
    </div>
    <div class="ad-right">
      <div v-for="(item, index) in adRgList" :key="index" class="img-box">
        <img
          :src="`${item.img}?x-oss-process=image/resize,m_fill,w_335,h_140,limit_0`"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Advertising',
  props: {
    adLfList: {
      type: Object,
      default: () => {
        return {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9udwvesumfc0000.png',
          url: '',
        }
      },
    }, // 广告位左边
    adRgList: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/eticlknp5bk0000.png',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/4jv9alrd3j40000.png',
            url: '',
          },
        ]
      },
    }, // 广告位右边
  },
}
</script>
<style lang="less" scoped>
.advertising {
  margin-bottom: 34px;
  padding: 0 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  > div {
    flex: 1;
    height: 290px;
  }
  .ad-left {
    margin-right: 10px;
    border-radius: 24px;
    > img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 24px;
    }
  }
  .ad-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
      width: 100%;
      height: 140px;
      border-radius: 24px;
      > img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 24px;
      }
    }
    > div:first-child {
      margin-bottom: 10px;
    }
  }
}
</style>
