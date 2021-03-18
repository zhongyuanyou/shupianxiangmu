<template>
  <div class="knowledge-list" @click="onClickUrl(knowledgeArr.url || '')">
    <div class="content-pro">
      <div class="content-title">{{ knowledgeArr.title }}</div>
      <label>
        <span
          v-for="(labels, labelKey) of knowledgeArr.label"
          :key="labelKey"
          class="label"
        >
          {{ labels }}
        </span>
      </label>
      <!-- 评测 -->
      <div v-show="activeName === '搜案例'" class="evaluating">
        专家评测：{{ knowledgeArr.evaluating }}
      </div>
      <!-- 日期 -->
      <div v-show="activeName === '搜知识'" class="time">
        {{ knowledgeArr.time }}
      </div>
    </div>
    <div
      class="content-img"
      :style="{ backgroundImage: 'url(' + knowledgeArr.bgImg || null + ')' }"
    >
      <span class="content-icon">
        <span><sp-icon class-prefix="spiconfont" name="hot" /></span>
        {{ knowledgeArr.count }}</span
      >
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
export default {
  name: 'KnoledgeList',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    // 显示不同列表
    activeName: {
      type: String,
      default: '',
    },
    knowledgeArr: {
      type: Object,
      default: () => {
        return {
          code: 1,
          title: '为什么公司需要企业法律服务，聘请法律顾问',
          label: ['专业律师团队', '高效沟通', '全流程监管'],
          evaluating: '9.5', // 评测
          time: '2020-09-09',
          count: '4985',
          url: '',
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/r9alg2mdugw000.png',
        }
      },
    },
  },
  methods: {
    onClickUrl(url) {
      console.log(url)
      if (url !== '') {
        window.location.href = url
      }
    },
  },
}
</script>

<style lang="less" scoped>
.knowledge-list {
  width: 100%;
  padding: 30px 0px;

  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
  .content-pro {
    widows: 406px;
    .content-title {
      min-height: 90px;
      font-size: 32px;
      padding-right: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 45px;
    }
    label {
      display: flex;
      margin: 23px 0 21px 0;
      > .label {
        display: flex;
        align-items: center;
        background: #eff3f6;
        border-radius: 4px;
        padding: 1px 8px;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #5f779c;
        font-size: 22px;
        line-height: 30px;
        margin-right: 8px;
      }
    }
    .evaluating {
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ea5735;
      line-height: 30px;
    }
    .time {
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
    }
  }

  .content-img {
    width: 240px;
    height: 190px;
    background: #d8d8d8;
    background-size: 100%;
    border-radius: 8px;
    position: relative;
    .content-icon {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 32px;
      background: #000000;
      color: #ffffff;
      font-size: 20px;
      border-radius: 16px;
      opacity: 0.67;
      bottom: 20px;
      right: 20px;
    }
  }
}
</style>
