<template>
  <div class="tab-service-item">
    <sp-tabs
      v-model="active"
      :background="isFixed ? '#ffffff' : '#F5F5F5'"
      :swipe-threshold="4"
      sticky
      title-style="title-style"
      :offset-top="'1.28rem'"
      @scroll="scroll"
      @click="onClick"
    >
      <sp-tab
        v-for="(items, proKey) of titleName"
        :key="proKey"
        :title="items.name"
      >
        <slot name="list"></slot>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { Toast, Tab, Tabs } from '@chipspc/vant-dgg'
export default {
  name: 'TabServiceItem',
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  props: {
    titleName: {
      type: Array,
      default: () => {
        return [
          {
            code: 1,
            type: 1,
            name: '为你推介',
          },
          {
            code: 2,
            type: 1,
            name: '工商服务',
          },
          {
            code: 3,
            type: 1,
            name: '会计服务',
          },
          {
            code: 4,
            type: 1,
            name: '知识服务',
          },
          {
            code: 5,
            type: 1,
            name: '资质服务',
          },
        ]
      },
    },
  },
  data() {
    return {
      active: 0,
      isFixed: false,
    }
  },
  methods: {
    onClick(name, title) {
      this.$emit('change', this.titleName[name])
    },
    scroll(e) {
      this.isFixed = e.isFixed
    },
  },
}
</script>

<style lang="less" scoped>
.tab-service-item {
  .sp-tabs__nav--complete {
    padding: 0px;
    padding-left: 0px;
  }
  /deep/.sp-tabs {
    // 最外层宽度
    .sp-tabs__wrap {
      width: @spread-page-width;
      margin: 0 auto;
      // padding-left: 20px;
    }
  }

  .sp-tab:first-child {
    padding-left: 20px;
  }
  ::v-deep.sp-tab--active {
    font-weight: bold;
    line-height: 32px;
    .sp-tab__text {
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #222222;
    }
  }
  ::v-deep.sp-tab {
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
  }
  ::v-deep.sp-tabs__line {
    width: 60px;
    height: 12px;
    background: linear-gradient(90deg, rgba(73, 116, 245, 0.8), #dbe4fc);
    border-radius: 6px;
    top: 47px;
    left: 34px;
  }
  ::v-deep.sp-tab__text {
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #999999;
  }
  ::v-deep.sp-tabs__wrap {
    margin-bottom: 11px;
  }
  // ::v-deep.sp-tabs__nav {
  //   width: 750px;
  //   padding: 0 20px;
  //   margin: 0 auto;
  // }
}
</style>
