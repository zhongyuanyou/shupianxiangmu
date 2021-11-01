<template>
  <sp-dropdown-item
    ref="item"
    :title="title"
    :title-class="title === '组合' ? '' : 'sp-dropdown-menu__title--active'"
  >
    <div class="box">
      <div
        v-for="(item, index) in combinationObj.children"
        :key="index"
        :class="active === index ? 'item active' : 'item'"
        @click="activeItem(index)"
      >
        {{ item.name }}
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
    combinationObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: '组合',
      active: '',
    }
  },
  methods: {
    activeItem(index) {
      this.active = index
      this.title = this.combinationObj.children[index].name
      this.$refs.item.toggle()
      const params = {
        fieldCode: this.combinationObj.ext1,
        fieldValue: [this.combinationObj.children[index].name],
        matchType: 'MATCH_TYPE_MULTI',
      }
      this.$emit('activeItem', params, 'Combination')
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  padding: 26px 28px 56px;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 149px;
    margin: 12px;
    padding: 20px 10px;
    text-align: center;
    background: #f8f8f8;
    font-size: 24px;
    color: #222222;
    border-radius: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .active {
    background: rgb(236, 241, 254);
    color: #4974f5;
    font-weight: bold;
  }
}
</style>
