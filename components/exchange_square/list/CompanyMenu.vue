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
import Industry from './Industry.vue' // 行业
import Region from './Region.vue' // 地区
import Price from './Price.vue' // 价格
import More from './More.vue' // 更多
import Sortord from './Sortord.vue' // 排序
export default {
  components: {
    Industry,
    Region,
    Price,
    Sortord,
    More,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
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
