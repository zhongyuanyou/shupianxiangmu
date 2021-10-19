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
export default {
  components: {
    Industry: () => import('./Industry.vue'), // 行业
    Region: () => import('./Region.vue'), // 地区
    Price: () => import('./Price.vue'), // 价格
    Sortord: () => import('./Sortord.vue'), // 排序
    More: () => import('./More.vue'), //  更多
    Category: () => import('./Category.vue'), //  类别
    Classify: () => import('./Classify.vue'), //  类型
    State: () => import('./State.vue'), //  状态
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
