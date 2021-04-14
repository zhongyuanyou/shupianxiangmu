<template>
  <div>
    <div class="my-component">
      <div class="content">
        <div
          v-for="(item, index) in data"
          :key="index"
          v-md-map
          v-md:webClick
          :data-name="item.md.name"
          class="item"
          :style="{
            backgroundImage: `url(${item.img})`,
          }"
          @click="jumpLink(item.url)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ADList',
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/aay11bxjq4c0000.png',
            url: '',
            md: {
              name: '资质交易聚合页_优质资质',
            },
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/ftnq9knapiw0000.png',
            url: '',
            md: {
              name: '资质交易聚合页_热销资质',
            },
          },
        ]
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    jumpLink(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.open(url)
          // window.open(`${url}?code=${code}`)
        } else {
          this.$router.push(url)
        }
        return
      }
      this.$parent.jumpLink(url)
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(@spread-page-width - 40px);
  margin: 0 auto;
  .content {
    display: flex;
    justify-content: space-between;
    .item {
      display: inline-block;
      flex: none;
      background-repeat: no-repeat;
      background-size: cover;
      width: 347px;
      height: 124px;

      border-radius: 24px;
    }
  }
}
</style>
