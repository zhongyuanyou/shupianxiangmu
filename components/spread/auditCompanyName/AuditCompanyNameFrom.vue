<template>
  <div>
    <!--s  查询表单 -->
    <div class="audit-company-name-from">
      <div class="audit-company-name-from__center">
        <!--s 表单标题 -->
        <h1 class="audit-company-name-from__center__title">
          <i>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/2la00918hu00000.png"
              alt="https://cdn.shupian.cn/sp-pt/wap/2la00918hu00000.png"
            />
          </i>
          <span>输入信息</span> <span>免费查询</span>
          <i>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/f6v01c39c280000.png"
              alt="https://cdn.shupian.cn/sp-pt/wap/f6v01c39c280000.png"
            />
          </i>
        </h1>
        <!--e 表单标题 -->
        <div class="audit-company-name-from__center__input">
          <!-- s城市选择 -->
          <a href="javascript:;">
            <!--webClick 核名表单_城市下拉表单 埋点 -->
            <div
              v-md-map
              v-md:webClick
              data-type="咨询表单"
              :data-name="`核名表单_城市下拉表单`"
              class="audit-company-name-from__center__input__city"
              @click="toActionCity"
            >
              <span>城市</span>
              <div>{{ cityName ? cityName : '成都' }}</div>
              <sp-icon name="arrow-down" />
            </div>
          </a>
          <!-- e城市选择 -->
          <sp-cell-group>
            <!-- s公司名称 -->
            <!--webClick 核名表单_公司名称 埋点  -->
            <sp-field
              v-model="companyName"
              v-md-map
              v-md:webClick
              data-type="咨询表单"
              data-name="核名表单_公司名称"
              label="公司名称"
              :maxlength="5"
              :formatter="companyTest"
              placeholder="3-5个"
            />
            <!-- e公司名称 -->
            <!-- s行业选择 -->
            <!--webClick 核名表单_行业下拉表 埋点  -->
            <sp-field
              v-model="industry"
              v-md-map
              v-md:webClick
              data-type="咨询表单"
              data-name="核名表单_行业下拉表单"
              label="行业"
              placeholder="如技术"
              right-icon="arrow-down"
              :maxlength="4"
              readonly
              @click="toActionShow"
            />
            <!-- s行业选择 -->
          </sp-cell-group>
          <!-- 弹窗 不用手动埋点 -->
          <sp-button type="primary" size="large" @click="onInquire"
            >马上查询</sp-button
          >
          <!--s 手机号弹窗 -->
          <AuditCompanyNameSubmitFrom
            :display="isOverlay"
            :details="details"
            @DisplayNone="Dis"
          />
          <!-- e 手机号弹窗 -->
          <!-- s 核名数据 -->
          <div class="audit-company-name-from__center__input__audit">
            <p>
              今日核名<span>{{ total.auditNameSum }}</span
              >次
            </p>
            <i></i>
            <p>
              累计核名<span>{{ total.addUpAuditNameSum }}</span
              >次
            </p>
          </div>
          <!-- e 核名数据 -->
          <!--s城市弹窗 -->
          <sp-action-sheet
            v-model="isShowCity"
            :actions="city"
            :lazy-render="false"
            @select="onCitySelect"
          />
          <!--e城市弹窗 -->
          <!-- s行业弹窗 -->
          <sp-action-sheet
            v-model="isShow"
            :actions="actions"
            :lazy-render="false"
            @select="onSelect"
          />
          <!-- e行业弹窗 -->
        </div>
      </div>
    </div>
    <!--e  查询表单 -->
  </div>
</template>

