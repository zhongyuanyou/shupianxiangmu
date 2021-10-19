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
      title: '分类',
      active: '',
      list: [
        '不限',
        '01-化工原料',
        '02-颜料油漆',
        '03-日化用品',
        '04-燃料油脂',
        '05-医药用品',
      ],
    }
  },
  methods: {
    activeItem(index) {
      this.active = index
      this.title = this.list[index]
      this.$refs.item.toggle()
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
