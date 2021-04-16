<template>
  <div class="btn-planner">
    <div class="btn-planner_item">
      <div class="btn-planner_item_img"></div>
      <div class="btn-planner_item_con">
        <p class="name">规划师</p>
        <p class="title">- 在线咨询 -</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.btn-planner {
  width: 126px;
  height: 136px;
  //   border: 1px solid red;
  position: fixed;
  top: 1000px;
  right: 40px;
  &_item {
    position: relative;
    width: 100%;
    height: 100%;
    &_img {
      position: absolute;
      top: 0;
      right: 11px;
      width: 104px;
      height: 104px;
      background: #ffffff;
      border: 4px solid #4974f5;
      border-radius: 50%;
    }
    &_con {
      position: absolute;
      z-index: 2;
      bottom: 0;
      width: 126px;
      height: 56px;
      background: #4974f5;
      //   padding: 8px 0;
      border-radius: 28px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .name {
        display: block;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 21px;
        // margin: 8px auto;
        margin-bottom: 4px;
        // box-sizing: content-box;
      }
      .title {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 19px;
        opacity: 0.6;
      }
    }
  }
}
</style>
