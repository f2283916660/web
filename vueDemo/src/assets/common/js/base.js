/* eslint-disable no-useless-escape */
/**
 * url解析
 * @param url
 * @return {{source: *, protocol: string, host: string, port: string, query: string, params, file: string | *, hash: string, path: string, relative: string | *, segments: string[]}}
 */
function urlParse (url) {
  let a = document.createElement('a')
  a.href = url
  return {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function () {
      let ret = {}
      let seg = a.search.replace(/^\?/, '').split('&')
      let len = seg.length
      let i = 0
      let s
      for (; i < len; i++) {
        if (!seg[i]) {
          continue
        }
        s = seg[i].split('=')
        ret[s[0]] = s[1]
      }
      return ret
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [undefined, ''])[1],
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^\/])/, '/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [undefined, ''])[1],
    segments: a.pathname.replace(/^\//, '').split('/')
  }
}

/**
 * cookie
 * @type {{set: function(*, *=, *), get: function(*), del: function(*)}}
 */
let cookie = {
  set: (cName, value, expiredays) => {
    let exdate = new Date()
    exdate.setTime(exdate.getTime() + expiredays)
    document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + '; path=/;'
  },
  get: (name) => {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  del: (name) => {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    document.cookie = name + '=;expires=' + exp.toGMTString() + '; path=/;'
  }
}

/**
 * 时间格式化
 * @param date
 * @param fmt 'yyyy-MM-dd 星期D'
 * @return {*}
 */
function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  let weekzh = ['日', '一', '二', '三', '四', '五', '六']
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'D+': date.getDay(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    let str = o[k] + ''
    let flag = new RegExp(`(${k})`).test(fmt)
    if (flag) {
      if (RegExp.$1.indexOf('D') !== -1) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 3) ? week[Number(str)] : (RegExp.$1.length === 2) ? weekzh[Number(str)] : str)
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : str.padStart(2, '0'))
      }
    }
  }
  return fmt
}

// 客户端类型 ios = 2 android= 3
const OSTYPE = {
  IOS: 2,
  ANDROID: 3
}

// 调用iosAPP接口
function appInterfaceLoadURL (url) {
  let iFrame
  iFrame = document.createElement('iframe')
  iFrame.setAttribute('src', url)
  iFrame.setAttribute('style', 'display:none;')
  iFrame.setAttribute('height', '0px')
  iFrame.setAttribute('width', '0px')
  iFrame.setAttribute('frameborder', '0')
  document.body.appendChild(iFrame)
  // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
  iFrame.parentNode.removeChild(iFrame)
  iFrame = null
}

let nativeIt = {
  loginOut () {
    let osType = cookie.get('OS')
    if (osType && Number(osType) === OSTYPE.IOS) {
      // ios
      appInterfaceLoadURL('dtt://loginOut')
    } else if (Number(osType) === OSTYPE.ANDROID) {
      // android
      try {
        window.JSInterface.loginOut()
      } catch (err) {
        // 错误
        alert(err)
      }
    }
  }
}

let util = {urlParse, cookie, formatDate, nativeIt, OSTYPE}
export {urlParse, cookie, formatDate, nativeIt, OSTYPE}
export default util
