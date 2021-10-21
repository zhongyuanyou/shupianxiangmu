// 路由跳转
export function jump(data) {
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
  } else {
    const path = data.wapLink || data.wapRoute
    window.location.href = path
  }
}
// 经额处理
export const price = (data) => {
  if (Number(data) > 9999) {
    return Math.floor((data / 10000) * 100) / 100
  } else {
    return data
  }
}
// export default { jump, price }
