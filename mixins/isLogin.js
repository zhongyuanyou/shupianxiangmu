'use strict'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      strcookie: '',
      userPhone: '',
      isLogin: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {},
  mounted() {
    this.strcookie = document.cookie
    if (this.isInApp) {
      this.getUserInfo()
    }
    if (this.strcookie.indexOf('userPhone') !== -1) {
      this.isLogin = true
      this.getCookie('userPhone')
    }
  },
  methods: {
    getCookie(name) {
      // 可以搜索RegExp和match进行学习
      let arr = ''
      const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if ((arr = document.cookie.match(reg))) {
        this.userPhone = unescape(arr[2])
      } else {
        return null
      }
    },
    getUserInfo() {
      this.$appFn.dggGetUserInfo((res) => {
        if (res.code === 200) {
          this.isLogin = true
          this.userPhone = res.data.nickName
        }
      })
    },
  },
}