<template>
  <div class="borrowing">
    <div class="borrowing-box">
      <div class="content">
        <div class="title">我要借款<span>(最高可借)</span></div>
        <div class="num">1,000,000</div>
        <div class="slogan">一千元日息低至0.8厘 快至1天到账</div>
        <div class="btn" @click="freeBtn">免费领取额度</div>
        <div class="labels-box">
          <div v-for="(item, index) in labels" :key="index" class="label">
            <img
              :src="`${item.icon}?x-oss-process=image/resize,m_fill,w_24,h_24,limit_0`"
              alt=""
            />
            <div class="label-tltie">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labels: [
        {
          title: '1对1服务',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/a5dl6u6sg4s0000.png',
        },
        {
          title: '合法合规',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/28kn68lxmskk000.png',
        },
        {
          title: '快速放款',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/aj7tdc4ysow0000.png',
        },
      ],
    }
  },
  methods: {
    freeBtn() {
      console.log(11)
      this.$emit('freeBtn')
    },
  },
}
</script>

<style lang="less" scoped>
.borrowing {
  height: 445px;
  padding: 0 20px;
  margin-bottom: 20px;
  margin-top: -90px;
  .borrowing-box {
    width: 100%;
    height: 100%;
    padding: 4px;
    background: #ffffff;
    border-radius: 24px;
    .content {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(180deg, #ffffff 56%, #f5f7ff 100%);
      border-radius: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 40px 61px 33px;
      .title {
        font-size: 26px;
        color: #222222;
        line-height: 24px;
        > span {
          color: #999999;
        }
      }
      .num {
        font-family: Bebas;
        font-size: 64px;
        color: #4974f5;
        line-height: 64px;
        margin-top: 24px;
      }
      .slogan {
        font-size: 26px;
        color: #999999;
        margin-top: 24px;
      }
      .btn {
        margin-top: 48px;
        width: 580px;
        height: 96px;
        background: #4974f5;
        border-radius: 8px;
        color: #ffffff;
        text-align: center;
        line-height: 96px;
        font-size: 32px;
        font-weight: 700;
      }
      .labels-box {
        width: 100%;
        margin-top: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
          display: flex;
          align-items: center;
          > img {
            width: 24px;
            height: 24px;
          }
          .label-tltie {
            font-size: 24px;
            color: #222222;
            line-height: 24px;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
