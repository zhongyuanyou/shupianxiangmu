<template>
  <div>
    <sp-dropdown-item
      v-model="value"
      :title="title"
      :options="option"
      @change="changeItem"
    />
  </div>
</template>

<script>
import { DropdownItem } from '@chipspc/vant-dgg'

export default {
  components: {
    [DropdownItem.name]: DropdownItem,
  },
  data() {
    return {
      value: '',
      title: '筛选',
      option: [
        { text: '综合', value: 0 },
        { text: '最新发布', value: 1 },
        { text: '价格从低到高', value: 2 },
        { text: '价格从高到低', value: 3 },
      ],
    }
  },
  methods: {
    changeItem(val) {
      this.title = this.option[val]
    },
  },
}
</script>

<style lang="less" scoped></style>
