<template>
  <div class="register-ready">
    <h3>注册公司需要准备的工作</h3>
    <div class="message">
      <p><span>公司信息</span></p>
      <ul>
        <li><i></i><span>3-5个公司名称</span></li>
        <li><i></i><span>企业经营范围</span></li>
        <li><i></i><span>公司地址</span></li>
        <li><i></i><span>注册资金及比例</span></li>
      </ul>
    </div>
    <div class="message file">
      <p><span>文件材料</span></p>
      <ul>
        <li><i></i><span>法人，股东，董事身份证原件及复印件</span></li>
      </ul>
    </div>
    <div class="message site">
      <p><span>注册地址</span></p>
      <ul>
        <li><i></i><span>薯片APP可帮助获取合法地址</span></li>
      </ul>
    </div>
    <div class="superiority">
      <h3>平台优势</h3>
      <div class="superiority-item">
        <ul>
          <li v-for="(item, index) of image" :key="index">
            <sp-image width="35px" height="35px" fit="cover" :src="item.img" />
            <span class="list">
              <div>{{ item.title }}</div>
              <div>{{ item.content }}</div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Image, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Standard',
  components: {
    [Image.name]: Image,
    [Toast.name]: Toast,
  },
  data() {
    return {
      image: [
        {
          title: '大品牌',
          content: '覆盖全国14个城市',
          img: 'https://cdn.shupian.cn/sp-pt/wap/a2nf8wfz7wk0000.png',
        },
        {
          title: '更专业',
          content: '30万+专业规划师',
          img: 'https://cdn.shupian.cn/sp-pt/wap/2nn1kdoblmw0000.png',
        },
        {
          title: '更省时',
          content: '2小时内响应',
          img: 'https://cdn.shupian.cn/sp-pt/wap/fh0eavpg2lc0000.png',
        },
        {
          title: '零风险',
          content: '急速售后 急速退款',
          img: 'https://cdn.shupian.cn/sp-pt/wap/8czcet6qcj40000.png',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.register-ready {
  font-size: 28px;
  padding: 32px 42px 0 40px;
  h3 {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    height: 40px;
    line-height: 40px;
    margin-bottom: 32px;
  }
  .message {
    margin-bottom: 24px;
    p {
      width: 669px;
      height: 80px;
      margin: 0 auto;
      background: url(https://cdn.shupian.cn/sp-pt/wap/5s8vuoqf6r80000.png)
        no-repeat;
      background-size: contain;
      span {
        line-height: 80px;
        margin-left: 120px;
        font-size: 28px;
        font-weight: bold;
        color: #1db9b7;
      }
    }
    ul {
      background: rgba(244, 252, 252, 0.3);
      font-size: 50px;
      color: #555555;
      li {
        float: left;
        width: 50%;
        height: 88px;
        line-height: 90px;
        padding: 0 32px;
        i {
          width: 12px;
          height: 12px;
          display: inline-block;
          background: #48c5c5;
          opacity: 0.5;
          margin-right: 18px;
          margin-bottom: 3px;
          border-radius: 50%;
        }
        span {
          margin-left: -4px;
          font-size: 28px;
          color: #555555;
        }
      }
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }
  .file {
    padding: 8px 0px;
    p {
      background: url(https://cdn.shupian.cn/sp-pt/wap/4jt8fmvm9zw0000.png)
        no-repeat;
      background-size: contain;
      span {
        color: #fca154;
      }
    }
    ul {
      li {
        width: 100%;
        background: rgba(255, 250, 245, 0.4);
        i {
          background: #fea252;
        }
      }
    }
  }
  .site {
    p {
      background: url(https://cdn.shupian.cn/sp-pt/wap/eeezqprbugg0000.png)
        no-repeat;
      background-size: contain;
      span {
        color: #9073e4;
      }
    }
    ul {
      li {
        width: 100%;
        background: rgba(248, 246, 253, 0.4);
        i {
          background: #9273e3;
        }
      }
    }
  }
  .superiority {
    margin-bottom: 32px;
    h3 {
      margin-top: 64px;
    }
    .superiority-item {
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 323px;
          height: 118px;
          line-height: 118px;
          background: #ffffff;
          border: 1px solid rgba(205, 205, 205, 0.5);
          border-radius: 8px;
          margin-bottom: 24px;
          position: relative;
          ::v-deep.sp-image {
            vertical-align: middle;
            margin: 0 0 0 24px;
            .sp-image__img {
              border-radius: 8px;
            }
          }
          .list {
            display: flex !important;
            width: 206px;
            // margin-right: 20px;
            flex-direction: column;
            height: 118px;
            flex-wrap: wrap-reverse;
            position: absolute;
            top: 0px;
            right: 0px;
            > div {
              font-size: 30px;
              font-weight: bold;
              color: #222222;
              line-height: 73px;
              height: 58px;
              white-space: nowrap;
            }
            div:last-child {
              line-height: 36px;
              height: 36px;
              font-size: 24px;
              font-weight: 400;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>
