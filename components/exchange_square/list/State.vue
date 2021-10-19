<template>
  <sp-dropdown-item ref="item" :title="title">
    <div class="sorting-list">
      <div
        v-for="(stateItem, stateIdx) in stateList"
        :key="stateIdx"
        @click="chooseState(stateIdx)"
      >
        <div :class="[active === stateIdx ? 'sort-active ' : 'sort']">
          {{ stateItem.name }}
        </div>
        <div v-show="active === stateIdx" class="check-icon">
          <my-icon
            class="icon"
            name="tab_ic_check"
            size="0.32rem"
            color="#4974F5"
          ></my-icon>
        </div>
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
    stateList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: '',
      title: '状态',
      active: '',
    }
  },
  methods: {
    chooseState(index) {
      this.active = index
      this.title = this.stateList[index].name
      this.$refs.item.toggle()
      this.$emit('activeItem', this.stateList[index], 'State')
    },
  },
}
</script>

<style lang="less" scoped>
.sorting-list {
  padding: 32px 0 40px;
  > div {
    width: 100%;
    height: 84px;
    padding: 28px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sort {
      width: 600px;
      line-height: 28px;
      font-size: 28px;
      color: #222222;
    }
    .sort-active {
      width: 600px;
      line-height: 28px;
      font-size: 28px;
      color: #4974f5;
    }
    .check-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
