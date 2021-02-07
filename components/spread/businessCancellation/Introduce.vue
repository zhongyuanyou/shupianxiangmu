<template>
  <div class="introduce">
    <Title title="业务介绍" />
    <ul class="introduce-box">
      <li
        v-for="(item, i) of serviceList"
        v-show="showCount > i ? true : false"
        :key="i"
        v-md-map
        v-md:webClick
        data-type="售前"
        :data-name="`工商注销业务介绍_${item.title}_在线咨询`"
        class="introduce-box-item"
        @click="plannerIm(item.planner, item.url)"
      >
        <!-- 标题框 -->
        <div
          class="introduce-box-item-title"
          :style="{
            background:
              'url(' + item.bgImg + ')' + 'top center/100% auto no-repeat',
          }"
        >
          <div class="introduce-box-item-title-box">
            <p class="introduce_title">{{ item.title }}</p>
            <div v-show="item.activityTag !== ''" class="introduce-tag-img-box">
              {{ item.activityTag }}
            </div>
          </div>
          <p class="introduce-box-item-title-desc">{{ item.titleContent }}</p>
        </div>

        <!-- 标签 -->
        <div class="introduce-tags">
          <div
            v-show="index < 3"
            v-for="(value, index) of item.serviceTag"
            :key="index"
            class="introduce-tags-item"
          >
            <div class="introduce-tags-item-img">
              <img
                src="https://cdn.shupian.cn/sp-pt/wap/images/f7ec4mvmvrk0000.png"
                alt=""
              />
            </div>
            <div class="introduce-tags-item-content">{{ value }}</div>
          </div>
        </div>

        <!-- 售卖数量 -->
        <div class="introduce-count">
          <div
            v-for="(val, a) of item.number"
            :key="a"
            class="introduce-count-item"
          >
            <div class="introduce-count-item-num">
              {{ val.num }}
            </div>
            <div class="introduce-count-item-desc">{{ val.content }}</div>
          </div>
        </div>

        <!-- 价格、联系人 -->
        <div class="introduce-contact">
          <div class="price">
            <span>{{ item.lowerPrice }}</span
            ><span>元起</span>
          </div>

          <div class="contact-btn">
            <a href="javascript:;">
              <img :src="item.planner.imgSrc" alt="" />
            </a>
            <a
              v-md-map
              v-md:p_IMClick
              data-im_type="售前"
              :data-name="`工商注销业务介绍_${item.title}_在线咨询`"
              href="javascript:;"
              @click="plannerIm(item.planner, '')"
            >
              <Icon
                name="notify_ic_chat"
                color="#4974F5"
                size="0.4rem"
                class="icon"
              />
            </a>
            <a
              v-md-map
              v-md:webClick
              data-type="售前"
              :data-name="`工商注销业务介绍_${item.title}_拨打电话`"
              href="javascript:;"
              @click="call(item.planner.telephone)"
            >
              <Icon
                name="notify_ic_tel"
                color="#4974F5"
                size="0.4rem"
                class="icon"
              />
            </a>
          </div>
        </div>
      </li>
    </ul>
    <!-- 查看更多 -->
    <a href="javascript:;" class="a-clear">
      <div
        v-show="serviceList.length > 3"
        v-md-map
        v-md:webClick
        data-type="售前"
        data-name="工商注销业务介绍_更多服务"
        class="more"
        @click="showMore"
      >
        {{ isMore ? '收起' : '更多服务' }}
      </div>
    </a>
  </div>
