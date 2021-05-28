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
          type="number"
          :placeholder="valuePlaceholder"
          @input="blur"
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
          @input="paymentBlur"
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
        <my-icon
          class="list-icon"
          name="list_ic_next"
          size="0.32rem"
          color="#CCCCCC"
        ></my-icon>
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
    <Constant v-show="constant" :standard-num="standardNum"></Constant>
    <div v-show="constant" class="check" @click="jump">
      <span>查看每月还款</span>
      <div class="check-icon">
        <my-icon name="list_ic_next" size="0.2rem" color="#4974F5"></my-icon>
      </div>
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
import { mapState } from 'vuex'
import { Picker, Popup } from '@chipspc/vant-dgg'
import Head from '@/components/financing/common/Header'
import Standard from '@/components/financing/common/Standard'
import Constant from '@/components/financing/common/Constant'
import { financingApi, plannerApi } from '@/api/spread'
import imHandle from '@/mixins/imHandle'
export default {
  components: {
    Head,
    Standard,
    Constant,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  mixins: [imHandle],
  data() {
    return {
      // 页面规划师
      pagePlanner: {},
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
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    isShow() {
      if (this.rateValue && this.firstValue && this.value) {
        return false
      } else {
        return true
      }
    },
  },

  mounted() {
    this.getPagePlanner('app-ghsdgye-02')
  },
  methods: {
    // 推介规划师
    async getPagePlanner(scene) {
      const device = await this.$getFinger().then((res) => {
        return res
      })
      let areaCode = '510100' // 站点code
      // 站点code
      if (this.isInApp) {
        this.$appFn.dggCityCode((res) => {
          areaCode = res.data.adCode
        })
      } else {
        areaCode = this.currentCity.code
      }
      try {
        this.$axios
          .post(
            plannerApi.plannerReferrals,
            {
              login_name: '',
              deviceId: device, // 设备标识
              area: areaCode || '510100', // 站点code
              user_id: '',
              productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
              sceneId: scene, // 场景id
              level_2_ID: '', // 二级code
              platform: 'app',
              productId: '', //
              thirdTypeCodes: '', // 三级code
              firstTypeCode: 'FL20210425164558', // 一级code
            },
            {
              headers: {
                sysCode: 'cloud-recomd-api',
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            console.log(res, '调用规划师')
            if (res.code === 200 && res.data.length > 0) {
              this.pagePlanner = {
                id: res.data[0].mchUserId,
                name: res.data[0].userName,
                type: res.data[0].type,
                jobNum: res.data[0].userCenterNo,
                telephone: res.data[0].phone,
                imgSrc: res.data[0].imgaes,
              }
            }
          })
      } catch (error) {
        console.log('plannerApi.plannerReferrals error：', error.message)
      }
    },
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
      const planner = {
        mchUserId: this.pagePlanner.id,
        userName: this.pagePlanner.name,
        type: this.pagePlanner.type,
      }
      this.uPIM(planner)
    },
    // 开始计算
    calculate() {
      if (this.actived === 0) {
        this.standard = true
        const reset = this.principalAndInterest({
          P:
            Number(this.value) -
            Number(this.value) * Number(this.firstValue / 100),
          R: Number(this.rateValue) / 12 / 100,
          N: Number(this.timeValue) * 12,
        })
        // console.log(reset)
        // 总额
        this.constants.sum = (reset * 12 * Number(this.timeValue)).toFixed(2)
        // 月还款
        this.constants.mrepayment = reset.toFixed(2)
        // 利息(还款额-贷款额)
        this.constants.interest = (
          this.constants.sum === '0'
            ? 0
            : this.constants.sum -
              (this.value - this.value * Number(this.firstValue / 100)) * 10000
        ).toFixed(2)
      } else {
        this.constant = true
        // 等额本金
        this.principal({
          P:
            Number(this.value) -
            Number(this.value) * Number(this.firstValue / 100), // 贷款金额
          R: Number(this.rateValue) / 12 / 100, // 根据年利率，算出月利率
          N: Number(this.timeValue) * 12, // 根据年算出自然月还款期数
        })
        this.standardNum.mrepayment = this.nplist[0] ? this.nplist[0].data : 0
        this.standardNum.interest = (
          this.standardNum.sum === '0'
            ? 0
            : this.standardNum.sum * 10000 -
              (this.value * 10000 -
                this.value * Number(this.firstValue / 100) * 10000)
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
    blur(e) {
      e.target.value =
        e.target.value.match(/^(\d{0,4})(\.?\d{0,2})/g)[0] || null
      this.value = e.target.value > 10000 ? '9999.99' : e.target.value
    },
    // 首付款
    paymentBlur(e) {
      e.target.value =
        e.target.value.match(/^(\d{0,2})(\.?\d{0,2})/g)[0] || null
      this.firstValue = e.target.value > 101 ? '100' : e.target.value
    },
    // 贷款年利率
    loanBlur(e) {
      e.target.value =
        e.target.value.match(/^(\d{0,2})(\.?\d{0,2})/g)[0] || null
      this.rateValue = e.target.value > 101 ? '100' : e.target.value
    },
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
        width: 165px;
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
        margin-left: 55px;
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
      .list-icon {
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
      font-size: 0;
      //   background: #4974f5;
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
