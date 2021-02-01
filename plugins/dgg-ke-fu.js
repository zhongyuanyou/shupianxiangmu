/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import Vue from 'vue'
function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

function updateQueryStringParameter(uri, key, value) {
  if (!value) {
    return uri
  }
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  const separator = uri.indexOf('?') !== -1 ? '&' : '?'
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2')
  } else {
    return uri + separator + key + '=' + value
  }
}
export default function () {
  ;(function (m, ei, q, i, a, j, s) {
    m[i] =
      m[i] ||
      function () {
        ;(m[i].a = m[i].a || []).push(arguments)
      }
    // eslint-disable-next-line no-sequences
    ;(j = ei.createElement(q)), (s = ei.getElementsByTagName(q)[0])
    j.async = true
    j.charset = 'UTF-8'
    j.src = 'https://cdn.shupian.cn/sppt/mqim/sppt-mqim-sdk.min.js'
    s.parentNode.insertBefore(j, s)
  })(window, document, 'script', '_MEIQIA')
  _MEIQIA('entId', 16984)
  _MEIQIA('withoutBtn')
  Vue.prototype.$dggkefu = function () {
    const roperties = dggSensors.getPresetProperties()
    let getUrl = updateQueryStringParameter(
      location.href,
      'utm_medium',
      getCookie('dggChannel')
    )
    getUrl = updateQueryStringParameter(
      getUrl,
      'utm_source',
      roperties.$latest_utm_source
    )
    getUrl = updateQueryStringParameter(
      getUrl,
      'utm_campaign',
      roperties.$latest_utm_campaign
    )
    getUrl = updateQueryStringParameter(
      getUrl,
      'utm_term',
      roperties.$latest_utm_term
    )
    getUrl = updateQueryStringParameter(
      getUrl,
      'utm_content',
      roperties.$latest_utm_content
    )
    window.location.href =
      'https://m.dgg.cn/chatlink.html?url=' + window.btoa(getUrl)
  }
}
