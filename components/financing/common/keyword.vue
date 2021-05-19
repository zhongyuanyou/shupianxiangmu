<template>
  <div>
    <sp-popup
      v-model="show"
      position="bottom"
      :close-on-popstate="true"
      :overlay="true"
      :overlay-style="overlay"
    >
      <div class="keyword">
        <div class="left">
          <div v-for="(num, idx) in nums" :key="idx" @click="btn(idx, num)">
            {{ num.num }}
          </div>
        </div>
        <div class="right">
          <div class="del" @click="delBtn">删除</div>
          <div class="confirm" @click="confirmBtn">确认</div>
        </div>
      </div>
    </sp-popup>
  </div>
</template>

<script>
import { Popup } from '@chipspc/vant-dgg'
export default {
  components: {
    [Popup.name]: Popup,
  },
  data() {
    return {
      show: false,
      nums: [
        { type: '1', num: '1' },
        { type: '2', num: '2' },
        { type: '3', num: '3' },
        { type: '4', num: '4' },
        { type: '5', num: '5' },
        { type: '6', num: '6' },
        { type: '7', num: '7' },
        { type: '8', num: '8' },
        { type: '9', num: '9' },
        { type: '.', num: '.' },
        { type: '0', num: '0' },
        { type: 'close', num: '收起' },
      ],
      overlay: {
        background: 'transparent',
      },
    }
  },
  methods: {
    btn(idx, num) {
      this.$emit('number', num)
    },
    delBtn() {
      this.$emit('delBtn')
    },
    confirmBtn() {
      this.show = false
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep.sp-popup--bottom {
  width: 750px;
}
.keyword {
  width: 750px;
  height: 401px;
  // background: #cccccc;
  display: flex;
  justify-content: space-between;

  .left {
    height: 100%;
    width: 558px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    > div {
      width: 185px;
      height: 100px;
      background: #ffffff;
      border-bottom: 1px solid #cccccc;
      border-right: 1px solid #cccccc;
      text-align: center;
      font-size: 30px;
      line-height: 100px;
      font-size: 51px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1a1a1a;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    .del {
      width: 194px;
      height: 199px;
      background: #f6f6f7;

      text-align: center;
      font-size: 42px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 200px;
    }
    .confirm {
      width: 194px;
      height: 201px;
      background: #4974f5;
      text-align: center;
      font-size: 42px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 200px;
    }
  }
}
</style>
