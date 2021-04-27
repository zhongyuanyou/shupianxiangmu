<template>
  <div class="recommend-law">
    <div class="recommend-law-box">
      <sp-tabs
        v-model="active"
        title-inactive-color="#999999"
        title-active-color="#222222"
      >
        <sp-tab
          v-for="item in recommendLawNav"
          :key="item.code"
          :title="item.title"
        >
          <div class="law-list-box">
            <ul>
              <li v-for="law in recommendList" :key="law.code">
                <div class="name-box">
                  <span class="name">{{ law.name }}</span>
                  <span class="law-position">{{ law.position }}</span>
                </div>
                <div class="label-box">
                  <span>专攻：{{ law.label }}</span>
                </div>
                <div class="head-box">
                  <div class="head-img"><img :src="law.headImg" alt="" /></div>
                  <div class="btn" @click="btn">立即咨询</div>
                </div>
              </li>
            </ul>
          </div>
        </sp-tab>
      </sp-tabs>
      <a href="JavaScript:;" class="more-law">更多此擅长领域律师</a>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from '@chipspc/vant-dgg'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  props: {
    recommendList: {
      type: Array,
      default: () => {
        return []
      },
    },
    recommendLawNav: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      active: '',
    }
  },
  methods: {
    btn() {
      console.log(111)
    },
  },
}
</script>

<style lang="less" scoped>
.recommend-law {
  width: 100%;
  padding: 0 20px;
  margin-top: 35px;
  ::v-deep.sp-tab--active {
    font-size: 32px;
    line-height: 38px;
  }
  .recommend-law-box {
    width: 100%;
    height: 691px;
    background: #ffffff;
    border-radius: 24px;
    padding: 0px 20px 24px;
    ::v-deep.sp-tabs__nav {
      width: 670px;
      margin: 0 auto;
    }

    ::v-deep.sp-tab__text {
      font-size: 26px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      line-height: 40px;
      font-size: inherit !important;
    }
    ::v-deep.sp-tab {
      justify-content: flex-start;
      -webkit-justify-content: flex-start;
    }
    ::v-deep.sp-tabs__line {
      width: 60px;
      height: 12px;
      background-color: transparent;
      background-image: linear-gradient(to right, #4974f5, transparent);
      top: 50px;
      left: 20px;
    }
    .law-list-box {
      width: 100%;
      > ul {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        > li:nth-child(2) ~ li {
          margin-top: 20px;
        }
        > li {
          width: 325px;
          height: 229px;
          background: #f4f4f4;
          border-radius: 12px;
          padding: 30px 20px;
          .name-box {
            display: flex;
            align-items: center;
            > span {
              display: block;
            }
            .name {
              font-size: 30px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #222222;
              line-height: 42px;
            }
            .law-position {
              font-size: 25px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: #666666;
              line-height: 42px;
              margin-left: 10px;
            }
          }
          .label-box {
            display: flex;
            align-items: center;
            margin-top: 11px;
            > span {
              display: block;
              font-size: 22px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: #999999;
              line-height: 30px;
            }
          }
          .head-box {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .head-img {
              width: 64px;
              height: 64px;
              border-radius: 100%;
              background: linear-gradient(
                180deg,
                #46494d 0%,
                #797d83 0%,
                #414347 100%
              );
              display: flex;
              > img {
                width: 100%;
              }
            }
            .btn {
              width: 120px;
              height: 45px;
              background: #547cf8;
              border-radius: 4px;
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #ffffff;
              line-height: 48px;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .more-law {
    display: block;
    width: 670px;
    height: 89px;
    background: rgba(73, 116, 245, 0.08);
    border-radius: 8px;
    margin-top: 20px;
    text-align: center;
    font-size: 30px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: bold;
    color: #4974f5;
    line-height: 89px;
  }
}
</style>
