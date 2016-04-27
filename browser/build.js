require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"append-css":[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
(function() {
  var AppendCss;

  AppendCss = (function() {
    function AppendCss(cssText) {
      this.cssText = cssText;
      this.styleEle = document.createElement('style');
      this.styleEle.textContent = this.cssText;
      document.head.appendChild(this.styleEle);
    }

    AppendCss.prototype.enable = function() {
      return this.styleEle.textContent = this.cssText;
    };

    AppendCss.prototype.disable = function() {
      return this.styleEle.textContent = '';
    };

    AppendCss.prototype.setCss = function(cssText) {
      return this.styleEle.textContent = cssText;
    };

    AppendCss.prototype.dispose = function() {
      document.head.removeChild(this.styleEle);
      return this.cssText = this.styleEle = null;
    };

    return AppendCss;

  })();

  module.exports = AppendCss;

}).call(this);

},{}]},{},[]);
