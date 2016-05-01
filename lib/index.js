'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppendCss = function () {
  function AppendCss(css) {
    _classCallCheck(this, AppendCss);

    var ele = document.createElement('style');
    ele.textContent = css;
    document.head.appendChild(ele);
    this.cssText = css;
    this.styleEle = ele;
  }

  _createClass(AppendCss, [{
    key: 'enable',
    value: function enable() {
      this.textContent = this.cssText;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.textContent = '';
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      document.head.removeChild(this.styleEle);
      this.cssText = this.styleEle = null;
    }
  }, {
    key: 'textContent',
    set: function set(css) {
      this.styleEle.textContent = css;
    },
    get: function get() {
      return this.styleEle.textContent;
    }
  }]);

  return AppendCss;
}();

module.exports = AppendCss;