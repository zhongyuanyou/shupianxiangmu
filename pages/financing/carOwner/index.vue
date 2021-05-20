<template>
  <div class="car-owner">
    <Head title="车主贷"></Head>
    <!-- banner图展示 -->
    <div class="banner">
      <sp-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(item, idx) in imgList" :key="idx"
          ><img :src="item.img" alt=""
        /></sp-swipe-item>
      </sp-swipe>
    </div>
    <!-- 表单 -->
    <div class="from-box">
      <div class="from-list">
        <!-- 姓名 -->
        <div class="list-content">
          <span class="title">姓名</span>
          <input v-model="name" type="text" placeholder="请输入姓名" />
          <div class="gender-box">
            <span
              v-for="(sex, idx) in sexList"
              :key="idx"
              :class="idx === actived ? 'active' : ''"
              @click="choose(idx)"
              >{{ sex }}</span
            >
          </div>
        </div>
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
              @click.native="onLeftClick"
            ></my-icon>
          </div>
        </div>
        <!-- 额度 -->
        <div class="list-content">
          <span class="title">额度</span>
          <input
            v-model="lines"
            type="number"
            placeholder="请输入额度"
            class="lines-input"
          />
          <span class="unit">万元</span>
        </div>
        <!-- 电话号码 -->
        <div class="list-content">
          <span class="title">手机号</span>
          <input
            v-model="phone"
            type="number"
            placeholder="请输入手机号"
            class="phone-input"
          />
        </div>
        <!-- 获取验证码 -->
        <div class="list-content">
          <span class="title">验证码</span>
          <input
            v-model="sms"
            type="number"
            placeholder="输入短信校验码"
            class="sms-input"
          />
          <div class="line"></div>
          <span class="verification" @click="onSms">{{ test }}</span>
        </div>
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
import { Swipe, SwipeItem, Picker, Popup, Toast } from '@chipspc/vant-dgg'

import Head from '@/components/financing/common/Header'

export default {
  components: {
    Head,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  props: {
    imgList: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/2oggsns53y80000.png',
            url: '', // 外链
            iosUrl: '', // 内链接ios
            adrUrl: '', // 内链安卓链接
            wapUrl: '', // wap内链
          },
        ]
      },
    },
  },
  data() {
    return {
      name: '', // 用户姓名
      city: '', // 所造城市
      lines: '', // 申请额度
      phone: '', // 用户电话
      sms: '', // 验证码
      test: '获取验证码',
      sexList: ['先生', '女生'],
      actived: 0,
      columns: [
        // 第一列
        {
          values: ['成都市', '南充市', '绵阳市', '北京市', '上海市'],
          defaultIndex: 2,
        },
        // 第二列
        {
          values: ['锦江区', '西充', '游仙区', '北京市', '上海市'],
          defaultIndex: 1,
        },
      ],
      pickerShow: false,
    }
  },
  computed: {
    isShow() {
      if (this.name && this.city && this.lines && this.phone && this.sms) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
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
    // 验证码 发送前验证
    onSms() {
      const _tel = this.phone
      const _reg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tel === '') {
        return Toast('请输入手机号码')
      }
      if (!_reg.test(_tel)) {
        return Toast('请输入正确手机号码')
      }
      const setData = {
        tel: _tel,
        // type: 'gs',
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
    onForm() {
      // let _name = $(ID).find('input[name="name"]').val()
      const _city = this.city
      const _name = this.name
      const _tel = this.phone
      const _code = this.sms
      const _telReg = /^1[3,4,5,6,7,8,9]\d{9}$/
      const webUrl = window.location.href
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      //   if (!_city) {
      //     Toast('请选择办理城市')
      //     return
      //   }
      //   if (!_name) {
      //     Toast('')
      //     return
      //   }
      //   if (!_tel) {
      //     Toast('请输入电话号码')
      //     return
      //   }
      //   if (!_telReg.test(_tel)) {
      //     Toast('请输入正确的电话号码')
      //     return
      //   }
      //   if (!_code) {
      //     Toast('请输入验证码')
      //     return
      //   }
      // 若一级表单中存在二级属性字段（如公司名称、类别等）时，需将之放入对象，并转化为json字符串，在content属性中传入，这样即使用户没有提交二级表单也能把相关属性传入，若有二级表单，也和二级表单提交的属性不冲突
      const contentStr = {
        name: _name,
      }

      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名用户', // 姓名
        tel: _tel, // 电话
        url: webUrl, // 链接
        // type: 'gszc', // 业态编码
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
          this.city = ''
          this.name = ''
          this.sms = ''
          this.phoneV = ''
          this.test = '获取验证码'
          // 表单成功买点
          //   window.spptMd.spptTrackRow('p_formSubmitResult', {
          //     even_name: 'p_formSubmitResult',
          //     form_type: '咨询表单',
          //     form_name: '工商注册表单_提交',
          //   })
        } else {
          // ------------
          Toast('验证码错误,请重试')
        }
      })
    },
    choose(idx) {
      this.actived = idx
    },
    chooseShow() {
      this.pickerShow = true
    },
    // 贷款期限弹出层确认按钮
    onConfirm(value, index) {
      this.city = value
      this.pickerShow = false
    },
    // 贷款期限切换方法
    onChange(picker, value, index) {
      this.city = value
      this.pickerShow = false
    },
    // 贷款期限弹出层取消按钮
    onCancel() {
      this.pickerShow = false
    },
    send() {
      console.log('发送验证码')
    },
    calculate() {},
  },
}
</script>
<style lang="less" scoped>
.car-owner {
  width: 750px;
  margin: 0 auto;
  ::v-deep.my-head {
    width: 750px !important;
    position: fixed !important;
    left: 50% !important;
    margin-left: -375px !important;
  }
  .banner {
    width: 750px;
    height: 300px;
    background: #d8d8d8;
    .my-swipe .sp-swipe-item {
      font-size: 20px;
      height: 300px;
      text-align: center;
      border-radius: 12px;
      background: #dddddd;
      > img {
        width: 100%;
        height: 100%;
        //   object-fit: cover;
      }
    }
  }
  .from-box {
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    .from-list {
      width: 750px;
      height: 100%;
      background: #ffffff;
      padding: 0 40px;
      .list-content {
        height: 120px;
        width: 100%;
        border-bottom: 1px solid #f4f4f4;
        font-size: 0;
        display: flex;
        align-items: center;
        > span {
          display: block;
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
          margin-left: 24px;
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
          }
        }
        .icon-box {
          width: 18px;
          height: 32px;
          //   background: #cccccc;
          margin-left: 47px;
        }
        .city-input {
          width: 418px;
        }
        .unit {
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 32px;
          margin-left: 40px;
        }
        .lines-input {
          width: 378px;
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
