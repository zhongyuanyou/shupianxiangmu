<template>
  <div class="car-loans">
    <Head title="车贷计算器"></Head>
    <!-- 信息输入 -->
    <div class="form-box">
      <div class="car-value">
        <span class="title">车价总额</span>
        <input
          v-model="value"
          class="input-value"
          type="text"
          :placeholder="valuePlaceholder"
          @focus="blur"
        />
        <span class="unit">万元</span>
      </div>
      <div class="car-value">
        <span class="title">首付款</span>
        <input
          v-model="firstValue"
          class="input-value"
          type="number"
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
          type="number"
          :placeholder="ratePlaceholde"
          @focus="loanBlur"
        />
        <span class="unit">%</span>
      </div>
      <!-- 贷款期限选择框 -->
      <div class="car-value">
        <span class="title">贷款期限</span>
        <input
          v-model="yaer"
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
    <Standard v-show="standard" :constant="constants"></Standard>
    <!-- 等额本金计算结果 -->
    <Constant v-show="constant" :standardNum="standardNum"></Constant>
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
      <div v-show="isShow" class="mask"></div>
    </div>
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
export default {
  components: {
    Head,
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
      columns: ['1年', '2年', '3年', '4年', '5年'],
      timeValue: 12,
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
      constants: {
        sum: 0, // 总额
        mrepayment: 0, // 月还款
        interest: 0, // 利息
      },
      standardNum: {
        sum: 0, // 总额
        mrepayment: 0, // 月还款
        interest: 0, // 利息
        diminishing: 0, // 每月递减
      },
      // 每期还款记录
      nplist: [],
      // 当前期数
      dn: 1,
      yaer: '1年',
    }
  },
  computed: {
    isShow() {
      if (this.rateValue && this.firstValue && this.value) {
        return false
      } else {
        return true
      }
    },
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
      this.$router.push({
        path: '/financing/loanCalculator/reimbursement',
        query: { list: this.nplist },
      })
    },
    // 立即办理
    handleBtn() {
      console.log('立即办理')
    },
    // 开始计算
    calculate() {
      if (this.actived === 0) {
        this.standard = true
        const reset = this.principalAndInterest({
          P: Number(this.value * Number(this.firstValue / 100)),
          R: Number(this.rateValue) / 12 / 100,
          N: this.timeValue,
        })
        // 总额
        this.constants.sum = (reset * Number(this.timeValue)).toFixed(2)
        // 月还款
        this.constants.mrepayment = reset.toFixed(2)
        // 利息(还款额-贷款额)
        this.constants.interest = (
          this.constants.sum -
          this.value * Number(this.firstValue / 100) * 10000
        ).toFixed(2)
      } else {
        this.constant = true
        // 等额本金
        this.principal({
          P: Number(this.value * Number(this.firstValue / 100)), // 贷款金额
          R: Number(this.rateValue) / 12 / 100, // 根据年利率，算出月利率
          N: this.timeValue, // 根据年算出自然月还款期数
        })
        this.standardNum.mrepayment = this.nplist[0] ? this.nplist[0].data : 0
        this.standardNum.interest = (
          (this.standardNum.sum - this.value * Number(this.firstValue / 100)) *
          10000
        ).toFixed(2)
        this.standardNum.sum = (this.standardNum.sum * 10000).toFixed(2)
        this.standardNum.diminishing = (
          this.nplist[0].data - this.nplist[1].data
        ).toFixed(2)
      }
      this.btnShow = false
    },
    // 计算器(等额本金)
    principal(obj) {
      /*
       * P:贷款本金
       * R:月利率
       * N:还款期数
       * NP:已归还本金累计额
       * 附：月利率 = 年利率/12
       * */
      if (this.dn === 1) {
        // 每次递归之前清除上一次脏数据
        this.nplist = []
        this.sum = 0
      }
      const { P, R, N } = obj
      if (this.dn > N) {
        // 当超出还款期限，停止计算
        this.dn = 1 // 计算结束时,当前期数回归到初始值
        return null
      } else {
        // 计算得到当期还款金额
        // （贷款本金/ 还款月数）+（本金 — 已归还本金累计额）×每月利率
        const result = P / N + (P - (P / N) * (this.dn - 1)) * R
        // 累加本次还款金额
        this.standardNum.sum += result
        // 把本次还款金额和期数保存
        this.nplist.push({
          number: `第${this.dn}个月`, // 期数
          data: this.toFixedFun(result * 10000, 2), // 金额(金额由万换算为元)
          principal: this.toFixedFun((P / N) * 10000, 2), // 本金（贷款金额除以还款期数）
          interest: this.toFixedFun((result - P / N) * 10000, 2), // 利息
        })
        // 本次金额保存完整时，我当前期数+1
        this.dn += 1
        //
        this.principal({
          P,
          R,
          N,
        })
      }
    },
    // 去小数后两位
    toFixedFun(num, length) {
      if (isNaN(num) || num < 0) {
        return '0.00'
      } else {
        return Number(num).toFixed(length)
      }
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
    // 车价总额
    blur() {},

    // 首付款
    paymentBlur() {},
    // 贷款年利率
    loanBlur() {},
    // 贷款期限
    timeBlur() {
      this.pickerShow = true
    },
    // 贷款期限弹出层确认按钮
    onConfirm(value, index) {
      this.yaer = value
      value === '1年' && (this.timeValue = 12)
      value === '2年' && (this.timeValue = 24)
      value === '3年' && (this.timeValue = 36)
      value === '4年' && (this.timeValue = 48)
      value === '5年' && (this.timeValue = 60)
      this.pickerShow = false
    },
    // 贷款期限切换方法
    onChange(picker, value, index) {
      this.yaer = value
      value === '1年' && (this.timeValue = 12)
      value === '2年' && (this.timeValue = 24)
      value === '3年' && (this.timeValue = 36)
      value === '4年' && (this.timeValue = 48)
      value === '5年' && (this.timeValue = 60)
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
.car-loans {
  width: 750px;
  padding-bottom: 16px;
  height: 100%;
  margin: 0 auto;
  background: #f5f5f5;
  ::v-deep.my-head {
    width: 750px !important;
    position: fixed !important;
    left: 50% !important;
    margin-left: -375px !important;
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
