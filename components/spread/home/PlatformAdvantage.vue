<template>
  <div>
    <div class="my-component">
      <div class="title">平台优势</div>

      <div class="statistics">
        <div
          v-for="item in statisticsList"
          :key="item.name"
          class="statistics-item"
        >
          <div class="statistics-item-desc">
            <p class="statistics-item-count">{{ item.count }}{{ item.unit }}</p>
            <p class="statistics-item-name">{{ item.name }}</p>
          </div>
          <img
            v-if="item.id != 4"
            class="statistics-item-oblique-img"
            src="https://cdn.shupian.cn/sp-pt/wap/images/h0il2vpc62g000.png"
          />
        </div>
      </div>

      <div class="feature">
        <div v-for="item in featureList" :key="item.id" class="feature-item">
          <img class="feature-item-img" :src="item.img" />
          <div class="feature-item-text">
            <p class="feature-item-name">{{ item.name }}</p>
            <p class="feature-item-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PingTaiYouShi',
  data() {
    return {
      statisticsList: [
        {
          id: 1,
          name: '服务客户次数',
          count: 10.5,
          unit: '亿次',
          obliqueLine: true,
        },
        {
          id: 2,
          name: '业务覆盖城市',
          count: 14,
          unit: '个',
          obliqueLine: true,
        },
        {
          id: 3,
          name: '专业顾问',
          count: 6000,
          unit: '+个',
          obliqueLine: true,
        },
        {
          id: 4,
          name: '好评率',
          count: 98.6,
          unit: '%',
          obliqueLine: true,
        },
      ], // 统计次数列表
      featureList: [
        {
          id: 1,
          name: '专属服务',
          desc: '专业服务顾问一对一 服务',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/59ogpucldbk0000.png',
        },
        {
          id: 2,
          name: '极速响应',
          desc: '第一时间响应您的 需求',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1c6mel1le7ds000.png',
        },
        {
          id: 3,
          name: '无理由退款',
          desc: '未服务，30天内退款',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8tozz13hcrg0000.png',
        },
        {
          id: 4,
          name: '信息安全',
          desc: '加密保障信息安全',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/e177vpe2thk0000.png',
        },
        {
          id: 5,
          name: '服务透明',
          desc: '流程可视化，线上可 查询服务节点',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/atdr8h077c00000.png',
        },
        {
          id: 6,
          name: '风险赔付',
          desc: '业务风险由保险公司 赔付',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/bax9ty3e3fk0000.png',
        },
      ], // 平台特色优势
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: 30px 0;
  font-family: PingFang SC;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .statistics {
    display: flex;
    justify-content: space-between;

    .statistics-item {
      flex: none;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: space-between;
      .statistics-item-desc {
        flex: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .statistics-item-count {
          margin-bottom: 15px;
          font-size: 28px;
          line-height: 28px;
          font-weight: bold;
          color: #222222;
        }
        .statistics-item-name {
          font-size: 24px;
          line-height: 24px;
          font-weight: 400;
          color: #555555;
        }
      }
      .statistics-item-oblique-img {
        flex: none;
        width: 16px;
        height: 70px;
        margin-left: 16px;
      }
    }
  }

  .feature {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    .feature-item {
      flex: none;
      width: 50%;
      display: flex;
      margin-bottom: 30px;
      .feature-item-img {
        flex: none;
        width: 80px;
        height: 80px;
        margin-right: 16px;
      }

      .feature-item-text {
        width: 200px;
        .feature-item-name {
          flex: none;
          font-size: 26px;
          line-height: 26px;
          font-weight: bold;
          color: #222222;
          margin-bottom: 12px;
        }
        .feature-item-desc {
          flex: none;
          font-size: 20px;
          font-weight: 400;
          color: #999999;
          line-height: 26px;
        }
      }
    }
  }
}
</style>
