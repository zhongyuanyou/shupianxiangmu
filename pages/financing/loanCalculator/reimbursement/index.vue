<template>
  <div class="reimbursement">
    <Head title="每月还款"></Head>
    <div class="line"></div>
    <div class="table-box">
      <div class="thead" :style="{ top: isInApp ? '94px' : '' }">
        <table>
          <tr>
            <th>期数</th>
            <th>月供</th>
            <th>本金</th>
            <th>利息</th>
          </tr>
        </table>
      </div>
      <div class="tbody" :style="{ top: isInApp ? '134px' : '' }">
        <table>
          <tr v-for="(item, idx) in numList" :key="idx">
            <td>{{ item.number }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.principal }}</td>
            <td>{{ item.interest }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Head from '@/components/financing/common/Header'

export default {
  components: {
    Head,
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  data() {
    return {
      numList: [],
    }
  },
  created() {
    this.numList = this.$route.query.list
  },
  mounted() {
    this.numList = this.$route.query.list
  },
}
</script>
<style lang="less" scoped>
.reimbursement {
  width: 750px;
  margin: 0 auto;
  ::v-deep.my-head {
    width: 750px !important;
    position: fixed !important;
    left: 50% !important;
    margin-left: -375px !important;
    // box-shadow: none !important;
  }
  .line {
    width: 750px;
    height: 1px;
    background: #f4f4f4;
  }
  .table-box {
    width: 750px;
    margin-top: 40px;
    padding: 0 40px;
    padding-bottom: 80px;
    .thead {
      position: fixed;
      top: 128px;
      > table {
        width: 670px;
        > tr {
          width: 100%;
          font-size: 26px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #222222;
          > th {
            width: 142px;
            height: 80px;
            background: #f2f5ff;
            line-height: 80px;
            text-align: center;
          }
        }
      }
    }
    .tbody::-webkit-scrollbar {
      display: none;
    }
    .tbody {
      height: 80vh;
      overflow-x: hidden;
      overflow-y: scroll;
      position: fixed;
      top: 208px;
      > table {
        width: 670px;
        > tr:nth-child(2n) {
          background: #f8f8f8;
        }
        > tr {
          width: 100%;
          font-size: 26px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #222222;

          > td {
            width: 142px;
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            height: 80px;
            line-height: 80px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
