<template>
  <div>
    <sp-popup
      v-model="isDisplay"
      :lazy-render="false"
      @click-overlay="displayNone"
      ><div class="wrapper">
        <div class="wrapper__verify">
          <!--s 手机号弹窗标题 -->
          <h1>
            <i>
              <img
                src="https://cdn.shupian.cn/sp-pt/wap/2la00918hu00000.png"
                alt="https://cdn.shupian.cn/sp-pt/wap/2la00918hu00000.png"
              />
            </i>
            <span>注册先核名</span>
            <span>提高成功率</span>
            <i>
              <img
                src="https://cdn.shupian.cn/sp-pt/wap/f6v01c39c280000.png"
                alt="https://cdn.shupian.cn/sp-pt/wap/f6v01c39c280000.png"
              />
            </i>
          </h1>
          <!-- e 手机号弹窗标题 -->
          <p>千万补贴进行中，公司注册超值优惠</p>
          <!-- s手机号表单 -->
          <sp-cell-group>
            <!-- webClick 核名表单_手机 埋点 -->
            <sp-field
              v-model="tel"
              v-md-map
              v-md:webClick
              data-type="咨询表单"
              data-name="核名表单_手机号"
              type="tel"
              label="手机号"
              :formatter="telephoneTest"
              :maxlength="11"
              placeholder="信息保护中，请放心填写"
            />
            <!--webClick 核名表单_验证码 埋点  -->
            <sp-field
              v-model="sms"
              v-md-map
              v-md:webClick
              data-type="咨询表单"
              data-name="核名表单_验证码"
              center
              :maxlength="6"
              label="验证码"
              type="tel"
              placeholder="请输入验证码"
              :formatter="formatter"
            >
              <template #button>
                <!-- webClick 核名表单_获取验证码 埋点 -->
                <button
                  v-md-map
                  v-md:webClick
                  data-type="咨询表单"
                  data-name="核名表单_获取验证码"
                  class="sms"
                  size="small"
                  type="primary"
                  @click="onSmsCode"
                >
                  {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                </button>
              </template>
            </sp-field>
          </sp-cell-group>
          <!-- e 手机号表单 -->
          <!-- p_formSubmit 核名表单_提交表单 埋点  -->
          <sp-button
            v-md-map
            v-md:p_formSubmit
            data-form_type="咨询表单"
            data-form_name="核名表单_提交表单"
            type="primary"
            size="large"
            @click="checkFormData"
            >立即获取核名结果</sp-button
          >
        </div>
      </div></sp-popup
    >
  </div>
</template>

<script>
import { Popup, Toast, Button, Field, CellGroup } from '@chipspc/vant-dgg'
import { checkPhone } from '~/utils/check'

export default {
  name: '',
  components: {
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
  },
  props: {
    display: {
      type: Boolean,
      default: false,
    },
    details: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 验证码
      sms: '',
      // 手机号
      tel: '',
      // 发送验证码倒计时60秒
      countdown: -1,
      // 验证码定时器
      countdownTimer: null,
      cityName: '成都',
      isDisplay: false,
    }
  },
  computed: {},
  watch: {
    display(e) {
      this.isDisplay = e
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 发送验证码
    onSmsCode() {
      if (!checkPhone(this.tel)) {
        Toast('手机号格式错误')
      } else if (this.countdown > -1) {
        Toast('验证码已发送')
      } else {
        const _data = {
          tel: this.tel,
          type: 'gs',
        }
        window.promotion.privat.getSmsCode(_data, (res) => {
          // 发送成功，倒计时开始
          if (res.error === 0) {
            this.countDown()
          }
          Toast(res.msg)
        })
      }
    },
    // 倒计时
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
    // 表单提交
    checkFormData() {
      if (this.tel === '') {
        Toast('手机号不能为空')
      } else if (!checkPhone(this.tel)) {
        Toast('手机号格式有误')
      } else if (this.sms === '') {
        Toast('验证码不能为空')
      } else {
        // 整合未登录时表单数据
        const webUrl = window.location.href
        const fromId = this.getDate() + this.tel // 生成表单唯一识别id 当前时间 +手机号
        const contentStr = {
          hangyeleixing: this.details.industry,
          gongsimingcheng: this.details.companyName,
        }
        const params = {
          name: '匿名客户',
          fromId, // 唯一ID提交资源中心
          tel: this.tel, // 手机号
          url: webUrl, // 页面url
          type: 'gsys', // 业态编码
          place: this.details.cityCode, // 城市
          device: 'wap', // 设备：pc,wap
          web: 'SP', // 归属渠道：xmt,zytg,wxgzh
          smsCode: this.sms, // 验证码
          content: JSON.stringify(contentStr), // 公司名 行业
        }
        window.promotion.privat.consultForm(params, (res) => {
          if (res.error === 0) {
            // 这里写表单提交成功后的函数，如二级表单弹出，提示提交成功，清空DOM中表单的数据等
            Toast('提交成功，请注意接听电话')
            this.tel = ''
            this.countdown = -1
            clearInterval(this.countdownTimer)
            this.countdownTimer = null
            this.sms = ''
            const vla = {
              Dis: false,
            }
            this.$emit('DisplayNone', vla)
            // this.display = false
            window.spptMd.spptTrackRow('p_formSubmitResult', {
              dataEven_name: 'p_formSubmitResult',
              dataForm_type: '咨询表单',
              dataForm_name: '核名表单_提交表单',
            })
          } else {
            this.countdown = -1
            Toast(res.msg)
            if (res.error === 1) {
              this.sms = ''
            }
          }
        })
      }
    },
    displayNone() {
      const vla = {
        Dis: false,
      }
      this.$emit('DisNone')
    },
    // 选中样式
    onStyle(data, value) {
      data.forEach((obj) => {
        if (obj.name === value) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },
    // 手机号过滤
    telephoneTest(value) {
      return value.replace(/[^\d]/, '')
    },
    // 验证码过滤
    formatter(value) {
      // 过滤输入的特殊字符及汉字
      return value.replace(/[^a-z0-9A-Z]/, '')
    },

    // 获取当前时间
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 28px;
  text-align: center;
  &__verify {
    background-color: #ffffff;
    width: 670px;
    height: 542px;
    border-radius: 4px;
    padding: 0 40px;
    z-index: 100;
    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      margin-top: 48px;
      i {
        margin: 0 16px;
        img {
          height: 2px;
          width: 48px;
        }
      }
    }
    p {
      color: #555;
      font-size: 24px;
      font-weight: 400;
      margin-top: 19px;
    }
    .sp-cell-group {
      margin-top: 48px;
      display: flex;
      flex-direction: column;
      .sp-cell {
        height: 80px;
        width: 590px;
        background-color: #f8f8f8;
        ::v-deep .sp-field__label {
          width: auto;
        }
        &::after {
          border: 0 solid transparent;
        }
      }
      .sp-cell::after {
        border: 0 solid transparent !important;
      }
      .sp-cell--center {
        margin-top: 24px;
        ::v-deep .sms {
          background-color: transparent;
          border: 0;
          color: #4974f5;
          font-size: 28px;
          font-weight: 400;
          margin: 0;
          height: 88px;
          padding: 0 34px;
        }
      }
      &::after {
        border: 0px solid transparent;
      }
    }
    .sp-button--primary {
      margin-top: 40px;
      height: 88px;
      border-right: 8px;
      font-size: 32px;
      font-weight: bold;
    }
  }
}
</style>
