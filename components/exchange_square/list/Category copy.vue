<template>
  <sp-dropdown-item
    ref="item"
    :title="title"
    :title-class="title === '分类' ? '' : 'sp-dropdown-menu__title--active'"
  >
    <div class="box">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="item.show ? 'item active' : 'item'"
        @click="activeItem(item)"
      >
        {{ item.name }}
      </div>
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
import { DropdownItem } from '@chipspc/vant-dgg'
export default {
  components: {
    [DropdownItem.name]: DropdownItem,
  },
  props: {
    categoryObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: '分类',
      active: '',
      list: [],
    }
  },
  watch: {
    'categoryObj.children'(value) {
      if (this.list && this.list.length) return
      value.forEach((item) => (item.show = false))
      this.list = JSON.parse(JSON.stringify(value))
    },
  },
  methods: {
    activeItem(item) {
      console.log(item)
      // this.$set(item, 'show', !item.show)
      item.show = !item.show
      if (item.name === '不限') {
        this.list.forEach((obj) => {
          if (obj.name !== '不限') {
            obj.show = false
          }
        })
      } else {
        this.list.forEach((obj) => {
          if (obj.name === '不限') {
            obj.show = false
          }
        })
      }
    },
    reset() {
      this.list.forEach((obj) => {
        this.$set(obj, 'show', false)
      })
    },
    custom() {
      const list = []
      this.list.forEach((item) => {
        if (item.show === true) {
          list.push(item.name)
        }
      })
      const params = {
        fieldCode: this.categoryObj.ext1,
        fieldValue: list,
        matchType: 'MATCH_TYPE_MULTI',
      }
      console.log(list)
      if (list.length > 1) {
        this.title = '多选'
      } else {
        this.title = list[0] || '分类'
      }
      this.$refs.item.toggle()
      console.log(params)
      this.$emit('activeItem', params, 'Csategory')
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .sp-popup {
  display: flex;
  flex-direction: column;
}
.box {
  flex: 1;
  overflow-y: auto;
  padding: 26px 28px 56px;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 149px;
    margin: 12px;
    padding: 20px 0;
    text-align: center;
    background: #f8f8f8;
    font-size: 24px;
    color: #222222;
    border-radius: 4px;
  }
  .active {
    background: rgb(236, 241, 254);
    color: #4974f5;
    font-weight: bold;
  }
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
