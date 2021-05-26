<template>
  <div class="credit-evaluation">
    <sp-sticky>
      <div class="heaa-box">
        <Head title="额度评估">
          <template #left>
            <my-icon
              class="back-icon"
              name="nav_ic_back"
              size="0.4rem"
              color="#FFFFFF"
              @click.native="onLeftClick"
            ></my-icon>
          </template>
        </Head>
        <div class="num-box">
          <span class="head-msg">最高额度(元)</span>
          <span class="lines">{{ price }}</span>
        </div>
        <div class="prompt">输入以下信息，获取贷款额度</div>
      </div>
    </sp-sticky>

    <div class="content">
      <!-- 所在城市 -->
      <div class="list-content">
        <span class="title">所在城市</span>
        <input
          v-model="city"
          type="text"
          placeholder="优先选择工作地或户籍地"
          readonly
          class="city-input"
          @focus="chooseShow"
        />
        <div class="icon-box">
          <my-icon
            class="back-icon"
            name="list_ic_next"
            size="0.32rem"
            color="#CCCCCC"
          ></my-icon>
        </div>
      </div>
      <!-- 有无公积金 -->
      <div class="list-content">
        <span class="chooseTitle">有无缴满2年的公积金</span>
        <div class="gender-box">
          <span
            v-for="(item, idx) in isHave"
            :key="idx"
            :class="idx === reserveActived ? 'active' : ''"
            @click="insurance(idx, 'reserve')"
            >{{ item }}</span
          >
        </div>
      </div>
      <div v-show="reserveActived === 0" class="personal">
        <span class="personal-title">个人月缴金额</span>
        <input
          v-model="amount"
          type="number"
          class="personal-input"
          placeholder="请输入"
        />
        <span class="unit">元</span>
      </div>
      <!-- 是否缴纳保单 -->
      <div class="list-content">
        <span class="chooseTitle">有无生效2年的保单</span>
        <div class="gender-box">
          <span
            v-for="(item, idx) in isHave"
            :key="idx"
            :class="idx === insuranceActived ? 'active' : ''"
            @click="insurance(idx, 'insurance')"
            >{{ item }}</span
          >
        </div>
      </div>
      <div v-show="insuranceActived === 0" class="personal">
        <span class="personal-title">年缴保费</span>
        <input
          v-model="insuranceNum"
          type="number"
          class="insurance-input"
          placeholder="请输入"
        />
        <span class="unit">万元</span>
      </div>
      <!-- 有无房贷 -->
      <div class="list-content">
        <span class="chooseTitle">有无房贷</span>
        <div class="gender-box">
          <span
            v-for="(item, idx) in isHave"
            :key="idx"
            :class="idx === isTimeActived ? 'active' : ''"
            @click="insurance(idx, 'isTime')"
            >{{ item }}</span
          >
        </div>
      </div>
      <div v-show="isTimeActived === 0" class="reimbursement">
        <div class="reimbursement-box">
          <span class="reimbursement-title">房贷已还时间</span>
          <div class="time-box">
            <span
              v-for="(item, idx) in time"
              :key="idx"
              :class="timeActived === idx ? 'time-active' : ''"
              @click="insurance(idx, 'time')"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
      <div v-show="isTimeActived === 0" class="reimbursement-num">
        <span class="reimbursement-num-title">月供还款</span>
        <input
          v-model="reimbursementNum"
          type="number"
          class="reimbursement-num-input"
          placeholder="请输入"
        />
        <span class="reimbursement-unit">元</span>
      </div>
    </div>
    <div class="phone-box">
      <!-- 电话号码 -->
      <div class="phone-content">
        <span class="phone-title">手机号</span>
        <input
          v-model="phone"
          type="number"
          placeholder="请输入手机号"
          class="phone-input"
          @input="phoneReg"
        />
      </div>
      <!-- 获取验证码 -->
      <div class="phone-content">
        <span class="phone-title">验证码</span>
        <input
          v-model="sms"
          type="number"
          placeholder="输入短信校验码"
          class="sms-input"
          @input="smsReg"
        />
        <div class="line"></div>
        <span class="verification" @click="getSms">{{ test }}</span>
      </div>
    </div>
    <div class="btn-box">
      <button @click="onForm">立即申请</button>
      <div v-show="isShow" class="mask"></div>
    </div>
    <span class="btn-msg">薯片助贷服务，让更多人生活更美好！</span>
    <sp-popup v-model="pickerShow" position="bottom" :close-on-popstate="true">
      <sp-picker
        show-toolbar
        title="所在城市"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
      <!--  :default-index="2" -->
    </sp-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Picker, Popup, Sticky, Toast } from '@chipspc/vant-dgg'
