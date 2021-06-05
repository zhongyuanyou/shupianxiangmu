<template>
  <div class="container_body">
    <div
      class="container_header"
      :style="
        isInApp && appType === 'Android'
          ? 'padding-top:20px;height:64px'
          : isInApp && appType === 'IOS'
          ? 'height:90px'
          : ''
      "
    >
      <my-icon
        name="nav_ic_back"
        size="0.4rem"
        color="#1A1A1A"
        class="container_header_icon"
        @click.native="goBack"
      ></my-icon>
      <div class="container_header_title">
        {{ title }}
      </div>
    </div>
    <!-- <div v-if="imgList.length !== 0" class="banner"> -->
    <div
      v-show="
        imgList && imgList.length > 1 && JSON.stringify(imgList[0]) != '{}'
      "
      class="banner"
    >
      <sp-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="#4974F5"
        :show-indicators="imgList.length > 1"
      >
        <sp-swipe-item v-for="(item, idx) in imgList" :key="idx"
          ><img :src="item.img" alt=""
        /></sp-swipe-item>
      </sp-swipe>
    </div>
    <div class="container_form">
      <sp-form @submit="onSubmit">
        <sp-field
          v-model="firmName"
          name="公司名称"
          label="公司名称"
          placeholder="请输入公司名称"
          maxlength="30"
        />
        <sp-field
          v-model="proNum"
          name="知产数量"
          label="知产数量"
          placeholder="请选择拥有数量"
          right-icon="arrow"
          readonly
          @click="showPopup"
        />
        <!-- :rules="[{ required: true, message: '请填写密码' }]" -->
        <sp-field
          v-if="!userPhone"
          v-model="phoneNum"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          maxlength="11"
        />
        <sp-field
          v-else
          v-model="userPhone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          maxlength="11"
          readonly
        />
        <sp-field
          v-show="!userPhone"
          v-model="verifyCode"
          name="验证码"
          label="验证码"
          placeholder="输入短信校验码"
          maxlength="4"
        >
          <template #button>
            <sp-button size="small" type="primary" @click="onSms">{{
              test
            }}</sp-button>
          </template>
        </sp-field>
      </sp-form>
      <div class="line"></div>
      <button
        class="button"
        :disabled="isNull"
        :class="isNull ? 'disabled' : ''"
        @click="checkSmsCode"
      >
        立即申请
      </button>
    </div>
    <sp-popup v-model="isShow" round position="bottom">
      <div class="pop_top">
        <div class="cancel" @click="cancel">取消</div>
        <div class="title">知产数量</div>
        <div class="confirm" @click="confirm">确认</div>
      </div>

      <div class="roll_box">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="roll_item"
          :class="{ active: index === currentIndex }"
          @click="choose(item, index)"
        >
          {{ item + '个' }}
        </div>
      </div>
    </sp-popup>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  Sticky,
  PullRefresh,
  List,
  Form,
  Field,
  Icon,
  Popup,
  Toast,
  button,
  Swipe,
  SwipeItem,
} from '@chipspc/vant-dgg'
// import Header from '@/components/common/head/header'
import { financingApi, plannerApi } from '@/api/spread'
import imHandle from '@/mixins/imHandle'
import isLogin from '@/mixins/isLogin'
export default {
  name: 'Index',
  components: {
    // Header,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [button.name]: button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  mixins: [imHandle, isLogin],
  data() {
    return {
      title: '高企认定',
      firmName: '',
      proNum: '',
      phoneNum: '',
      verifyCode: '', // 输入验证码
      isShow: false,
      list: ['1', '2', '3', '4', '5'],
      currentIndex: 2,
      disabled: true,
      pagePlanner: {},
      smsNum: '', // 存的验证码
      imgList: [],
      time: '',
      test: '获取验证码',
      appType: '',
      imgUrl: 'https://cdn.shupian.cn/sp-pt/wap/dzfwvdb61pc0000.png',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCitys: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    isNull() {
      // 公司名字
      if (this.firmName === '') {
        return true
      }
      // 知识产权数量
      if (this.proNum === '') {
        return true
      }
      // 电话号码
      if (this.userPhone === '') {
        if (this.phoneNum === '') {
          return true
        }
      } else if (this.userPhone !== '') {
        if (this.userPhone === '') {
          return true
        }
      }
      if (this.userPhone === '' && this.verifyCode === '') {
        return true
      }

      return false
    },
  },
  mounted() {
    this.getPagePlanner('app-ghsdgye-02')
    const code = 'ad100065'
    this.getAd(code)
    this.appType = this.isAndroidOrIOS()
  },
  methods: {
    // 点击申请按钮的时候触发
    checkSmsCode() {
      // 封装参数 第一个参数
      const sessionParams = {
        imUserId: this.pagePlanner.id,
        imUserType: this.pagePlanner.type,
        ext: {
          startUserType: 'cps-app',
          proNum: this.proNum,
        },
      }
      // 封装参数 第二个参数
      const msgParams = {
        sendType: 2, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
        msgType: 'im_tmplate', // 消息类型
        extContent: this.$route.query, // 路由参数
        title: this.title,
        area: this.city
          ? this.city.join(',')
          : this.$store.state.city.defaultCity.name,
        productName: this.title,
        intention: this.proNum + '个',
      }
      // 规划师信息上传
      const planner = {
        mchUserId: this.pagePlanner.id,
        userName: this.pagePlanner.name,
        type: this.pagePlanner.type,
        msgParam: msgParams,
        templateIds: '60a46c4e344fb6000633c37a',
      }

      if (this.userPhone) {
        this.uPIM(planner)
      } else {
        // 进行参数验证
        this.$axios
          .get(financingApi.check_smsCode, {
            params: {
              phone: this.phoneNum,
              smsCode: this.smsNum,
            },
          })
          .then((res) => {
            if (res.code === 200 && res.data === true) {
              // 不在APP当中
              if (!this.isInApp) {
                this.uPIM(planner, sessionParams, msgParams)
              } else {
                this.uPIM(planner)
              }
              // 在APP中
              // if (this.isInApp && this.phoneNum === '') {
              //   if (res.code === 200 && res.data === true) {
              //     this.uPIM(planner)
              //   } else if (res.code !== 200 && this.smsNum === this.sms) {
              //     this.uPIM(planner)
              //   }
              // } else if (this.phoneNum !== '' && this.isInApp) {
              //   this.uPIM(planner)
              // }
            } else if (this.smsNum === this.verifyCode) {
              this.uPIM(planner)
            } else {
              Toast('验证码不正确！')
            }
          })
      }
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    showPopup() {
      this.isShow = true
      this.proNum = this.currentIndex + 1
    },
    cancel() {
      this.isShow = false
    },
    confirm() {
      this.isShow = false
    },
    choose(item, index) {
      this.currentIndex = index
      this.proNum = item
    },
    // 获取验证码
    async getSmsCode() {
      const res = await this.$axios.get(financingApi.smsCode, {
        params: {
          phone: this.phoneNum,
        },
      })
      if (res.code === 200) {
        this.$xToast.show({
          message: '获取验证码成功',
        })
        this.smsNum = res.data
        this.countDown()
      } else {
        this.$xToast.show({
          message: res.data.error,
        })
      }
    },
    // 倒计时
    countDown() {
      console.log('++到这里了')
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
    // 获取推荐规划师
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
        areaCode = this.currentCitys.code
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
              firstTypeCode: 'FL20210425164307', // 一级code
            },
            {
              headers: {
                sysCode: 'cloud-recomd-api',
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            if (res.code === 200 && res.data.length > 0) {
              this.pagePlanner = {
                id: res.data[0].mchUserId,
                name: res.data[0].userName,
                type: res.data[0].type,
                jobNum: res.data[0].userCenterNo,
                telephone: res.data[0].phone,
                imgSrc: res.data[0].imgaes,
              }
              console.log('this.pagePlanner', this.pagePlanner)
            }
          })
      } catch (error) {
        console.log('plannerApi.plannerReferrals error：', error.message)
      }
    },
    // 表单验证
    onSms() {
      const _tel = this.phoneNum
      const _reg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tel === '') {
        return Toast('请输入手机号码')
      }
      if (!_reg.test(_tel)) {
        return Toast('请输入正确手机号码')
      }
      if (_reg.test(_tel)) {
        this.getSmsCode(_tel)
      }
    },
    // 获取banner
    getAd(code) {
      const url = financingApi.get_ad_data
      this.$axios
        .get(url, {
          params: {
            locationCode: code,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            if (JSON.stringify(res.data[0]) !== '{}') {
              res.data[0].sortMaterialList.forEach((item) => {
                const obj = {
                  img: item.materialList[0].materialUrl,
                  url: item.materialList[0].materialLink, // 外链
                  iosUrl: item.materialList[0].iosLink, // 内链接ios
                  adrUrl: item.materialList[0].androidLink, // 内链安卓链接
                  wapUrl: item.materialList[0].wapLink, // wap内链
                }
                this.imgList.push(obj)
              })
            }
          }
        })
    },
    // 返回上一页
    goBack() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },
    // @--判断页面所在设备的系统
    isAndroidOrIOS() {
      const ua = navigator.userAgent
      const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
      const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isAndroid) {
        this.userAgent = 'Android'
        console.log('安卓系统')
        return 'Android'
      }
      if (isiOS) {
        this.userAgent = 'IOS'
        console.log('IOS系统')
        return 'IOS'
      }
      console.log(ua)
    },
  },
}
</script>
<style lang="less">
@paddingLeft: 20px;
@marginLeft: 20px;
@font-medium:pingfangsc-medium, PingFang SC;
@font-regular: PingFangSC-Regular, PingFang SC;
.backGround(@url) {
  background: url(@url);
  background-size: 100% 100%;
}
.flexMixin {
  display: flex;
  align-items: center;
}
.flexStart {
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
}
.textoverflow (@line) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @line;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.padding {
  padding: 0 20px;
}
.sp-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}

