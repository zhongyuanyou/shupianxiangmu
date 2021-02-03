<template>
  <div class="appointment">
    <div class="form-box">
      <!-- form标题 -->
      <div class="form-title">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/5rtqnsscx540000.png"
          alt=""
        />
        获取注销方案
      </div>
      <!-- 表单内容 -->
      <div class="input-box">
        <!-- 需求弹出框 -->
        <Field
          v-model="need"
          v-md-map
          v-md:webClick
          data-form_type="咨询表单"
          data-form_name="工商注销表单_下拉表单"
          type="text"
          :readonly="true"
          :bold="true"
          :disabled="showPicker"
          @click="popupShow"
        >
          <template #left>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/3cghp0948bk0000.png"
              alt=""
            />
            我需要
          </template>
          <template #right>
            <Icon
              name="shop_ic_open"
              color="#999999"
              size="0.2rem"
              class="icon"
            />
            <div class="icon-placeholder"></div>
          </template>
        </Field>
        <!-- 手机输入框 -->
        <Field
          v-model="tel"
          v-md-map
          v-md:webClick
          data-form_type="咨询表单"
          data-form_name="工商注销表单_手机号"
          type="tel"
          :max="11"
          :formatter="telControl"
          placeholder="留下手机号，接收注销方案"
        >
          <template #left>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/8p0w0siuw2c0000.png"
              alt=""
            />
            手机号
          </template>
        </Field>
        <!-- 获取验证码 -->
        <Field
          v-model="shortMessage"
          v-md-map
          v-md:webClick
          data-form_type="咨询表单"
          data-form_name="工商注销表单_验证码"
          type="tel"
          :max="6"
          placeholder="请输入验证码"
          :formatter="messageControl"
        >
          <template #left>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/1vz03tpvugps000.png"
              alt=""
            />
            验证码
          </template>
          <template #right>
            <!-- 验证 / 倒计时 -->
            <a href="javascript:;" class="a-clear">
              <span
                v-md-map
                v-md:webClick
                data-form_type="咨询表单"
                data-form_name="工商注销表单_获取验证码"
                class="seconds"
                @click="sendCount"
                >{{ countDown > 0 ? `${countDown}s` : '获取验证码' }}</span
              >
            </a>
          </template>
        </Field>
        <!-- 表单提交按钮 -->
        <button
          v-md-map
          v-md:p_formSubmit
          data-form_type="咨询表单"
          data-form_name="工商注销表单_提交表单"
          class="form-btn"
          @click="submit"
        >
          立即获取方案
        </button>
      </div>
      <!-- 标签 -->
      <div class="tags">
        <div class="tag-item">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/a7w01nu2nmo0000.png"
            alt=""
          />
          <span>快速通道</span>
        </div>
        <div class="tag-item">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/a7w01nu2nmo0000.png"
            alt=""
          />
          <span>信息安全</span>
        </div>
        <div class="tag-item">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/a7w01nu2nmo0000.png"
            alt=""
          />
          <span>官方服务</span>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <sp-popup v-model="showPicker" position="bottom" round>
      <sp-picker
        ref="picker"
        show-toolbar
        title="我需要"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </sp-popup>
    <!-- 表单提交成功弹出框 -->
    <Dialog />
  </div>
