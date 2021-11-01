<template>
  <sp-dropdown-item
    ref="item"
    :title="title"
    :title-class="title === '类型' ? '' : 'sp-dropdown-menu__title--active'"
  >
    <div class="box">
      <div
        v-for="(item, index) in typeObj.children"
        :key="index"
        :class="active === index ? 'item active' : 'item'"
        @click="activeItem(item, index)"
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
    typeObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: '类型',
      active: '',
    }
  },
  methods: {
    activeItem(item, index) {
      this.active = index
      this.title = item.name
      this.$refs.item.toggle()
      const fileds = {
        fieldCode: this.typeObj.ext1,
        fieldValue: [this.title],
        matchType: 'MATCH_TYPE_MULTI',
      }
      this.$emit('activeItem', fileds, 'Type')
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
    margin: 12px;
    min-width: 149px;
    padding: 20px 0;
    background: #f8f8f8;
    font-size: 24px;
    text-align: center;
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
