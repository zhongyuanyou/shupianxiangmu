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
      title: '排序',
      option: [
        { text: '不限', value: 0 },
        { text: '已下证', value: 1 },
        { text: '未下证', value: 2 },
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
