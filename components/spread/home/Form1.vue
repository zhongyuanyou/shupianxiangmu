<template>
  <div>
    <div class="my-component">
      <div class="form-content">
        <!-- S 表单头部 -->
        <div class="form-title">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/36v8fqlnh5y0000.png"
            alt=""
          />
          <h4>公司必备合同 限时免费领取中</h4>
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/4nq906nfv760000.png"
            alt=""
          />
        </div>
        <span class="subtitle">勾选你需要的合同</span>
        <!-- E 表单头部 -->

        <!-- S 多选项 -->
        <div class="form-content-choose">
          <sp-checkbox-group v-model="checkboxResult">
            <sp-checkbox
              v-for="(key, val) in checkboxList"
              :key="val"
              v-md-map
              v-md:webClick
              :data-form_name="`工商聚合页_表单_复选框_${key}`"
              :name="val"
              icon-size="16px"
              >{{ key }}</sp-checkbox
            >
          </sp-checkbox-group>
        </div>
        <!-- E 多选项 -->

        <!-- S 多个输入框 -->
        <div class="form-content-input-box">
          <!-- 其他税务问题输入框 -->
          <div class="msg-input">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/3zxevanw4ag0000.png"
              alt=""
            />
            <input
              v-model="other"
              v-md-map
              v-md:webClick
              type="text"
              data-form_name="工商聚合页_表单_其他税务问题"
              placeholder="若需要其它合同，请在此处填写"
              maxlength="20"
              @input="otherTypingVerify"
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
              data-form_name="工商聚合页_表单_手机号码"
              placeholder="留下手机号，接收合同文件"
              maxlength="11"
              @input="phoneTypingVerify"
            />
          </div>

          <!-- 验证码输入框 -->
          <div class="verification-input">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/coz2sgfmhvk0000.png"
              alt=""
            />
            <input
              v-model="sms"
              v-md-map
              v-md:webClick
              type="tel"
              data-form_name="工商聚合页_表单_验证码"
              placeholder="请输入验证码"
              maxlength="6"
              @input="smsTypingVerify"
            />
            <button
              v-md-map
              v-md:webClick
              class="seconds"
              data-form_name="工商聚合页_表单_获取验证码"
              @click="sendSms"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </div>
        </div>
        <!-- E 输入框 -->

        <!-- S 提交按钮 -->
        <div class="form-free-btn">
          <button
            v-md-map
            v-md:p_formSubmit
            data-event_name="p_formSubmit"
            data-form_type="咨询表单"
            data-form_name="工商聚合页_表单_表单提交"
            @click="freeBtn"
          >
            立即领取
          </button>
        </div>
        <!-- E 提交按钮 -->
      </div>
    </div>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Toast } from '@chipspc/vant-dgg'
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Toast.name]: Toast,
  },
  data() {
    return {
      // @--其他合同输入框
      other: '',
      // @--手机号输入框
      phone: '',

      // @--验证码输入框
      sms: '', // 验证码
      countdown: -1, // 发送验证码倒计时
      countdownTimer: null,

      // @--多选项
      checkboxList: {
        1: '开办公司合同(出资协议/劳动合同/公司章程)',
        2: '合伙协议(经营协议/投资协议)',
        3: '股东合同(增资扩股协议/章程修正案)',
        4: '行业合同方案(金融/房地产/教育培训等)',
      },
      checkboxResult: [], // 选中后的值
    }
  },
  methods: {
    // @--输入框输入时进行验证，只能输入符合的字符
    otherTypingVerify() {
      this.other = this.other.replace(
        /[^\dA-Za-z\u3007\u4E00-\u9FCB\uE815-\uE864]/g,
        ''
      )
    },
    phoneTypingVerify() {
      this.phone = this.phone.replace(/[^\d]/g, '')
    },
    smsTypingVerify() {
      this.sms = this.sms.replace(/[^a-z0-9A-Z]/g, '')
    },

    // @--验证码
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
    // 发送验证码
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

    // @--表单提交
    // 提交按钮
    freeBtn() {
      // 1、表单验证
      const _checkboxResult = this.checkboxResult
      const _tel = this.phone
      const _sms = this.sms
      const _telReg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_checkboxResult.length === 0) {
        Toast('请勾选合同')
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
      if (!_sms) {
        Toast('请输入验证码')
        return
      }

      // 2、整合表单数据
      const webUrl = window.location.href
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      // 多选项以逗号分割字符串
      const arr = []
      let checkboxResultStr = ''
      this.checkboxResult.forEach((item) => {
        arr.push(this.checkboxList[item])
      })
      checkboxResultStr = arr.join(',')

      const contentStr = {
        heTong: checkboxResultStr,
        qiTaWenTi: this.other,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名用户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'gszc', // 业态编码。
        place: 'cd', // 定位城市。
        device: 'wap', // 设备：pc,wap。
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh。
        smsCode: _sms, // 验证码
        content: JSON.stringify(contentStr),
      }
      // 3、提交表单
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 1、提交成功后，主动埋点
          this.formMaiDian()
          // 2、提交成功后，清除表单数据
          this.phone = ''
          this.sms = ''
          this.countdown = -1
          this.other = ''
          this.checkboxResult = []
          clearInterval(this.countdownTimer)
          this.countdownTimer = null
          // 3、提示
          this.$root.$emit('Dialog')
        } else {
          // 1、提示
          Toast(res.msg)
          // 2、验证码清0重新发送
          this.sms = ''
          this.countdown = -1
          clearInterval(this.countdownTimer)
          this.countdownTimer = null
        }
      })
    },
    // 获取唯一的formId
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
    // 表单提交有结果后，主动埋点
    formMaiDian() {
      window.spptMd.spptTrackRow('p_formSubmitResult', {
        even_name: 'p_formSubmitResult',
        form_type: '咨询表单',
        form_name: '工商首页表单_提交表单',
      })
    },
  },
}
</script>

<style scoped lang="less">
.my-component {
  width: 100%;
  padding: 0 40px;
  font-family: PingFang SC;
  .form-content {
    width: 100%;
    padding: 48px 0;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    position: relative;
    // @--头部
    .form-title {
      display: flex;
      justify-content: center;
      align-items: center;
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
        font-weight: bold;
        color: #1a1a1a;
        line-height: 31px;
      }
    }
    .subtitle {
      display: block;
      font-size: 24px;
      font-weight: 400;
      color: #999999;
      line-height: 23px;
      margin-top: 15px;
      text-align: center;
    }

    // @--多选项
    .form-content-choose {
      margin-top: 47px;
      padding-left: 40px;
      ::v-deep .sp-checkbox__label {
        font-size: 28px;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 27px;
      }
      ::v-deep .sp-checkbox:not(:first-child) {
        margin-top: 37px;
      }
    }

    // @--多个输入框
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

    // @--提交按钮
    .form-free-btn {
      padding: 0 40px;
      > button {
        width: 590px;
        height: 88px;
        background: #4974f5;
        border-radius: 8px;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        margin-left: 0;
      }
    }
  }
}
</style>
