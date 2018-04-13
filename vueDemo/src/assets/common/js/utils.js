/**
 * Created by fwxing on 2018/4/13 17:03
 */

/**
 * @description 计数数组中值的出现次数
 * @param arr {Array}
 * @param value {Number}
 * @return {Number}
 */
let countifInArray = (arr, value) => {
  arr.reduce((a, v) => {
    return v === value ? a + 1 : a + 0
  }, 0)
}

/**
 * @description 过滤数组中的非唯一值
 * @param arr
 * @return {Array}
 */
let filterNonUnique = (arr) => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))

/**
 * @description 获取滚动位置
 * @param domElem
 * @return {{x: number, y: number}}
 */
let getScrollPos = (domElem = window) => ({
  x: (domElem.pageXOffset !== undefined) ? domElem.pageXOffset : domElem.scrollLeft,
  y: (domElem.pageYOffset !== undefined) ? domElem.pageYOffset : domElem.scrollTop
})

/**
 * @description 测试功能花费的时间
 * @param fun {Function}
 * @return {*}
 */
let timeTaken = fun => {
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
let objectFromPairs = arr => arr.reduce((a, v) => {
  return (a[v[0]] = v[1], a)
}, {})

/**
 * @description 范围内的随机整数
 * @param min {Number}
 * @param max {Number}
 * @return {number}
 */
let randomIntInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * @description 范围内的随机
 * @param min {Number}
 * @param max {Number}
 * @return {Number}
 */
let randomInRange = (min, max) => Math.random() * (max - min) + min

/**
 * @description 随机化数组的顺序
 * @param arr {Array}
 * @return {Array}
 */
let arrayShuffle = arr => arr.sort(() => Math.random() - 0.5)

/**
 * @description 翻转字符串
 * @param str {String}
 * @return {string}
 */
let reverseString = str => [...str].reverse().join('')

/**
 * @description RGB到十六进制
 * @example rgbToHex(255, 165, 1) -> 'ffa501'
 * @param r {Number}
 * @param g {Number}
 * @param b {Number}
 * @return {string}
 */
let rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(2, '0')
