<template>
  <div class="mortgage">
    <Head title="房贷"></Head>
    <!-- banner图展示 -->
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
    <!-- 表单 -->
    <div class="from-box">
      <div class="from-list">
        <!-- 姓名 -->
        <div class="list-content">
          <span class="title">姓名</span>
          <input
            v-model="name"
            type="text"
            placeholder="请输入姓名"
            @input="nameReg"
          />
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
            @input="linesReg"
          />
          <span class="unit">万元</span>
        </div>
        <!-- 电话号码 -->
        <div class="list-content">
          <span class="title">手机号</span>
          <input
            v-if="!isLogin"
            v-model="phone"
            type="number"
            placeholder="请输入手机号"
            class="phone-input"
            @input="phoneReg"
          />
          <span v-else class="user-phone-input">{{ userPhone }}</span>
        </div>
        <!-- 获取验证码 -->
        <div v-if="!isLogin" class="list-content">
          <span class="title">验证码</span>
          <input
            v-model="sms"
            type="number"
            placeholder="输入短信校验码"
            class="sms-input"
            @input="smsReg"
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
import { mapState } from 'vuex'
import { Swipe, SwipeItem, Picker, Popup, Toast } from '@chipspc/vant-dgg'
import Head from '@/components/financing/common/Header'
import { financingApi, plannerApi } from '@/api/spread'
import imHandle from '@/mixins/imHandle'
import isLogin from '@/mixins/isLogin'
export default {
  components: {
    Head,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  mixins: [imHandle, isLogin],

  data() {
    return {
      name: '', // 用户姓名
      city: '', // 所造城市
      lines: '', // 申请额度
      phone: '', // 用户电话
      sms: '', // 验证码
      test: '获取验证码',
      sexList: ['先生', '女士'],
      actived: 0,
      columns: [],
      cityList: {},
      pickerShow: false,
      imgList: [], // banner
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    isShow() {
      if (this.name && this.city && this.lines && this.phone && this.sms) {
        return false
      } else if (this.isLogin && this.name && this.city && this.lines) {
        return false
      } else {
        return true
      }
    },
  },
  mounted() {
    this.getPagePlanner('app-ghsdgye-02')
    this.getCity()
    this.getAd('ad100062')
  },
  methods: {
    getAd(code) {
      const url =
        'http://127.0.0.1:7001/service/nk/financing/v1/get_advertising.do'
      // financingApi.get_ad_data
      this.$axios
        .get(financingApi.get_ad_data, {
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
    getCity() {
      const url = 'http://127.0.0.1:7001/service/nk/financing/v1/get_city.do'
      this.$axios
        .get(financingApi.get_city, { params: { code: 2147483647 } })
        .then((res) => {
          if (res.code === 200) {
            this.cityList = res.data.city
            this.columns = [
              { values: Object.keys(this.cityList) },
              { values: this.cityList['北京市'] },
            ]
          }
        })
    },
    onChange(picker, value) {
      picker.setColumnValues(1, this.cityList[value[0]])
    },
    // 推介规划师
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
              firstTypeCode: 'FL20210425164558', // 一级code
            },
            {
              headers: {
                sysCode: 'cloud-recomd-api',
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            console.log(res, '调用规划师')
            if (res.code === 200 && res.data.length > 0) {
              this.pagePlanner = {
                id: res.data[0].mchUserId,
                name: res.data[0].userName,
                type: res.data[0].type,
                jobNum: res.data[0].userCenterNo,
                telephone: res.data[0].phone,
                imgSrc: res.data[0].imgaes,
              }
            }
          })
      } catch (error) {
        console.log('plannerApi.plannerReferrals error：', error.message)
      }
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
      this.sendSms(_tel)
    },
    // 获取验证码
    sendSms(phones) {
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
      const url = 'http://127.0.0.1:7001/service/nk/financing/v1/get_smsCode.do'
      this.$axios
        .get(financingApi.smsCode, {
          params: {
            phone: phones,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            Toast('验证码发送成功,请注意查收！')
            this.smsRes = res.data
          } else {
            Toast(res.data)
          }
        })
    },
    onForm() {
      if (this.isInApp) {
        this.$appFn.dggGetUserInfo((res) => {
          const { code, data } = res || {}
          if (code !== 200) {
            this.$appFn.dggLogin((loginRes) => {})
          } else {
            this.$appFn.dggOpenIM(
              {
                name: this.planner.name,
                userId: this.planner.id,
                userType: this.planner.type,
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
      if (!this.isLogin && !this.isInApp) {
        const url =
          'http://127.0.0.1:7001/service/nk/financing/v1/validation_smsCode.do'
        // financingApi.check_smsCode
        this.$axios
          .get(financingApi.check_smsCode, {
            params: {
              phone: this.phone,
              smsCode: this.sms,
            },
          })
          .then((res) => {
            if (res.code === 200 && res.data === true) {
              this.$xToast.showLoading({ message: '正在联系规划师...' })
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
                sendType: 2, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
                msgType: 'im_tmplate', // 消息类型
                extContent: this.$route.query, // 路由参数
                forwardAbstract: '',
                title: this.name + this.sexList[this.actived],
                area: this.city.join(','),
                productName: '房贷',
                intention: this.lines + '万元',
                routerId: '',
              }
              this.sendTemplateMsgMixin({ sessionParams, msgParams })
            } else {
              Toast('验证码不真确！')
            }
          })
      } else {
        this.$xToast.showLoading({ message: '正在联系规划师...' })
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
          sendType: 2, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
          msgType: 'im_tmplate', // 消息类型
          extContent: this.$route.query, // 路由参数
          forwardAbstract: '',
          title: this.name + this.sexList[this.actived],
          area: this.city.join(','),
          productName: '车主贷',
          intention: this.lines + '万元',
          routerId: '',
        }
        this.sendTemplateMsgMixin({ sessionParams, msgParams })
      }
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
    // onChange(picker, value, index) {
    //   this.city = value
    //   this.pickerShow = false
    // },
    // 贷款期限弹出层取消按钮
    onCancel() {
      this.pickerShow = false
    },
    nameReg() {
      this.name = this.name.replace(/[^\u4E00-\u9FA5]/g, '')
    },
    linesReg(e) {
      e.target.value = e.target.value.match(/^(\d{0,3})/g)[0] || null
      this.lines = e.target.value
    },
    phoneReg(e) {
      e.target.value = e.target.value.match(/^(\d{0,11})/g)[0] || null
      this.phone = e.target.value
    },
    smsReg(e) {
      e.target.value = e.target.value.match(/^(\d{0,6})/g)[0] || null
      this.sms = e.target.value
    },
  },
}
</script>
<style lang="less" scoped>
.mortgage {
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
          width: 145px;
          height: 45px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #222222;
          line-height: 45px;
        }
        .user-phone-input {
          width: 482px;
          height: 45px;
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 45px;
          border: none;
          margin-left: 43px;
          color: #222222;
        }
        > input {
          width: 238px;
          height: 45px;
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 45px;
          border: none;
          margin-left: 43px;
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
          margin-left: auto;
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
          margin-left: auto;
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
