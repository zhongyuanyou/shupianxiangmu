<template>
  <div v-if="JSON.stringify(planner) !== '{}'" class="planner">
    <div class="planner-box">
      <div class="head-box">
        <div class="img-box">
          <img :src="planner.imgSrc" alt="" />
        </div>
        <div class="tag">金牌规划师</div>
      </div>
      <div class="msg">
        办理<span>小程序建设/电商运营/定制开发</span>选什么商品？
      </div>
      <div class="btn" @click="jumpIm()">立即咨询</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imHandle from '@/mixins/imHandle'
export default {
  mixins: [imHandle],
  props: {
    planner: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  methods: {
    jumpIm() {
      const planner = {
        mchUserId: this.planner.id,
        userName: this.planner.name,
        type: this.planner.type,
        msgParam: {},
        templateIds: '',
      }
      if (this.isInApp) {
        this.uPIM(planner)
      } else {
        this.uPIM(planner)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.planner {
  width: 100%;
  height: 163px;
  padding: 0 20px;
  margin-top: 20px;
  .planner-box {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 24px;
    padding: 32px;
    display: flex;
    align-items: center;
    .head-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      .img-box {
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #f6dbc5;
        border-radius: 100%;
        > img {
          display: block;
          border-radius: 100%;
          background: #f5f5f5;
          width: 79px;
          height: 79px;
        }
      }
      .tag {
        width: 102px;
        height: 29px;
        background-image: linear-gradient(90deg, #f4cdb0 0%, #f7dfca 100%);
        border-radius: 28px;
        line-height: 29px;
        font-size: 16px;
        color: #5c4129;
        text-align: center;
        margin-top: -21px;
      }
    }
    .msg {
      font-size: 28px;
      color: #222222;
      line-height: 40px;
      font-weight: bold;
      width: 371px;
      margin-left: 20px;
      > span {
        color: #547cf8;
      }
    }
    .btn {
      width: 120px;
      height: 45px;
      background: #547cf8;
      border-radius: 4px;
      line-height: 45px;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      font-weight: bold;
      margin-left: auto;
    }
  }
}
</style>
