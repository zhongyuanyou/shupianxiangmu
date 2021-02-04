<template>
  <div class="main">
    <button @click="login">游客登录</button>
    <button @click="chat">im 聊天</button>
    <dggImCompany></dggImCompany>
  </div>
</template>

<script>
import dggImCompany from '@/components/spread/imNew'
export default {
  components: {
    dggImCompany,
  },
  methods: {
    login() {
      this.$axios
        .post(
          'http://dspmicrouag.shupian.cn/crispsimapi/api/v1/imserver/msg_user/reg_visitor.do',
          {
            sysCode: 'crisps-app',
            cilentToken: this.setCode(),
          }
        )
        .then((res) => {
          console.log('res')
          this.$cookies.set('userId', res.data.imUserId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 99999, // 过期时间
          })
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    setCode() {
      const timeStamp = new Date().getTime()
      return Math.ceil(timeStamp * Math.random(1, 3) * 1e4).toString(16)
      // return Math.ceil(timeStamp + Math.random() * 1e12).toString(16)
    },
    chat() {
      this.$root.$emit(
        'openNewIMM',
        '7659559901430190080',
        '何翔',
        '48159462',
        'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png'
      )
    },
  },
}
</script>

<style></style>
