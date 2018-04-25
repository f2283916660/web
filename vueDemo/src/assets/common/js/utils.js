/**
 * Created by fwxing on 2018/4/13 17:03
 */
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory()
  } else {
    root.util = factory()
  }
})(this, function () {
  var classType = {}
  "Boolean Number String Function Array Date RegExp Object Error Null Undefined Promise Symbol Map WeakMap Set WeakSet".split(' ').map(function (item, index) {
    classType["[object " + item + "]"] = item.toLowerCase()
  })

  var util = {
    /**
     * 解析类型
     * @param {*} obj
     * @return {string}
     */
    toType: function (obj) {
      //IE6 null和undefined Object.prototype.toString 识别为[object object]
      if (obj == null) {
        return obj + ''
      }
      return typeof obj === "object" || typeof obj === "function" ? classType[Object.prototype.toString.call(obj)] || "object" : typeof obj;
    },

    /**
     * 判断是否为函数
     * @param obj
     * @return {boolean}
     */
    isFunction: function (obj) {
      return this.toType(obj) === 'function'
    }
  }

  /**
   * @description 计数数组中值的出现次数
   * @param {Array} arr 数组
   * @param {Number} value 数值
   * @return {Number}
   */
  util.countifInArray = function (arr, value) {
    arr.reduce((a, v) => {
      return v === value ? a + 1 : a + 0
    }, 0)
  }

  /**
   * @description 过滤数组中的非唯一值
   * @param arr
   * @return {Array}
   */
  util.filterNonUnique = function (arr) {
    return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
  }

  /**
   * @description 随机化数组的顺序
   * @param {Array} arr
   * @return {Array}
   */
  util.arrayShuffle = function (arr) {
    return arr.sort(() => Math.random() - 0.5)
  }

  /**
   * @description 获取滚动位置
   * @param domElem
   * @return {{x: number, y: number}}
   */
  util.getScrollPos = function (domElem = window) {
    return {
      x: (domElem.pageXOffset !== undefined) ? domElem.pageXOffset : domElem.scrollLeft,
      y: (domElem.pageYOffset !== undefined) ? domElem.pageYOffset : domElem.scrollTop
    }
  }

  /**
   * @description 测试功能花费的时间
   * @param fun {Function}
   * @return {*}
   */
  util.timeTaken = function (fun) {
    console.time('timeTaken')
    const r = fun()
    console.timeEnd('timeTaken')
    return r
  }

  /**
   * @description 来自键值对的对象
   * @example objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}
   * @param arr
   */
  util.objectFromPairs = function (arr) {
    return arr.reduce((a, v) => {
      return (a[v[0]] = v[1], a)
    }, {})
  }

  /**
   * @description 范围内的随机
   * @param min {Number}
   * @param max {Number}
   * @return {Number}
   */
  util.randomInRange = function (min, max) {
    return Math.random() * (max - min) + min
  }

  /**
   * @description 范围内的随机整数
   * @param min {Number}
   * @param max {Number}
   * @return {number}
   */
  util.randomIntInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * @description 翻转字符串
   * @param {String} str
   * @return {string}
   */
  util.reverseString = function (str) {
    return [...str].reverse().join('')
  }

  /**
   * @description RGB到十六进制
   * @example rgbToHex(255, 165, 1) -> 'ffa501'
   * @param {Number} r - 红色
   * @param {Number} g
   * @param {Number} b
   * @return {string}
   */
  util.rgbToHex = function (r, g, b) {
    return ((r << 16) + (g << 8) + b).toString(16).padStart(2, '0')
  }

  return util
})
