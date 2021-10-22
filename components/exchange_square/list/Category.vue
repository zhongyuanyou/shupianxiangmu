<template>
  <sp-dropdown-item
    ref="item"
    :title="title"
    :title-class="title === '分类' ? '' : 'sp-dropdown-menu__title--active'"
  >
    <div class="box">
      <div
        v-for="(item, index) in list(categoryObj.children)"
        :key="index"
        :class="item.show ? 'item active' : 'item'"
        @click="activeItem(item)"
      >
        {{ item.show }}
        <!-- {{ item.name }} -->
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
    }
  },
  computed: {
    list() {
      return (list) => {
        return []
      }
    },
  },
  methods: {
    activeItem(item) {
      this.$set(item, 'show', !item.show)
      if (item.name === '不限') {
        this.categoryObj.children.forEach((obj) => {
          if (obj.name !== '不限') {
            this.$set(obj, 'show', false)
          }
        })
      } else {
        this.categoryObj.children.forEach((obj) => {
          if (obj.name === '不限') {
            this.$set(obj, 'show', false)
          }
        })
      }
    },
    reset() {
      this.categoryObj.children.forEach((obj) => {
        this.$set(obj, 'show', false)
      })
    },
    custom() {
      const list = []
      this.categoryObj.children.forEach((item) => {
        if (item.show === true) {
          list.push(item.name)
        }
      })
      const params = {
        fieldCode: this.categoryObj.ext1,
        fieldValue: list,
        matchType: 'MATCH_TYPE_MULTI',
      }
      if (list.length > 1) {
        this.title = '多选'
      } else {
        this.title = list[0]
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
  padding: 56px 28px;
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
