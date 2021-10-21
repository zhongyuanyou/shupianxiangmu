<template>
  <div class="nav-list">
    <div class="list">
      <div v-for="(item, index) in navList" :key="index" class="navs">
        <div class="nav" @click="jump(item)">
          <div class="icon">
            <img
              :src="`${item.navigationImageUrl}?x-oss-process=image/resize,m_fill,w_104,h_72,limit_0`"
              alt=""
            />
          </div>
          <div class="title">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavList',
  props: {
    navList: {
      type: Array,
      default: () => {
        return []
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
          .textOverflow(1);
        }
      }
    }
  }
}
</style>
