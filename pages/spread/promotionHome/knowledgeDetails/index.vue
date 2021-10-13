<template>
  <div class="knowledge_details">
    <Header title="知产头条详情"></Header>
    <!-- 内容详情S -->
    <sp-skeleton title avatar :row="20" :loading="loading">
      <div class="content">
        <div class="title">
          {{ detail.title }}
        </div>
        <div class="information">
          <div class="information_class">{{ detail.categoryNames }}</div>
          <div class="information_time">
            {{ detail.createTime }}
          </div>
        </div>
        <div class="msg" v-html="detail.content"></div>
      </div>
      <!-- 内容详情E -->
    </sp-skeleton>
  </div>
</template>

<script>
import { Skeleton } from '@chipspc/vant-dgg'
import { spreadApi } from '@/api/spread'
import Header from '@/components/financing/common/Header.vue'
export default {
  components: {
    Header,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      code: '',
      param: '',
      detail: '',
      loading: true,
    }
  },
  mounted() {
    this.param = this.$route.query
    this.getDetail(this.param)
  },
  methods: {
    getDetail(param) {
      const params = {
        id: param.code,
        categoryCode: param.knowledgeCode,
        knowledgeCode: param.categoryCode,
        indexValue: param.indexValue,
        limit: 3,
      }

      this.$axios
        .get(spreadApi.knowledge_detail, { params })
        .then((res) => {
          if (res.code === 200) {
            this.loading = false
            this.detail = res.data.detail
            this.detail.createTime = this.detail.createTime.split(' ')[0]
          } else {
            this.loading = true
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = true
        })
    },
  },
}
</script>
<style lang="less" scoped>
.knowledge_details {
  ::v-deep.my-head {
    border-bottom: 1px solid #f4f4f4;
  }
  .content {
    padding: 0 40px;
    margin-top: 28px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 44px;
      line-height: 62px;
      color: #222222;
      font-weight: 700;
      .textOverflow(3);
    }
    .information {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .information_class {
        font-size: 28px;
        color: #333333;
        line-height: 28px;
      }
      .information_time {
        font-size: 28px;
        color: #999999;
        line-height: 28px;
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
