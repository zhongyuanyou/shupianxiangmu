<template>
  <div class="nav-list">
    <div class="list">
      <div class="navs" v-for="(item, index) in navList" :key="index">
        <div class="nav" @click="jump(item)">
          <div class="icon"><img :src="item.icon" alt="" /></div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-list',
  props: {
    navList: {
      type: Array,
      default: () => {
        return [
          {
            title: '发明专利',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/crxovpbfeso0000.png',
          },
          {
            title: '外观专利',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/82b03c9sph80000.png',
          },
          {
            title: '实用新型',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f05rb0xedk00000.png',
          },
          {
            title: '农业牧业',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/5xj3zqps83w0000.png',
          },
          {
            title: '食品饮料',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/amn0c1w6lc80000.png',
          },
          {
            title: '家具用品',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/87gt0cdv4qs0000.png',
          },
          {
            title: '医药医疗',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/cg8ase5dhag0000.png',
          },
          {
            title: '化学化工',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/dx72abwnuw00000.png',
          },
          {
            title: '仪器仪表',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/axx3mxp3psk0000.png',
          },
          {
            title: '全部分类',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/22t08qymu1q8000.png',
          },
        ]
      },
    },
  },
  methods: {
    jump(item) {
      this.$emit('jump', item)
      console.log(11, item)
    },
  },
}
</script>

<style lang="less" scoped>
.nav-list {
  margin-top: 24px;
  padding: 0 20px;
  margin-bottom: 24px;
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .navs {
      height: 148px;
      padding: 16px 19px;

      .nav {
        width: 104px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 100%;
          height: 72px;
          > img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .title {
          margin-top: 10px;
          font-size: 24px;
          color: #222222;
          font-weight: 700;
          line-height: 34px;
        }
      }
    }
  }
}
</style>
