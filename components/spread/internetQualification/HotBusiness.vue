<template>
  <div>
    <div class="my-component">
      <div class="title">热门办理业务</div>
      <div class="content">
        <div
          v-for="(item, index) in $parent.hotBusinessList"
          :key="index"
          class="item"
          :class="index < 3 ? 'item-margin-bottom' : ''"
        >
          <div class="item-div-img">
            <img class="item-img" :src="item.img" />
          </div>
          <p class="item-title">{{ item.title }}</p>
          <p class="item-desc">{{ item.desc }}</p>
          <div class="item-line"></div>
          <p class="item-price">{{ item.price }}<span>元起</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotBanLiYeWu',
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(100% - 80px);
  margin: 0 auto;
  .title {
    font-size: 40px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 40px;
    margin-bottom: 40px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      flex: none;
      width: 212px;
      background: #ffffff;
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 4px;

      .item-div-img {
        width: 210px;
        height: 210px;
        margin-bottom: 24px;
        .item-img {
          width: 100%;
          height: 100%;
        }
      }
      .item-title {
        font-size: 26px;
        font-weight: 600;
        color: #222222;
        line-height: 30px;
        margin-bottom: 12px;
        margin-left: 16px;
        margin-right: 16px;
        // 超出省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-desc {
        font-size: 22px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
        margin-left: 16px;
        margin-right: 16px;
        // 超出省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-line {
        height: 1px;
        margin: 16px;
        background: #f4f4f4;
      }
      .item-price {
        font-size: 24px;
        font-weight: 600;
        color: #ec5330;
        line-height: 24px;
        margin: 16px;
      }
    }
    .item-margin-bottom {
      margin-bottom: 24px;
    }
  }
}
</style>
