<template>
  <div class="ggvertising">
    <div class="gg-left" @click="jump(ggLfList)">
      {{ ggLfList[0] }}
      <img
        :src="`${
          ggLfList && ggLfList.materialUrl
        }?x-oss-process=image/resize,m_fill,w_335,h_290,limit_0`"
      />
    </div>
    <div class="gg-right">
      <div
        v-for="(item, index) in ggRgList"
        :key="index"
        class="img-box"
        @click="jump(item)"
      >
        <img
          :src="`${
            item && item.materialUrl
          }?x-oss-process=image/resize,m_fill,w_335,h_140,limit_0`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import jump from '@/mixins/jump'
export default {
  name: 'Advertising',
  mixins: [jump],
  props: {
    ggLfList: {
      type: Object,
      default: () => {
        return {
          materialUrl:
            'https://cdn.shupian.cn/sp-pt/wap/images/9udwvesumfc0000.png',
          url: '',
        }
      },
    }, // 广告位左边
    ggRgList: {
      type: Array,
      default: () => {
        return [
          {
            materialUrl:
              'https://cdn.shupian.cn/sp-pt/wap/images/eticlknp5bk0000.png',
            url: '',
          },
          {
            materialUrl:
              'https://cdn.shupian.cn/sp-pt/wap/images/4jv9alrd3j40000.png',
            url: '',
          },
        ]
      },
    }, // 广告位右边
  },
}
</script>
<style lang="less" scoped>
.ggvertising {
  padding: 0 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  > div {
    flex: 1;
    height: 290px;
  }
  .gg-left {
    margin-right: 10px;
    border-radius: 24px;
    > img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 24px;
    }
  }
  .gg-right {
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
