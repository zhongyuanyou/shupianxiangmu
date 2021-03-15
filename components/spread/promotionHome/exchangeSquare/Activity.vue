<template>
  <div class="activity">
    <ul class="activity-box">
      <li
        v-for="(item, index) in activityList"
        :key="index"
        class="active-content"
      >
        <a :href="item.url">
          <span class="name">{{ item.name }}</span>
          <div class="image-box"><img :src="item.image" alt="" /></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    activityList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<style lang="less" scoped>
.activity {
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  .activity-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .active-content {
      width: 170px;
      height: 120px;
      background: #ffffff;
      border-radius: 12px;
      padding: 24px 0 0 20px;
      position: relative;
      > a {
        .name {
          display: block;
          font-size: 26px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 28px;
        }
        .image-box {
          position: absolute;
          bottom: 14px;
          right: 16px;
          width: 32px;
          height: 32px;
          display: flex;
          > img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
