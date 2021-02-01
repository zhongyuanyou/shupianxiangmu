<template>
  <div class="form">
    <div class="form-content">
      <div class="form-title">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/36v8fqlnh5y0000.png"
          alt=""
        />
        <h4>根据税务问题 免费定制节税方案</h4>
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/4nq906nfv760000.png"
          alt=""
        />
      </div>
      <span class="subtitle">勾选你需要的节税方案</span>
      <div class="form-content-choose">
        <sp-checkbox-group v-model="result">
          <sp-checkbox
            v-for="(key, val) in msgList"
            :key="val"
            v-md-map
            v-md:webClick
            :data-form_name="`税务筹划表单_复选框_${key}`"
            :name="val"
            icon-size="16px"
            >{{ key }}</sp-checkbox
          >
        </sp-checkbox-group>
      </div>
      <!-- 输入框盒子 -->
      <div class="form-content-input-box">
        <!-- 其他税务问题输入框 -->
        <div class="msg-input">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/3zxevanw4ag0000.png"
            alt=""
          />
          <input
            v-model="tax"
            v-md-map
            v-md:webClick
            type="text"
            data-form_name="税务筹划表单_其他税务问题"
            placeholder="其它税务问题"
            maxlength="20"
            @input="msgCheck"
          />
        </div>
        <!-- 手机号输入框 -->
        <div class="phone-input">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/3npg0yuln0a0000.png"
            alt=""
          />
          <input
            v-model="phone"
            v-md-map
            v-md:webClick
            type="tel"
            data-form_name="税务筹划表单_手机号码"
            placeholder="留下手机号，接收节税方案"
            maxlength="11"
            @input="phoneCheck"
          />
        </div>
        <!-- 验证码输入框 -->
        <div class="verification-input">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/coz2sgfmhvk0000.png"
            alt=""
          />
          <input
            v-model="validation"
            v-md-map
            v-md:webClick
            type="tel"
            data-form_name="税务筹划表单_验证码"
            placeholder="请输入验证码"
            maxlength="6"
            @input="verification"
          />
          <button
            v-md-map
            v-md:webClick
            class="seconds"
            data-form_name="税务筹划表单_获取验证码"
            @click="sendSms"
          >
            {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </button>
        </div>
      </div>
      <!-- 提交按钮 -->
      <div class="form-free-btn">
        <button
          v-md-map
          v-md:p_formSubmit
          data-event_name="p_formSubmit"
          data-form_type="咨询表单"
          data-form_name="税务筹划_表单提交"
          @click="freeBtn"
        >
          免费获取节税方案
        </button>
      </div>
    </div>
    <!-- 表单提交成功提示框 -->
    <Dialog />
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Toast } from '@chipspc/vant-dgg'
import Dialog from '@/components/spread/common/Dialog'
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Toast.name]: Toast,
    Dialog,
  },
  data() {
    return {
      show: false,
      // 税务信息
      tax: '',
      phone: '', // 手机号
      validation: '', // 验证码
      taxMsg: '',
      countdown: -1, // 发送验证码倒计时
      countdownTimer: null,
      msgList: {
        checkOne: '不知道怎么享受减免政策',
        checkTow: '税务操作不合规风险高',
        checkThree: '股东分红/高管/自由工作者纳税高',
      },
      result: [],
      diaLogTitle: '提交成功',
      diaLogContent: '您的信息已提交，我们的规划师将在5分钟之内联系您',
    }
  },
  methods: {
    // 税务问题字符验证
    msgCheck() {
      this.tax = this.tax.replace(
        /[^\dA-Za-z\u3007\u4E00-\u9FCB\uE815-\uE864]/g,
        ''
      )
    },
    // 电话号码验证
    phoneCheck() {
      this.phone = this.phone.replace(/[^\d]/g, '')
    },
    // 验证码验证
    verification() {
      this.validation = this.validation.replace(/[^a-z0-9A-Z]/g, '')
    },
    // 验证码倒计时
    countDown() {
      const vm = this
      this.countdown = 59
      clearInterval(vm.countdownTimer)
      vm.countdownTimer = null
      this.countdownTimer = setInterval(function () {
        if (vm.countdown === 0) {
          vm.countdown = -1
          clearInterval(vm.countdownTimer)
          vm.countdownTimer = null
        } else {
          vm.countdown > 0 && vm.countdown--
        }
      }, 1000)
    },
    // 验证码
    sendSms() {
      const vm = this
      if (this.countdown > -1) {
      } else {
        // 1、验证手机号
        const verifyTelResult = this.verifyTel()
        // 2、验证手机号成功发送验证码
        // 2.1 发送验证码成功，倒计时开始。2.2发送验证码失败，提示并倒计时不开始
        if (verifyTelResult) {
          const _data = {
            tel: this.phone,
            type: 'gs',
          }
          window.promotion.privat.getSmsCode(_data, (res) => {
            // 发送成功，倒计时开始
            if (res.error === 0) {
              vm.countDown()
            } else {
              Toast(res.msg)
            }
          })
        }
      }
    },
    // 提交按钮

    freeBtn() {
      const arr = []
      this.result.forEach((item) => {
        arr.push(this.msgList[item])
      })
      this.taxMsg = arr.join(',')
      // 1、表单书剑验证
      const _tax = this.result
      const _tel = this.phone
      const _code = this.validation
      const _telReg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tax.length === 0) {
        Toast('请勾选节税方案')
        return
      }
      if (!_tel) {
        Toast('请输入电话号码')
        return
      }
      if (!_telReg.test(_tel)) {
        Toast('请输入正确的电话号码')
        return
      }
      if (!_code) {
        Toast('请输入验证码')
        return
      }

      // 2、整合表单数据
      const webUrl = window.location.href
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      const contentStr = {
        shuiWuWenTi: this.taxMsg,
        qiTaWenTi: this.tax,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名用户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'swch', // 业态编码。
        place: 'cd', // 定位城市。
        device: 'wap', // 设备：pc,wap。
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh。
        smsCode: _code, // 验证码
        content: JSON.stringify(contentStr),
      }
      // 3、提交表单
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 这里写表单提交成功后的函数，如二级表单弹出，提示提交成功，清空DOM中表单的数据等
          this.phone = ''
          this.validation = ''
          this.countdown = -1
          this.tax = ''
          this.result = []
          clearInterval(this.countdownTimer)
          this.countdownTimer = null
          // 自定义表单提交结果埋点事件
          window.spptMd.spptTrackRow('p_formSubmitResult', {
            even_name: 'p_formSubmitResult',
            form_type: '咨询表单',
            form_name: '税务筹划表单_提交表单',
          })
          this.$root.$emit('Dialog')
        } else {
          Toast(res.msg)
          this.sms = ''
          this.countdown = -1
        }
      })
    },
    // 验证手机号
    verifyTel() {
      const _tel = this.phone
      const _reg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tel === '') {
        return Toast('请输入手机号码') && false
      }
      if (!_reg.test(_tel)) {
        return Toast('请输入正确的手机号码') && false
      }
      return true
    },
    getDate() {
      const timeStamp = new Date()
      // 获取当前年
      const currentYear = JSON.stringify(timeStamp.getFullYear())
      // 获取当前月
      const currentMonth = JSON.stringify(timeStamp.getMonth() + 1)
      // 获取当前日
      const currentDate = JSON.stringify(timeStamp.getDate())
      const currentHour = JSON.stringify(timeStamp.getHours()) // 获取当前小时数(0-23)
      const currentMin = JSON.stringify(timeStamp.getMinutes()) // 获取当前分钟数(0-59)
      const currentSeconds = JSON.stringify(timeStamp.getSeconds())
      // 获取当前时间
      const nowTimeString =
        currentYear +
        currentMonth +
        currentDate +
        currentHour +
        currentMin +
        currentSeconds
      return nowTimeString
    },
  },
}
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  padding: 0 40px;
  .form-content {
    width: 100%;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    position: relative;
    z-index: 1;
    height: 808px;
  }
  .form-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 47px;
    > img {
      width: 48px;
      height: 2px;
      &:first-child {
        margin-right: 17px;
      }
      &:last-child {
        margin-left: 17px;
      }
    }
    > h4 {
      display: block;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 31px;
    }
  }
  .subtitle {
    display: block;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 23px;
    margin-top: 15px;
    text-align: center;
  }
  .form-content-choose {
    margin-top: 47px;
    padding-left: 40px;
    ::v-deep.sp-checkbox__label {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 27px;
    }
    ::v-deep.sp-checkbox:not(:first-child) {
      margin-top: 37px;
    }
  }
  .form-content-input-box {
    width: 100%;
    .msg-input {
      width: 100%;
      padding: 0 40px;
      height: 80px;
      position: relative;
      display: flex;
      margin-top: 31px;
      > input {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        padding: 27px 0 27px 92px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
      }
      > input::placeholder {
        color: #cccccc;
      }
      > img {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 72px;
        top: 27px;
      }
    }
    .phone-input {
      width: 100%;
      padding: 0 40px;
      position: relative;
      height: 80px;
      margin-top: 24px;
      display: flex;
      margin-top: 24px;
      > input {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        padding: 27px 0 27px 92px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
      }
      > input::placeholder {
        color: #cccccc;
      }
      > img {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 72px;
        top: 27px;
      }
    }
    .verification-input {
      width: 100%;
      padding: 0 40px;
      position: relative;
      height: 80px;
      margin-top: 24px;
      display: flex;
      margin-top: 24px;
      > input {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        padding: 27px 0 27px 92px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
      }
      > input::placeholder {
        color: #cccccc;
      }
      > img {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 72px;
        top: 27px;
      }
      .seconds {
        display: block;
        height: 80px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 27px;
        background: transparent;
        padding: 0;
        position: absolute;
        right: 74px;
      }
    }
  }
  .form-free-btn {
    padding: 0 40px;
    > button {
      width: 590px;
      height: 88px;
      background: #4974f5;
      border-radius: 8px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      margin-left: 0;
    }
  }
}
</style>
