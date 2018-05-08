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
    toType: function (obj) {
      //IE6 null和undefined Object.prototype.toString 识别为[object object]
      if (obj == null) {
        return obj + ''
      }
      return typeof obj === "object" || typeof obj === "function" ? classType[Object.prototype.toString.call(obj)] || "object" : typeof obj;
    },
    isFunction: function (obj) {
      return this.toType(obj) === 'function'
    }
  }
  return util
})

