<template>
  <div class="advertising">
    <div class="advertising-box">
      <div
        v-for="(item, index) in adList"
        :key="index"
        class="ad-msg"
        @click="jump(item.url)"
      >
        <div class="title-box">
          <div class="title">{{ item.title }}</div>
          <div
            class="tags"
            :style="{
              color: item.tag === '千万补贴' ? '#EC5330' : '',
              borderColor: item.tag === '千万补贴' ? '#EC5330' : '',
            }"
          >
            {{ item.tag }}
          </div>
        </div>
        <div class="slogan">{{ item.slogan }}</div>
        <div class="img-box">
          <img
            :src="`${item.img}?x-oss-process=image/resize,m_fill,w_306,h_172,limit_0`"
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
    adList: {
      type: Array,
      default: () => {
        return [
          {
            title: '点我咨询',
            tag: '先服务后收费',
            slogan: '一键咨询全贷款业务',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/8xzm21gxr8k0000.png',
            url: '',
          },
          {
            title: '助贷必懂',
            tag: '热点资讯',
            slogan: '贷款知识加油站',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/4vqdvc4tw0e0000.png',
            url: '',
          },
          {
            title: '爆款专区',
            tag: '口碑推荐',
            slogan: '爆款产品 享惊喜折扣',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/66h7zz7f8hc0000.png',
            url: '',
          },
          {
            title: '新人福利',
            tag: '千万补贴',
            slogan: '福利大派送，免费领取',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/aywnvfm67gg0000.png',
            url: '',
          },
        ]
      },
    },
  },
  methods: {
    jump(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.advertising {
  padding: 0 20px;
  margin-bottom: 20px;
  .advertising-box {
    width: 100%;
    background: #ffffff;
    border-radius: 24px;
    display: flex;
    flex-wrap: wrap;
    .ad-msg {
      width: 355px;
      height: 308px;
      .title-box {
        display: flex;
        align-items: center;
        .title {
          font-size: 32px;
          color: #222222;
          font-weight: 700;
          line-height: 32px;
        }
        .tags {
          height: 32px;
          border: 1px solid #4974f5;
          border-radius: 4px;
          padding: 6px 8px;
          margin-left: 8px;
          font-size: 20px;
          color: #4974f5;
          line-height: 20px;
        }
      }
      .slogan {
        font-size: 26px;
        color: #999999;
        margin-top: 16px;
      }
      .img-box {
        width: 306px;
        height: 172px;
        border-radius: 12px;
        margin-top: 16px;
        > img {
          display: block;
          height: 100%;
          width: 100%;
          border-radius: 12px;
        }
      }
    }
    > div:first-child {
      border-right: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
    }
    > div:nth-child(2) {
      border-bottom: 1px solid #f5f5f5;
    }
    > div:nth-child(3) {
      border-right: 1px solid #f5f5f5;
    }
    > div:nth-child(odd) {
      padding: 20px 29px 22px 20px;
    }
    > div:nth-child(even) {
      padding: 20px 20px 22px 29px;
    }
  }
}
</style>
