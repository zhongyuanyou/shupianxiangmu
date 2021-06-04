<template>
  <div class="container_body">
    <div class="container">
      <sp-sticky @scroll="handleScroll">
        <div class="container_header">
          <my-icon
            name="nav_ic_back"
            size="0.4rem"
            color="#ffffff"
            class="container_header_icon"
            @click.native="goBack"
          ></my-icon>
          <div class="container_header_title">版权登记</div>
        </div>
      </sp-sticky>
      <div class="container_form">
        <div class="form_title">
          <img :src="imgLeft" alt="" />
          <p>我的版权能否登记</p>
          <img :src="bottom_one" alt="" class="image_bottome" />
          <img :src="imgRight" alt="" />
        </div>
        <div class="form_text">{{ text }}</div>
        <sp-form @submit="onSubmit">
          <sp-field
            v-model="haveProduct"
            name="有无作品"
            label="有无作品"
            placeholder="请输入作品名称"
            right-icon="arrow"
            readonly
            @click="openPop"
          />
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
          <div class="code">
            <sp-field
              v-show="!userPhone"
              v-model="verifyCode"
              name="验证码"
              label="验证码"
              placeholder="输入短信校验码"
              maxlength="4"
            >
            </sp-field>
            <button v-show="!userPhone" @click="onSms">{{ test }}</button>
          </div>

          <div style="margin: 20px 10px">
            <sp-button
              block
              type="info"
              native-type="submit"
              :disabled="isNull"
              :class="isNull ? 'disabled' : ''"
              @click="checkSmsCode"
            >
              立即获取查询结果
            </sp-button>
          </div>
        </sp-form>
      </div>
    </div>
    <div class="container_middle">
      <div class="form_title">
        <img :src="imgLeft" alt="" />
        <p>哪些作品可以登记版权</p>
        <img :src="bottom_one" alt="" class="image_bottome" />
        <img :src="imgRight" alt="" />
      </div>
      <div class="ads_box">
        <div v-for="(item, index) in imgs" :key="index" class="ads_item">
          <img :src="item" alt="" />
        </div>
      </div>
      <div class="ads_button" @click="goIM">免费提交申请</div>
    </div>
    <div class="container_bottom">
      <div class="form_title">
        <img :src="imgLeft" alt="" />
        <p>企业版权登记重要性</p>
        <img :src="bottom_one" alt="" class="image_bottome" />
        <img :src="imgRight" alt="" />
      </div>
      <div class="ads_box">
        <div v-for="(item, index) in arr" :key="index" class="ads_item">
          <img :src="item.adsImg" alt="" />
          <p>{{ item.text }}</p>
          <div class="btn" @click="goIM">{{ item.btn_content }}</div>
        </div>
      </div>
    </div>
    <sp-popup v-model="isShow" round position="bottom">
      <div
        v-for="(item, index) in btns"
        :key="index"
        class="choose"
        @click="choose(item)"
      >
        {{ item }}
      </div>
      <div class="choose" @click="close">取消</div>
    </sp-popup>
  </div>
</template>
<script>
// import Header from '@/components/common/head/header'

import {
  Sticky,
  PullRefresh,
  List,
  Form,
  Field,
  Button,
  Popup,
  Toast,
} from '@chipspc/vant-dgg'

