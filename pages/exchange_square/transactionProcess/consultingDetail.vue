<template>
  <div class="consulting-detail">
    <Header title="咨询详情"></Header>
    <sp-skeleton title avatar :row="20" :loading="loading">
      <div class="content">
        <div class="title">
          {{ content.title }}
        </div>
        <div class="information">
          <div class="information_class">{{ content.categoryNames }}</div>
          <div class="information_time">
            {{ content.updateTime }}
          </div>
        </div>
        <div class="msg" v-html="content.content"></div>
      </div>
    </sp-skeleton>
  </div>
</template>

<script>
import { Skeleton } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header.vue'
import { spreadApi } from '@/api/spread'
export default {
  components: {
    Header,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      loading: false,
      content: '',
      info: '',
    }
  },
  created() {
    this.info = this.$route.query
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$axios
        .get(spreadApi.knowledge_detail, {
          params: {
            id: this.info.id,
            categoryCode: 'JyConsult',
            knowledgeCode: this.info.code,
            indexValue: 1,
            limit: 3,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.content = res.data.detail
            console.log(this.content, 111111)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
