<template>
  <div class="activity">
    <div class="activity-box">
      <div v-for="(item, index) in activityList" :key="index" class="contnet">
        <div class="title">{{ item.title }}</div>
        <div class="slogan">{{ item.slogan }}</div>
        <div class="img-box">
          <img
            :src="`${item.img}?x-oss-process=image/resize,m_fill,w_32,h_32,limit_0`"
            alt=""
          />
        </div>
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
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/a5mwe2wvym80000.png',
            url: '',
            slogan: '万款服务全补贴',
          },
          {
            title: '先服务后收费',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/8a1fy2mxstc0000.png',
            url: '',
            slogan: '平台担保放心购',
          },
          {
            title: '99元特卖',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/e88p7gezzcw0000.png',
            url: '',
            slogan: '特价享超值优惠',
          },
        ]
      },
    },
  },
}
</script>

<style lang="less" scoped>
.activity {
  margin-bottom: 20px;
  padding: 0 20px;
  .activity-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:nth-child(1) {
      border-radius: 24px 12px 12px 24px;
    }
    > div:nth-child(2) {
      border-radius: 12px;
    }

    > div:last-child {
      border-radius: 12px 24px 24px 12px;
    }
    .contnet {
      width: 230px;
      height: 128px;
      background: #ffffff;
      padding: 23px 20px;
      position: relative;
      overflow: hidden;
      .title {
        font-size: 26px;
        color: #222222;
        letter-spacing: 0;
        line-height: 26px;
        font-weight: 700;
      }
      .slogan {
        font-size: 22px;
        color: #999999;
        letter-spacing: 0;
        line-height: 26p;
        margin-top: 8px;
      }
      .img-box {
        width: 32px;
        height: 32px;
        position: absolute;
        right: 12px;
        bottom: 12px;
        > img {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
