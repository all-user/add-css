require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"append-css":[function(require,module,exports){
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

},{}]},{},[]);
