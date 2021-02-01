const sensors = require('sa-sdk-javascript')
sensors.init({
  // 神策系统配置
  server_url: window.location.origin.match('shupian.dgg.cn')
    ? 'https://shence.dgg.cn:6443/sa?project=production' // 正式项目地址
    : 'https://shence.dgg.cn:6443/sa?project=default', // 测试项目地址 project=default
  is_track_single_page: true, // 单页应用页面浏览事件采集(url改变就触发)
  show_log: !window.location.origin.match('shupian.dgg.cn'), // 产线环境下关闭数据打印
  heatmap: {
    // 热图设置 default开启 not_collect关闭（详细配置解释看官方文档）
    clickmap: 'default', // 点击热图，收集点击事件
    scroll_notice_map: 'default', // 视区热图，收集页面区域停留时间
  },
})
window.sensors = sensors
sensors.quick('autoTrack')
export default sensors
