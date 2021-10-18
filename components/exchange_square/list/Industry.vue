<template>
  <sp-dropdown-item ref="item" :title="title">
    <div class="box">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="active === index ? 'item active' : 'item'"
        @click="activeItem(index)"
      >
        {{ item }}
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
  data() {
    return {
      title: '行业',
      active: '',
      list: [
        '内容选项',
        '科技信息',
        '广告传媒',
        '广告传媒',
        '广告传媒',
        '广告传媒',
      ],
    }
  },
  methods: {
    activeItem(index) {
      this.active = index
      this.title = this.list[index]
      this.$refs.item.toggle()
      this.$emit('activeItem', index, 'Industry')
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
    margin: 12px;
    width: max-content;
    padding: 20px 26px;
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