import Head from '@/components/financing/common/Header'
import { financingApi, plannerApi } from '@/api/spread'
import imHandle from '@/mixins/imHandle'
export default {
  components: {
    Head,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,
    [Toast.name]: Toast,
  },
  mixins: [imHandle],
  data() {
    return {
      // 页面规划师
      pagePlanner: {},
      num: '0.00',
      pickerShow: false,
      columns: [],
      cityList: {},
      isHave: ['有', '无'],
      reserveActived: 1, // 是否有缴纳公积金
      city: '',
      amount: '', // 金额
      insuranceActived: 1,
      insuranceNum: '', // 保单缴费
      houseActived: 0, // 房贷已还时间
      isTimeActived: 1,
      time: ['半年-1年', '1年-3年', '3年-5年', '5年以上'],
      timeActived: 0,
      test: '获取验证码',
      phone: '', // 电话号码
      sms: '', // 验证码
      reimbursementNum: '',
      timeLimit: 20,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    isShow() {
      if (this.phone && this.sms && this.city) {
        return false
      } else {
        return true
      }
    },
    price() {
      if (this.amount && this.insuranceNum) {
        const num =
          50000 +
          (this.amount - 280) * 575 +
          this.insuranceNum * 10000 * 25 +
          this.reimbursementNum * this.timeLimit

        return num > 10000000 ? '10000000.00' : num.toFixed(2)
      } else if (this.insuranceNum && this.reimbursementNum) {
        const num =
          50000 +
          this.insuranceNum * 10000 * 25 +
          this.reimbursementNum * this.timeLimit
        return num > 10000000 ? '10000000.00' : num.toFixed(2)
      } else if (this.amount && this.reimbursementNum) {
        const num =
          50000 +
          (this.amount - 280) * 575 +
          this.reimbursementNum * this.timeLimit
        return num > 10000000 ? '10000000.00' : num.toFixed(2)
      } else if (this.amount && this.insuranceNum && this.reimbursementNum) {
        const num =
          50000 +
          (this.amount - 280) * 575 +
          this.insuranceNum * 10000 * 25 +
          this.reimbursementNum * this.timeLimit
        return num > 10000000 ? '10000000.00' : num.toFixed(2)
      } else {
        return '0.00'
      }
    },
  },
  mounted() {
    this.getPagePlanner('app-ghsdgye-02')
    this.getCity()
  },
  methods: {
    getCity() {
      const url = 'http://127.0.0.1:7001/service/nk/financing/v1/get_city.do'
      this.$axios.get(url, { params: { code: 2147483647 } }).then((res) => {
        if (res.code === 200) {
          this.cityList = res.data.city
          this.columns = [
            { values: Object.keys(this.cityList) },
            { values: this.cityList['北京市'] },
          ]
        }
      })
    },
    onChange(picker, value) {
      picker.setColumnValues(1, this.cityList[value[0]])
    },
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
    getSms() {
      if (this.test === '获取验证码') {
        const url =
          'http://127.0.0.1:7001/service/nk/financing/v1/get_smsCode.do'
        // financingApi.smsCode
        this.$axios
          .get(url, {
            params: {
              phone: this.phone,
            },
          })
          .then((res) => {
            if (res.code === 200) {
              Toast('验证码发送成功,请注意查收！')
              this.smsRes = res.data
            } else {
              Toast(res.data)
            }
          })
      }
      let i = 59
      clearInterval(this.time)
      this.test = i + 's'
      this.time = setInterval(() => {
        if (i > 1) {
          i--
          this.test = i + 's'
        } else {
          this.test = '获取验证码'
          clearInterval(this.time)
        }
      }, 1000)
    },
    onForm() {
      const url =
        'http://127.0.0.1:7001/service/nk/financing/v1/validation_smsCode.do'
      // financing.check_smsCode
      this.$axios
        .get(url, {
          params: {
            phone: this.phone,
            smsCode: this.sms,
          },
        })
        .then((res) => {
          if (res.code === 200 && res.data === true) {
            this.$xToast.showLoading({ message: '正在联系规划师...' })
            const planner = {
              mchUserId: this.pagePlanner.id,
              userName: this.pagePlanner.name,
              type: this.pagePlanner.type,
            }
            this.uPIM(planner)
          } else {
            Toast('验证码不真确！')
          }
        })
    },
    // 返回上一页
    onLeftClick() {
      this.$router.back(-1)
      this.$emit('backHandle')
    },
    chooseShow() {
      this.pickerShow = true
    },
    // 贷款期限弹出层确认按钮
    onConfirm(value, index) {
      this.city = value
      this.pickerShow = false
    },
    // 贷款期限弹出层取消按钮
    onCancel() {
      this.pickerShow = false
    },
    phoneReg(e) {
      e.target.value = e.target.value.match(/^(\d{0,11})/g)[0] || null
      this.phone = e.target.value
    },
    smsReg(e) {
      e.target.value = e.target.value.match(/^(\d{0,6})/g)[0] || null
      this.sms = e.target.value
    },
    insurance(idx, type) {
      type === 'insurance' && (this.insuranceActived = idx)
      type === 'reserve' && (this.reserveActived = idx)
      type === 'house' && (this.houseActived = idx)
      type === 'isTime' && (this.isTimeActived = idx)
      if (type === 'time') {
        this.timeActived = idx
        switch (this.time[idx]) {
          case '半年-1年':
            this.timeLimit = 20
            break
          case '1年-3年':
            this.timeLimit = 45
            break
          case '3年-5年':
            this.timeLimit = 70
            break
          default:
            this.timeLimit = 100
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.credit-evaluation {
  width: 100vw;
  margin: 0 auto;
  background: #f5f5f5;
  padding-bottom: 40px;
  //   border: 1px solid;
  .heaa-box {
    width: 100%;
    background: #4974f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    // position: fixed;
    // top: 0;
    ::v-deep.my-head {
      //   width: 750px !important;
      //   position: fixed !important;
      //   left: 50% !important;
      //   margin-left: -375px !important;
      position: relative;
      background: transparent;
      .title {
        color: #ffffff;
      }
    }
    .num-box {
      padding-bottom: 65px;
      display: flex;
      flex-direction: column;
      align-items: center;
      > span {
        display: block;
      }
      .head-msg {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        margin-top: 40px;
      }
      .lines {
        height: 87px;
        font-size: 66px;
        font-family: Bebas;
        color: #ffffff;
        line-height: 87px;
        margin-top: 20px;
      }
    }
  }
  .prompt {
    width: 750px;
    height: 80px;
    padding: 20px 0 20px 40px;
    background: #f5f5f5;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 40px;
  }
  .content {
    // margin-top: 420px;
    background: #ffffff;
    padding: 0 40px;
    > div {
      height: 120px;
      width: 100%;
      border-bottom: 1px solid #f4f4f4;
      font-size: 0;
      display: flex;
      align-items: center;
    }
    .list-content {
      > span {
        display: block;
      }
      .chooseTitle {
        width: 308px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      .title {
        width: 130px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      > input {
        width: 238px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 45px;
        border: none;
        margin-left: 58px;
        color: #222222;
      }
      > input:-ms-input-placeholder {
        color: #999999;
      }
      .gender-box {
        display: flex;
        margin-left: auto;
        > span {
          display: block;
          width: 100px;
          height: 56px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #dddddd;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 56px;
          text-align: center;
        }
        > span:last-child {
          margin-left: 20px;
        }
        .active {
          background: #f2f5ff;
          border-radius: 8px;
          border: 1px solid #4974f5;
          color: #4974f5;
        }
      }
      .icon-box {
        width: 18px;
        height: 32px;
        // background: #cccccc;
        margin-left: 47px;
      }
      .city-input {
        width: 418px;
      }
    }
    .personal {
      .personal-title {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
        width: 192px;
      }
      .personal-input {
        display: block;
        margin-left: 60px;
        width: 346px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 45px;
        border: none;
        text-align: right;
      }
      .personal-input:-moz-placeholder {
        color: #999999;
      }
      .insurance-input {
        display: block;
        margin-left: 60px;
        width: 314px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 45px;
        border: none;
        text-align: right;
      }
      .insurance-input:-moz-placeholder {
        color: #999999;
      }
      .unit {
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 32px;
        margin-left: auto;
      }
    }
    .reimbursement {
      width: 100%;
      height: 200px;
      background: #ffffff;
      .reimbursement-box {
        border-bottom: 1px solid #f4f4f4;
        font-size: 0;
        .reimbursement-title {
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #222222;
          line-height: 45px;
        }
        .time-box {
          display: flex;
          font-size: 0;
          margin-top: 24px;
          > span:not(:first-child) {
            margin-left: 20px;
          }
          > span {
            width: 152px;
            height: 56px;
            border-radius: 8px;
            border: 1px solid #dddddd;
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 56px;
            text-align: center;
          }
          .time-active {
            color: #4974f5;
            background: #f2f5ff;
            border: 1px solid #4974f5;
          }
        }
      }
    }
    .reimbursement-num {
      .reimbursement-num-title {
        width: 192px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      .reimbursement-num-input {
        width: 346px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 45px;
        text-align: right;
        border: none;
        margin-left: 60px;
      }
      .reimbursement-num-input:-moz-placeholder {
        color: #999999;
      }
      .reimbursement-unit {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 32px;
        margin-left: auto;
      }
    }
  }
  .phone-box {
    background: #ffffff;
    padding: 0 40px;
    margin-top: 20px;
    .phone-content {
      height: 120px;
      width: 100%;
      border-bottom: 1px solid #f4f4f4;
      font-size: 0;
      display: flex;
      align-items: center;
      > span {
        display: block;
      }
      .phone-title {
        width: 130px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      > input {
        width: 238px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 45px;
        border: none;
        margin-left: 58px;
        color: #222222;
      }
      > input:-ms-input-placeholder {
        color: #999999;
      }
      .sms-input {
        width: 274px;
      }
      .line {
        width: 1px;
        height: 40px;
        border: 1px solid #dddddd;
        margin-left: 24px;
      }
      .verification {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 45px;
        margin-left: 20px;
      }
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
  }
  .btn-msg {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #cccccc;
    line-height: 37px;
    margin-top: 40px;
  }
}
</style>
