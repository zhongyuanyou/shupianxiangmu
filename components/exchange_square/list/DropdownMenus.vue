<template>
  <sp-dropdown-menu>
    <component
      :is="item"
      v-for="item in list"
      :key="item.id"
      @activeItem="getFilterHandle"
    />
  </sp-dropdown-menu>
</template>

<script>
import { DropdownMenu, DropdownItem } from '@chipspc/vant-dgg'
import Industry from './Industry.vue'
import Region from './Region.vue'
import Price from './Price.vue'
import Sortord from './Sortord.vue'
export default {
  components: {
    Industry,
    Region,
    Price,
    Sortord,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  data() {
    return {
      list: ['Industry', 'Region', 'Price', 'Sortord'],
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