</template>
<script>
import Icon from '~/components/common/myIcon/MyIcon.vue'
import Title from '~/components/spread/businessCancellation/Title'
export default {
  components: {
    Title,
    Icon,
  },
  props: {
    serviceList: {
      type: Array,
      requried: true,
      default: () => {
        return [
          {
            title: '公司注销',
            bgImg: 'https://cdn.shupian.cn/sp-pt/wap/d4ynsvxsx9c0000.png',
            url: '',
            // titlelable:
            //   'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
            serviceTag: ['快至30个工作日', '成功率高，省心省钱'], // 服务标签
            activityTag: '限时优惠', // 活动标签
            salesTag: '', // 销售标签
            titleContent: '当公司不经营时申请注销，终止公司法人资格。',
            lowerPrice: 2500,
            // tags: ['快至30个工作日', '成功率高，省心省钱'],
            number: [
              { content: '在线咨询', num: 484 },
              { content: '累计成交', num: 302 },
              { content: '成功案例', num: 293 },
            ],
            planner: {
              id: 3394,
              name: '刘琴',
              jobNum: '2022554',
              telephone: '13350072314',
              imgSrc:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            },
          },
        ]
      },
    },
  },
  data() {
    return {
      // 展示数据条数
      showCount: 3,
      // 是否展示更多
      isMore: false,
    }
  },
  methods: {
    // 格式化数字
    formatterNum(val) {
      return (val / 10000).toFixed(0) + '万+'
    },
    // 展示更多、收起
    showMore() {
      if (this.isMore) {
        this.showCount = 3
        this.isMore = false
      } else {
        this.isMore = true
        this.showCount = this.serviceList.length
      }
    },
    // 打电话
    call(telephone) {
      window.location.href = `tel:${telephone}`
      event.stopPropagation()
    },
    // 调用IM
    plannerIm(planner, url) {
      if (url !== '') {
        window.location.href = url
        return false
      }
      this.$root.$emit(
        'openIMM',
        planner.id,
        planner.name || '',
        planner.jobNum || '',
        planner.imgSrc || ''
      )
      event.stopPropagation()
    },
  },
}
</script>
<style lang="less" scoped>
.introduce {
  width: 100%;
  padding: 31px 40px 32px;
}
.introduce-box {
  width: 100%;
  list-style: none;
  margin-bottom: 32px;
  &-item {
    width: 100%;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 8px;
    margin-bottom: 24px;
    overflow: hidden;
    &-title {
      width: 100%;
      height: 160px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/d4ynsvxsx9c0000.png');
      background-position-y: -10px;
      padding: 40px 33px;
      margin-bottom: 32px;
      &-box {
        display: flex;
        height: 32px;
        align-items: center;
        margin-bottom: 24px;
        .introduce_title {
          font-size: 32px;
          font-weight: bold;
          color: #222222;
          line-height: 31px;
          margin-right: 15px;
        }
        .introduce-tag-img-box {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          font-size: 36px;
          font-weight: 400;
          color: #ffffff;
          background: linear-gradient(90deg, #ff7e3b 0%, #ff3433 100%);
          border-radius: 20px 6px 20px 6px;
          padding: 0px 18px;
          transform: scale(0.5);
          transform-origin: 0 32px;
        }
      }
      &-desc {
        font-size: 24px;
        font-weight: 400;
        color: #555555;
        line-height: 23px;
      }
    }
  }
}
.introduce-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 24px;
  width: 100%;
  padding-left: 32px;
  margin-bottom: 56px;
  &-item {
    display: flex;
    height: 24px;
    justify-content: flex-start;
    align-items: center;
    margin-right: 39px;
    &-img {
      width: 48px;
      height: 48px;
      margin-right: -11px;
      font-size: 0;
      transform: scale(0.5);
      transform-origin: 0px 24px;
      > img {
        width: 48px;
        height: 48px;
      }
    }
    &-content {
      display: flex;
      align-items: center;
      height: 24px;
      font-size: 24px;
      font-weight: 400;
      color: #555555;
    }
  }
}
.introduce-count {
  display: flex;
  width: calc(100% - 64px);
  margin: 0 32px;
  border-bottom: 1px solid rgba(205, 205, 205, 0.5);
  padding-bottom: 32px;
  &-item {
    margin-right: 122px;
    &:last-child {
      margin-right: 0;
    }
    &-num {
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 31px;
      margin-bottom: 12px;
    }
    &-desc {
      font-size: 22px;
      font-weight: 400;
      color: #999999;
      line-height: 21px;
    }
  }
}
.introduce-contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 136px;
  width: 100%;
  padding: 0 32px;
  .price {
    display: flex;
    align-items: center;
    // height: 33px;

    > span:first-child {
      font-size: 40px;
      font-weight: bold;
      color: #ec5330;
    }
    > span:last-child {
      font-size: 24px;
      color: #ec5330;
      margin-top: 8px;
    }
  }
  .contact-btn {
    width: 240px;
    height: 72px;
    background: #ecf1fe;
    border: 1px solid #4974f5;
    border-radius: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 8px;
    padding-right: 24px;
    position: relative;
    > a {
      width: 56px;
      height: 56px;
      position: relative;
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -20px;
        margin-left: -20px;
      }
    }
    > a:first-child {
      border-radius: 50%;
      display: flex;
      > img {
        width: 100%;
        border-radius: 50%;
      }
    }
    > a:not(:first-child) {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      margin-top: -22px;
    }
    > a:nth-child(2) {
      left: 104px;
    }
    > a:last-child {
      right: 24px;
    }
  }
}
.more {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  background: #ecf1fe;
  border-radius: 8px;
  font-size: 32px;
  font-weight: bold;
  color: #4974f5;
}
.a-clear {
  text-decoration: none;
  color: inherit;
}
</style>
