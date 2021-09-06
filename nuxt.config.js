'use strict'

const path = require('path')

const BASE = require('./config/index.js')
const NODE_ENV = process.env.NODE_ENV
const baseUrl = BASE.baseURL
console.log('-------baseUrl------')
console.log('baseUrl', baseUrl)
const bablePlugin = [
  [
    'import',
    {
      libraryName: '@chipspc/vant-dgg',
      style: (name) => `${name}/style/less`,
    },
    '@chipspc/vant-dgg',
  ],
]
// if (NODE_ENV === 'production') {
//   bablePlugin.push('transform-remove-console')
// }
module.exports = {
  telemetry: false,
  server: {
    port: 3001, // default: 3001
    host: 'localhost', // default: localhost,
  },
  env: {
    DGG_SERVER_ENV: process.env.DGG_SERVER_ENV,
  },
  head: {
    title: '薯片·让更多人生活更美好！',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'full-screen',
        content: 'true',
      },
      {
        name: 'x5-fullscreen',
        content: 'true',
      },
      {
        name: '360-fullscreen',
        content: 'true',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: '/js/flexible.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      {
        src: 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      {
        src: 'https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-2.0.18.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      {
        src: 'https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.1.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      {
        src: '/js/sppt-mdweb-sdk-conf.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      {
        src: 'https://cdn.shupian.cn/sppt/md/sppt-mdweb-sdk.min.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      {
        src: 'https://cdn.shupian.cn/sppt/mqim/sppt-mqim-sdk.min.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
  },
  loading: { color: '#4974F5' },
  css: [
    'assets/css/reset.css',
    'assets/icons/iconfont.css',
    'assets/styles/reset-vant.less',
  ],
  styleResources: {
    less: 'assets/styles/variables.less',
  },
  plugins: [
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/router', ssr: false },
    { src: '@/plugins/my-icon', ssr: true },
    { src: '@/plugins/vconsole', ssr: true },
    { src: '@/plugins/app-sdk', ssr: false },
    { src: '@/plugins/lazyload', ssr: true },
    { src: '@/plugins/oss', ssr: true },
    { src: '@/plugins/install-components', ssr: false },
    { src: '@/plugins/sp-md-directive', ssr: false },
    { src: '@/plugins/getFinger', ssr: false },
  ],
  router: {
    middleware: 'appDock',
  },
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt', { parseJSON: true }],
  ],
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': {
      target: baseUrl, // 只代理了client的请求,没有代理Server端
      secure: false,
      changeOrigin: true, // 表示是否跨域
      logLevel: 'debug',
      // 如果不想将所有接口都指向/api目录，就需要进行如下配置
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      },
    },
    '/gdmap': {
      target: 'https://restapi.amap.com', // 高德地图代理
      secure: false,
      changeOrigin: true, // 表示是否跨域
      logLevel: 'debug',
      pathRewrite: {
        '^/gdmap': '/',
      },
    },
  },
  build: {
    transpile: [/vant.*?less/],
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 100,
          minPixelValue: 2,
          propWhiteList: [],
          exclude: /(node_modules)/,
        },
      },
      preset: {
        browsers: ['Android >= 4.0', 'iOS >= 7'],
      },
    },
    babel: {
      plugins: bablePlugin,
    },
    extractCSS: { ignoreOrder: true },
    loaders: {
      less: {
        // VantUI 定制主题配置
        javascriptEnabled: true, // 开启 Less 行内 JavaScript 支持
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            './assets/styles/vant.var.less'
          )}";`,
        },
      },
    },
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      if (ctx.isClient) {
        if (NODE_ENV === 'development') {
          config.devtool = 'cheap-module-eval-source-map'
        } else {
          config.devtool = 'hidden-source-map'
        }
      }
    },
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
  },
}
