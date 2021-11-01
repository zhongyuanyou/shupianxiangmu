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
      title: '价格',
      active: '',
      list: [
        '不限',
        '3000元以下',
        '3000元-1万',
        '1万-3万',
        '3万-5万',
        '5万以上',
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
  padding: 26px 28px 56px;
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
