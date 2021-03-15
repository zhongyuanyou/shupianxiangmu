<template>
  <div class="lawyer-live">
    <div class="lawyer-live-top">
      <span class="title"
        >新人专属礼
        <span class="state">
          <span class="living-icon">
            <span class="living-bar living-bar1"></span>
            <span class="living-bar living-bar2"></span>
            <span class="living-bar living-bar3"></span>
          </span>
          直播中
        </span>
      </span>
      <a class="more" href="javascript:;">
        <span
          v-md-map
          v-md:webClick
          data-name="工商注册_服务介绍_展开更多"
          @click="onMore('')"
          >更多
          <my-icon name="list_ic_next" size="0.08rem"></my-icon>
        </span>
      </a>
    </div>
    <div class="live">
      <div
        v-for="(item, liveKey) of lawyerLive"
        v-show="liveKey < 8"
        :key="liveKey"
        class="live-content"
        @click="onMore('')"
      >
        <div class="bgimg">
          <img class="imge" :src="item.bgImg" alt="" />
          <!-- 显示标签类型 -->
          <label v-if="liveKey === 0 ? true : false" class="label">
            <span class="living-icon">
              <span class="living-bar living-bar1"></span>
              <span class="living-bar living-bar2"></span>
              <span class="living-bar living-bar3"></span>
            </span>
            直播中
          </label>
          <!-- 除了第一个显示 -->
          <div v-else class="foreshow">
            <span>预告</span>
            <span>明天19:00</span>
          </div>
          <div class="information">
            <div class="information-img">
              <img :src="item.img" alt="" />
            </div>
            <div class="content">
              <div class="content-name">{{ item.name }}</div>
              <div class="content-info">{{ item.info }}</div>
            </div>
          </div>
        </div>
        <div class="introduce">{{ item.introduce }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from '@chipspc/vant-dgg'
export default {
  name: 'LawyerLive',
  props: {
    lawyerLive: {
      type: Array,
      default: () => {
        return [
          {
            code: 1,
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/202n6vub74jk000.png',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/b5fhtb9i43k0000.png',
            url: '',
            name: '杜小雪',
            info: '顶律网首席律师',
            introduce: '专家律师直播讲解刑事辩护、交通',
          },
          {
            code: 1,
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/bwrbr63moio0000.png',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/a4bf74ekxzc000.png',
            url: '',
            name: '杜小雪',
            info: '顶律网首席律师',
            introduce: '专家律师直播讲解刑事辩护、交通',
          },
          {
            code: 1,
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/202n6vub74jk000.png',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/b5fhtb9i43k0000.png',
            url: '',
            name: '杜小雪',
            info: '顶律网首席律师',
            introduce: '专家律师直播讲解刑事辩护、交通',
          },
          {
            code: 1,
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/bwrbr63moio0000.png',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/a4bf74ekxzc000.png',
            url: '',
            name: '杜小雪',
            info: '顶律网首席律师',
            introduce: '专家律师直播讲解刑事辩护、交通',
          },
        ]
      },
    },
  },
  methods: {
    onMore(url) {
      if (url !== '') {
        window.location.href = url
      } else {
        Toast('功能正在建设中，敬请期待')
        // this.$root.$emit(
        //   'openIMM',
        //   this.listCount[index].id,
        //   this.listCount[index].name,
        //   this.listCount[index].jobNum,
        //   this.listCount[index].imgSrc
        // )
      }
    },
  },
}
</script>

<style lang="less">
.lawyer-live {
  width: 710px;
  height: 542px;
  background: #ffffff;
  border-radius: 24px;
  margin: 20px 20px 0 20px;
  padding: 0 0 15px 20px;
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 95px;
    padding: 0 20px 0 0px;
    .title {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 32px;
      display: flex;
      align-items: center;
      .state {
        display: flex;
        align-items: center;
        // display: inline-block;
        border-radius: 4px;
        border: 1px solid #ec5330;
        margin-left: 8px;
        font-size: 20px;
        font-weight: bold;
        color: #ec5330;
        line-height: 20px;
        text-align: center;
        padding: 6px 8px;
        // 直播动态图标
        .living-icon {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 16px;
          height: 16px;
          margin-right: 4px;
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
    }
    // 标题更多
    .more {
      font-size: 22px;
      font-weight: bold;
      color: #999999;
      line-height: 22px;
      display: flex;
      align-items: center;
    }
  }
  .live {
    display: flex;
    flex-wrap: nowrap;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      display: none;
    }
    &-content {
      margin-right: 20px;
      .bgimg {
        width: 300px;
        height: 340px;
        background: linear-gradient(
            180deg,
            #e3e4ea 0%,
            #f6f7fd 34%,
            #ecedf2 60%,
            #e3e4ea 100%
          )
          no-repeat;
        background-size: 100%;
        border-radius: 12px;
        position: relative;
        > .imge {
          width: 300px;
          height: 340px;
        }
        // 第一个显示的标签
        .label {
          top: 16px;
          left: 20px;
          position: absolute;
          display: flex;
          align-items: center;
          border-radius: 4px;
          // border: 1px solid #ec5330;
          font-size: 20px;
          font-weight: bold;
          // color: #ec5330;
          background-color: #ec5330;
          color: #ffffff;
          line-height: 20px;
          text-align: center;
          padding: 6px 8px;

          // 直播动态图标
          .living-icon {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: 16px;
            height: 16px;
            margin-right: 4px;
            .living-bar {
              padding: 0 1px;
              // background-color: #ec5330;
              background-color: #ffffff;
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
        // 除第一个显示的标签
        .foreshow {
          width: 210px;
          font-size: 1px;
          display: flex;
          position: absolute;
          top: 20px;
          left: 20px;
          display: inline-block;
          //   line-height: 36px;
          span:first-child {
            width: 56px;
            background: #4974f5;
            border-radius: 4px 0 0 4px;
            height: 20px;
            font-size: 20px;
            font-weight: bold;
            color: #ffffff;
            padding: 6px 8px;
          }
          span:last-child {
            background: #696e7e;
            font-size: 20px;
            border-radius: 0 4px 4px 0;
            font-weight: 400;
            color: #ffffff;
            padding: 6px 8px;
            margin-left: -9px;
          }
        }
        // 头像资料信息
        .information {
          width: 300px;
          height: 150px;
          position: absolute;
          bottom: 0px;
          display: flex;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(0, 0, 0, 0.6) 100%
          );
          padding-top: 72px;
          padding-left: 17px;
          &-img {
            width: 60px;
            height: 60px;
            line-height: 60px;
            margin-right: 12px;
            display: flex;
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
          }
          .content {
            display: flex;
            flex-direction: column;
            &-name {
              font-size: 24px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #ffffff;
              height: 33px;
              line-height: 33px;
            }
            &-info {
              font-size: 20px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: #ffffff;
              height: 24px;
              line-height: 24px;
            }
          }
        }
      }
      .introduce {
        width: 299px;
        height: 72px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 36px;
        margin-top: 20px;
      }
    }
    &-content:last-child {
      padding-right: 20px;
    }
  }
}
</style>