// import { copyrightRegisterApi } from '@/api'
import { mapState } from 'vuex'
import { financingApi, plannerApi, newSpreadApi } from '@/api/spread'
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
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  mixins: [imHandle, isLogin],
  async asyncData({ $axios }) {
    const locationCodes = ''
    const navCodes = ''
    const code = 'CRISPS-C-ZSCQ'
    try {
      const res = await $axios.get(newSpreadApi.list, {
        params: {
          locationCodes,
          navCodes,
          code,
        },
      })
      if (res.code === 200) {
        console.log('请求成功', res)
        return {
          resultData: res.data,
        }
      }
      console.log('请求失败')
      return {
        // resultData: dataRes.data,
      }
    } catch (error) {
      console.log('请求错误')
      return {
        // resultData: dataRes.data,
      }
    }
  },
  data() {
    return {
      bottom_one: 'https://cdn.shupian.cn/sp-pt/wap/7f6ga771ooc0000.png',
      text: '企业品牌维权利器 保护个人原创作品',
      imgRight: 'https://cdn.shupian.cn/sp-pt/wap/images/byszrqecapk0000.png',
      imgLeft: 'https://cdn.shupian.cn/sp-pt/wap/images/9pg9y8vb8ik0000.png',
      imgs: [
        'https://cdn.shupian.cn/sp-pt/wap/images/7v0gx81cwaw0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/17mau50b1pmo000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/53lj5y78yyk0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/31co0p4zw3o0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/delcsr241pc0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/delcsr241pc0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/eej003ty7d40000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/8l36jyze4e40000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/73a2w680ie00000.png',
      ],
      ads: 'https://cdn.shupian.cn/sp-pt/wap/images/bqsbc7kue3k0000.png',
      haveProduct: '',
      phoneNum: '',
      verifyCode: '',
      isShow: false,
      showVerifyCode: false,
      btns: ['有', '无'],
      pagePlanner: {},
      itemArray: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
      ],
      arr: [
        {
          adsImg: 'https://cdn.shupian.cn/sp-pt/wap/images/bqsbc7kue3k0000.png',
          text: '保护知识产品',
          btn_content: '立即申请版权登记',
        },
        {
          adsImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fhvtfij86cg0000.png',
          text: '转让/授权获利',
          btn_content: '立即申请版权登记',
        },
        {
          adsImg: 'https://cdn.shupian.cn/sp-pt/wap/images/euyeca8td080000.png',
          text: '获得权威证书 ',
          btn_content: '立即申请版权登记',
        },
        {
          adsImg: 'https://cdn.shupian.cn/sp-pt/wap/images/539x9pigd9s0000.png',
          text: '享受税收减免',
          btn_content: '立即申请版权登记',
        },
      ],
      smsNum: '',
      test: '获取验证码',
      time: '',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCitys: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    isNull() {
      // console.log('++', typeof this.userPhone)
      // console.log('++this.verifyCode', this.verifyCode)
      // 是否有产品
      if (this.haveProduct === '') {
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
      // 验证码
      if (this.verifyCode === '' && !this.userPhone) {
        console.log('++++')
        return true
      }
      return false
    },
  },
  mounted() {
    if (this.currentCitys.city) {
      this.city = this.currentCitys
    }
    this.getPagePlanner('app-ghsdgye-02')
  },
  methods: {
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
    goIM() {
      console.log(this.pagePlanner.id)
      const sessionParams = {
        imUserId: this.pagePlanner.id,
        imUserType: this.pagePlanner.type,
        ext: {
          intentionType: '',
          intentionCity: '',
          recommendId: '',
          recommendAttrJson: {},
          startUserType: 'cps-app',
        },
      }
      const msgParams = {
        // sendType: 2, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
        // msgType: 'im_tmplate', // 消息类型
        // extContent: this.$route.query, // 路由参数
        // forwardAbstract: '【咨询信息】',
        // title: '版权登记',
        // area: this.currentCitys,
        // productName: '车主贷',
        // // intention: this.lines + '万元',
        // routerId: '',
      }
      const msgParamsMsg = JSON.stringify(msgParams)
      const planner = {
        mchUserId: this.pagePlanner.id,
        userName: this.pagePlanner.name,
        type: this.pagePlanner.type,
        msgParam: {},
        templateIds: '',
      }
      console.log('planner', planner)
      this.uPIM(planner)
    },
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
    clickInputHandle() {
      console.log('click')
    },
    handleScroll(e) {
      // this.showTitle = e.isFixed
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    // 点击获取查询结果的时候触发
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
        title: '产权登记',
        area: this.city
          ? this.city.join(',')
          : this.$store.state.city.defaultCity.name,
        productName: '产权登记',
        intention: this.haveProduct,
      }
      // 规划师信息上传
      const planner = {
        mchUserId: this.pagePlanner.id,
        userName: this.pagePlanner.name,
        type: this.pagePlanner.type,
        msgParam: msgParams,
        templateIds: '60a46c4e344fb6000633c37a',
      }
      // 进行参数验证 如果登陆了 直接去跳IM  如果没登录进行验证再登录
      if (this.userPhone) {
        this.uPIM(planner)
      } else {
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
    openPop() {
      this.isShow = true
    },
    choose(item) {
      this.haveProduct = item
      this.isShow = false
    },
    // 关闭弹窗
    close() {
      this.isShow = false
    },

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
    // 获取验证码
    async getSmsCode() {
      // 请求
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
.header_bgc {
  background: #4974f5 !important;
}
.sp-cell {
  width: 670px;
  margin: 20px;
  border-radius: 8px !important;
  padding: 26px 20px;
  .flexMixin();
  height: 80px;
  background: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
}

.sp-cell::after {
  border-bottom: none;
}
.sp-field__right-icon {
  padding: 0 !important ;
}
.code {
  .flexMixin();
  .sp-cell {
    .flexMixin();
    width: 450px;
  }
  button {
    width: 200px;
    height: 80px;
    background: #4974f5;
    border-radius: 8px;
    color: #ffffff;
    font: 400 28px @font-regular;
  }
}
.disabled {
  background: #91abf9 !important;
  color: #cfdafc !important;
}

.verify {
  .flexMixin();
  .sp-button {
    width: 200px;
    height: 80px;
    background: #4974f5;
    border-radius: 8px;
    font: 400 28px/28px @font-regular;
    color: #ffffff;
    border: none;
  }
  .sp-cell {
    width: 450px;
    margin-top: 0;
  }
}
.sp-button {
  width: 670px;
  height: 88px;
  background: #4974f5;
  border-radius: 8px;
  font: bold 32px @font-medium;
  color: #ffffff;
  border: none;
}

.sp-cell__title {
  font: 400 28px/28px @font-regular;
  color: #222222;
  width: 152px;
  margin: 0;
}
.sp-field__body {
  max-width: 436px;
}
.sp-field__control {
  font: 400 28px/28px @font-regular;
}
input:-webkit-autofill {
  box-shadow: 0 0 10rem 10rem #f8f8f8 inset !important;
}
// .sp-field__right-icon {
//   // padding: 0;
//   // margin-right: -20px;
// }
.container_body {
  background: #ffffff;
  width: 100%;
  height: 100%;
  bottom: constant(safe-area-inset-bottom);
  bottom: env(safe-area-inset-bottom);
  .container {
    .container_header {
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
      background-color: #555dec;
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
        color: #fff;
        font: bold 36px/36px @font-medium;
      }
    }
    width: 100%;
    height: 1012px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/9pj2y0rwmfw0000.png')
      no-repeat;
    background-size: 100%;
    position: relative;
    .container_form {
      width: 94.6%;
      height: 648px;
      background: #ffffff;
      box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
      border-radius: 24px;
      position: absolute;
      top: 340px;
      left: 20px;
      margin: 0 auto;
      .form_title {
        position: relative;
        .flexMixin();
        height: 40px;
        font: bold 36px/34px @font-medium;
        color: #222222;
        justify-content: center;
        margin: 64px 0 16px 0;
        img {
          width: 38px;
          height: 27px;
        }
        .image_bottome {
          width: 267px;
          height: 42px;
          position: absolute;
          top: 11px;
        }
        p {
          margin: 0 16px;
        }
      }
      .form_text {
        .flexMixin();
        font: 400 24px/24px @font-regular;
        color: #999999;
        justify-content: center;
        margin-bottom: 20px;
      }
    }
  }
  .container_middle {
    .form_title {
      position: relative;
      .flexMixin();
      height: 40px;
      font: bold 36px/34px @font-medium;
      color: #222222;
      justify-content: center;
      margin: 80px 0 60px 0;
      img {
        width: 38px;
        height: 27px;
      }
      .image_bottome {
        width: 267px;
        height: 42px;
        position: absolute;
        top: 11px;
      }
      p {
        margin: 0 16px;
      }
    }
    .form_text {
      .flexMixin();
      font: 400 24px/24px @font-regular;
      color: #999999;
      justify-content: center;
      margin-bottom: 20px;
    }
    .ads_box {
      padding: 0 20px;
      .flexMixin();
      justify-content: space-between;
      flex-wrap: wrap;
      .ads_item {
        width: 230px;
        height: 224px;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .ads_button {
      width: 690px;
      height: 88px;
      background: #4974f5;
      border-radius: 8px;
      font: bold 32px @font-medium;
      color: #ffffff;
      .flexMixin();
      justify-content: center;
      margin: 40px auto;
    }
  }
  .container_bottom {
    position: relative;
    padding-bottom: 40px;
    .form_title {
      .flexMixin();
      height: 40px;
      font: bold 36px/34px @font-medium;
      color: #222222;
      justify-content: center;
      margin: 80px 0 60px 0;
      img {
        width: 38px;
        height: 27px;
      }
      .image_bottome {
        width: 267px;
        height: 42px;
        position: absolute;
        top: 11px;
      }
      p {
        margin: 0 16px;
      }
    }
    .form_text {
      .flexMixin();
      font: 400 24px/24px @font-regular;
      color: #999999;
      justify-content: center;
      margin-bottom: 20px;
    }
    .ads_box {
      padding: 0 20px;
      .flexMixin();
      justify-content: space-between;
      flex-wrap: wrap;
      .ads_item {
        width: 344px;
        height: 310px;
        background: #ffffff;
        box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
        border-radius: 8px;
        margin-bottom: 20px;
        img {
          display: block;
          width: 100%;
        }

        p {
          color: #222222;
          font: bold 28px @font-medium;
          padding: 34px 80px 24px 80px;
          text-align: center;
        }
        .btn {
          width: 274px;
          height: 64px;
          .flexMixin();
          justify-content: center;
          border-radius: 32px;
          border: 1px solid #4974f5;
          font: bold 26px @font-medium;
          color: #4974f5;
          margin: 0 auto;
        }
      }
    }
  }
  .sp-popup {
    background-color: #f5f5f5;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .choose {
    .flexMixin();
    justify-content: center;
    height: 112px;
    font: bold 32px @font-medium;
    color: #222222;
    background-color: #fff;
  }
  .choose:nth-of-type(1) {
    border-bottom: 1px solid #f0f0f0;
  }
  .choose:nth-of-type(2) {
    margin-bottom: 24px;
  }
}
</style>
