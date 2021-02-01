import Vue from 'vue'

// if (!Function.prototype.bind) {
//   Function.prototype.bind = function () {
//     const fn = this
//     const args = Array.prototype.slice.call(arguments)
//     const object = args.shift()
//     return function () {
//       return fn.apply(
//         object,
//         args.concat(Array.prototype.slice.call(arguments))
//       )
//     }
//   }
// }

const Utils = Object.create(null)

Utils.encode = function (_map, _content) {
  _content = '' + _content
  if (!_map || !_content) {
    return _content || ''
  }
  return _content.replace(_map.r, function ($1) {
    const _result = _map[!_map.i ? $1.toLowerCase() : $1]
    return _result != null ? _result : $1
  })
}

Utils.escape = (function () {
  const _reg = /<br\/?>$/
  const _map = {
    r: /<|>|&|\r|\n|\s|'|"/g,
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    ' ': '&nbsp;',
    '"': '&quot;',
    "'": '&#39;',
    '\n': '<br/>',
    '\r': '',
  }
  return function (_content) {
    _content = Utils.encode(_map, _content)
    return _content.replace(_reg, '<br/>')
  }
})()

Utils.object2query = function (obj) {
  const keys = Object.keys(obj)
  const queryArray = keys.map((item) => {
    return `${item}=${encodeURIComponent(obj[item])}`
  })
  return queryArray.join('&')
}

// https://cn.vuejs.org/v2/guide/reactivity.html
// Vue 不能检测到对象属性的添加或删除。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上
Utils.mergeObject = function (dest, src) {
  if (typeof dest !== 'object' || dest === null) {
    dest = Object.create(null)
  }
  dest = Object.assign(Object.create(null), dest, src)
  return dest
}

Utils.mergeVueObject = function (dest, src) {
  const keys = Object.keys(src)
  keys.forEach((item) => {
    if (typeof src[item] !== 'undefined') {
      Vue.set(dest, item, src[item])
    }
  })
  return dest
}

// 消息类型列表
Utils.mapMsgType = function (msg) {
  const map = {
    text: '文本消息',
    image: '图片消息',
    file: '文件消息',
    audio: '语音消息',
    video: '视频消息',
    geo: '地理位置消息',
    tip: '提醒消息',
    custom: '自定义消息',
    notification: '系统通知',
    robot: '机器人消息',
  }
  const type = msg.type
  return map[type] || '未知消息类型'
}

Utils.stringifyDate = function (datetime, simple = false) {
  // let weekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const weekMap = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  datetime = new Date(datetime)
  const year = datetime.getFullYear()
  const simpleYear = datetime.getYear() - 100
  let month = datetime.getMonth() + 1
  month = month > 9 ? month : '0' + month
  let day = datetime.getDate()
  day = day > 9 ? day : '0' + day
  let hour = datetime.getHours()
  hour = hour > 9 ? hour : '0' + hour
  let min = datetime.getMinutes()
  min = min > 9 ? min : '0' + min
  let week = datetime.getDay()
  week = weekMap[week]
  const thatDay = new Date(year, month - 1, day, 0, 0, 0).getTime()

  if (simple) {
    return {
      withYear: `${day}/${month}/${simpleYear}`,
      withMonth: `${month}-${day}`,
      withDay: `${week}`,
      withLastDay: `昨天`,
      withHour: `${hour}:${min}`,
      thatDay,
    }
  } else {
    return {
      withYear: `${year}-${month}-${day} ${hour}:${min}`,
      withMonth: `${month}-${day} ${hour}:${min}`,
      withDay: `${week} ${hour}:${min}`,
      withLastDay: `昨天 ${hour}:${min}`,
      withHour: `${hour}:${min}`,
      thatDay,
    }
  }
}

/* 格式化日期 */
Utils.formatDate = function (datetime, simple = false) {
  const tempDate = new Date().getTime()
  const result = this.stringifyDate(datetime, simple)
  const thatDay = result.thatDay
  const deltaTime = (tempDate - thatDay) / 1000

  if (deltaTime < 3600 * 24) {
    return result.withHour
  } else if (deltaTime < 3600 * 24 * 2) {
    return result.withLastDay
  } else if (deltaTime < 3600 * 24 * 7) {
    return result.withDay
  } else if (deltaTime < 3600 * 24 * 30) {
    return result.withMonth
  } else {
    return result.withYear
  }
}

export default Utils
