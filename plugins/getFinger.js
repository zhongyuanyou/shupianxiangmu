// 获取用户唯一标识
import Vue from 'vue'
import Fingerprint from 'fingerprintjs2'
const getFinger = () => {
  return new Promise((resolve, reject) => {
    try {
      Fingerprint.get((components) => {
        // console.log(components) // an array of components: {key: ..., value: ...}
        const values = components.map(function (component) {
          return component.value
        })
        const key = Fingerprint.x64hash128(values.join(''), 31)
        resolve(key)
      })
    } catch (error) {
      resolve('')
    }
  })
}
Vue.prototype.$getFinger = getFinger