<script>
import {
  CellGroup,
  Field,
  Icon,
  Button,
  ActionSheet,
  Overlay,
  Toast,
  Form,
  CountDown,
} from '@chipspc/vant-dgg'
import AuditCompanyNameSubmitFrom from '@/components/spread/auditCompanyName/AuditCompanyNameSubmitFrom'
export default {
  name: 'AuditCompanyNameFrom',
  components: {
    AuditCompanyNameSubmitFrom,

    [Icon.name]: Icon,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Overlay.name]: Overlay,
    [Toast.name]: Toast,
    [Form.name]: Form,
    [CountDown.name]: CountDown,
  },
  props: {
    total: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 城市
      city: [
        {
          id: 1,
          name: '成都',
          code: 'cd',
          color: '#5a79e8',
        },
        {
          id: 2,
          name: '重庆',
          code: 'cq',
          color: '#222222',
        },
        {
          id: 3,
          name: '长沙',
          code: 'cs',
          color: '#222222',
        },
        {
          id: 4,
          name: '武汉',
          code: 'wh',
          color: '#222222',
        },
        {
          id: 5,
          name: '上海',
          code: 'sh',
          color: '#222222',
        },
        {
          id: 6,
          name: '北京',
          code: 'bj',
          color: '#222222',
        },
        {
          id: 7,
          name: '深圳',
          code: 'sz',
          color: '#222222',
        },
        {
          id: 8,
          name: '广州',
          code: 'gz',
          color: '#222222',
        },
        {
          id: 9,
          name: '杭州',
          code: 'hz',
          color: '#222222',
        },
        {
          id: 10,
          name: '郑州',
          code: 'zz',
          color: '#222222',
        },
        {
          id: 11,
          name: '佛山',
          code: 'fs',
          color: '#222222',
        },
        {
          id: 12,
          name: '东莞',
          code: 'dg',
          color: '#222222',
        },
        {
          id: 13,
          name: '宜昌',
          code: 'yc',
          color: '#222222',
        },
        {
          id: 14,
          name: '石家庄',
          code: 'sjz',
          color: '#222222',
        },
      ],
      // 公司名
      companyName: '',
      // 选择的行业
      industry: '',
      // 是否打开行业弹窗
      isShow: false,
      // 是否打开手机号弹窗
      isOverlay: false,
      // 是否打开城市弹窗
      isShowCity: false,

      // 选择的城市
      cityName: '成都',
      // 选择的城市编码
      cityCode: 'cd',
      // 提交的详情
      details: {},
      // 行业
      actions: [
        { name: '科技信息', color: '#222222' },
        { name: '广告传媒', color: '#222222' },
        { name: '金融投资', color: '#222222' },
        { name: '电子贸易', color: '#222222' },
        { name: '教育培训', color: '#222222' },
        { name: '物业地产', color: '#222222' },
        { name: '经济中介', color: '#222222' },
        { name: '建筑装饰', color: '#222222' },
        { name: '家居建材', color: '#222222' },
        { name: '通讯网络', color: '#222222' },
        { name: '实业生产', color: '#222222' },
        { name: '珠宝服饰', color: '#222222' },
        { name: '文化初版', color: '#222222' },
        { name: '印刷包装', color: '#222222' },
        { name: '餐饮美容', color: '#222222' },
        { name: '咨询服务', color: '#222222' },
        { name: '食品农业', color: '#222222' },
        { name: '会务展览', color: '#222222' },
        { name: '物流供应链', color: '#222222' },
        { name: '商标资质', color: '#222222' },
        { name: '其他', color: '#222222' },
      ],
      // 默认核名数据
      addUpAuditNameSum: '9,280',
      auditNameSum: 82, // 每日默认
    }
  },
  watch: {},
  mounted() {},

  methods: {
    toActionCity() {
      // 获取手机信息
      const phoneValue = navigator.userAgent
      const isIos = !!phoneValue.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      // 找到版本号
      if (isIos) {
        const iosVersions = phoneValue.match(/OS ((\d+_?){2,3})\s/)
        const versions = iosVersions[1].split('_')
        if (versions.length <= 13 && !!phoneValue.match(/Quark/)) {
          setTimeout(() => {
            this.isShowCity = true
          }, 600)
        } else {
          this.isShowCity = true
        }
      } else {
        this.isShowCity = true
      }
    },
    toActionShow() {
      const phoneValue = navigator.userAgent
      const isIos = !!phoneValue.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      // 找到版本号
      if (isIos) {
        const iosVersions = phoneValue.match(/OS ((\d+_?){2,3})\s/)
        const versions = iosVersions[1].split('_')
        if (versions.length <= 12 && !!phoneValue.match(/Quark/)) {
          setTimeout(() => {
            this.isShow = true
          }, 600)
        } else {
          this.isShow = true
        }
      } else {
        this.isShow = true
      }
    },
    Dis(data) {
      this.isOverlay = data.Dis
      this.cityName = '成都'
      this.cityCode = 'cd'
      this.industry = ''
      this.companyName = ''
      this.onStyle(this.actions, this.industry)
      this.onStyle(this.city, this.cityName)
    },
    // 选择城市
    onCitySelect(item) {
      this.cityName = item.name
      this.cityCode = item.code
      this.onStyle(this.city, item.name)
      this.isShowCity = false
    },
    //  行业选择
    onSelect(item) {
      this.industry = item.name
      this.onStyle(this.actions, item.name)
      this.isShow = false
    },
    // 选中样式
    onStyle(data, value) {
      data.forEach((obj) => {
        if (obj.name === value) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },
    //  手机号弹窗提交
    onInquire() {
      const inputValue = this.companyName.split('')
      if (this.companyName === '') {
        Toast('请填写公司名')
      } else if (inputValue.length < 3) {
        Toast('公司名格式不正确')
      } else if (this.industry === '') {
        Toast('请选择行业')
      } else {
        this.details = {
          companyName: this.companyName,
          cityCode: this.cityCode,
          industry: this.industry,
        }
        this.isOverlay = true
      }
    },

    // 输入框过滤
    companyTest(value) {
      return value.replace(/[^\dA-Za-z\u3007\u4E00-\u9FCB\uE815-\uE864]/, '')
    },
  },
}
</script>
<style lang="less" scoped>
// input placeholder 样式
::v-deep input {
  font-weight: bold;
}
::v-deep input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-weight: 400;
}
::v-deep input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-weight: 400;
  opacity: 1 !important;
}
::v-deep input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-weight: 400;
  opacity: 1 !important;
}
::v-deep input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-weight: 400;
}
// input placeholder 样式
a {
  text-decoration: none;
  color: inherit;
}
.sp-popup--bottom {
  max-width: 750px;
  margin: 0 auto;
  right: 0;
}
.audit-company-name-from {
  position: absolute;
  top: 315px;
  left: 40px;
  margin: 0 auto;
  text-align: center;
  font-size: 28px;
  color: rgba(26, 26, 26, 1);
  background-color: rgba(255, 255, 255, 1);
  width: 670px;
  height: 527px;
  margin: auto;
  border: 1px solid rgba(205, 205, 205, 0.3);
  border-radius: 8px;

  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  &__center {
    &__title {
      font-size: 32px;
      color: rgba(26, 26, 26, 1);
      margin: 48px auto;
      i {
        margin: 0 16px;
        img {
          height: 2px;
          width: 48px;
        }
      }
    }
    &__input {
      padding: 0 40px;
      color: rgba(26, 26, 26, 1);
      border-radius: 2px;
      &__city {
        position: relative;
        height: 80px;
        background-color: rgba(248, 248, 248, 1);
        display: flex;
        align-items: center;
        span {
          margin-left: 32px;
          font-weight: 400;
        }
        div {
          margin-left: 31px;
          font-size: 28px;
          font-weight: bold;
        }
        .sp-icon {
          font-size: 30px;
          color: rgba(204, 204, 204, 1);
          position: absolute;
          top: 28px;
          right: 24px;
        }
      }
      .sp-cell-group {
        display: flex;
        margin-top: 24px;
        width: 100%;
        justify-content: space-between;
        &::after {
          border: 0px solid transparent;
        }
        .sp-cell {
          position: relative;
          width: 283px;
          height: 80px;
          padding: 0;
          align-content: center;
          background-color: rgba(248, 248, 248, 1);
          ::v-deep .sp-cell__title {
            flex: none;
          }
          ::v-deep .sp-field__label {
            width: auto;
            margin-left: 33px;
            margin-right: 22px;
            display: flex;
            align-items: center;
            span {
              color: rgba(26, 26, 26, 1);
              font-weight: 400;
            }
          }
          &::after {
            border: 0px solid transparent;
          }

          ::v-deep .sp-cell__value {
            display: flex;
            align-items: center;
            // .sp-field__body {
            //   .sp-field__control {
            //     font-weight: bold;
            //   }
            // }
            .sp-field__right-icon {
              padding: 0;
              .sp-icon {
                display: inline-block;
                min-width: 0;
                line-height: normal;
                font-size: 30px;
                color: rgba(204, 204, 204, 1);
                position: absolute;
                top: 31%;
                right: 23px;
              }
            }
          }
        }
      }
      &__audit {
        margin-top: 16px;
        display: flex;
        color: #555;
        font-size: 24px;
        position: relative;
        text-align: center;
        align-content: center;
        justify-content: space-evenly;
        padding: 0 25px 0 53px;
        i {
          margin-top: 6px;
          width: 1px;
          height: 20px;
          background-color: #f4f4f4;
        }
        span {
          color: rgba(236, 83, 48, 1);
        }
      }
    }
    .sp-button {
      margin-top: 40px;
      height: 88px;
      border-radius: 8px;
      .sp-button__text {
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
}

.audit-company-name-from__center__input {
  ::v-deep .sp-popup--round {
    padding: 10px 40px 0;
    .sp-action-sheet__item {
      // margin-top: 6px !important;
      padding-left: 0;
      padding-right: 0;
      &::after {
        left: 0;
        right: 0;
        width: 100%;
      }
    }
  }
}
</style>
