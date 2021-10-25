<template>
  <div class="nav-bar">
    <div class="nav-content">
      <div
        class="content"
        :style="{ overflowX: navList.length < 5 ? 'hidden' : '' }"
      >
        <div
          v-for="(nav, index) in navList"
          :key="index"
          class="navs"
          :style="{ marginRight: navList.length > 5 ? '16px' : '' }"
          @click="jump(nav)"
        >
          <img
            :src="`${nav.navigationImageUrl}?x-oss-process=image/resize,m_fill,w_104,h_72,limit_0`"
            alt=""
          />
          <div class="title">{{ nav.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import jump from '@/mixins/jump'
export default {
  mixins: [jump],
  props: {
    navList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      currentCity: (state) => state.city.currentCity,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  height: 192px;
  .nav-content {
    width: 100%;
    height: 192px;
    background: #ffffff;
    border-radius: 24px;
    padding: 40px 20px;
    .content::-webkit-scrollbar {
      display: none;
    }
    .content {
      padding: 0 20px;
      width: 100%;
      display: flex;
      align-items: center;
      overflow-x: scroll;
      overflow-y: hidden;
      justify-content: space-around;
      .navs {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        // margin-right: 29px;
        > img {
          width: 104px;
          height: 72px;
        }
        .title {
          font-size: 24px;
          color: #222222;
          margin-top: 16px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
