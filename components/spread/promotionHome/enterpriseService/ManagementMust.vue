<template>
  <div class="management-must">
    <div class="content-box">
      <div class="title-box">
        <div class="title">经营必备</div>
        <div class="more" @click="jump('more')">
          <div>更多</div>
          <my-icon name="list_ic_next" size="0.14rem" color="#999"></my-icon>
        </div>
      </div>
      <div class="content">
        <div class="top-box">
          <div
            v-for="(item, index) in topList"
            :key="index"
            class="img-box"
            @click="jump('top', index)"
          >
            <img
              :src="`${item.img}?x-oss-process=image/resize,m_fill,w_329,h_120,limit_0`"
              alt=""
            />
          </div>
        </div>
        <div class="bottom-box">
          <div
            v-for="(item, index) in bottomList"
            :key="index"
            class="img-box"
            @click="jump('bottom', index)"
          >
            <img
              :src="`${item.img}?x-oss-process=image/resize,m_fill,w_158,h_176,limit_0`"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topList: {
      type: Array,
      default: () => {
        return [
          {
            name: '公司注册',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/bbt895d2jts0000.png',
          },
          {
            name: '会计代理',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/9hznli6pxa80000.png',
          },
        ]
      },
    },
    bottomList: {
      type: Array,
      default: () => {
        return [
          {
            name: '办证',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/ephzcy1vqe00000.png',
          },
          {
            name: '银行开户',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/cpgxjqvbhag0000.png',
          },
          {
            name: '商标注册',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/5jrpauyb0dk0000.png',
          },
          {
            name: '旧账整理',
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/c82pe1vqxpc0000.png',
          },
        ]
      },
    },
  },
  methods: {
    jump(type, index) {
      if (type === 'more') {
        console.log('跳转更多')
      } else if (type === 'top') {
        console.log(index)
      } else if (type === 'bottom') {
        console.log(index)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.management-must {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  .content-box {
    width: 100%;
    background: #fff;
    border-radius: 24px;
    padding: 18px 20px 24px;
    .title-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        line-height: 45px;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #222222;
        font-weight: 700;
      }
      .more {
        display: flex;
        align-items: center;
        > div {
          margin-right: 9px;
          font-size: 22px;
          color: #999999;
          font-weight: 700;
        }
      }
    }
    .content {
      margin-top: 18px;
      width: 100%;
      .top-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .img-box {
          width: 329px;
          height: 120px;
          display: flex;
          border-radius: 12px;
          > img {
            width: 100%;
            border-radius: 12px;
          }
        }
      }
      .bottom-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;
        .img-box {
          width: 158px;
          height: 176px;
          border-radius: 12px;
          display: flex;
          > img {
            width: 100%;
            border-radius: 12px;
          }
        }
      }
    }
  }
}
</style>
