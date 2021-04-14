<template>
  <div>
    <div class="my-component">
      <div class="form-box">
        <!-- S 表单头部 -->
        <div class="form-box-title">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/7ccgcy48cv40000.png"
          />
          <p class="form-box-title-name">{{ data.title }}</p>
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/drylv5blkoo0000.png"
          />
        </div>
        <!-- E 表单头部 -->

        <div class="form-inputs">
          <!-- S 公司类型下拉菜单-->
          <div v-if="data.needList" class="dropdown-menu">
            <a
              v-md-map
              v-md:webClick
              :data-form_name="`${data.md.pageName}_我需要`"
              class="dropdown-menu-content"
              @click="showDropdownMenu"
            >
              <span class="dropdown-menu-content-prefix">我需要</span>
              <span v-if="dropdownValue" class="dropdown-menu-content-val">
                {{ dropdownValue }}
              </span>
              <span
                v-if="!dropdownValue"
                class="dropdown-menu-content-placeholder"
              >
                请选择
              </span>
              <img
                class="dropdown-menu-content-img"
                src="https://cdn.shupian.cn/sp-pt/wap/images/4ehy9youej60000.png"
              />
            </a>
            <sp-popup v-model="dropdownMenuIsShow" round position="bottom">
              <sp-picker
                :title="'请选择' + data.needTitle"
                show-toolbar
                :default-index="Math.floor(data.needList.length / 2)"
                :columns="data.needList"
                @confirm="confirmDropdownMenu"
                @cancel="hideDropdownMenu"
              />
            </sp-popup>
          </div>
          <!-- E 公司类型下拉菜单-->

          <!-- S 城市下拉菜单-->
          <div v-if="data.cityList" class="dropdown-menu dropdown-menu-margin">
            <a
              v-md-map
              v-md:webClick
              :data-form_name="`${data.md.pageName}_城市下拉表单`"
              class="dropdown-menu-content"
              @click="showCityDropdownMenu"
            >
              <span class="dropdown-menu-content-prefix">城市</span>
              <span v-if="cityValue" class="dropdown-menu-content-val">{{
                cityValue
              }}</span>
              <span v-if="!cityValue" class="dropdown-menu-content-placeholder">
                请选择
              </span>
              <img
                class="dropdown-menu-content-img"
                src="https://cdn.shupian.cn/sp-pt/wap/images/4ehy9youej60000.png"
              />
            </a>
            <sp-popup v-model="cityMenuIsShow" round position="bottom">
              <sp-picker
                title="选择城市"
                show-toolbar
                :default-index="Math.floor(data.cityList.length / 2)"
                :columns="data.cityList"
                @confirm="confirmCityDropdownMenu"
                @cancel="hideDropdownMenu"
              />
            </sp-popup>
          </div>
          <!-- E 城市下拉菜单-->

          <!-- S 输入框-手机号码-->
          <div class="form-input-tel">
            <sp-field
              v-model="telephone"
              v-md-map
              v-md:webClick
              :data-form_name="`${data.md.pageName}_手机号`"
              label="手机号"
              type="tel"
              maxlength="11"
              :formatter="telTypingVerify"
              placeholder="信息保护中，仅官方可见"
              @focus="() => (smsInputIsShow = true)"
            />
          </div>
          <!-- E 输入框-手机号码-->

          <!-- S 输入框-验证码-->
          <div class="form-input-sms">
            <sp-field
              v-model="sms"
              v-md-map
              v-md:webClick
              :data-form_name="`${data.md.pageName}_验证码`"
              center
              label="验证码"
              type="tel"
              placeholder="请输入验证码"
              maxlength="6"
              :formatter="smsTypingVerify"
            >
              <template #button>
                <sp-button size="small" type="primary" @click="sendSms">
                  {{
                    countdown > 0 ? `${countdown}s` : '获取验证码'
                  }}</sp-button
                >
              </template>
            </sp-field>
          </div>
          <!-- E 输入框-验证码-->

          <!-- S 提交按钮-->
          <div class="form-submit">
            <sp-button
              v-md-map
              v-md:p_formSubmit
              data-form_type="咨询表单"
              :data-form_name="`${data.md.pageName}_表单`"
              type="primary"
              @click="submitForm"
              >{{ data.buttonName }}
            </sp-button>
          </div>
          <!-- E 提交按钮-->
        </div>

        <!-- S 表单注脚 -->
        <div class="form-note-all">
          <div
            v-for="(item, i) in data.subInfo"
            :key="i"
            class="form-note-item"
          >
            <div class="form-note-item-div-img">
              <img
                class="form-note-item-img"
                src="https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png"
              />
            </div>
            <span class="form-note-item-name">{{ item }}</span>
          </div>
        </div>
        <!-- E 表单注脚 -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  Popup,
  Picker,
  ActionSheet,
  Field,
  Button,
  CellGroup,
  Toast,
} from '@chipspc/vant-dgg'

