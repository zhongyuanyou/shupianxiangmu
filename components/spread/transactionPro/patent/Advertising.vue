<template>
  <div class="advertising">
    <div class="advertising-patent">
      <a
        v-for="(item, choKey) of choiceness"
        :key="choKey"
        v-md-map
        v-md:webClick
        :data-type="item.name"
        :data-name="`专利交易聚合页_${item.name}`"
        @click="onMessage(item.url || '', $event)"
      >
        <sp-image radius="0.08rem" :src="item.img" />
      </a>
    </div>
    <div class="advertising-Hot">
      <p>热门行业</p>
      <div>
        <a v-for="(item, index) of hotList" :key="index">
          <sp-image
            v-md-map
            v-md:p_IMClick
            data-event_name="在线咨询"
            data-im_type="热门行业"
            :data-name="`${item.tex}`"
            radius="0.08rem"
            :src="item.img"
            @click="onMessage(item.url, $event)"
        /></a>
      </div>
    </div>
    <div class="advertising-make-over">
      <p>专利转让分类</p>
      <div class="content">
        <a>
          <sp-image
            v-md-map
            v-md:webClick
            data-type="专利转让分类"
            :data-name="`专利交易聚合页_${make.maxMake.name}`"
            radius="0.08rem"
            class="img"
            :src="make.maxMake.img"
            @click="onMessage(make.maxMake.url || '', $event)"
          />
        </a>
        <div>
          <a v-for="(item, makeKdy) of make.minMake" :key="makeKdy">
            <sp-image
              v-md-map
              v-md:webClick
              data-type="专利转让分类"
              :data-name="`专利交易聚合页_${item.name}`"
              radius="0.08rem"
              class="img"
              :src="item.img"
              @click="onMessage(item.url || '', $event)"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
  },
  props: {
    pagePlanner: {
      type: Object,
      default: () => {
        return {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
          imgSrc: '',
        }
      },
    },
    choiceness: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/co0p9uk64q80000.png',
            name: '',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/9vqi000ukcc0000.png',
            name: '',
            url: '',
          },
        ]
      },
    },
    hotList: {
      type: Array,
      default: () => {
        return [
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/34ov5aqag6y0000.png',
            marketingImg: '',
            tex: '专利交易聚合页_农业牧林',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/6dg0enu4e2k0000.png',
            marketingImg: '',
            tex: '专利交易聚合页_作业/运输',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/1ka3nwiyoao0000.png',
            marketingImg: '',
            tex: '专利交易聚合页_包装印刷',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/62gnvw9ky000000.png',
            marketingImg: '',
            tex: '专利交易聚合页_机械/照明',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/fdy731w76z40000.png',
            marketingImg: '',
            tex: '专利交易聚合页_新能源',
            url: '',
          },
          {
            img: 'https://cdn.shupian.cn/sp-pt/wap/66tffyndpwo0000.png',
            marketingImg: '',
            tex: '专利交易聚合页_电气自动化',
            url: '',
          },
        ]
      },
    },
    make: {
      type: Object,
      default: () => {
        return {
          maxMake: {
            img: 'https://cdn.shupian.cn/sp-pt/wap/9sklu1mitjw0000.jpg',
            name: '设计专利',
            url: '',
          },
          minMake: [
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/bshj11eeftk0000.jpg',
              name: '发明专利',
              url: '',
            },
            {
              img: 'https://cdn.shupian.cn/sp-pt/wap/g1i3915lpr40000.jpg',
              name: '实用新型专利',
              url: '',
            },
          ],
        }
      },
    },
  },
  methods: {
    onMessage(url, e) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.location.href = url
          return
        }
      }
      this.$parent.jumpLink(url)
    },
  },
}
</script>
<style lang="less" scoped>
.advertising {
  p {
    display: inline-block;
    font-size: 32px;
    line-height: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 24px;
  }
  &-patent {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 154px;
    padding: 13px 20px 20px 20px;
    /deep/.sp-image {
      width: 347px;
      height: 124px;
      border-radius: 8px;
    }
  }
  &-Hot {
    background: #ffffff;
    border-radius: 24px;
    padding: 24px 20px 30px 20px;
    display: flex;
    flex-direction: column;
    width: calc(@spread-page-width - 40px);
    margin: 0 auto;
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      // padding: 0px 40px;
      a {
        display: inline-block;
        height: 182px;
        // border-radius: 8px;
        .sp-image {
          width: 215px;
          height: 182px;
          // border: 1px solid rgba(205, 205, 205, 0.3);
          // box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
        }
      }
      a:first-child {
        margin-bottom: 18px;
      }
    }
  }
  &-make-over {
    background: #ffffff;
    border-radius: 24px;
    padding: 30px 20px 24px 20px;
    display: flex;
    flex-direction: column;
    width: calc(@spread-page-width - 40px);
    margin: 0 auto;
    margin-top: 20px;
    /deep/.content {
      display: flex;
      justify-content: space-between;
      height: 340px;
      margin-bottom: 13px;
      > a:first-child {
        margin-right: 16px;
        .sp-image {
          width: 327px;
          // background: linear-gradient(90deg, #f8f8f8, #faf5ed);
          // border-radius: 8px;
        }
      }
      > div:last-child {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 327px;
        a {
          display: inline-block;
          height: 162px;
          .sp-image {
            width: 327px;
            height: 162px;
            background: linear-gradient(90deg, #f8f8f8, #f0faf7);
          }
        }
      }
    }
  }
}
</style>
