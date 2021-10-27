<template>
  <div class="header" :style="{ backgroundColor: bgColor, height: '56px' }">
    <div class="slot-left">
      <slot name="left">
        <my-icon
          class="back-icon"
          name="nav_ic_back"
          size="0.4rem"
          color="#1A1A1A"
          @click.native="onLeftClick"
        ></my-icon>
      </slot>
    </div>
    <div class="title">{{ title }}</div>
    <div
      class="search-box"
      :style="{ backgroundColor: searchColor }"
      @click="$router.push($attrs.path || '')"
    >
      <my-icon
        class="search-icon"
        name="sousuo3"
        size="0.28rem"
        color="#CCCCCC"
      ></my-icon>
      <input
        :placeholder="placeholder"
        class="search-input"
        v-bind="$attrs"
        @focus="searchFocus"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    bgColor: {
      type: String,
      default: '#f5f5f5',
    }, // 背景颜色
    searchColor: {
      type: String,
      default: '#fff',
    }, // 搜索框背景颜色
    title: {
      type: String,
      default: '找专利',
    }, // 标题名称
    placeholder: {
      type: String,
      default: '请输入关键词',
    }, //  搜索框提示词
  },
  methods: {
    // 返回上一页
    onLeftClick() {
      this.$router.back(-1)
      this.$emit('backHandle')
    },
    // 输入框聚焦
    searchFocus() {
      this.$emit('searchFocus')
      console.log(111)
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  height: 112px;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  .slot-left {
    display: flex;
    align-items: center;
  }
  .title {
    margin-left: 16px;
    font-size: 36px;
    color: #1a1a1a;
    line-height: 36px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .search-box {
    margin-left: 20px;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 16px 56px 16px 20px;
    display: flex;
    align-items: center;
    .search-icon {
      flex-shrink: 0;
    }
    .search-input {
      margin-left: 10px;
      width: 100%;
      height: 100%;
      display: block;
      border: none;
      background: none;
      font-size: 28px;
      font-weight: 700;
    }
    > input::-webkit-input-placeholder {
      color: #999999;
    }
  }
}
</style>
