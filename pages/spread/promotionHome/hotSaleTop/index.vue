<template>
  <div class="container_body">
    <div class="container" :class="showTitle === true ? 'header_bgc' : ''">
      <!-- Header Start -->
      <sp-sticky @scroll="handleScroll">
        <div
          class="container_header"
          :class="showTitle === true ? 'header_bgc' : ''"
        >
          <my-icon
            name="nav_ic_back"
            size="0.4rem"
            color="#FFFFFF"
            class="container_header_icon"
          ></my-icon>
          <div v-show="showTitle" class="container_header_title">
            {{ title }}
          </div>
        </div>
      </sp-sticky>
      <!-- Header End -->
      <!-- saleTop Start -->
      <div class="hotSaleTop">
        <div class="hotSaleTop_title">本月热销榜</div>
        <div class="hotSaleTop_span">
          <div class="hotSaleTop_span_top">TOP</div>
          <div class="hotSaleTop_span_text">每日更新</div>
        </div>
      </div>
      <!-- saleTop End -->
    </div>
    <div class="container_items">
      <div v-for="(item, index) in itemArray" :key="index" class="items">
        <div class="items_item">
          <img :src="item.img" alt="" class="items_item_img" />
        </div>
        <p class="items_item_text">{{ item.title }}</p>
      </div>
    </div>
    <div class="container_list">
      <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item, index) in list" :key="index" class="list_item">
            <div class="list_item_left">
              <img src="" alt="" />
            </div>
            <div class="list_item_right">
              <div class="title">{{ item.title }}</div>
              <div class="tags">
                <span v-for="(itemItem, index) in item.tags" :key="index">{{
                  itemItem
                }}</span>
              </div>
              <div class="ads">{{ item.ads }}</div>
              <div class="bottom">
                <div class="price">{{ item.price }}<span>元</span></div>
                <div class="sales_num">销量 {{ item.salesNum }}</div>
              </div>
            </div>
          </div>
        </sp-list>
      </sp-pull-refresh>
    </div>
  </div>
</template>
<script>
// import Header from '@/components/common/head/header'
import { Sticky, PullRefresh, List } from '@chipspc/vant-dgg'

