<template>
  <div v-if="isShow" class="fixed-head" style="height: 44px">
    <div class="my-head" style="height: 44px; padding-top: 0px">
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
            :placeholder="defaultSearchKey"
            :maxlength="maxlength"
            @keyup.enter="search"
          />
          <my-icon
            v-show="value"
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
    maxlength: {
      type: Number,
      default: 50,
    },
    // 默认搜索项
    defaultSearchKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isShow: true,
      value: this.$route.query.searchKey || '',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  watch: {
    // 清空搜索项则清除默认搜索
    value: {
      handler(nVal, oVal) {
        if (oVal && !nVal) {
          this.$emit('clearDefaultSearchKey')
        }
      },
    },
    // '$route.query.searchKey': {
    //   handler(v) {
    //     console.log(v)
    //     if (v) {
    //       this.value = v
    //     }
    //   },
    // },
  },
  mounted() {},
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
    search() {
      this.value = this.value || this.defaultSearchKey
      this.$emit('searchValue', this.value)
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
    font-size: 28px;
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
