// 经额处理
export const price = (data) => {
  if (Number(data) > 9999) {
    return Math.floor((data / 10000) * 100) / 100
  } else {
    return data
  }
}
// export default { jump, price }