export default {
  name: 'Index',
  components: {
    // Header,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  data() {
    return {
      placeholder: '头部',
      title: '本月热销榜',
      showTitle: false,
      loading: false,
      finished: false,
      refreshing: false,
      itemArray: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ai2w67z6f00000.png',
          title: '商标注册',
        },
      ],
      list: [
        {
          title: '品牌设计商标logo设计品牌…',
          tags: ['标签1', '标签2', '标签3', '标签4'],
          ads: '我用双手成就你的梦想',
          price: 1000,
          salesNum: 1522,
        },
        {
          title: '品牌设计商标logo设计品牌…',
          tags: ['标签1', '标签2', '标签3', '标签4'],
          ads: '我用双手成就你的梦想',
          price: 1000,
          salesNum: 1522,
        },
        {
          title: '品牌设计商标logo设计品牌…',
          tags: ['标签1', '标签2', '标签3', '标签4'],
          ads: '我用双手成就你的梦想',
          price: 1000,
          salesNum: 1522,
        },
        {
          title: '品牌设计商标logo设计品牌…',
          tags: ['标签1', '标签2', '标签3', '标签4'],
          ads: '我用双手成就你的梦想',
          price: 1000,
          salesNum: 1522,
        },
        {
          title: '品牌设计商标logo设计品牌…',
          tags: ['标签1', '标签2', '标签3', '标签4'],
          ads: '我用双手成就你的梦想,+++++++++++++++++，你所你',
          price: 1000,
          salesNum: 1522,
        },
      ],
    }
  },
  methods: {
    clickInputHandle() {
      console.log('click')
    },
    handleScroll(e) {
      this.showTitle = e.isFixed
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据

      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
  },
}
</script>
<style lang="less">
@paddingLeft: 20px;
@marginLeft: 20px;
@font-medium:pingfangsc-medium, PingFang SC;
@font-regular: PingFangSC-Regular, PingFang SC;
.backGround(@url) {
  background: url(@url);
  background-size: 100% 100%;
}
.flexMixin {
  display: flex;
  align-items: center;
}
.flexStart {
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
}
.textoverflow (@line) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @line;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.padding {
  padding: 0 20px;
}
.header_bgc {
  background: #4974f5 !important;
}
.container_body {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 400px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/bfpq7opciy80000.png')
      no-repeat;
    background-size: 100%;
    &_header {
      height: 88px;
      width: 100%;
      .flexMixin();
      justify-content: center;
      position: relative;
      &_icon {
        margin-left: @marginLeft+12px;
        position: absolute;
        left: 0;
      }
      &_title {
        color: #ffffff;
        font: bold 36px/36px @font-medium;
      }
    }
    .hotSaleTop {
      &_title {
        height: 87px;
        font: bold 62px/87px @font-medium;
        position: absolute;
        top: 143px;
        margin-left: @marginLeft+20px;
        color: #ffffff;
      }
      &_span {
        .flexMixin();
        position: absolute;
        top: 242px;
        margin-left: @marginLeft+20px;
        &_top {
          color: #ffffff;
          font: 400 26px/37px @font-regular;
          padding: 6px 18px;
          background: #4974f5;
          border: 1px solid #4974f5;
          border-radius: 4px 0px 0px 4px;
        }
        &_text {
          color: #ffffff;
          font: 400 26px/37px @font-regular;
          padding: 6px 20px;
          border: 1px solid #4974f5;
          border-radius: 4px 0px 0px 4px;
        }
      }
    }
  }
  .container_items {
    .flexStart();
    padding: 40px 0 32px 32px;
    .items {
      &_item {
        text-align: center;
        height: 88px;
        width: 88px;
        border-radius: 50%;
        .backGround('https://cdn.shupian.cn/sp-pt/wap/ebl77wjvmqo0000.png');
        .flexMixin();
        justify-content: center;
        margin-left: 8px;
        margin-right: 64px;
        > img {
          display: block;
          width: 40px;
          height: 40px;
        }
      }
      > p {
        height: 37px;
        color: #222222;
        line-height: 37px;
        font: bold 26px/37px @font-medium;
        margin-top: 10px;
      }
    }
  }
  .container_list {
    .list_item {
      height: 248px;
      background: #ffffff;
      border-radius: 24px;
      margin: 0 20px;
      padding: 24px;
      display: flex;
      margin-bottom: 20px;
      .list_item_left {
        margin-right: 28px;
        > img {
          width: 200px;
          height: 200px;
          background: #d8d8d8;
          border-radius: 16px;
          display: block;
        }
      }
      .list_item_right {
        .title {
          .textoverflow(1);
          height: 45px;
          color: #222222;
          font: bold 32px/45px @font-medium;
          margin-bottom: 12px;
        }
        .tags {
          height: 28px;
          .flexMixin();
          margin-bottom: 12px;
          > span {
            padding: 4px 6px;
            margin-right: 8px;
            font: 400 20px/20px @font-regular;
            color: #5c7499;
            line-height: 20px;
            background-color: #f0f2f5;
            border-radius: 4px;
          }
        }
        .ads {
          .textoverflow(1);
          font: 400 22px/30px @font-regular;
          height: 30px;
          color: #222222;
          margin-bottom: 23px;
        }
        .bottom {
          height: 50px;
          .flexMixin();
          justify-content: space-between;
          .price {
            height: 50px;
            color: #ec5330;
            font: bold 36px/50px @font-medium;
            > span {
              height: 30px;
              font-size: 22px;
              color: #ec5330;
              font: bold 22px/30px @font-medium;
            }
          }
          .sales_num {
            height: 30px;
            color: #999999;
            font: 400 22px/30px @font-regular;
          }
        }
      }
    }
  }
}
</style>
