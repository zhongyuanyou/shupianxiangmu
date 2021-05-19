<template>
  <div class="credit-evaluation">
    <div class="heaa-box">
      <Head title="额度评估">
        <template #left>
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#FFFFFF"
            @click.native="onLeftClick"
          ></my-icon>
        </template>
      </Head>
      <div class="num-box">
        <span class="head-msg">最高额度(元)</span>
        <span class="lines">{{ num }}</span>
      </div>
      <div class="prompt">输入以下信息，获取贷款额度</div>
    </div>
    <div class="content">
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
        <div class="icon-box"></div>
      </div>
      <!-- 有无公积金 -->
      <div class="list-content">
        <span class="chooseTitle">有无缴满2年的公积金</span>
        <div class="gender-box">
          <span
            v-for="(sex, idx) in isHave"
            :key="idx"
            :class="idx === reserveActived ? 'active' : ''"
            @click="reserve(idx)"
            >{{ sex }}</span
          >
        </div>
      </div>
      <div v-show="reserveActived === 0" class="personal">
        <span class="personal-title">个人月缴金额</span>
        <input
          type="number"
          v-model="amount"
          class="personal-input"
          placeholder="请输入"
        />
        <span class="unit">元</span>
      </div>
    </div>
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
import { Picker, Popup } from '@chipspc/vant-dgg'
import Head from '@/components/financing/common/Header'
export default {
  components: {
    Head,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  data() {
    return {
      num: '0.00',
      pickerShow: false,
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
      isHave: ['有', '无'],
      reserveActived: 0,
      amount: '', // 金额
    }
  },
  methods: {
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
    reserve(idx) {
      this.reserveActived = idx
    },
  },
}
</script>

<style lang="less" scoped>
.credit-evaluation {
  width: 100vw;
  margin: 0 auto;
  background: #f5f5f5;
  .heaa-box {
    width: 100%;
    background: #4974f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    ::v-deep.my-head {
      width: 750px !important;
      position: fixed !important;
      left: 50% !important;
      margin-left: -375px !important;
      background: transparent;
      .title {
        color: #ffffff;
      }
    }
    .num-box {
      padding-bottom: 65px;
      > span {
        display: block;
      }
      .head-msg {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        margin-top: 40px;
      }
      .lines {
        height: 87px;
        font-size: 66px;
        font-family: Bebas;
        color: #ffffff;
        line-height: 87px;
        margin-top: 20px;
      }
    }
  }
  .prompt {
    width: 750px;
    height: 80px;
    padding: 20px 0 20px 40px;
    background: #f5f5f5;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 40px;
  }
  .content {
    margin-top: 420px;
    background: #ffffff;
    padding: 0 40px;
    > div {
      height: 120px;
      width: 100%;
      border-bottom: 1px solid #f4f4f4;
      font-size: 0;
      display: flex;
      align-items: center;
    }
    .list-content {
      > span {
        display: block;
      }
      .chooseTitle {
        width: 308px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
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
        margin-left: auto;
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
        background: #cccccc;
        margin-left: 47px;
      }
      .city-input {
        width: 418px;
      }
    }
    .personal {
      .personal-title {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      .personal-input {
        display: block;
        margin-left: 60px;
        width: 346px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 45px;
        border: none;
        text-align: right;
      }
      .personal-input:-moz-placeholder {
        color: #999999;
      }
      .unit {
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 32px;
        margin-left: auto;
      }
    }
  }
}
</style>
