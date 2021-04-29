<template>
  <div>
    <div class="my-component">
      <div class="title">优质资质</div>
      <div class="content">
        <a
          v-for="(item, index) in data"
          :key="index"
          v-md-map
          v-md:p_IMClick
          :data-name="item.md.name"
          class="item"
          :class="index > 1 ? 'item-no-margin' : ''"
          :style="{
            backgroundImage: `url(${item.img})`,
            width: `${item.imgWidth / 100}rem`,
            height: `${item.imgHeight / 100}rem`,
          }"
          @click="jumpLink(item.url)"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodQualification',
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3ia3ajzw8xo0000.png',
          imgWidth: 327,
          imgHeight: 145,
          url: '',
          md: {
            name: '资质交易聚合页_建筑工程',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2gxgo9h7eyi0000.png',
          imgWidth: 327,
          imgHeight: 145,
          url: '',
          md: {
            name: '资质交易聚合页_公路工程',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1uqbozuf4u74000.png',
          imgWidth: 213,
          imgHeight: 146,
          url: '',
          md: {
            name: '资质交易聚合页_地基基础',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/xx9gz37ikxc000.png',
          imgWidth: 213,
          imgHeight: 146,
          url: '',
          md: {
            name: '资质交易聚合页_消防设施',
          },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/15rjalmh0ag0000.png',
          imgWidth: 213,
          imgHeight: 146,
          url: '',
          md: {
            name: '资质交易聚合页_公路路面',
          },
        },
      ],
    }
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
      } else {
        this.$parent.jumpLink(url)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(@spread-page-width - 40px);
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px;
  .title {
    font-size: 36px;
    line-height: 36px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 20px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      flex: none;
      background-repeat: no-repeat;
      background-size: cover;
      padding-left: 24px;
      padding-right: 36px;
      padding-top: 36px;
      border-radius: 8px;

      margin-bottom: 12px;
      .item-title {
        flex: none;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 28px;
        margin-bottom: 18px;
      }
      .item-desc {
        flex: none;
        font-size: 22px;
        font-weight: 400;
        color: #555555;
        line-height: 30px;
      }
    }
    .item-no-margin {
      margin-bottom: 0px;
    }
  }
}
</style>
