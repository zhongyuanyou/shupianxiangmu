<template>
  <!-- tab 切换组件     -->
  <div>
    <sp-sticky v-if="needFixed" :offset-top="offsetTop" @scroll="scrollHandle">
      <div
        class="tab-curve"
        :class="[isFixed ? 'fixed-tab' : '']"
        :style="{ backgroundColor: bgColor }"
      >
        <ul class="tab-curve-list">
          <li
            v-for="(item, index) in tabList"
            :key="index"
            :style="{ 'margin-right': right + 'rem' }"
            @click="selectItem(item, index)"
          >
            <span
              :class="[index === visible ? 'tab-curve-active' : '']"
              :style="{ backgroundColor: bgColor }"
              >{{ item[nameField] }}</span
            >
            <div class="svg-content">
              <!-- <my-icon
                class="my-icon"
                name="tab_ic_act"
                size="0.5rem"
                color="#4974f5"
              ></my-icon> -->
              <img
                class="my-icon"
                src="https://cdn.shupian.cn/sp-pt/wap/7jm4ttjg3780000.png"
                alt=""
              />
              <!-- <my-icon
                class="my-icon icon-white"
                name="tab_ic_act"
                size="0.5rem"
                color="#ffffff"
              ></my-icon> -->
            </div>
          </li>
        </ul>
      </div>
    </sp-sticky>
    <div v-else class="tab-curve">
      <ul class="tab-curve-list">
        <li
          v-for="(item, index) in tabList"
          :key="index"
          :style="{ 'margin-right': right + 'rem' }"
          @click="selectItem(item, index)"
        >
          <span :class="[index === visible ? 'tab-curve-active' : '']">{{
            item[nameField]
          }}</span>
          <div class="svg-content">
            <my-icon
              class="my-icon"
              name="tab_ic_act"
              size="0.5rem"
              color="#4974f5"
            ></my-icon>
            <my-icon
              class="my-icon icon-white"
              name="tab_ic_act"
              size="0.5rem"
              color="#ffffff"
            ></my-icon>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Sticky } from '@chipspc/vant-dgg'
export default {
  name: 'TabCurve',
  components: {
    [Sticky.name]: Sticky,
  },
  model: {
    prop: 'curentItem',
    event: 'update',
  },
  props: {
    // 背景颜色
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    // 当前选中项
    curentItem: {
      type: Number,
      default: () => {
        return 0
      },
    },
    // tab 列表
    tabList: {
      type: Array,
      default: () => {
        return []
      },
    },
    // label展示的字段
    nameField: {
      type: String,
      default: () => {
        return 'label'
      },
    },
    // 每个TAB之间的间距
    right: {
      type: Number,
      default: 0.56,
    },
    // 是否需要吸顶功能
    needFixed: {
      type: Boolean,
      default: true,
    },
    // 吸顶时与顶部的距离
    offsetTop: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isFixed: false, // 是否触发了吸顶
    }
  },
  computed: {
    visible: {
      get() {
        return this.curentItem
      },
      set(val) {
        this.$emit('update', val)
      },
    },
  },
  methods: {
    // 选择某项
    selectItem(item, index) {
      this.visible = index
      this.$emit('selectTabHandle', { ...item, index })
    },
    // 滚动事件
    scrollHandle(data) {
      this.isFixed = data.isFixed
    },
  },
}
</script>

<style lang="less" scoped>
.tab-curve {
  width: 100%;
  font-size: 24px;
  &-list {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 104px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 37px;
    padding-left: 40px;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      position: relative;
      white-space: nowrap;
      -webkit-tap-highlight-color: transparent;
      &:last-child {
        padding-right: 40px;
      }
      span {
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        font-size: 32px;
        line-height: 34px;
        background: #fff;
        position: relative;
        z-index: 4;
      }
      .tab-curve-active {
        font-size: 32px;
        line-height: 34px;
        color: #222222;
        display: block;
        // font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        // color: #4974f5;
        margin-top: -2px;
        & + .svg-content {
          display: block !important;
        }
      }
    }
  }
}
.fixed-tab {
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
  .tab-curve-list {
    height: 112px;
    padding-top: 35px;
  }
}
.tab-curve-list {
  height: 70px;
  padding-top: 34px;
  padding-left: 22px;
  li span {
    font-size: 32px;
    line-height: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
  }
}
.svg-content {
  display: none;
  overflow: hidden;
  z-index: 4;
  position: relative;
  right: 0;
  top: -11px;
  // width: 60px;
  height: 16px;
  width: 100%;
  // height: 50px;
  // margin: -6px auto 0;
  .my-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 12px;
  }
  //   forwards infinite
  .icon-white {
    animation: action 0.2s linear forwards;
    background-color: #fff;
    transform-origin: center top;
  }
  @keyframes action {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-180deg);
    }
  }
}
</style>
