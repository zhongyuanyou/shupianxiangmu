<template>
  <div class="consulting-detail">
    <Header title="咨询详情"></Header>
    <sp-skeleton title avatar :row="20" :loading="loading">
      <div class="content">
        <div class="title">
          山西房产科技有限公司山西房产科技有限公司山西房产科技有限公司山西房产科技有限公司科技
        </div>
        <div class="information">
          <div class="information_class">首页资讯</div>
          <div class="information_time">2021-07-31</div>
        </div>
        <div class="msg" v-html="content"></div>
      </div>
    </sp-skeleton>
  </div>
</template>

<script>
import { Skeleton } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header.vue'

export default {
  components: {
    Header,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      loading: false,
      content:
        '<p>这是内容13132131231312312333123123212121212121212121216178371278937阿基诶uahdahjk11按活动价安吉大道口裂开立刻记录卡刊例价进料口了金坷垃框架<br />123123UI企鹅去IE强哦IEuqwueoi哦琼IQ为偶尔去哦为IE哦亲饿哦汽配区爱哦屌丝do奥IEUI偶去为偶尔UI哦<br /><img src="https://cdn.shupian.cn/cms/4yg88lyy71s0000.jpg" alt="" width="1024" height="1024" /></p>\n<p>123786186736啊ueyuaiuyeuyiqi1爱哦多啊UI丢啊<br /><br /></p>\n<p><img src="https://cdn.shupian.cn/cms/dvpi5hkrlfk0000.jpg" /></p>',
      info: '',
    }
  },
  created() {
    this.info = this.$route.query
    console.log(this.info)
  },
}
</script>

<style lang="less" scoped>
.consulting-detail {
  width: 100%;
  min-height: 100vh;
  .content {
    padding: 28px 40px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 44px;
      line-height: 62px;
      color: #333333;
      font-weight: 700;
      .textOverflow(3);
    }
    .information {
      padding: 40px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f4f4f4;
      .information_class {
        font-size: 24px;
        color: #999999;
        line-height: 24px;
      }
      .information_time {
        font-size: 24px;
        color: #999999;
        line-height: 24px;
      }
    }
    ::v-deep.msg {
      margin-top: 40px;
      font-size: 32px;
      color: #333333;
      line-height: 52px;
      padding-bottom: 70px;
      > p {
        display: block;
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        > img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
