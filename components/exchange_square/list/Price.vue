<template>
  <sp-dropdown-item
    ref="item"
    :title="title"
    :title-class="title === '价格' ? '' : 'sp-dropdown-menu__title--active'"
  >
    <div class="box">
      <div
        v-for="(item, index) in priceList"
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
    priceList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: '价格',
      active: '',
    }
  },
  methods: {
    activeItem(index) {
      this.active = index
      this.title = this.priceList[index].name
      this.$refs.item.toggle()
      const params = {
        platformPriceEnd: this.priceList[index].ext2.split('-')[1] * 1,
        platformPriceStart: this.priceList[index].ext2.split('-')[0] * 1,
      }
      if (this.priceList[index].name === '不限') {
        this.$emit('activeItem', {}, 'Price')
      } else {
        this.$emit('activeItem', params, 'Price')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.sp-dropdown-menu__title--active {
  color: #4974f5;
  font-weight: bold;
}
.box {
  padding: 26px 28px 48px;
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
    font-weight: bold;
  }
}
</style>
