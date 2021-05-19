const SPPTMDCONFIG = {
  platform_type: 'Web', // 类型
  app_name: 'web薯推广页', // 名称
  server_url: window.location.origin.match('shupian.dgg.cn')
    ? 'https://shence.dgg.cn:6443/sa?project=production' // 正式项目地址
    : 'https://shence.dgg.cn:6443/sa?project=default', // 测试项目地址 project=default
  show_log: true, // 打印日志
  heatmap: {
    // 是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
    clickmap: 'not_collect',
  },
}
