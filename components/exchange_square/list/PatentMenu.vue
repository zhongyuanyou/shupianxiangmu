<template>
  <sp-dropdown-menu>
    <component
      :is="item"
      v-for="item in list"
      :key="item.id"
      title1="类型"
      @activeItem="getFilterHandle"
    />
  </sp-dropdown-menu>
</template>

<script>
import { DropdownMenu, DropdownItem } from '@chipspc/vant-dgg'
import Type from './Type.vue'
import Price from './Price.vue'
import Classify from './Classify.vue'
import Sortord from './Sortord.vue'
export default {
  components: {
    Type,
    Price,
    Sortord,
    Classify,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  data() {
    return {
      list: ['Type', 'Classify', 'Price', 'Sortord'],
    }
  },
  methods: {
    getFilterHandle(data, name) {
      console.log(data, name)
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .sp-dropdown-menu__title {
  max-width: 160px;
}
::v-deep .sp-dropdown-menu__bar {
  box-shadow: none;
}
</style>
