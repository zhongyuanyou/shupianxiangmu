<template>
  <div class="select">
    <div class="select_title">
      <h2>为什么选择许可证代办</h2>
    </div>
    <div class="select-content">
      <div class="select-content-top">
        <div class="select-content-top-left">自己办理</div>
        <div class="select-content-top-right">专业代理</div>
      </div>
      <div class="select-content-bottom">
        <div class="select-content-bottom-box box-left">
          <ul>
            <li v-for="(item, i) of selectLeft" :key="i">
              {{ item }}
              <span class="box-placeholder">
                <span class="box-cirlce"></span>
              </span>
            </li>
          </ul>
        </div>
        <div class="select-content-bottom-box box-right">
          <ul>
            <li v-for="(item, i) of selectRight" :key="i">
              <span class="box-placeholder">
                <span class="box-cirlce"></span>
              </span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      selectRight: [
        '加急办理，快至当天取证',
        '熟悉各地政策流程，无纸化办理',
        '降低审核返工风险，通过率高达99.6%',
        '流程透明可查',
      ],
      selectLeft: [
        '4-6个月',
        '预约排队，准备材料',
        '审核不过反复修改',
        '不知道进行到哪个节点',
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.select {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  &_title {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 64px;
    > h2 {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      padding-bottom: 5px;
    }
  }
  &-content {
    width: 100%;
    height: 380px;
    margin-top: 29px;
    &-top {
      display: flex;
      width: 100%;
      height: 90px;
      border-radius: 8px;
      overflow: hidden;
      &-left {
        width: 50%;
        height: 90px;
        font-size: 28px;
        font-weight: bold;
        color: #555555;
        text-align: right;
        line-height: 90px;
        padding-right: 51px;
        background-image: url('https://cdn.shupian.cn/sp-pt/wap/23r8dvvvz39c000.png');
        background-size: contain;
      }
      &-right {
        width: 50%;
        height: 90px;
        font-size: 28px;
        font-weight: bold;
        color: #ffffff;
        padding-left: 51px;
        line-height: 90px;
        background-image: url('https://cdn.shupian.cn/sp-pt/wap/45ux1gcj8ko0000.png');
        background-size: contain;
      }
    }
    &-bottom {
      display: flex;
      width: 100%;
      height: 290px;
      &-box {
        width: 100%;
        height: 290px;
        font-size: 24px;
        font-weight: 400;
      }
      .box-left {
        width: 100%;
        height: 290px;
        background: #f8f8f8;
        padding: 28px 24px 27px 15px;
        font-weight: 400;
        color: #555555;
        > ul {
          list-style: none;
          > li {
            display: flex;
            justify-content: flex-end;
            line-height: 30px;
            margin-bottom: 19px;
            text-align: right;
            &:nth-child(2) {
              height: 60px;
            }
            &:nth-child(3) {
              height: 60px;
            }
            .box-placeholder {
              display: flex;
              align-items: center;
              width: 12px;
              height: 30px;
              margin-left: 16px;
              .box-cirlce {
                display: block;
                width: 12px;
                height: 12px;
                border: 1px solid #555555;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .box-right {
        width: 100%;
        height: 290px;
        background-color: rgba(73, 116, 245, 0.06);
        padding: 28px 0px 27px 24px;
        font-weight: 400;
        color: #4974f5;
        > ul {
          list-style: none;
          > li {
            display: flex;
            line-height: 30px;
            margin-bottom: 19px;
            &:nth-child(2) {
              height: 60px;
            }
            &:nth-child(3) {
              height: 60px;
            }
            .box-placeholder {
              display: flex;
              align-items: center;
              width: 12px;
              height: 30px;
              margin-right: 16px;
              .box-cirlce {
                display: block;
                width: 12px;
                height: 12px;
                border: 1px solid #4974f5;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
