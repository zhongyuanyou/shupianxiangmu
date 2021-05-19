<template>
  <div class="house-loans">
    <Head title="房贷计算器"></Head>
    <!-- 信息输入 -->
    <div class="form-box">
      <div class="car-value">
        <span class="title">车价总额</span>
        <input
          v-model="value"
          class="input-value"
          type="text"
          :placeholder="valuePlaceholder"
          maxlength="7"
          @focus="blur"
        />
        <span class="unit">万元</span>
      </div>
      <div class="car-value">
        <span class="title">首付款</span>
        <input
          v-model="firstValue"
          class="input-value"
          type="text"
          :placeholder="firstPlaceholde"
          @focus="paymentBlur"
        />
        <span class="unit">%</span>
      </div>
      <div class="car-value">
        <span class="title">贷款年利率</span>
        <input
          v-model="rateValue"
          class="input-value"
          type="text"
          :placeholder="ratePlaceholde"
          @focus="loanBlur"
        />
        <span class="unit">%</span>
      </div>
      <!-- 贷款期限选择框 -->
      <div class="car-value">
        <span class="title">贷款期限</span>
        <input
          v-model="timeValue"
          class="input-value"
          type="text"
          readonly
          @focus="timeBlur"
        />
        <!-- <my-icon
          class="back-icon"
          name="you"
          size="0.32rem"
          color="#CCCCCC"
        ></my-icon> -->
      </div>
      <!-- 还款方式 -->
      <div class="car-value">
        <span class="title">还款方式</span>
        <div class="choose-box">
          <div
            v-for="(item, idx) in chooseList"
            :key="idx"
            :class="actived === idx ? 'active' : ''"
            @click="chosee(idx)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!-- 等额本息计算结果 -->
    <Standard v-show="standard"></Standard>
    <!-- 等额本金计算结果 -->
    <Constant v-show="constant"></Constant>
    <div v-show="constant" class="check" @click="jump">
      <span>查看每月还款</span>
      <div class="check-icon"></div>
    </div>
    <!-- 按钮 -->
    <div class="btn-box">
      <button v-if="btnShow" @click="calculate">开始计算</button>
      <div v-else class="recalculate-box">
        <button class="recalculate" @click="recalculateBtn">重新计算</button>
        <button class="handle" @click="handleBtn">立即办理</button>
      </div>
      <div v-show="maskShow" class="mask"></div>
    </div>
    <!-- 自定义数字键盘 -->
    <Keyword ref="keyword" @number="number" @delBtn="delBtn"></Keyword>
    <!-- 贷款期限选择器 -->
    <sp-popup v-model="pickerShow" position="bottom" :close-on-popstate="true">
      <sp-picker
        show-toolbar
        title="贷款期限"
        :columns="columns"
        :default-index="0"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </sp-popup>
  </div>
</template>

