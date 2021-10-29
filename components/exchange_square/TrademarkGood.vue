<template>
  <div class="trademark-good">
    <div v-for="(item, i) in list" :key="i" class="list" @click="jump(item)">
      <img :src="getImg(item)" alt="" class="photo" />
      <div class="title">
        <div class="name">{{ classify(item.fieldList) }}{{ item.name }}</div>
        <div v-if="item.sellLabel && item.sellLabel.length !== 0" class="tag">
          <span
            v-for="(tagItem, tagKey) in item.sellLabel"
            v-show="tagKey < 3"
            :key="tagKey"
          >
            {{ tagItem }}
          </span>
        </div>
        <div class="slogan">
          <span v-if="getState(item.fieldList, 'trademark_type')"
            >{{ getState(item.fieldList, 'trademark_type') }} |
          </span>
          {{ getState(item.fieldList, 'trademark_status') }}
        </div>
        <div class="price">
          {{ setPrice(item.referencePrice)
          }}<span>{{ item.referencePrice > 9999 ? '万' : '元' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isArray } from '~/utils/check-types'
import { price } from '@/utils/spread/exchange-square'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
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
        if (isArray(list)) {
          list.forEach((item) => {
            if (item.fieldCode === text) {
              str = item.fieldValue
            }
          })
        }

        return str || ''
      }
    },
    // 分类
    classify() {
      return (list) => {
        let str = ''
        if (isArray(list)) {
          list.forEach((item) => {
            if (item.fieldCode === 'trademark_category') {
              str = item.fieldValueList[0]
            }
          })
        }
        if (str) {
          return '[' + str + ']'
        } else {
          return ''
        }
      }
    },
    // 图片
    getImg() {
      return (item) => {
        const img =
          'https://cdn.shupian.cn/sp-pt/wap/images/23ptgue5z4ow000.png'
        try {
          return (
            item.fieldList.find((obj) => {
              return obj.fieldName === '商标图片'
            }).fieldValueCn || img
          )
        } catch (error) {
          return img
        }
      }
    },
  },
  methods: {
    setPrice(data) {
      return price(data)
    },
    jump(item) {
      let base = ''
      DGG_SERVER_ENV === 'development' && (base = 'd')
      DGG_SERVER_ENV === 'release' && (base = 't')
      DGG_SERVER_ENV === 'production' && (base = '')
      if (item.classCode === 'FL20201224136273') {
        window.location.href = `https://${base}m.shupian.cn/detail/transaction/brand?productId=${item.id}`
      }
    },
  },
}
</script>

<style lang="less" scoped>
.trademark-good {
  padding: 20px;
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
        display: flex;
        padding: 6px 0;
        flex-wrap: wrap;
        > span {
          margin-left: 8px;
          margin: 6px 4px;
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
        margin-top: 5px;
        font-size: 22px;
        color: #222222;
      }
      > .price {
        font-size: 36px;
        color: #ec5330;
        font-weight: bold;
        display: flex;
        align-items: baseline;
        margin-top: 16px;
        > span {
          font-size: 22px;
          margin-left: 4px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
