<template>
  <div class="choose">
    <span class="title"> 银行服务专业办理平台 </span>
    <div class="contrast">
      <div class="other-platform">其他平台代办</div>
      <div class="our-platform">顶呱呱代办</div>
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/fjjbe12kw680000.png"
        alt=""
      />
    </div>
    <div class="content">
      <div class="contentleft">
        <ul>
          <li v-for="(item, index) in oneself" :key="index">
            <span>{{ item }}</span>
            <div class="contentright-dian"></div>
          </li>
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/dun26d2e9y80000.png"
            alt=""
          />
        </ul>
      </div>
      <div class="contentright">
        <ul>
          <li v-for="(item, index) in agent" :key="index">
            <div class="contentright-dian">
              <div></div>
            </div>
            <span>{{ item }}</span>
          </li>
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/9ufskcum58o0000.png"
            alt=""
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oneself: [
        '低价吸引\n实则有隐形收费',
        '工作人员少\n无品牌可言',
        '服务过程不可控',
        '收费后容易跑路',
      ],
      agent: [
        '价格透明\n无任何隐形收费',
        '1V1专业顾问，提供\n免费增值咨询服务',
        '业务细节平台可查\n流程透明',
        '售后无忧，急速退款',
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.choose {
  width: 100%;
  padding: 0 40px;
  margin-top: 63px;
  margin-bottom: 33px;
  .title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 39px;
  }
  .contrast {
    padding: 0 40px;
    position: relative;
    > img {
      display: block;
      width: 570px;
      height: 88px;
      margin: 0 auto;
      margin-top: 31px;
    }
    .other-platform {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #555555;
      line-height: 27px;
      position: absolute;
      top: 31px;
      left: 94px;
    }
    .our-platform {
      line-height: 27px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
      position: absolute;
      top: 31px;
      right: 124px;
    }
  }
  .content {
    display: flex;
    height: 377px;
    background: #ffffff;
    border-radius: 8px;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    > div {
      width: 327px;
      background: #f8f8f8;
      border-radius: 8px;
    }
    .contentleft {
      > ul {
        width: 100%;
        height: 100%;
        padding: 40px 32px 40px 70px;
        position: relative;
        > li {
          display: flex;
          justify-content: flex-end;
          font-size: 0;
          position: relative;
          z-index: 1;
          &:not(:first-child) {
            margin-top: 24px;
          }
          &:nth-child(4) {
            margin-top: 60px;
          }
          > span {
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            display: block;
            text-align: right;
            margin-right: 12px;
            line-height: 34px;
            margin-top: -6px;
            white-space: pre-wrap;
          }
          .contentright-dian {
            width: 24px;
            height: 24px;
            transform: scale(0.5);
            background: #cdcdcd;
            border-radius: 12px;
            margin-top: -3px;
          }
        }
        > img {
          width: 120px;
          height: 108px;
          position: absolute;
          right: 12px;
          bottom: 12px;
          z-index: 0;
        }
      }
    }
    .contentright {
      background: rgba(73, 116, 245, 0.06);
      > ul {
        width: 100%;
        height: 100%;
        padding: 40px 15px 40px 30px;
        position: relative;
        > li {
          font-size: 0;
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          &:not(:first-child) {
            margin-top: 24px;
          }
          > span {
            width: 100%;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #4974f5;
            display: block;
            line-height: 34px;
            margin-top: -6px;
            margin-left: 13px;
            flex: 1;
            position: relative;
            white-space: pre-wrap;
          }
          .contentright-dian {
            width: 24px;
            height: 24px;
            transform: scale(0.5);
            background: #92acf9;
            border-radius: 12px;
            margin-top: -3px;
          }
        }
        > img {
          width: 120px;
          height: 108px;
          position: absolute;
          right: 12px;
          bottom: 12px;
          z-index: 0;
        }
      }
    }
  }
}
</style>
