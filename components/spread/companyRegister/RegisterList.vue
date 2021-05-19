<template>
  <div class="register-list">
    <div class="register-list_hidden">
      <div
        v-for="(listCounts, list) of listCount"
        v-show="isMore ? true : list < 3"
        :key="list"
        class="list"
      >
        <a
          v-md-map
          v-md:p_IMClick
          data-even_name="在线咨询"
          data-im_type="售前"
          data-name="工商注册_服务介绍_在线咨询"
          @click="onMessage(listCounts.url, list, $event)"
        >
          <div
            class="list-title"
            :style="{
              background:
                'url(' +
                listCounts.bgImg +
                ')' +
                'top center/100% auto no-repeat',
            }"
          >
            <span class="list-title_name">
              <span>{{ listCounts.title }}</span>
              <span v-show="listCounts.salesTag !== ''" class="list-title_icon">
                {{ listCounts.salesTag }}
              </span>
              <i v-show="listCounts.activityTag !== ''" class="img">{{
                listCounts.activityTag
              }}</i>
            </span>
            <span class="list-title_icon"> </span>
          </div>

          <div class="list-label">
            <div
              v-for="(serviceTags, serviceTag) of listCounts.serviceTag"
              v-show="serviceTag < 3"
              :key="serviceTag"
              class="list-label-item"
            >
              <sp-image
                width="0.24rem"
                height="0.24rem"
                fit="contain"
                src="https://cdn.shupian.cn/sp-pt/wap/images/f7ec4mvmvrk0000.png"
              />
              <div class="list-label-item-content">{{ serviceTags }}</div>
            </div>
          </div>
          <div class="list-count">
            <div class="list-count_item">
              <span>{{ listCounts.operating.actualViews }}</span>
              <div>在线咨询</div>
            </div>
            <div class="list-count_line"></div>
            <div class="list-count_item">
              <span>{{ listCounts.operating.defaultSales }}</span>
              <div>累计成交</div>
            </div>
            <div class="list-count_line"></div>
            <div class="list-count_item">
              <span>{{ listCounts.operating.actualSales }}</span>
              <div>成功案例</div>
            </div>
          </div>
        </a>
        <div class="list-advisory">
          <span
            v-md-map
            v-md:p_IMClick
            data-even_name="在线咨询"
            data-im_type="售前"
            data-name="工商注册_服务介绍_在线咨询"
            class="price"
            @click="onMessage(listCounts.url, list, $event)"
            ><span>{{ listCounts.pric }}</span>
            元起
          </span>
          <div class="advisory">
            <sp-image
              v-md-map
              v-md:p_IMClick
              data-even_name="在线咨询"
              data-im_type="售前"
              data-name="工商注册_服务介绍_在线咨询"
              round
              width="28px"
              height="28px"
              data-stop="stop"
              :src="listCounts.imgSrc"
              @click="onMessage('', list, $event)"
            />
            <a
              v-md-map
              v-md:p_IMClick
              data-even_name="在线咨询"
              data-im_type="售前"
              data-name="工商注册_服务介绍_在线咨询"
              @click="onMessage('', list, $event)"
            >
              <my-icon name="notify_ic_chat" size="20px" color="#4974F5">
              </my-icon>
            </a>
            <a
              v-md-map
              v-md:webClick
              data-even_name="wap元素点击"
              data-im_type="售前"
              data-name="工商注册_服务介绍_电话"
              type="primary"
              data-stop="stop"
              @click="onPhone(list)"
            >
              <my-icon
                name="notify_ic_tel"
                size="20px"
                color="#4974F5"
                data-stop="stop"
              ></my-icon
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, Image, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'RegisterList',
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Toast.name]: Toast,
  },
  props: {
    listCount: {
      type: Array,
      default: () => {
        return [
          {
            pric: 4000,
            bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2x7bai1rkvy0000.png',
            title: '有限责任公司',
            url: 'https://m.shupian.cn/detail/serviceDetails?productId=732138887167888801', // 跳详情
            serviceTag: [], // 服务标签
            activityTag: '', // 活动标签
            salesTag: '', // 销售标签
            operating: {
              actualViews: 3291,
              defaultSales: 1837,
              actualSales: 1832,
            },
            // im
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
        ]
      },
    },
    isMore: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  methods: {
    onMessage(url, list, e) {
      if (e.target.dataset.stop !== 'stop') {
        if (url !== '') {
          window.location.href = url
        } else {
          this.$root.$emit(
            'openIMM',
            this.listCount[list].id,
            this.listCount[list].name,
            this.listCount[list].jobNum,
            this.listCount[list].imgSrc
          )
        }
      }
    },
    onPhone(list) {
      window.location.href = `tel:${this.listCount[list].telephone}`
    },
  },
}
</script>
<style lang="less" scoped>
.register-list {
  .register-list_hidden {
    overflow-y: hidden;
    .list {
      width: 670px;
      border: 1px solid rgba(205, 205, 205, 0.3);
      border-radius: 8px;
      margin-bottom: 25px;
      // 标题部分
      .list-title {
        position: relative;
        width: 100%;
        height: 93px;
        border-radius: 7px 7px 0px 0px;
        .img {
          position: absolute;
          display: inline-block;
          top: 0px;
          right: 0px;
          width: 64px;
          height: 72px;
          background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/312ntaxb9au0000.png);
          background-size: 100%;
          font-size: 20px;
          font-style: normal;
          font-weight: bold;
          color: #ffffff;
          line-height: 24px;
          padding: 6px 4px 0 6px;
          text-align: center;
        }
        &_name {
          height: 100%;
          display: flex;
          align-items: center;
          span {
            font-size: 32px;
            font-weight: bold;
            color: #222222;
            margin: 0px 0px 0 32px;
          }
          .list-title_icon {
            height: 34px;
            padding: 0 13px;
            margin-left: 16px;
            background: #fe8c29;
            border-radius: 8px 0px 8px 0px;
            font-size: 22px;
            font-weight: bold;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      // 标签部分
      .list-label {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 90px;
        width: 100%;
        padding-left: 32px;
        .list-label-item {
          display: flex;
          height: 24px;
          align-items: center;
          margin-right: 39px;
          > img {
            width: 24px;
            height: 24px;
          }
          &-content {
            font-size: 24px;
            font-weight: 400;
            line-height: 26px;
            color: #555555;
            margin-left: 13px;
          }
        }
      }
      // 列表框中间部分
      .list-count {
        display: flex;
        justify-content: space-between;
        padding: 8px 82px 20px 70px;
        position: relative;
        .list-count_item {
          font-size: 34px;
          font-weight: bold;
          color: #222222;
          line-height: 52px;
          span {
            font-size: 34px;
            font-weight: bold;
            color: #222222;
            line-height: 52px;
          }
          div {
            font-size: 22px;
            font-weight: 400;
            color: #999999;
            line-height: 52px;
          }
        }
        .list-count_line {
          width: 1px;
          height: 34px;
          margin-top: 46px;
          background: #f4f4f4;
        }
      }
      // 列表框底部
      .list-advisory {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px dashed #f4f4f4;
        padding: 24px 32px 24px;
        .price {
          font-size: 24px;
          font-weight: bold;
          width: 400px;
          color: #ec5330;
          span {
            font-size: 40px;
          }
        }
        .advisory {
          width: 240px;
          height: 72px;
          background-color: #4974f5;
          background: #ebf3ff;
          border-radius: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 28px 0 8px;
          > a {
            display: inline-block;
            height: 72px;
            line-height: 26px;
          }
        }
      }
    }
  }
}
</style>
