<template>
  <div class="trademark-good">
    <div v-for="(item, i) of list" :key="i" class="list">
      <img :src="item.goodsImg" alt="" class="photo" />
      <div class="title">
        <div class="name">{{ classify(item.fieldList) }}{{ item.name }}</div>
        <div class="tag">
          <span v-for="(tagItem, tagKey) of item.sellLabel" :key="tagKey">
            {{ tagItem }}
          </span>
        </div>
        <div class="slogan">
          <span v-if="getState(item.fieldList, 'trademark_type')"
            >{{ getState(item.fieldList, 'trademark_type') }} |
          </span>
          {{ getState(item.fieldList, 'trademark_status') }}
        </div>
        <div class="price">{{ item.referencePrice }}<span>元</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  computed: {
    // 状态
    getState() {
      return (list, text) => {
        let str = ''
        list.forEach((item) => {
          if (item.fieldCode === text) {
            str = item.fieldValue
          }
        })
        return str || ''
      }
    },
    // 分类
    classify() {
      return (list) => {
        let str = ''
        list.forEach((item) => {
          if (item.fieldCode === 'trademark_category') {
            str = item.fieldValueList[0]
          }
        })
        return '[' + str + ']'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.trademark-good {
  padding: 0 20px;
  column-count: 2;
  -webkit-column-count: 2; /* 兼容性 */
  -moz-column-count: 2; /* 兼容性 */
  column-gap: 20px;
  .list {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    background: #fff;
    overflow: hidden;
    border-radius: 24px;
    margin-bottom: 20px;
    .photo {
      width: 100%;
      height: 239px;
      object-fit: cover;
    }
    > .title {
      border-top: 1px soild #f4f4f4;
      padding: 20px 20px 18px 20px;
      > .name {
        font-size: 30px;
        color: #222222;
        font-weight: bold;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 40px;
      }
      > .tag {
        margin-top: 12px;
        display: flex;
        > span {
          margin-left: 8px;
          height: 28px;
          background: #f0f2f5;
          border-radius: 4px;
          font-size: 20px;
          color: #5c7499;
          padding: 0 6px;
        }
        > span:first-child {
          margin-left: 0;
        }
      }
      > .slogan {
        margin-top: 12px;
        font-size: 22px;
        color: #222222;
      }
      > .price {
        font-size: 36px;
        color: #ec5330;
        font-weight: bold;
        display: flex;
        align-items: center;
        margin-top: 16px;
        > span {
          font-size: 22px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