export default {
  name: 'Form',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          title: '只需5秒 一键为您适配公司',
          // @--我需要公司类型下拉 有该下拉，则传，无则不传
          needList: ['有限责任公司', '股份有限公司', '无限公司'],
          needTitle: '公司类型',

          // @--城市下拉：有该下拉，则传，无则不传
          cityList: [
            '全国',
            '重庆',
            '长沙',
            '武汉',
            '上海',
            '北京',
            '深圳',
            '广州',
            '成都',
            '杭州',
            '郑州',
            '佛山',
            '东莞',
            '宜昌',
            '石家庄',
            '其他城市',
          ],

          // @--提交按钮名称
          buttonName: '立即获取',
          // @--表单备注
          subInfo: ['价格透明', '信息安全', '官方保障'],

          // @--表单提交数据
          type: 'zhgszr', // 业态编码

          // @--埋点-页面名称
          md: { pageName: '' },
        }
      },
    },
  },
  data() {
    return {
      // @--“我需要” 下拉
      dropdownValue: '',
      dropdownMenuIsShow: false,

      // @--“城市” 下拉
      cityValue: '',
      cityMenuIsShow: false,

      // @-手机号
      telephone: '',

      // @--验证码
      smsInputIsShow: false,
      sms: '', // 输入的验证码
      countdown: -1, // 发送验证码倒计时60秒
      countdownTimer: null, // 验证码定时器
    }
  },
  methods: {
    // @--下拉菜单
    // 显示 “我需要” 面板
    showDropdownMenu() {
      this.dropdownMenuIsShow = true
    },
    // 显示 “城市” 面板
    showCityDropdownMenu() {
      this.cityMenuIsShow = true
    },
    // 隐藏 “我需要”、“城市” 面板
    hideDropdownMenu() {
      this.dropdownMenuIsShow = false
      this.cityMenuIsShow = false
    },
    // 确认 “我需要” 面板
    confirmDropdownMenu(value, index) {
      this.dropdownMenuIsShow = false
      this.dropdownValue = value
    },
    // 确认 “城市” 面板
    confirmCityDropdownMenu(value, index) {
      this.cityMenuIsShow = false
      this.cityValue = value
    },

    // @--输入框输入时进行验证，只能输入符合的字符
    telTypingVerify(value) {
      return value.replace(/[^\d]/, '')
    },
    smsTypingVerify(value) {
      // 过滤输入的特殊字符及汉字
      return value.replace(/[^a-z0-9A-Z]/, '')
    },

    // @--验证码
    // 发送验证码
    sendSms() {
      const vm = this
      if (this.countdown > -1) {
        Toast('验证码已发送')
      } else {
        // 1、验证手机号
        const verifyTelResult = this.verifyTel()
        // 2、验证手机号成功发送验证码
        // 2.1 发送验证码成功，倒计时开始。2.2发送验证码失败，提示并倒计时不开始
        if (verifyTelResult) {
          const _data = {
            tel: this.telephone,
            type: 'gs',
          }
          window.promotion.privat.getSmsCode(_data, (res) => {
            // 发送成功，倒计时开始
            if (res.error === 0) {
              vm.countDownFun()
            }
            console.log(res.msg)
          })
        }
      }
    },
    // 发送验证码时，验证手机号正确格式
    verifyTel() {
      const _tel = this.telephone
      const _reg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tel === '') {
        return Toast('请输入手机号码') && false
      }
      if (!_reg.test(_tel)) {
        return Toast('请输入正确的手机号码') && false
      }
      return true
    },
    // 验证码倒计时
    countDownFun() {
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

    // @--表单提交
    // 提交按钮
    submitForm() {
      // 1、验证表单数据格式
      const _tel = this.telephone
      const _code = this.sms
      const _telReg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (this.dropdownValue === '' && this.data.needTitle === '') {
        Toast('请输入您需要的' + this.data.needTitle)
        return
      }
      if (this.data.cityList && this.cityValue === '') {
        Toast('请选择城市')
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
      const contentStr =
        this.cityValue === ''
          ? {
              yeWuLeiXing: this.dropdownValue,
            }
          : {
              yeWuLeiXing: this.dropdownValue,
              city: this.cityValue,
            }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: this.data.type, // 业态编码。固定几个业态编码。
        place: 'cd', // 定位城市。地区编码，需传编码
        device: 'wap', // 设备：pc,wap。
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh。
        smsCode: _code, // 验证码
        content: JSON.stringify(contentStr),
      }
      // 3、提交表单
      const vm = this
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 1、提示
          console.log(params)
          Toast('提交成功，请注意接听电话')
          // 2、表单主动埋点
          vm.formMaiDian()
          // 3、清空表单和清楚倒计时定时器
          vm.dropdownValue = ''
          vm.cityValue = ''
          vm.telephone = ''
          vm.sms = ''
          vm.countdown = -1
          clearInterval(vm.countdownTimer)
          vm.countdownTimer = null
        } else {
          Toast(res.msg)
          console.log(res)
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
        form_type: '咨询',
        form_name: `${this.data.md.pageName}_表单`,
      })
    },
  },
  head() {
    return {
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  position: relative;
  .form-box {
    width: 670px;
    margin: 0 auto;
    background: #ffffff;
    // border: 1px solid rgba(205, 205, 205, 0.3);
    // box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    padding: 47px 40px 32px 40px;
    width: 710px;
    border-radius: 24px;
    .form-box-title {
      margin-bottom: 47px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 48px;
        height: 2px;
      }
      .form-box-title-name {
        height: 32px;
        font-size: 32px;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 32px;
        margin: 0 15px;
      }
    }

    .form-inputs {
      .dropdown-menu {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        padding: 0 32px;
        .dropdown-menu-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          .dropdown-menu-content-prefix {
            font-size: 28px;
            font-weight: 400;
            color: #1a1a1a;
            margin-right: 33px;
            min-width: 86px;
          }
          .dropdown-menu-content-val {
            flex: none;
            font-size: 28px;
            font-weight: bold;
            color: #1a1a1a;
          }
          .dropdown-menu-content-placeholder {
            flex: none;
            font-size: 28px;
            color: #cccccc;
          }
          .dropdown-menu-content-img {
            flex: none;
            width: 20px;
            height: 11px;
            position: absolute;
            right: 0;
          }
        }
        // 穿透-遮罩
        ::v-deep .sp-popup--bottom {
          width: @spread-page-width;
          left: 50%;
          right: auto;
          margin-left: calc(-@spread-page-width / 2);
          //transform: translateX(-126px); // 该属性因为组件样式未知bug，导致左侧出来一部分。且距离是一直固定是63px，不能转成rem
        }
        ::v-deep .sp-overlay {
          width: @spread-page-width;
          left: 50%;
          right: auto;
          margin-left: calc(-@spread-page-width / 2);
        }
      }
      .dropdown-menu-margin {
        margin-top: 24px;
      }
      .form-input-tel {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        margin: 24px 0;
      }
      .form-input-sms {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        // 穿透-发送验证码按钮：固定宽高
        ::v-deep .sp-button {
          width: auto;
          height: 80px;
          background-color: transparent;
          border: none;
          font-size: 28px;
          color: #4974f5;
        }
        ::v-deep .sp-button--small {
          padding: 0px;
        }
      }
      .form-submit {
        width: 100%;
        height: 80px;
        display: flex;
        margin: 40px 0 34px 0;
        .sp-button--primary {
          font-size: 32px;
          font-weight: bold;
        }
      }
    }

    .form-note-all {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .form-note-item {
        display: flex;
        align-items: center;
        .form-note-item-div-img {
          width: 24px;
          height: 24px;
          margin-right: 13px;
          .form-note-item-img {
            display: flex;
            width: 24px;
            height: 24px;
          }
        }
        .form-note-item-name {
          font-size: 26px;
          font-weight: 400;
          color: #555555;
        }
      }
    }
  }

  // 穿透-手机号输入框：输入的字体加粗，默认的placeholder字体不加粗
  ::v-deep input {
    font-weight: bold;
  }
  ::v-deep input::-webkit-input-placeholder {
    color: #cccccc;
    font-weight: normal;
  }

  // 穿透-手机号输入框和验证码输入框
  ::v-deep .sp-cell {
    background: #f8f8f8;
    height: 80px;
    padding-right: 32px;
    font-size: 28px !important;
    // 手机号输入框-左边前缀（手机号）
    .sp-field__label {
      flex: none;
      width: auto;
      margin-right: 33px;
      color: #1a1a1a;
    }
    // 手机号输入框-右边按钮
    .sp-button__content {
      justify-content: flex-end;
    }
  }
  // 穿透-免费预约按钮：
  ::v-deep .sp-button {
    width: 100%;
    height: 80px;
    border-radius: 8px;
  }

  ::v-deep .sp-button--primary {
    border: none;
  }
}
</style>
