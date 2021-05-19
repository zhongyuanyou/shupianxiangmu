<template>
  <div class="reimbursement">
    <Head title="每月还款"></Head>
    <div class="line"></div>
    <div class="table-box">
      <table>
        <tr>
          <th>期数</th>
          <th>月供</th>
          <th>本金</th>
          <th>利息</th>
        </tr>
        <tr>
          <td>第1月</td>
          <td>2490.56</td>
          <td>236898.88</td>
          <td>2490.00</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Head from '@/components/financing/common/Header'

export default {
  components: {
    Head,
  },
}
</script>
<style lang="less" scoped>
.reimbursement {
  width: 750px;
  ::v-deep.my-head {
    width: 750px;
    position: fixed;
    left: 50%;
    margin-left: -375px;
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
    > table {
      width: 100%;
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
</style>