<script>
import { Picker, Popup } from '@chipspc/vant-dgg'
import Head from '@/components/financing/common/Header'
import Standard from '@/components/financing/common/Standard'
import Constant from '@/components/financing/common/Constant'
import Keyword from '@/components/financing/common/keyword'
export default {
  components: {
    Head,
    Keyword,
    Standard,
    Constant,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  data() {
    return {
      value: '',
      valuePlaceholder: '请输入车价总额',
      pickerShow: false,
      columns: ['5年', '10年', '20年', '30年'],
      timeValue: '5年',
      type: '',
      firstValue: '',
      firstPlaceholde: '请输入首付比率',
      rateValue: '',
      ratePlaceholde: '请输入贷款年利率',
      chooseList: [
        { type: 'bx', name: '等额本息' },
        {
          type: 'bj',
          name: '等额本金',
        },
      ],
      actived: 0,
      maskShow: true, // 按钮遮罩层
      standard: false,
      constant: false,
      btnShow: true,
    }
  },
  mounted() {},
  methods: {
    // 重新计算
    recalculateBtn() {
      this.btnShow = true
      this.standard = false
      this.constant = false
    },
    // 查看每月还款
    jump() {
      console.log('查看每月还款')
    },
    // 立即办理
    handleBtn() {
      console.log('立即办理')
    },
    // 计算器(等额本息)
    principalAndInterest(obj) {
      /*
       * P:贷款本金
       * R:月利率
       * N:还款期数
       * 附：月利率 = 年利率/12
       * */
      const { P, R, N } = obj
      // p*((r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1))
      const result = P * ((R * (1 + R) ** N) / ((1 + R) ** N - 1))
      return result * 10000 // 将万元换算成元
    },
    // 开始计算
    calculate() {
      if (this.actived === 0) {
        this.standard = true
      } else {
        this.constant = true
      }
      this.btnShow = false
    },
    number(e) {
      let agm = ''
      this.type === 'price' && (agm = this.value)
      this.type === 'payment' && (agm = this.firstValue)
      this.type === 'loan' && (agm = this.rateValue)
      if (e.type === '.') {
        agm.indexOf('.') === -1 && agm.length !== 0 && (agm = agm + '.')
      } else if (e.type === '0') {
        agm.length !== 0 && (agm = agm + '0')
      } else if (e.type === 'close') {
        this.$refs.keyword.show = false
      } else {
        agm += e.type
      }
      this.type === 'price' && (this.value = agm)
      this.type === 'payment' && (this.firstValue = agm)
      this.type === 'loan' && (this.rateValue = agm)
      if (this.value && this.rateValue && this.firstValue) {
        this.maskShow = false
      }
    },
    delBtn() {
      let agm = ''
      this.type === 'price' && (agm = this.value)
      this.type === 'payment' && (agm = this.firstValue)
      this.type === 'loan' && (agm = this.rateValue)
      agm = agm.substring(0, agm.length - 1)
      this.type === 'price' && (this.value = agm)
      this.type === 'payment' && (this.firstValue = agm)
      this.type === 'loan' && (this.rateValue = agm)
    },
    // 车价总额
    blur() {
      document.activeElement.blur()
      this.$refs.keyword.show = true
      //   this.valuePlaceholder = ''
      this.type = 'price'
    },

    // 首付款
    paymentBlur() {
      document.activeElement.blur()
      this.$refs.keyword.show = true
      //   this.firstPlaceholde = ''
      this.type = 'payment'
    },
    // 贷款年利率
    loanBlur() {
      document.activeElement.blur()
      this.$refs.keyword.show = true
      //   this.ratePlaceholde = ''
      this.type = 'loan'
    },
    // 贷款期限
    timeBlur() {
      this.pickerShow = true
    },
    // 贷款期限弹出层确认按钮
    onConfirm(value, index) {
      this.timeValue = value
      this.pickerShow = false
    },
    // 贷款期限切换方法
    onChange(picker, value, index) {
      this.timeValue = value
      this.pickerShow = false
    },
    // 贷款期限弹出层取消按钮
    onCancel() {
      this.pickerShow = false
    },
    chosee(idx) {
      this.actived = idx
    },
  },
}
</script>

<style lang="less" scoped>
.house-loans {
  width: 750px;
  padding-bottom: 16px;
  height: 100%;
  margin: 0 auto;
  background: #f5f5f5;
  ::v-deep.my-head {
    width: 750px;
    position: fixed;
    left: 50%;
    margin-left: -375px;
  }
  .form-box {
    margin-top: 20px;
    width: 100%;
    padding: 0 40px;
    background: #ffffff;
    .car-value {
      width: 100%;
      height: 120px;
      background: #ffffff;
      border-bottom: 1px solid #f4f4f4;
      display: flex;
      align-items: center;
      > span {
        display: block;
      }
      .title {
        width: 160px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 45px;
      }
      .input-value {
        width: 346px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        display: block;
        border: none;
        margin-left: 60px;
      }
      .input-value::-moz-placeholder {
        font-weight: 400;
        font-size: 32px;
        color: #999999;
      }
      .unit {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 32px;
        margin-left: auto;
      }
      .choose-box {
        display: flex;
        margin-left: 60px;
        > div {
          width: 152px;
          height: 56px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #dddddd;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 56px;
          margin-right: 20px;
          text-align: center;
        }
        .active {
          background: #f2f5ff;
          border: 1px solid #4974f5;
          color: #4974f5;
        }
      }
    }
  }
  .check {
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      display: block;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4974f5;
      line-height: 28px;
    }
    .check-icon {
      margin-left: 12px;
      width: 11px;
      height: 20px;
      background: #4974f5;
    }
  }
  .btn-box {
    padding: 0 40px;
    font-size: 0;
    position: relative;
    > button {
      margin-top: 48px;
      width: 670px;
      height: 96px;
      background: #4974f5;
      border-radius: 8px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 96px;
    }
    .mask {
      width: 670px;
      height: 96px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 8px;
      position: absolute;
      top: 48px;
    }
    .recalculate-box {
      width: 100%;
      height: 160px;
      padding: 32px 0;
      font-size: 0;
      display: flex;
      margin-top: 16px;
      > button {
        width: 327px;
        height: 96px;
        border-radius: 8px;
        border: 1px solid #4974f5;
      }
      .recalculate {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #4974f5;
        line-height: 96px;
        background: rgba(255, 255, 255, 0);
      }
      .handle {
        background: #4974f5;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #ffffff;
        line-height: 96px;
        margin-left: 16px;
      }
    }
  }
}
</style>
