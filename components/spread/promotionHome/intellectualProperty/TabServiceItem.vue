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

<style lang="less">
.tab-service-item {
  .sp-tabs__line {
    width: 60px;
    height: 12px;
    background-image: linear-gradient(to right, #4974f5, transparent);
    background-color: transparent;
    opacity: 0.8;
    border-radius: 6px 0 0 6px;
    position: absolute;
    top: 46px;
    left: 15px;
  }
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
  } // 导航内容
  .sp-tab {
    -webkit-box-flex: 1;
    -webkit-flex: 1 0 auto;
    flex: 1 0 auto;
    padding: 0;
    padding-right: 40px;
    // justify-content: flex-start;
    // -webkit-justify-content: flex-start;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 64px;
    .sp-tab__text {
      font-weight: 400;
    }
  }
  .sp-tab:first-child {
    padding-left: 20px;
  }
  /deep/.sp-tab--active {
    font-weight: bold;
    color: #222222;
    line-height: 32px;
  }
}
</style>
