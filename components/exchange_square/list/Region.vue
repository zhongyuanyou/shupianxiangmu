<template>
  <sp-dropdown-item ref="item" :title="title">
    <div class="box">
      <sp-tree-select
        class="first"
        selected-icon
        :items="regionList"
        :main-active-index.sync="provinceIndex"
        @click.native="provinceClick"
      >
        <!-- regionList[provinceIndex].children -->
        <template slot="content">
          <sp-tree-select
            class="second"
            :items="cityList"
            :active-id.sync="activeIds"
            :main-active-index.sync="active"
          />
        </template>
      </sp-tree-select>
    </div>
    <div class="filter-footer">
      <div class="filter-footer-rest" @click="reset">
        <div class="filter-footer-rest-icon">
          <my-icon name="tab_ic_redu" color="#1A1A1A" size="0.4rem" />
        </div>
        <span class="filter-footer-rest-text">重置</span>
      </div>
      <div @click="custom">确定</div>
    </div>
  </sp-dropdown-item>
</template>

<script>
import { TreeSelect, DropdownItem } from '@chipspc/vant-dgg'

export default {
  components: {
    [DropdownItem.name]: DropdownItem,
    [TreeSelect.name]: TreeSelect,
  },
  props: {
    regionList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: '地区',
      provinceIndex: 0,
      active: 0,
      activeIds: [],
      cityList: [], // 市
    }
  },
  computed: {},
  methods: {
    reset() {},
    custom() {},
    provinceClick() {
      console.log(this.provinceIndex)
      this.cityList = this.regionList[this.provinceIndex].children
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .sp-sidebar-item--select::before {
  background: none;
}

.first {
  ::v-deep .sp-sidebar {
    width: 162px;
    flex: none;
  }
  ::v-deep v-deep .sp-sidebar,
  .sp-tree-select__nav {
    color: #222222;
    background: #f0f0f0 !important;
  }
  ::v-deep v-deep.sp-sidebar-item,
  .sp-tree-select__nav-item {
    background: #f0f0f0 !important;
  }
  ::v-deep .sp-sidebar-item--select,
  .sp-sidebar-item--select:active {
    color: #4974f5;
    background: #f8f8f8 !important;
  }
}
.second {
  ::v-deep .sp-sidebar {
    width: 240px;
    flex: none;
  }
  ::v-deep v-deep .sp-sidebar,
  .sp-tree-select__nav {
    color: #222222;
    background: #f8f8f8 !important;
  }
  ::v-deep v-deep.sp-sidebar-item,
  .sp-tree-select__nav-item {
    background: #f8f8f8 !important;
  }
  ::v-deep .sp-sidebar-item--select,
  .sp-sidebar-item--select:active {
    color: #4974f5;
    background: #ffffff !important;
  }
}
::v-deep .sp-sidebar-item {
  min-height: 87px;
  font-size: 28px;
  padding: 24px 22px;
}
.filter-footer {
  display: flex;
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #f4f4f4;
  height: 159px;
  box-sizing: border-box;
  padding: 31px 40px 32px 0;
  font-size: 0px;

  & > div:nth-child(1) {
    text-align: center;
    padding: 0px 44px;
    .filter-footer-rest-icon {
      padding: 10px 0;
    }
    .filter-footer-rest-text {
      color: #1a1a1a;
      letter-spacing: 0;
      font-size: 24px;
      line-height: 24px;
    }
  }
  & > div:nth-child(2) {
    flex: 1;
    background: #4974f5;
    border-radius: 8px;
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    line-height: 96px;
    height: 96px;
    cursor: pointer;
  }
}
</style>
