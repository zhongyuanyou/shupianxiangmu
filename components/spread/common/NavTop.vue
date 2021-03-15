<template>
  <div class="search">
    <sp-sticky>
      <div :style="{ backgroundColor: bgColor }" class="nav-top">
        <Search
          :opacity="opacity"
          :icon-left="0.25"
          :type="type"
          :placeholder="placeholder"
          :maxlength="maxlength"
          @valChangeHandle="searchInputHandle"
          @searchKeydownHandle="searchKeydownHandle"
        >
          <template v-slot:left>
            <span class="serch-left" @click="onClickLeft"
              ><my-icon
                size="0.32rem"
                name="order_ic_listnext"
                :style="{ color: `rgba(${colorVal},${colorVal},${colorVal})` }"
              />
              <span
                class="title"
                :style="{ color: `rgba(${colorVal},${colorVal},${colorVal})` }"
                >{{ title }}
              </span></span
            >
          </template>
        </Search>
      </div>
    </sp-sticky>
    <div v-for="(item, index) of 120" :key="index"></div>
  </div>
</template>

<script>
import { Icon, Sticky } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
export default {
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    Search,
  },
  props: {
    // 标题
    title: {
      type: String,
      default: '知识产权',
    },
    // 输入框的如如长度限制
    maxlength: {
      type: Number,
      default: 100,
    },
    // 输入框类型
    type: {
      type: String,
      default: 'search',
    },
    // 是否变化字体
    isBlack: {
      type: Boolean,
      default: false,
    },
    // 默认字体颜色颜色
    defaultColor: {
      type: Number,
      default: 250,
    },
    placeholder: {
      type: String,
      default: '请输入关键字',
    },
  },
  data() {
    return {
      opacity: 0, // 透明度
      scrollPercentage: 120, // 滚动的距离
      inputVal: '',
      colorVal: 250,
      bgColor: null,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.searchHandle) // 监听滚动
    this.colorVal = this.defaultColor
    if (this.isBlack) {
      this.bgColor = '#f5f5f5'
    }
  },
  methods: {
    searchHandle(val) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop // 滚动条距离顶部的位置
      this.opacity = scrollTop / this.scrollPercentage // 透明度
      if (this.isBlack) {
        this.colorVal = 26
        return
      }
      if (scrollTop < 50) {
        this.colorVal = 250
      } else {
        this.colorVal = 26
      }
    },
    // 值变化
    searchInputHandle(val) {
      this.$emit('inputVal', val)
      this.inputVal = val
    },
    // 回车 事件
    searchKeydownHandle(e) {
      if (e.keyCode === 13) {
        // this.$refs.inputRef.blur()
        this.$emit('searchKeydownHandle', this.inputVal)
      }
    },
    // 返回
    onClickLeft() {
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },
  },
}
</script>

<style lang="less">
.search {
  .nav-top {
    width: @spread-page-width;
    margin: 0 auto;

    .search-content {
      width: @spread-page-width;
      padding: 20px 20px 20px 28px;
      display: flex;
      align-items: center;
      .serch-left {
        display: flex;
        align-items: center;
        height: 100%;
        .title {
          font-size: 36px;
          font-family: PingFang;
          font-weight: bold;
          padding-right: 21px;
          padding-left: 10px;
          height: 100%;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
      }
      .spiconfont-order_ic_listnext {
        transform: rotate(180deg);
        display: flex;
        align-items: center;
      }
      .input-box {
        height: 72px;
        background: #ededed;
        border-radius: 16px;
        border: none;
        input {
          background: #ededed;
        }
      }
    }
  }
}
</style>
