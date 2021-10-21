<template>
  <sp-dropdown-item ref="item" :title="title">
    <div class="box">
      <sp-tree-select
        class="first"
        selected-icon
        :items="regionList"
        :main-active-index.sync="provinceIndex"
        @click-nav="provinceClick"
      >
        <template slot="content">
          <sp-tree-select
            selected-icon
            class="second"
            :items="cityList"
            :main-active-index.sync="cityIndex"
            @click-nav="second"
          >
            <template #content>
              <div
                v-for="item in areaList"
                :key="item.id"
                class="list"
                @click.stop="third(item)"
              >
                <div class="item">
                  <div
                    :style="{
                      color: item.show ? '#4974F5' : '',
                      fontWeight: item.show ? 'bold' : 400,
                    }"
                  >
                    {{ item.text }}
                  </div>
                  <my-icon
                    size="0.28rem"
                    :color="item.show ? '#4974F5' : '#DDDDDD'"
                    :name="
                      item.show ? 'tab_ic_checkbox_s' : 'tab_ic_checkbox_n'
                    "
                  >
                  </my-icon>
                </div>
              </div>
            </template>
          </sp-tree-select>
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
      cityIndex: 0,
      id: '',
      activeIds: [],
      cityList: [], // 市
      areaList: [], // 区
      areaId: [], // 已选的区域
      cityId: '', // 城市id
      province: '', // 省id
    }
  },
  watch: {
    regionList: {
      handler() {
        this.cityList = this.regionList[0].children
        this.areaList = this.regionList[0].children[0].children
      },
    },
  },
  mounted() {},
  methods: {
    reset() {
      this.cityList = this.regionList[0]?.children
      this.provinceIndex = 0
      this.cityIndex = 0
    },
    // 确定
    custom() {
      // 获取区id
      this.areaId = []
      this.areaList.forEach((item) => {
        if (item.show) {
          this.areaId.push(item.id)
        }
      })
      console.log('已选的区ID', this.areaId)
      console.log('已选的城市ID', this.cityId)
      console.log('已选的省ID', this.province)
      let ids = []
      console.log(this.areaId[0] !== 0)
      if (this.areaId[0] !== 0) {
        ids = this.areaId
      } else if (this.cityId) {
        ids.push(this.cityId)
      } else {
        ids.push(this.province)
      }
      this.$refs.item.toggle()
      this.$emit(
        'activeItem',
        {
          fieldCode: 'registration_area',
          fieldValue: ids,
          matchType: 'MATCH_TYPE_MULTI',
        },
        'Region'
      )
    },
    provinceClick(index) {
      this.provinceIndex = index
      this.cityList = this.regionList[this.provinceIndex].children
      this.province = this.regionList[this.provinceIndex].id
      // 每次切换是重置城市

      this.cityId = ''
      this.areaId = []
      this.cityIndex = 0
    },
    // 区选择
    second() {
      this.areaList =
        this.regionList[this.provinceIndex].children[this.cityIndex].children
      // 每次切换是清空数据
      this.areaList.forEach((item) =>
        item.text === '不限' ? (item.show = true) : (item.show = false)
      )
      this.areaId = []
      // 城市id
      this.cityId = this.cityList[this.cityIndex].id
    },
    third(item) {
      item.show = !item.show
      if (item.text === '不限') {
        this.areaList.forEach((data) => {
          if (data.text !== item.text) {
            data.show = false

            this.areaId = []
          }
        })
      } else {
        this.areaList[0].show = false
      }
      console.log(this.areaId)
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
.list {
  min-height: 87px;
  font-size: 28px;
  padding: 24px 40px;
  color: #222222;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
