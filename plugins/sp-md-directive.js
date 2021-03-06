import Vue from 'vue'
/**
 * 埋点指令
 * @param {*} el 当前dom对象
 * @param {*} binding 指令参数
 * 指令使用 v-md:p_search
 *  其中 p_search 为传的参数（自定义事件名称）
 *  在指令中通过 binding.arg 接收传递的参数
 */
Vue.directive('md', {
  inserted(el, binding) {
    el.mdClick = function () {
      const getDataset = this.dataset
      const setData = {}
      for (const key in getDataset) {
        if (
          getDataset[key] !== undefined &&
          key.indexOf('v-') === -1 &&
          key !== 'sensorsClick'
        ) {
          setData[key] = getDataset[key]
        }
      }
      if (binding.arg) {
        setData.even_name = binding.arg
        window.spptMd.spptTrackRow(binding.arg, setData)
      }
    }
    el.addEventListener('click', el.mdClick)
  },
  unbind: (el, binding) => {
    el.removeEventListener('click', el.mdClick)
  },
})
/**
 * 热力图指令
 * @param {*} el 当前dom对象
 * 指令使用 v-md-map
 */
Vue.directive('md-map', {
  inserted(el) {
    el.mdMapClick = function () {
      window.spptMd.quick('trackAllHeatMap', this)
    }
    el.addEventListener('click', el.mdMapClick)
  },
  unbind: (el, binding) => {
    el.removeEventListener('click', el.mdMapClick)
  },
})
