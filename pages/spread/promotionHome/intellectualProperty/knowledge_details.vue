<template>
  <div class="knowledge_details">
    <Header title="知产头条详情"></Header>
    <!-- 内容详情S -->
    <div class="content">
      <div class="title">
        我有个弟弟犯了网络诈骗已经被关进看守所了是在本地审理还是被骗人所在地方审理?
      </div>
      <div class="information">
        <div class="information_class">知产服务</div>
        <div class="information_time">2021-03-03</div>
      </div>
      <div class="msg" v-html="text"></div>
    </div>
    <!-- 内容详情E -->
  </div>
</template>

<script>
import Header from '@/components/financing/common/Header.vue'
export default {
  components: {
    Header,
  },
  data() {
    return {
      text: '<h2>　一、到纪委诬告有什么后果</h2>\n<p>　　如果当事人被他人诬告的，诬告的人涉嫌诬告陷害刑事犯罪，受害人可以依法向公安机关报案，由公安机关依法<a href="https://china.findlaw.cn/bianhu/bianhuzhinan/lazc/" target="_blank" rel="noopener">立案侦查</a>处理。</p>\n<p>　　相关法律规定：《中华人民共和国刑法》</p>\n<p>　　第二百四十三条　捏造事实诬告陷害他人，意图使他人受刑事追究，情节严重的，处三年以下有期徒刑、拘役或者管制；造成严重后果的，处三年以上十年以下有期徒刑。</p>\n<p>　　国家机关工作人员犯前款罪的，从重处罚。</p>\n<p>　　不是有意诬陷，而是错告，或者检举失实的，不适用前两款的规定。</p>\n<p><img src="https://img.findlawimg.com/info/2021/0714/20210714060617385.jpg" alt="到纪委诬告有什么后果" /></p>\n<h2>　　二、<a href="https://china.findlaw.cn/bianhu/gezuibianhu/qfgmrsqlmjqlz/wugaoxianhaizui/" target="_blank" rel="noopener">诬告陷害罪</a>如何报案</h2>\n<p>　　１、诬告陷害罪，是指捏造事实，作虚假告发，意图陷害他人，使他人受刑事追究的行为。这里的&ldquo;他人&rdquo;，是指所有的第三人，既包括一般的干部、群众，也包括正在服刑的罪犯和其他在押的被告人和<a href="https://china.findlaw.cn/bianhu/xingshibianhu/fanzuixianyiren/" target="_blank" rel="noopener">犯罪嫌疑人</a>。</p>\n<p>　　２、按照刑诉法来看，公检法三机关对于报案、控告、举报或者犯罪人自首，都应当接受。也就是无论是否在其职能管辖范围内都必须接受，而不能以任何理由加以拒绝，都会移送主管机关处理的。按照一般情况来看，由公安机关来受理。如果公安机关经过侦查后认定，不进行立案移送检察院提起公诉的，当事人可以向人民法院提起<a href="https://china.findlaw.cn/bianhu/bianhuzhinan/xingshizisu/" target="_blank" rel="noopener">刑事自诉</a>。</p>\n<h2>　　三、诬告陷害罪判几年</h2>\n<p>　　１、法律第二百四十三条上是有规定的，捏造事实诬告陷害他人，意图使他人受刑事追究，情节严重的，处三年以下有期徒刑、拘役或者管制；造成严重后果的，处三年以上十年以下有期徒刑。</p>\n<p>　　２、国家机关工作人员犯前款罪的，从重处罚。不是有意诬陷，而是错告，或者检举失实的，不适用前两款的规定。本条是关于诬告陷害罪的处刑规定。</p>\n<p>　　３、本条第一款是关于诬告陷害罪的处刑规定。依照本款规定，诬告陷害罪，是指捏造事实，作虚假告发，意图陷害他人，使他人受刑事追究的行为。这里所说的&ldquo;他人&rdquo;，既包括一般的干部、群众，也包括正在服刑的罪犯和其他在押的被告人和犯罪嫌疑人。本罪侵犯的客体是复杂客体，既侵犯了他人的人身权利，也侵犯了司法机关的正常活动。</p>',
    }
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
      color: #333333;
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
        > img {
          width: 100%;
        }
      }
    }
  }
}
</style>
