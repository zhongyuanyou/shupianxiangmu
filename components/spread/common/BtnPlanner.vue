<template>
  <div v-if="JSON.stringify(planner) !== '{}'" class="btn-planner">
    <div
      v-md-map
      v-md:p_IMClick
      class="btn-planner_item"
      :data-name="`${md.imMd.name}`"
      :data-im_type="`${md.imMd.type}`"
      @click="onlineConsult"
    >
      <div class="btn-planner_item_img">
        <img
          :src="
            planner.imgSrc
              ? planner.imgSrc
              : 'https://cdn.shupian.cn/sp-pt/wap/images/fd67oqvwepc0000.png'
          "
          alt=""
        />
      </div>
      <div class="btn-planner_item_con">
        <p class="name">规划师</p>
        <span class="title">在线咨询</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *planner==={}的时候隐藏
 * @data {
 *           id: '7862495547640840192',
 *           name: '张毅',
 *           jobNum: '107547',
 *           telephone: '18402858698',
 *           imgSrc:
 *           'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
 *      }  planner 需要传的参数
 **/
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
    md: {
      type: Object,
      default: () => {
        return {
          imMd: {
            name: '交易聚合页_底部_在线咨询',
            type: '售前',
          },
        }
      },
    },
  },
  methods: {
    onlineConsult() {
      const planner = {
        mchUserId: this.planner.id,
        userName: this.planner.name,
        type: this.planner.type,
      }
      this.uPIM(planner)
    },
  },
}
</script>

<style lang="less" scoped>
.btn-planner {
  width: 186px;
  height: 136px;
  // border: 1px solid red;
  position: fixed;
  bottom: 100px;
  right: 40px;
  &_item {
    position: relative;
    width: 100%;
    height: 100%;
    &_img {
      position: absolute;
      top: 0;
      right: 11px;
      width: 104px;
      height: 104px;
      background: #ffffff;
      border: 4px solid #4974f5;
      border-radius: 50%;
      display: flex;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    &_con {
      width: 126px;
      position: absolute;
      right: 0;
      z-index: 2;
      bottom: 0;
      height: 56px;
      background: #4974f5;
      border-radius: 28px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .name {
        display: block;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 21px;
        margin-bottom: 4px;
      }
      .title {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 19px;
        opacity: 0.6;
        display: inline-block;
        &:after {
          content: '';
          display: inline-block;
          width: 8px;
          height: 1px;
          background: #ffffff;
          opacity: 0.6;
          vertical-align: middle;
          margin-right: 4px;
        }
        &:before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 1px;
          background: #ffffff;
          vertical-align: middle;
          opacity: 0.6;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
