<template>
  <sp-dropdown-item ref="item" :title="title">
    <div class="box">
      <div
        v-for="(item, index) in categoryList"
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
    categoryList: {
      type: Array,
      default: () => [],
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
      this.title = this.categoryList[index].name
      this.$refs.item.toggle()
      const params = {
        fieldCode: 'trademark_portfolio',
        fieldValue: [this.categoryList[index].code],
        matchType: 'MATCH_TYPE_MULTI',
      }
      this.$emit('activeItem', params, 'Csategory')
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  padding: 56px 28px;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 206px;
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
</style>