</template>
<script>
import { Toast, Popup, Picker } from '@chipspc/vant-dgg'
import Icon from '~/components/common/myIcon/MyIcon.vue'
import Field from '~/components/spread/businessCancellation/Field.vue'
import Dialog from '~/components/spread/common/Dialog'
export default {
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
    Field,
    Icon,
    Dialog,
  },
  data() {
    return {
      // 需求框内容
      need: '公司注销',
      // 电话内容
      tel: '',
      // 验证码内容
      shortMessage: '',
      // 验证码倒计时
      countDown: -1,
      // 倒计时定时器
      countDownTimer: null,
      // 需求框选择内容
      columns: ['公司注销', '简易注销', '个体注销', '工商注销', '其他注销'],
      // 弹出框状态
      showPicker: false,
    }
  },
  beforeDestroy() {
    // 清除倒计时定时器
    clearInterval(this.countDownTimer)
  },
  methods: {
    // 弹出框
    popupShow() {
      this.showPicker = true
      const inputDom = document.getElementsByTagName('input')
      inputDom.forEach((item) => {
        item.blur()
      })
    },
    // 弹出框点击确定
    onConfirm(val) {
      this.need = val
      this.showPicker = false
    },
    // 手机输入控制
    telControl(val) {
      return val.replace(/[^0-9]/g, '')
    },
    // 手机验证函数
    telValidate() {
      const _reg = /^1[3-9]\d{9}$/
      if (!this.tel) {
        return Toast('请输入手机号') && false
      }
      if (!_reg.test(this.tel)) {
        return Toast('请输入正确的手机号') && false
      }
      return true
    },
    // 验证码输入控制
    messageControl(val) {
      return val.replace(/[^a-z0-9A-Z]/g, '')
    },
    // 发送验证码
    sendCount() {
      const vm = this
      if (this.countDown === -1) {
        // 1. 验证手机号
        const telRes = this.telValidate()
        // 2. 验证成功发送验证码
        // 2.1 送验证码成功，倒计时开始   2.2发送验证码失败，提示并倒计时不开始
        if (telRes) {
          const _data = {
            tel: this.tel,
            type: 'gs',
          }
          window.promotion.privat.getSmsCode(_data, (res) => {
            if (res.error === 0) {
              vm.countStart()
            }
          })
        }
      }
    },
    // 倒计时函数
    countStart() {
      clearInterval(this.countDownTimer)
      this.countDown = 60
      this.countDownTimer = setInterval(() => {
        if (this.countDown === 0) {
          this.countDown = -1
          clearInterval(this.countDownTimer)
          this.countDownTimer = null
        } else {
          this.countDown > 0 && this.countDown--
        }
      }, 1000)
    },
    // 表单提交
    submit() {
      // 1. 验证格式
      const vm = this
      const _tel = this.tel
      const _code = this.shortMessage
      const _telReg = /^1[3-9]\d{9}$/
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
      // 2. 整合表单数据
      const webUrl = window.location.href
      // 唯一标识：时间 + 手机号
      const formId = this.getDate() + _tel
      const contentStr = {
        industry: this.need,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'zhzxyw', // 业态编码。
        place: 'cd', // 定位城市。
        device: 'wap', // 设备：pc,wap。
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh。
        smsCode: _code, // 验证码
        content: JSON.stringify(contentStr),
      }
      // 提交表单
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 提交成功，清空DOM中表单的数据
          this.tel = ''
          this.shortMessage = ''
          this.countDown = -1
          if (this.need !== '公司注销') {
            this.$refs.picker.setColumnValue(0, '公司注销')
          }
          this.need = '公司注销'
          window.spptMd.spptTrackRow('p_formSubmitResult', {
            even_name: 'p_formSubmitResult',
            form_type: '咨询表单',
            form_name: '工商注销表单_提交表单',
          })
          this.$root.$emit('Dialog')
          clearInterval(vm.countDownTimer)
          vm.countDownTimer = null
        } else {
          Toast(res.msg)
          this.shortMessage = ''
          this.countDown = -1
        }
      })
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
.appointment {
  width: 100%;
  padding-bottom: 32px;
  background: transparent;
}
.form-box {
  position: relative;
  width: 670px;
  margin: 0 auto;
  margin-top: -80px;
  padding: 48px 39px 24px 41px;
  background: #ffffff;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  z-index: 10;
}
.form-title {
  position: relative;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #1a1a1a;
  line-height: 1;
  text-align: center;
  margin-bottom: 48px;
  > img {
    position: absolute;
    left: 75px;
    top: 50%;
    width: 440px;
    transform: translateY(-50%);
  }
}
.input-box {
  width: 100%;
}
.seconds {
  font-size: 28px;
  font-weight: 400;
  color: #4974f5;
  margin-right: 26px;
}
.form-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 88px;
  background: #4974f5;
  border-radius: 8px;
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 48px;
}
.tags {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  padding: 0px 23px;
  .tag-item {
    display: flex;
    align-items: center;
    height: 24px;
    > img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }
    > span {
      display: block;
      font-size: 24px;
      font-weight: 400;
      color: #555555;
      line-height: 1;
    }
  }
}
.a-clear {
  text-decoration: none;
  color: inherit;
}
.icon-placeholder {
  width: 24px;
}
::v-deep .sp-overlay {
  width: @spread-page-width !important;
  left: 50%;
  transform: translateX(-50%);
}
::v-deep .sp-popup--bottom {
  width: @spread-page-width !important;
  left: 50%;
  margin-left: calc(-1 / 2 * @spread-page-width);
}
::v-deep .sp-popup--bottom.sp-popup--round {
  border-radius: 24px 24px 0 0;
}
</style>
