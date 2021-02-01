<template>
  <div class="cousulttel">
    <div v-if="title" class="cousulttel-title">
      {{ title }}
    </div>
    <div class="cousulttel-content">
      <div class="cousulttel-content-left">
        <Icon
          name="notify_ic_tel"
          color="#4974F5"
          size="0.36rem"
          class="icon"
        />
        <span class="cousulttel-content-left-text">{{ desc }}</span>
        <span class="cousulttel-content-left-number">{{ tel }}</span>
      </div>
      <button
        v-md-map
        v-md:webClick
        data-type="售前"
        :data-name="mdName"
        class="cousulttel-content-button"
        @click="telPhone"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/myIcon/MyIcon.vue'
export default {
  name: 'ConsultTel',
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      },
    },
    tel: {
      type: String,
      default: () => {
        return '4000-962540'
      },
    },
    button: {
      type: String,
      default: () => {
        return '立即咨询'
      },
    },
    mdName: {
      type: String,
      default: () => {
        return '专业刻章服务_免费咨询'
      },
    },
    desc: {
      type: String,
      default: () => {
        return '杜绝风险:'
      },
    },
  },
  methods: {
    // 打电话
    telPhone() {
      const tel = this.tel.replace(/[^0-9]/g, '')
      window.location.href = `tel:${tel}`
      console.log(tel)
    },
  },
}
</script>

<style scoped lang="less">
.cousulttel {
  padding: 0 40px 32px;
  &-title {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin: 39px 0 31px 0;
    height: 30px;
    line-height: 30px;
  }
  &-content {
    width: 670px;
    height: 80px;
    border: 2px solid #4974f5;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      margin-left: 26px;
      display: flex;
      align-items: center;
      &-text {
        font-size: 24px;
        line-height: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        margin: 0 14px;
      }
      &-number {
        font-size: 40px;
        line-height: 40px;
        font-family: @Bebas;
        font-weight: 400;
        color: #4974f5;
      }
    }
    &-button {
      width: 200px;
      height: 80px;
      background: #4974f5;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      padding: 0;
      border-radius: 0px 8px 8px 0px;
      color: #ffffff;
      margin-right: -1px;
    }
  }
}
</style>
