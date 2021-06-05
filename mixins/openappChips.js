/* eslint-disable */
/**
 * @author xueyige
 * @since 2020/11/20
 */
'use strict'
export default {
  data() {
    return {
      // 薯片APP app store地址
      dgg_app_store_url:
        'https://apps.apple.com/us/app/%E8%96%AF%E7%89%87%E6%89%BE%E4%BA%BA/id1535886630',
      // 薯片APP 下载 地址
      dgg_tencent_store_url:
        'https://m.pp.cn/detail.html?appid=8180749&ch_src=pp_dev&ch=default',
      thisType: 'openapp',
    }
  },
  mounted() {},
  methods: {
    goDownloadFn() {
      // 下载函数
      const isAndroid =
        navigator.userAgent.indexOf('Android') > -1 ||
        navigator.userAgent.indexOf('Adr') > -1
      const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        // 打开 app store,等待顶呱呱app审核通过
        window.location.href = this.dgg_app_store_url
      } else {
        // TODO pp助手
        window.location.href = this.dgg_tencent_store_url
      }
    },
    openApp(e) {
      const _flag =
        !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ||
        !!navigator.userAgent.match(/UCBrowser/g)

      const isAndroid =
        navigator.userAgent.indexOf('Android') > -1 ||
        navigator.userAgent.indexOf('Adr') > -1
      const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      // 打开APP
      const obj = this.BrowserInfo()
      const _self = this
      // this.$toast.loading()
      if (obj.isWeixin) {
        // this.$toast.hide()

        // 如果是微信打开的页面，则跳应pp助手
        window.location.href =
          'https://a.app.qq.com/o/simple.jsp?pkgname=net.dgg.fitax'
        e.preventDefault()
      } else {
        const _flag =
          !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ||
          !!navigator.userAgent.match(/UCBrowser/g)
        if (this.thisType === 'openapp') {
          // 打开app
          if (isAndroid) {
            window.location =
              'cpsccustomer://{"path":"/main/android/main","parameter":{"selectedIndex":3}}'
          } else {
            window.location =
              'cpsccustomer://{"path":"CPSCustomer:CPSCustomer/CPSTabBarViewController///push/animation","parameter":{"selectedIndex":"3"}}'
          }
          _self.checkOpen((num) => {
            if (num === 0) {
              // 如果在限时内没跳转到app内则表示没有安装APP
              // _self.$router.push('/share/download')
              this.goDownloadFn()
            }
            // this.$toast.hide()
          })
        } else {
          // 去下载
          this.goDownloadFn()
        }
      }
    },
    checkOpen(cb) {
      const _clickTime = +new Date()
      function check(elsTime) {
        let _flag = null
        if (document.hidden || document.webkitHidden) {
          _flag = 1
        } else if (elsTime > 3000) {
          _flag = 0
        }
        cb(_flag)
      }
      // 启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
      let intHandle
      intHandle = setInterval(function () {
        const elsTime = +new Date() - _clickTime
        if (elsTime > 3000) {
          clearInterval(intHandle)
          check(elsTime)
        }
      }, 20)
    },
    BrowserInfo: function () {
      const json = {
        userAgent: navigator.userAgent.toLowerCase(),
        isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
        isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
        isIpad: Boolean(navigator.userAgent.match(/ipad/gi)),
        isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi)),
      }
      return json
    },
  },
}
