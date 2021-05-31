<template>
  <div class="container_body">
    <div class="container_header"><Header :title="title" /></div>
    <div v-if="imgList.length !== 0" class="banner">
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
          v-model="phoneNum"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          maxlength="11"
        />
        <sp-field
          v-if="showVerifyCode"
          v-model="verifyCode"
          name="验证码"
          label="验证码"
          placeholder="输入短信校验码"
          maxlength="6"
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
    <sp-popup
      v-model="isShow"
      round
      position="bottom"
      :style="{ height: '408px' }"
    >
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
import Header from '@/components/common/head/header'
import { financingApi, plannerApi } from '@/api/spread'
import isLogin from '@/mixins/isLogin'
import imHandle from '@/mixins/imHandle'
export default {
  name: 'Index',
  components: {
    Header,
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
  mixins: [isLogin, imHandle],
  data() {
    return {
      title: '高企认定',
      firmName: '',
      proNum: '',
      phoneNum: '',
      verifyCode: '',
      isShow: false,
      list: ['1', '2', '3', '4', '5'],
      currentIndex: 2,
      showVerifyCode: false,
      disabled: true,
      pagePlanner: {},
      smsNum: '',
      imgList: [],
      time: '',
      test: '获取验证码',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
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
      if (this.phoneNum === '') {
        return true
      }
      if (!isLogin && this.verifyCode === '') {
        return true
      }
      // if (this.verifyCode === '') {
      //   // 验证码
      //   return true
      // }
      return false
    },
  },
  mounted() {
    this.getPagePlanner('app-ghsdgye-02')
    if (this.isInApp) {
      this.$appFn.dggGetUserInfo((res) => {
        const { code, data } = res || {}
        if (code !== 200) {
          this.$appFn.dggLogin((loginRes) => {})
        } else {
          this.$appFn.dggOpenIM(
            {
              name: this.pagePlanner.name,
              userId: this.pagePlanner.id,
              userType: this.pagePlanner.type,
            },
            (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `联系失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            }
          )
        }
      })
    }
    if (this.isLogin) {
      this.phoneNum = this.userPhone
      this.showVerifyCode = false
    } else {
      this.showVerifyCode = true
    }
    const code = 'ad100065'
    this.getAd(code)
  },
  methods: {
    // 点击申请单的时候触发

    checkSmsCode() {
      if (!isLogin) {
        this.$axios
          .get(financingApi.check_smsCode, {
            params: {
              phone: this.phoneNum,
              smsCode: this.smsNum,
            },
          })
          .then((res) => {
            console.log('++++++++res', res)
            if (res.code === 200 && res.data === true) {
              this.$xToast.showLoading({ message: '正在联系规划师...' })
              const sessionParams = {
                imUserId: this.pagePlanner.id,
                imUserType: this.pagePlanner.type,
                ext: {
                  startUserType: 'cps-app',
                  proNum: this.proNum,
                },
              }
              const msgParams = {
                sendType: 2, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
                msgType: 'im_tmplate', // 消息类型
                extContent: this.$route.query, // 路由参数
                title: this.firmName,
                area: this.city
                  ? this.city.join(',')
                  : this.$store.state.city.defaultCity.name,
                productName: this.title,
              }
              this.sendTemplateMsgMixin({ sessionParams, msgParams })
            } else {
              Toast('验证码不正确！')
            }
          })
      } else {
        this.$xToast.showLoading({ message: '正在联系规划师...' })
        const sessionParams = {
          imUserId: this.pagePlanner.id,
          imUserType: this.pagePlanner.type,
          ext: {
            startUserType: 'cps-app',
            proNum: this.proNum,
          },
        }
        const msgParams = {
          sendType: 2, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
          msgType: 'im_tmplate', // 消息类型
          extContent: this.$route.query, // 路由参数
          title: this.firmName,
          area: this.city
            ? this.city.join(',')
            : this.$store.state.city.defaultCity.name,
          productName: this.title,
        }
        this.sendTemplateMsgMixin({ sessionParams, msgParams })
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
      this.countDown()
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
        console.log('res', res)
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
            } else {
              this.$xToast.show({
                message: `已提交，我们会尽快联系您`,
                duration: 3000,
                forbidClick: true,
                icon: 'toast_ic_remind',
              })
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
      const url =
        // 'http://172.16.132.228:7001/service/nk/financing/v1/get_advertising.do'
        financingApi.get_ad_data
      this.$axios
        .get(url, {
          params: {
            locationCode: code,
          },
        })
        .then((res) => {
          if (res.code === 200) {
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
        })
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
  .disabled {
    background: #91abf9 !important;
    color: #cfdafc !important;
  }

  .banner {
    width: 750px;
    height: 280px;
    background: #d8d8d8;
    .my-swipe .sp-swipe-item {
      font-size: 20px;
      height: 280px;
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