.container_body {
  ::v-deep.sp-popup {
    //你的容器选择器名称
    background: #ffffff;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .sp-button--small {
    background: #ffffff;
    border: none;
    color: #4974f5;
  }

  .container_header {
    height: 88px;
    width: 100%;
    .flexMixin();
    justify-content: center;
    position: relative;
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    .container_header_icon {
      margin-left: @marginLeft+12px;
      position: absolute;
      left: 0;
    }
    .container_header_title {
      color: #1a1a1a;
      font: bold 36px/36px @font-medium;
    }
  }
  .disabled {
    background: #91abf9 !important;
    color: #cfdafc !important;
  }

  .banner {
    width: 750px;
    height: 280px;
    background: #d8d8d8;
    img {
      height: 100%;
      height: 100%;
    }
    // .my-swipe .sp-swipe-item {
    //   font-size: 20px;
    //   height: 280px;
    //   text-align: center;
    //   border-radius: 12px;
    //   background: #dddddd;
    //   > img {
    //     width: 100%;
    //     height: 100%;
    //     //   object-fit: cover;
    //   }
    // }
  }
  .container_ads {
    height: 320px;
    background: #d8d8d8;
  }
  .sp-button--primary {
    width: 160px;
  }
  .container_form {
    .sp-cell {
      height: 1.2rem;
      padding: 38px 40px;
      .flexMixin();
    }

    .sp-field__label {
      .flexMixin();
      > span {
        color: #222222;
        font: bold 32px @font-medium;
      }
    }
    .sp-field__control {
      font: 400 32px @font-regular;
    }
    .sp-field__button {
      color: #4974f5;
      font: 400 32px @font-regular;
      border-left: 1px solid #dddddd;
      padding-left: 23px;
    }
    .line {
      margin: 0 40px;
      border-bottom: 1px solid #f4f4f4;
    }
    .button {
      height: 96px;
      background: #4974f5;
      border-radius: 10px;
      .flexMixin();
      font: bold 32px/32px @font-medium;
      color: #ffffff;
      justify-content: center;
      margin: 60px 40px;
      width: 90%;
    }
  }
  .pop_top {
    height: 136px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    .flexMixin();
    padding: 0 40px;
    justify-content: space-between;
    .cancel {
      color: #555555;
      font: bold 32px/32px @font-medium;
    }
    .title {
      color: #000000;
      font: bold 40px/40px @font-medium;
    }
    .confirm {
      font: bold 32px/32px @font-medium;
      color: #4974f5;
    }
  }
  .roll_box {
    .active {
      color: #222222 !important;
      font: bold 28px @font-regular !important;
    }
    .roll_item {
      height: 136px;
      .flexMixin();
      justify-content: center;
      color: #555555;
      font: 400 24px @font-regular;
    }
    // .roll_item:nth-of-type(1) {
    //   color: #555555;
    //   font: 400 24px @font-regular;
    // }
    // .roll_item:nth-of-type(2) {
    //   color: #555555;
    //   font: 400 28px @font-regular;
    // }
    // .roll_item:nth-of-type(3) {
    //   color: #222222;
    //   font: bold 28px @font-regular;
    // }
    // .roll_item:nth-of-type(4) {
    //   color: #555555;
    //   font: 400 28px @font-regular;
    // }
    // .roll_item:nth-of-type(5) {
    //   color: #555555;
    //   font: 400 24px @font-regular;
    // }
  }
  .sp-picker-column__item {
    height: 136px !important;
  }
  .sp-picker__frame {
    height: 136px !important;
  }
  .sp-picker-column__wrapper {
    transform: translate3d(0px, 25px, 0px);
    transition-duration: 0ms;
    transition-property: none;
  }
}
</style>
