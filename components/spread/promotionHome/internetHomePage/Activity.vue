<template>
  <div class="advertising">
    <div class="advertising-box">
      <div
        v-for="(item, index) in adList"
        :key="index"
        class="ad-msg"
        @click="jumpLink(item.url)"
      >
        <div class="title-box">
          <div class="title">{{ item.title }}</div>
          <!-- <div v-if="item.tag !== ''" class="live-label">
            <span class="living-icon">
              <span class="living-bar living-bar1"></span>
              <span class="living-bar living-bar2"></span>
              <span class="living-bar living-bar3"></span>
            </span>
            {{ item.tag }}
          </div>
          <div
            class="tags"
            :style="{
              color: item.tag === '千万补贴' ? '#EC5330' : '',
              borderColor: item.tag === '千万补贴' ? '#EC5330' : '',
            }"
          >
            {{ item.tag }}
          </div> -->
        </div>
        <div class="slogan">{{ item.slogan }}</div>
        <div class="img-box">
          <img
            :src="`${item.img}?x-oss-process=image/resize,m_fill,w_315,h_162,limit_0`"
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
    jumpLink(url) {
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.advertising {
  padding: 0 20px;
  margin: 20px 0;
  .advertising-box {
    width: 100%;
    // background: #ffffff;

    display: flex;
    justify-content: space-between;

    .ad-msg {
      width: 347px;
      //   height: 300px;
      border-radius: 24px;
      background: #ffffff;
      .title-box {
        display: flex;
        align-items: center;
        .title {
          font-size: 32px;
          color: #222222;
          font-weight: 700;
          line-height: 32px;
        }
        .live-label {
          border-radius: 4px;
          border: 1px solid #ec5330;
          margin-left: 12px;
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #ec5330;
          height: 32px;
          line-height: 32px;
          display: flex;
          padding: 0px 6px;
          margin-bottom: 6px;
          // 直播动态图标
          .living-icon {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            width: 16px;
            height: 16px;
            margin-right: 4px;
            margin-top: 6px;
            .living-bar {
              padding: 0 1px;
              background-color: #ec5330;
              animation-name: living-bar;
              animation-duration: 0.5s;
              animation-iteration-count: infinite;
              animation-direction: alternate-reverse;
              animation-timing-function: linear;
            }
            .living-bar1 {
              animation-delay: 0.2s;
            }
            .living-bar2 {
              animation-delay: 0s;
            }
            .living-bar3 {
              animation-delay: 0.4s;
            }
            @keyframes living-bar {
              from {
                height: 16px;
              }
              to {
                height: 6px;
              }
            }
          }
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
        margin-top: 8px;
      }
      .img-box {
        width: 315px;
        height: 162px;
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
      padding: 24px 11px 24px 21px;
    }
    > div:nth-child(2) {
      padding: 24px 20px 24px 12px;
    }
  }
}
</style>
