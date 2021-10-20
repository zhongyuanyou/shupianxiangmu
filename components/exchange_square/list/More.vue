<template>
  <sp-dropdown-item ref="item" :title="title">
    <div class="dropdown">
      <div class="box">
        <div v-for="(item, index) in moreList" :key="index">
          <!-- 标题 -->
          <div class="title">{{ item.name }}</div>
          <div class="list">
            <div
              v-for="(data, key) in item.children"
              :key="key"
              :class="
                active[index] === key ? 'active' : active[index] ? 'item' : ''
              "
              @click="activeItem(data, item, index, key)"
            >
              {{ data.name }}
            </div>
          </div>
        </div>
      </div>
      <!-- 确定  -->
      <div class="filter-footer">
        <div class="filter-footer-rest" @click="reset">
          <div class="filter-footer-rest-icon">
            <my-icon name="tab_ic_redu" color="#1A1A1A" size="0.4rem" />
          </div>
          <span class="filter-footer-rest-text">重置</span>
        </div>
        <div @click="custom">确定</div>
      </div>
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
    moreList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: '更多',
      params: {
        list: [],
        nameLengthEnd: '',
        nameLengthStart: '',
      },
      active: [],
    }
  },
  methods: {
    activeItem(data, item, index, key) {
      this.$set(this.active, index, key)
      console.log(this.active)
    },
    reset() {
      this.active = Object.values(this.active).map((key) => {
        return (key = 0)
      })
      console.log(this.active)
    },
    custom() {
      const list = []
      this.active.forEach((item, index) => {
        list.push(this.moreList[index].children[item])
      })
      console.log(list)
      // this.$refs.item.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .sp-popup {
  display: flex;
}
.dropdown {
  display: flex;
  flex-direction: column;
}
.box {
  flex: 1;
  overflow-y: auto;
  padding: 56px 28px;
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      background: #f8f8f8 !important;
      font-size: 24px !important;
      color: #222222 !important;
      font-weight: 400 !important;
    }
    > div {
      width: 149px;
      margin: 12px;
      padding: 20px 16px;
      text-align: center;
      background: #f8f8f8;
      font-size: 24px;
      color: #222222;
      border-radius: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:first-child {
        background: rgb(236, 241, 254);
        color: #4974f5;
        font-weight: bold;
      }
    }
  }

  .active {
    background: rgb(236, 241, 254) !important;
    color: #4974f5 !important;
    font-weight: bold;
  }
  .title {
    margin-bottom: 28px;
    font-size: 36px;
    font-weight: 700;
    color: #222;
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
