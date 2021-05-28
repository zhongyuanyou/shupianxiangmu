<template>
  <div class="container_body">
    <div class="container">
      <div class="container_form">
        <div class="form_title">
          <img :src="imgLeft" alt="" />
          <p>我的版权能否登记</p>
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
            v-model="phoneNum"
            name="电话"
            label="电话"
            placeholder="留下手机号，接受查询结果"
          />
          <div v-if="showVerifyCode" class="verify">
            <sp-field
              v-model="verifyCode"
              name="验证码"
              label="验证码"
              placeholder="请输入验证码"
            />
            <!-- :rules="[{ required: true, message: '请输入验证码' }]" -->
            <sp-button size="small" type="primary" @click="getVerifyCode">{{
              countdown > 0 ? `${countdown}s` : '获取验证码'
            }}</sp-button>
          </div>

          <div style="margin: 20px 10px">
            <sp-button
              block
              type="info"
              native-type="submit"
              @click="openImPage"
              :disabled="isNull"
              :class="isNull ? 'disabled' : ''"
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
    <sp-popup
      v-model="isShow"
      round
      position="bottom"
      :style="{ height: '180px' }"
    >
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
  CountDown,
} from '@chipspc/vant-dgg'
// import { copyrightRegisterApi } from '@/api'
import { mapState } from 'vuex'
import { financingApi, plannerApi } from '@/api/spread'
import isLogin from '@/mixins/isLogin'
import imHandle from '@/mixins/imHandle'

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
    [CountDown.name]: CountDown,
  },
  mixins: [isLogin, imHandle],
  data() {
    return {
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
          text: '你好',
          btn_content: '超出',
        },
        {
          adsImg: 'https://cdn.shupian.cn/sp-pt/wap/images/bqsbc7kue3k0000.png',
          text: '你好',
          btn_content: '超出',
        },
        {
          adsImg: 'https://cdn.shupian.cn/sp-pt/wap/images/bqsbc7kue3k0000.png',
          text: '你好',
          btn_content: '超出',
        },
        {
          adsImg: 'https://cdn.shupian.cn/sp-pt/wap/images/bqsbc7kue3k0000.png',
          text: '你好',
          btn_content: '超出',
        },
      ],
      countdown: -1, // 发送验证码倒计时60秒
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    isNull() {
      // 是否有产品
      if (this.haveProduct === '') {
        return true
      }
      // 电话号码
      if (this.phoneNum === '') {
        return true
      }
      // 验证码
      if (this.verifyCode === '') {
        return true
      }
      return false
    },
  },
  mounted() {
    if (this.isLogin) {
      this.phoneNum = this.userPhone
      this.showVerifyCode = false
    } else {
      this.showVerifyCode = true
    }
    if (this.currentCity.city) {
      this.city = this.currentCity
    }
    this.getPagePlanner('app-ghsdgye-02')
  },
  methods: {
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
    goIM() {
      console.log(this.pagePlanner.id)
      const planner = {
        mchUserId: this.pagePlanner.id,
        userName: this.pagePlanner.name,
        type: this.pagePlanner.type,
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
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
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
    // 获取验证码
    async getVerifyCode() {
      // url =
      //   'http://172.16.132.228:7001/service/nk/financing/v1/validation_smsCode.do'
      const res = await this.$axios.get(financingApi.smsCode, {
        params: {
          phone: this.phoneNum,
        },
      })
      if (res.code === 200) {
        this.$xToast.show({
          message: '获取验证码成功',
        })
        console.log('res', res)
      }
    },
    // 打开IM页面
    openImPage() {
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
        extContent: this.haveProduct, // 路由参数
        forwardAbstract: '',
        title: '版权登记',
        // area: this.city.join(','),
        // productName: '车主贷',
        // intention: this.lines + '万元',
        // routerId: '',
      }
      this.sendTemplateMsgMixin({ sessionParams, msgParams })
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
  }
  .sp-cell {
    width: 450px;
  }
}
.sp-button {
  width: 670px;
  height: 88px;
  background: #4974f5;
  border-radius: 8px;
  font: bold 32px @font-medium;
  color: #ffffff;
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
  .container {
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
          padding: 34px 88px 24px 88px;
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
