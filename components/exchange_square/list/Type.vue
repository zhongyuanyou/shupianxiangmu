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
        '不限',
        '发明专利',
        '广告传媒',
        '实用新型',
        '外观专利',
        '外观专利',
      ],
    }
  },
  mounted() {
    this.title = this.$attrs.title1
  },
  methods: {
    activeItem(index) {
      this.active = index
      this.title = this.list[index]
      this.$refs.item.toggle()
      this.$emit('activeItem', index, 'Type')
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
  }
}
</style>
