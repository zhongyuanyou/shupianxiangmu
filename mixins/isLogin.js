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
    if (this.strcookie.indexOf('userPhone') !== -1) {
      this.isLogin = true
      this.getCookie('userPhone')
    }
    this.getUserInfo()
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
        console.log(res, 222)
      })
    },
  },
}
