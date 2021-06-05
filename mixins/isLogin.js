'use strict'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      strcookie: '',
      userPhone: '',
      isLogin: false,
      postionCity: '',
      cityMsg: {},
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    this.cityMsg = JSON.parse(this.$cookies.get('currentCity', { path: '/' }))
    this.postionCity = this.cityMsg.name
  },
  mounted() {
    this.strcookie = document.cookie
    if (this.isInApp) {
      this.getUserInfo()
    }
    if (this.strcookie.indexOf('userPhone') !== -1) {
      this.isLogin = true
      this.userPhone = this.getCookie('userPhone')
    }
  },
  methods: {
    getCookie(name) {
      // 可以搜索RegExp和match进行学习
      let arr = ''
      const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    getUserInfo() {
      this.$appFn.dggCityCode((res) => {
        if (res.code === 200) {
          this.currentCity = res.data.cityName
        }
      })
      this.$appFn.dggGetUserInfo((res) => {
        if (res.code === 200) {
          this.isLogin = true
          this.userPhone = res.data.mainAccount.replace(
            /(\d{3})\d*(\d{2})/,
            '$1******$2'
          )
        }
      })
    },
  },
}
