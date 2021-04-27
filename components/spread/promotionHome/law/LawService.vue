<template>
  <div class="law-service">
    <div class="law-service-box">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/5xnf0i8uc6o0000.png"
        alt=""
      />
      <div class="service-content">
        <div class="content-left">
          <span class="content-left-service-name">案件智能报价</span>
          <span class="content-left-service-describe"
            >免费评估法律服务费用</span
          >
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/5pqljvdrtt00000.png"
            alt=""
          />
        </div>
        <div class="content-right">
          <div
            v-for="item in serviceList"
            :key="item.code"
            class="content-right-content"
          >
            <div>
              <span class="content-right-service-name">{{ item.name }}</span>
              <span class="content-right-service-describe">{{
                item.describe
              }}</span>
            </div>
            <img :src="item.img" alt="" />
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
      serviceList: [
        {
          code: 1,
          name: '律师问答',
          describe: '专业律师解惑',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/cd8afnxx8tc0000.png',
        },
        {
          code: 2,
          name: '法律知识',
          describe: '海量法律知识',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9wlu4uz3qv40000.png',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.law-service {
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  .law-service-box {
    width: 100%;
    height: 391px;
    padding: 24px 20px 29px;
    background: #ffffff;
    border-radius: 24px;
    > img {
      display: block;
      width: 128px;
      height: 32px;
    }
    .service-content {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .content-left {
        width: 325px;
        height: 282px;
        background: #f4f4f4;
        border-radius: 8px;
        padding: 35px 0 0 30px;
        .content-left-service-name {
          display: block;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 42px;
        }
        .content-left-service-describe {
          display: block;
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #999999;
          line-height: 24px;
          margin-top: 7px;
        }
        > img {
          display: block;
          width: 218px;
          height: 82px;
          margin-top: 39px;
        }
      }
      .content-right {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 282px;
        .content-right-content {
          width: 325px;
          height: 131px;
          background: #f4f4f4;
          border-radius: 8px;
          padding: 29px 26px 28px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          > div {
            > span {
              display: block;
            }
            .content-right-service-name {
              font-size: 30px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #222222;
              line-height: 42px;
            }
            .content-right-service-describe {
              font-size: 22px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: #999999;
              line-height: 24px;
              margin-top: 6px;
            }
          }
          > img {
            width: 76px;
            height: 76px;
          }
        }
      }
    }
  }
}
</style>
