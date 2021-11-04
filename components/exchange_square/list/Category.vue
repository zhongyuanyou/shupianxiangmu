<template>
  <sp-dropdown-item
    ref="item"
    :title="title"
    :title-class="title === '分类' ? '' : 'sp-dropdown-menu__title--active'"
  >
    <div class="box">
      <div
        v-for="(item, index) in categoryObj.children"
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
  methods: {
    activeItem(index) {
      this.active = index
      this.title = this.categoryObj.children[index].name
      this.$refs.item.toggle()
      const params = {
        fieldCode: this.categoryObj.ext1,
        fieldValue: [this.categoryObj.children[index].name],
        matchType: 'MATCH_TYPE_MULTI',
      }
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
  padding: 26px 28px 48px;
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
</style>
