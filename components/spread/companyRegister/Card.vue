<template>
  <div class="card">
    <div class="card-content">
      <h3>免费查询公司名称能否注册</h3>
      <!--      <a-->
      <!--        v-md-map-->
      <!--        v-md:webClick-->
      <!--        data-form_name="工商注册_表单_我需要"-->
      <!--        data-form_type="咨询表单"-->
      <!--      >-->
      <!--        <sp-cell-->
      <!--          title-class="down-left"-->
      <!--          :border="false"-->
      <!--          :value-class="-->
      <!--            selectValue == '请选择' ? 'down-right' : 'down-right&#45;&#45;active'-->
      <!--          "-->
      <!--          :value="selectValue"-->
      <!--          is-link-->
      <!--          arrow-direction="down"-->
      <!--          title="注册类型"-->
      <!--          @click="downShow = true"-->
      <!--        >-->
      <!--        </sp-cell-->
      <!--      ></a>-->
      <!--      <sp-action-sheet-->
      <!--        v-model="downShow"-->
      <!--        :actions="actions"-->
      <!--        @select="onSelect"-->
      <!--      />-->

      <div class="input-phone">
        <!-- S 公司名称输入框-->
        <sp-cell-group>
          <sp-field
            v-model="companyName"
            v-md-map
            v-md:webClick
            data-form_name="工商注册表单_手机号"
            data-form_type="咨询表单"
            :border="false"
            maxlength="20"
            label="公司名称"
            placeholder="请输入公司名称"
            label-class="style-phone"
            @input="inputCompanyName"
          ></sp-field>
        </sp-cell-group>
        <!-- E 公司名称输入框-->

        <!-- S 手机号输入框-->
        <sp-cell-group class="phoneInput">
          <sp-field
            v-model="phoneValue"
            v-md-map
            v-md:webClick
            data-form_name="工商注册表单_手机号"
            data-form_type="咨询表单"
            type="tel"
            :border="false"
            maxlength="11"
            label="手机号"
            placeholder="留下手机号，接收查询结果"
            label-class="style-phone"
            @input="inputPhone($event)"
          ></sp-field>
        </sp-cell-group>
        <!-- E 手机号输入框-->

        <!-- S 验证码输入框-->
        <div class="input-verification">
          <sp-field
            v-model="sms"
            v-md-map
            v-md:webClick
            data-form_name="工商注册表单_验证码"
            data-form_type="咨询表单"
            type="tel"
            maxlength="6"
            label="验证码"
            placeholder="请输入验证码"
            label-class="style-phone"
            @input="inputVal($event)"
          >
            <template #button>
              <a
                v-md:webClick
                v-md-map
                data-form_name="工商注册表单_获取验证码"
                data-form_type="咨询表单"
              >
                <span class="verification" @click="onSms">{{ test }}</span>
              </a>
            </template>
          </sp-field>
        </div>
        <!-- E 验证码输入框-->
      </div>

      <!-- S 提交按钮-->
      <div
        v-md:p_formSubmit
        v-md-map
        data-even_name="p_formSubmit"
        data-form_name="工商注册表单_提交表单"
        data-form_type="咨询表单"
        class="button"
      >
        <sp-button type="primary" block size="small" @click="onForm"
          >立即查询</sp-button
        >
      </div>
      <!-- E 提交按钮-->

      <div class="flow">
        <span>
          <my-icon
            class-prefix="sp-iconfont"
            name="details_ic_Completed"
            size="14px"
            color="#00B365"
          />
          流程透明
        </span>
        <span>
          <my-icon
            class-prefix="sp-iconfont"
            size="14px"
            color="#00B365"
            name="details_ic_Completed"
          />
          信息安全
        </span>
        <span>
          <my-icon
            class-prefix="sp-iconfont"
            size="14px"
            color="#00B365"
            name="details_ic_Completed"
          />
          平台服务
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Image,
  Cell,
  CellGroup,
  ActionSheet,
  Toast,
  Icon,
  Field,
  Button,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      selectValue: '请选择',
      companyName: '',
      phoneValue: '',
      sms: '',
      test: '获取验证码',
      downShow: false,
      actions: [{ name: '个体注册' }, { name: '企业注册' }],
    }
  },
  methods: {
    inputCompanyName(val) {
      this.companyName = val.replace(
        /[^\dA-Za-z\u3007\u4E00-\u9FCB\uE815-\uE864]/,
        ''
      )
    },
    inputVal(val) {
      this.sms = this.sms.replace(/[^0-9A-Za-z]/g, '')
    },
    inputPhone(val) {
      this.phoneValue = val.replace(/[^\d]/g, '')
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.downShow = false
      this.selectValue = item.name
      this.actions.forEach((element) => {
        if (element.name === this.selectValue)
          element.className = 'action-style'
        else element.className = ''
      })
    },
    // 验证码 发送前验证
    onSms() {
      const _tel = this.phoneValue
      const _reg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tel === '') {
        return Toast('请输入手机号码')
      }
      if (!_reg.test(_tel)) {
        return Toast('请输入正确手机号码')
      }
      const setData = {
        tel: _tel,
        type: 'gs',
      }
      this.getMsg(setData)
    },
    // 发送验证码
    getMsg(setData) {
      if (this.test === '获取验证码') {
        window.promotion.privat.getSmsCode(setData, (res) => {
          if (res.error === 0) {
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
            return false
          }
          Toast(res.msg)
        })
      }
    },
    // 后台规定获取当前时间作为json字符串，来当做一个唯一标识
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
    onForm() {
      // let _name = $(ID).find('input[name="name"]').val()
      const _city = 'cd'
      const _companyName = this.companyName
      const _tel = this.phoneValue
      const _code = this.sms
      const _telReg = /^1[3,4,5,6,7,8,9]\d{9}$/
      const webUrl = window.location.href
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      if (!_city) {
        Toast('请选择办理城市')
        return
      }
      if (!_companyName) {
        Toast('请输入公司名称')
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
      // 若一级表单中存在二级属性字段（如公司名称、类别等）时，需将之放入对象，并转化为json字符串，在content属性中传入，这样即使用户没有提交二级表单也能把相关属性传入，若有二级表单，也和二级表单提交的属性不冲突
      const contentStr = {
        // companyRegister: this.selectValue,
        companyName: _companyName,
      }
      console.log(contentStr)
      // if (contentStr.companyRegister === '请选择') {
      //   Toast('请选择注册类型')
      //   return
      // }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名用户', // 姓名
        tel: _tel, // 电话
        url: webUrl, // 链接
        type: 'gszc', // 业态编码
        place: _city, // 地区编码（需传编码）cd
        device: 'wap', // 设备：pc,wap
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh
        smsCode: _code, // 验证码
        content: JSON.stringify(contentStr), // 二级属性
      }
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 这里写表单提交成功后的函数，如二级表单弹出，提示提交成功，清空DOM中表单的数据等
          // Toast('提交成功，请注意接听电话')
          this.$root.$emit('Dialog')
          clearInterval(this.time)
          this.selectValue = '请选择'
          this.companyName = ''
          this.sms = ''
          this.phoneValue = ''
          this.test = '获取验证码'
          this.onSelect({ name: '请选择' })
          // 表单成功买点
          window.spptMd.spptTrackRow('p_formSubmitResult', {
            even_name: 'p_formSubmitResult',
            form_type: '咨询表单',
            form_name: '工商注册表单_提交',
          })
        } else {
          // ------------
          Toast('验证码错误,请重试')
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.card {
  position: relative;
  margin-top: -75px;
  .card-content {
    margin: 8px auto;
    border-radius: 8px;
    width: 670px;
    background-color: #fff;
    display: block;
    position: relative;
    padding: 0 40px 34px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    text-align: center;
    h3 {
      font-size: 32px;
      height: 110px;
      line-height: 110px;
      padding: 0 10px;
      color: #1a1a1a;
      &:before {
        content: '';
        display: inline-block;
        width: 48px;
        height: 2px;
        margin-right: 14px;
        vertical-align: middle;
        background: linear-gradient(to left, #918f8f, #fff);
      }
      &::after {
        content: '';
        display: inline-block;
        width: 48px;
        height: 2px;
        margin-left: 14px;
        vertical-align: middle;
        background: linear-gradient(to right, #918f8f, #fff);
      }
    }
    // 表单下拉
    .sp-cell {
      background-color: #f8f8f8;
      border-radius: 5px;
      padding: 16px 16px;
      .down-left {
        display: inline-block !important;
        margin: 0 16px 0 10px;
        color: #1a1a1a;
        flex: 0 0 22%;
      }
      .down-right {
        display: inline-block;
        color: #cccccc;
        text-align: left;
      }
      .down-right--active {
        display: inline-block;
        font-weight: bold;
        width: 166px !important;
        color: #1a1a1a;
        text-align: left;
      }
    }
    ::v-deep.input-phone,
    .input-verification {
      .sp-hairline--top-bottom::after {
        border-width: 0 0;
      }
      margin: 24px 0 40px 0;
      .style-phone {
        width: 120px;
        margin-right: 8px;
        text-align: left;
        color: #1a1a1a;
      }
      //输入框
      .sp-field__control {
        &::-webkit-input-placeholder {
          font-size: 28px;
          font-weight: 400;
          color: #cccccc;
          line-height: 44px;
        }
      }
      .phoneInput {
        margin-top: 24px !important;
      }
    }
    ::v-deep.input-verification {
      .sp-field__button {
        text-align: center;
        width: 162px;
        font-size: 28px;
        font-weight: 400;
        color: #4974f5;
      }
    }
    ::v-deep .button {
      .sp-button {
        padding: 44px 0;
        width: 594px;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
      }
    }

    ::v-deep.flow {
      font-size: 26px;
      color: #555555;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      padding: 34px 19px 0 19px;
    }
    ::v-deep .sp-overlay,
    .sp-popup--bottom {
      margin-left: -375px;
      width: @spread-page-width;
      left: 50%;
      padding: 0 40px;
      padding-top: 10px;
      .sp-action-sheet__item {
        background: transparent;
      }
      // 选择样式
      .action-style {
        color: #5a79e8;
        font-weight: bold;
      }
    }
  }
  // 跳转冲突解决
  ::v-deep .sp-cell__title {
    flex: none;
  }
}
</style>
