<template>
  <div
    v-if="isShow"
    :class="{ 'fixed-head': fixed, 'safe-area-top': useSafeAreaClass }"
    :style="{
      height: headHeight,
      'padding-top': safeTop + 'px',
      'box-sizing': 'content-box',
    }"
  >
    <div
      class="my-head"
      :class="myHeadClass"
      :style="{ height: headHeight, 'padding-top': safeTop + 'px' }"
    >
      <div class="my-head-row">
        <!-- 返回 -->
        <div class="slot-left">
          <slot name="left">
            <my-icon
              class="back-icon"
              name="nav_ic_back"
              size="0.4rem"
              color="#1A1A1A"
              @click.native="onLeftClick"
            ></my-icon>
          </slot>
        </div>
        <div class="input-box">
          <my-icon name="sousuo2" size="0.28rem" color="#CCCCCC"></my-icon>
          <input
            v-model="value"
            class="input"
            type="text"
            :maxlength="maxlength"
          />
          <my-icon
            name="guanbi_mian"
            size="0.32rem"
            color="#CCCCCC"
            @click.native="value = ''"
          ></my-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import safeAreaInsets from 'safe-area-insets'
import config from '@/config'

export default {
  name: 'Header',
  props: {
    // 头部高度
    height: {
      required: false,
      type: [Number, String],
      default: '0.88rem',
    },
    // 是否吸顶
    fixed: {
      type: Boolean,
      default: () => true,
    },
    maxlength: {
      type: Number,
      default: 50,
    },
    // 自定义类名
    headClass: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isShow: true,
      value: '',
      safeTop: 20, // 顶部安全区的高度
      useSafeAreaClass: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    headHeight() {
      if (typeof this.height === 'number') {
        return this.height + 'px'
      }
      return this.height
    },
    myHeadClass() {
      return this.useSafeAreaClass
        ? `${this.headClass} safe-area-top`
        : this.headClass
    },
  },
  created() {
    // 因为通过中间件ua获取到了 isInApp 的值，故可以在服务端设置，避免页面上头部抖动
    if (process && process.server && !this.isInApp) {
      this.safeTop = 0
      this.useSafeAreaClass = true
    }
  },
  mounted() {
    this.getTopMargin()
  },
  methods: {
    onLeftClick() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        window.location.href = config.domainUrl
      } else {
        this.$router.back()
      }
      this.$emit('backHandle')
    },
    getTopMargin() {
      if (process && process.client) {
        let safeTop = safeAreaInsets.top
        if (this.isInApp) safeTop = this.appInfo.statusBarHeight
        this.safeTop = safeTop
      }
    },
  },
}
</script>
<style lang="less" scoped>
.my-head {
  font-size: 24px;
  background-color: #ffffff;
  &-row {
    padding: 32px;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .slot-left {
    display: flex;
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
    .back-icon {
      margin-left: 40px;
    }
  }
  .title {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    flex: 1;
    text-align: center;
  }
  .safe-area-top {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
}
.input-box {
  padding: 0 24px;
  display: flex;
  align-items: center;
  margin-left: 72px;
  width: 100%;
  height: 68px;
  background: #f5f5f5;
  border-radius: 12px;
  border: 0;
  .input {
    margin-left: 12px;
    width: 100%;
    height: 68px;
    background: #f5f5f5;
    border-radius: 12px;
    border: 0;
  }
}

.fixed-head {
  width: 100%;
  .my-head {
    box-sizing: content-box;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
}
</style>
