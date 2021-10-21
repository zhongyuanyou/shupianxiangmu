import imHandle from '@/mixins/imHandle'
export default {
  mixins: [imHandle],
  methods: {
    jump(data) {
      //   如果配置参数为mpass或者app_mpass页面路由取安卓链接里的配置内容
      if (
        data &&
        (data.executionParameters === 'mpass' ||
          data.executeParam === 'mpass' ||
          data.executionParameters === 'app_mpass' ||
          data.executeParam === 'app_mpass')
      ) {
        const path = data.androidLink || data.androidRoute
        this.$router.push(path)
      } else if (
        data &&
        (data.executionParameters === 'im' || data.executeParam === 'im')
      ) {
        const planner = { mchUserId: '', type: '' }
        planner.mchUserId = data.materialDescription || data.description
        this.uPIM(planner)
      } else if (
        data &&
        (data.executionParameters === 'app' ||
          data.executeParam === 'app' ||
          data.executionParameters === 'h5' ||
          data.executeParam === 'h5')
      ) {
        const path = data.wapLink || data.wapRoute
        window.location.href = path
      }
    },
  },
}
